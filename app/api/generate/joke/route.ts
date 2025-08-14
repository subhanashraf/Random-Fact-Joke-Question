import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { generateWithAI } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const { category, language, includeEmojis } = await request.json()

    const { db } = await connectToDatabase()

    let aiRatio = 0.7 // Default for random: 70% AI, 30% database
    if (category !== "Random") {
      aiRatio = 0.95 // For specific categories: 95% AI, 5% database
    }

    const useAI = Math.random() < aiRatio

    if (!useAI) {
      const existingJokes = await db
        .collection("jokes")
        .find({
          type: category.toLowerCase(),
          language: language || "en",
        })
        .toArray()

      if (existingJokes.length > 0) {
        const randomJoke = existingJokes[Math.floor(Math.random() * existingJokes.length)]
        return NextResponse.json({ content: randomJoke.content, source: "database" })
      }
    }

    const prompt = `Generate a unique ${category === "Random" ? "random" : category.toLowerCase()} joke that is:
    - Funny and entertaining
    - Safe for all ages (family-friendly)
    - Clean and appropriate
    - Easy to understand
    - Original and not overused
    ${includeEmojis ? "- Include relevant emojis" : "- No emojis"}
    ${language === "zh" ? "Respond in Chinese" : "Respond in English"}`

    const content = await generateWithAI(prompt)

    const existingContent = await db.collection("jokes").findOne({
      content: { $regex: content.substring(0, 50), $options: "i" },
    })

    if (!existingContent) {
      await db.collection("jokes").insertOne({
        type: category.toLowerCase(),
        language: language || "en",
        content,
        createdAt: new Date(),
        source: "ai",
      })
    }

    return NextResponse.json({ content, source: "ai" })
  } catch (error) {
    console.error("Error generating joke:", error)
    return NextResponse.json({ error: "Failed to generate joke" }, { status: 500 })
  }
}
