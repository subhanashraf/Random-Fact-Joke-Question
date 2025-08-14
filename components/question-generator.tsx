"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, HelpCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useLocalStorage } from "@/hooks/use-local-storage"

const DEFAULT_QUESTION_CATEGORIES = [
  "Random",
  "Science",
  "Fun",
  "Entertainment",
  "Education",
  "Technology",
  "Lifestyle",
  "Food",
  "History",
  "Sports",
  "Music",
  "Art",
  "Travel",
  "Philosophy",
  "Psychology",
  "Literature",
  "Movies",
  "Games",
  "Health",
  "Relationships",
  "Career",
  "Creativity",
  "Personal",
  "Ethics",
  "Future",
  "Childhood",
  "Dreams",
  "Hobbies",
  "Adventure",
  "Mystery",
]

export function QuestionGenerator() {
  const [category, setCategory] = useState("Random")
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const { language, t } = useLanguage()
  const [recentItems, setRecentItems] = useLocalStorage("recentItems", [])
  const [showEmojis, setShowEmojis] = useLocalStorage("showEmojis", true)

  const generateQuestion = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/generate/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          language,
          includeEmojis: showEmojis,
        }),
      })

      const data = await response.json()
      setQuestion(data.content)

      // Add to recent items
      const newItem = {
        id: Date.now(),
        type: "question",
        category,
        content: data.content,
        timestamp: new Date().toISOString(),
      }

      setRecentItems((prev) => [newItem, ...prev.slice(0, 9)])
    } catch (error) {
      console.error("Error generating question:", error)
      setQuestion("Sorry, something went wrong. Please try again!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <HelpCircle className="h-6 w-6 text-blue-500" />
          {t("questionGenerator")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {DEFAULT_QUESTION_CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                onClick={() => setCategory(cat)}
                className="text-sm"
              >
                {t(`categories.${cat.toLowerCase()}`) || cat}
              </Button>
            ))}
          </div>

          <Button onClick={generateQuestion} disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("generating")}
              </>
            ) : (
              t("generateQuestion")
            )}
          </Button>
        </div>

        {question && (
          <div className="p-6 bg-muted rounded-lg">
            <p className="text-lg leading-relaxed">{question}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
