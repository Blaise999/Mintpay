"use client"

import { useEffect, useRef, useState } from "react"
import { useSession } from "@/components/session-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Camera, CreditCard, Loader2, Save } from "lucide-react"
import { TrustCard } from "./Trust-card"

type UserDoc = {
  walletAddress: string
  email?: string
  name?: string
  avatar?: string
  card?: { holder: string; number: string; expiry: string }
}

export function ProfileCard() {
  const { address, user } = useSession()
  const wallet = address

  const [doc, setDoc] = useState<UserDoc | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState<string | undefined>()
  const [saving, setSaving] = useState(false)
  const [issuing, setIssuing] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!wallet) return
    fetch(`/api/profile?wallet=${wallet}`)
      .then((r) => r.json())
      .then((d) => {
        const u: UserDoc | null = d.user
        setDoc(u)
        setName(u?.name || "")
        setEmail(u?.email || user?.email || "")
        setAvatar(u?.avatar)
      })
      .catch(() => {})
  }, [wallet, user])

  const onPickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 1.5 * 1024 * 1024) {
      toast.error("Please pick an image under 1.5 MB")
      return
    }
    const reader = new FileReader()
    reader.onload = () => setAvatar(reader.result as string)
    reader.readAsDataURL(file)
  }

  const save = async () => {
    if (!wallet) return
    setSaving(true)
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: wallet, name, email, avatar }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.error || "Save failed")
      setDoc(d.user)
      toast.success("Profile saved")
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setSaving(false)
    }
  }

  const issueCard = async () => {
    if (!wallet) return
    setIssuing(true)
    try {
      const res = await fetch("/api/card/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: wallet }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.error || "Could not issue card")
      setDoc((prev) => (prev ? { ...prev, card: d.card } : prev))
      toast.success(d.emailed ? "Card issued — check your email!" : "Card issued")
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setIssuing(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Profile editor */}
      <div className="rounded-2xl border bg-white p-6 dark:border-white/10 dark:bg-gray-950">
        <h3 className="font-display text-xl font-bold">Your profile</h3>
        <div className="mt-5 flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-blue-200 bg-slate-100 dark:border-white/10 dark:bg-white/5"
          >
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-blue-600">
                {(name || "M").charAt(0).toUpperCase()}
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-black/50 py-1">
              <Camera className="h-3.5 w-3.5 text-white" />
            </span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onPickAvatar} className="hidden" />
          <div className="text-sm text-muted-foreground">
            <p>Tap the avatar to upload a photo.</p>
            <p className="mt-1 font-mono text-xs">{wallet ? `${wallet.slice(0, 6)}…${wallet.slice(-4)}` : "—"}</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            <p className="mt-1 text-xs text-muted-foreground">Used for your connection notice and to email your card.</p>
          </div>
        </div>

        <Button onClick={save} disabled={saving} className="mt-5 w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save profile
        </Button>
      </div>

      {/* Card */}
      <div className="rounded-2xl border bg-white p-6 dark:border-white/10 dark:bg-gray-950">
        <h3 className="font-display text-xl font-bold">Your Trust card</h3>
        <div className="mt-5">
          <TrustCard holder={doc?.card?.holder || name.toUpperCase()} number={doc?.card?.number} expiry={doc?.card?.expiry} />
        </div>
        <Button onClick={issueCard} disabled={issuing} variant="outline" className="mt-5 w-full">
          {issuing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
          {doc?.card ? "Re-send card to email" : "Issue card & email it to me"}
        </Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">Add your name and email, then issue your card.</p>
      </div>
    </div>
  )
}
