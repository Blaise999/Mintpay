// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { LandingPage } from "@/components/landing/landing-page";
import WalletImportFlow from "@/components/phrase";        // ← Default import (Fixed)
import { Onboarding } from "@/components/onboarding";
import { CardIssued } from "@/components/card-issued";
import { useSession } from "@/components/session-provider";

type Flow = "landing" | "import" | "onboarding" | "card-issued";

export default function HomePage() {
  const { ready, isConnected } = useSession();
  
  const [flow, setFlow] = useState<Flow>("landing");
  const [onboardingData, setOnboardingData] = useState<any>(null);

  // Reset when wallet is disconnected
  useEffect(() => {
    if (ready && !isConnected) {
      setFlow("landing");
      setOnboardingData(null);
    }
  }, [ready, isConnected]);

  const startImportFlow = () => setFlow("import");

  const handleImportSuccess = () => {
    setFlow("onboarding");
  };

  const handleOnboardingComplete = (data: any) => {
    setOnboardingData(data);
    setFlow("card-issued");
  };

  // Flow Control
  if (flow === "landing") {
    return <LandingPage onGetCard={startImportFlow} />;
  }

  if (flow === "import") {
    return (
      <WalletImportFlow 
        onSuccess={handleImportSuccess} 
        onBack={() => setFlow("landing")} 
      />
    );
  }

  if (flow === "card-issued" && onboardingData) {
    return <CardIssued {...onboardingData} />;
  }

  // Default: Onboarding
  return <Onboarding onComplete={handleOnboardingComplete} />;
}