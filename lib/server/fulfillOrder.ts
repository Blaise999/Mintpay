import { createOrder, updateOrder, type Order, type OrderType } from "./orders"
import { fulfill } from "./bills"

export async function processOrder(input: {
  requestId: string
  userAddress: string
  type: OrderType
  amountUsd: number
  target?: string
  serviceID?: string
  provider?: string
  plan?: string
  variation_code?: string
  cryptoUsed?: number
  cryptoSymbol?: string
  transactionHash?: string
  chainId?: number
  chainName?: string
}) {
  if (!input.requestId || !input.userAddress) throw new Error("requestId and userAddress required")
  const order = await createOrder({ ...input, userAddress: input.userAddress.toLowerCase() })
  const r = await fulfill(order as Order)
  await updateOrder(order.requestId, { status: r.status, providerRef: r.providerRef, message: r.message })
  return { ...order, status: r.status, providerRef: r.providerRef, message: r.message }
}
