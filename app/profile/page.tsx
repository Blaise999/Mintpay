"use client"

import { AppGate } from "@/components/AppGate"
import { Header } from "@/components/layout/header"
import { ProfileCard } from "@/components/dashboard/profile-card"

export default function ProfilePage() {
  return (
    <AppGate>
      <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
        <Header onMenuClick={() => {}} />
        <main className="container mx-auto px-4 py-10">
          <h1 className="mb-6 font-display text-3xl font-bold">Profile &amp; Card</h1>
          <ProfileCard />
        </main>
      </div>
    </AppGate>
  )
}
