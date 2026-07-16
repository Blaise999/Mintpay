"use client"

import type React from "react"
import { ArrowRight, Sun, Moon, Shield, CheckCircle, TrendingUp, Wallet, Zap, CreditCard, Lock, BadgeCheck, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MintPayLogo, MintPayMark } from "@/components/brand/logo"
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { useWalletLauncher, WalletFallbackList } from "@/components/connect-wallet"
import { useSession } from "@/components/session-provider"
import Link from "next/link"
import {
  Coin, CardArt, Shield as ShieldArt, Padlock, WifiArt, CloudArt,
  PhoneWallet, PhoneReceive, PhoneTap,
} from "./holo-art"
import { HoloDefs } from "./holo-art"

const Accent = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
    {children}
  </span>
)

/* soft premium ambient: colored glow orbs + faint grid */
function Ambient() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-blue-400/20 blur-[130px] dark:bg-blue-600/20" />
      <div className="absolute -right-20 top-32 h-[26rem] w-[26rem] rounded-full bg-violet-400/20 blur-[130px] dark:bg-violet-600/20" />
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent 75%)",
        }}
      />
    </div>
  )
}

const worksWith = ["Base", "Lisk", "Celo", "MetaMask", "Coinbase Wallet", "WalletConnect"]

const facts = [
  { k: "Custody", v: "Your keys" },
  { k: "Networks", v: "Base · Lisk · Celo" },
  { k: "Settlement", v: "On-chain" },
  { k: "Tokens", v: "ERC-20" },
  { k: "Available", v: "24 / 7" },
]

const advantages = [
  { art: <Padlock className="h-20 w-20" />, title: "No account needed", body: "Connect your wallet and go — there's no separate signup or profile to create." },
  { art: <CloudArt className="h-20 w-20" />, title: "Straight from your wallet", body: "Purchases draw from your wallet balance. Nothing to pre-load or top up." },
  { art: <ShieldArt className="h-20 w-20" />, title: "You hold the keys", body: "MintPay is non-custodial by design — your funds stay in your control the whole time." },
  { art: <Coin symbol="E" className="h-20 w-20" />, title: "On-chain & transparent", body: "Every payment settles on-chain, where you can verify it yourself." },
  { art: <WifiArt className="h-20 w-20" />, title: "Multi-chain", body: "Works across Base, Lisk, and Celo, so you can pay from where your assets already are." },
  { art: <Coin symbol="$" className="h-20 w-20" />, title: "Always on", body: "Issue a card and pay any time — the flow runs 24/7, wherever you are." },
]

const flow = [
  { n: "01", icon: Wallet, title: "Connect your wallet", body: "Open the app and approve the connection. Payments are charged straight from your wallet." },
  { n: "02", icon: CreditCard, title: "Issue your card", body: "Pick a card format, review the limits and issuance fee, and confirm on-chain." },
  { n: "03", icon: Zap, title: "Add & spend", body: "Add the card to your phone wallet and use it for subscriptions, shopping, and bills." },
]

const faqs = [
  { q: "Do I need to create an account or verify my identity?", a: "No. MintPay is non-custodial — you connect your own wallet, so there's no separate account to register. You stay in control of your funds at all times." },
  { q: "Where do payments come from?", a: "Directly from your connected wallet. There's no middle-man balance to top up; the app settles the payment on-chain when you confirm." },
  { q: "Which networks and tokens are supported?", a: "MintPay works across Base, Lisk, and Celo, using ERC-20 tokens on those chains." },
  { q: "Are there fees?", a: "You'll see the exact issuance fee and any network gas before you confirm — nothing is charged without your approval." },
]

