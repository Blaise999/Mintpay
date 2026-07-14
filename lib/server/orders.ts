import { getDb } from "./mongodb"

export type OrderType = "airtime" | "data" | "electricity" | "tv"
export type Order = {
  requestId: string
  userAddress: string
  type: OrderType
  serviceID?: string
  provider?: string
  plan?: string
  variation_code?: string
  target?: string // phone / meter / smartcard
  amountUsd: number
  cryptoUsed?: number
  cryptoSymbol?: string
  transactionHash?: string
  chainId?: number
  chainName?: string
  status: "pending" | "success" | "failed"
  providerRef?: string
  message?: string
  createdAt: string
}

export async function createOrder(o: Omit<Order, "status" | "createdAt"> & { status?: Order["status"] }) {
  const db = await getDb()
  const doc: Order = { status: "pending", createdAt: new Date().toISOString(), ...o }
  await db.collection<Order>("orders").updateOne(
    { requestId: doc.requestId },
    { $setOnInsert: doc },
    { upsert: true },
  )
  return doc
}

export async function updateOrder(requestId: string, patch: Partial<Order>) {
  const db = await getDb()
  await db.collection<Order>("orders").updateOne({ requestId }, { $set: patch })
}

export async function getHistory(userAddress: string, limit = 50) {
  const db = await getDb()
  return db
    .collection<Order>("orders")
    .find({ userAddress: userAddress.toLowerCase() })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray()
}
