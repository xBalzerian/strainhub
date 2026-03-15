"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


const MONTHLY_PLAN_ID = process.env.NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID || "";
const ANNUAL_PLAN_ID = process.env.NEXT_PUBLIC_PAYPAL_ANNUAL_PLAN_ID || "";
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

const FEATURES = [
  { icon: "♾️", label: "Unlimited strain views",       free: "10/day",      pro: "Unlimited" },
  { icon: "💬", label: "Unlimited AI chats",            free: "5/day",       pro: "Unlimited" },
  { icon: "🔬", label: "Plant photo diagnosis",         free: "1/day",       pro: "Unlimited" },
  { icon: "📚", label: "Unlimited Learn Hub pages",     free: "10/day",      pro: "Unlimited" },
  { icon: "🧬", label: "Full cannabinoid data",         free: "Hidden",      pro: "✅ CBG, CBN, THCV, CBC" },
  { icon: "🔱", label: "Strain breeding tool",          free: "—",           pro: "✅" },
  { icon: "📓", label: "Personal grow journal",         free: "—",           pro: "✅" },
  { icon: "🚫", label: "Ad-free experience",            free: "—",           pro: "✅" },
  { icon: "⚡", label: "Early access to new features",  free: "—",           pro: "✅" },
  { icon: "🏆", label: "Pro badge on your profile",     free: "—",           pro: "✅" },
];

