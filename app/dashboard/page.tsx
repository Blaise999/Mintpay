"use client";

import { Dashboard } from "@/components/dashboard/dashboard";
import { AppGate } from "@/components/AppGate";

export default function DashboardPage() {
  return (
    <AppGate>
      <Dashboard />
    </AppGate>
  );
}
