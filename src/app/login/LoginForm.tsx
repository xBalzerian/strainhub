"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const urlError = searchParams.get("error");

  useEffect(() => {
    if (user) router.push(redirect);
  }, [user, router, redirect]);

  useEffect(() => {
    if (urlError) {
      if (urlError === "auth_failed") setError("Google sign-in failed. Please try again.");
      else setError(decodeURIComponent(urlError));
    }
  }, [urlError]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (mode === "signup") {
      if (!name.trim()) { setError("Please enter your name."); setLoading(false); return; }
      if (password.length < 6) { setError("Password must be at least 6 characters."); setLoading(false); return; }
      const { error } = await signUpWithEmail(email, password, name);
      if (error) setError(error);
      else setSuccess("Check your email to confirm your account!");
    } else {
      const { error } = await signInWithEmail(email, password);
      if (error) setError(error);
      else router.push(redirect);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F8F8F0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-black tracking-tight text-brand">
            Strain<span className="bg-lime text-brand px-2 py-0.5 rounded-lg">Hub</span>
          </Link>
          <p className="text-gray-500 mt-2 font-medium">
            {mode === "signin" ? "Welcome back 🌿" : "Join the community 🌱"}
          </p>
        </div>

        <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-8">
          {/* Google */}
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-200 rounded-xl font-bold text-sm hover:border-black hover:bg-lime-pale transition-all mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-bold text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMode("signin"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === "signin" ? "bg-white border-2 border-black shadow-brutal-sm" : "text-gray-400"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === "signup" ? "bg-white border-2 border-black shadow-brutal-sm" : "text-gray-400"}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Name</label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black rounded-xl text-sm font-medium outline-none transition-all"
                  required
                />
              </div>
            )}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black rounded-xl text-sm font-medium outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Password</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "signup" ? "Min. 6 characters" : "Your password"}
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black rounded-xl text-sm font-medium outline-none transition-all"
                required
              />
            </div>

            {error && <div className="bg-red-50 border-2 border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 font-medium">{error}</div>}
            {success && <div className="bg-green-50 border-2 border-green-300 rounded-xl px-4 py-3 text-sm text-green-700 font-medium">✅ {success}</div>}

            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 bg-lime border-2 border-black rounded-xl font-black text-sm shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              {loading ? "..." : mode === "signin" ? "Sign In →" : "Create Account →"}
            </button>
          </form>

          {mode === "signin" && (
            <p className="text-center text-xs text-gray-400 mt-4">
              <Link href="/auth/forgot-password" className="underline hover:text-brand">Forgot password?</Link>
            </p>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline">Terms</Link> and{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
