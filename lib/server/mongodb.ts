import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "Trust";

if (!uri) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

let cached = (global as any)._TrustMongo as
  | { client: MongoClient; db: Db; promise: Promise<MongoClient> | null }
  | undefined;

if (!cached) {
  cached = (global as any)._TrustMongo = { 
    client: null as any, 
    db: null as any, 
    promise: null 
  };
}

export async function getDb(): Promise<Db> {
  if (cached!.db) return cached!.db;

  if (!cached!.promise) {
    const client = new MongoClient(uri!, {   // ← Added ! (non-null assertion)
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
      tls: true,
      retryWrites: true,
      w: "majority",
      tlsAllowInvalidCertificates: process.env.NODE_ENV === "development",
    });

    cached!.promise = client.connect();
  }

  try {
    const client = await cached!.promise;
    cached!.client = client;
    cached!.db = client.db(dbName);

    // Create unique index (safe to call repeatedly)
    await cached!.db
      .collection("users")
      .createIndex({ walletAddress: 1 }, { unique: true })
      .catch(() => {});

    console.log("✅ MongoDB connected successfully");
    return cached!.db;
  } catch (error: any) {
    console.error("❌ MongoDB connection failed:", error.message);
    cached!.promise = null; // Allow retry
    throw error;
  }
}