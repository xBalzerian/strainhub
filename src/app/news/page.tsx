import type { Metadata } from "next";
import { getArticles } from "@/lib/articles";
import NewsListing from "@/components/NewsListing";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "Cannabis News, Laws & Events | StrainHub" },
  description: "The latest cannabis news, legalization updates, business trends, events, and entertainment — updated daily by Angelica M. at StrainHub.",
  keywords: ["cannabis news","marijuana news 2026","weed legalization","cannabis business","marijuana laws","cannabis events","hemp news","cannabis USA","Canada marijuana"],
  alternates: { canonical: "https://www.strainhub.org/news" },
  openGraph: {
    title: "Cannabis News & Articles | StrainHub",
    description: "Daily cannabis news — legalization, business, events, and entertainment.",
    url: "https://www.strainhub.org/news",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

const CATEGORIES = ["All", "News", "Laws", "Business", "Events", "Entertainment"];

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const cat = searchParams.category || "All";
  const articles = await getArticles(30, cat);

  return (
    <main className="min-h-screen bg-off-white">

      {/* ── NEWSPAPER MASTHEAD ───────────────────────────────────────── */}
      <section className="bg-off-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-0">

          {/* Top bar — date + tagline */}
          <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-6">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Est. 2026 · StrainHub Editorial
            </span>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">
              Covering US &amp; Canada · Published Daily
            </span>
          </div>

          {/* Big masthead title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-lime border-2 border-black px-3 py-1 rounded-full text-brand text-[10px] font-black uppercase tracking-widest mb-3 shadow-brutal-sm">
              📰 Daily Cannabis News
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-brand tracking-tighter leading-none mb-2">
              The <span className="bg-lime px-2 rounded-lg">Hub</span> News
            </h1>
            <p className="text-gray-500 text-sm max-w-lg mx-auto mt-3">
              Laws, business, events &amp; entertainment — everything cannabis, written by{" "}
              <span className="font-black text-brand">Angelica M.</span> every morning.
            </p>
          </div>

          {/* Category filter tabs — newspaper section tabs */}
          <div className="flex gap-0 border-t-2 border-black mt-6">
            {CATEGORIES.map((c) => (
              <a
                key={c}
                href={c === "All" ? "/news" : `/news?category=${c}`}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-r-2 border-black transition-all ${
                  cat === c
                    ? "bg-lime text-brand"
                    : "bg-white text-gray-600 hover:bg-lime/40 hover:text-brand"
                }`}
              >
                {c}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <NewsListing articles={articles} />
      </section>

      {/* ── SEO FOOTER LINKS ── internal linking block */}
      <section className="bg-white border-t-2 border-black mt-4">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-sm font-black text-brand uppercase tracking-widest mb-5 border-b border-gray-200 pb-3">
            Explore StrainHub
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            <div>
              <div className="font-black text-brand mb-2">🌿 Top Strains</div>
              {[
                {name:"Blue Dream",slug:"blue-dream"},
                {name:"Sour Diesel",slug:"sour-diesel"},
                {name:"Girl Scout Cookies",slug:"girl-scout-cookies"},
                {name:"OG Kush",slug:"og-kush"},
                {name:"Gelato",slug:"gelato"},
              ].map(s => (
                <a key={s.slug} href={`/strains/${s.slug}`} className="block text-gray-500 hover:text-lime font-medium py-0.5">{s.name}</a>
              ))}
              <a href="/strains" className="block text-lime font-black mt-1">Browse All Strains →</a>
            </div>
            <div>
              <div className="font-black text-brand mb-2">⚖️ Laws &amp; News</div>
              {[
                {name:"News",cat:"News"},
                {name:"Legalization Updates",cat:"Laws"},
                {name:"Cannabis Business",cat:"Business"},
                {name:"Events",cat:"Events"},
                {name:"Entertainment",cat:"Entertainment"},
              ].map(c => (
                <a key={c.cat} href={`/news?category=${c.cat}`} className="block text-gray-500 hover:text-lime font-medium py-0.5">{c.name}</a>
              ))}
            </div>
            <div>
              <div className="font-black text-brand mb-2">🏦 Seed Banks</div>
              {[
                {name:"ILGM",slug:"ilgm"},
                {name:"Seedsman",slug:"seedsman"},
                {name:"Crop King Seeds",slug:"crop-king-seeds"},
                {name:"Royal Queen Seeds",slug:"royal-queen-seeds"},
                {name:"MSNL",slug:"msnl"},
              ].map(s => (
                <a key={s.slug} href={`/seedbanks/${s.slug}`} className="block text-gray-500 hover:text-lime font-medium py-0.5">{s.name}</a>
              ))}
              <a href="/seedbanks" className="block text-lime font-black mt-1">All Seed Banks →</a>
            </div>
            <div>
              <div className="font-black text-brand mb-2">📚 Learn</div>
              {[
                {name:"Indica vs Sativa",href:"/learn/strains/indica-vs-sativa"},
                {name:"Cannabinoid Profiles",href:"/learn/strains/cannabinoid-profiles"},
                {name:"Grow Guide",href:"/learn/strains/grow-guide"},
                {name:"Cannabis Effects",href:"/learn/strains/effects"},
                {name:"AI Strain Diagnosis",href:"/diagnose"},
              ].map(l => (
                <a key={l.href} href={l.href} className="block text-gray-500 hover:text-lime font-medium py-0.5">{l.name}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
