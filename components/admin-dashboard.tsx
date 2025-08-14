"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, LogOut, Database, Save, X, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"

interface ContentItem {
  _id: string
  type: string
  language: string
  content: string
  createdAt: string
}

interface AISettings {
  randomAiPercentage: number
  randomDbPercentage: number
  specificAiPercentage: number
  specificDbPercentage: number
}

const CATEGORY_TYPES = {
  facts: [
    "random",
    "fun",
    "science",
    "history",
    "technology",
    "space",
    "health",
    "nature",
    "sports",
    "culture",
    "entertainment",
    "education",
    "lifestyle",
    "food",
    "music",
    "art",
    "travel",
    "animals",
  ],
  questions: [
    "random",
    "philosophy",
    "psychology",
    "literature",
    "movies",
    "games",
    "relationships",
    "career",
    "creativity",
    "ethics",
    "future",
    "childhood",
    "dreams",
    "hobbies",
    "adventure",
    "mystery",
    "personal",
    "creative",
  ],
  jokes: [
    "random",
    "funny",
    "dadjokes",
    "kids",
    "wordplay",
    "animals",
    "darkhumor",
    "puns",
    "science",
    "technology",
    "food",
    "sports",
    "music",
    "movies",
  ],
}

export function AdminDashboard() {
  const [facts, setFacts] = useState<ContentItem[]>([])
  const [questions, setQuestions] = useState<ContentItem[]>([])
  const [jokes, setJokes] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<{ item: ContentItem; category: string } | null>(null)
  const [newItem, setNewItem] = useState({
    type: "",
    language: "en",
    content: "",
    category: "facts",
  })
  const [aiSettings, setAiSettings] = useState<AISettings>({
    randomAiPercentage: 70,
    randomDbPercentage: 30,
    specificAiPercentage: 95,
    specificDbPercentage: 5,
  })
  const [showSettings, setShowSettings] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()

  useEffect(() => {
    fetchAllContent()
    loadAISettings()
  }, [])

  const fetchAllContent = async () => {
    try {
      setError(null)
      setLoading(true)
      const [factsRes, questionsRes, jokesRes] = await Promise.all([
        fetch("/api/admin/facts").catch(() => ({ ok: false, json: () => Promise.resolve([]) })),
        fetch("/api/admin/questions").catch(() => ({ ok: false, json: () => Promise.resolve([]) })),
        fetch("/api/admin/jokes").catch(() => ({ ok: false, json: () => Promise.resolve([]) })),
      ])

      const factsData = factsRes.ok ? await factsRes.json() : []
      const questionsData = questionsRes.ok ? await questionsRes.json() : []
      const jokesData = jokesRes.ok ? await jokesRes.json() : []

      setFacts(Array.isArray(factsData) ? factsData : [])
      setQuestions(Array.isArray(questionsData) ? questionsData : [])
      setJokes(Array.isArray(jokesData) ? jokesData : [])
    } catch (error) {
      console.error("Error fetching content:", error)
      setError("Failed to connect to database. Please check your MongoDB connection.")
      setFacts([])
      setQuestions([])
      setJokes([])
    } finally {
      setLoading(false)
    }
  }

  const loadAISettings = () => {
    const saved = localStorage.getItem("ai_settings")
    if (saved) {
      try {
        setAiSettings(JSON.parse(saved))
      } catch (error) {
        console.error("Failed to load AI settings:", error)
      }
    }
  }

  const saveAISettings = async () => {
    try {
      localStorage.setItem("ai_settings", JSON.stringify(aiSettings))
      toast({
        title: "Success",
        description: "AI settings saved successfully",
      })
      setShowSettings(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save AI settings",
        variant: "destructive",
      })
    }
  }

  const handleAddItem = async () => {
    if (!newItem.content.trim() || !newItem.type.trim()) {
      toast({
        title: t("dashboard.error") || "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/admin/${newItem.category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: newItem.type,
          language: newItem.language,
          content: newItem.content,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Item added successfully",
        })
        setNewItem({ type: "", language: "en", content: "", category: "facts" })
        fetchAllContent()
      } else {
        throw new Error("Failed to add item")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item. Please check your database connection.",
        variant: "destructive",
      })
    }
  }

  const handleEditItem = async () => {
    if (!editingItem || !editingItem.content.trim() || !editingItem.type.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      let category = "facts"
      if (questions.find((q) => q._id === editingItem._id)) category = "questions"
      if (jokes.find((j) => j._id === editingItem._id)) category = "jokes"

      const response = await fetch(`/api/admin/${category}/${editingItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: editingItem.type,
          language: editingItem.language,
          content: editingItem.content,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Item updated successfully",
        })
        setEditingItem(null)
        fetchAllContent()
      } else {
        throw new Error("Failed to update item")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      })
    }
  }

  const handleDeleteItem = async () => {
    if (!deletingItem) return

    try {
      const response = await fetch(`/api/admin/${deletingItem.category}/${deletingItem.item._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Item deleted successfully",
        })
        setDeletingItem(null)
        fetchAllContent()
      } else {
        throw new Error("Failed to delete item")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth")
    window.location.reload()
  }

  const renderContentList = (items: ContentItem[], category: string) => {
    if (items.length === 0) {
      return (
        <Card className="glass-effect shadow-lg">
          <CardContent className="p-8 text-center">
            <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No {category} found</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding some {category} using the form above, or they will be automatically generated when users
              interact with the app.
            </p>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item._id} className="glass-effect shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="gradient-primary text-white border-0">
                      {item.type}
                    </Badge>
                    <Badge variant="secondary">{item.language}</Badge>
                  </div>
                  <p className="text-sm leading-relaxed">{item.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingItem(item)}
                    className="shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeletingItem({ item, category })}
                    className="shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="max-w-md mx-auto glass-effect shadow-xl">
          <CardContent className="p-8 text-center">
            <Database className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Database Connection Error</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchAllContent} className="gradient-primary text-white border-0">
              Retry Connection
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎲</span>
          <h1 className="text-3xl font-bold gradient-text-primary">{t("dashboard.title") || "Admin Dashboard"}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowSettings(true)}
            variant="outline"
            className="shadow-md hover:shadow-lg transition-shadow bg-transparent"
          >
            <Settings className="h-4 w-4 mr-2" />
            AI Settings
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="shadow-md hover:shadow-lg transition-shadow bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t("dashboard.logout") || "Logout"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="glass-effect shadow-lg hover:shadow-glow transition-all">
          <CardHeader>
            <CardTitle className="gradient-text-secondary">Total Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{facts.length}</p>
          </CardContent>
        </Card>
        <Card className="glass-effect shadow-lg hover:shadow-glow transition-all">
          <CardHeader>
            <CardTitle className="gradient-text-secondary">Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{questions.length}</p>
          </CardContent>
        </Card>
        <Card className="glass-effect shadow-lg hover:shadow-glow transition-all">
          <CardHeader>
            <CardTitle className="gradient-text-secondary">Total Jokes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{jokes.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Item */}
      <Card className="mb-8 glass-effect shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {t("dashboard.addNew") || "Add New Item"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Select
              value={newItem.category}
              onValueChange={(value) => setNewItem((prev) => ({ ...prev, category: value, type: "" }))}
            >
              <SelectTrigger className="shadow-sm">
                <SelectValue placeholder={t("dashboard.category") || "Category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facts">📚 Facts</SelectItem>
                <SelectItem value="questions">❓ Questions</SelectItem>
                <SelectItem value="jokes">😂 Jokes</SelectItem>
              </SelectContent>
            </Select>

            <Select value={newItem.type} onValueChange={(value) => setNewItem((prev) => ({ ...prev, type: value }))}>
              <SelectTrigger className="shadow-sm">
                <SelectValue placeholder={t("dashboard.type") || "Type"} />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_TYPES[newItem.category as keyof typeof CATEGORY_TYPES]?.map((type) => (
                  <SelectItem key={type} value={type}>
                    {t(`categories.${type}`) || type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={newItem.language}
              onValueChange={(value) => setNewItem((prev) => ({ ...prev, language: value }))}
            >
              <SelectTrigger className="shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="zh">🇨🇳 Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Textarea
            placeholder={t("dashboard.content") || "Content"}
            value={newItem.content}
            onChange={(e) => setNewItem((prev) => ({ ...prev, content: e.target.value }))}
            className="shadow-sm"
          />
          <Button
            onClick={handleAddItem}
            disabled={!newItem.content.trim() || !newItem.type.trim()}
            className="gradient-primary text-white border-0 shadow-md hover:shadow-lg transition-shadow"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("dashboard.addNew") || "Add Item"}
          </Button>
        </CardContent>
      </Card>

      {/* Content Lists */}
      <Tabs defaultValue="facts" className="space-y-4">
        <TabsList className="glass-effect shadow-md">
          <TabsTrigger value="facts">📚 Facts ({facts.length})</TabsTrigger>
          <TabsTrigger value="questions">❓ Questions ({questions.length})</TabsTrigger>
          <TabsTrigger value="jokes">😂 Jokes ({jokes.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="facts">{renderContentList(facts, "facts")}</TabsContent>
        <TabsContent value="questions">{renderContentList(questions, "questions")}</TabsContent>
        <TabsContent value="jokes">{renderContentList(jokes, "jokes")}</TabsContent>
      </Tabs>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="glass-effect shadow-xl max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              AI Content Settings
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Random Type Content</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="randomAi" className="text-sm">
                    AI Generated (%)
                  </Label>
                  <Input
                    id="randomAi"
                    type="number"
                    min="0"
                    max="100"
                    value={aiSettings.randomAiPercentage}
                    onChange={(e) => {
                      const value = Math.min(100, Math.max(0, Number.parseInt(e.target.value) || 0))
                      setAiSettings((prev) => ({
                        ...prev,
                        randomAiPercentage: value,
                        randomDbPercentage: 100 - value,
                      }))
                    }}
                    className="shadow-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="randomDb" className="text-sm">
                    Database (%)
                  </Label>
                  <Input
                    id="randomDb"
                    type="number"
                    min="0"
                    max="100"
                    value={aiSettings.randomDbPercentage}
                    onChange={(e) => {
                      const value = Math.min(100, Math.max(0, Number.parseInt(e.target.value) || 0))
                      setAiSettings((prev) => ({
                        ...prev,
                        randomDbPercentage: value,
                        randomAiPercentage: 100 - value,
                      }))
                    }}
                    className="shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Specific Type Content</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="specificAi" className="text-sm">
                    AI Generated (%)
                  </Label>
                  <Input
                    id="specificAi"
                    type="number"
                    min="0"
                    max="100"
                    value={aiSettings.specificAiPercentage}
                    onChange={(e) => {
                      const value = Math.min(100, Math.max(0, Number.parseInt(e.target.value) || 0))
                      setAiSettings((prev) => ({
                        ...prev,
                        specificAiPercentage: value,
                        specificDbPercentage: 100 - value,
                      }))
                    }}
                    className="shadow-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="specificDb" className="text-sm">
                    Database (%)
                  </Label>
                  <Input
                    id="specificDb"
                    type="number"
                    min="0"
                    max="100"
                    value={aiSettings.specificDbPercentage}
                    onChange={(e) => {
                      const value = Math.min(100, Math.max(0, Number.parseInt(e.target.value) || 0))
                      setAiSettings((prev) => ({
                        ...prev,
                        specificDbPercentage: value,
                        specificAiPercentage: 100 - value,
                      }))
                    }}
                    className="shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={saveAISettings} className="gradient-primary text-white border-0">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="glass-effect shadow-xl">
          <DialogHeader>
            <DialogTitle>{t("dashboard.editTitle") || "Edit Item"}</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <Select
                value={editingItem.type}
                onValueChange={(value) => setEditingItem((prev) => (prev ? { ...prev, type: value } : null))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {(() => {
                    let category = "facts"
                    if (questions.find((q) => q._id === editingItem._id)) category = "questions"
                    if (jokes.find((j) => j._id === editingItem._id)) category = "jokes"
                    return CATEGORY_TYPES[category as keyof typeof CATEGORY_TYPES]?.map((type) => (
                      <SelectItem key={type} value={type}>
                        {t(`categories.${type}`) || type}
                      </SelectItem>
                    ))
                  })()}
                </SelectContent>
              </Select>
              <Select
                value={editingItem.language}
                onValueChange={(value) => setEditingItem((prev) => (prev ? { ...prev, language: value } : null))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="zh">🇨🇳 Chinese</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                value={editingItem.content}
                onChange={(e) => setEditingItem((prev) => (prev ? { ...prev, content: e.target.value } : null))}
                placeholder="Content"
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingItem(null)}>
              <X className="h-4 w-4 mr-2" />
              {t("dashboard.cancel") || "Cancel"}
            </Button>
            <Button onClick={handleEditItem} className="gradient-primary text-white border-0">
              <Save className="h-4 w-4 mr-2" />
              {t("dashboard.save") || "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingItem} onOpenChange={() => setDeletingItem(null)}>
        <AlertDialogContent className="glass-effect shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              {t("dashboard.deleteConfirm") ||
                "Are you sure you want to delete this item? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingItem(null)}>
              {t("dashboard.cancel") || "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteItem} className="bg-destructive text-destructive-foreground">
              {t("dashboard.confirm") || "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
