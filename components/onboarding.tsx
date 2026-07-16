"use client"

import { useState } from "react"
import { useSession } from "@/components/session-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MintPayMark } from "@/components/brand/logo"
import { Loader2, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import type { CardInfo } from "@/components/mintpay-card"

/**
 * Step 2. Wallet's connected — take name / number / country / email,
 * the server checks the email, mints the card and mails it. Nothing is stored.
 */
export function Onboarding({
  onComplete,
}: {
  onComplete: (data: { name: string; email: string; card?: CardInfo; emailed: boolean }) => void
}) {
  const { address } = useSession()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const valid =
    name.trim().length > 1 &&
    phone.replace(/\D/g, "").length >= 7 &&
    country.trim().length > 1 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email.trim())

  const submit = async () => {
    if (!address || !valid || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: address,
          name: name.trim(),
          phone: phone.trim(),
          country: country.trim(),
          email: email.trim(),
        }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.error || "Something went wrong")

      onComplete({ name: name.trim(), email: email.trim(), card: d.card, emailed: Boolean(d.emailed) })
    } catch (e: any) {
      toast.error(e?.message || "Something went wrong")
      setSubmitting(false)
    }
  }

  const field = "border-white/10 bg-white/5 text-white placeholder:text-slate-500"

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-white">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-600/25 blur-[120px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-6 text-center">
          <MintPayMark className="mx-auto mb-4 h-14 w-14" />
          <h1 className="font-display text-2xl font-bold">Set up your account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Your wallet is connected. Add your details and we&apos;ll create your MintPay card.
          </p>
          {address && (
            <p className="mx-auto mt-3 w-fit rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-slate-300">
              {address.slice(0, 8)}…{address.slice(-6)}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">Full name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" className={field} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-200">Phone number</label>
              <Input
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className={field}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-200">Country</label>
              <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Nigeria" className={field} />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="you@example.com"
              className={field}
            />
            <p className="mt-1 text-xs text-slate-500">Your card gets sent here — make sure it&apos;s right.</p>
          </div>
        </div>

        <Button
          onClick={submit}
          disabled={!valid || submitting}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
        >
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitting ? "Creating your card…" : "Create my card"}
          {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>

        <p className="mt-3 text-center text-xs text-slate-500">Non-custodial · we never access your funds</p>
      </div>
    </div>
  )
}
