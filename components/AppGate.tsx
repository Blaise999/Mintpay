"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/components/session-provider"
import { Onboarding } from "@/components/onboarding"
import { AppLoader } from "@/components/app-loader"

/**
 * One gate to rule them all. On any protected page:
 *  - wallet not connected      -> back to landing
 *  - connected, still loading   -> loader
 *  - connected, NOT onboarded   -> onboarding (collect details, mint card, email)
 *  - connected, onboarded       -> the page
 */
export function AppGate({ children }: { children: React.ReactNode }) {
  const { ready, isConnected, loading, onboarded } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (ready && !isConnected) router.replace("/")
  }, [ready, isConnected, router])

  if (!ready) return <AppLoader label="Starting up…" />
  if (!isConnected) return <AppLoader label="Redirecting…" />
  if (loading) return <AppLoader label="Checking your wallet…" />
  if (!onboarded) return <Onboarding />
  return <>{children}</>
}
