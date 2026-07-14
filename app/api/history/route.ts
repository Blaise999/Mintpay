import { NextResponse } from "next/server"
import { getHistory } from "@/lib/server/orders"

export const runtime = "nodejs"

export async function GET(req: Request) {
  try {
    const addr = new URL(req.url).searchParams.get("userAddress")
    if (!addr) return NextResponse.json({ error: "userAddress required" }, { status: 400 })
    const orders = await getHistory(addr)
    return NextResponse.json({ success: true, orders, history: orders })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "history error" }, { status: 500 })
  }
}
