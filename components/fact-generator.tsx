"use client"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Lightbulb, Copy, Check } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { ErrorBoundary } from "@/components/error-boundary"
import { memo } from "react"

const FACT_CATEGORIES = [
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
]

const CategoryButton = memo(
  ({
    category,
    isActive,
    onClick,
    label,
  }: {
    category: string
    isActive: boolean
    onClick: (category: string) => void
    label: string
  }) => (
    <Button
      variant={isActive ? "default" : "outline"}
      onClick={() => onClick(category)}
      className={`text-sm transition-all duration-200 ${
        isActive ? "gradient-primary text-white border-0 shadow-md" : "hover:shadow-sm"
      }`}
    >
      {label}
    </Button>
  ),
)

CategoryButton.displayName = "CategoryButton"

export const FactGenerator = memo(() => {
  const [category, setCategory] = useState("random")
  const [fact, setFact] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const { language, t } = useLanguage()
  const [recentItems, setRecentItems] = useLocalStorage("recentItems", [])

  const categoryButtons = useMemo(
    () =>
      FACT_CATEGORIES.map((cat) => (
        <CategoryButton
          key={cat}
          category={cat}
          isActive={category === cat}
          onClick={setCategory}
          label={t(`categories.${cat}`) || cat}
        />
      )),
    [category, t],
  )

  const generateFact = useCallback(async () => {
    setLoading(true)
    setCopied(false)

    try {
      const response = await fetch("/api/generate/fact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          category,
          language,
           includeEmojis: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (!data.content) {
        throw new Error("No content received")
      }

      setFact(data.content)

      const newItem = {
        id: Date.now(),
        type: "fact",
        category,
        content: data.content,
        timestamp: new Date().toISOString(),
      }

      setRecentItems((prev) => {
        const filtered = prev.filter((item) => item.content !== data.content)
        return [newItem, ...filtered.slice(0, 8)]
      })
    } catch (error) {
      console.error("Error generating fact:", error)
      setFact("Sorry, something went wrong. Please try again!")
    } finally {
      setLoading(false)
    }
  }, [category, language, setRecentItems])

  const copyToClipboard = useCallback(async () => {
    if (!fact) return

    try {
      await navigator.clipboard.writeText(fact)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }, [fact])

  return (
    <ErrorBoundary>
      <Card className="w-full glass-effect shadow-lg hover:shadow-glow transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl gradient-text-primary">
            <div className="gradient-primary rounded-full p-2">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            {t("generators.fact.title") || "Random Fact Generator"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">{categoryButtons}</div>

            <Button
              onClick={generateFact}
              disabled={loading}
              className="w-full gradient-primary text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("generators.fact.generating") || "Generating amazing fact..."}
                </>
              ) : (
                t("generators.fact.button") || "Generate Fact"
              )}
            </Button>
          </div>

          {fact && (
            <div className="relative p-6 glass-effect rounded-lg shadow-inner">
              <p className="text-lg leading-relaxed pr-12">{fact}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="absolute top-2 right-2 opacity-70 hover:opacity-100 transition-opacity"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </ErrorBoundary>
  )
})

FactGenerator.displayName = "FactGenerator"
