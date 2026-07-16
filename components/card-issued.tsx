"use client"

import { MintPayCard, type CardInfo } from "@/components/mintpay-card"
import { MintPayMark } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Copy, LogOut } from "lucide-react"
import { useSession } from "@/components/session-provider"
import { toast } from "sonner"
import { groupNumber } from "@/lib/card"

/** Final step: show the card that was just minted, then thank the user. */
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

  const copy = () => {
    if (!card?.number) return
    navigator.clipboard.writeText(card.number).then(
      () => toast.success("Card number copied"),
      () => toast.error("Couldn't copy"),
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-white">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-600/25 blur-[120px]" />

      <div className="relative w-full max-w-md text-center">
        <MintPayMark className="mx-auto mb-5 h-12 w-12" />

        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm text-emerald-300">
          <CheckCircle2 className="h-4 w-4" /> Your MintPay card is ready
        </div>

        <div className="mb-6 flex justify-center">
          <MintPayCard holder={card?.holder || name.toUpperCase()} number={card?.number} expiry={card?.expiry} />
        </div>

        {card?.number && (
          <button
            onClick={copy}
            className="mx-auto mb-6 flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 font-mono text-xs text-slate-300 transition-colors hover:bg-white/10"
          >
            {groupNumber(card.number)} <Copy className="h-3.5 w-3.5" />
          </button>
        )}

        <h1 className="font-display text-3xl font-bold">Thank you for using this DApp</h1>
        <p className="mt-3 text-sm text-slate-400">
          {emailed ? (
            <>
              We&apos;ve sent your card to <span className="text-slate-200">{email}</span>.
            </>
          ) : (
            <>
              Your card is saved to your account. We couldn&apos;t email a copy to{" "}
              <span className="text-slate-200">{email}</span> right now — the details above are yours to keep.
            </>
          )}
        </p>

        {address && (
          <p className="mx-auto mt-5 w-fit rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-slate-400">
            {address.slice(0, 8)}…{address.slice(-6)}
          </p>
        )}

        <Button
          variant="ghost"
          onClick={() => disconnect()}
          className="mt-8 rounded-full text-slate-400 hover:text-white"
        >
          <LogOut className="mr-2 h-4 w-4" /> Disconnect wallet
        </Button>

        <p className="mt-6 text-xs text-slate-600">Keep your card details private — treat them like any other card.</p>
      </div>
    </div>
  )
}
