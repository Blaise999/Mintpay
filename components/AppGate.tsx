"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/components/session-provider"
import { Onboarding } from "@/components/onboarding"
import { AppLoader } from "@/components/app-loader"

/**
 * Single gate. Tolerant of transient wallet drops so users don't get
 * "logged out" mid-session: if the wallet was connected and briefly reports
 * disconnected (RPC hiccup / reconnect), we wait a grace window before
 * bouncing to the landing, and cancel if it reconnects.
 */
export function AppGate({ children }: { children: React.ReactNode }) {
  const { ready, isConnected, loading, onboarded } = useSession()
  const router = useRouter()
  const wasConnected = useRef(false)
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    if (isConnected) {
      wasConnected.current = true
      setBounce(false)
    }
  }, [isConnected])

  useEffect(() => {
    if (!ready || isConnected) return
    // grace period: longer if we had a live session (let wagmi reconnect)
    const wait = wasConnected.current ? 6000 : 1200
    const t = setTimeout(() => setBounce(true), wait)
    return () => clearTimeout(t)
  }, [ready, isConnected])

  useEffect(() => {
    if (bounce) router.replace("/")
  }, [bounce, router])

  if (!ready) return <AppLoader label="Starting up…" />
  if (!isConnected) return <AppLoader label={wasConnected.current ? "Reconnecting your wallet…" : "Connect your wallet…"} />
  if (loading) return <AppLoader label="Loading your account…" />
  if (!onboarded) return <Onboarding />
  return <>{children}</>
}
