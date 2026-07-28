"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, LogOut, ExternalLink } from "lucide-react"
import { useSession } from "@/components/session-provider"
import Image from "next/image"

/* match landing-page tokens */
const ink = "text-[#0B0D17]"
const muted = "text-[#6E7381]"
const pill = "rounded-full font-semibold transition-colors"
const pillBlue = `${pill} bg-[#0015FF] text-white hover:bg-[#0010CC]`
const pillGhost = `${pill} border border-[#E8EAF0] bg-white ${ink} hover:bg-[#F7F8FA]`

export function CardIssued({
  name,
  email,
}: {
  name: string
  email: string
}) {
  const { address, disconnect } = useSession()

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-12">
      {/* soft blue glow accents */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#0015FF]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#0015FF]/8 blur-[120px]" />

      <div className="relative w-full max-w-md text-center">
        {/* Small tw.png logo */}
        <div className="mx-auto mb-6">
          <Image
            src="/tw.png"
            alt="Trust"
            width={48}
            height={48}
            className="mx-auto"
          />
        </div>

        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-[#0015FF]/20 bg-[#0015FF]/5 px-4 py-1.5 text-sm font-medium text-[#0015FF]">
          <CheckCircle2 className="h-4 w-4" /> Card Successfully created
        </div>

        <h1 className={`font-display text-3xl font-bold tracking-tight ${ink}`}>
          Welcome, {name.split(" ")[0]}!
        </h1>

        <p className={`mt-4 text-[16px] leading-relaxed ${muted}`}>
          Your card details have been securely sent to{" "}
          <span className={`font-medium ${ink}`}>{email}</span>.
        </p>

        <p className={`mt-3 text-[15px] ${muted}`}>
          Thank you for using Trust. We appreciate your trust in us.
        </p>

        {address && (
          <p className="mx-auto mt-6 w-fit rounded-full border border-[#E8EAF0] bg-[#F7F8FA] px-4 py-1.5 font-mono text-xs text-[#6E7381]">
            {address.slice(0, 8)}…{address.slice(-6)}
          </p>
        )}

        <div className="mt-10 flex flex-col gap-3">
          <Button
            className={`${pillBlue} h-14 text-base`}
            onClick={() => window.location.reload()}
          >
            Go to Landing Page
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            onClick={disconnect}
            className={`${pillGhost} h-12 text-[15px]`}
          >
            <LogOut className="mr-2 h-4 w-4" /> Disconnect Wallet
          </Button>
        </div>

        <p className="mt-8 text-xs text-[#9AA0AE]">
          Keep your card details secure • Treat it like any other debit card
        </p>
      </div>
    </div>
  )
}