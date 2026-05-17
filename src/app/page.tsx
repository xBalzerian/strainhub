import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StrainHub | $STRAIN Token — Cannabis Backed by Real Harvests + 455 Strain Database",
  description: "The world's first cannabis token backed by real plants. Every 10,000 $STRAIN = 1 plant planted. Holders earn from every harvest. Plus the most complete cannabis strain database — 455+ strains free.",
  keywords: [
    "cannabis strain database", "marijuana strains", "weed strains",
    "cannabis effects", "terpene profiles", "THC CBD levels",
    "strain genetics", "indica sativa hybrid", "grow guide", "best cannabis strains"
  ],
  openGraph: {
    title: "StrainHub — Cannabis Strain Database",
    description: "The complete cannabis strain database. Search every strain with full terpene profiles, effects, genetics, grow guides and learn more about marijuana with us.",
    url: "https://www.strainhub.org",
    type: "website",
    images: [{ url: "https://www.strainhub.org/og-image.png", width: 1200, height: 630, alt: "StrainHub Cannabis Strain Database" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StrainHub — Cannabis Strain Database",
    description: "The complete cannabis strain database. Search every strain with full terpene profiles, effects, genetics, grow guides and learn more about marijuana with us.",
  },
  alternates: { canonical: "https://www.strainhub.org" },
};

import Link from "next/link";
import Image from "next/image";
import { getTopStrains, getAllStrainsMeta } from "@/lib/strains";
import { getArticles } from "@/lib/articles";
import type { Article } from "@/lib/articles";
import StrainCard from "@/components/StrainCard";
import SeedbankLogoCloud from "@/components/SeedbankLogoCloud";

export const revalidate = 60;

export default async function HomePage() {
  const [topStrains, strainsMeta, latestArticles] = await Promise.all([
    getTopStrains(20),
    getAllStrainsMeta(),
    getArticles(3),
  ]);

  const counts = {
    Indica: strainsMeta.filter((s) => s.type === "Indica").length,
    Sativa: strainsMeta.filter((s) => s.type === "Sativa").length,
    Hybrid: strainsMeta.filter((s) => s.type === "Hybrid").length,
  };

  const tickerStrains = strainsMeta.slice(0, 20);

  const learnCategories = [
    { emoji: "🌿", title: "Strains", desc: "Indica vs. Sativa, terpene categories, effect guides", href: "/learn/strains", color: "bg-green-50", accent: "text-green-700", border: "border-green-200" },
    { emoji: "🌱", title: "Seeds", desc: "Feminized, autoflower, germination, storage", href: "/learn/seeds", color: "bg-lime-50", accent: "text-lime-700", border: "border-lime-200" },
    { emoji: "⚗️", title: "Effects & Science", desc: "Cannabinoids, terpenes, entourage effect", href: "/learn/effects", color: "bg-purple-50", accent: "text-purple-700", border: "border-purple-200" },
    { emoji: "💨", title: "Consumption", desc: "Edibles, vaporization, bioavailability", href: "/learn/consumption", color: "bg-blue-50", accent: "text-blue-700", border: "border-blue-200" },
    { emoji: "🌱", title: "Grow Guide", desc: "Week-by-week stages, training, deficiencies", href: "/learn/grow-guide", color: "bg-yellow-50", accent: "text-yellow-700", border: "border-yellow-200" },
    { emoji: "⚖️", title: "Legal", desc: "State laws, federal law, international guide", href: "/learn/legal", color: "bg-orange-50", accent: "text-orange-700", border: "border-orange-200" },
    { emoji: "📜", title: "History", desc: "Ancient origins, prohibition, social justice", href: "/learn/history", color: "bg-amber-50", accent: "text-amber-700", border: "border-amber-200" },
    { emoji: "🏥", title: "Medical Use", desc: "Conditions, dosing, research", href: "/learn/medical", color: "bg-red-50", accent: "text-red-700", border: "border-red-200" },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* $STRAIN TOKEN HERO */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="strain-token" className="bg-[#0D0D0D] min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#AAFF00]/10 border border-[#AAFF00] text-[#AAFF00] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-[#AAFF00] animate-pulse inline-block" />
              🌱 LAUNCHING ON BNB CHAIN — JULY 2026
            </div>
            <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              <span className="text-white">You Didn&apos;t Just</span><br />
              <span className="text-white">Buy a Token.</span><br />
              <span className="text-[#AAFF00] italic">You Planted</span><br />
              <span className="text-[#AAFF00] italic">a Seed. 🌱</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-8">
              $STRAIN is the world&apos;s first cannabis token backed by REAL plants, REAL harvests, and REAL USD revenue. Every 10,000 $STRAIN bought = 1 plant planted. Every harvest pays you back.
            </p>
            {/* Stat pills */}
            <div className="flex gap-4 flex-wrap mb-8">
              {[
                { num: "🌿 1 PLANT", label: "per 10K tokens" },
                { num: "$4,460", label: "per plant (retail)" },
                { num: "5,000x", label: "target return" },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
                  <div className="text-[#AAFF00] font-mono font-bold text-lg">{s.num}</div>
                  <div className="text-gray-400 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
            {/* CTAs */}
            <div className="flex gap-3 flex-wrap mb-6">
              <a href="#how-to-buy" className="bg-[#AAFF00] text-[#0D0D0D] font-black border-2 border-[#0D0D0D] shadow-[3px_3px_0px_#AAFF00] hover:shadow-[5px_5px_0px_#AAFF00] hover:-translate-y-0.5 px-6 py-3 rounded-lg transition-all inline-block">
                Buy $STRAIN 🚀
              </a>
              <a href="#roadmap" className="bg-transparent text-white font-bold border-2 border-white/30 px-6 py-3 rounded-lg hover:border-[#AAFF00] hover:text-[#AAFF00] transition-all inline-block">
                View Roadmap 📄
              </a>
            </div>
            <div className="flex items-center gap-4 flex-wrap text-gray-500 text-xs">
              {["✅ BNB Chain", "✅ Real Harvests", "✅ Holder Rewards", "✅ Transparent Reports"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          {/* RIGHT */}
          <div className="relative flex flex-col items-center gap-4">
            <div className="bg-white/5 border-2 border-[#AAFF00]/30 rounded-2xl p-10 text-center w-full max-w-sm">
              <div className="text-8xl mb-4">🌿</div>
              <div className="text-[#AAFF00] font-mono font-black text-4xl mb-2">$STRAIN</div>
              <div className="text-gray-500 text-xs font-mono">CA: [Available at launch — July 2026]</div>
            </div>
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
                <div className="text-xl mb-1">🔥</div>
                <div className="text-red-400 font-black text-xs">BURNS</div>
                <div className="text-gray-400 text-[10px]">40% of revenue</div>
              </div>
              <div className="bg-[#AAFF00]/10 border border-[#AAFF00]/30 rounded-xl p-4 text-center">
                <div className="text-xl mb-1">💰</div>
                <div className="text-[#AAFF00] font-black text-xs">EARN</div>
                <div className="text-gray-400 text-[10px]">30% of revenue</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <div className="text-xl mb-1">🌱</div>
                <div className="text-green-400 font-black text-xs">PLANTS</div>
                <div className="text-gray-400 text-[10px]">Growing daily</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* $STRAIN TICKER */}
      <div className="bg-[#AAFF00] border-y-2 border-black py-3 overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-[ticker_30s_linear_infinite]" style={{animation:"ticker 30s linear infinite"}}>
          {[...Array(2)].map((_, ri) => (
            <span key={ri} className="inline-flex items-center">
              {["🌿 455+ STRAINS IN DATABASE","🌱 EVERY 10,000 $STRAIN = 1 REAL PLANT PLANTED","💰 HOLDERS EARN 30% OF EVERY HARVEST","🔥 40% BURNED ON EVERY SALE — FOREVER","📈 TARGET: 5,000x FROM LAUNCH","💎 REAL USD FROM REAL CANNABIS HARVESTS","🚀 LAUNCHING BNB CHAIN — JULY 2026"].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-3 text-[#0D0D0D] font-black text-sm tracking-wide uppercase px-6">
                  {item}
                  <span className="w-2 h-2 bg-[#0D0D0D] rounded-full" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* WHAT IS $STRAIN */}
      <section className="bg-[#F4F4F0] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block text-[#AAFF00] text-xs font-bold tracking-widest uppercase bg-[#0D0D0D] px-4 py-2 rounded-full mb-4">THE CONCEPT</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">The World&apos;s First Cannabis Token<br />Backed by Real Plants</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">We didn&apos;t build another meme coin. We built a system where buying a token plants a real seed — and that seed grows into real dollars that flow back to you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🌱", title: "Every Token = Real Agriculture", body: "When you buy $STRAIN, every 10,000 tokens triggers the planting of one real, feminized cannabis seed in a licensed grow operation.", stat: "1 Plant per 10,000 $STRAIN" },
              { icon: "💵", title: "Real USD from Real Harvests", body: "Each plant produces an average of 500 grams of dried cannabis at $8.92/gram retail. That's $4,460 per plant — real American dollars, not promises.", stat: "$4,460 revenue per plant" },
              { icon: "🔥", title: "Revenue Flows Back to Holders", body: "30% of every harvest sale is distributed directly to $STRAIN holders. 40% buys back tokens and burns them forever — making your remaining tokens more valuable.", stat: "70% goes back to holders" },
            ].map((c) => (
              <div key={c.title} className="bg-white border-2 border-[#0D0D0D] rounded-xl shadow-[4px_4px_0px_#0D0D0D] hover:shadow-[6px_6px_0px_#AAFF00] hover:-translate-y-1 transition-all p-8">
                <div className="bg-[#AAFF00]/20 rounded-full w-16 h-16 flex items-center justify-center text-3xl mb-6">{c.icon}</div>
                <h3 className="font-black text-xl mb-3">{c.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{c.body}</p>
                <div className="bg-[#AAFF00] border-2 border-[#0D0D0D] px-3 py-1 rounded-full text-xs font-black inline-block">{c.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE REAL NUMBERS */}
      <section className="bg-[#0D0D0D] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block text-[#0D0D0D] text-xs font-bold tracking-widest uppercase bg-[#AAFF00] px-4 py-2 rounded-full mb-4">THE MATH</div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">The Numbers That Make People Stop Scrolling</h2>
          </div>
          {/* Harvest table */}
          <h3 className="text-white text-2xl font-bold mb-6">What One Harvested Plant Is Worth</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { type: "Indoor", yield: "150–600g", revenue: "$1,338 – $5,352" },
              { type: "Outdoor", yield: "400–1,500g", revenue: "$3,568 – $13,380" },
              { type: "Commercial", yield: "500–900g avg", revenue: "$4,460 – $8,028" },
            ].map((r) => (
              <div key={r.type} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-[#AAFF00] font-black text-lg mb-2">{r.type}</div>
                <div className="text-white font-mono text-2xl font-bold mb-1">{r.yield}</div>
                <div className="text-gray-400 text-sm">yield per plant</div>
                <div className="border-t border-white/10 mt-4 pt-4">
                  <div className="text-[#AAFF00] font-mono font-black text-xl">{r.revenue}</div>
                  <div className="text-gray-400 text-xs">at $8.92/gram retail</div>
                </div>
              </div>
            ))}
          </div>
          {/* Token mechanic */}
          <h3 className="text-white text-2xl font-bold mb-6">What 10,000 $STRAIN Actually Triggers</h3>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-[#AAFF00] text-[#0D0D0D] font-bold text-sm p-4">
              <div>Tokens Bought</div><div>Seed Cost</div><div>Plant Revenue</div><div>Net Profit</div>
            </div>
            <div className="grid grid-cols-4 p-4 items-center">
              <div className="text-white font-mono font-bold">10,000 $STRAIN</div>
              <div className="text-gray-300 font-mono">$51 total</div>
              <div className="text-gray-300 font-mono">$4,460 retail</div>
              <div className="text-[#AAFF00] font-mono font-black text-2xl">$4,409 PROFIT</div>
            </div>
          </div>
          <div className="bg-[#AAFF00]/10 border border-[#AAFF00]/30 rounded-xl p-6 text-center">
            <p className="text-[#AAFF00] font-bold text-lg">🤯 That means $1 buys the seed. $50 covers the grow. And $4,409 in profit gets split between buybacks and holders. Every. Single. Harvest.</p>
          </div>
        </div>
      </section>

      {/* HOW HOLDERS EARN */}
      <section className="bg-[#F4F4F0] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block text-[#AAFF00] text-xs font-bold tracking-widest uppercase bg-[#0D0D0D] px-4 py-2 rounded-full mb-4">YOUR EARNINGS</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">5 Ways You Make Money Holding $STRAIN</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", icon: "📈", title: "Early Entry Price Gains", body: "Launched at $0.000001 per token. As burns reduce supply and the narrative spreads, price climbs. Target: 5,000x from launch.", stat: "5,000x Target" },
              { num: "02", icon: "💰", title: "Quarterly Harvest Distributions", body: "30% of every harvest sale distributed to ALL $STRAIN holders proportionally. 100 plants harvested = $35,700 paid out. In USDT or BNB.", stat: "30% of all revenue" },
              { num: "03", icon: "🔥", title: "Buyback & Burn (Price Pump)", body: "40% of every harvest revenue buys $STRAIN from the open market and burns it permanently. Less supply = higher price for your tokens.", stat: "40% burned forever" },
              { num: "04", icon: "🤝", title: "Referral Rewards (2% Auto)", body: "Every time someone buys $STRAIN through your referral link, you earn 2% of their purchase automatically via smart contract. No middleman.", stat: "2% auto referral" },
              { num: "05", icon: "🏦", title: "Staking Yields (15–75% APY)", body: "Lock your $STRAIN for 30, 90, or 180 days and earn passive yield from the operations wallet. Longer stake = higher APY.", stat: "Up to 75% APY" },
              { num: "06", icon: "🎰", title: "Strain Drop Lottery", body: "Every new strain added to StrainHub triggers a lottery. Random holders win exclusive NFTs, merch, and bonus tokens. Free by just holding.", stat: "Random winner each drop" },
            ].map((c) => (
              <div key={c.num} className="bg-white border-2 border-[#0D0D0D] rounded-xl shadow-[4px_4px_0px_#0D0D0D] hover:shadow-[6px_6px_0px_#AAFF00] hover:-translate-y-1 transition-all p-8">
                <div className="text-[#AAFF00] font-black text-5xl font-mono mb-4 opacity-30">{c.num}</div>
                <div className="text-3xl mb-4">{c.icon}</div>
                <h3 className="font-black text-lg mb-3">{c.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{c.body}</p>
                <div className="bg-[#0D0D0D] text-[#AAFF00] px-3 py-1 rounded-full text-xs font-black inline-block">{c.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVENUE SPLIT */}
      <section className="bg-[#0D0D0D] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block text-[#0D0D0D] text-xs font-bold tracking-widest uppercase bg-[#AAFF00] px-4 py-2 rounded-full mb-4">TOKENOMICS</div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Where Every Dollar Goes</h2>
          </div>
          <div className="space-y-6 mb-14">
            {[
              { pct: 40, label: "🔥 Buyback & Burn", color: "bg-[#AAFF00]" },
              { pct: 30, label: "💰 Holder Rewards", color: "bg-amber-400" },
              { pct: 20, label: "🌱 Plant More Seeds", color: "bg-green-500" },
              { pct: 10, label: "⚙️ Operations & Team", color: "bg-gray-500" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-4">
                <div className="text-white font-bold w-48 flex-shrink-0">{b.label}</div>
                <div className="flex-1 bg-white/10 rounded-full h-6 overflow-hidden">
                  <div className={`${b.color} h-full rounded-full`} style={{width:`${b.pct}%`}} />
                </div>
                <div className="text-[#AAFF00] font-mono font-black text-2xl w-16 text-right">{b.pct}%</div>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-white font-black text-xl mb-2">The 10% Transaction Tax</h3>
            <p className="text-gray-400 text-sm mb-6">Every buy and sell of $STRAIN carries a 10% tax, automatically distributed:</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "4% → 🔥 Burn", bg: "bg-red-500/20 border-red-500/30 text-red-400" },
                { label: "3% → 💰 Staking Rewards", bg: "bg-[#AAFF00]/20 border-[#AAFF00]/30 text-[#AAFF00]" },
                { label: "2% → 📢 Marketing", bg: "bg-blue-500/20 border-blue-500/30 text-blue-400" },
                { label: "1% → 💧 Liquidity Pool", bg: "bg-purple-500/20 border-purple-500/30 text-purple-400" },
              ].map((p) => (
                <span key={p.label} className={`border px-4 py-2 rounded-full text-sm font-bold ${p.bg}`}>{p.label}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* $50 → $50,000 PATH */}
      <section className="bg-[#F4F4F0] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block text-[#AAFF00] text-xs font-bold tracking-widest uppercase bg-[#0D0D0D] px-4 py-2 rounded-full mb-4">THE PATH</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">How $50 Becomes $50,000</h2>
            <p className="text-lg text-gray-600">The conservative path. The numbers are real. The math works.</p>
          </div>
          <div className="bg-white border-2 border-[#0D0D0D] rounded-xl shadow-[4px_4px_0px_#0D0D0D] overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-[#0D0D0D] text-white font-bold text-sm p-4">
              <div>Stage</div><div>What Happens</div><div>Your $50 Becomes</div>
            </div>
            {[
              { stage: "Launch — July", event: "Buy at $0.000001 = 50M $STRAIN", val: "$50", highlight: false },
              { stage: "August", event: "100 plants harvested, $35K burned, price 10x", val: "$500", highlight: false },
              { stage: "September", event: "PancakeSwap listing, volume surge, 50x", val: "$2,500", highlight: false },
              { stage: "October", event: "Viral narrative: 'Real cannabis farm backs BNB token'", val: "$10,000", highlight: false },
              { stage: "Nov–Dec", event: "Q4 bull run + CEX listing, 1,000x from launch", val: "$50,000 🚀", highlight: true },
            ].map((r) => (
              <div key={r.stage} className={`grid grid-cols-3 p-4 border-t border-gray-100 ${r.highlight ? "bg-[#AAFF00]/20 border-2 border-[#AAFF00]" : ""}`}>
                <div className="font-bold text-sm text-gray-800">{r.stage}</div>
                <div className="text-gray-600 text-sm">{r.event}</div>
                <div className={`font-mono font-black text-xl ${r.highlight ? "text-[#0D0D0D]" : "text-[#AAFF00]"}`}>{r.val}</div>
              </div>
            ))}
          </div>
          <div className="bg-[#0D0D0D] text-white rounded-xl p-8 text-center">
            <p className="text-lg font-bold italic">🚀 Hit 5,000x and your $50 becomes $250,000. The first news headline that says &ldquo;BNB meme coin backed by REAL cannabis farm&rdquo; goes live — and that headline WILL be written. It&apos;s too good a story not to write.</p>
          </div>
        </div>
      </section>

      {/* SEED TO WALLET TIMELINE */}
      <section className="bg-[#0D0D0D] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block text-[#0D0D0D] text-xs font-bold tracking-widest uppercase bg-[#AAFF00] px-4 py-2 rounded-full mb-4">THE JOURNEY</div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">From Seed to Your Wallet</h2>
            <p className="text-gray-400 text-lg">Not promises — a real documented process.</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 border-l-2 border-dashed border-[#AAFF00]/30" />
            <div className="space-y-6">
              {[
                { week: "Day 1", icon: "🌱", title: "You Buy $STRAIN", body: "Every 10,000 tokens triggers 1 feminized seed purchased ($1) and planted in our licensed grow facility.", highlight: false },
                { week: "Week 2", icon: "🌿", title: "Seedling Emerges", body: "The seed germinates. Photos posted to Telegram and X: 'Your tokens are growing. 💚'", highlight: false },
                { week: "Week 6", icon: "🌿", title: "Vegetation Stage", body: "Plant enters rapid growth. Community updates showing height, health, terpene readings.", highlight: false },
                { week: "Week 10", icon: "🌸", title: "Flowering Begins", body: "Buds forming. Terpene profiles developing. 'She's flowering. Terpenes are insane. 🌸'", highlight: false },
                { week: "HARVEST", icon: "✂️", title: "Harvest Day", body: "Wet weight posted publicly. Sold to licensed US distributor. Revenue generated and logged on-chain.", highlight: true },
                { week: "BURN 🔥", icon: "🔥", title: "Buyback Executed", body: "40% of revenue buys $STRAIN from PancakeSwap and burns it permanently. On-chain proof posted.", highlight: false },
                { week: "PAY DAY 💰", icon: "💰", title: "You Get Paid", body: "30% of revenue distributed proportionally to ALL $STRAIN holders. Snapshot taken. Rewards sent.", highlight: true },
              ].map((s) => (
                <div key={s.title} className={`relative pl-20 ${s.highlight ? "bg-[#AAFF00]/10 border border-[#AAFF00]/30 rounded-xl p-6 ml-4" : ""}`}>
                  <div className="absolute left-4 top-4 w-9 h-9 rounded-full bg-[#0D0D0D] border-2 border-[#AAFF00] flex items-center justify-center text-lg z-10">
                    {s.icon}
                  </div>
                  <div className="bg-[#AAFF00] text-[#0D0D0D] text-xs font-black px-2 py-0.5 rounded-full inline-block mb-2">{s.week}</div>
                  <h4 className={`font-black text-lg mb-1 ${s.highlight ? "text-[#AAFF00]" : "text-white"}`}>{s.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="bg-[#F4F4F0] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block text-[#AAFF00] text-xs font-bold tracking-widest uppercase bg-[#0D0D0D] px-4 py-2 rounded-full mb-4">ROADMAP</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">The Path to 5,000x</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { phase: "Phase 1", period: "July–Aug 2026", status: "LAUNCHING", statusBg: "bg-[#AAFF00] text-[#0D0D0D]", title: "🚀 Genesis", target: "$500K market cap", items: ["Smart contract on BNB Chain","StrainHub token page live","First grow cycle initiated","PancakeSwap listing","100 holders milestone","First harvest cycle begins"], active: true },
              { phase: "Phase 2", period: "September 2026", status: "INCOMING", statusBg: "bg-yellow-400 text-[#0D0D0D]", title: "🌿 First Harvest", target: "$5M market cap", items: ["First harvest documented","First buyback & burn on-chain","First holder distribution paid","Harvest report published","1,000 holders milestone","KOL outreach begins"], active: false },
              { phase: "Phase 3", period: "Oct–Nov 2026", status: "PLANNED", statusBg: "bg-gray-600 text-white", title: "📈 Viral Moment", target: "$50M market cap", items: ["Major KOL features $STRAIN","News media coverage goes live","CEX listing applications","Staking platform launched","10,000 holders milestone","Second grow cycle underway"], active: false },
              { phase: "Phase 4", period: "December 2026", status: "VISION", statusBg: "bg-purple-600 text-white", title: "🔥 Bull Run Peak", target: "$500M market cap", items: ["First CEX listing (Tier 2)","5,000x from launch price","Third grow cycle: 10x plants","$STRAIN + StrainHub Pro integration","NFT strain collection drops","50,000 holders milestone"], active: false },
            ].map((p) => (
              <div key={p.phase} className={`bg-white border-2 rounded-xl p-8 ${p.active ? "border-[#AAFF00] shadow-[4px_4px_0px_#AAFF00]" : "border-[#0D0D0D] shadow-[4px_4px_0px_#0D0D0D]"}`}>
                <div className={`text-xs font-black px-3 py-1 rounded-full inline-block mb-3 ${p.statusBg}`}>{p.status}</div>
                <div className="text-gray-400 text-xs font-bold mb-2">{p.period}</div>
                <h3 className="font-black text-xl mb-1">{p.title}</h3>
                <div className="text-[#AAFF00] font-mono font-bold text-sm mb-4 bg-[#0D0D0D] px-3 py-1 rounded-full inline-block">{p.target}</div>
                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className={`mt-0.5 flex-shrink-0 ${p.active ? "text-[#AAFF00]" : "text-gray-300"}`}>{p.active ? "✅" : "☐"}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO BUY */}
      <section id="how-to-buy" className="bg-[#0D0D0D] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block text-[#0D0D0D] text-xs font-bold tracking-widest uppercase bg-[#AAFF00] px-4 py-2 rounded-full mb-4">GET STARTED</div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">How to Buy $STRAIN in 4 Steps</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { num: "01", icon: "📱", title: "Get a Wallet", body: "Download Trust Wallet (mobile) or MetaMask (browser). Create your wallet and save your seed phrase somewhere safe offline." },
              { num: "02", icon: "💵", title: "Buy BNB", body: "Purchase BNB (Binance Coin) from Binance, Coinbase, or Kraken. Transfer it to your Trust Wallet or MetaMask." },
              { num: "03", icon: "🔄", title: "Open PancakeSwap", body: "Go to pancakeswap.finance, connect your wallet, and switch your network to BNB Chain (BSC)." },
              { num: "04", icon: "🌿", title: "Buy $STRAIN", body: "Paste the $STRAIN contract address, set slippage to 12%, and swap your BNB for $STRAIN. You're in." },
            ].map((s) => (
              <div key={s.num} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-[#AAFF00]/30 transition-all">
                <div className="text-[#AAFF00] font-mono font-black text-4xl opacity-40 mb-4">{s.num}</div>
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-white font-black text-lg mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="bg-yellow-500/10 border-2 border-yellow-400/50 rounded-xl p-6 max-w-2xl mx-auto text-center">
            <p className="text-yellow-400 font-bold text-sm">⚠️ Always verify the contract address from our official channels only.</p>
            <p className="text-yellow-400/70 text-xs mt-2">Official: strainhub.org | Telegram: @StrainHubToken | Twitter: @StrainHubToken</p>
            <p className="text-[#AAFF00] font-mono font-bold mt-3 text-sm">Contract Address: [Available at July 2026 Launch]</p>
          </div>
        </div>
      </section>

      {/* DIVIDER INTO STRAIN DB */}
      <div className="bg-[#AAFF00] border-y-2 border-black py-8 text-center">
        <p className="text-[#0D0D0D] font-black text-2xl mb-1">🌿 While You Wait for Launch — Explore Our Database</p>
        <p className="text-[#0D0D0D]/70 font-medium">The most comprehensive cannabis strain database on the internet. Powered by $STRAIN.</p>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* END $STRAIN TOKEN — EXISTING CONTENT BELOW UNCHANGED */}
      {/* ═══════════════════════════════════════════════════════════ */}

      {/* HERO */}
      <section className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-lime border-2 border-black px-4 py-1.5 rounded-full text-xs font-black shadow-brutal-sm mb-6">
              🌿 {strainsMeta.length}+ Strains Catalogued &amp; Growing
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-5">
              Find Your<br />
              <span className="bg-lime px-2 rounded-lg">Perfect</span><br />
              Cannabis Strain
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
              Genetics, terpenes, effects, grow guides — the most detailed cannabis strain database on the internet. Free forever.
            </p>
            <div className="flex gap-3 mb-8">
              <Link href="/strains" className="bg-lime border-2 border-black font-black text-base px-6 py-3.5 rounded-xl shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all">
                Browse All Strains →
              </Link>
              <Link href="/learn" className="bg-white border-2 border-black font-black text-base px-6 py-3.5 rounded-xl hover:bg-black hover:text-white transition-all">
                Learn 📚
              </Link>
            </div>
            <div className="flex gap-6 flex-wrap">
              {[
                { num: strainsMeta.length + "+", label: "Strains" },
                { num: "20+", label: "Effects" },
                { num: "3", label: "Types" },
                { num: "Free", label: "Always" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="text-2xl font-black">{s.num}</span>
                  <div className="w-1.5 h-1.5 bg-lime border border-black rounded-full" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero strain cards — 3x2 compact grid with rank badges */}
          {(() => {
            // Diamond → Gold → Silver → Bronze → Amethyst → Sapphire
            type BadgeCfg = { gem: string; label: string; bg: string; text: string; border: string; glow: string };
            const BADGES: Record<number, BadgeCfg> = {
              1: { gem: "💎", label: "#1", bg: "linear-gradient(135deg,#b9f2ff,#e0f7ff,#7dd3fc)", text: "text-sky-900",    border: "border-sky-400",    glow: "shadow-[0_0_8px_rgba(125,211,252,0.9)]" },
              2: { gem: "🥇", label: "#2", bg: "linear-gradient(135deg,#fde68a,#fbbf24,#f59e0b)", text: "text-amber-900",  border: "border-amber-400",  glow: "shadow-[0_0_8px_rgba(251,191,36,0.9)]"  },
              3: { gem: "🥈", label: "#3", bg: "linear-gradient(135deg,#e5e7eb,#d1d5db,#9ca3af)", text: "text-slate-800",  border: "border-slate-400",  glow: "shadow-[0_0_8px_rgba(156,163,175,0.8)]" },
              4: { gem: "🥉", label: "#4", bg: "linear-gradient(135deg,#fed7aa,#fb923c,#ea580c)", text: "text-orange-900", border: "border-orange-400", glow: "shadow-[0_0_8px_rgba(251,146,60,0.9)]"  },
              5: { gem: "🔮", label: "#5", bg: "linear-gradient(135deg,#e9d5ff,#a855f7,#7c3aed)", text: "text-purple-100", border: "border-purple-400", glow: "shadow-[0_0_8px_rgba(168,85,247,0.9)]"  },
              6: { gem: "💙", label: "#6", bg: "linear-gradient(135deg,#bfdbfe,#3b82f6,#1d4ed8)", text: "text-white",      border: "border-blue-400",   glow: "shadow-[0_0_8px_rgba(59,130,246,0.9)]"  },
            };
            return (
              <div className="hidden lg:grid grid-cols-3 gap-2.5">
                {topStrains.slice(0, 6).map((s, i) => {
                  const rank = i + 1;
                  const badge = BADGES[rank] as BadgeCfg;
                  return (
                    <Link
                      key={s.slug}
                      href={`/strains/${s.slug}`}
                      className={`group bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all flex flex-col ${i % 2 === 0 ? "mt-4" : "mt-0"}`}
                    >
                      {/* image */}
                      <div className="relative w-full bg-off-white" style={{aspectRatio:"1/1"}}>
                        {s.image_url ? (
                          <Image src={s.image_url} alt={s.name} fill sizes="180px" className="object-contain p-2" priority={i < 3} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl">🌿</div>
                        )}
                        {/* rank badge — gem style */}
                        <span
                          className={`absolute top-1.5 left-1.5 inline-flex items-center gap-0.5 font-black rounded-full border text-[8px] px-1.5 py-0.5 leading-none whitespace-nowrap ${badge.text} ${badge.border} ${badge.glow}`}
                          style={{ background: badge.bg }}
                        >
                          <span>{badge.gem}</span>
                          <span>{badge.label}</span>
                        </span>
                      </div>
                      {/* info */}
                      <div className="px-2.5 py-2 border-t-2 border-black">
                        <div className="font-black text-[11px] leading-tight truncate">{s.name}</div>
                        <div className={`text-[10px] font-bold mt-0.5 ${s.type === "Indica" ? "text-indica" : s.type === "Sativa" ? "text-sativa" : "text-hybrid"}`}>
                          {s.type} · THC {s.thc_max}%
                        </div>
                        {(s.effects || []).length > 0 && (
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {(s.effects as string[]).slice(0, 1).map((e) => (
                              <span key={e} className="text-[8px] font-bold bg-lime/30 text-brand px-1 py-0.5 rounded-full leading-none">{e}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-lime border-y-2 border-black py-2.5 overflow-hidden whitespace-nowrap">
        <div className="inline-flex ticker-animate">
          {[...tickerStrains, ...tickerStrains].map((s, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-sm font-black px-7">
              {s.name}
              <span className="w-1.5 h-1.5 bg-brand rounded-full inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* TYPE CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Browse by <span className="bg-lime px-1.5 rounded">Type</span></h2>
            <p className="text-gray-500 mt-1.5 text-sm">Indica, Sativa, or Hybrid — find what fits your vibe</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { type: "Indica", emoji: "🍇", desc: "Body relaxation, deep sleep, pain relief. Best for evenings and unwinding after a long day.", bg: "bg-indica-bg", border: "border-indica/30", name_color: "text-indica" },
            { type: "Sativa", emoji: "☀️", desc: "Energetic, creative, uplifting. Perfect for daytime use, social situations, and creative projects.", bg: "bg-sativa-bg", border: "border-sativa/30", name_color: "text-sativa" },
            { type: "Hybrid", emoji: "⚡", desc: "Best of both worlds. Balanced effects shaped by genetics. The most diverse category.", bg: "bg-hybrid-bg", border: "border-hybrid/30", name_color: "text-hybrid" },
          ].map((t) => (
            <Link key={t.type} href={`/strains?type=${t.type}`} className={`${t.bg} border-2 border-black rounded-2xl p-7 cursor-pointer shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-1 transition-all block`}>
              <span className="text-4xl block mb-3">{t.emoji}</span>
              <h3 className={`text-2xl font-black mb-2 ${t.name_color}`}>{t.type}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{t.desc}</p>
              <span className={`text-xs font-black border-2 ${t.name_color} border-current px-3 py-1 rounded-full`}>
                {counts[t.type as keyof typeof counts]} strains
              </span>
            </Link>
          ))}
        </div>
      </section>



      {/* TOP STRAINS — 20 on homepage */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">🔥 Top <span className="bg-lime px-1.5 rounded">Strains</span></h2>
            <p className="text-gray-500 mt-1.5 text-sm">The most popular strains right now — click any for the full breakdown</p>
          </div>
          <Link href="/strains" className="text-sm font-bold border-2 border-black px-4 py-2 rounded-xl hover:bg-lime transition-all whitespace-nowrap">
            See All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {topStrains.map((s, idx) => (
            <StrainCard key={s.slug} strain={s} priority={idx < 4} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/strains" className="inline-flex items-center gap-2 bg-black text-white font-black px-8 py-4 rounded-2xl border-2 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all text-base">
            Browse All {strainsMeta.length}+ Strains →
          </Link>
        </div>
      </section>


      {/* ── SEED BANKS ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F7FFF0]">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-500 mb-5 shadow-sm">
              Verified Seed Banks
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-brand leading-tight mb-3">
              Find the Best{" "}
              <span className="bg-lime px-2 rounded-lg">Seed Banks</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              40+ vetted breeders and retailers — from boutique US genetics houses to world-famous international seed banks.
            </p>
          </div>

          {/* Logo cloud */}
          <div className="mb-10 sm:mb-12">
            <SeedbankLogoCloud />
          </div>

          {/* CTA card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-lime via-green-400 to-lime" />
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* Left col */}
              <div className="p-6 sm:p-8 md:border-r border-gray-100">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {([
                    { num: "40+",  label: "Verified Banks", bg: "bg-lime/30" },
                    { num: "14",   label: "Countries",       bg: "bg-blue-50" },
                    { num: "5+",   label: "Seed Types",      bg: "bg-green-50" },
                    { num: "4.5★", label: "Avg Rating",      bg: "bg-yellow-50" },
                  ] as {num:string;label:string;bg:string}[]).map(s => (
                    <div key={s.label} className={`${s.bg} rounded-2xl p-4`}>
                      <div className="text-2xl font-black text-brand leading-none mb-0.5">{s.num}</div>
                      <div className="text-[11px] text-gray-500 font-medium">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-6">
                  {["Feminized, Auto, Regular & more", "US domestic + worldwide shipping", "Boutique breeders to global retailers", "Socials, reviews & strain profiles"].map(f => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <span className="w-4 h-4 rounded-full bg-lime flex-shrink-0 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                        </svg>
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/seedbanks" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-brand text-lime font-black px-6 py-3 rounded-xl text-sm hover:bg-brand/90 transition-colors">
                  Browse All Seed Banks →
                </Link>
              </div>

              {/* Right col */}
              <div className="p-6 sm:p-8 bg-gray-50/60">
                <h3 className="text-base font-black text-brand mb-1">Shop by Region</h3>
                <p className="text-gray-400 text-xs mb-4">Find banks that ship to you</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {([
                    { label: "🇺🇸 USA",           href: "/seedbanks?country=USA",           count: "34 banks" },
                    { label: "🇨🇦 Canada",         href: "/seedbanks?country=Canada",         count: "8 banks"  },
                    { label: "🇳🇱 Netherlands",    href: "/seedbanks?country=Netherlands",    count: "7 banks"  },
                    { label: "🇪🇸 Spain",          href: "/seedbanks?country=Spain",          count: "5 banks"  },
                    { label: "🌍 Ships Worldwide", href: "/seedbanks?shipping=International", count: "42 banks" },
                    { label: "✓ Verified Only",    href: "/seedbanks?verified=true",          count: "20 banks" },
                  ] as {label:string;href:string;count:string}[]).map(r => (
                    <Link key={r.label} href={r.href} className="group flex flex-col gap-0.5 bg-white hover:bg-lime border border-gray-100 hover:border-lime rounded-xl px-3 py-2.5 transition-all">
                      <span className="text-xs font-semibold text-brand leading-tight">{r.label}</span>
                      <span className="text-[10px] text-gray-400 group-hover:text-brand/70">{r.count}</span>
                    </Link>
                  ))}
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Seed Types</p>
                <div className="flex flex-wrap gap-1.5">
                  {([
                    { label: "Feminized", color: "bg-pink-50 text-pink-700 border-pink-100",      href: "/seedbanks?type=Feminized" },
                    { label: "Auto",      color: "bg-blue-50 text-blue-700 border-blue-100",      href: "/seedbanks?type=Auto" },
                    { label: "Regular",   color: "bg-amber-50 text-amber-700 border-amber-100",   href: "/seedbanks?type=Regular" },
                    { label: "CBD",       color: "bg-green-50 text-green-700 border-green-100",   href: "/seedbanks?type=CBD" },
                    { label: "F1 Hybrid", color: "bg-purple-50 text-purple-700 border-purple-100",href: "/seedbanks?type=F1+Hybrid" },
                  ] as {label:string;color:string;href:string}[]).map(t => (
                    <Link key={t.label} href={t.href} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all hover:scale-105 ${t.color}`}>{t.label}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* LEARN HUB SECTION */}
      <section className="bg-white border-y-2 border-black py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-lime border-2 border-black px-3 py-1 rounded-full text-xs font-black mb-4">
                📚 Free Knowledge Hub
              </div>
              <h2 className="text-3xl font-black tracking-tight text-black">
                Learn Everything About <span className="bg-lime px-1.5 rounded">Cannabis</span>
              </h2>
              <p className="text-gray-500 mt-2 text-sm max-w-xl">
                From genetics to growing, effects to law — science-backed guides written for every level. Always 100% free.
              </p>
            </div>
            <Link href="/learn" className="text-sm font-bold border-2 border-black text-black px-4 py-2 rounded-xl hover:bg-lime transition-all whitespace-nowrap hidden md:block">
              All Topics →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {learnCategories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group flex items-center gap-3 bg-white hover:bg-lime border-2 border-black rounded-xl px-4 py-3.5 transition-all hover:-translate-y-0.5 shadow-brutal-sm hover:shadow-brutal"
              >
                <span className="text-2xl flex-shrink-0">{cat.emoji}</span>
                <div className="min-w-0">
                  <h3 className="font-black text-sm text-black leading-tight">{cat.title}</h3>
                  <p className="text-gray-500 text-xs leading-snug truncate">{cat.desc}</p>
                </div>
                <span className="ml-auto text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-all flex-shrink-0 text-sm">→</span>
              </Link>
            ))}
          </div>

          {/* Featured articles row */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { tag: "🔬 Science", title: "What Does THC Actually Do to Your Brain?", href: "/learn/effects/cannabinoids" },
              { tag: "🌿 Strains", title: "Indica vs. Sativa: Does It Actually Matter?", href: "/learn/strains/indica-vs-sativa" },
              { tag: "🍪 Consumption", title: "How Long Do Edibles Really Last?", href: "/learn/consumption/edibles" },
            ].map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group flex items-center gap-3 bg-white hover:bg-lime border-2 border-black rounded-xl p-4 transition-all shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black text-black uppercase tracking-widest mb-1 opacity-50">{article.tag}</div>
                  <div className="text-black font-bold text-sm leading-snug line-clamp-2">{article.title}</div>
                </div>
                <span className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all flex-shrink-0">→</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link href="/learn" className="inline-flex items-center gap-2 bg-lime border-2 border-black font-black px-6 py-3 rounded-xl text-sm">
              All Topics →
            </Link>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ─────────────────────────────────────────── */}
      {latestArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight">📰 Latest <span className="bg-lime px-1.5 rounded">News</span></h2>
              <p className="text-gray-500 mt-1.5 text-sm">Cannabis news, laws, events &amp; entertainment — updated daily</p>
            </div>
            <Link href="/news" className="text-sm font-bold border-2 border-black px-4 py-2 rounded-xl hover:bg-lime transition-all whitespace-nowrap hidden sm:block">
              All News →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {latestArticles.map((article: Article, i: number) => {
              const CAT_STYLE: Record<string, string> = {
                News: "bg-blue-100 text-blue-800 border-blue-200",
                Laws: "bg-red-100 text-red-800 border-red-200",
                Business: "bg-amber-100 text-amber-800 border-amber-200",
                Events: "bg-purple-100 text-purple-800 border-purple-200",
                Entertainment: "bg-pink-100 text-pink-800 border-pink-200",
              };
              const CAT_EMOJI: Record<string, string> = { News:"📰",Laws:"⚖️",Business:"💼",Events:"🎉",Entertainment:"🎬" };
              return (
                <Link key={article.slug} href={`/news/${article.slug}`} className="group block">
                  <article className="h-full bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all flex flex-col">
                    <div className="relative w-full aspect-video bg-brand flex-shrink-0">
                      {article.hero_image_url ? (
                        <Image src={article.hero_image_url} alt={article.title} fill className="object-cover" sizes="400px" priority={i === 0} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">📰</div>
                      )}
                      <span className={`absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black border ${CAT_STYLE[article.category] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                        {CAT_EMOJI[article.category] || "📄"} {article.category}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-4">
                      <h3 className="font-black text-sm text-brand leading-tight mb-2 group-hover:[text-shadow:0_1px_8px_rgba(170,255,0,0.35)] transition-all line-clamp-3 flex-1">
                        {article.title}
                      </h3>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <span className="text-[10px] font-bold text-gray-400">{new Date(article.published_at).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
                        <span className="text-[10px] text-gray-400">{article.reading_time} min</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
          <div className="mt-5 text-center sm:hidden">
            <Link href="/news" className="inline-flex items-center gap-2 bg-lime border-2 border-black font-black px-5 py-2.5 rounded-xl text-sm">All News →</Link>
          </div>
        </section>
      )}

      {/* ADVERTISE CTA — inviting to brand owners */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <Link href="/advertise" className="group block w-full">
          <div className="relative overflow-hidden bg-brand border-2 border-brand rounded-3xl shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all duration-200">
            {/* dot grid bg */}
            <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:"radial-gradient(circle, #AAFF00 1px, transparent 1px)",backgroundSize:"28px 28px"}} />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-8 sm:py-7">
              {/* Left — headline */}
              <div className="flex items-center gap-5 flex-1 min-w-0">
                <div className="hidden sm:flex flex-shrink-0 w-14 h-14 rounded-2xl bg-lime/15 border border-lime/30 items-center justify-center text-2xl">📢</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-lime/60">Advertising</span>
                    <span className="w-1 h-1 rounded-full bg-lime/40 inline-block" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-lime/60">100K+ Monthly Visitors</span>
                  </div>
                  <h3 className="text-white font-black text-lg sm:text-xl leading-tight">
                    Your brand deserves to be here.{" "}
                    <span className="text-lime">Partner with StrainHub.</span>
                  </h3>
                  <p className="text-white/50 text-sm mt-1 hidden sm:block">Reach growers, patients &amp; connoisseurs actively searching for products like yours.</p>
                </div>
              </div>
              {/* Right — stats + CTA */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="hidden md:flex gap-4 text-center">
                  {[["100K+","Monthly Visitors"],["5:20","Avg Session"],["62","Seed Banks"]].map(([n,l])=>(
                    <div key={l}>
                      <div className="text-lime font-black text-lg leading-none">{n}</div>
                      <div className="text-white/40 text-[10px] font-bold mt-0.5 whitespace-nowrap">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="h-10 w-px bg-white/10 hidden md:block" />
                <span className="flex-shrink-0 bg-lime text-brand font-black text-sm px-5 py-3 rounded-xl border border-brand group-hover:bg-lime/90 transition-all shadow-md">
                  Advertise with Us →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

    </>
  );
}