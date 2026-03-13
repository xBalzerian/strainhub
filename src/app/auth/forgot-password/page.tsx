"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/context/AuthContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F0] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-lime border-2 border-black rounded-lg flex items-center justify-center font-black text-sm">S</div>
            <span className="font-black text-xl">StrainHub</span>
          </Link>
          <h1 className="text-2xl font-black">Reset your password</h1>
          <p className="text-gray-400 text-sm mt-1">We&apos;ll email you a reset link</p>
        </div>

        {sent ? (
          <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-8 text-center">
            <div className="text-4xl mb-3">📬</div>
            <div className="font-black text-lg mb-2">Check your email</div>
            <p className="text-gray-500 text-sm mb-6">
              We sent a password reset link to <strong>{email}</strong>. Check your inbox (and spam folder).
            </p>
            <Link href="/login" className="block py-3 bg-lime border-2 border-black rounded-xl font-black text-sm text-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border-2 border-black rounded-3xl shadow-brutal p-8 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-black outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-lime border-2 border-black rounded-xl font-black shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send Reset Link 🌿"}
            </button>
            <Link href="/login" className="block text-center text-sm text-gray-400 hover:text-brand transition-colors pt-1">
              ← Back to Sign In
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
