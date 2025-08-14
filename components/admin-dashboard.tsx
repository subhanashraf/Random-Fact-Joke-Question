"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, LogOut, Database } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContentItem {
  _id: string
  type: string
  language: string
  content: string
  createdAt: string
}

export function AdminDashboard() {
  const [facts, setFacts] = useState<ContentItem[]>([])
  const [questions, setQuestions] = useState<ContentItem[]>([])
  const [jokes, setJokes] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [newItem, setNewItem] = useState({
    type: "",
    language: "en",
    content: "",
    category: "facts",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchAllContent()
  }, [])

  const fetchAllContent = async () => {
    try {
      setError(null)
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

  const handleAddItem = async () => {
    if (!newItem.content.trim() || !newItem.type.trim()) {
      toast({
        title: "Error",
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

  const handleDeleteItem = async (id: string, category: string) => {
    try {
      const response = await fetch(`/api/admin/${category}/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Item deleted successfully",
        })
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
        <Card>
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
          <Card key={item._id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline">{item.type}</Badge>
                    <Badge variant="secondary">{item.language}</Badge>
                  </div>
                  <p className="text-sm">{item.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingItem(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteItem(item._id, category)}>
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
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Database className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Database Connection Error</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchAllContent}>Retry Connection</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{facts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{questions.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Jokes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{jokes.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Item */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Item
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Select
              value={newItem.category}
              onValueChange={(value) => setNewItem((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facts">Facts</SelectItem>
                <SelectItem value="questions">Questions</SelectItem>
                <SelectItem value="jokes">Jokes</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Type (e.g., science, fun)"
              value={newItem.type}
              onChange={(e) => setNewItem((prev) => ({ ...prev, type: e.target.value }))}
            />
            <Select
              value={newItem.language}
              onValueChange={(value) => setNewItem((prev) => ({ ...prev, language: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Textarea
            placeholder="Content"
            value={newItem.content}
            onChange={(e) => setNewItem((prev) => ({ ...prev, content: e.target.value }))}
          />
          <Button onClick={handleAddItem} disabled={!newItem.content.trim() || !newItem.type.trim()}>
            Add Item
          </Button>
        </CardContent>
      </Card>

      {/* Content Lists */}
      <Tabs defaultValue="facts">
        <TabsList>
          <TabsTrigger value="facts">Facts ({facts.length})</TabsTrigger>
          <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
          <TabsTrigger value="jokes">Jokes ({jokes.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="facts">{renderContentList(facts, "facts")}</TabsContent>
        <TabsContent value="questions">{renderContentList(questions, "questions")}</TabsContent>
        <TabsContent value="jokes">{renderContentList(jokes, "jokes")}</TabsContent>
      </Tabs>
    </div>
  )
}
