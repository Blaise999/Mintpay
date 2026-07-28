import { NextResponse } from "next/server"
import { getUser, saveCard, type CardInfo } from "@/lib/server/users"
import { generateCardNumber, futureExpiry } from "@/lib/card"
import { sendCardEmail } from "@/lib/server/email"

export const runtime = "nodejs"

// POST { walletAddress } — issue (or re-send) the user's Trust card by email.
export async function POST(req: Request) {
  try {
    const { walletAddress } = await req.json()
    if (!walletAddress) return NextResponse.json({ error: "walletAddress required" }, { status: 400 })

    const user = await getUser(walletAddress)
    if (!user) return NextResponse.json({ error: "user not found" }, { status: 404 })
    if (!user.email) return NextResponse.json({ error: "add your email first" }, { status: 400 })
    if (!user.name) return NextResponse.json({ error: "add your name first" }, { status: 400 })

    // reuse an existing card, or mint a new one
    const card: CardInfo =
      user.card ??
      (() => {
        const number = generateCardNumber()
        return {
          holder: user.name!.toUpperCase(),
          number,
          last4: number.slice(-4),
          expiry: futureExpiry(),
          issuedAt: new Date().toISOString(),
        }
      })()

    if (!user.card) await saveCard(walletAddress, card)

    let emailed = false
    try {
      await sendCardEmail(user.email, { holder: card.holder, number: card.number, expiry: card.expiry })
      emailed = true
    } catch (e) {
      console.error("[card/issue] email failed:", e)
    }

    return NextResponse.json({ ok: true, emailed, card })
  } catch (e: any) {
    console.error("[card/issue]", e)
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 })
  }
}