export function LandingPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { launch, connectSpecific, reset, state } = useWalletLauncher()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") reset() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [reset])

  // Find the wallet on this machine and open it. No picker, no questions.
  // Once it connects, app/page.tsx swaps straight to onboarding.
  const handleLaunchApp = () => launch()
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  const primaryBtn =
    "rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-inset ring-white/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-600/30 hover:from-blue-700 hover:to-violet-700"

  return (
    <div id="home" className="relative min-h-screen bg-white text-slate-900 dark:bg-gray-950 dark:text-slate-100">
      <HoloDefs />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/70">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <MintPayLogo markClassName="h-9 w-9" wordClassName="text-xl" />
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300 md:flex">
            <button onClick={() => scrollTo("home")} className="transition-colors hover:text-slate-900 dark:hover:text-white">Home</button>
            <button onClick={() => scrollTo("advantages")} className="transition-colors hover:text-slate-900 dark:hover:text-white">Advantages</button>
            <button onClick={() => scrollTo("faq")} className="transition-colors hover:text-slate-900 dark:hover:text-white">FAQ</button>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button onClick={handleLaunchApp} className={`${primaryBtn} px-5`}>Launch App</Button>
          </div>
        </div>
      </header>

      {/* Status only. Opens itself while we find + open the wallet; shows a
          picker ONLY if that failed and there's genuinely more than one. */}
      <Dialog open={state.phase !== "idle"} onOpenChange={(o) => { if (!o) reset() }}>
        <DialogContent className="max-w-sm">
          {state.phase === "error" ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-blue-600" /> Couldn&apos;t connect
                </DialogTitle>
                <DialogDescription>{state.message}</DialogDescription>
              </DialogHeader>
              <div className="pt-2">
                {state.alternatives.length > 0 ? (
                  <>
                    <p className="mb-3 text-sm text-slate-500">Try another wallet on this device:</p>
                    <WalletFallbackList connectors={state.alternatives} onPick={connectSpecific} />
                  </>
                ) : (
                  <Button onClick={() => launch()} className={`${primaryBtn} w-full`}>Try again</Button>
                )}
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-blue-600" />
                  {state.phase === "opening" ? `Opening ${state.name}…` : "Finding your wallet…"}
                </DialogTitle>
                <DialogDescription>
                  {state.phase === "opening"
                    ? "Approve the connection in your wallet."
                    : "Checking this device for an installed wallet."}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center py-8">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12 md:pt-24">
        <Ambient />
        <div className="container mx-auto grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
              Non-custodial crypto card
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
              Issue a MintPay<br />Card <Accent>right now</Accent>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              Connect your wallet, issue your card, and spend straight from your balance. Non-custodial — you keep your keys, and you approve every payment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={handleLaunchApp} className={`${primaryBtn} px-8`}>
                Issue Card <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("how")} className="rounded-full px-8">Learn More</Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-blue-600" /> Non-custodial</span>
              <span className="inline-flex items-center gap-1.5"><Lock className="h-4 w-4 text-blue-600" /> You hold the keys</span>
              <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-blue-600" /> Settles on-chain</span>
            </div>
          </div>

          {/* hero holo scene with glow + reflection */}
          <div className="relative mx-auto aspect-square w-full max-w-lg">
            <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/40 to-violet-500/40 blur-[90px]" />
            <div className="absolute left-[8%] top-[22%] w-[74%] drop-shadow-2xl">
              <CardArt />
              <div className="mt-1 scale-y-[-1] opacity-20 blur-[2px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]">
                <CardArt />
              </div>
            </div>
            <div className="absolute left-[6%] top-[6%] animate-float-slow"><Coin symbol="$" className="h-16 w-16" /></div>
            <div className="absolute right-[4%] top-[16%] animate-float-slower"><Coin symbol="E" className="h-14 w-14" /></div>
            <div className="absolute right-[8%] bottom-[24%] animate-float-slow" style={{ animationDelay: "1.5s" }}><Coin symbol="T" className="h-16 w-16" /></div>
            <div className="absolute right-[24%] top-[2%] animate-float-slower" style={{ animationDelay: "0.6s" }}><WifiArt className="h-12 w-12" /></div>
            <div className="absolute left-[2%] bottom-[26%] animate-float-slow" style={{ animationDelay: "0.9s" }}><Padlock className="h-14 w-14" /></div>
            <div className="absolute left-[30%] bottom-[8%] animate-float-slower" style={{ animationDelay: "1.2s" }}><ShieldArt className="h-12 w-12" /></div>
          </div>
        </div>

        {/* works-with strip */}
        <div className="container mx-auto mt-14">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">Works with</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {worksWith.map((w) => (
              <span key={w} className="text-sm font-bold tracking-tight text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200">{w}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Fact strip */}
      <section className="border-y border-slate-200/70 px-4 py-8 dark:border-white/10">
        <div className="container mx-auto grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {facts.map((f) => (
            <div key={f.k} className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{f.k}</p>
              <p className="font-display text-lg font-bold"><Accent>{f.v}</Accent></p>
            </div>
          ))}
        </div>
      </section>

      {/* Blue full-bleed */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-violet-700 px-4 py-20 text-white">
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="container mx-auto grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">A crypto card<br />for everyday life</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-blue-100">
              Payments are made directly from your wallet. Use your MintPay card across online and offline stores, anywhere your card is accepted.
            </p>
          </div>
          <div className="flex justify-center">
            <svg viewBox="0 0 460 200" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
              {[7, 6, 5, 4, 3, 2, 1].map((d) => (
                <text key={d} x={40 + d} y={140 + d} fontFamily="'Space Grotesk', sans-serif" fontSize="110" fontWeight="700" fill="#1E1B4B" letterSpacing="-4">MINTPAY</text>
              ))}
              <text x="40" y="140" fontFamily="'Space Grotesk', sans-serif" fontSize="110" fontWeight="700" fill="url(#holo)" letterSpacing="-4">MINTPAY</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Get your card today */}
      <FeatureRow
        eyebrow="Virtual & metal"
        title={<>Get your card <Accent>today</Accent></>}
        body="Issue a virtual or metal MintPay card in a minute and start spending worldwide — straight from your wallet."
        visual={
          <div className="relative mx-auto w-full max-w-xs">
            <PhoneWallet />
            <Pill className="-left-4 top-16" style={{ animationDelay: "0.3s" }}>Tap to pay</Pill>
            <Pill className="-right-2 top-40" style={{ animationDelay: "1s" }}>ATM</Pill>
            <Pill className="-right-4 bottom-24" style={{ animationDelay: "0.6s" }}>Online</Pill>
          </div>
        }
      />

      {/* Pay directly from your wallet */}
      <FeatureRow
        reverse
        eyebrow="Non-custodial"
        title={<>Pay directly <Accent>from your wallet</Accent></>}
        body="No need to move funds to a third-party balance first — MintPay pays from your self-custody wallet the moment you confirm."
        visual={
          <div className="relative mx-auto w-full max-w-xs">
            <div className="absolute -left-6 top-24 animate-float-slow"><Coin symbol="T" className="h-14 w-14" /></div>
            <div className="absolute -right-4 top-40 animate-float-slower"><Coin symbol="$" className="h-16 w-16" /></div>
            <div className="absolute -left-2 bottom-16 animate-float-slower" style={{ animationDelay: "1s" }}><Coin symbol="B" className="h-12 w-12" /></div>
            <PhoneReceive />
          </div>
        }
      />

      {/* Pay with no limits */}
      <FeatureRow
        eyebrow="Anywhere"
        title={<>Pay with <Accent>no limits</Accent></>}
        body="Tap to pay at any online or offline store. Fees are shown up front — no surprises at checkout."
        visual={<div className="mx-auto w-full max-w-xs"><PhoneTap /></div>}
      />

      {/* How it works */}
      <section id="how" className="relative overflow-hidden bg-slate-50 px-4 py-20 dark:bg-gray-900">
        <div className="container mx-auto">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">Flow</span>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">How it works</h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            Getting a card is simple: connect your wallet, pick a format, and confirm. Payments come straight from your balance.
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {flow.map((s) => (
              <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-gray-950">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-display text-3xl font-bold"><Accent>{s.n}</Accent></span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/10"><s.icon className="h-5 w-5 text-slate-500 dark:text-slate-300" /></div>
                </div>
                <h3 className="font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{s.body}</p>
              </div>
            ))}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-violet-700 p-6 text-white shadow-lg">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <h3 className="font-display text-xl font-bold">Ready to launch</h3>
              <p className="mt-2 text-sm leading-relaxed text-blue-100">Open the app, connect your wallet, and choose the card that suits you.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold"><Zap className="h-3.5 w-3.5" /> Fast</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold"><Lock className="h-3.5 w-3.5" /> Secure</span>
              </div>
              <Button onClick={handleLaunchApp} className="mt-5 w-full rounded-full bg-white text-blue-700 hover:bg-blue-50">Issue Card</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="px-4 py-20">
        <div className="container mx-auto">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Advantages</h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-500 dark:text-slate-400">Everything that makes MintPay simple to start and honest to use.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a) => (
              <div key={a.title} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-white/10 dark:bg-gray-950 dark:hover:border-blue-900">
                <div className="mb-5 transition-transform group-hover:scale-110">{a.art}</div>
                <h3 className="font-display text-xl font-bold">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-500 dark:text-slate-400">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-50 px-4 py-20 dark:bg-gray-900">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-display text-4xl font-bold md:text-5xl">FAQ</h2>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-950">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display font-bold">
                  {f.q}
                  <span className="ml-4 text-blue-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-slate-500 dark:text-slate-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="container mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950 px-6 py-16 text-center text-white ring-1 ring-white/10">
          <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-blue-500/30 blur-[100px]" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-violet-500/30 blur-[100px]" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to spend your crypto?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">Connect your wallet and issue your MintPay card in about a minute.</p>
            <Button size="lg" onClick={handleLaunchApp} className="mt-8 rounded-full bg-white px-8 text-blue-700 shadow-lg hover:bg-blue-50">
              Launch App <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 px-4 py-12 dark:border-white/10">
        <div className="container mx-auto flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <MintPayLogo markClassName="h-8 w-8" wordClassName="text-xl" className="mb-3" />
            <p className="max-w-sm leading-relaxed text-slate-500 dark:text-slate-400">Spend your crypto on everyday things — straight from your wallet, non-custodial.</p>
          </div>
          <div className="flex gap-4 text-slate-400">
            <a href="https://x.com/Paycrypt_org1" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-slate-700 dark:hover:text-white">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M17.53 6.47a.75.75 0 0 0-1.06 0L12 10.94 7.53 6.47a.75.75 0 1 0-1.06 1.06L10.94 12l-4.47 4.47a.75.75 0 1 0 1.06 1.06L12 13.06l4.47 4.47a.75.75 0 0 0 1.06-1.06L13.06 12l4.47-4.47a.75.75 0 0 0 0-1.06z"/></svg>
            </a>
            <a href="https://t.me/paycrypt_org" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:text-slate-700 dark:hover:text-white">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27z"/></svg>
            </a>
            <a href="https://github.com/Team-memevibe/Paycrypt" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-slate-700 dark:hover:text-white">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2Z"/></svg>
            </a>
          </div>
        </div>
        <div className="container mx-auto mt-8 border-t border-slate-200/70 pt-6 text-sm text-slate-400 dark:border-white/10">
          © {new Date().getFullYear()} MintPay. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

/* alternating text/visual row */
function FeatureRow({
  eyebrow, title, body, visual, reverse = false,
}: {
  eyebrow: string
  title: React.ReactNode
  body: string
  visual: React.ReactNode
  reverse?: boolean
}) {
  return (
    <section className="px-4 py-20">
      <div className="container mx-auto grid items-center gap-12 lg:grid-cols-2">
        <div className={reverse ? "lg:order-2" : ""}>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-500 dark:text-slate-400">{body}</p>
        </div>
        <div className={reverse ? "lg:order-1" : ""}>{visual}</div>
      </div>
    </section>
  )
}

function Pill({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`absolute animate-float-slow rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg ring-1 ring-inset ring-white/20 ${className}`} style={style}>
      {children}
    </div>
  )
}