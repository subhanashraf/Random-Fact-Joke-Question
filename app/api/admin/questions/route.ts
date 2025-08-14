import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const questions = await db.collection("questions").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(questions)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, language, content } = await request.json()
    const { db } = await connectToDatabase()

    const result = await db.collection("questions").insertOne({
      type: type.toLowerCase(),
      language,
      content,
      createdAt: new Date(),
    })

    return NextResponse.json({ id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 })
  }
}
