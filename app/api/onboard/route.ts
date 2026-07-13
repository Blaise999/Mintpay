import { NextResponse } from "next/server"
import { getUser, upsertUser, saveCard, markConnectedEmailSent, type CardInfo } from "@/lib/server/users"
import { generateCardNumber, futureExpiry } from "@/lib/card"
import { sendConnectedEmail, sendCardEmail } from "@/lib/server/email"

export const runtime = "nodejs"

// Called at the end of onboarding, once we have name + email.
// Saves the profile, marks onboarded, mints the branded card, emails it.
export async function POST(req: Request) {
  try {
    const { walletAddress, name, email, country } = await req.json()
    if (!walletAddress) return NextResponse.json({ error: "walletAddress required" }, { status: 400 })
    if (!name || !email) return NextResponse.json({ error: "name and email are required" }, { status: 400 })

    // 1) save profile + mark onboarded
    await upsertUser(walletAddress, {
      name: String(name).slice(0, 80),
      email: String(email).trim().toLowerCase(),
      country: country ? String(country).slice(0, 60) : undefined,
      onboarded: true,
    })

    // 2) mint the MintPay card if they don't have one yet
    let user = await getUser(walletAddress)
    let card: CardInfo | undefined = user?.card
    if (!card && user) {
      const number = generateCardNumber()
      card = {
        holder: (user.name || "MINTPAY MEMBER").toUpperCase(),
        number,
        last4: number.slice(-4),
        expiry: futureExpiry(),
        issuedAt: new Date().toISOString(),
      }
      await saveCard(walletAddress, card)
    }

    // 3) send emails (welcome + card) — best effort, never blocks onboarding
    let emailed = false
    if (user?.email) {
      try {
        await sendConnectedEmail(user.email, user.walletAddress)
        await markConnectedEmailSent(user.walletAddress)
        if (card) await sendCardEmail(user.email, { holder: card.holder, number: card.number, expiry: card.expiry })
        emailed = true
      } catch (e) {
        console.error("[onboard] email failed:", e)
      }
    }

    user = await getUser(walletAddress)
    return NextResponse.json({ ok: true, emailed, user })
  } catch (e: any) {
    console.error("[onboard]", e)
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 })
  }
}
