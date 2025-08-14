import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { generateWithAI } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const { category, language, includeEmojis } = await request.json()

    // Try to get from database first
    const { db } = await connectToDatabase()
    const existingQuestion = await db.collection("questions").findOne({
      type: category.toLowerCase(),
      language: language || "en",
    })

    if (existingQuestion && Math.random() > 0.5) {
      return NextResponse.json({ content: existingQuestion.content })
    }

    // Generate with AI
    const prompt = `Generate a ${category === "Random" ? "random" : category.toLowerCase()} question that is:
    - Thought-provoking and creative
    - Safe for all ages
    - Engaging and interesting
    - Open-ended or discussion-worthy
    ${includeEmojis ? "- Include relevant emojis" : "- No emojis"}
    ${language === "zh" ? "Respond in Chinese" : "Respond in English"}`

    const content = await generateWithAI(prompt)

    // Store in database
    await db.collection("questions").insertOne({
      type: category.toLowerCase(),
      language: language || "en",
      content,
      createdAt: new Date(),
    })

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error generating question:", error)
    return NextResponse.json({ error: "Failed to generate question" }, { status: 500 })
  }
}
