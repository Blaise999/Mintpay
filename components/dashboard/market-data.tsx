"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

type Coin = { id: string; symbol: string; name: string; image: string; current_price: number; price_change_percentage_24h: number }

export function MarketData() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/markets?ids=bitcoin,ethereum,tether,usd-coin,celo")
      .then((r) => r.json())
      .then((d) => setCoins(Array.isArray(d) ? d : []))
      .catch(() => setCoins([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="h-40 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-white/5" />

  return (
    <div className="space-y-2">
      {coins.map((c) => {
        const up = (c.price_change_percentage_24h ?? 0) >= 0
        return (
          <div key={c.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-white/10">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} className="h-8 w-8 rounded-full" />
              <div>
                <p className="font-semibold">{c.symbol?.toUpperCase()}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{c.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${c.current_price?.toLocaleString(undefined, { maximumFractionDigits: c.current_price < 1 ? 4 : 2 })}</p>
              <p className={`flex items-center justify-end gap-1 text-xs font-medium ${up ? "text-emerald-600" : "text-red-500"}`}>
                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(c.price_change_percentage_24h ?? 0).toFixed(2)}%
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
