import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { generateWithAI } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const { category, language, includeEmojis } = await request.json()

    // Try to get from database first
    const { db } = await connectToDatabase()
    const existingJoke = await db.collection("jokes").findOne({
      type: category.toLowerCase(),
      language: language || "en",
    })

    if (existingJoke && Math.random() > 0.5) {
      return NextResponse.json({ content: existingJoke.content })
    }

    // Generate with AI
    const prompt = `Generate a ${category === "Random" ? "random" : category.toLowerCase()} joke that is:
    - Funny and entertaining
    - Safe for all ages (family-friendly)
    - Clean and appropriate
    - Easy to understand
    ${includeEmojis ? "- Include relevant emojis" : "- No emojis"}
    ${language === "zh" ? "Respond in Chinese" : "Respond in English"}`

    const content = await generateWithAI(prompt)

    // Store in database
    await db.collection("jokes").insertOne({
      type: category.toLowerCase(),
      language: language || "en",
      content,
      createdAt: new Date(),
    })

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error generating joke:", error)
    return NextResponse.json({ error: "Failed to generate joke" }, { status: 500 })
  }
}
