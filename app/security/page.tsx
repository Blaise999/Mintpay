"use client"

import BackToDashboard from "@/components/BackToDashboard"
import { AppGate } from "@/components/AppGate"

export default function SecurityPage() {
  return (
       <AppGate>
    <div className="container py-10">
       <BackToDashboard /> {/* 👈 Add this at the top */}
      <h1 className="text-3xl font-bold mb-4">Security</h1>
      <p className="text-muted-foreground mb-8">
        Manage your security settings and connected wallets.
      </p>
      {/* Add your security settings or components here */}
      <div className="rounded-lg border p-6 bg-background">
        <p>Coming soon: Manage 2FA, wallet connections, and more.</p>
      </div>
    </div>
       </AppGate>
  )
}
