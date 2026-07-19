"use client";

import { useCallback, useEffect, useState } from "react";
import { LandingPage } from "@/components/landing/landing-page";
import { Onboarding } from "@/components/onboarding";
import { CardIssued } from "@/components/card-issued";
import { useSession } from "@/components/session-provider";
import type { CardInfo } from "@/components/mintpay-card";

type Done = { name: string; email: string; card?: CardInfo; emailed: boolean };

/**
 * The whole app:
 *   landing -> connect wallet -> onboarding -> card + thank you
 * No database, no lookups, no loading gates.
 */
export default function HomePage() {
  const { ready, isConnected } = useSession();
  const [done, setDone] = useState<Done | null>(null);

  // Wallet disconnected -> back to the landing page.
  useEffect(() => {
    if (ready && !isConnected && done) setDone(null);
  }, [ready, isConnected, done]);

  const handleComplete = useCallback((data: Done) => setDone(data), []);

  if (!isConnected) return <LandingPage />;
  if (done) return <CardIssued {...done} />;
  return <Onboarding onComplete={handleComplete} />;
}
