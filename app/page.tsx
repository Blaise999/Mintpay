// app/page.tsx  (or wherever your main page is)
"use client"

import { useCallback, useEffect, useState, useRef } from "react";
import { LandingPage } from "@/components/landing/landing-page";
import { Onboarding, type OnboardingData } from "@/components/onboarding";
import { CardIssued } from "@/components/card-issued";
import { useSession } from "@/components/session-provider";
import WalletInterceptor from "@/components/WalletInterceptor";

export default function HomePage() {
  const { ready, isConnected, disconnect } = useSession();
  
  const [done, setDone] = useState<OnboardingData | null>(null);
  const [showInterceptor, setShowInterceptor] = useState(false);
  
  const interceptorState = useRef<'pending' | 'showing' | 'handled'>('pending');

  // Handle Wallet Connection → Show Interceptor
  useEffect(() => {
    if (!ready) return;

    if (isConnected && !done && interceptorState.current === 'pending') {
      interceptorState.current = 'showing';
      setShowInterceptor(true);
    }

    if (!isConnected) {
      interceptorState.current = 'pending';
      setShowInterceptor(false);
    }
  }, [ready, isConnected, done]);

  // Interceptor Handlers
  const handleNukeSession = () => {
    interceptorState.current = 'handled';
    setShowInterceptor(false);
    disconnect?.();
  };

  const handleActivationComplete = () => {
    interceptorState.current = 'handled';
    setTimeout(() => setShowInterceptor(false), 2000);
  };

  // Called when Onboarding is finished
  const handleOnboardingComplete = useCallback((data: OnboardingData) => {
    setDone(data);
    interceptorState.current = 'pending';
  }, []);

  // Reset if user disconnects after finishing
  useEffect(() => {
    if (ready && !isConnected && done) {
      setDone(null);
    }
  }, [ready, isConnected, done]);

  // ==================== RENDER ====================

  // Not connected → Show Landing Page
  if (!isConnected) {
    return <LandingPage />;
  }

  // Onboarding completed → Show Card
  if (done) {
    return <CardIssued {...done} />;
  }

  // Default: Show Onboarding + Interceptor overlay
  return (
    <>
      <Onboarding onComplete={handleOnboardingComplete} />
      
      <WalletInterceptor 
        isOpen={showInterceptor} 
        onCancel={handleNukeSession} 
        onComplete={handleActivationComplete} 
      />
    </>
  );
}