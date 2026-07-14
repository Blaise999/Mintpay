"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import { SessionProvider } from "@/components/session-provider"
import { wagmiConfig } from "@/lib/wagmi"

// Instantiating queryClient outside ensures it isn't recreated on re-renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: 1
    },
  },
})

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // This hook only runs in the browser environment after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // ✅ HARDENED FIX: Prevent SSR from executing Wagmi's internal storage checks
  if (!mounted) {
    return (
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {/* Render children without Wagmi/Web3 layers during server-side build steps */}
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    )
  }

  // Pure browser-only tree execution block
  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
