"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Lightbulb } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useLocalStorage } from "@/hooks/use-local-storage"

const FACT_CATEGORIES = [
  "Random",
  "Fun",
  "Science",
  "History",
  "Technology",
  "Space",
  "Health",
  "Nature",
  "Sports",
  "Culture",
]

export function FactGenerator() {
  const [category, setCategory] = useState("Random")
  const [fact, setFact] = useState("")
  const [loading, setLoading] = useState(false)
  const { language, t } = useLanguage()
  const [recentItems, setRecentItems] = useLocalStorage("recentItems", [])
  const [showEmojis, setShowEmojis] = useLocalStorage("showEmojis", true)

  const generateFact = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/generate/fact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          language,
          includeEmojis: showEmojis,
        }),
      })

      const data = await response.json()
      setFact(data.content)

      // Add to recent items
      const newItem = {
        id: Date.now(),
        type: "fact",
        category,
        content: data.content,
        timestamp: new Date().toISOString(),
      }

      setRecentItems((prev) => [newItem, ...prev.slice(0, 9)])
    } catch (error) {
      console.error("Error generating fact:", error)
      setFact("Sorry, something went wrong. Please try again!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          {t("factGenerator")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {FACT_CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                onClick={() => setCategory(cat)}
                className="text-sm"
              >
                {t(`categories.${cat.toLowerCase()}`)}
              </Button>
            ))}
          </div>

          <Button onClick={generateFact} disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("generating")}
              </>
            ) : (
              t("generateFact")
            )}
          </Button>
        </div>

        {fact && (
          <div className="p-6 bg-muted rounded-lg">
            <p className="text-lg leading-relaxed">{fact}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
