// app/api/user/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/server/mongodb"; 

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet");

    if (!wallet) {
      return NextResponse.json({ error: "Wallet required" }, { status: 400 });
    }

    const normalizedWallet = wallet.trim().toLowerCase();
    const db = await getDb();
    const usersCollection = db.collection("users");

    // 1. Try to find the existing user
    let user = await usersCollection.findOne({ walletAddress: normalizedWallet });

    // 2. If it's a brand-new user, save them for the first time!
    if (!user) {
      console.log("[API /user] New user detected. Creating profile for:", normalizedWallet);
      
      const newUser = {
        walletAddress: normalizedWallet,
        createdAt: new Date(),
        role: "user",
      };

      const result = await usersCollection.insertOne(newUser);
      
      // Fetch the full document with its newly assigned database _id to fix TypeScript
      user = await usersCollection.findOne({ _id: result.insertedId });
    }

    return NextResponse.json({ user });

  } catch (error: any) {
    console.error("[API /user] SERVER ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" }, 
      { status: 500 }
    );
  }
}
