"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, Send, LogOut, Inbox } from "lucide-react"

type Msg = { id: string; from: "user" | "admin"; text: string; at: string }
type Thread = {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  unreadForAdmin: number
  messages: Msg[]
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const [threads, setThreads] = useState<Thread[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [reply, setReply] = useState("")
  const endRef = useRef<HTMLDivElement>(null)

  const active = threads.find((t) => t.id === activeId) || null

  const login = async () => {
    setBusy(true)
    setError("")
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || "Login failed")
      setAuthed(true)
    } catch (e: any) {
      setError(e?.message || "Login failed")
    } finally {
      setBusy(false)
    }
  }

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" })
    setAuthed(false)
    setThreads([])
    setActiveId(null)
  }

  // poll the inbox
  useEffect(() => {
    let alive = true
    const tick = async () => {
      try {
        const r = await fetch("/api/support/admin")
        if (r.status === 401) { if (alive) setAuthed(false); return }
        const d = await r.json()
        if (alive && Array.isArray(d.threads)) {
          setThreads(d.threads)
          setAuthed(true)
        }
      } catch { /* retry next tick */ }
    }
    tick()
    const t = setInterval(tick, 3000)
    return () => { alive = false; clearInterval(t) }
  }, [authed])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [active?.messages.length])

  // mark read when opening a thread
  useEffect(() => {
    if (!activeId) return
    fetch(`/api/support/admin?thread=${activeId}`).catch(() => {})
  }, [activeId])

  const send = async () => {
    const body = reply.trim()
    if (!body || !activeId) return
    setReply("")
    try {
      const r = await fetch("/api/support/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId: activeId, text: body }),
      })
      const d = await r.json()
      if (r.ok && d.thread) {
        setThreads((prev) => prev.map((t) => (t.id === d.thread.id ? d.thread : t)))
      }
    } catch { /* the poll will reconcile */ }
  }

  /* ------------------------------------------------------------ login view */
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-[#E8EAF0] bg-white p-8">
          <h1 className="font-display text-2xl font-bold text-[#0B0D17]">Support dashboard</h1>
          <p className="mt-1 text-[14px] text-[#6E7381]">Sign in to read and answer messages.</p>
          <div className="mt-6 space-y-3">
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Username"
              className="w-full rounded-lg border border-[#E8EAF0] px-3.5 py-2.5 text-[15px] outline-none focus:border-[#0015FF]"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-[#E8EAF0] px-3.5 py-2.5 text-[15px] outline-none focus:border-[#0015FF]"
            />
          </div>
          {error && <p className="mt-3 text-[13px] text-red-500">{error}</p>}
          <button
            onClick={login}
            disabled={busy}
            className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-[#0015FF] font-semibold text-white hover:bg-[#0010CC] disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
          </button>
        </div>
      </div>
    )
  }

  /* -------------------------------------------------------- dashboard view */
  return (
    <div className="flex h-screen flex-col bg-[#F7F8FA]">
      <header className="flex h-16 items-center justify-between border-b border-[#E8EAF0] bg-white px-5">
        <div className="flex items-center gap-2">
          <Inbox className="h-5 w-5 text-[#0015FF]" />
          <span className="font-display text-[17px] font-bold text-[#0B0D17]">Support</span>
          <span className="ml-2 rounded-full bg-[#F0F1F5] px-2.5 py-1 text-[12px] text-[#6E7381]">
            {threads.length} {threads.length === 1 ? "thread" : "threads"}
          </span>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-[14px] text-[#6E7381] hover:text-[#0B0D17]">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* thread list */}
        <aside className={`w-full shrink-0 overflow-y-auto border-r border-[#E8EAF0] bg-white sm:w-72 ${activeId ? "hidden sm:block" : ""}`}>
          {threads.length === 0 && (
            <p className="p-5 text-[14px] text-[#9AA0AE]">No messages yet.</p>
          )}
          {threads.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={`flex w-full flex-col items-start gap-0.5 border-b border-[#F0F1F5] px-4 py-3 text-left transition-colors hover:bg-[#F7F8FA] ${
                activeId === t.id ? "bg-[#F2F3FF]" : ""
              }`}
            >
              <span className="flex w-full items-center justify-between">
                <span className="font-semibold text-[#0B0D17]">{t.name}</span>
                {t.unreadForAdmin > 0 && (
                  <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0015FF] px-1.5 text-[11px] font-bold text-white">
                    {t.unreadForAdmin}
                  </span>
                )}
              </span>
              <span className="text-[12px] text-[#9AA0AE]">{t.email}</span>
              <span className="line-clamp-1 text-[13px] text-[#6E7381]">
                {t.messages[t.messages.length - 1]?.text}
              </span>
            </button>
          ))}
        </aside>

        {/* conversation */}
        <main className={`flex min-w-0 flex-1 flex-col ${activeId ? "" : "hidden sm:flex"}`}>
          {!active ? (
            <div className="flex flex-1 items-center justify-center text-[14px] text-[#9AA0AE]">
              Pick a conversation to reply.
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 border-b border-[#E8EAF0] bg-white px-5 py-3">
                <button onClick={() => setActiveId(null)} className="text-[14px] text-[#0015FF] sm:hidden">Back</button>
                <div>
                  <p className="font-semibold text-[#0B0D17]">{active.name}</p>
                  <a href={`mailto:${active.email}`} className="text-[12px] text-[#6E7381] hover:underline">{active.email}</a>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {active.messages.map((m) => (
                  <div key={m.id} className={`flex ${m.from === "admin" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                        m.from === "admin"
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

              <div className="border-t border-[#E8EAF0] bg-white p-4">
                <div className="flex items-end gap-2">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
                    rows={1}
                    placeholder="Type your reply…"
                    className="max-h-32 min-h-[44px] flex-1 resize-none rounded-lg border border-[#E8EAF0] px-3.5 py-3 text-[14px] outline-none focus:border-[#0015FF]"
                  />
                  <button
                    onClick={send}
                    disabled={!reply.trim()}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0015FF] text-white disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
