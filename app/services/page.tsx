"use client"

import BackToDashboard from "@/components/BackToDashboard"
import { AppGate } from "@/components/AppGate"

export default function OtherServicesPage() {
  return (
    <AppGate>
      <div className="container py-10">
        <BackToDashboard /> {/* 👈 Add this at the top */}
        <h1 className="text-3xl font-bold mb-4">Other Services</h1>
        <p className="text-muted-foreground mb-8">
          More local and international services coming soon.
        </p>
        {/* Add your services content here */}
        <div className="rounded-lg border p-6 bg-background">
          <p>Coming soon: More local and international services will be available here.</p>
        </div>
      </div>
    </AppGate>
  )
}