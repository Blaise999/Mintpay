// app/api/user/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/server/mongodb";   // ← Make sure this path is correct

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const wallet = new URL(req.url).searchParams.get("wallet");
    
    console.log("[API /user] Requested wallet:", wallet);

    if (!wallet) {
      return NextResponse.json({ error: "wallet parameter is required" }, { status: 400 });
    }

    const db = await getDb();
    const user = await db.collection("users").findOne({ walletAddress: wallet });

    console.log("[API /user] Found user:", user ? "YES" : "NO");

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
  } catch (e: any) {
    console.error("[API /user] FULL ERROR:", e);
    console.error(e?.stack);
    
    return NextResponse.json({ 
      error: e?.message || "Internal server error" 
    }, { status: 500 });
  }
}