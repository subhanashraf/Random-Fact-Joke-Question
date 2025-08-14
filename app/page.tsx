"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { FactGenerator } from "@/components/fact-generator"
import { QuestionGenerator } from "@/components/question-generator"
import { JokeGenerator } from "@/components/joke-generator"
import { RecentItems } from "@/components/recent-items"
import { FunFactOfDay } from "@/components/fun-fact-of-day"
import { PopularJoke } from "@/components/popular-joke"
import { AdSlot } from "@/components/ad-slot"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, HelpCircle, Smile, TrendingUp, Users, Star } from "lucide-react"

function HomeContent() {
  const [activeSection, setActiveSection] = useState<"fact" | "question" | "joke">("fact")
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">🎲 Random Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("heroDescription")}</p>

          <div className="flex justify-center gap-2 p-2 bg-muted rounded-lg max-w-md mx-auto">
            <Button
              variant={activeSection === "fact" ? "default" : "ghost"}
              onClick={() => setActiveSection("fact")}
              className="flex-1 flex items-center gap-2"
            >
              <Lightbulb className="h-4 w-4" />
              {t("fact")}
            </Button>
            <Button
              variant={activeSection === "question" ? "default" : "ghost"}
              onClick={() => setActiveSection("question")}
              className="flex-1 flex items-center gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              {t("question")}
            </Button>
            <Button
              variant={activeSection === "joke" ? "default" : "ghost"}
              onClick={() => setActiveSection("joke")}
              className="flex-1 flex items-center gap-2"
            >
              <Smile className="h-4 w-4" />
              {t("joke")}
            </Button>
          </div>
        </section>

        {/* Ad Slot */}
     

        <div className="space-y-8">
          {activeSection === "fact" && <FactGenerator />}
          {activeSection === "question" && <QuestionGenerator />}
          {activeSection === "joke" && <JokeGenerator />}
        </div>
   <AdSlot position="top" />
        <div className="grid md:grid-cols-2 gap-6">
          <FunFactOfDay />
          <PopularJoke />
        </div>

        {/* Statistics Section */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">10,000+</h3>
              <p className="text-muted-foreground">{t("factsGenerated")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">5,000+</h3>
              <p className="text-muted-foreground">{t("activeUsers")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">4.9/5</h3>
              <p className="text-muted-foreground">{t("userRating")}</p>
            </CardContent>
          </Card>
        </section>

        {/* Ad Slot */}
        <AdSlot position="middle" />

        {/* Recent Items */}
        <RecentItems />

        {/* Features Section */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold">{t("whyChooseUs")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t("educationalContent")}</h3>
                <p className="text-muted-foreground">{t("educationalDescription")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t("familyFriendly")}</h3>
                <p className="text-muted-foreground">{t("familyDescription")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Star className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t("qualityContent")}</h3>
                <p className="text-muted-foreground">{t("qualityDescription")}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Ad Slot */}
        <AdSlot position="bottom" />
      </main>
    </div>
  )
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  )
}
