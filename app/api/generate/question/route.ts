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
      const existingQuestions = await db
        .collection("questions")
        .find({
          type: category.toLowerCase(),
          language: language || "en",
        })
        .toArray()

      if (existingQuestions.length > 0) {
        const randomQuestion = existingQuestions[Math.floor(Math.random() * existingQuestions.length)]
        return NextResponse.json({ content: randomQuestion.content, source: "database" })
      }
    }

    const prompt = `Generate a unique ${category === "Random" ? "random" : category.toLowerCase()} question that is:
    - Thought-provoking and creative
    - Safe for all ages
    - Engaging and interesting
    - Open-ended or discussion-worthy
    - Original and not commonly asked
    ${includeEmojis ? "- Include relevant emojis" : "- No emojis"}
    ${language === "zh" ? "Respond in Chinese" : "Respond in English"}`

    const content = await generateWithAI(prompt)

    const existingContent = await db.collection("questions").findOne({
      content: { $regex: content.substring(0, 50), $options: "i" },
    })

    if (!existingContent) {
      await db.collection("questions").insertOne({
        type: category.toLowerCase(),
        language: language || "en",
        content,
        createdAt: new Date(),
        source: "ai",
      })
    }

    return NextResponse.json({ content, source: "ai" })
  } catch (error) {
    console.error("Error generating question:", error)
    return NextResponse.json({ error: "Failed to generate question" }, { status: 500 })
  }
}
