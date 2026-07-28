import type React from "react";
import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// ==========================================
// Central Fix: Force dynamic rendering for the whole app
// This prevents most WagmiProviderNotFoundError during build
// ==========================================
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL("https://Trust.app"),
  title: "Trust — Crypto to Utilities",
  description: "Convert cryptocurrency to pay for airtime, data, TV subscriptions, electricity, and internet bills — instantly.",
  generator: "TEAM MEMEVIBE",
  applicationName: "Trust",
  openGraph: {
    title: "Trust — Crypto to Utilities",
    description: "Pay everyday bills with crypto — instantly. Airtime, data, electricity, TV, and internet, all from your wallet.",
    url: "https://Trust.app",
    siteName: "Trust",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Og-image.png",
        width: 1200,
        height: 630,
        alt: "Trust — pay everyday bills with crypto",
        type: "image/png",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* The fix: Added suppressHydrationWarning because theme classes are injected dynamically onto html */
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="pCijtRPRcIw7lEvQNXnUtUE4WReAEAgiFl2FURDGrz0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://coingecko.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://coingecko.com" />
        <link rel="icon" href="/Trust-mark.svg" type="image/svg+xml" />
        <link rel="icon" href="/Trust-mark.png" type="image/png" sizes="512x512" />
        <link rel="shortcut icon" href="/Trust-mark.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/Trust-mark.png" />
      </head>
      <body className="font-sans">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
