"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    websiteName: "Random Generator",
    websiteTitle: "Random Generator - Facts, Questions & Jokes",
    heroDescription: "Discover amazing facts, thought-provoking questions, and hilarious jokes!",
    factGenerator: "🧠 Random Fact Generator",
    questionGenerator: "❓ Random Question Generator",
    jokeGenerator: "😄 Random Joke Generator",
    generateFact: "Generate Fact",
    generateQuestion: "Generate Question",
    generateJoke: "Generate Joke",
    generating: "Generating...",
    recentItems: "Recent Items",
    loadMore: "Load More",
    funFactOfDay: "Fun Fact of the Day",
    mostPopularJoke: "Most Popular Joke",
    addCustomCategory: "Add custom category...",
    fact: "Facts",
    question: "Questions",
    joke: "Jokes",
    factsGenerated: "Facts Generated",
    activeUsers: "Active Users",
    userRating: "User Rating",
    whyChooseUs: "Why Choose Us?",
    educationalContent: "Educational Content",
    educationalDescription: "Learn something new every day with our curated facts and questions.",
    familyFriendly: "Family Friendly",
    familyDescription: "Safe and appropriate content for all ages and family members.",
    qualityContent: "Quality Content",
    qualityDescription: "Hand-picked and AI-generated content that's both fun and informative.",
    categories: {
      random: "Random",
      fun: "Fun",
      science: "Science",
      history: "History",
      technology: "Technology",
      space: "Space",
      health: "Health",
      nature: "Nature",
      sports: "Sports",
      culture: "Culture",
      entertainment: "Entertainment",
      education: "Education",
      lifestyle: "Lifestyle",
      food: "Food",
      music: "Music",
      art: "Art",
      travel: "Travel",
      philosophy: "Philosophy",
      psychology: "Psychology",
      literature: "Literature",
      movies: "Movies",
      games: "Games",
      relationships: "Relationships",
      career: "Career",
      creativity: "Creativity",
      ethics: "Ethics",
      future: "Future",
      childhood: "Childhood",
      dreams: "Dreams",
      hobbies: "Hobbies",
      adventure: "Adventure",
      mystery: "Mystery",
      funny: "Funny",
      dadjokes: "Dad Jokes",
      kids: "Kids",
      wordplay: "Wordplay",
      animals: "Animals",
      darkhumor: "Dark Humor",
      puns: "Puns",
      personal: "Personal",
      creative: "Creative",
    },
  },
  zh: {
    websiteName: "随机生成器",
    websiteTitle: "随机生成器 - 事实、问题和笑话",
    heroDescription: "发现令人惊叹的事实、发人深省的问题和搞笑的笑话！",
    factGenerator: "🧠 随机事实生成器",
    questionGenerator: "❓ 随机问题生成器",
    jokeGenerator: "😄 随机笑话生成器",
    generateFact: "生成事实",
    generateQuestion: "生成问题",
    generateJoke: "生成笑话",
    generating: "生成中...",
    recentItems: "最近项目",
    loadMore: "加载更多",
    funFactOfDay: "今日趣味事实",
    mostPopularJoke: "最受欢迎笑话",
    addCustomCategory: "添加自定义类别...",
    fact: "事实",
    question: "问题",
    joke: "笑话",
    factsGenerated: "生成的事实",
    activeUsers: "活跃用户",
    userRating: "用户评分",
    whyChooseUs: "为什么选择我们？",
    educationalContent: "教育内容",
    educationalDescription: "通过我们精选的事实和问题，每天学习新知识。",
    familyFriendly: "家庭友好",
    familyDescription: "适合所有年龄和家庭成员的安全内容。",
    qualityContent: "优质内容",
    qualityDescription: "精心挑选和AI生成的内容，既有趣又有信息量。",
    categories: {
      random: "随机",
      fun: "有趣",
      science: "科学",
      history: "历史",
      technology: "技术",
      space: "太空",
      health: "健康",
      nature: "自然",
      sports: "体育",
      culture: "文化",
      entertainment: "娱乐",
      education: "教育",
      lifestyle: "生活方式",
      food: "食物",
      music: "音乐",
      art: "艺术",
      travel: "旅行",
      philosophy: "哲学",
      psychology: "心理学",
      literature: "文学",
      movies: "电影",
      games: "游戏",
      relationships: "关系",
      career: "职业",
      creativity: "创造力",
      ethics: "伦理",
      future: "未来",
      childhood: "童年",
      dreams: "梦想",
      hobbies: "爱好",
      adventure: "冒险",
      mystery: "神秘",
      funny: "搞笑",
      dadjokes: "爸爸笑话",
      kids: "儿童",
      wordplay: "文字游戏",
      animals: "动物",
      darkhumor: "黑色幽默",
      puns: "双关语",
      personal: "个人",
      creative: "创意",
    },
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language as keyof typeof translations]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
