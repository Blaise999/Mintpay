import { MongoClient, type Db } from "mongodb"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || "mintpay"

let cached = (global as any)._mintpayMongo as
  | { client: MongoClient; db: Db; promise: Promise<MongoClient> | null }
  | undefined

if (!cached) {
  cached = (global as any)._mintpayMongo = { client: null as any, db: null as any, promise: null }
}

export async function getDb(): Promise<Db> {
  if (!uri) throw new Error("MONGODB_URI is not set")
  if (cached!.db) return cached!.db
  if (!cached!.promise) {
    const client = new MongoClient(uri)
    cached!.promise = client.connect()
  }
  const client = await cached!.promise
  cached!.client = client
  cached!.db = client.db(dbName)
  // ensure a unique index on walletAddress (idempotent)
  await cached!.db.collection("users").createIndex({ walletAddress: 1 }, { unique: true }).catch(() => {})
  return cached!.db
}
