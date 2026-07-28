"use client"

import { useState, useCallback } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { useSession } from "./session-provider"
import { toast } from "sonner"
import type { CardInfo } from "@/components/Trust-card"

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

/* Brand Constants */
const ink = "text-[#0B0D17]"
const muted = "text-[#6E7381]"

const pill = "rounded-full font-semibold transition-colors"
const pillBlue = `${pill} bg-[#0015FF] text-white hover:bg-[#0010CC]`
const pillGhost = `${pill} border border-[#E8EAF0] bg-white ${ink} hover:bg-[#F7F8FA]`

const cardBox = "rounded-2xl border border-[#E8EAF0] bg-white"

/* Shared input styles — pins text color + forces light control theme so iOS
   dark mode doesn't render text white-on-white */
const fieldClass =
  "w-full bg-white border border-[#E8EAF0] rounded-2xl p-4 text-[#0B0D17] placeholder:text-[#9AA0AE] focus:border-[#0015FF] outline-none transition-colors text-base"
const fieldStyle = { colorScheme: "light" as const }

/* Step Components */
const Step1 = ({
  firstName, setFirstName,
  lastName, setLastName,
  nextStep,
}: {
  firstName: string
  lastName: string
  setFirstName: (v: string) => void
  setLastName: (v: string) => void
  nextStep: () => void
}) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
    <h2 className={`text-2xl font-bold ${ink}`}>Personal Details</h2>
    <p className={`${muted} text-sm`}>Let's start with your name.</p>

    <div className="space-y-4">
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-[#6E7381] mb-2 block">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={fieldStyle}
          className={fieldClass}
          placeholder="John"
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-[#6E7381] mb-2 block">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={fieldStyle}
          className={fieldClass}
          placeholder="Doe"
        />
      </div>
    </div>

    <div className="pt-4">
      <button
        onClick={nextStep}
        disabled={!firstName.trim() || !lastName.trim()}
        className={`w-full py-4 ${pillBlue} text-lg flex items-center justify-center gap-2 disabled:bg-[#F1F3F7] disabled:text-[#9AA0AE] disabled:cursor-not-allowed`}
      >
        Next <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  </div>
)

const Step2 = ({
  email, setEmail,
  phone, setPhone,
  prevStep,
  nextStep,
}: {
  email: string
  phone: string
  setEmail: (v: string) => void
  setPhone: (v: string) => void
  prevStep: () => void
  nextStep: () => void
}) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
    <h2 className={`text-2xl font-bold ${ink}`}>Contact Info</h2>
    <p className={`${muted} text-sm`}>How can we reach you?</p>

    <div className="space-y-4">
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-[#6E7381] mb-2 block">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={fieldStyle}
          className={fieldClass}
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-[#6E7381] mb-2 block">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={fieldStyle}
          className={fieldClass}
          placeholder="+1 (555) 000-0000"
        />
      </div>
    </div>

    <div className="pt-4 flex gap-3">
      <button onClick={prevStep} className={`flex-1 py-4 rounded-full font-bold text-lg border border-[#E8EAF0] bg-white ${ink} hover:bg-[#F7F8FA]`}>
        Back
      </button>
      <button
        onClick={nextStep}
        disabled={!email.trim() || !phone.trim()}
        className={`flex-1 py-4 ${pillBlue} text-lg flex items-center justify-center gap-2 disabled:bg-[#F1F3F7] disabled:text-[#9AA0AE] disabled:cursor-not-allowed`}
      >
        Next <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  </div>
)

const Step3 = ({
  zipCode, setZipCode,
  country, setCountry,
  prevStep,
  nextStep,
}: {
  zipCode: string
  country: string
  setZipCode: (v: string) => void
  setCountry: (v: string) => void
  prevStep: () => void
  nextStep: () => void
}) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
    <h2 className={`text-2xl font-bold ${ink}`}>Address</h2>
    <p className={`${muted} text-sm`}>Where should we send your card?</p>

    <div className="space-y-4">
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-[#6E7381] mb-2 block">Zip / Postal Code</label>
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          style={fieldStyle}
          className={fieldClass}
          placeholder="10001"
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-[#6E7381] mb-2 block">Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={fieldStyle}
          className="w-full bg-white border border-[#E8EAF0] rounded-2xl p-4 text-[#0B0D17] focus:border-[#0015FF] outline-none transition-colors text-base appearance-none"
        >
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Australia">Australia</option>
          <option value="India">India</option>
          <option value="Brazil">Brazil</option>
          <option value="South Africa">South Africa</option>
          <option value="Kenya">Kenya</option>
          <option value="Ghana">Ghana</option>
          <option value="Mexico">Mexico</option>
          <option value="Japan">Japan</option>
          <option value="Spain">Spain</option>
          <option value="Italy">Italy</option>
        </select>
      </div>
    </div>

    <div className="pt-4 flex gap-3">
      <button onClick={prevStep} className={`flex-1 py-4 rounded-full font-bold text-lg border border-[#E8EAF0] bg-white ${ink} hover:bg-[#F7F8FA]`}>
        Back
      </button>
      <button
        onClick={nextStep}
        disabled={!zipCode.trim()}
        className={`flex-1 py-4 ${pillBlue} text-lg flex items-center justify-center gap-2 disabled:bg-[#F1F3F7] disabled:text-[#9AA0AE] disabled:cursor-not-allowed`}
      >
        Next <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  </div>
)

const Step4 = ({
  fullName,
  email,
  phone,
  zipCode,
  country,
  address,
  handleSubmit,
  isSubmitting,
}: {
  fullName: string
  email: string
  phone: string
  zipCode: string
  country: string
  address?: string
  handleSubmit: () => void
  isSubmitting: boolean
}) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
    <h2 className={`text-2xl font-bold ${ink}`}>Finalize</h2>
    <p className={`${muted} text-sm`}>Review your details before creating your card.</p>

    <div className={`${cardBox} p-6 space-y-4`}>
      <div className="flex justify-between items-center border-b border-[#E8EAF0] pb-3">
        <span className={`${muted} text-sm`}>Name</span>
        <span className={`font-medium ${ink}`}>{fullName}</span>
      </div>
      <div className="flex justify-between items-center border-b border-[#E8EAF0] pb-3">
        <span className={`${muted} text-sm`}>Email</span>
        <span className={`font-medium ${ink}`}>{email}</span>
      </div>
      <div className="flex justify-between items-center border-b border-[#E8EAF0] pb-3">
        <span className={`${muted} text-sm`}>Phone</span>
        <span className={`font-medium ${ink}`}>{phone}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className={`${muted} text-sm`}>Location</span>
        <span className={`font-medium ${ink}`}>{zipCode}, {country}</span>
      </div>
      {address && (
        <div className="flex justify-between items-center pt-3 border-t border-[#E8EAF0]">
          <span className={`${muted} text-sm`}>Wallet</span>
          <span className={`font-medium text-xs break-all ${ink}`}>{address}</span>
        </div>
      )}
    </div>

    <div className="pt-4">
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-4 ${pillBlue} text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Minting your card...
          </>
        ) : (
          "Create Card"
        )}
      </button>
    </div>
  </div>
)

