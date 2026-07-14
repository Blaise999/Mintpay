// Server-side crypto price source (CoinGecko). USD-first.
// Cached in-memory to stay under CoinGecko's free rate limit.
const CG = "https://api.coingecko.com/api/v3/simple/price"
const cache = new Map<string, { at: number; data: any }>()
const TTL = 30_000 // 30s

export async function getPrices(ids: string, vs = "usd"): Promise<Record<string, Record<string, number>>> {
  const key = `${ids}|${vs}`
  const hit = cache.get(key)
  if (hit && Date.now() - hit.at < TTL) return hit.data

  const url = `${CG}?ids=${encodeURIComponent(ids)}&vs_currencies=${encodeURIComponent(vs)}`
  const headers: Record<string, string> = {}
  if (process.env.COINGECKO_API_KEY) headers["x-cg-demo-api-key"] = process.env.COINGECKO_API_KEY

  const res = await fetch(url, { headers, next: { revalidate: 30 } as any })
  if (!res.ok) {
    if (hit) return hit.data // serve stale on failure
    throw new Error(`price source ${res.status}`)
  }
  const data = await res.json()
  cache.set(key, { at: Date.now(), data })
  return data
}
