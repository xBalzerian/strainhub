import Link from "next/link";
import { getTopStrains, getAllStrains } from "@/lib/strains";
import StrainCard from "@/components/StrainCard";

export default async function HomePage() {
  const [topStrains, allStrains] = await Promise.all([
    getTopStrains(12),
    getAllStrains(),
  ]);

  const counts = {
    Indica: allStrains.filter((s) => s.type === "Indica").length,
    Sativa: allStrains.filter((s) => s.type === "Sativa").length,
    Hybrid: allStrains.filter((s) => s.type === "Hybrid").length,
  };

  const tickerStrains = allStrains.slice(0, 20);

  return (
    <>
      {/* HERO */}
      <section className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-lime border-2 border-black px-4 py-1.5 rounded-full text-xs font-black shadow-brutal-sm mb-6">
              🌿 {allStrains.length}+ Strains Catalogued &amp; Growing
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
                { num: allStrains.length + "+", label: "Strains" },
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

          {/* Hero preview cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {topStrains.slice(0, 4).map((s, i) => (
              <Link
                key={s.slug}
                href={`/strains/${s.slug}`}
                className={`group bg-off-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-1 transition-all ${i % 2 === 0 ? "mt-6" : "-mt-3"}`}
              >
                {s.image_url && (
                  <img src={s.image_url} alt={s.name} className="w-full aspect-square object-cover" />
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

      {/* AD BANNER */}
      <div className="max-w-7xl mx-auto px-6 mb-2">
        <div className="bg-white border-2 border-black rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap shadow-brutal">
          <div>
            <strong className="text-base font-black block mb-1">
              🌱 ILGM Seed Bank
              <span className="text-[9px] text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded ml-2 font-normal">AD</span>
            </strong>
            <span className="text-sm text-gray-500">Premium cannabis seeds · Guaranteed germination · Ships worldwide discreetly</span>
          </div>
          <button className="bg-lime border-2 border-black font-black text-sm px-5 py-2.5 rounded-xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all whitespace-nowrap">
            Shop Seeds →
          </button>
        </div>
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
            View all {allStrains.length} →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {topStrains.map((s) => (
            <StrainCard key={s.slug} strain={s} />
          ))}
        </div>
      </section>

      {/* LEARN HUB */}
      <section className="bg-lime border-y-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight">📚 Learning Hub</h2>
              <p className="text-brand/70 mt-1.5 text-sm">Free educational content — always free, never gated</p>
            </div>
            <Link href="/learn" className="text-sm font-bold bg-white border-2 border-black px-4 py-2 rounded-xl hover:bg-brand hover:text-white transition-all">
              Explore All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🧬", title: "Terpene Guide", desc: "Myrcene, Limonene, Caryophyllene — what each terpene does.", href: "/learn/terpenes" },
              { icon: "🌡️", title: "Grow Guide", desc: "Week-by-week from seed to harvest.", href: "/learn/grow-guide" },
              { icon: "🔬", title: "Cannabinoids", desc: "THC, CBD, CBN, CBG, THCV explained.", href: "/learn/cannabinoids" },
              { icon: "🍂", title: "Deficiency Guide", desc: "Diagnose yellow leaves and plant problems.", href: "/learn/deficiencies" },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-1 transition-all block">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-black text-sm mb-1.5">{c.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
