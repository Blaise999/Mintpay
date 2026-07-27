// components/onboarding.tsx
"use client"

import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { useSession } from "./session-provider"
import { toast } from "sonner"
import type { CardInfo } from "@/components/mintpay-card"

export interface OnboardingData {
  name: string
  email: string
  card?: CardInfo
  emailed: boolean
  firstName: string
  lastName: string
  phone: string
  zipCode: string
  country: string
}

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const { data: session, address } = useSession()
  
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form States
  const [firstName, setFirstName] = useState(session?.user?.name?.split(" ")[0] || "")
  const [lastName, setLastName] = useState(session?.user?.name?.split(" ")[1] || "")
  const [email, setEmail] = useState(session?.user?.email || "")
  const [phone, setPhone] = useState(session?.user?.phone || "")
  const [zipCode, setZipCode] = useState("")
  const [country, setCountry] = useState("United States")

  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim()

  // Navigation
  const nextStep = () => {
    if (step < 4) setStep(s => s + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(s => s - 1)
  }

  // Final Submit - Card Minting (Wallet is now OPTIONAL)
  const handleSubmit = async () => {
    if (!fullName || !email || !phone || !zipCode) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const payload: any = {
        name: fullName,
        phone: phone.trim(),
        country: country.trim(),
        email: email.trim(),
      }

      // Only add walletAddress if it exists
      if (address) {
        payload.walletAddress = address
      }

      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const responseData = await res.json()

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to create your card")
      }

      const result: OnboardingData = {
        name: fullName,
        email: email.trim(),
        card: responseData.card,
        emailed: Boolean(responseData.emailed),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        zipCode: zipCode.trim(),
        country: country.trim(),
      }

      toast.success("Your MintPay card has been successfully created!")

      onComplete(result)

    } catch (error: any) {
      console.error(error)
      toast.error(error?.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Step Components (unchanged)
  const Step1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
      <h2 className="text-2xl font-bold text-white">Personal Details</h2>
      <p className="text-slate-400 text-sm">Let's start with your name.</p>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-colors"
            placeholder="John"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-colors"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={nextStep}
          disabled={!firstName.trim() || !lastName.trim()}
          className={`w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            (!firstName.trim() || !lastName.trim()) 
              ? "bg-slate-800 text-slate-500" 
              : "bg-white text-slate-950 hover:bg-slate-200"
          }`}
        >
          Next <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )

  const Step2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
      <h2 className="text-2xl font-bold text-white">Contact Info</h2>
      <p className="text-slate-400 text-sm">How can we reach you?</p>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-colors"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-colors"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <button
          onClick={prevStep}
          className="flex-1 py-4 rounded-full font-bold text-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={!email.trim() || !phone.trim()}
          className={`flex-1 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            (!email.trim() || !phone.trim()) 
              ? "bg-slate-800 text-slate-500" 
              : "bg-white text-slate-950 hover:bg-slate-200"
          }`}
        >
          Next <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )

  const Step3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
      <h2 className="text-2xl font-bold text-white">Address</h2>
      <p className="text-slate-400 text-sm">Where should we send your card?</p>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">Zip Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-colors"
            placeholder="10001"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-colors appearance-none"
          >
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Germany</option>
            <option>France</option>
            <option>Nigeria</option>
          </select>
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <button
          onClick={prevStep}
          className="flex-1 py-4 rounded-full font-bold text-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={!zipCode.trim()}
          className={`flex-1 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            (!zipCode.trim()) 
              ? "bg-slate-800 text-slate-500" 
              : "bg-white text-slate-950 hover:bg-slate-200"
          }`}
        >
          Next <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )

  const Step4 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
      <h2 className="text-2xl font-bold text-white">Finalize</h2>
      <p className="text-slate-400 text-sm">Review your details before creating your card.</p>
      
      <div className="bg-slate-900 rounded-2xl p-6 space-y-4 border border-slate-800">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-slate-400 text-sm">Name</span>
          <span className="text-white font-medium">{fullName}</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-slate-400 text-sm">Email</span>
          <span className="text-white font-medium">{email}</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-slate-400 text-sm">Phone</span>
          <span className="text-white font-medium">{phone}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Location</span>
          <span className="text-white font-medium">{zipCode}, {country}</span>
        </div>
        {address && (
          <div className="flex justify-between items-center pt-3 border-t border-slate-800">
            <span className="text-slate-400 text-sm">Wallet</span>
            <span className="text-white font-medium text-xs break-all">{address}</span>
          </div>
        )}
      </div>

      <div className="pt-4">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-4 rounded-full font-bold text-lg bg-[#0015FF] text-white hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Minting your card...</span>
            </>
          ) : (
            "Create My MintPay Card"
          )}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= s ? "bg-white" : "bg-slate-800"}`}
            />
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </div>
    </div>
  )
}