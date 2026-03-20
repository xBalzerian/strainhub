"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NewsListing from "@/components/NewsListing";
import type { Article } from "@/lib/articles";

const CATEGORIES = ["All", "News", "Laws", "Business", "Events", "Entertainment"];

async function fetchArticles(category: string): Promise<Article[]> {
  try {
    const url = category !== "All"
      ? `/api/articles?category=${encodeURIComponent(category)}&limit=30`
      : "/api/articles?limit=30";
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json() as Article[];
  } catch (e) {
    console.error("fetchArticles:", e);
    return [];
  }
}

function NewsPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const cat = searchParams.get("category") || "All";
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetchArticles(cat).then(data => {
      if (!cancelled) { setArticles(data); setLoading(false); }
    }).catch(() => {
      if (!cancelled) { setError(true); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [cat]);

  const switchTab = (c: string) => {
    const url = c === "All" ? "/news" : `/news?category=${c}`;
    router.push(url, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-off-white">

      {/* MASTHEAD */}
      <section className="bg-off-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-0">
          <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-5">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Est. 2026 · StrainHub Editorial</span>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">Covering US &amp; Canada · Published Daily</span>
          </div>
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-2 bg-lime border-2 border-black px-3 py-1 rounded-full text-brand text-[10px] font-black uppercase tracking-widest mb-3 shadow-brutal-sm">
              📰 Daily Cannabis News
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-brand tracking-tighter leading-none mb-2">
              The <span className="bg-lime px-2 rounded-lg">Hub</span> News
            </h1>
            <p className="text-gray-500 text-sm max-w-lg mx-auto mt-2">
              Laws, business, events &amp; entertainment — everything cannabis.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-t-2 border-black mt-5 overflow-x-auto">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => switchTab(c)}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-r-2 border-black transition-colors whitespace-nowrap flex-shrink-0 ${
                  cat === c ? "bg-lime text-brand" : "bg-white text-gray-600 hover:bg-lime/40"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3].map(i => (
              <div key={i} className="h-[380px] bg-white border-2 border-black rounded-2xl shadow-brutal">
                <div className="h-[220px] bg-gray-200 animate-pulse rounded-t-2xl" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                  <div className="h-3 bg-gray-100 animate-pulse rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white border-2 border-black rounded-2xl shadow-brutal">
            <p className="font-black text-brand">Could not load articles.</p>
            <button onClick={() => setLoading(true)} className="mt-4 px-6 py-2 bg-lime border-2 border-black rounded-xl font-black text-brand text-sm shadow-brutal-sm">Retry</button>
          </div>
        ) : (
          <NewsListing articles={articles} />
        )}
      </section>

      {/* SEO FOOTER */}
      <section className="bg-white border-t-2 border-black mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-sm font-black text-brand uppercase tracking-widest mb-5 border-b border-gray-200 pb-3">Explore StrainHub</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            <div>
              <div className="font-black text-brand mb-2">🌿 Top Strains</div>
              {[{name:"Blue Dream",slug:"blue-dream"},{name:"Sour Diesel",slug:"sour-diesel"},{name:"Girl Scout Cookies",slug:"girl-scout-cookies"},{name:"OG Kush",slug:"og-kush"},{name:"Gelato",slug:"gelato"}].map(s => (
                <a key={s.slug} href={`/strains/${s.slug}`} className="block text-gray-500 hover:text-brand font-medium py-0.5">{s.name}</a>
              ))}
              <a href="/strains" className="block text-lime font-black mt-1">Browse All →</a>
            </div>
            <div>
              <div className="font-black text-brand mb-2">⚖️ News Topics</div>
              {["News","Laws","Business","Events","Entertainment"].map(c => (
                <button key={c} onClick={() => switchTab(c)} className="block text-gray-500 hover:text-brand font-medium py-0.5 text-left w-full">{c}</button>
              ))}
            </div>
            <div>
              <div className="font-black text-brand mb-2">🏦 Seed Banks</div>
              {[{name:"ILGM",slug:"ilgm"},{name:"Seedsman",slug:"seedsman"},{name:"Crop King Seeds",slug:"crop-king-seeds"},{name:"Royal Queen Seeds",slug:"royal-queen-seeds"},{name:"MSNL",slug:"msnl"}].map(s => (
                <a key={s.slug} href={`/seedbanks/${s.slug}`} className="block text-gray-500 hover:text-brand font-medium py-0.5">{s.name}</a>
              ))}
              <a href="/seedbanks" className="block text-lime font-black mt-1">All Seed Banks →</a>
            </div>
            <div>
              <div className="font-black text-brand mb-2">📚 Learn</div>
              {[{n:"Indica vs Sativa",h:"/learn/strains/indica-vs-sativa"},{n:"Cannabinoid Profiles",h:"/learn/strains/cannabinoid-profiles"},{n:"Grow Guide",h:"/learn/strains/grow-guide"},{n:"Cannabis Effects",h:"/learn/strains/effects"},{n:"AI Strain Diagnosis",h:"/diagnose"}].map(l => (
                <a key={l.h} href={l.h} className="block text-gray-500 hover:text-brand font-medium py-0.5">{l.n}</a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-off-white flex items-center justify-center"><p className="text-gray-400 font-bold">Loading...</p></div>}>
      <NewsPageInner />
    </Suspense>
  );
}
