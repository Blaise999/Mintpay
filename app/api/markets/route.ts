import { NextResponse } from "next/server"
export const runtime = "nodejs"
export const revalidate = 30

const cache = new Map<string, { at: number; data: any }>()

export async function GET(req: Request) {
  const ids = new URL(req.url).searchParams.get("ids") || "bitcoin,ethereum,tether,usd-coin,celo"
  const key = ids
  const hit = cache.get(key)
  if (hit && Date.now() - hit.at < 30_000) return NextResponse.json(hit.data)
  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${encodeURIComponent(ids)}&price_change_percentage=24h`
    const headers: Record<string, string> = {}
    if (process.env.COINGECKO_API_KEY) headers["x-cg-demo-api-key"] = process.env.COINGECKO_API_KEY
    const res = await fetch(url, { headers, next: { revalidate: 30 } as any })
    if (!res.ok) throw new Error(String(res.status))
    const data = await res.json()
    cache.set(key, { at: Date.now(), data })
    return NextResponse.json(data)
  } catch (e: any) {
    if (hit) return NextResponse.json(hit.data)
    return NextResponse.json({ error: e?.message || "markets error" }, { status: 502 })
  }
}
