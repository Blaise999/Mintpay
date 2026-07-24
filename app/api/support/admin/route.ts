import { NextResponse } from "next/server"
import { listThreads, addMessage, markRead, getThread } from "@/lib/server/support-store"
import { isAuthed } from "@/lib/server/admin-auth"
import { sendSupportReply } from "@/lib/server/email"

export const runtime = "nodejs"

/** GET /api/support/admin           -> all threads
 *  GET /api/support/admin?thread=id -> one thread (and mark read) */
export async function GET(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  const threadId = new URL(req.url).searchParams.get("thread")
  if (threadId) {
    markRead(threadId)
    return NextResponse.json({ thread: getThread(threadId) })
  }
  return NextResponse.json({ threads: listThreads() })
}

/** POST /api/support/admin -> admin reply */
export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  const { threadId, text } = await req.json().catch(() => ({}))
  const body = String(text || "").trim()
  if (!threadId || !body) return NextResponse.json({ error: "threadId and text required" }, { status: 400 })

  const t = addMessage(String(threadId), "admin", body)
  if (!t) return NextResponse.json({ error: "Conversation not found" }, { status: 404 })

  // also email the customer so they get it even if their widget is closed
  sendSupportReply(t.email, t.name, body).catch(() => {})
  return NextResponse.json({ thread: t })
}
