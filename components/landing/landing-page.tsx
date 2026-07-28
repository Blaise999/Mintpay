"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useWalletLauncher, WalletFallbackList } from "@/components/connect-wallet"
import { SupportWidget } from "@/components/support-widget"
import {
  Wallet, ArrowRight, Menu, X, Zap, ShieldCheck, Share2, CalendarCheck, CheckSquare,
  Smartphone, Repeat, Globe,
} from "lucide-react"

/* ------------------------------------------------------------------ tokens */
const BLUE = "#0015FF"
const ink = "text-[#0B0D17]"
const muted = "text-[#6E7381]"
const pill = "rounded-full font-semibold transition-colors"
const pillBlue = `${pill} bg-[#0015FF] text-white hover:bg-[#0010CC]`
const pillGhost = `${pill} border border-[#E8EAF0] bg-white ${ink} hover:bg-[#F7F8FA]`
const cardBox = "rounded-2xl border border-[#E8EAF0] bg-white"
const section = "mx-auto w-full max-w-[1200px] px-5 sm:px-6"
const NAV: [string, string][] = [["Home", "#home"], ["Advantages", "#advantages"], ["FAQ", "#faq"]]

/* --------------------------------------------------------------- sub-parts */
function MediaSlot({
  src, alt, w, h, className = "", rounded = "rounded-2xl", boxBg, boxText, fit = "contain",
  priority = false, sizes, quality = 85,
}: {
  src: string; alt: string; w: number; h: number; className?: string; rounded?: string;
  boxBg?: string; boxText?: string; fit?: "contain" | "cover"; priority?: boolean;
  sizes?: string; quality?: number
}) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative ${className}`}>
      {failed ? (
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-1 border-2 border-dashed ${rounded} bg-[#F8F9FC] border-[#D1D5DB]`}
        >
          <span className="px-2 text-center font-mono text-[11px] font-medium text-[#6E7381]">{src}</span>
          <span className="font-mono text-[10px] text-[#9AA0AE]">{w} × {h}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          quality={quality}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes ?? `${w}px`}
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
      <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#6E7381]">{label}</p>
      <p className={`mt-1 font-display text-[22px] sm:text-[26px] font-medium leading-tight ${ink}`}>
        {value}{accent ? ` ${accent}` : ""}
      </p>
    </div>
  )
}

function StepCard({ n, icon, title, sub, body }: { n: string; icon: React.ReactNode; title: string; sub: string; body: string }) {
  return (
    <div className={`${cardBox} flex flex-col p-5 sm:p-6`}>
      <div className="mb-8 sm:mb-10 flex items-start justify-between">
        <span className="font-display text-xl sm:text-2xl font-bold text-[#0015FF]">{n}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F2F3F7] text-[#4B5162]">{icon}</span>
      </div>
      <h3 className={`font-display text-base sm:text-lg font-bold ${ink}`}>{title}</h3>
      <p className="mt-1 text-[13px] sm:text-[14px] font-semibold text-[#4B5162]">{sub}</p>
      <p className={`mt-2 text-[14px] sm:text-[15px] leading-relaxed ${muted}`}>{body}</p>
    </div>
  )
}

function Feature({ art, title, body }: { art: React.ReactNode; title: string; body: string }) {
  return (
    <div className={`${cardBox} p-5 sm:p-7`}>
      <div className="mb-5 sm:mb-7 flex aspect-[4/5] sm:aspect-square w-full items-center justify-center overflow-hidden rounded-xl">
        {art}
      </div>
      <h3 className={`font-display text-base sm:text-lg font-bold ${ink}`}>{title}</h3>
      <p className={`mt-2 text-[14px] sm:text-[15px] leading-relaxed ${muted}`}>{body}</p>
    </div>
  )
}

