import { NextResponse } from "next/server"
import { generateCardNumber, futureExpiry } from "@/lib/card"
import { sendWelcomeCardEmail } from "@/lib/server/email"

export const runtime = "nodejs"

/**
 * The entire backend. No database.
 *   validate -> mint card -> email it -> hand it back to the client.
 * Nothing is stored; the card lives in the user's inbox and on their screen.
 */

// Deliberately strict-ish: no consecutive dots, real TLD, no trailing junk.
const EMAIL_RE = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/

// Typo-squatted domains people fat-finger constantly.
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
  try {
    const { walletAddress, name, phone, country, email } = await req.json()

    if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(String(walletAddress))) {
      return NextResponse.json({ error: "A connected wallet is required" }, { status: 400 })
    }

    const cleanName = String(name || "").trim()
    if (cleanName.length < 2) return NextResponse.json({ error: "Please enter your full name" }, { status: 400 })

    const cleanPhone = String(phone || "").trim()
    if (cleanPhone.replace(/\D/g, "").length < 7) {
      return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 })
    }

    const cleanCountry = String(country || "").trim()
    if (cleanCountry.length < 2) return NextResponse.json({ error: "Please enter your country" }, { status: 400 })

    const checked = checkEmail(email)
    if (!checked.ok) return NextResponse.json({ error: checked.error }, { status: 400 })

    // mint the card
    const number = generateCardNumber()
    const card = {
      holder: cleanName.toUpperCase().slice(0, 26),
      number,
      last4: number.slice(-4),
      expiry: futureExpiry(),
      issuedAt: new Date().toISOString(),
    }

    // send it — this is the only place the card is persisted: their inbox
    let emailed = false
    let emailError: string | undefined
    try {
      await sendWelcomeCardEmail(checked.email, {
        name: cleanName,
        walletAddress: String(walletAddress),
        card: { holder: card.holder, number: card.number, expiry: card.expiry },
      })
      emailed = true
    } catch (e: any) {
      emailError = e?.message || "Email delivery failed"
      console.error("[onboard] email failed:", e)
    }

    return NextResponse.json({ ok: true, emailed, emailError, card })
  } catch (e: any) {
    console.error("[onboard]", e)
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 })
  }
}
