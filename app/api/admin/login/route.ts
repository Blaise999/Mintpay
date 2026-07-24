import { NextResponse } from "next/server"
import { checkCredentials, makeToken, COOKIE } from "@/lib/server/admin-auth"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const { user, password } = await req.json().catch(() => ({}))
  if (!checkCredentials(user || "", password || "")) {
    return NextResponse.json({ error: "Incorrect username or password" }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, "", { path: "/", maxAge: 0 })
  return res
}
