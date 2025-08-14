"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function PopularJoke() {
  const [popularJoke, setPopularJoke] = useState("")
  const [loading, setLoading] = useState(true)
  const { language, t } = useLanguage()

  useEffect(() => {
    const fetchPopularJoke = async () => {
      try {
        const response = await fetch("/api/popular-joke")
        const data = await response.json()
        setPopularJoke(data.content)
      } catch (error) {
        console.error("Error fetching popular joke:", error)
        setPopularJoke("Why don't scientists trust atoms? Because they make up everything! 😄")
      } finally {
        setLoading(false)
      }
    }

    fetchPopularJoke()
  }, [language])

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-green-700 dark:text-green-300">
          <TrendingUp className="h-5 w-5" />
          {t("mostPopularJoke")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-green-200 dark:bg-green-800 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-green-200 dark:bg-green-800 rounded w-1/2"></div>
          </div>
        ) : (
          <p className="text-green-800 dark:text-green-200 leading-relaxed">{popularJoke}</p>
        )}
      </CardContent>
    </Card>
  )
}
