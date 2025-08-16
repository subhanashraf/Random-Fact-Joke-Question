"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Smile } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useLocalStorage } from "@/hooks/use-local-storage"

const JOKE_CATEGORIES = [
  "Random",
  "Funny",
  "Science",
  "Dadjokes",
  "Kids",
  "Wordplay",
  "Animals",
  "Technology",
  "Darkhumor",
  "Puns",
]

export function JokeGenerator() {
  const [category, setCategory] = useState("Random")
  const [joke, setJoke] = useState("")
  const [loading, setLoading] = useState(false)
  const { language, t } = useLanguage()
  const [recentItems, setRecentItems] = useLocalStorage("recentItems", [])
  const [showEmojis, setShowEmojis] = useLocalStorage("showEmojis", true)

  const generateJoke = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/generate/joke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          language,
          includeEmojis: showEmojis,
        }),
      })

      const data = await response.json()
      setJoke(data.content)

      // Add to recent items
      const newItem = {
        id: Date.now(),
        type: "joke",
        category,
        content: data.content,
        timestamp: new Date().toISOString(),
      }

      setRecentItems((prev) => [newItem, ...prev.slice(0, 9)])
    } catch (error) {
      console.error("Error generating joke:", error)
      setJoke("Sorry, something went wrong. Please try again!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Smile className="h-6 w-6 text-green-500" />
          {t("generators.joke.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {JOKE_CATEGORIES.map((cat) => (
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

          <Button onClick={generateJoke} disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("generators.joke.button")}
              </>
            ) : (
              t("generators.joke.generating")
            )}
          </Button>
        </div>

        {joke && (
          <div className="p-6 bg-muted rounded-lg">
            <p className="text-lg leading-relaxed">{joke}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
