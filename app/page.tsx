"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LandingPage } from "@/components/landing/landing-page";
import { useSession } from "@/components/session-provider";

export default function HomePage() {
  const { ready, isConnected } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (ready && isConnected) router.replace("/dashboard");
  }, [ready, isConnected, router]);

  return <LandingPage />;
}
