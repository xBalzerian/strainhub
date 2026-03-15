"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type PaywallType = "signup" | "upgrade" | "diagnose_signup" | "chat_upgrade";

interface PaywallModalProps {
  type: PaywallType;
  onClose?: () => void;
}

const FEATURES = {
  free: [
    "✅ 10 strain views / day",
    "✅ 10 Learn pages / day",
    "✅ 5 AI chats / day",
    "✅ 1 plant diagnosis / day",
    "✅ Save favorites",
    "✅ Submit grow photos",
  ],
  pro: [
    "🔥 Unlimited strain views",
    "🔥 Unlimited Learn pages",
    "🔥 Unlimited AI chats",
    "🔥 Unlimited plant diagnoses",
    "🔥 Full cannabinoid data",
    "🔥 Breeding tool",
    "🔥 Grow journal",
    "🔥 Ad-free experience",
    "🔥 Early access to new features",
  ],
};

export default function PaywallModal({ type, onClose }: PaywallModalProps) {
  const { signInWithGoogle, signUpWithEmail, signInWithEmail, user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"options" | "email_signup" | "email_login">("options");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isUpgrade = type === "upgrade" || type === "chat_upgrade";
  const isDiagnoseSignup = type === "diagnose_signup";

  const headlines: Record<PaywallType, { title: string; sub: string }> = {
    signup: { title: "You've hit today's limit", sub: "Sign up free to get 10 strain views, 10 Learn pages, 5 AI chats, and 1 plant diagnosis every day." },
    upgrade: { title: "Upgrade to Pro", sub: "Unlimited everything — strains, AI chats, plant diagnoses, and more." },
    diagnose_signup: { title: "Sign up to diagnose your plant", sub: "Create a free account to use AI plant diagnosis — 1 free diagnosis per day included." },
    chat_upgrade: { title: "You've used your 5 free chats today", sub: "Upgrade to Pro for unlimited AI cannabis consultations." },
  };

  const handleGoogle = async () => {
    setLoading(true);
    if (isUpgrade) { router.push("/pro"); return; }
    await signInWithGoogle();
    onClose?.();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    if (mode === "email_signup") {
      const { error } = await signUpWithEmail(email, password, name);
      if (error) { setError(error.message); setLoading(false); return; }
      setSuccess(true);
    } else {
      const { error } = await signInWithEmail(email, password);
      if (error) { setError("Invalid email or password"); setLoading(false); return; }
      onClose?.();
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl border-2 border-black p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✉️</div>
          <h2 className="text-2xl font-black text-black mb-2">Check your email</h2>
          <p className="text-gray-500">We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
          <button onClick={onClose} className="mt-6 px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all">Got it</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div className="bg-white rounded-2xl border-2 border-black max-w-lg w-full overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="bg-[#AAFF00] border-b-2 border-black p-6 relative">
          {onClose && (
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-black font-black text-lg transition-all">×</button>
          )}
          <div className="text-4xl mb-2">{isUpgrade ? "⚡" : isDiagnoseSignup ? "🔬" : "🌿"}</div>
          <h2 className="text-2xl font-black text-black">{headlines[type].title}</h2>
          <p className="text-sm text-black/70 mt-1 leading-relaxed">{headlines[type].sub}</p>
        </div>

        <div className="p-6">
          {isUpgrade ? (
            /* Upgrade flow */
            <div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="font-black text-sm text-gray-500 mb-2">Free</div>
                  <ul className="space-y-1.5">
                    {FEATURES.free.map(f => <li key={f} className="text-xs text-gray-600">{f}</li>)}
                  </ul>
                </div>
                <div className="bg-[#AAFF00]/10 border-2 border-[#AAFF00] rounded-xl p-4">
                  <div className="font-black text-sm text-black mb-2">Pro ⚡</div>
                  <ul className="space-y-1.5">
                    {FEATURES.pro.map(f => <li key={f} className="text-xs text-black font-semibold">{f}</li>)}
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                <button onClick={() => router.push("/pro")} className="w-full py-3.5 bg-[#AAFF00] border-2 border-black text-black font-black rounded-xl hover:shadow-[4px_4px_0px_#000] transition-all text-base">
                  ⚡ Upgrade to Pro — $2.99/mo
                </button>
                <button onClick={() => router.push("/pro")} className="w-full py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:border-black transition-all text-sm">
                  $9.99/year (save 72%) →
                </button>
                {onClose && <button onClick={onClose} className="w-full py-2 text-gray-400 text-sm hover:text-gray-600 transition-all">Maybe later</button>}
              </div>
            </div>
          ) : mode === "options" ? (
            /* Signup/Login options */
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <div className="font-black text-xs text-gray-500 mb-2">Free Account</div>
                  {FEATURES.free.slice(0, 4).map(f => <div key={f} className="text-xs text-gray-600">{f}</div>)}
                </div>
                <div className="bg-[#AAFF00]/10 border border-[#AAFF00] rounded-xl p-3">
                  <div className="font-black text-xs text-black mb-2">Pro ⚡ $2.99/mo</div>
                  {FEATURES.pro.slice(0, 4).map(f => <div key={f} className="text-xs font-semibold text-black">{f}</div>)}
                </div>
              </div>

              <button onClick={handleGoogle} disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-gray-200 rounded-xl font-bold text-sm hover:border-black transition-all bg-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>

              <button onClick={() => setMode("email_signup")}
                className="w-full py-3.5 bg-black text-white font-black rounded-xl hover:bg-gray-800 transition-all text-sm">
                Sign up with Email — Free
              </button>

              <div className="text-center text-xs text-gray-400 pt-1">
                Already have an account?{" "}
                <button onClick={() => setMode("email_login")} className="text-black font-bold underline">Log in</button>
              </div>

              {!isDiagnoseSignup && (
                <div className="border-t border-gray-100 pt-3">
                  <button onClick={() => router.push("/pro")} className="w-full py-2.5 bg-[#AAFF00] border-2 border-black text-black font-black rounded-xl hover:shadow-[3px_3px_0px_#000] transition-all text-sm">
                    ⚡ Go Pro — Unlimited Everything
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Email form */
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <button type="button" onClick={() => setMode("options")} className="text-sm text-gray-400 hover:text-black flex items-center gap-1 mb-2">← Back</button>
              <h3 className="font-black text-lg text-black">{mode === "email_signup" ? "Create free account" : "Welcome back"}</h3>
              {mode === "email_signup" && (
                <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black outline-none" />
              )}
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black outline-none" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black outline-none" />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-black text-white font-black rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 text-sm">
                {loading ? "..." : mode === "email_signup" ? "Create Free Account" : "Log In"}
              </button>
              <div className="text-center text-xs text-gray-400">
                {mode === "email_signup" ? "Already have an account? " : "No account? "}
                <button type="button" onClick={() => setMode(mode === "email_signup" ? "email_login" : "email_signup")} className="text-black font-bold underline">
                  {mode === "email_signup" ? "Log in" : "Sign up free"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
