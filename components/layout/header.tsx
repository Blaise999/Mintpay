"use client"

import { useState, useEffect } from "react" // 1. Added useEffect
import { Bell, Menu, Search, User, Wallet, Moon, Sun, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { TrustLogo } from "@/components/brand/logo"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useSession } from "@/components/session-provider"
import { useChainId, useSwitchChain } from "wagmi"
import { base, lisk, celo } from "wagmi/chains"
import { toast } from "sonner"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [notifications] = useState(0)
  const router = useRouter()
  const { disconnect } = useSession()

  // ==========================================
  // FIX: Safety mounting architecture
  // ==========================================
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Call wagmi hooks normally
  const chainId = useChainId()
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain()

  const chains = [
    { id: base.id, name: "Base", icon: "🔵" },
    { id: lisk.id, name: "Lisk", icon: "🟢" },
    { id: celo.id, name: "Celo", icon: "🟡" },
  ]

  // Dynamic chain extraction logic
  const currentChain = chains.find(chain => chain.id === chainId) || chains[0]

  const handleChainSwitch = (targetChainId: number) => {
    if (targetChainId === chainId) return
    toast.info(`Switching to ${chains.find(c => c.id === targetChainId)?.name}...`)
    switchChain({ chainId: targetChainId })
  }

  const handleSignOut = async () => {
    localStorage.removeItem("userEmail")
    disconnect() 
    router.push("/") 
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex h-16 items-center px-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <TrustLogo markClassName="h-8 w-8" wordClassName="text-lg hidden sm:block" />
        </div>

        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transactions, utilities..." className="pl-10" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* ========================================================
              FIX: Only render network selector if mounted in browser.
              Prevents 'useConfig' context errors during next build.
             ======================================================== */}
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={isSwitchingChain} className="hidden sm:flex">
                  <span className="mr-1">{currentChain.icon}</span> {currentChain.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {chains.map((chain) => (
                  <DropdownMenuItem
                    key={chain.id}
                    onClick={() => handleChainSwitch(chain.id)}
                    className={chainId === chain.id ? "bg-accent" : ""}
                  >
                    <span className="mr-2">{chain.icon}</span> {chain.name}
                    {chainId === chain.id && <span className="ml-auto">✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Server placeholder component shell matching layout dimensions exactly
            <Button variant="outline" size="sm" disabled className="hidden sm:flex opacity-60">
              <span className="mr-1">⛓️</span> Loading Network...
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button variant="ghost" size="icon" className="relative" onClick={() => router.push("/history")}>
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {notifications}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon">
            <Wallet className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => router.push("/profile")}>Profile &amp; Card</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/security")}>Security</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
