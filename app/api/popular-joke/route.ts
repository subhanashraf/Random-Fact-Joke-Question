import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    // Get a random popular joke from database
    const jokes = await db
      .collection("jokes")
      .aggregate([{ $sample: { size: 1 } }])
      .toArray()

    if (jokes.length > 0) {
      return NextResponse.json({ content: jokes[0].content })
    }

    // Fallback joke
    return NextResponse.json({
      content: "Why don't scientists trust atoms? Because they make up everything! 😄",
    })
  } catch (error) {
    console.error("Error getting popular joke:", error)
    return NextResponse.json({
      content: "Why don't scientists trust atoms? Because they make up everything! 😄",
    })
  }
}
