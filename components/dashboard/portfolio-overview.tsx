"use client"

import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

const USDT_CONTRACT = "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2"
const USDC_CONTRACT = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"

const tokens = [
  { symbol: "ETH", name: "Ethereum", coingeckoId: "ethereum", color: "from-blue-500 to-violet-600" },
  { symbol: "USDT", name: "Tether", coingeckoId: "tether", color: "from-emerald-500 to-teal-600", contract: USDT_CONTRACT, decimals: 6 },
  { symbol: "USDC", name: "USD Coin", coingeckoId: "usd-coin", color: "from-blue-400 to-cyan-600", contract: USDC_CONTRACT, decimals: 6 },
]

async function ethBal(address: string) {
  const k = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
  try {
    const r = await fetch(`https://api.etherscan.io/v2/api?chainid=8453&module=account&action=balance&address=${address}&tag=latest&apikey=${k}`)
    const d = await r.json()
    return d.status === "1" ? Number(d.result) / 1e18 : 0
  } catch { return 0 }
}
async function ercBal(address: string, contract: string, decimals: number) {
  const k = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
  try {
    const r = await fetch(`https://api.etherscan.io/v2/api?chainid=8453&module=account&action=tokenbalance&contractaddress=${contract}&address=${address}&tag=latest&apikey=${k}`)
    const d = await r.json()
    return d.status === "1" ? Number(d.result) / 10 ** decimals : 0
  } catch { return 0 }
}

export function PortfolioOverview({ wallet }: { wallet: any }) {
  const [rows, setRows] = useState<{ symbol: string; balance: number; color: string }[]>([])
  const [prices, setPrices] = useState<Record<string, { usd: number }>>({})
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (!wallet?.address) return
    setLoading(true)
    Promise.all([
      ethBal(wallet.address),
      ercBal(wallet.address, USDT_CONTRACT, 6),
      ercBal(wallet.address, USDC_CONTRACT, 6),
      fetch(`/api/price?ids=${tokens.map((t) => t.coingeckoId).join(",")}&vs_currencies=usd`).then((r) => r.json()).catch(() => ({})),
    ]).then(([eth, usdt, usdc, p]) => {
      setRows([
        { symbol: "ETH", balance: eth, color: tokens[0].color },
        { symbol: "USDT", balance: usdt, color: tokens[1].color },
        { symbol: "USDC", balance: usdc, color: tokens[2].color },
      ])
      setPrices(p)
      setLoading(false)
    })
  }, [wallet])

  const total = rows.reduce((s, r) => {
    const t = tokens.find((x) => x.symbol === r.symbol)!
    return s + r.balance * (prices[t.coingeckoId]?.usd || 0)
  }, 0)
  const usd = (n: number) => (show ? `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "••••")

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Total balance</p>
          <p className="font-display text-3xl font-bold">{loading ? "…" : usd(total)}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setShow((s) => !s)} className="rounded-full text-slate-400">
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </Button>
      </div>

      <div className="mt-5 space-y-2">
        {rows.map((r) => {
          const t = tokens.find((x) => x.symbol === r.symbol)!
          const value = r.balance * (prices[t.coingeckoId]?.usd || 0)
          return (
            <div key={r.symbol} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition-colors hover:border-blue-200 dark:border-white/10 dark:hover:border-blue-900">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${r.color} text-xs font-bold text-white`}>{r.symbol.slice(0, 2)}</div>
                <div>
                  <p className="font-semibold">{r.symbol}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{show ? `${r.balance.toLocaleString(undefined, { maximumFractionDigits: 6 })}` : "••••"}</p>
                </div>
              </div>
              <p className="font-semibold">{loading ? "--" : usd(value)}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