export function Onboarding({ onComplete }: OnboardingProps) {
  const session = useSession() as any
  const address = session?.address

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [firstName, setFirstName] = useState(session?.name?.split(" ")[0] || "")
  const [lastName, setLastName] = useState(session?.name?.split(" ")[1] || "")
  const [email, setEmail] = useState(session?.email || "")
  const [phone, setPhone] = useState(session?.phone || "")
  const [zipCode, setZipCode] = useState("")
  const [country, setCountry] = useState("United States")

  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim()

  const nextStep = useCallback(() => {
    if (step < 4) setStep((s) => s + 1)
  }, [step])

  const prevStep = useCallback(() => {
    if (step > 1) setStep((s) => s - 1)
  }, [step])

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

      if (address) payload.walletAddress = address

      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const responseData = await res.json()

      if (!res.ok) throw new Error(responseData.error || "Failed to create your card")

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

      toast.success("Your Trust card has been successfully created!")
      onComplete(result)
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                step >= s ? "bg-[#0015FF]" : "bg-[#E8EAF0]"
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <Step1
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            nextStep={nextStep}
          />
        )}

        {step === 2 && (
          <Step2
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}

        {step === 3 && (
          <Step3
            zipCode={zipCode}
            setZipCode={setZipCode}
            country={country}
            setCountry={setCountry}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}

        {step === 4 && (
          <Step4
            fullName={fullName}
            email={email}
            phone={phone}
            zipCode={zipCode}
            country={country}
            address={address}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  )
}
