import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { generateWithAI } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const { category, language, includeEmojis } = await request.json()

    // Try to get from database first
    const { db } = await connectToDatabase()
    const existingFact = await db.collection("facts").findOne({
      type: category.toLowerCase(),
      language: language || "en",
    })

    if (existingFact && Math.random() > 0.5) {
      return NextResponse.json({ content: existingFact.content })
    }

    // Generate with AI
    const prompt = `Generate a ${category === "Random" ? "random" : category.toLowerCase()} fact that is:
    - Educational and informative
    - Safe for all ages
    - Interesting and engaging
    - Concise (1-2 sentences)
    ${includeEmojis ? "- Include relevant emojis" : "- No emojis"}
    ${language === "zh" ? "Respond in Chinese" : "Respond in English"}`

    const content = await generateWithAI(prompt)

    // Store in database
    await db.collection("facts").insertOne({
      type: category.toLowerCase(),
      language: language || "en",
      content,
      createdAt: new Date(),
    })

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error generating fact:", error)
    return NextResponse.json({ error: "Failed to generate fact" }, { status: 500 })
  }
}
