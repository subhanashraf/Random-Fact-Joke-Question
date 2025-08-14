"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Lightbulb, HelpCircle, Smile } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useLanguage } from "@/hooks/use-language"

const ITEMS_PER_PAGE = 10

export function RecentItems() {
  const [recentItems] = useLocalStorage("recentItems", [])
  const [currentPage, setCurrentPage] = useState(0)
  const { t } = useLanguage()

  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = recentItems.slice(startIndex, endIndex)
  const hasMore = recentItems.length > endIndex

  const getIcon = (type: string) => {
    switch (type) {
      case "fact":
        return <Lightbulb className="h-4 w-4 text-yellow-500" />
      case "question":
        return <HelpCircle className="h-4 w-4 text-blue-500" />
      case "joke":
        return <Smile className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "fact":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "question":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "joke":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  if (recentItems.length === 0) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Clock className="h-6 w-6" />
          {t("recentItems")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentItems.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getIcon(item.type)}
                <Badge className={getTypeColor(item.type)}>
                  {t(item.type)} - {item.category}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">{new Date(item.timestamp).toLocaleDateString()}</span>
            </div>
            <p className="text-sm leading-relaxed">{item.content}</p>
          </div>
        ))}

        {hasMore && (
          <div className="text-center">
            <Button variant="outline" onClick={() => setCurrentPage((prev) => prev + 1)}>
              {t("loadMore")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
