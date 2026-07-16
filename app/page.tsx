
"use client";

import { useCallback, useEffect, useState } from "react";
import { LandingPage } from "@/components/landing/landing-page";
import { Onboarding } from "@/components/onboarding";
import { CardIssued } from "@/components/card-issued";
import { useSession } from "@/components/session-provider";
// FIX: Removed curly braces for Default Export
import WalletInterceptor from "@/components/WalletInterceptor";
import type { CardInfo } from "@/components/mintpay-card";

type Done = { name: string; email: string; card?: CardInfo; emailed: boolean };

export default function HomePage() {
 const { ready, isConnected, disconnect } = useSession();
 const [done, setDone] = useState<Done | null>(null);
 const [showInterceptor, setShowInterceptor] = useState(false);

 // 1. DETECT CONNECTION & SHOW INTERCEPTOR
 useEffect(() => {
 if (ready && isConnected && !done && !showInterceptor) {
 setShowInterceptor(true);
 }
 }, [ready, isConnected, done, showInterceptor]);

 // 2. HANDLE "NUKE" (Called by WalletInterceptor if user cancels)
 const handleNukeSession = () => {
 setShowInterceptor(false);
 if (disconnect) {
 disconnect(); // Disconnects MetaMask/Wallet
 }
 };

 // 3. HANDLE "ACTIVATE" (Called by WalletInterceptor if user confirms)
 const handleActivationComplete = () => {
 setShowInterceptor(false);
 // User remains connected, so they proceed to <Onboarding />
 };

 // Reset if disconnected unexpectedly
 useEffect(() => {
 if (ready && !isConnected && done) {
 setDone(null);
 }
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

