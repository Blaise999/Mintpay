"use client"

import { Smartphone, Tv, Zap, Wifi, ArrowUpDown, Plus } from "lucide-react"

const actions = [
  { name: "Airtime", icon: Smartphone, href: "/airtime", color: "from-blue-500 to-indigo-600" },
  { name: "Internet", icon: Wifi, href: "/internet", color: "from-cyan-500 to-blue-600" },
  { name: "TV", icon: Tv, href: "/tv", color: "from-violet-500 to-purple-600" },
  { name: "Electricity", icon: Zap, href: "/electricity", color: "from-amber-400 to-orange-500" },
  { name: "Convert", icon: ArrowUpDown, href: "/convert", color: "from-blue-500 to-violet-600" },
  { name: "More", icon: Plus, href: "/services", color: "from-slate-400 to-slate-600" },
]

export function QuickActions({ wallet }: { wallet: any }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((a) => (
        <a
          key={a.name}
          href={a.href + (wallet?.address ? `?wallet=${wallet.address}` : "")}
          className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-white/10 dark:hover:border-blue-900"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${a.color} text-white shadow-sm transition-transform group-hover:scale-110`}>
            <a.icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-semibold">{a.name}</span>
        </a>
      ))}
    </div>
  )
}
