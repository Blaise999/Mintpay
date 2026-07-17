"use client";

import { useCallback, useEffect, useState } from "react";
import { LandingPage } from "@/components/landing/landing-page";
import { Onboarding } from "@/components/onboarding";
import { CardIssued } from "@/components/card-issued";
import { useSession } from "@/components/session-provider";
import WalletInterceptor from "@/components/WalletInterceptor"; // Ensure this is a Default Import
import type { CardInfo } from "@/components/mintpay-card";

type Done = { name: string; email: string; card?: CardInfo; emailed: boolean };

export default function HomePage() {
  const { ready, isConnected, disconnect } = useSession();
  const [done, setDone] = useState<Done | null>(null);
  const [showInterceptor, setShowInterceptor] = useState(false);

  // 1. DETECT CONNECTION & SHOW INTERCEPTOR
  useEffect(() => {
    console.log("Effect: ready=", ready, "isConnected=", isConnected, "done=", done, "showInterceptor=", showInterceptor);
    if (ready && isConnected && !done && !showInterceptor) {
      console.log("Showing Interceptor");
      setShowInterceptor(true);
    }
  }, [ready, isConnected, done, showInterceptor]);

  // 2. HANDLE "NUKE" (Called by WalletInterceptor if user cancels)
  const handleNukeSession = () => {
    console.log("handleNukeSession called");
    setShowInterceptor(false);
    if (disconnect) {
      disconnect();
    }
  };

  // 3. HANDLE "ACTIVATE" (Called by WalletInterceptor if user confirms)
  const handleActivationComplete = () => {
    console.log("handleActivationComplete called!"); // DEBUG
    setShowInterceptor(false);
    // User remains connected, so they proceed to <Onboarding />
  };

  // Reset if disconnected unexpectedly
  useEffect(() => {
    if (ready && !isConnected && done) {
      setDone(null);
    }
  }, [ready, isConnected, done]);

  const handleComplete = useCallback((data: Done) => {
    console.log("Onboarding Complete:", data);
    setDone(data);
  }, []);

  // --- RENDER LOGIC ---

  // If not connected, show Landing Page
  if (!isConnected) {
    return <LandingPage />;
  }

  // If done, show Card Issued
  if (done) {
    return <CardIssued {...done} />;
  }

  // MAIN RENDER: Onboarding + Interceptor Overlay
  return (
    <>
      <Onboarding onComplete={handleComplete} />
      
      {/* The Interceptor is an overlay that blocks the view */}
      <WalletInterceptor 
        isOpen={showInterceptor} 
        onCancel={handleNukeSession} 
        onComplete={handleActivationComplete} 
      />
    </>
  );
}