function Split({
  flip = false, title, accent, body, art, bg = "bg-[#F7F8FA]",
}: {
  flip?: boolean; title: string; accent: string; body: string; art: React.ReactNode; bg?: string
}) {
  return (
    <section className={bg}>
      <div className={`${section} grid items-center gap-10 sm:gap-12 py-16 sm:py-20 md:py-24 lg:grid-cols-2`}>
        <div className={flip ? "lg:order-2" : ""}>
          <h2 className={`font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] ${ink}`}>
            {title} {accent}
          </h2>
          <p className={`mt-5 sm:mt-6 max-w-md text-[16px] sm:text-[17px] leading-relaxed ${muted}`}>{body}</p>
        </div>
        <div className={`flex justify-center ${flip ? "lg:order-1" : ""}`}>{art}</div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- page */
export function LandingPage({ onGetCard }: { onGetCard: () => void }) {
  const { launch, connectSpecific, reset, state } = useWalletLauncher()
  
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const goToCheck = () => {
    onGetCard()
  }

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { reset(); setMenuOpen(false) } }
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("keydown", onKey)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("scroll", onScroll) }
  }, [reset])

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ---------------------------------------------------------- header */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-[#E8EAF0] bg-white/80 backdrop-blur-xl"
            : "border-transparent bg-white"
        }`}
      >
        <div className={`${section} flex h-[72px] sm:h-[80px] items-center justify-between gap-4 sm:gap-6`}>
          <a href="#home" className="flex shrink-0 items-center">
            <MediaSlot src="/tw.png" alt="Trust" w={180} h={162} className="h-10 w-10 sm:h-11 sm:w-11" rounded="rounded-xl" quality={90} />
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-[#EDEFF3] bg-[#F7F8FA] p-1 md:flex">
            {NAV.map(([l, h]) => (
              <a
                key={l}
                href={h}
                className={`rounded-full px-5 py-2 text-[14px] font-medium ${ink} transition-colors hover:bg-white hover:shadow-sm`}
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 md:block">
            <Button onClick={goToCheck} className={`${pillBlue} h-11 px-6 text-[14px]`}>Get Card</Button>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#E8EAF0] ${ink} transition-colors hover:bg-[#F7F8FA] md:hidden`}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          className={`overflow-hidden border-t border-[#EDEFF3] bg-white transition-[max-height,opacity] duration-300 md:hidden ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className={`${section} flex flex-col gap-1 py-4`}>
            {NAV.map(([l, h]) => (
              <a
                key={l}
                href={h}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-[16px] font-medium ${ink} transition-colors hover:bg-[#F7F8FA]`}
              >
                {l}
              </a>
            ))}
            <Button
              onClick={() => { setMenuOpen(false); goToCheck() }}
              className={`${pillBlue} mt-2 h-12 w-full text-[15px]`}
            >
              Get Card
            </Button>
          </nav>
        </div>
      </header>

      {/* ========================================================== HERO - CLEAN */}
    <section
  id="home"
  className={`${section} grid items-center gap-10 pt-8 pb-10 sm:pt-12 sm:pb-14 lg:grid-cols-[1fr_1.15fr] lg:gap-8 lg:pt-10 lg:pb-14`}
>
  {/* Text */}
  <div className="order-1">
    <h1
      className={`font-display text-[clamp(2.8rem,8vw,4.3rem)] font-bold leading-[1.05] tracking-[-0.03em] ${ink}`}
    >
      Issue Your Crypto Card in seconds
    </h1>

    <p
      className={`mt-5 max-w-[520px] text-[16px] sm:text-[18px] leading-relaxed ${muted}`}
    >
      Connect your wallet, complete your details, and receive your card in
      seconds. Spend online and in-store worldwide.
    </p>

    <div className="mt-7 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
      <Button
        onClick={goToCheck}
        className={`${pillBlue} h-12 sm:h-14 px-8 sm:px-10 text-[15px] sm:text-base`}
      >
        Get Card
      </Button>

      <a href="#advantages">
        <Button
          variant="outline"
          className={`${pillGhost} h-12 sm:h-14 px-8 sm:px-10 text-[15px] sm:text-base`}
        >
          Explore Benefits
        </Button>
      </a>
    </div>
  </div>

  {/* Hero Image */}
  <div className="order-2 flex justify-center lg:justify-end overflow-visible">
    <MediaSlot
      src="/mint-1.png"
      alt="Trust card"
      w={1488}
      h={1340}
      priority
      quality={100}
      sizes="(min-width:1024px) 55vw, 100vw"
      className="
        w-[160%]
        sm:w-[145%]
        md:w-[125%]
        lg:w-[105%]
        xl:w-[108%]
        2xl:w-[110%]
        max-w-none
      "
      rounded="rounded-none"
      fit="contain"
    />
  </div>
