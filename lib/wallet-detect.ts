import type { Connector } from "wagmi"

/**
 * Finds the wallet the user is ACTUALLY running, instead of asking them.
 *
 * The problem this solves: wagmi's connector list is not a detection result.
 * `coinbaseWallet` and `walletConnect` register themselves unconditionally —
 * they show up on a machine with no wallet at all. Only EIP-6963 connectors
 * (and a live injected provider) mean a wallet is really installed.
 *
 * Ranking, best first:
 *   1. the connector they used last time      (wagmi persists this)
 *   2. the wallet that owns `window.ethereum` (their browser's default pick)
 *   3. any EIP-6963 announced wallet          (installed, just not the default)
 *   4. Coinbase — only if the extension is genuinely present
 *   5. WalletConnect                          (nothing local; deep-link / QR)
 */

const STORAGE_KEY = "Trust.wagmi.recentConnectorId"

type Ranked = { connector: Connector; score: number; why: string }

function isMobile(): boolean {
  return typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
}

/** Did this connector announce itself over EIP-6963? Those are real installs. */
function isAnnounced(c: Connector): boolean {
  return Boolean((c as any).rdns) || c.type === "injected"
}

function recentConnectorId(): string | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string) : null
  } catch {
    return null
  }
}

/** A provider we can actually talk to right now. */
async function liveProvider(c: Connector): Promise<any | null> {
  try {
    const p = await c.getProvider()
    return p ?? null
  } catch {
    return null
  }
}

function coinbaseExtensionPresent(): boolean {
  if (typeof window === "undefined") return false
  const eth = (window as any).ethereum
  return Boolean(
    (window as any).coinbaseWalletExtension ||
      eth?.isCoinbaseWallet ||
      eth?.providers?.some?.((p: any) => p?.isCoinbaseWallet),
  )
}

export async function rankConnectors(connectors: readonly Connector[]): Promise<Ranked[]> {
  const recent = recentConnectorId()
  const defaultProvider = typeof window !== "undefined" ? (window as any).ethereum : undefined
  const mobile = isMobile()

  const ranked = await Promise.all(
    connectors.map(async (c): Promise<Ranked> => {
      // 1. they've connected with this one before — highest confidence
      if (recent && (c.id === recent || c.uid === recent)) {
        const p = await liveProvider(c)
        if (p || c.id === "walletConnect") return { connector: c, score: 100, why: "used last time" }
      }

      if (c.id === "walletConnect") {
        // only wins when nothing local exists; on mobile it's the deep-link path
        return { connector: c, score: mobile ? 20 : 10, why: mobile ? "mobile deep-link" : "QR fallback" }
      }

      if (c.id === "coinbaseWalletSDK" || c.id === "coinbaseWallet") {
        return coinbaseExtensionPresent()
          ? { connector: c, score: 60, why: "Coinbase extension installed" }
          : { connector: c, score: 5, why: "Coinbase SDK (not installed)" }
      }

      const provider = await liveProvider(c)
      if (!provider) return { connector: c, score: 0, why: "no provider" }

      // 2. this connector IS window.ethereum — the wallet the browser hands to every dapp
      if (defaultProvider && provider === defaultProvider) {
        return { connector: c, score: 90, why: "browser default wallet" }
      }
      // multi-wallet: window.ethereum.providers[] contains the default too
      if (defaultProvider?.providers?.includes?.(provider)) {
        return { connector: c, score: 80, why: "installed (multi-provider)" }
      }

      // 3. announced over EIP-6963 = installed extension
      if (isAnnounced(c)) {
        return { connector: c, score: mobile ? 95 : 70, why: mobile ? "in-wallet browser" : "installed extension" }
      }

      return { connector: c, score: 30, why: "provider present" }
    }),
  )

  return ranked.sort((a, b) => b.score - a.score)
}

/** The one to open. Never null — worst case it's WalletConnect. */
export async function findWallet(connectors: readonly Connector[]): Promise<Ranked | null> {
  const ranked = await rankConnectors(connectors)
  return ranked[0] ?? null
}

/** Everything genuinely installed on this machine (for the "different wallet?" escape hatch). */
export async function findAllRealWallets(connectors: readonly Connector[]): Promise<Ranked[]> {
  const ranked = await rankConnectors(connectors)
  return ranked.filter((r) => r.score >= 20)
}
