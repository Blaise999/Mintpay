import { NextResponse } from "next/server"
import { createThread, addMessage, getThread } from "@/lib/server/support-store"
import { sendSupportAlert } from "@/lib/server/email"

export const runtime = "nodejs"

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/

/** GET /api/support?thread=<id>  -> poll for new messages */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const threadId = url.searchParams.get("thread")
  if (!threadId) return NextResponse.json({ error: "thread required" }, { status: 400 })
  const t = getThread(threadId)
  if (!t) return NextResponse.json({ messages: [], gone: true })
  return NextResponse.json({ messages: t.messages })
}

/** POST /api/support -> start a thread or add to one */
export async function POST(req: Request) {
  try {
    const { threadId, name, email, text } = await req.json()
    const body = String(text || "").trim()
    if (!body) return NextResponse.json({ error: "Message is required" }, { status: 400 })
    if (body.length > 4000) return NextResponse.json({ error: "Message is too long" }, { status: 400 })

    // follow-up on an existing thread
    if (threadId) {
      const t = addMessage(String(threadId), "user", body)
      if (!t) return NextResponse.json({ error: "Conversation not found", gone: true }, { status: 404 })
      sendSupportAlert(t.name, t.email, body, t.id).catch(() => {})
      return NextResponse.json({ threadId: t.id, messages: t.messages })
    }

    // new thread
    const cleanName = String(name || "").trim()
    const cleanEmail = String(email || "").trim().toLowerCase()
    if (cleanName.length < 2) return NextResponse.json({ error: "Please enter your name" }, { status: 400 })
    if (!EMAIL_RE.test(cleanEmail)) return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 })

    const t = createThread(cleanName, cleanEmail, body)
    sendSupportAlert(t.name, t.email, body, t.id).catch(() => {})
    return NextResponse.json({ threadId: t.id, messages: t.messages })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 })
  }
}
