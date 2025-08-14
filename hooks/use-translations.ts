"use client"

import { useState, useEffect } from "react"

interface Translations {
  [key: string]: any
}

export function useTranslations(language = "en") {
  const [translations, setTranslations] = useState<Translations>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/translations/${language}.json`)
        if (response.ok) {
          const data = await response.json()
          setTranslations(data)
        }
      } catch (error) {
        console.error("Failed to load translations:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTranslations()
  }, [language])

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return { t, loading, translations }
}
