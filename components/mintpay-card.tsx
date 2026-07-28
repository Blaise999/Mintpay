"use client"
import { groupNumber } from "@/lib/card"

export type CardInfo = {
  holder: string
  number: string
  last4?: string
  expiry: string
  issuedAt?: string
}

export function TrustCard({
  holder,
  number,
  expiry,
  className = "",
}: {
  holder?: string
  number?: string
  expiry?: string
  className?: string
}) {
  const display = number ? groupNumber(number) : "7042  ••••  ••••  ••••"
  return (
    <div
      className={`relative aspect-[1.586/1] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 p-5 text-white shadow-xl ring-1 ring-white/10 ${className}`}
    >
      {/* sheen + holo accent */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-300/40 to-fuchsia-400/40 blur-2xl" />

      <div className="relative flex items-start justify-between">
        <div>
          <span className="font-display text-lg font-bold">Trust</span>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Credit</p>
        </div>
        {/* contactless */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white/85">
          <path d="M9 8a6 6 0 0 1 0 8M13 5a11 11 0 0 1 0 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative mt-4 flex items-center gap-3">
        <div className="h-8 w-11 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-400" />
      </div>

      <div className="relative mt-3 font-mono text-lg tracking-[0.18em] [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]">{display}</div>

      <div className="relative mt-3 flex items-end justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-widest text-white/60">Card holder</p>
          <p className="text-sm uppercase tracking-wider">{holder || "Trust MEMBER"}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-widest text-white/60">Expires</p>
          <p className="text-sm">{expiry || "••/••"}</p>
        </div>
      </div>
    </div>
  )
}
