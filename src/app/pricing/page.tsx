import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Free vs Pro | StrainHub",
  description: "StrainHub is free to browse. Sign up free for 10 strain views, 10 Learn pages, 5 AI chats, and 1 plant diagnosis per day. Upgrade to Pro for unlimited everything.",
  alternates: { canonical: "https://www.strainhub.org/pricing" },
  openGraph: {
    title: "StrainHub Pricing — Free & Pro Plans",
    description: "Browse free or go unlimited with Pro. $2.99/month or $9.99/year.",
    url: "https://www.strainhub.org/pricing",
    type: "website",
  },
};

const FREE_FEATURES = [
  { icon: "🌿", label: "10 strain views per day", note: "Reset every midnight" },
  { icon: "📚", label: "10 Learn Hub pages per day", note: "All topics included" },
  { icon: "💬", label: "5 AI cannabis chats per day", note: "Strain finder, grow help, more" },
  { icon: "🔬", label: "1 plant diagnosis per day", note: "Upload a photo, get a diagnosis" },
  { icon: "⭐", label: "Save favorites & wishlist", note: "Build your strain collection" },
  { icon: "📸", label: "Submit grow photos", note: "Share your grows with the community" },
  { icon: "🔍", label: "Full strain search & filters", note: "Filter by effects, THC, terpenes" },
  { icon: "🌐", label: "Browse all learning content index", note: "See everything, read freely" },
];

const PRO_FEATURES = [
  { icon: "♾️", label: "Unlimited strain views", note: "Browse all cannabis strains" },
  { icon: "♾️", label: "Unlimited Learn Hub pages", note: "Read as much as you want" },
  { icon: "♾️", label: "Unlimited AI chats", note: "Deep dive into any topic" },
  { icon: "♾️", label: "Unlimited plant diagnoses", note: "Upload & diagnose every day" },
  { icon: "🧬", label: "Full cannabinoid data", note: "CBG, CBN, THCV, CBC profiles" },
  { icon: "🔱", label: "Strain crossing / breeding tool", note: "Predict offspring genetics" },
  { icon: "📓", label: "Personal grow journal", note: "Track every grow, week by week" },
  { icon: "🚫", label: "Ad-free experience", note: "Zero banners, clean UI" },
  { icon: "⚡", label: "Early access to new features", note: "First to test everything new" },
  { icon: "🏆", label: "Pro badge on your profile", note: "Stand out in the community" },
];

const COMPARE = [
  { feature: "Strain database access", free: "10/day", pro: "Unlimited" },
  { feature: "Learn Hub pages", free: "10/day", pro: "Unlimited" },
  { feature: "AI cannabis assistant", free: "5 chats/day", pro: "Unlimited" },
  { feature: "Plant photo diagnosis", free: "1/day", pro: "Unlimited" },
  { feature: "Strain search & filters", free: "✅", pro: "✅" },
  { feature: "Save favorites", free: "✅", pro: "✅" },
  { feature: "Submit grow photos", free: "✅", pro: "✅" },
  { feature: "Full cannabinoid data", free: "—", pro: "✅" },
  { feature: "Strain breeding tool", free: "—", pro: "✅" },
  { feature: "Grow journal", free: "—", pro: "✅" },
  { feature: "Ad-free", free: "—", pro: "✅" },
  { feature: "Early access", free: "—", pro: "✅" },
  { feature: "Pro badge", free: "—", pro: "✅" },
];

