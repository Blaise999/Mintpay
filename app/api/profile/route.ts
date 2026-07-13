import { NextResponse } from "next/server"
import { getUser, upsertUser, markConnectedEmailSent } from "@/lib/server/users"
import { sendConnectedEmail } from "@/lib/server/email"

export const runtime = "nodejs"

// GET /api/profile?wallet=0x...
export async function GET(req: Request) {
  try {
    const wallet = new URL(req.url).searchParams.get("wallet")
    if (!wallet) return NextResponse.json({ error: "wallet required" }, { status: 400 })
    return NextResponse.json({ user: await getUser(wallet) })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 })
  }
}

// POST { walletAddress, name?, avatar?, email? }
export async function POST(req: Request) {
  try {
    const { walletAddress, name, avatar, email } = await req.json()
    if (!walletAddress) return NextResponse.json({ error: "walletAddress required" }, { status: 400 })

    const patch: Record<string, string> = {}
    if (typeof name === "string") patch.name = name.slice(0, 80)
    if (typeof avatar === "string") patch.avatar = avatar // data URL or https URL
    if (typeof email === "string") patch.email = email.trim().toLowerCase()

    const before = await getUser(walletAddress)
    const { user } = await upsertUser(walletAddress, patch)

    // If they just added an email and were never emailed, send the connect email now.
    if (user.email && !user.connectedEmailSent && !before?.email) {
      try {
        await sendConnectedEmail(user.email, user.walletAddress)
        await markConnectedEmailSent(user.walletAddress)
      } catch (e) {
        console.error("[profile] connect email failed:", e)
      }
    }

    return NextResponse.json({ ok: true, user: await getUser(walletAddress) })
  } catch (e: any) {
    console.error("[profile]", e)
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 })
  }
}
