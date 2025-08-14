import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const settings = await db.collection("settings").findOne({ type: "content_generation" })

    return NextResponse.json(
      settings || {
        randomAiRatio: 0.7,
        specificAiRatio: 0.95,
        enableDuplicateCheck: true,
      },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const settings = await request.json()
    const { db } = await connectToDatabase()

    await db
      .collection("settings")
      .updateOne({ type: "content_generation" }, { $set: { ...settings, updatedAt: new Date() } }, { upsert: true })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
