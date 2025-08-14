import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { generateWithAI } from "@/lib/ai"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    // Check if we have today's fact
    const today = new Date().toDateString()
    const todaysFact = await db.collection("daily_facts").findOne({
      date: today,
    })

    if (todaysFact) {
      return NextResponse.json({ content: todaysFact.content })
    }

    // Generate new fact of the day
    const prompt = `Generate a fascinating daily fact that is:
    - Educational and surprising
    - Safe for all ages
    - Memorable and shareable
    - Include relevant emojis
    - 1-2 sentences maximum`

    const content = await generateWithAI(prompt)

    // Store today's fact
    await db.collection("daily_facts").insertOne({
      date: today,
      content,
      createdAt: new Date(),
    })

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error getting fact of day:", error)
    return NextResponse.json({ content: "Did you know? The human brain contains approximately 86 billion neurons! 🧠" })
  }
}
