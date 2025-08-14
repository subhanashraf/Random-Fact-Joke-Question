import { type NextRequest, NextResponse } from "next/server"

const cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

const CACHE_TTL = {
  facts: 5 * 60 * 1000, // 5 minutes
  questions: 5 * 60 * 1000, // 5 minutes
  jokes: 5 * 60 * 1000, // 5 minutes
  default: 10 * 60 * 1000, // 10 minutes
}

export function getCachedData(key: string): any | null {
  const cached = cache.get(key)
  if (!cached) return null

  if (Date.now() - cached.timestamp > cached.ttl) {
    cache.delete(key)
    return null
  }

  return cached.data
}

export function setCachedData(key: string, data: any, type: keyof typeof CACHE_TTL = "default"): void {
  const ttl = CACHE_TTL[type] || CACHE_TTL.default
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  })
}

export function clearCache(): void {
  cache.clear()
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")

  if (action === "clear") {
    clearCache()
    return NextResponse.json({ success: true, message: "Cache cleared" })
  }

  if (action === "stats") {
    return NextResponse.json({
      size: cache.size,
      keys: Array.from(cache.keys()),
    })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
