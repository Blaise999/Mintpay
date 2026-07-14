import { NextResponse } from "next/server"
import { getPrices } from "@/lib/server/prices"

export const runtime = "nodejs"
export const revalidate = 30

// GET /api/price?ids=ethereum,tether,usd-coin&vs_currencies=usd
// Drop-in shape-compatible with CoinGecko simple/price.
export async function GET(req: Request) {
  try {
    const sp = new URL(req.url).searchParams
    const ids = sp.get("ids") || "ethereum,tether,usd-coin"
    const vs = sp.get("vs_currencies") || "usd"
    const data = await getPrices(ids, vs)
    return NextResponse.json(data, { headers: { "Cache-Control": "public, max-age=15, s-maxage=30" } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "price error" }, { status: 502 })
  }
}
