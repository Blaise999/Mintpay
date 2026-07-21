"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useWalletLauncher, WalletFallbackList } from "@/components/connect-wallet"
import {
  Wallet, ChevronDown, ArrowRight, Zap, ShieldCheck, Share2, CalendarCheck, CheckSquare,
  CreditCard, Smartphone, Repeat, Globe,
} from "lucide-react"
/* ------------------------------------------------------------------ tokens */
const BLUE = "#0015FF"
const ink = "text-[#0B0D17]"
const muted = "text-[#6E7381]"
const pill = "rounded-full font-semibold transition-colors"
const pillBlue = `${pill} bg-[#0015FF] text-white hover:bg-[#0010CC]`
const pillGhost = `${pill} border border-[#E8EAF0] bg-white ${ink} hover:bg-[#F7F8FA]`
const cardBox = "rounded-2xl border border-[#E8EAF0] bg-white"
const section = "mx-auto w-full max-w-[1200px] px-6"
/* --------------------------------------------------------------- sub-parts */
/**
 * A slot for your own artwork. Drop the file in /public and it renders.
 * Until then you get a labelled placeholder at the exact final dimensions,
 * so the layout never shifts when the real image lands.
 */
function MediaSlot({
  src, alt, w, h, className = "", rounded = "rounded-2xl", boxBg, boxText, fit = "contain",
}: { src: string; alt: string; w: number; h: number; className?: string; rounded?: string; boxBg?: string; boxText?: string; fit?: "contain" | "cover" }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative ${className}`}>
      {failed ? (
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-1 border-2 border-dashed ${rounded} ${boxBg ? "" : "border-[#CFD3E0] bg-[#F2F3F7]/70"}`}
          style={boxBg ? { background: boxBg, borderColor: "rgba(255,255,255,0.35)" } : undefined}
        >
          <span className={`px-2 text-center font-mono text-[11px] font-medium ${boxText ?? "text-[#6E7381]"}`}>{src}</span>
          <span className={`font-mono text-[10px] ${boxText ? "opacity-70" : "text-[#9AA0AE]"}`}>{w} × {h}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={w}
          height={h}
          onError={() => setFailed(true)}
          className={`h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"} ${rounded}`}
        />
      )}
    </div>
  )
}
function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#9AA0AE]">{label}</p>
      <p className={`mt-1 font-display text-[26px] font-bold leading-tight ${ink}`}>
        {value} {accent && <span className="text-[#0015FF]">{accent}</span>}
      </p>
    </div>
  )
}
function StepCard({ n, icon, title, sub, body }: { n: string; icon: React.ReactNode; title: string; sub: string; body: string }) {
  return (
    <div className={`${cardBox} flex flex-col p-6`}>
      <div className="mb-10 flex items-start justify-between">
        <span className="font-display text-2xl font-bold text-[#0015FF]">{n}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F2F3F7] text-[#4B5162]">{icon}</span>
      </div>
      <h3 className={`font-display text-lg font-bold ${ink}`}>{title}</h3>
      <p className={`mt-1 text-[14px] font-semibold text-[#4B5162]`}>{sub}</p>
      <p className={`mt-2 text-[15px] leading-relaxed ${muted}`}>{body}</p>
    </div>
  )
}
function Feature({ art, title, body }: { art: React.ReactNode; title: string; body: string }) {
  return (
    <div className={`${cardBox} p-7`}>
      <div className="mb-7 flex aspect-square w-full items-center justify-center">{art}</div>
      <h3 className={`font-display text-lg font-bold ${ink}`}>{title}</h3>
      <p className={`mt-2 text-[15px] leading-relaxed ${muted}`}>{body}</p>
    </div>
  )
}
/** Split section: copy one side, art the other. */
function Split({
  flip = false, title, accent, body, art, bg = "bg-[#F7F8FA]",
}: {
  flip?: boolean; title: string; accent: string; body: string; art: React.ReactNode; bg?: string
}) {
  return (
    <section className={bg}>
      <div className={`${section} grid items-center gap-12 py-24 lg:grid-cols-2`}>
        <div className={flip ? "lg:order-2" : ""}>
          <h2 className={`font-display text-[clamp(2.2rem,4.4vw,3.5rem)] font-bold leading-[1.05] ${ink}`}>
            {title}
            <br />
            <span className="text-[#0015FF]">{accent}</span>
          </h2>
          <p className={`mt-6 max-w-md text-[17px] leading-relaxed ${muted}`}>{body}</p>
        </div>
        <div className={`flex justify-center ${flip ? "lg:order-1" : ""}`}>{art}</div>
      </div>
    </section>
  )
}
/* -------------------------------------------------------------------- page */
export function LandingPage() {
  const { launch, connectSpecific, reset, state } = useWalletLauncher()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") reset() }
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("keydown", onKey)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("scroll", onScroll) }
  }, [reset])
  const issue = () => launch()
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ---------------------------------------------------------- header */}
      <header className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-shadow ${scrolled ? "shadow-[0_1px_0_#E8EAF0]" : ""}`}>
        <div className={`${section} flex h-[76px] items-center justify-between`}>
          <button className="flex items-center gap-1.5 rounded-full border border-[#E8EAF0] px-4 py-2 text-sm">
            <span className="text-[11px] uppercase text-[#9AA0AE]">us</span>
            <span className={`font-semibold ${ink}`}>EN</span>
            <ChevronDown className="h-4 w-4 text-[#9AA0AE]" />
          </button>
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
            {[["Home", "#home"], ["Advantages", "#advantages"], ["FAQ", "#faq"]].map(([l, h]) => (
              <a key={l} href={h} className={`text-[15px] ${ink} transition-opacity hover:opacity-60`}>{l}</a>
            ))}
          </nav>
          <Button onClick={issue} className={`${pillBlue} h-11 px-7`}>Issue Card</Button>
        </div>
      </header>
     {/* ------------------------------------------------------------ hero */}
<section id="home" className={`${section} grid gap-8 lg:grid-cols-2 lg:gap-16`}>
 <div className="flex flex-col justify-center py-16 lg:py-24">
  <h1 className={`font-display text-[clamp(2.8rem,6vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.03em] ${ink}`}>
   Issue a Crypto
   <br />
   Card <span className="text-[#0015FF]">right now</span>
  </h1>
  <p className={`mt-7 max-w-lg text-[17px] leading-relaxed ${muted}`}>
   Connect your wallet, add your details, and your card is ready instantly.
   No account top-up, no identity verification, no waiting.
  </p>
  <div className="mt-10 flex flex-wrap gap-4">
   <Button onClick={issue} className={`${pillBlue} h-14 px-10 text-base`}>Issue Card</Button>
   <a href="#advantages">
    <Button variant="outline" className={`${pillGhost} h-14 px-10 text-base`}>Learn More</Button>
   </a>
  </div>
 </div>
 <MediaSlot
  src="/mint-1.png"
  alt="MintPay card"
  w={960}
  h={720}
  className="h-full min-h-[300px] lg:min-h-[500px]"
  fit="cover"
 />
</section>
      {/* ------------------------------------------------------ stat strip */}
      {/* Every figure here is true of MintPay. Nothing borrowed. */}
      <section className="border-y border-[#EEF0F4] bg-white">
        <div className={`${section} grid grid-cols-2 gap-8 py-7 md:grid-cols-5`}>
          <Stat label="Custody" value="Your keys" />
          <Stat label="Network" value="Multichain" />
          <Stat label="Verification" value="No KYC" />
          <Stat label="Issuance" value="Instant" />
          <Stat label="Cost to issue" value="Free" />
        </div>
      </section>
      {/* -------------------------------------------------------- blue band */}
      <section className="bg-[#0015FF]">
        <div className={`${section} py-24`}>
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              A crypto card
              <br />
              for everyday life
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/70">
              Your card is tied to the wallet you already use. Nothing to top up, nothing held by us.
            </p>
            <Button onClick={issue} className={`${pill} mt-10 h-14 border border-white/30 bg-transparent px-9 text-base text-white hover:bg-white/10`}>
              Issue Card <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      {/* ----------------------------------------------------- how it works */}
      <section className="bg-[#F7F8FA]">
        <div className={`${section} py-24`}>
          <h2 className={`font-display text-[clamp(2.4rem,5vw,3.6rem)] font-bold tracking-[-0.03em] ${ink}`}>How it works</h2>
          <p className={`mt-4 max-w-2xl text-[17px] leading-relaxed ${muted}`}>
            Getting a card is easy: connect your wallet, tell us where to send it, and it&apos;s yours.
            No account top-up or identity verification required.
          </p>
          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            <StepCard n="01" icon={<Share2 className="h-4 w-4" />} title="Connect Your Wallet"
              sub="Securely connect in one tap"
              body="Connect your wallet securely using WalletConnect." />
            <StepCard n="02" icon={<CalendarCheck className="h-4 w-4" />} title="Add Your Details"
              sub="Complete your card profile"
              body="Enter your name and email address to receive your card details, updates, and important notifications." />
            <StepCard n="03" icon={<CheckSquare className="h-4 w-4" />} title="Instant Issuance"
              sub="Get your card instantly"
              body="Your virtual or physical Visa card is issued within seconds and is ready to use immediately." />
            <StepCard n="04" icon={<Smartphone className="h-4 w-4" />} title="Add to Apple Pay & Google Pay"
              sub="Pay anywhere any day"
              body="Add your card to Apple Pay or Google Pay for secure online, in-store, and contactless payments." />
            <StepCard n="05" icon={<Repeat className="h-4 w-4" />} title="Spend Crypto Seamlessly"
              sub="Pay directly with your crypto"
              body="Your crypto is automatically converted at the time of purchase, making payments fast, simple, and seamless." />
            <StepCard n="06" icon={<Globe className="h-4 w-4" />} title="Global Acceptance"
              sub="Spend worldwide without limits"
              body="Use your card at millions of merchants worldwide for online, in-store, and contactless payments." />
            <div className="rounded-2xl bg-[#F0F1F5] p-7">
              <h3 className={`font-display text-xl font-bold ${ink}`}>Ready to launch</h3>
              <p className={`mt-3 text-[15px] leading-relaxed ${muted}`}>
                Connect the wallet you already use and have your card in under a minute.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className={`${cardBox} inline-flex items-center gap-2 px-3.5 py-2 text-[13px] font-medium ${ink}`}>
                  <Zap className="h-3.5 w-3.5" /> Fast activation
                </span>
                <span className={`${cardBox} inline-flex items-center gap-2 px-3.5 py-2 text-[13px] font-medium ${ink}`}>
                  <ShieldCheck className="h-3.5 w-3.5" /> Non-custodial
                </span>
              </div>
              <Button onClick={issue} className={`${pillBlue} mt-7 h-14 w-full text-base`}>Issue Card</Button>
            </div>
          </div>
        </div>
      </section>
      {/* ------------------------------------------------- feature splits */}
      <Split
        title="Get your card" accent="today"
        body="Connect the wallet you already use and issue your MintPay card in a minute."
        art={
          <div className="relative aspect-[280/560] w-[280px]">
            <MediaSlot src="/new-1.jpg" alt="MintPay app" w={280} h={560} className="absolute inset-0 drop-shadow-[0_30px_50px_rgba(11,13,23,0.25)]" rounded="rounded-[38px]" />
            {/* pay badges — positioned like the reference; outer bounces, inner holds the slant */}
            <div className="animate-floaty absolute -left-[24%] top-[24%] w-[38%] drop-shadow-xl">
              <div className="rotate-[-8deg]">
                <MediaSlot src="/g.png" alt="Google Pay" w={170} h={82} rounded="rounded-none" />
              </div>
            </div>
            <div className="animate-floaty-slow absolute -right-[16%] -top-[2%] w-[36%] drop-shadow-xl">
              <div className="rotate-[8deg]">
                <MediaSlot src="/a.png" alt="ATM" w={170} h={82} rounded="rounded-none" />
              </div>
            </div>
            <div className="animate-floaty absolute -right-[20%] top-[52%] w-[40%] drop-shadow-xl">
              <div className="rotate-[-8deg]">
                <MediaSlot src="/ap.png" alt="Apple Pay" w={170} h={82} rounded="rounded-none" />
              </div>
            </div>
          </div>
        }
        bg="bg-white"
      />
      <Split
        flip
        title="Pay directly" accent="from your wallet"
        body="No need to transfer funds to a third-party service — everything settles from the wallet you control."
        art={
          <div className="relative aspect-[280/560] w-[280px]">
            <MediaSlot
              src="/new-2.jpg" alt="Pay from your wallet" w={280} h={560}
              className="absolute inset-0 drop-shadow-[0_30px_50px_rgba(11,13,23,0.25)]"
              rounded="rounded-[38px]"
            />
            {/* iridescent coin PNGs — outer bounces, inner holds the slant */}
            <div className="animate-floaty absolute -right-[4%] -top-[4%] w-[20%]">
              <div className="rotate-[8deg]"><MediaSlot src="/77456711-7e14-485b-b3e7-e0f79ad2d762_removalai_preview.png" alt="" w={130} h={130} rounded="rounded-none" /></div>
            </div>
            <div className="animate-floaty-slow absolute -left-[10%] top-[36%] w-[18%]">
              <div className="rotate-[-12deg]"><MediaSlot src="/19ae1dcd-b5b8-4b56-b01e-90b569b92771_removalai_preview.png" alt="" w={130} h={130} rounded="rounded-none" /></div>
            </div>
            <div className="animate-floaty absolute -right-[12%] top-[42%] w-[21%]">
              <div className="rotate-[10deg]"><MediaSlot src="/ed1c28ae-dfc9-48f7-b530-f1defab62177_removalai_preview.png" alt="" w={130} h={130} rounded="rounded-none" /></div>
            </div>
            <div className="animate-floaty-slow absolute -left-[6%] bottom-[16%] w-[17%]">
              <div className="rotate-[-8deg]"><MediaSlot src="/1de490d3-878f-4358-9a21-aa0744ad78f0_removalai_preview.png" alt="" w={130} h={130} rounded="rounded-none" /></div>
            </div>
            <div className="animate-floaty absolute -bottom-[3%] left-[38%] w-[19%]">
              <div className="rotate-[6deg]"><MediaSlot src="/73e961d5-6d89-416a-a963-43238d4998e5_removalai_preview.png" alt="" w={130} h={130} rounded="rounded-none" /></div>
            </div>
          </div>
        }
      />
      <Split
        title="Pay with" accent="no limits!"
        body="Your card is generated instantly and lives in your inbox — not in an account we hold on your behalf."
        art={
          <div className="relative aspect-[280/560] w-[280px]">
            <MediaSlot
              src="/new-3.jpg" alt="Tap to pay" w={280} h={560}
              className="absolute inset-0 drop-shadow-[0_30px_50px_rgba(11,13,23,0.25)]"
              rounded="rounded-[38px]"
            />
          </div>
        }
        bg="bg-white"
      />
      {/* ------------------------------------------------------- advantages */}
      <section id="advantages" className="bg-[#F7F8FA]">
        <div className={`${section} py-24`}>
          <h2 className={`font-display text-[clamp(2.4rem,5vw,3.6rem)] font-bold tracking-[-0.03em] ${ink}`}>Why our card?</h2>
          <p className={`mt-3 text-[17px] ${muted}`}>Advantages of a crypto card over traditional banks</p>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature art={<MediaSlot src="/mob-3.png" alt="Instant start, no registration" w={320} h={320} className="h-full w-full" rounded="rounded-xl" />} title="Instant start, no registration"
              body="No need to register or pass KYC verification. Start using the card right away." />
            <Feature art={<MediaSlot src="/mm.png" alt="Direct connection to your wallet" w={320} h={320} className="h-full w-full" rounded="rounded-xl" />} title="Direct connection to your wallet"
              body="Your card is tied to the wallet you already control — there's no balance to top up." />
            <Feature art={<MediaSlot src="/mob-4.jpeg" alt="Card security" w={320} h={320} className="h-full w-full" rounded="rounded-xl" />} title="Card security"
              body="Freeze and unfreeze your card, get transaction notifications, and set spending controls — all from your side." />
            <Feature art={<MediaSlot src="/mob-2.png" alt="Low cost" w={320} h={320} className="h-full w-full" rounded="rounded-xl" />} title="Low cost"
              body="Issuing a card is free. No hidden charges, no monthly costs." />
          </div>
        </div>
      </section>
      {/* -------------------------------------------------------------- faq */}
      <section id="faq" className="bg-white">
        <div className={`${section} max-w-[860px] py-24`}>
          <h2 className={`font-display text-[clamp(2.4rem,5vw,3.6rem)] font-bold tracking-[-0.03em] ${ink}`}>FAQ</h2>
          <Accordion type="single" collapsible className="mt-10">
            {[
              ["Do I need to register or pass KYC?", "No. Connect your wallet, add your details, and the card is issued. There's no account to create and no identity check."],
              ["Which wallets can I use?", "Any of them. MintPay detects what's installed on your device — browser extension, mobile wallet app, or an in-wallet browser — and opens it directly."],
              ["Do you store my information?", "No. There's no database. Your name, phone, country and email are used once to generate and send the card, and are not retained afterwards."],
              ["Can you access my funds?", "No. Connecting only shares your public address. MintPay can't move funds, and can't sign anything you don't approve yourself."],
              ["What does it cost to issue a card?", "Nothing. Issuing is free."],
            ].map(([q, a], i) => (
              <AccordionItem key={i} value={`i${i}`} className="border-b border-[#E8EAF0]">
                <AccordionTrigger className={`py-6 text-left font-display text-lg font-bold ${ink} hover:no-underline`}>{q}</AccordionTrigger>
                <AccordionContent className={`pb-6 text-[15px] leading-relaxed ${muted}`}>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      {/* ------------------------------------------------------- join today */}
      <section className="bg-[#0015FF]">
        <div className={`${section} flex flex-col items-center gap-8 py-24 text-center`}>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            Join today
          </h2>
          <p className="max-w-xl text-[17px] leading-relaxed text-white/70">
            Connect the wallet you already use and issue your MintPay card in under a minute.
            No sign-up, no KYC, nothing stored.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button onClick={issue} className={`${pill} h-14 bg-white px-10 text-base text-[#0015FF] hover:bg-white/90`}>
              Issue Card <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href="#advantages">
              <Button
                variant="outline"
                className={`${pill} h-14 border border-white/30 bg-transparent px-10 text-base text-white hover:bg-white/10`}
              >
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </section>
      {/* ----------------------------------------------------------- footer */}
      <footer className="border-t border-[#E8EAF0] bg-[#F7F8FA]">
        <div className={`${section} flex flex-col items-center justify-between gap-6 py-10 md:flex-row`}>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: BLUE }}>
              <Wallet className="h-4 w-4 text-white" />
            </span>
            <span className={`font-display text-lg font-bold ${ink}`}>MintPay</span>
          </div>
          <nav className="flex gap-8 text-sm">
            {[["Privacy", "/privacy"], ["Terms", "/terms"], ["Support", "/support"]].map(([l, h]) => (
              <Link key={l} href={h} className={`${muted} hover:text-[#0015FF]`}>{l}</Link>
            ))}
          </nav>
          <p className="text-sm text-[#9AA0AE]">© {new Date().getFullYear()} MintPay</p>
        </div>
      </footer>
      {/* ------------------------------------------- wallet status dialog */}
      <Dialog open={state.phase !== "idle"} onOpenChange={(o) => { if (!o) reset() }}>
        <DialogContent className="max-w-sm">
          {state.phase === "error" ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-[#0015FF]" /> Couldn&apos;t connect
                </DialogTitle>
                <DialogDescription>{state.message}</DialogDescription>
              </DialogHeader>
              <div className="pt-2">
                {state.alternatives.length > 0 ? (
                  <>
                    <p className={`mb-3 text-sm ${muted}`}>Try another wallet on this device:</p>
                    <WalletFallbackList connectors={state.alternatives} onPick={connectSpecific} />
                  </>
                ) : (
                  <Button onClick={issue} className={`${pillBlue} h-12 w-full`}>Try again</Button>
                )}
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-[#0015FF]" />
                  {state.phase === "opening" ? `Opening ${state.name}…` : "Finding your wallet…"}
                </DialogTitle>
                <DialogDescription>
                  {state.phase === "opening"
                    ? "Approve the connection in your wallet."
                    : "Checking this device for an installed wallet."}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center py-8">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#DDE0FB] border-t-[#0015FF]" />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
