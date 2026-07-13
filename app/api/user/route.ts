import { NextResponse } from "next/server"
import { getUser } from "@/lib/server/users"

export const runtime = "nodejs"

export async function GET(req: Request) {
  try {
    const wallet = new URL(req.url).searchParams.get("wallet")
    if (!wallet) return NextResponse.json({ error: "wallet required" }, { status: 400 })
    return NextResponse.json({ user: await getUser(wallet) })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 })
  }
}
