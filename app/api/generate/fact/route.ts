import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { generateWithAI } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const { category, language, includeEmojis } = await request.json()

    const { db } = await connectToDatabase()

    // Determine AI vs Database ratio based on category
    let aiRatio = 0.7 // Default for random: 70% AI, 30% database
    if (category !== "Random") {
      aiRatio = 0.95 // For specific categories: 95% AI, 5% database
    }

    const useAI = Math.random() < aiRatio

    if (!useAI) {
      // Try to get unique content from database first
      const existingFacts = await db
        .collection("facts")
        .find({
          type: category.toLowerCase(),
          language: language || "en",
        })
        .toArray()

      if (existingFacts.length > 0) {
        const randomFact = existingFacts[Math.floor(Math.random() * existingFacts.length)]
        return NextResponse.json({ content: randomFact.content, source: "database" })
      }
    }

    // Generate with AI
    const prompt = `Generate a unique ${category === "Random" ? "random" : category.toLowerCase()} fact that is:
    - Educational and informative
    - Safe for all ages
    - Interesting and engaging
    - Concise (1-2 sentences)
    - Not commonly known
    ${includeEmojis ? "- Include relevant emojis" : "- No emojis"}
    ${language === "zh" ? "Respond in Chinese" : "Respond in English"}`

    const content = await generateWithAI(prompt)

    // Check for duplicates before storing
    const existingContent = await db.collection("facts").findOne({
      content: { $regex: content.substring(0, 50), $options: "i" },
    })

    if (!existingContent) {
      // Store in database only if unique
      await db.collection("facts").insertOne({
        type: category.toLowerCase(),
        language: language || "en",
        content,
        createdAt: new Date(),
        source: "ai",
      })
    }

    return NextResponse.json({ content, source: "ai" })
  } catch (error) {
    console.error("Error generating fact:", error)
    return NextResponse.json({ error: "Failed to generate fact" }, { status: 500 })
  }
}
