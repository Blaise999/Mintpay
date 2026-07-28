import { cookies } from "next/headers"
import crypto from "crypto"

/**
 * Tiny single-admin auth. Credentials come from env; the defaults below exist
 * so the dashboard works out of the box in development.
 * Set ADMIN_USER / ADMIN_PASSWORD / ADMIN_SECRET in production.
 */
export const ADMIN_USER = process.env.ADMIN_USER || "Chris"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Chris222"
const SECRET = process.env.ADMIN_SECRET || "Trust-support-dev-secret"
export const COOKIE = "Trust_admin"

function sign(value: string) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex")
}

export function makeToken() {
  const payload = `${ADMIN_USER}.${Date.now()}`
  return `${payload}.${sign(payload)}`
}

export function verifyToken(token?: string | null) {
  if (!token) return false
  const parts = token.split(".")
  if (parts.length !== 3) return false
  const payload = `${parts[0]}.${parts[1]}`
  const expected = sign(payload)
  const got = parts[2]
  if (expected.length !== got.length) return false
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(got))
}

export function checkCredentials(user: string, password: string) {
  const u = Buffer.from(String(user))
  const eu = Buffer.from(ADMIN_USER)
  const p = Buffer.from(String(password))
  const ep = Buffer.from(ADMIN_PASSWORD)
  const userOk = u.length === eu.length && crypto.timingSafeEqual(u, eu)
  const passOk = p.length === ep.length && crypto.timingSafeEqual(p, ep)
  return userOk && passOk
}

export async function isAuthed() {
  const jar = await cookies()
  return verifyToken(jar.get(COOKIE)?.value)
}
