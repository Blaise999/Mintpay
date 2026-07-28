import fs from "fs"
import path from "path"

/**
 * Support conversation store.
 *
 * IMPORTANT: there is no database in this project, so threads live in memory
 * and are mirrored to a JSON file on disk. That works on a long-running Node
 * server (VPS, Render, Railway, `next start`). On serverless platforms
 * (Vercel) each request may hit a different, short-lived instance with an
 * ephemeral filesystem, so threads can disappear between requests.
 *
 * Every inbound message is ALSO emailed to SUPPORT_EMAIL, so nothing is ever
 * lost even if this store is wiped.
 */

export type SupportMessage = {
  id: string
  from: "user" | "admin"
  text: string
  at: string
}

export type SupportThread = {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  unreadForAdmin: number
  messages: SupportMessage[]
}

const DATA_DIR = process.env.SUPPORT_DATA_DIR || "/tmp/Trust-support"
const DATA_FILE = path.join(DATA_DIR, "threads.json")

type Store = Map<string, SupportThread>

// survive hot-reload in dev
const g = globalThis as unknown as { __supportStore?: Store }

function load(): Store {
  if (g.__supportStore) return g.__supportStore
  const map: Store = new Map()
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) as SupportThread[]
      for (const t of raw) map.set(t.id, t)
    }
  } catch {
    /* start empty */
  }
  g.__supportStore = map
  return map
}

function persist(map: Store) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true })
    fs.writeFileSync(DATA_FILE, JSON.stringify([...map.values()], null, 2))
  } catch {
    /* memory-only fallback */
  }
}

const id = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)

export function createThread(name: string, email: string, text: string): SupportThread {
  const map = load()
  const now = new Date().toISOString()
  const thread: SupportThread = {
    id: id(),
    name,
    email,
    createdAt: now,
    updatedAt: now,
    unreadForAdmin: 1,
    messages: [{ id: id(), from: "user", text, at: now }],
  }
  map.set(thread.id, thread)
  persist(map)
  return thread
}

export function addMessage(threadId: string, from: "user" | "admin", text: string): SupportThread | null {
  const map = load()
  const t = map.get(threadId)
  if (!t) return null
  const now = new Date().toISOString()
  t.messages.push({ id: id(), from, text, at: now })
  t.updatedAt = now
  if (from === "user") t.unreadForAdmin += 1
  map.set(t.id, t)
  persist(map)
  return t
}

export function getThread(threadId: string): SupportThread | null {
  return load().get(threadId) ?? null
}

export function listThreads(): SupportThread[] {
  return [...load().values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function markRead(threadId: string) {
  const map = load()
  const t = map.get(threadId)
  if (!t) return
  t.unreadForAdmin = 0
  map.set(t.id, t)
  persist(map)
}
