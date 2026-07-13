import { getDb } from "./mongodb"

export type CardInfo = {
  holder: string
  number: string
  last4: string
  expiry: string
  issuedAt: string
}

export type User = {
  walletAddress: string
  email?: string
  name?: string
  country?: string
  avatar?: string
  onboarded?: boolean
  card?: CardInfo
  accessStatus?: "granted" | "denied"
  connectedEmailSent?: boolean
  createdAt: string
  updatedAt: string
}

const norm = (a: string) => a.trim().toLowerCase()

export async function getUser(walletAddress: string): Promise<User | null> {
  const db = await getDb()
  return db.collection<User>("users").findOne({ walletAddress: norm(walletAddress) })
}

/** Insert the user if new; returns { user, isNew }. */
export async function upsertUser(
  walletAddress: string,
  patch: Partial<User> = {},
): Promise<{ user: User; isNew: boolean }> {
  const db = await getDb()
  const wallet = norm(walletAddress)
  const now = new Date().toISOString()
  const existing = await db.collection<User>("users").findOne({ walletAddress: wallet })

  if (!existing) {
    const user: User = { walletAddress: wallet, accessStatus: "granted", createdAt: now, updatedAt: now, ...patch }
    await db.collection<User>("users").insertOne(user)
    return { user, isNew: true }
  }

  const update = { ...patch, updatedAt: now }
  await db.collection<User>("users").updateOne({ walletAddress: wallet }, { $set: update })
  return { user: { ...existing, ...update }, isNew: false }
}

export async function markConnectedEmailSent(walletAddress: string) {
  const db = await getDb()
  await db
    .collection<User>("users")
    .updateOne({ walletAddress: norm(walletAddress) }, { $set: { connectedEmailSent: true } })
}

export async function saveCard(walletAddress: string, card: CardInfo) {
  const db = await getDb()
  await db
    .collection<User>("users")
    .updateOne({ walletAddress: norm(walletAddress) }, { $set: { card, updatedAt: new Date().toISOString() } })
}

export async function setAccess(walletAddress: string, status: "granted" | "denied") {
  const db = await getDb()
  await db
    .collection<User>("users")
    .updateOne({ walletAddress: norm(walletAddress) }, { $set: { accessStatus: status, updatedAt: new Date().toISOString() } })
}