const FAQS = [
  { q: "Is StrainHub really free?", a: "Yes — no credit card required. Guest visitors get 10 strain views and 10 Learn pages per day. Create a free account to also unlock 5 AI chats and 1 plant diagnosis per day." },
  { q: "What counts as a 'view'?", a: "Opening a strain detail page or a Learn Hub article counts as one view. The strain list, search, and home page are always free and never count toward limits." },
  { q: "Do limits reset every day?", a: "Yes — all daily limits reset at midnight UTC." },
  { q: "Can I cancel Pro anytime?", a: "Yes. Cancel anytime from your account settings. Your Pro access continues until the end of the billing period." },
  { q: "Is there a free trial for Pro?", a: "We don't currently offer a trial, but the free plan gives you a solid feel for the platform. Pro unlocks everything with no risk — cancel anytime." },
  { q: "What's included in the annual plan?", a: "Everything in Pro, billed once per year at $9.99 — that's just $0.83/month. You save 72% versus monthly." },
  { q: "What is Breeder Pro?", a: "Breeder Pro ($9.99/month) is for seed banks and breeders who want to claim their strains, add official data, display a verified breeder badge, and access strain analytics. Contact us to apply." },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f6]">

      {/* Hero */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 bg-[#AAFF00] border border-black">
            Simple, transparent pricing
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black mb-4">
            Free to start.<br />Pro to go unlimited.
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Browse strains, read the Learn Hub, and chat with the AI — all free.
            Upgrade when you want more.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">

          {/* Free */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Free</div>
              <div className="text-5xl font-black text-black">$0</div>
              <div className="text-gray-400 text-sm mt-1">Forever free. No card needed.</div>
              <Link href="/auth/signup" className="mt-5 flex items-center justify-center w-full py-3 border-2 border-black rounded-xl font-black text-sm hover:bg-black hover:text-white transition-all">
                Sign Up Free →
              </Link>
            </div>
            <div className="p-6">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">What's included</p>
              <ul className="space-y-3">
                {FREE_FEATURES.map(f => (
                  <li key={f.label} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{f.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-black">{f.label}</div>
                      <div className="text-xs text-gray-400">{f.note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro Monthly — FEATURED */}
          <div className="bg-black border-2 border-black rounded-2xl overflow-hidden relative md:-mt-4 md:shadow-[8px_8px_0px_#AAFF00]">
            <div className="absolute top-4 right-4 bg-[#AAFF00] text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</div>
            <div className="p-6 border-b border-white/10">
              <div className="text-sm font-black uppercase tracking-widest text-[#AAFF00] mb-2">Pro</div>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black text-white">$2.99</span>
                <span className="text-gray-400 mb-2">/month</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Billed monthly. Cancel anytime.</div>
              <Link href="/pro" className="mt-5 flex items-center justify-center w-full py-3 bg-[#AAFF00] border-2 border-[#AAFF00] rounded-xl font-black text-sm text-black hover:bg-yellow-300 transition-all">
                ⚡ Get Pro Monthly
              </Link>
            </div>
            <div className="p-6">
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Everything in Free, plus</p>
              <ul className="space-y-3">
                {PRO_FEATURES.map(f => (
                  <li key={f.label} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{f.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-white">{f.label}</div>
                      <div className="text-xs text-gray-500">{f.note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro Annual */}
          <div className="bg-white border-2 border-[#AAFF00] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Pro Annual</div>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black text-black">$9.99</span>
                <span className="text-gray-400 mb-2">/year</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-[#AAFF00] text-black text-xs font-black px-2 py-0.5 rounded-full">Save 72%</span>
                <span className="text-gray-400 text-sm">= $0.83/month</span>
              </div>
              <Link href="/pro" className="mt-5 flex items-center justify-center w-full py-3 bg-[#AAFF00] border-2 border-black rounded-xl font-black text-sm text-black hover:shadow-[4px_4px_0px_#000] transition-all">
                ⚡ Get Pro Annual
              </Link>
            </div>
            <div className="p-6">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Same as Pro Monthly</p>
              <ul className="space-y-3">
                {PRO_FEATURES.slice(0, 6).map(f => (
                  <li key={f.label} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{f.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-black">{f.label}</div>
                      <div className="text-xs text-gray-400">{f.note}</div>
                    </div>
                  </li>
                ))}
                <li className="text-xs text-gray-400 font-semibold pt-1">+ all other Pro features...</li>
              </ul>
              <div className="mt-4 bg-[#AAFF00]/20 border border-[#AAFF00] rounded-xl p-3 text-xs font-bold text-black text-center">
                Best value — one payment, full year
              </div>
            </div>
          </div>

        </div>

        {/* Breeder Pro callout */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">For Seed Banks & Breeders</div>
            <h3 className="text-xl font-black text-black">Breeder Pro — $9.99/month</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-lg">Claim your strains, add official genetic data, display a verified breeder badge, and access strain analytics. Be the authoritative source for your genetics on StrainHub.</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {["Claim strains", "Verified badge", "Official data", "Strain analytics", "Priority listing"].map(b => (
                <span key={b} className="text-xs font-bold px-3 py-1 bg-gray-100 border border-gray-200 rounded-full">{b}</span>
              ))}
            </ul>
          </div>
          <div className="flex-shrink-0">
            <Link href="/contact" className="px-6 py-3.5 bg-black text-white font-black rounded-xl hover:bg-gray-800 transition-all text-sm whitespace-nowrap">
              Apply for Breeder Pro →
            </Link>
          </div>
        </div>

        {/* Full comparison table */}
        <div>
          <h2 className="text-3xl font-black text-black mb-6 text-center">Full comparison</h2>
          <div className="bg-white border-2 border-black rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-black text-white">
              <div className="px-5 py-4 font-black text-sm">Feature</div>
              <div className="px-5 py-4 font-black text-sm text-center border-l border-white/10">Free</div>
              <div className="px-5 py-4 font-black text-sm text-center border-l border-white/10 text-[#AAFF00]">Pro ⚡</div>
            </div>
            {COMPARE.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <div className="px-5 py-3.5 text-sm font-semibold text-black">{row.feature}</div>
                <div className="px-5 py-3.5 text-sm text-center text-gray-500 border-l border-gray-100 font-semibold">{row.free}</div>
                <div className={`px-5 py-3.5 text-sm text-center border-l border-gray-100 font-black ${row.pro === "✅" || row.pro === "Unlimited" ? "text-green-600" : "text-gray-400"}`}>
                  {row.pro}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-black text-black mb-6 text-center">Frequently asked questions</h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQS.map((f, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden group">
                <summary className="px-6 py-4 font-bold text-sm text-black cursor-pointer hover:bg-gray-50 flex items-center justify-between list-none">
                  {f.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3">▼</span>
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{f.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#AAFF00] border-2 border-black rounded-2xl p-10 text-center">
          <h2 className="text-4xl font-black text-black mb-3">Start free today</h2>
          <p className="text-black/70 mb-8 text-lg">No credit card. No commitment. Just better cannabis knowledge.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="px-8 py-4 bg-black text-white font-black rounded-xl hover:bg-gray-800 transition-all text-base">
              Create Free Account →
            </Link>
            <Link href="/pro" className="px-8 py-4 bg-white border-2 border-black text-black font-black rounded-xl hover:shadow-[4px_4px_0px_#000] transition-all text-base">
              ⚡ Go Pro — $2.99/mo
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
