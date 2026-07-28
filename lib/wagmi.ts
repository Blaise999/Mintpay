import { createConfig, http, createStorage } from "wagmi"
import { base, lisk, celo } from "wagmi/chains"
import { injected, coinbaseWallet, walletConnect } from "wagmi/connectors"

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID

const metadata = {
  name: "Trust",
  description: "Pay everyday bills with crypto",
  url: typeof window !== "undefined" ? window.location.origin : "https://www.Trust.app",
  icons: ["/Trust-mark.png"],
}

// Persist the last-used connector so returning users reconnect with no popup.
const storage = createStorage({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
  key: "Trust.wagmi",
})

export const wagmiConfig = createConfig({
  chains: [base, lisk, celo],
  connectors: [
    // shimDisconnect makes "disconnect" stick across reloads
    injected({ shimDisconnect: true }),
    // preference "all" = Coinbase Smart Wallet + extension, great on mobile
    coinbaseWallet({ appName: "Trust", preference: "all" }),
    // WalletConnect is the mobile path (deep-links to wallet apps). Needs a projectId.
    ...(wcProjectId ? [walletConnect({ projectId: wcProjectId, showQrModal: true, metadata })] : []),
  ],
  transports: {
    [base.id]: http(),
    [lisk.id]: http(),
    [celo.id]: http(),
  },
  storage,
  ssr: true,
  // EIP-6963 multi-wallet discovery on desktop
  multiInjectedProviderDiscovery: true,
})
