"use client"

import { useCallback, useEffect, useState } from "react";
import { LandingPage } from "@/components/landing/landing-page";
import { Onboarding, type OnboardingData } from "@/components/onboarding";
import { CardIssued } from "@/components/card-issued";
import { useSession } from "@/components/session-provider";

/**
 * Updated for walletless flow:
 *   Landing -> Onboarding (wallet optional) -> Card Issued
 */
export default function HomePage() {
  const { ready, isConnected, address } = useSession();
  const [done, setDone] = useState<OnboardingData | null>(null);

  // Optional: Reset when wallet disconnects (if you still want this behavior)
  useEffect(() => {
    if (ready && !isConnected && done) {
      setDone(null);
    }
  }, [ready, isConnected, done]);

  const handleOnboardingComplete = useCallback((data: OnboardingData) => {
    console.log("Onboarding completed:", data);
    setDone(data);
  }, []);

  // Show Landing Page if not ready yet
  if (!ready) {
    return <LandingPage />;
  }

  // Card has been created → show success page
  if (done) {
    return <CardIssued {...done} />;
  }

  // Otherwise show Onboarding (wallet is now optional)
  return <Onboarding onComplete={handleOnboardingComplete} />;
}