</section>

{/* ------------------------------------------------------ stat strip */}
<section className="border-y border-[#EEF0F4] bg-white">
  <div
    className={`${section} grid grid-cols-2 gap-6 sm:gap-8 py-6 sm:py-7 md:grid-cols-5`}
  >
    <Stat label="Custody" value="Your keys" />
    <Stat label="Network" value="Multichain" />
    <Stat label="Verification" value="No KYC" />
    <Stat label="Issuance" value="Instant" />
    <Stat label="Cost to issue" value="Free" />
  </div>
</section>
      {/* ------------------------------------------------------- blue band */}
      <section className="bg-[#0015FF]">
        <div className={`${section} py-16 sm:py-20 md:py-24`}>
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              A crypto card
              <br />
              for everyday life
            </h2>
            <p className="mt-5 sm:mt-6 max-w-md text-[16px] sm:text-[17px] leading-relaxed text-white/70">
              Your card is tied to the wallet you already use. Nothing to top up, nothing held by us.
            </p>
            <Button onClick={goToCheck} className={`${pill} mt-8 sm:mt-10 h-13 sm:h-14 border border-white/30 bg-transparent px-8 sm:px-9 text-[15px] sm:text-base text-white hover:bg-white/10`}>
              Get Card <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- how it works */}
      <section className="bg-[#F7F8FA]">
        <div className={`${section} py-16 sm:py-20 md:py-24`}>
          <h2 className={`font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-bold tracking-[-0.03em] ${ink}`}>How it works</h2>
          <p className={`mt-3 sm:mt-4 max-w-2xl text-[16px] sm:text-[17px] leading-relaxed ${muted}`}>
            Getting your card takes less than a minute. Connect your wallet, complete a few simple
            steps, and start spending worldwide.
          </p>
          <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            
            <div className="rounded-2xl bg-[#F0F1F5] p-6 sm:p-7 md:col-span-2">
              <h3 className={`font-display text-lg sm:text-xl font-bold ${ink}`}>Ready to launch</h3>
              <p className={`mt-3 text-[14px] sm:text-[15px] leading-relaxed ${muted}`}>
                Connect the wallet you already use and have your card in under a minute.
              </p>
              <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
                <span className={`${cardBox} inline-flex items-center gap-2 px-3.5 py-2 text-[13px] font-medium ${ink}`}>
                  <Zap className="h-3.5 w-3.5" /> Fast activation
                </span>
                <span className={`${cardBox} inline-flex items-center gap-2 px-3.5 py-2 text-[13px] font-medium ${ink}`}>
                  <ShieldCheck className="h-3.5 w-3.5" /> Non-custodial
                </span>
              </div>
              <Button onClick={goToCheck} className={`${pillBlue} mt-6 sm:mt-7 h-13 sm:h-14 w-full text-[15px] sm:text-base`}>Get Card</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- feature splits */}
      <Split
        title="Get your card" accent="today"
        body="Connect the wallet you already use and issue your Trust card in a minute."
        art={
          <div className="relative aspect-[280/560] w-[240px] sm:w-[280px]">
            <MediaSlot src="/new-1.jpg" alt="Trust app" w={1796} h={3842} className="absolute inset-0 drop-shadow-[0_30px_50px_rgba(11,13,23,0.25)]" sizes="(max-width: 640px) 240px, 320px" rounded="rounded-[38px]" quality={80} />
            <div className="animate-floaty absolute -left-[24%] top-[24%] w-[38%] drop-shadow-xl">
              <div className="rotate-[-8deg]">
                <MediaSlot src="/g.png" alt="Google Pay" w={600} h={446} rounded="rounded-none" quality={75} />
              </div>
            </div>
            <div className="animate-floaty-slow absolute -right-[16%] -top-[2%] w-[36%] drop-shadow-xl">
              <div className="rotate-[8deg]">
                <MediaSlot src="/a.png" alt="ATM" w={600} h={285} rounded="rounded-none" quality={75} />
              </div>
            </div>
            <div className="animate-floaty absolute -right-[20%] top-[52%] w-[40%] drop-shadow-xl">
              <div className="rotate-[-8deg]">
                <MediaSlot src="/ap.png" alt="Apple Pay" w={600} h={370} rounded="rounded-none" quality={75} />
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
          <div className="relative aspect-[280/560] w-[240px] sm:w-[280px]">
            <MediaSlot src="/new-2.jpg" alt="Pay from your wallet" w={1796} h={3842} className="absolute inset-0 drop-shadow-[0_30px_50px_rgba(11,13,23,0.25)]" sizes="(max-width: 640px) 240px, 320px" rounded="rounded-[38px]" quality={80} />
            <div className="animate-floaty absolute -right-[4%] -top-[4%] w-[20%]">
              <div className="rotate-[8deg]"><MediaSlot src="/coin-3.png" alt="" w={150} h={155} rounded="rounded-none" quality={70} /></div>
            </div>
            <div className="animate-floaty-slow absolute -left-[10%] top-[36%] w-[18%]">
              <div className="rotate-[-12deg]"><MediaSlot src="/coin-5.png" alt="" w={141} h={158} rounded="rounded-none" quality={70} /></div>
            </div>
            <div className="animate-floaty absolute -right-[12%] top-[42%] w-[21%]">
              <div className="rotate-[10deg]"><MediaSlot src="/coin-4.png" alt="" w={147} h={162} rounded="rounded-none" quality={70} /></div>
            </div>
            <div className="animate-floaty-slow absolute -left-[6%] bottom-[16%] w-[17%]">
              <div className="rotate-[-8deg]"><MediaSlot src="/coin-1.png" alt="" w={157} h={150} rounded="rounded-none" quality={70} /></div>
            </div>
            <div className="animate-floaty absolute -bottom-[3%] left-[38%] w-[19%]">
              <div className="rotate-[6deg]"><MediaSlot src="/coin-2.png" alt="" w={179} h={169} rounded="rounded-none" quality={70} /></div>
            </div>
          </div>
        }
      />

      <Split
        title="Instant Card." accent="Unlimited Spending."
        body="Get your crypto card in seconds and enjoy fast, secure payments online and in stores worldwide."
        art={
          <div className="relative aspect-[280/560] w-[280px]">
            <MediaSlot src="/new-3.jpg" alt="Tap to pay" w={1796} h={3842} className="absolute inset-0 drop-shadow-[0_30px_50px_rgba(11,13,23,0.25)]" sizes="(max-width: 640px) 240px, 320px" rounded="rounded-[38px]" quality={80} />
          </div>
        }
        bg="bg-white"
      />

      {/* ------------------------------------------------------- advantages */}
      <section id="advantages" className="bg-[#F7F8FA]">
        <div className={`${section} py-16 sm:py-20 md:py-24`}>
          <h2 className={`font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-bold tracking-[-0.03em] ${ink}`}>Why Choose Our Crypto Card?</h2>
          <p className={`mt-3 text-[16px] sm:text-[17px] ${muted}`}>Everything you need to spend crypto with speed, privacy, and global acceptance.</p>
          <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Feature
              art={
                <MediaSlot
                  src="/mob-3.png"
                  alt="Instant start, no registration"
                  w={1852}
                  h={2400}
                  className="h-full w-full"
                  rounded="rounded-xl"
                  fit="cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={80}
                />
              }
              title="Instant start, no registration"
              body="No need to register or pass KYC verification. Start using the card right away."
            />
            <Feature
              art={
                <MediaSlot
                  src="/mob-2.png"
                  alt="Low cost"
                  w={463}
                  h={600}
                  className="h-full w-full"
                  rounded="rounded-xl"
                  fit="cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={80}
                />
              }
              title="Low cost"
              body="Issuing a card is free. No hidden charges, no monthly costs."
            />
            <Feature
              art={
                <MediaSlot
                  src="/icon-4.png"
                  alt="8% cashback rewards"
                  w={463}
                  h={600}
                  className="h-full w-full"
                  rounded="rounded-xl"
                  fit="cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={80}
                />
              }
              title="8% cashback rewards"
              body="Turn everyday spending into rewards. Enjoy 8% cashback on all purchases while experiencing secure, seamless payments."
            />
            <Feature
              art={
                <MediaSlot
                  src="/mob-4.jpeg"
                  alt="Card security"
                  w={1668}
                  h={2160}
                  className="h-full w-full"
                  rounded="rounded-xl"
                  fit="cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={80}
                />
              }
              title="Card security"
              body="Freeze and unfreeze your card, get transaction notifications, and set spending controls — all from your side."
            />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- faq */}
      <section id="faq" className="bg-white">
        <div className={`${section} max-w-[860px] py-16 sm:py-20 md:py-24`}>
          <h2 className={`font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-bold tracking-[-0.03em] ${ink}`}>FAQ</h2>
          <Accordion type="single" collapsible className="mt-8 sm:mt-10">
            {[
              ["How do I get a card?", "Connect your wallet, complete your details, and follow the issuance process. Your card will be ready in just a few minutes."],
              ["Is the card virtual or physical?", "You can choose either a virtual card for instant use or a physical card for everyday spending."],
              ["Where can I use my card?", "Your card is accepted at millions of merchants worldwide for online, in-store, and contactless payments."],
              ["Can I add my card to Apple Pay or Google Pay?", "Yes. Once activated, your card can be added to Apple Pay or Google Pay for fast and secure payments."],
              ["Can I freeze or unfreeze my card?", "Yes. You can instantly freeze or unfreeze your card whenever you need from your dashboard."],
              ["What happens if my card is lost or stolen?", "You can immediately freeze your card and request a replacement through your account."],
              ["How long does it take to receive my physical card?", "Delivery times vary by country and shipping method. Virtual cards are available instantly after activation."],
              ["How can I contact support?", "Our support team is available 24/7 through live chat and email at support@Trust.com."],
            ].map(([q, a], i) => (
              <AccordionItem key={i} value={`i${i}`} className="border-b border-[#E8EAF0]">
                <AccordionTrigger className={`py-5 sm:py-6 text-left font-display text-base sm:text-lg font-bold ${ink} hover:no-underline`}>{q}</AccordionTrigger>
                <AccordionContent className={`pb-5 sm:pb-6 text-[14px] sm:text-[15px] leading-relaxed ${muted}`}>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ------------------------------------------------------- join today */}
      <section className="bg-[#0015FF]">
        <div className={`${section} flex flex-col items-center gap-6 sm:gap-8 py-16 sm:py-20 md:py-24 text-center`}>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            Join today
          </h2>
          <p className="max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-white/70">
            Connect your wallet, complete your details, and issue your crypto card in minutes.
            No sign-up, no KYC, and no unnecessary delays.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button onClick={goToCheck} className={`${pill} h-13 sm:h-14 bg-white px-8 sm:px-10 text-[15px] sm:text-base text-[#0015FF] hover:bg-white/90`}>
              Get Card <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href="#advantages">
              <Button
                variant="outline"
                className={`${pill} h-13 sm:h-14 border border-white/30 bg-transparent px-8 sm:px-10 text-[15px] sm:text-base text-white hover:bg-white/10`}
              >
                Explore Benefits
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- footer */}
      <footer className="border-t border-[#E8EAF0] bg-[#F7F8FA]">
        <div className={`${section} flex flex-col items-center justify-between gap-5 sm:gap-6 py-8 sm:py-10 md:flex-row`}>
          <div className="flex items-center gap-2.5">
            <MediaSlot src="/tw.png" alt="Trust" w={180} h={162} className="h-7 w-7 sm:h-8 sm:w-8" rounded="rounded-lg" quality={80} />
            <span className={`font-display text-base sm:text-lg font-bold ${ink}`}>Trust</span>
          </div>
          <a href="mailto:support@Trust.com" className={`${muted} hover:text-[#0015FF] text-sm`}>support@Trust.com</a>
          <p className="text-sm text-[#9AA0AE]">© {new Date().getFullYear()} Trust</p>
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
                  <Button onClick={goToCheck} className={`${pillBlue} h-12 w-full`}>Try again</Button>
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
      <SupportWidget />
    </div>
  )
}