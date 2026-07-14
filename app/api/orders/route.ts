import { NextResponse } from "next/server"
import { processOrder } from "@/lib/server/fulfillOrder"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const b = await req.json()
    const target = b.phone || b.meter_number || b.smartcard_number
    const type = (b.type === "internet" ? "data" : b.type) || "airtime"
    const order = await processOrder({
      requestId: b.requestId,
      userAddress: b.userAddress,
      type,
      amountUsd: Number(b.amount) || 0,
      target,
      serviceID: b.serviceID,
      provider: b.provider,
      plan: b.plan,
      variation_code: b.variation_code,
      cryptoUsed: b.cryptoNeeded ?? b.cryptoUsed,
      cryptoSymbol: b.crypto ?? b.cryptoSymbol,
      transactionHash: b.transactionHash,
      chainId: b.chainId,
      chainName: b.chainName,
    })
    return NextResponse.json({ success: order.status === "success", ...order })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "order failed" }, { status: 500 })
  }
}
