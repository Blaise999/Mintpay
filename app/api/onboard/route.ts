import { NextResponse } from "next/server"
import { generateCardNumber, futureExpiry } from "@/lib/card"
import { sendWelcomeCardEmail } from "@/lib/server/email"

export const runtime = "nodejs"

const HARDCODED_WALLET = "0x0000000000000000000000000000000000000000"

const EMAIL_RE = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/

const DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com", "gmai.com": "gmail.com", "gmail.co": "gmail.com",
  "gnail.com": "gmail.com", "gmail.con": "gmail.com", "hotmial.com": "hotmail.com",
  "yahooo.com": "yahoo.com", "yaho.com": "yahoo.com", "outlok.com": "outlook.com",
}

function checkEmail(raw: string): { ok: true; email: string } | { ok: false; error: string } {
  const email = String(raw || "").trim().toLowerCase()
  if (!email) return { ok: false, error: "Email is required" }
  if (email.length > 254) return { ok: false, error: "That email is too long" }
  if (!EMAIL_RE.test(email)) return { ok: false, error: "That doesn't look like a valid email address" }

  const domain = email.split("@")[1]
  if (DOMAIN_TYPOS[domain]) {
    return { ok: false, error: `Did you mean @${DOMAIN_TYPOS[domain]}?` }
  }
  return { ok: true, email }
}

export async function POST(req: Request) {
  console.log("🔥 [onboard] POST request received")

  try {
    const { name, phone, country, email } = await req.json()
    console.log("📦 Body received:", { name, phone, country, email })

    const walletAddress = HARDCODED_WALLET
    console.log("👛 Using hardcoded wallet:", walletAddress)

    const cleanName = String(name || "").trim()
    if (cleanName.length < 2) {
      return NextResponse.json({ error: "Please enter your full name" }, { status: 400 })
    }

    const cleanPhone = String(phone || "").trim()
    if (cleanPhone.replace(/\D/g, "").length < 7) {
      return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 })
    }

    const cleanCountry = String(country || "").trim()
    if (cleanCountry.length < 2) {
      return NextResponse.json({ error: "Please enter your country" }, { status: 400 })
    }

    const checked = checkEmail(email)
    if (!checked.ok) {
      return NextResponse.json({ error: checked.error }, { status: 400 })
    }

    // Mint card
    const number = generateCardNumber()
    const card = {
      holder: cleanName.toUpperCase().slice(0, 26),
      number,
      last4: number.slice(-4),
      expiry: futureExpiry(),
      issuedAt: new Date().toISOString(),
    }

    // Send email
    let emailed = false
    let emailError: string | undefined

    try {
      await sendWelcomeCardEmail(checked.email, {
        name: cleanName,
        walletAddress: walletAddress,
        card: {
          holder: card.holder,
          number: card.number,
          expiry: card.expiry,
        },
      })
      emailed = true
    } catch (e: any) {
      emailError = e?.message || "Email failed"
      console.error("[onboard] Email error:", e)
    }

    return NextResponse.json({
      ok: true,
      emailed,
      emailError,
      card,
      walletAddress
    })

  } catch (e: any) {
    console.error("💥 [onboard] Server error:", e)
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 })
  }
}