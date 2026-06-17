import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setError("");
    try {
      if (!auth || !googleProvider) {
        throw new Error("Firebase authentication is not configured on this device.");
      }
      await signInWithPopup(auth, googleProvider);
      // useCloudSync handles the state update on success
    } catch (err: any) {
      console.error("Login failed", err);
      setError("Authentication failed. Please try again.");
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-200">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center"
        >
          {/* Premium App Logo/Icon */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-[2px] shadow-[0_0_40px_rgba(99,102,241,0.4)]"
          >
            <div className="flex h-full w-full items-center justify-center rounded-[2rem] bg-slate-950">
              <svg className="h-12 w-12 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" className="opacity-30 stroke-indigo-400" />
                <path d="M12 6v6l4 2" className="stroke-cyan-300" />
              </svg>
            </div>
          </motion.div>

          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-indigo-200">
            FlowTrack Pro
          </h1>
          <p className="mb-10 text-slate-400">The Ultimate Master Study Tracker</p>

          {/* Features highlight */}
          <div className="mb-10 w-full space-y-4 text-left">
            <motion.div 
              initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 border border-white/[0.05] backdrop-blur-md"
            >
              <div className="rounded-full bg-cyan-500/20 p-2 text-cyan-400">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Deep Work Focus</h3>
                <p className="text-xs text-slate-400">Scientifically designed timer</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 border border-white/[0.05] backdrop-blur-md"
            >
              <div className="rounded-full bg-purple-500/20 p-2 text-purple-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Gamified Growth</h3>
                <p className="text-xs text-slate-400">Earn XP and unlock achievements</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 border border-white/[0.05] backdrop-blur-md"
            >
              <div className="rounded-full bg-emerald-500/20 p-2 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Cloud Encrypted</h3>
                <p className="text-xs text-slate-400">Your data is safely synced to the cloud</p>
              </div>
            </motion.div>
          </div>

          {/* Action Button */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
            className="w-full"
          >
            {error && <p className="mb-4 text-sm text-rose-400">{error}</p>}
            
            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-8 py-4 font-bold text-white shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              {isLoggingIn ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Continue with Google</span>
                </>
              )}
            </button>
            <p className="mt-6 text-xs text-slate-500">
              By continuing, you gain access to all premium features.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
