// app/api/contact/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const result = await db.collection("contacts").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    })

    return NextResponse.json({ id: result.insertedId, message: "Message saved" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
  }
}