export default function ProPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const buttonRendered = useRef(false);
  const { user, isPro, profile, refreshProfile } = useAuth();
  const router = useRouter();

  // Load PayPal SDK
  useEffect(() => {
    if (!PAYPAL_CLIENT_ID) return;
    if (window.paypal) { setPaypalLoaded(true); return; }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    script.setAttribute("data-sdk-integration-source", "button-factory");
    script.onload = () => setPaypalLoaded(true);
    script.onerror = () => setError("Failed to load PayPal. Please refresh.");
    document.body.appendChild(script);
  }, []);

  // Render PayPal button whenever billing or load state changes
  useEffect(() => {
    if (!paypalLoaded || !PAYPAL_CLIENT_ID || !user) return;
    const container = document.getElementById("paypal-button-container");
    if (!container) return;
    container.innerHTML = "";
    buttonRendered.current = false;

    try {
      window.paypal!.Buttons({
        style: { shape: "pill", color: "gold", layout: "vertical", label: "subscribe" },
        createSubscription: (_data: unknown, actions: { subscription: { create: (arg: { plan_id: string }) => Promise<string> } }) => {
          return actions.subscription.create({
            plan_id: billing === "annual" ? ANNUAL_PLAN_ID : MONTHLY_PLAN_ID,
          });
        },
        onApprove: async (data: { subscriptionID: string }) => {
          setLoading(true);
          setError("");
          try {
            // Save to Supabase via API route
            const res = await fetch("/api/subscription/activate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                subscriptionId: data.subscriptionID,
                plan: billing,
                userId: user.id,
              }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Activation failed");
            // Refresh auth context so isPro flips immediately
            await refreshProfile();
            setSuccess(true);
          } catch (err) {
            setError("Payment received but activation failed. Contact support with your PayPal transaction ID.");
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        onError: (err: unknown) => {
          console.error("PayPal error:", err);
          setError("Payment failed. Please try again or use a different payment method.");
        },
        onCancel: () => {
          setError("");
        },
      }).render("#paypal-button-container");
      buttonRendered.current = true;
    } catch (e) {
      console.error("PayPal render error:", e);
    }
  }, [paypalLoaded, billing, user, refreshProfile]);

  // Already Pro — show success state
  if (success || isPro) {
    return (
      <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center px-4">
        <div className="bg-white border-2 border-black rounded-3xl p-10 max-w-md w-full text-center shadow-[6px_6px_0px_#AAFF00]">
          <div className="text-6xl mb-4">⚡</div>
          <h1 className="text-3xl font-black text-black mb-2">You&apos;re Pro!</h1>
          <p className="text-gray-500 font-medium mb-2">
            Welcome to StrainHub Pro {profile?.plan === "annual" ? "(Annual)" : "(Monthly)"}.
          </p>
          <p className="text-sm text-gray-400 mb-8">All limits removed. Enjoy unlimited access.</p>
          <div className="flex flex-col gap-3">
            <Link href="/strains" className="w-full py-3.5 bg-[#AAFF00] border-2 border-black rounded-xl font-black text-center hover:shadow-[4px_4px_0px_#000] transition-all">
              🌿 Browse Strains — Unlimited
            </Link>
            <Link href="/chat" className="w-full py-3.5 bg-white border-2 border-black rounded-xl font-black text-center hover:bg-gray-50 transition-all">
              💬 Open AI Chat
            </Link>
            <Link href="/diagnose" className="w-full py-3 text-gray-500 font-medium text-center hover:text-black transition-all">
              🔬 Diagnose a Plant →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6]">

      {/* Hero */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-[#AAFF00] border border-black rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest mb-5">
            ⚡ StrainHub Pro
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black mb-4">
            Unlock Everything
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Unlimited strains, AI chats, plant diagnoses, and full cannabinoid data.
            Starting at <strong className="text-black">$0.83/month</strong>.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">

        {/* Billing toggle */}
        <div className="flex justify-center">
          <div className="bg-white border-2 border-black rounded-2xl p-1 flex gap-1">
            <button onClick={() => setBilling("monthly")}
              className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all ${billing === "monthly" ? "bg-[#AAFF00] border-2 border-black" : "text-gray-400 hover:text-black"}`}>
              Monthly — $2.99
            </button>
            <button onClick={() => setBilling("annual")}
              className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all relative ${billing === "annual" ? "bg-[#AAFF00] border-2 border-black" : "text-gray-400 hover:text-black"}`}>
              Annual — $9.99
              <span className="absolute -top-3 -right-2 bg-black text-[#AAFF00] text-[10px] font-black px-2 py-0.5 rounded-full">SAVE 72%</span>
            </button>
          </div>
        </div>

        {/* Main card */}
        <div className="grid md:grid-cols-2 gap-6 items-start">

          {/* Feature list */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
            <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">What you unlock</div>
            <div className="space-y-4">
              {FEATURES.map(f => (
                <div key={f.label} className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <div className="text-sm font-black text-black">{f.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      <span className="line-through text-gray-300">{f.free}</span>
                      {f.free !== "—" && " → "}
                      <span className="text-green-600 font-bold">{f.pro}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment card */}
          <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-[6px_6px_0px_#AAFF00] sticky top-6">
            <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">StrainHub Pro</div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-black text-black">{billing === "annual" ? "$9.99" : "$2.99"}</span>
              <span className="text-gray-400 pb-1">{billing === "annual" ? "/year" : "/month"}</span>
            </div>
            {billing === "annual" ? (
              <div className="text-sm text-gray-400 mb-1">
                That&apos;s <strong className="text-black">$0.83/month</strong> — billed once per year
              </div>
            ) : (
              <div className="text-sm text-gray-400 mb-1">Billed monthly · cancel anytime</div>
            )}
            <div className="inline-flex items-center gap-1.5 bg-[#AAFF00]/20 border border-[#AAFF00] rounded-full px-3 py-1 text-xs font-bold text-black mt-2 mb-6">
              ✅ Cancel anytime via PayPal
            </div>

            {/* Not logged in warning */}
            {!user ? (
              <div className="space-y-3">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 font-semibold text-center">
                  You need to be signed in to subscribe
                </div>
                <Link href="/auth/login?next=/pro" className="flex items-center justify-center w-full py-3.5 bg-black text-white font-black rounded-xl hover:bg-gray-800 transition-all">
                  Sign In to Continue →
                </Link>
                <Link href="/auth/signup?next=/pro" className="flex items-center justify-center w-full py-3 border-2 border-black rounded-xl font-black text-sm hover:bg-gray-50 transition-all">
                  Create Free Account First
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700 font-semibold">{error}</div>
                )}
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 font-bold text-sm">Activating your Pro account...</span>
                  </div>
                ) : (
                  <div id="paypal-button-container" className="min-h-[50px]">
                    {!paypalLoaded && (
                      <div className="flex items-center justify-center py-6 text-sm text-gray-400">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2" />
                        Loading payment...
                      </div>
                    )}
                  </div>
                )}
                <p className="text-center text-xs text-gray-400">
                  🔒 Secure payment via PayPal · You&apos;re subscribing as <strong>{user.email}</strong>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-black mb-6 text-center">Questions</h2>
          <div className="space-y-2">
            {[
              { q: "How do I cancel?", a: "Log in to your PayPal account → Payments → Manage automatic payments → StrainHub → Cancel. Your Pro access continues until the end of the billing period." },
              { q: "What happens to my data if I cancel?", a: "Everything stays. Your saved strains, grow journal, and photos are yours. You just return to the free tier limits." },
              { q: "Is there a free trial?", a: "No free trial, but the free plan gives you a solid feel for the platform. Pro is cancel-anytime with no commitment." },
              { q: "My payment went through but I'm not Pro?", a: "Refresh the page. If it still shows free, email support@strainhub.org with your PayPal transaction ID and we'll activate you manually within 1 hour." },
            ].map((item, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl group overflow-hidden">
                <summary className="px-5 py-4 font-bold text-sm cursor-pointer hover:bg-gray-50 flex items-center justify-between list-none">
                  {item.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform ml-3">▼</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{item.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="bg-black text-white rounded-2xl p-8 text-center max-w-xl mx-auto">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="text-xl font-black mb-2">No Risk</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Cancel anytime through PayPal. No hidden fees, no lock-in. If something goes wrong with your payment, email us and we&apos;ll fix it same day.</p>
        </div>

      </div>
    </div>
  );
}
