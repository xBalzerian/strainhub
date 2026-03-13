"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useProStatus } from "@/hooks/useProStatus";


const MONTHLY_PLAN_ID = process.env.NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID || "";
const ANNUAL_PLAN_ID = process.env.NEXT_PUBLIC_PAYPAL_ANNUAL_PLAN_ID || "";
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

export default function ProPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isPro, plan, activatePro } = useProStatus();

  useEffect(() => {
    if (!PAYPAL_CLIENT_ID) return;
    if (window.paypal) { setPaypalLoaded(true); return; }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    script.setAttribute("data-sdk-integration-source", "button-factory");
    script.onload = () => setPaypalLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!paypalLoaded || !PAYPAL_CLIENT_ID) return;
    const container = document.getElementById("paypal-button-container");
    if (!container) return;
    container.innerHTML = "";

    window.paypal.Buttons({
      style: { shape: "rect", color: "gold", layout: "vertical", label: "subscribe" },
      createSubscription: (_data: unknown, actions: { subscription: { create: (arg: { plan_id: string }) => Promise<string> } }) => {
        return actions.subscription.create({
          plan_id: billing === "annual" ? ANNUAL_PLAN_ID : MONTHLY_PLAN_ID,
        });
      },
      onApprove: (_data: { subscriptionID: string }) => {
        activatePro(billing);
        setSuccess(true);
      },
    }).render("#paypal-button-container");
  }, [paypalLoaded, billing, activatePro]);

  const FEATURES = [
    { icon: "🔓", label: "Unlimited strain views", free: "10/day", pro: "Unlimited" },
    { icon: "🤖", label: "AI Strain Chat", free: "5 msgs/day", pro: "Unlimited" },
    { icon: "🌿", label: "Plant Diagnosis", free: "❌", pro: "✅ Unlimited" },
    { icon: "🧬", label: "Full cannabinoid data (CBN, CBG, THCV)", free: "Hidden", pro: "✅ Full access" },
    { icon: "📊", label: "Advanced strain analytics", free: "❌", pro: "✅" },
    { icon: "🚫", label: "Ad-free experience", free: "❌", pro: "✅" },
    { icon: "⚡", label: "Early access to new features", free: "❌", pro: "✅" },
  ];

  if (success || isPro) {
    return (
      <div className="min-h-screen bg-[#F8F8F0] flex items-center justify-center px-4">
        <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🌿</div>
          <h1 className="text-3xl font-black mb-2">You&apos;re Pro!</h1>
          <p className="text-gray-500 font-medium mb-6">
            Welcome to StrainHub Pro {plan === "annual" ? "(Annual)" : "(Monthly)"}. All features are now unlocked.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/chat" className="w-full py-3 bg-lime border-2 border-black rounded-xl font-black text-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
              💬 Try AI Chat
            </Link>
            <Link href="/diagnose" className="w-full py-3 bg-white border-2 border-black rounded-xl font-black text-center hover:bg-lime-pale transition-all">
              🔬 Diagnose a Plant
            </Link>
            <Link href="/strains" className="w-full py-3 text-gray-500 font-medium text-center hover:text-brand transition-all">
              Browse Strains →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      {/* Hero */}
      <div className="text-center pt-16 pb-10 px-4">
        <div className="inline-flex items-center gap-2 bg-lime border-2 border-black rounded-full px-4 py-1.5 text-sm font-bold mb-6 shadow-brutal-sm">
          🌿 StrainHub Pro
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-brand mb-4">
          Unlock Everything
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-xl mx-auto">
          Unlimited AI chat, plant diagnosis, full cannabinoid data, and zero ads.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-10 px-4">
        <div className="bg-white border-2 border-black rounded-2xl p-1 flex gap-1 shadow-brutal-sm">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${billing === "monthly" ? "bg-lime border-2 border-black shadow-brutal-sm" : "text-gray-400 hover:text-brand"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all relative ${billing === "annual" ? "bg-lime border-2 border-black shadow-brutal-sm" : "text-gray-400 hover:text-brand"}`}
          >
            Annual
            <span className="absolute -top-3 -right-2 bg-black text-lime text-[10px] font-black px-2 py-0.5 rounded-full">
              SAVE 72%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-6 mb-14">
        {/* Free Card */}
        <div className="bg-white border-2 border-gray-200 rounded-3xl p-8">
          <div className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Free</div>
          <div className="text-4xl font-black mb-1">$0</div>
          <div className="text-gray-400 text-sm mb-8">Forever</div>
          <div className="space-y-3">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <span className="text-lg">{f.icon}</span>
                <div>
                  <div className="text-sm font-bold text-brand">{f.label}</div>
                  <div className="text-xs text-gray-400">{f.free}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Card */}
        <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-brutal relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-lime border-l-2 border-b-2 border-black px-4 py-1.5 rounded-bl-2xl text-sm font-black">
            ✨ MOST POPULAR
          </div>
          <div className="text-sm font-bold text-brand mb-2 uppercase tracking-widest">Pro</div>
          <div className="flex items-end gap-1 mb-1">
            <div className="text-4xl font-black">
              {billing === "annual" ? "$0.83" : "$2.99"}
            </div>
            <div className="text-gray-400 text-sm pb-1">/month</div>
          </div>
          {billing === "annual" ? (
            <div className="text-gray-400 text-sm mb-2">Billed $9.99/year <span className="line-through text-gray-300">$35.88</span></div>
          ) : (
            <div className="text-gray-400 text-sm mb-2">Billed monthly · cancel anytime</div>
          )}
          <div className="space-y-3 mb-8 mt-6">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <span className="text-lg">{f.icon}</span>
                <div>
                  <div className="text-sm font-bold text-brand">{f.label}</div>
                  <div className="text-xs font-bold text-green-600">{f.pro}</div>
                </div>
              </div>
            ))}
          </div>

          {/* PayPal Button */}
          {PAYPAL_CLIENT_ID ? (
            <div id="paypal-button-container" className="min-h-[50px]" />
          ) : (
            <button
              onClick={() => { activatePro(billing); setSuccess(true); }}
              className="w-full py-3.5 bg-lime border-2 border-black rounded-xl font-black shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all"
            >
              🌿 Get Pro — {billing === "annual" ? "$9.99/year" : "$2.99/month"}
            </button>
          )}
          <p className="text-center text-xs text-gray-400 mt-3">Secure payment · Cancel anytime</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-black text-center mb-8">Common Questions</h2>
        {[
          { q: "How does the AI Chat work?", a: "StrainBot is powered by Gemini 2.5 Flash and knows everything in our database — effects, genetics, growing tips, terpenes, and more. Ask anything." },
          { q: "What is Plant Diagnosis?", a: "Upload a photo of your plant and our AI will identify nutrient deficiencies, pests, diseases, and environmental stress — with a full treatment plan." },
          { q: "Can I cancel anytime?", a: "Yes. Cancel from your PayPal account and your Pro access continues until the end of your billing period." },
          { q: "Is my payment secure?", a: "100%. Payments are processed by PayPal — we never store your card details." },
        ].map((item) => (
          <div key={item.q} className="border-b border-gray-200 py-5">
            <div className="font-bold mb-1">{item.q}</div>
            <div className="text-gray-500 text-sm">{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
