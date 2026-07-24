"use client"
import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"

type Msg = { id: string; from: "user" | "admin"; text: string; at: string }
const KEY = "mintpay.support.thread"

/**
 * Floating support widget. Starts a thread with name + email + first message,
 * then polls every 3s so an admin reply lands almost immediately.
 */
export function SupportWidget() {
  const [open, setOpen] = useState(false)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Msg[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [text, setText] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [unseen, setUnseen] = useState(0)

  const endRef = useRef<HTMLDivElement>(null)
  const seenCount = useRef(0)

  // restore an existing conversation
  useEffect(() => {
    try {
      const id = window.localStorage.getItem(KEY)
      if (id) setThreadId(id)
    } catch {
      /* ignore */
    }
  }, [])

  // poll for replies
  useEffect(() => {
    if (!threadId) return
    let alive = true
    const tick = async () => {
      try {
        const r = await fetch(`/api/support?thread=${threadId}`)
        const d = await r.json()
        if (!alive) return
        if (d.gone) {
          window.localStorage.removeItem(KEY)
          setThreadId(null)
          setMessages([])
          return
        }
        if (Array.isArray(d.messages)) {
          setMessages(d.messages)
          if (!open) {
            const admin = d.messages.filter((m: Msg) => m.from === "admin").length
            setUnseen(Math.max(0, admin - seenCount.current))
          }
        }
      } catch {
        /* offline; try again next tick */
      }
    }
    tick()
    const t = setInterval(tick, 3000)
    return () => {
      alive = false
      clearInterval(t)
    }
  }, [threadId, open])

  useEffect(() => {
    if (open) {
      seenCount.current = messages.filter((m) => m.from === "admin").length
      setUnseen(0)
      endRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [open, messages])

  const send = async () => {
    const body = text.trim()
    if (!body || sending) return

    if (!threadId && (name.trim().length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email.trim()))) {
      setError("Add your name and a valid email so we can reply.")
      return
    }

    setSending(true)
    setError("")
    try {
      const r = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, name: name.trim(), email: email.trim(), text: body }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || "Couldn't send")

      setThreadId(d.threadId)
      try {
        window.localStorage.setItem(KEY, d.threadId)
      } catch {
        /* ignore */
      }
      setMessages(d.messages || [])
      setText("")
    } catch (e: any) {
      setError(e?.message || "Couldn't send")
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close support" : "Open support"}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#0015FF] text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && unseen > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold">
            {unseen}
          </span>
        )}
      </button>

      {/* panel */}
      <div
        className={`fixed bottom-24 right-5 z-[60] flex w-[min(370px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-[#E8EAF0] bg-white shadow-2xl transition-all duration-200 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
        style={{ maxHeight: "min(560px, calc(100vh - 8rem))" }}
      >
        {/* header */}
        <div className="flex items-center justify-between bg-[#0015FF] px-5 py-4 text-white">
          <div>
            <p className="font-display text-[16px] font-bold">MintPay Support</p>
            <p className="text-[12px] text-white/70">We usually reply in a few minutes.</p>
          </div>
          <button 
            onClick={() => setOpen(false)}
            aria-label="Close support panel"
            className="rounded-lg p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* message area */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-[#F7F8FA] p-4">
          {messages.length === 0 && (
            <p className="text-center text-[13px] text-[#9AA0AE]">
              Send us a message and we&apos;ll get right back to you.
            </p>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed ${
                  m.from === "user"
                    ? "rounded-br-sm bg-[#0015FF] text-white"
                    : "rounded-bl-sm border border-[#E8EAF0] bg-white text-[#0B0D17]"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* input footer */}
        <div className="border-t border-[#E8EAF0] bg-white p-3">
          {!threadId && (
            <div className="mb-2 grid grid-cols-2 gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-lg border border-[#E8EAF0] px-3 py-2 text-[14px] outline-none focus:border-[#0015FF]"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="rounded-lg border border-[#E8EAF0] px-3 py-2 text-[14px] outline-none focus:border-[#0015FF]"
              />
            </div>
          )}

          <div className="flex items-end gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              rows={1}
              placeholder="Type a message…"
              className="max-h-28 min-h-[42px] flex-1 resize-none rounded-lg border border-[#E8EAF0] px-3 py-2.5 text-[14px] outline-none focus:border-[#0015FF]"
            />
            <button
              onClick={send}
              disabled={sending || !text.trim()}
              className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-[#0015FF] text-white disabled:opacity-40"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>

          {error && <p className="mt-2 text-[12px] text-red-500">{error}</p>}

          <p className="mt-2 text-center text-[11px] text-[#9AA0AE]">
            or email{" "}
            <a href="mailto:support@mintpay.com" className="underline">
              support@mintpay.com
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
