"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function FunFactOfDay() {
  const [factOfDay, setFactOfDay] = useState("")
  const [loading, setLoading] = useState(true)
  const { language, t } = useLanguage()

  useEffect(() => {
    const fetchFactOfDay = async () => {
      try {
        const response = await fetch("/api/fact-of-day")
        const data = await response.json()
        setFactOfDay(data.content)
      } catch (error) {
        console.error("Error fetching fact of day:", error)
        setFactOfDay("Did you know? The human brain contains approximately 86 billion neurons! 🧠")
      } finally {
        setLoading(false)
      }
    }

    fetchFactOfDay()
  }, [language])

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-yellow-700 dark:text-yellow-300">
          <Star className="h-5 w-5" />
          {t("funFactOfDay")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-yellow-200 dark:bg-yellow-800 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-yellow-200 dark:bg-yellow-800 rounded w-1/2"></div>
          </div>
        ) : (
          <p className="text-yellow-800 dark:text-yellow-200 leading-relaxed">{factOfDay}</p>
        )}
      </CardContent>
    </Card>
  )
}
