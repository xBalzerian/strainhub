import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StrainHub — #1 Cannabis Strain Database | Effects, Genetics & Grow Info",
  description: "Discover 100+ cannabis strains with full terpene profiles, THC/CBD levels, effects, genetics, and grow guides. The most complete cannabis strain database — free forever.",
  keywords: ["cannabis strains", "marijuana strains", "strain database", "THC", "CBD", "terpenes", "cannabis effects", "grow guide", "best cannabis strains", "indica sativa hybrid"],
  openGraph: {
    title: "StrainHub — #1 Cannabis Strain Database",
    description: "Discover 100+ cannabis strains with full terpene profiles, effects, genetics, and grow guides. Free forever.",
    url: "https://www.strainhub.org",
    type: "website",
    images: [{ url: "https://www.strainhub.org/og-image.jpg", width: 1200, height: 630, alt: "StrainHub Cannabis Strain Database" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StrainHub — Cannabis Strain Database",
    description: "Explore 100+ cannabis strains with genetics, terpenes, effects, and grow guides.",
  },
  alternates: { canonical: "https://www.strainhub.org" },
};

import Link from "next/link";
import Image from "next/image";
import { getTopStrains, getAllStrainsMeta } from "@/lib/strains";
import StrainCard from "@/components/StrainCard";

// ISR: rebuild page every 6 hours — no Supabase hit on every visitor
export const revalidate = 21600;

export default async function HomePage() {
  // Two fast parallel queries — no more getAllStrains() fetching every field for all 100 strains
  const [topStrains, strainsMeta] = await Promise.all([
    getTopStrains(12),
    getAllStrainsMeta(),
  ]);

  const counts = {
    Indica: strainsMeta.filter((s) => s.type === "Indica").length,
    Sativa: strainsMeta.filter((s) => s.type === "Sativa").length,
    Hybrid: strainsMeta.filter((s) => s.type === "Hybrid").length,
  };

  const tickerStrains = strainsMeta.slice(0, 20);

  return (
    <>
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
              <Link
                href="/strains"
                className="bg-lime border-2 border-black font-black text-base px-6 py-3.5 rounded-xl shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all"
              >
                Browse All Strains →
              </Link>
              <Link
                href="/learn"
                className="bg-white border-2 border-black font-black text-base px-6 py-3.5 rounded-xl hover:bg-black hover:text-white transition-all"
              >
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

          {/* Hero preview cards — next/image for optimization */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {topStrains.slice(0, 4).map((s, i) => (
              <Link
                key={s.slug}
                href={`/strains/${s.slug}`}
                className={`group bg-off-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-1 transition-all ${i % 2 === 0 ? "mt-6" : "-mt-3"}`}
              >
                {s.image_url && (
                  <div className="relative w-full aspect-square">
                    <Image
                      src={s.image_url}
                      alt={s.name}
                      fill
                      sizes="200px"
                      className="object-contain p-1"
                      priority={i < 2}
                    />
                  </div>
                )}
                <div className="p-3">
                  <div className="font-black text-sm">{s.name}</div>
                  <div className={`text-xs font-bold mt-0.5 ${s.type === "Indica" ? "text-indica" : s.type === "Sativa" ? "text-sativa" : "text-hybrid"}`}>
                    {s.type} · THC {s.thc_max}%
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
            { type: "Indica", emoji: "🍇", desc: "Body relaxation, deep sleep, pain relief. Best for evenings and unwinding after a long day. Classic couch-lock vibes.", bg: "bg-indica-bg", border: "border-indica/30", name_color: "text-indica" },
            { type: "Sativa", emoji: "☀️", desc: "Energetic, creative, uplifting. Perfect for daytime use, social situations, and getting creative projects done.", bg: "bg-sativa-bg", border: "border-sativa/30", name_color: "text-sativa" },
            { type: "Hybrid", emoji: "⚡", desc: "Best of both worlds. Balanced effects shaped by genetics. The most diverse category — every hybrid is unique.", bg: "bg-hybrid-bg", border: "border-hybrid/30", name_color: "text-hybrid" },
          ].map((t) => (
            <Link
              key={t.type}
              href={`/strains?type=${t.type}`}
              className={`${t.bg} border-2 border-black rounded-2xl p-7 cursor-pointer shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-1 transition-all block`}
            >
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

      {/* AD BANNERS */}
      <div className="max-w-7xl mx-auto px-6 mb-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Crop King Seeds */}
        <a
          href="https://www.cropkingseeds.com"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="bg-white border-2 border-black rounded-2xl px-4 py-3 flex items-center gap-3 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all group"
        >
          <img src="/cropking-logo.png" alt="Crop King Seeds" className="h-10 w-10 rounded-xl object-contain flex-shrink-0 border border-gray-100" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-sm font-black truncate">Crop King Seeds</span>
              <span className="text-[8px] text-gray-400 border border-gray-200 px-1 py-0.5 rounded flex-shrink-0">AD</span>
            </div>
            <span className="text-[11px] text-gray-500 leading-tight line-clamp-1">80% germination guarantee · Ships worldwide</span>
          </div>
          <span className="flex-shrink-0 bg-lime border-2 border-black font-black text-[11px] px-3 py-2 rounded-xl shadow-brutal-sm group-hover:shadow-brutal transition-all whitespace-nowrap">
            Shop Seeds →
          </span>
        </a>

        {/* Rocket Seeds */}
        <a
          href="https://www.rocketseeds.com"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="bg-white border-2 border-black rounded-2xl px-4 py-3 flex items-center gap-3 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all group"
        >
          <img src="/rocket-logo.svg" alt="Rocket Seeds" className="h-10 w-10 rounded-xl object-contain flex-shrink-0 border border-gray-100" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-sm font-black truncate">Rocket Seeds</span>
              <span className="text-[8px] text-gray-400 border border-gray-200 px-1 py-0.5 rounded flex-shrink-0">AD</span>
            </div>
            <span className="text-[11px] text-gray-500 leading-tight line-clamp-1">Free shipping over $200 · 10 free seeds on $420+</span>
          </div>
          <span className="flex-shrink-0 bg-lime border-2 border-black font-black text-[11px] px-3 py-2 rounded-xl shadow-brutal-sm group-hover:shadow-brutal transition-all whitespace-nowrap">
            Shop Seeds →
          </span>
        </a>
      </div>

      {/* TOP STRAINS */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">🔥 Top <span className="bg-lime px-1.5 rounded">Strains</span></h2>
            <p className="text-gray-500 mt-1.5 text-sm">The most popular strains right now — click any for the full breakdown</p>
          </div>
          <Link
            href="/strains"
            className="text-sm font-bold border-2 border-black px-4 py-2 rounded-xl hover:bg-lime transition-all whitespace-nowrap"
          >
            See All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {topStrains.map((s, idx) => (
            <StrainCard key={s.slug} strain={s} priority={idx < 4} />
          ))}
        </div>
      </section>
    </>
  );
}
