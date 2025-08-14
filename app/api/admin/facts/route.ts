import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const facts = await db.collection("facts").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(facts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch facts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, language, content } = await request.json()
    const { db } = await connectToDatabase()

    const result = await db.collection("facts").insertOne({
      type: type.toLowerCase(),
      language,
      content,
      createdAt: new Date(),
    })

    return NextResponse.json({ id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create fact" }, { status: 500 })
  }
}
