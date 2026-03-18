"use client";
import Link from "next/link";
import Image from "next/image";

const PLACEMENT_IMAGES = {
  homepage:    "https://media.base44.com/images/public/69b215547e21a09debcd5b78/ba96bead2_generated_image.png",
  sidebar:     "https://media.base44.com/images/public/69b215547e21a09debcd5b78/dca6b7f96_generated_image.png",
  search:      "https://media.base44.com/images/public/69b215547e21a09debcd5b78/13424562c_generated_image.png",
  seedbank:    "https://media.base44.com/images/public/69b215547e21a09debcd5b78/eb21ee95a_generated_image.png",
  store:       "https://media.base44.com/images/public/69b215547e21a09debcd5b78/dabb40891_generated_image.png",
  newsletter:  "https://media.base44.com/images/public/69b215547e21a09debcd5b78/8df35c6ed_generated_image.png",
};

export default function AdvertisePage() {
  const chartBars = [
    { month: "Oct", pct: 28, label: "28K" },
    { month: "Nov", pct: 41, label: "41K" },
    { month: "Dec", pct: 55, label: "55K" },
    { month: "Jan", pct: 72, label: "72K" },
    { month: "Feb", pct: 89, label: "89K" },
    { month: "Mar", pct: 100, label: "100K+" },
  ];

  const funnelSteps = [
    { label: "Visitors land on StrainHub", pct: 100 },
    { label: "Browse strain or seed bank pages", pct: 78 },
    { label: "Click a seed bank or ad unit", pct: 34 },
    { label: "Visit your store / site", pct: 22 },
  ];

  const placements = [
    {
      id: "homepage",
      icon: "🏠",
      name: "Homepage Banner",
      desc: "Full-width strip at the top of our highest-traffic page. Maximum impressions — first thing every visitor sees when they land.",
      badge: "Most Popular",
    },
    {
      id: "sidebar",
      icon: "🌿",
      name: "Strain Page Sidebar",
      desc: "Tall sidebar ad shown on strain detail pages. Readers are actively researching strains — the highest-intent placement we offer.",
      badge: "Best ROI",
    },
    {
      id: "search",
      icon: "🔍",
      name: "Search Results Top",
      desc: "Leaderboard banner at the top of all strain search results. Appears when users search with clear buying intent.",
      badge: null,
    },
    {
      id: "seedbank",
      icon: "🏦",
      name: "Seed Bank Spotlight",
      desc: "Featured & sponsored placement in our seed bank directory. Your brand card sits above organic listings with a highlighted badge.",
      badge: "New",
    },
    {
      id: "store",
      icon: "🛍️",
      name: "Affiliate Store Listing",
      desc: "List your products directly on StrainHub. Users browse here, click your product, and land on your checkout. We drive the traffic — you close the sale.",
      badge: "New",
    },
    {
      id: "newsletter",
      icon: "📧",
      name: "Newsletter Feature",
      desc: "Dedicated sponsor block in our grower newsletter. Direct reach to our most engaged subscribers — people who opted in for cannabis content.",
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F0]">

      {/* ── HERO — no extra padding, flush against the banner ── */}
      <section className="bg-brand text-white px-4 py-20 sm:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #AAFF00 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-lime/20 border border-lime/30 px-4 py-1.5 rounded-full text-lime text-xs font-black uppercase tracking-widest mb-6">
            Partner with StrainHub
          </div>
          <h1 className="text-4xl sm:text-6xl font-black leading-tight mb-5">
            Put Your Brand in Front of{" "}
            <span className="text-lime">100K+ Monthly</span>{" "}
            Cannabis Enthusiasts
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            StrainHub is the fastest-growing cannabis strain database. Our users are growers, patients, and connoisseurs — actively searching, comparing, and buying.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?subject=advertising" className="inline-flex items-center justify-center gap-2 bg-lime text-brand font-black px-8 py-4 rounded-xl text-base hover:bg-lime/90 transition-all shadow-lg hover:-translate-y-0.5">
              Contact Us for Pricing →
            </Link>
            <a href="#placements" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-white/20 transition-all">
              See Ad Placements ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── GROWTH CHART — pure CSS bars, no library ── */}
      <section className="px-4 py-16 sm:py-20 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Our Growth</p>
          <h2 className="text-3xl sm:text-4xl font-black text-brand">We're Growing Fast. So Will Your Reach.</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Monthly unique visitors since launch — 100% organic SEO, no paid growth.</p>
        </div>

        <div className="bg-white border-2 border-brand rounded-3xl p-8 shadow-brutal">
          {/* CSS Bar Chart */}
          <div className="flex items-end gap-3 sm:gap-5" style={{ height: "200px" }}>
            {chartBars.map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
                <span className="text-[10px] sm:text-xs font-black text-brand">{bar.label}</span>
                <div
                  className="w-full bg-lime border-2 border-brand rounded-t-lg"
                  style={{ height: `${bar.pct}%`, minHeight: "8px" }}
                />
                <span className="text-[10px] font-bold text-gray-400">{bar.month}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">Monthly Unique Visitors · Oct 2025 – Mar 2026</p>
        </div>

        {/* Key stats — no strain count */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {[
            { num: "100K+", label: "Monthly Visitors",   sub: "and growing" },
            { num: "5:20",  label: "Avg Session",        sub: "minutes on site" },
            { num: "62",    label: "Seed Banks Listed",  sub: "US, CA & global" },
          ].map(s => (
            <div key={s.label} className="bg-white border-2 border-brand rounded-2xl p-5 text-center shadow-brutal-sm">
              <div className="text-3xl font-black text-brand">{s.num}</div>
              <div className="text-xs font-black text-gray-700 mt-1">{s.label}</div>
              <div className="text-[10px] text-gray-400">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FUNNEL ── */}
      <section className="bg-brand px-4 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-lime/60 mb-2">Buyer Journey</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Your Customer Is Already Here</h2>
            <p className="text-white/60 mt-3">Our users come with intent. They search, research, then buy.</p>
          </div>
          <div className="space-y-4">
            {funnelSteps.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-lime/20 border border-lime/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-lime font-black text-xs">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-white/90 text-sm font-semibold">{s.label}</span>
                    <span className="text-lime font-black text-sm">{s.pct}%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-lime rounded-full" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIENCE ── */}
      <section className="px-4 py-16 sm:py-20 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Audience</p>
          <h2 className="text-3xl sm:text-4xl font-black text-brand">Who You're Reaching</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: "🌱", title: "Home Growers",    pct: "42%", desc: "Searching for strains to grow, comparing genetics, looking for seeds to buy." },
            { icon: "💊", title: "Medical Patients", pct: "31%", desc: "Researching strains for specific conditions — anxiety, pain, sleep, focus." },
            { icon: "🔬", title: "Enthusiasts",      pct: "27%", desc: "Connoisseurs exploring terpene profiles, effects, and rare genetics." },
          ].map(a => (
            <div key={a.title} className="bg-white border-2 border-brand rounded-3xl p-7 shadow-brutal-sm hover:shadow-brutal hover:-translate-y-1 transition-all">
              <div className="text-4xl mb-3">{a.icon}</div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-black text-brand">{a.pct}</span>
                <span className="text-sm font-black text-gray-400">{a.title}</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AD PLACEMENTS WITH IMAGES ── */}
      <section id="placements" className="bg-[#F0FFE0] px-4 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Placement Options</p>
            <h2 className="text-3xl sm:text-4xl font-black text-brand">Where Your Brand Lives</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Every placement shown below is a real spot on StrainHub. Pick what fits your goal.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placements.map((p) => (
              <div key={p.id} className="bg-white border-2 border-brand rounded-3xl overflow-hidden shadow-brutal-sm hover:shadow-brutal hover:-translate-y-1 transition-all relative flex flex-col">
                {p.badge && (
                  <span className="absolute top-3 right-3 z-10 bg-lime text-brand text-[10px] font-black px-2 py-0.5 rounded-full border border-brand">
                    {p.badge}
                  </span>
                )}
                {/* Preview image */}
                <div className="relative w-full bg-gray-100 border-b-2 border-brand" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={PLACEMENT_IMAGES[p.id as keyof typeof PLACEMENT_IMAGES]}
                    alt={`${p.name} placement preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Card body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{p.icon}</span>
                    <h3 className="font-black text-brand text-base">{p.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">{p.desc}</p>
                  <Link href="/contact?subject=advertising" className="text-xs font-black text-brand border-2 border-brand rounded-xl px-4 py-2 hover:bg-lime transition-colors text-center">
                    Contact for Pricing →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AFFILIATE STORE PITCH ── */}
      <section className="px-4 py-16 sm:py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Partner Store</p>
            <h2 className="text-3xl sm:text-4xl font-black text-brand leading-tight mb-5">
              List Your Products on StrainHub.<br />
              <span className="bg-brand text-lime px-2 rounded-lg">We Send the Traffic. You Close the Sale.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We're building a curated cannabis marketplace — no checkout on our side, zero payment friction. Customers browse your products on StrainHub, click to buy, and land directly on your store.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Your products displayed next to matching strain pages",
                "Customers click → redirected to your checkout",
                "You handle fulfillment — we drive the traffic",
                "Performance tracked: clicks & conversions",
              ].map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-lime border border-brand flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/contact?subject=store-partnership" className="inline-flex items-center gap-2 bg-brand text-lime font-black px-6 py-3 rounded-xl hover:bg-brand/90 transition-colors">
              Set Up Your Store Listing →
            </Link>
          </div>
          <div className="bg-white border-2 border-brand rounded-3xl p-8 shadow-brutal space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">How It Works</p>
            {[
              { step: "1", title: "Submit your products", desc: "Seeds, merch, grow gear — any cannabis-adjacent product." },
              { step: "2", title: "We list them on StrainHub", desc: "Displayed on relevant strain and seed bank pages." },
              { step: "3", title: "Visitor clicks your product", desc: "They're redirected to your store, ready to buy." },
              { step: "4", title: "You fulfill the order", desc: "Shipping, payment, all on your end — we just send the traffic." },
            ].map(s => (
              <div key={s.step} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-lime border-2 border-brand flex-shrink-0 flex items-center justify-center font-black text-brand text-sm">{s.step}</div>
                <div>
                  <div className="font-black text-brand text-sm">{s.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-brand px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready to grow your reach?</h2>
          <p className="text-white/60 text-lg mb-8">All pricing is custom. Tell us about your brand and goals — we'll build a package that works.</p>
          <Link href="/contact?subject=advertising" className="inline-flex items-center justify-center gap-2 bg-lime text-brand font-black px-10 py-4 rounded-xl text-lg hover:bg-lime/90 transition-all shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5">
            Contact Us for Pricing →
          </Link>
        </div>
      </section>

    </div>
  );
}
