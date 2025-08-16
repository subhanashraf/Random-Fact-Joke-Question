"use client"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import Link from "next/link"
export function Header() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  const LANGUAGES = {
  en: { name: "English", flag: "🇺🇸" },
  zh: { name: "中文", flag: "🇨🇳" },
  es: { name: "Español", flag: "🇪🇸" },
  ru: { name: "Русский", flag: "🇷🇺" },
  hi: { name: "हिंदी", flag: "🇮🇳" },
  fr: { name: "Français", flag: "🇫🇷" },
  pt: { name: "Português", flag: "🇵🇹" },
  ar: { name: "العربية", flag: "🇸🇦" },
}

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/">
         <div className="flex items-center">
  <span className="text-yellow-400 text-2xl">🎲</span>
  <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-2xl font-bold ml-2">
    {t("websiteName")}
  </h1>
</div>
          </Link>

        </div>

        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shadow-md hover:shadow-lg transition-shadow bg-transparent"
              >
                
 <span className="text-lg">{language}</span>
    </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-xl">
<DropdownMenuItem onClick={() => setLanguage("en")}>🇺🇸 English</DropdownMenuItem>
<DropdownMenuItem onClick={() => setLanguage("zh")}>🇨🇳 中文</DropdownMenuItem>
<DropdownMenuItem onClick={() => setLanguage("es")}>🇪🇸 Español</DropdownMenuItem>
<DropdownMenuItem onClick={() => setLanguage("ru")}>🇷🇺 Русский</DropdownMenuItem>
<DropdownMenuItem onClick={() => setLanguage("hi")}>🇮🇳 हिंदी</DropdownMenuItem>
<DropdownMenuItem onClick={() => setLanguage("fr")}>🇫🇷 Français</DropdownMenuItem>

<DropdownMenuItem onClick={() => setLanguage("pt")}>🇵🇹 Português</DropdownMenuItem>
<DropdownMenuItem onClick={() => setLanguage("ar")}>🇸🇦 العربية</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  )
}
