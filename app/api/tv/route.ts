import { NextResponse } from "next/server"
import { processOrder } from "@/lib/server/fulfillOrder"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const b = await req.json()
    const order = await processOrder({
      requestId: b.requestId,
      userAddress: b.userAddress,
      type: "tv",
      amountUsd: Number(b.amount) || 0,
      target: b.smartcard_number,
      serviceID: b.serviceID,
      provider: b.provider,
      plan: b.plan,
      variation_code: b.variation_code,
      cryptoUsed: b.cryptoUsed ?? b.cryptoNeeded,
      cryptoSymbol: b.cryptoSymbol ?? b.crypto,
      transactionHash: b.transactionHash,
      chainId: b.chainId,
      chainName: b.chainName,
    })
    return NextResponse.json({ success: order.status === "success", ...order })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "order failed" }, { status: 500 })
  }
}
