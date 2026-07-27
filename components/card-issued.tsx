"use client"

import { MintPayCard, type CardInfo } from "@/components/mintpay-card"
import { MintPayMark } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Copy, LogOut, ExternalLink } from "lucide-react"
import { useSession } from "@/components/session-provider"
import { toast } from "sonner"
import { groupNumber } from "@/lib/card"

export function CardIssued({
  name,
  email,
  card,
  emailed,
}: {
  name: string
  email: string
  card?: CardInfo
  emailed: boolean
}) {
  const { address, disconnect } = useSession()

  const copyCardNumber = () => {
    if (!card?.number) return
    navigator.clipboard.writeText(card.number)
      .then(() => toast.success("Card number copied to clipboard"))
      .catch(() => toast.error("Failed to copy"))
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-white">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-600/25 blur-[120px]" />

      <div className="relative w-full max-w-md text-center">
        <MintPayMark className="mx-auto mb-5 h-12 w-12" />

        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm text-emerald-300">
          <CheckCircle2 className="h-4 w-4" /> Card Successfully Minted
        </div>

        {/* Card Display */}
        <div className="mb-6 flex justify-center">
          <MintPayCard 
            holder={card?.holder || name.toUpperCase()} 
            number={card?.number} 
            expiry={card?.expiry} 
          />
        </div>

        {/* Copyable Card Number */}
        {card?.number && (
          <button
            onClick={copyCardNumber}
            className="mx-auto mb-8 flex items-center gap-2 rounded-full bg-white/5 px-5 py-2.5 font-mono text-sm text-slate-300 transition-all hover:bg-white/10 active:scale-95"
          >
            {groupNumber(card.number)} 
            <Copy className="h-4 w-4" />
          </button>
        )}

        <h1 className="font-display text-3xl font-bold tracking-tight">
          Welcome to MintPay, {name.split(" ")[0]}!
        </h1>

        <p className="mt-3 text-slate-400">
          {emailed ? (
            <>
              We&apos;ve sent your full card details to <span className="text-slate-200 font-medium">{email}</span>
            </>
          ) : (
            "Your card details are shown above. We couldn’t send them by email this time."
          )}
        </p>

        {address && (
          <p className="mx-auto mt-6 w-fit rounded-full bg-white/5 px-4 py-1 font-mono text-xs text-slate-500">
            {address.slice(0, 8)}…{address.slice(-6)}
          </p>
        )}

        <div className="mt-10 flex flex-col gap-3">
          <Button 
            className="rounded-full py-6 text-base"
            onClick={() => window.location.reload()} // or router.push('/dashboard')
          >
            Go to Dashboard <ExternalLink className="ml-2 h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            onClick={disconnect}
            className="rounded-full text-slate-400 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" /> Disconnect Wallet
          </Button>
        </div>

        <p className="mt-8 text-xs text-slate-600">
          Keep your card details secure • Treat it like any other debit card
        </p>
      </div>
    </div>
  )
}