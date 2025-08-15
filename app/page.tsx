"use client"

import { useState, Suspense } from "react"
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
import { Lightbulb, TrendingUp, Users, Star, Sparkles } from "lucide-react"

function LoadingCard() {
  return (
    <Card className="glass-effect shadow-lg animate-pulse">
      <CardContent className="p-6">
        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
      </CardContent>
    </Card>
  )
}

function LoadingGenerator() {
  return (
    <Card className="glass-effect shadow-lg animate-pulse">
      <CardContent className="p-8">
        <div className="h-6 bg-muted rounded w-1/2 mx-auto mb-4"></div>
        <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-6"></div>
        <div className="h-10 bg-muted rounded w-32 mx-auto"></div>
      </CardContent>
    </Card>
  )
}

function HomeContent() {
  const [activeSection, setActiveSection] = useState<"fact" | "question" | "joke">("fact")
  const { t, loading } = useLanguage()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading amazing content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="h-20 bg-background/80 backdrop-blur-md"></div>}>
        <Header />
      </Suspense>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section - Simplified and more welcoming */}
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Welcome to Random Generator!
            </div>
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl md:text-5xl " aria-hidden="true">🎲</span>
              <h1 className="text-4xl md:text-6xl font-bold gradient-text-primary">
                {t("heroTitle") || "Discover Amazing Content"}
              </h1>
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("heroDescription") || "Generate random facts, questions, and jokes instantly!"}
            </p>
          </div>
          <Suspense fallback={<div className="h-24 bg-muted/20 rounded-lg animate-pulse"></div>}>
            <AdSlot position="top" />
          </Suspense>

          {/* Simplified Navigation - More prominent and user-friendly */}
          <div className="flex justify-center">
            <div className="flex gap-3 p-3 glass-effect rounded-2xl shadow-lg max-w-md mx-auto">
              <Button
                variant={activeSection === "fact" ? "default" : "ghost"}
                onClick={() => setActiveSection("fact")}
                className={`flex-1 flex items-center gap-2 rounded-xl transition-all duration-300 ${activeSection === "fact" ? "gradient-primary text-white shadow-md" : "hover:bg-muted/50"
                  }`}
              >
                <span className="text-lg">📚</span>
                {t("navigation.facts") || "Facts"}
              </Button>
              <Button
                variant={activeSection === "question" ? "default" : "ghost"}
                onClick={() => setActiveSection("question")}
                className={`flex-1 flex items-center gap-2 rounded-xl transition-all duration-300 ${activeSection === "question" ? "gradient-primary text-white shadow-md" : "hover:bg-muted/50"
                  }`}
              >
                <span className="text-lg">❓</span>
                {t("navigation.questions") || "Questions"}
              </Button>
              <Button
                variant={activeSection === "joke" ? "default" : "ghost"}
                onClick={() => setActiveSection("joke")}
                className={`flex-1 flex items-center gap-2 rounded-xl transition-all duration-300 ${activeSection === "joke" ? "gradient-primary text-white shadow-md" : "hover:bg-muted/50"
                  }`}
              >
                <span className="text-lg">😂</span>
                {t("navigation.jokes") || "Jokes"}
              </Button>
            </div>
          </div>
        </section>

        {/* Ad Slot */}


        {/* Main Generator Section */}
        <div className="space-y-8">
          <Suspense fallback={<LoadingGenerator />}>
            {activeSection === "fact" && <FactGenerator />}
            {activeSection === "question" && <QuestionGenerator />}
            {activeSection === "joke" && <JokeGenerator />}
          </Suspense>
        </div>

        {/* Featured Content */}
        <div className="grid md:grid-cols-2 gap-6">
          <Suspense fallback={<LoadingCard />}>
            <FunFactOfDay />
          </Suspense>
          <Suspense fallback={<LoadingCard />}>
            <PopularJoke />
          </Suspense>
        </div>

        {/* Statistics Section - Enhanced with gradients */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card className="glass-effect shadow-lg hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold gradient-text-primary">10,000+</h3>
              <p className="text-muted-foreground">{t("ui.factsGenerated") || "Facts Generated"}</p>
            </CardContent>
          </Card>
          <Card className="glass-effect shadow-lg hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="gradient-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold gradient-text-secondary">5,000+</h3>
              <p className="text-muted-foreground">{t("ui.activeUsers") || "Active Users"}</p>
            </CardContent>
          </Card>
          <Card className="glass-effect shadow-lg hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="gradient-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold gradient-text-primary">4.9/5</h3>
              <p className="text-muted-foreground">{t("ui.userRating") || "User Rating"}</p>
            </CardContent>
          </Card>
        </section>

        {/* Ad Slot */}
        <Suspense fallback={<div className="h-24 bg-muted/20 rounded-lg animate-pulse"></div>}>
          <AdSlot position="middle" />
        </Suspense>

        {/* Recent Items */}
        <Suspense fallback={<LoadingCard />}>
          <RecentItems />
        </Suspense>

        {/* Features Section - Enhanced design */}
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold gradient-text-primary">{t("ui.whyChooseUs") || "Why Choose Us?"}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover why millions of users trust our platform for educational entertainment
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-effect shadow-lg hover:shadow-glow transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="gradient-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Lightbulb className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {t("ui.features.educational.title") || "Educational Content"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("ui.features.educational.description") ||
                    "Learn something new every day with our curated facts and questions."}
                </p>
              </CardContent>
            </Card>
            <Card className="glass-effect shadow-lg hover:shadow-glow transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="gradient-secondary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {t("ui.features.familyFriendly.title") || "Family Friendly"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("ui.features.familyFriendly.description") ||
                    "Safe and appropriate content for all ages and family members."}
                </p>
              </CardContent>
            </Card>
            <Card className="glass-effect shadow-lg hover:shadow-glow transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="gradient-accent rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {t("ui.features.qualityContent.title") || "Quality Content"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("ui.features.qualityContent.description") ||
                    "Hand-picked and AI-generated content that's both fun and informative."}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Ad Slot */}
        <Suspense fallback={<div className="h-24 bg-muted/20 rounded-lg animate-pulse"></div>}>
          <AdSlot position="bottom" />
        </Suspense>
      </main>
    </div>
  )
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading Random Generator...</p>
            </div>
          </div>
        }
      >
        <HomeContent />
      </Suspense>
    </LanguageProvider>
  )
}
