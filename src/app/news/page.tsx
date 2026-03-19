"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NewsListing from "@/components/NewsListing";
import type { Article } from "@/lib/articles";

const CATEGORIES = ["All", "News", "Laws", "Business", "Events", "Entertainment"];
const GH_RAW = "https://raw.githubusercontent.com/xBalzerian/strainhub/main";

const TOP_STRAINS = [
  {name:"Blue Dream",      slug:"blue-dream",          type:"Hybrid"},
  {name:"Sour Diesel",     slug:"sour-diesel",          type:"Sativa"},
  {name:"Girl Scout Cookies",slug:"girl-scout-cookies", type:"Hybrid"},
  {name:"OG Kush",         slug:"og-kush",              type:"Hybrid"},
  {name:"Original Glue",   slug:"original-glue",        type:"Hybrid"},
  {name:"Pineapple Express",slug:"pineapple-express",   type:"Hybrid"},
  {name:"Gelato",          slug:"gelato",               type:"Hybrid"},
  {name:"Wedding Cake",    slug:"wedding-cake",         type:"Indica"},
  {name:"Runtz",           slug:"runtz",                type:"Hybrid"},
  {name:"Purple Punch",    slug:"purple-punch",         type:"Indica"},
];

const TOP_SEEDBANKS = [
  {name:"ILGM",              slug:"ilgm"},
  {name:"Seedsman",          slug:"seedsman"},
  {name:"Crop King Seeds",   slug:"crop-king-seeds"},
  {name:"Royal Queen Seeds", slug:"royal-queen-seeds"},
  {name:"MSNL",              slug:"msnl"},
  {name:"Attitude Seedbank", slug:"attitude-seedbank"},
  {name:"Barneys Farm",      slug:"barneys-farm"},
  {name:"Fast Buds",         slug:"fast-buds"},
];

const TYPE_DOT: Record<string,string> = {
  Hybrid:"bg-amber-400", Sativa:"bg-green-500", Indica:"bg-purple-500"
};

function SeedbankLogo({ slug, name }: { slug: string; name: string }) {
  const [err, setErr] = useState(false);
  return (
    <Link href={`/seedbanks/${slug}`}
      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-lime border border-transparent hover:border-black transition-all group">
      <div className="w-7 h-7 rounded-lg border border-gray-200 bg-white overflow-hidden flex-shrink-0 flex items-center justify-center">
        {!err
          ? <Image src={`${GH_RAW}/public/images/logos/${slug}.png`} alt={name} width={28} height={28} className="object-contain" onError={() => setErr(true)} />
          : <span className="text-[8px] font-black text-gray-400">{name.slice(0,3)}</span>
        }
      </div>
      <span className="text-[12px] font-bold text-brand">{name}</span>
    </Link>
  );
}

/* mobile accordion */
function MobileDropdown({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-black rounded-xl overflow-hidden shadow-brutal-sm">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-lime/20 transition-all">
        <span className="text-sm font-black text-brand">{title}</span>
        <span className={`text-lg font-black text-brand transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <div className="bg-off-white border-t-2 border-black px-3 py-3">{children}</div>}
    </div>
  );
}

function NewsPageInner() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("category") || "All";
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/articles?category=${cat}&limit=30`)
      .then(r => r.json())
      .then(data => { setArticles(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [cat]);

  return (
    <main className="min-h-screen bg-off-white">

      {/* ── MASTHEAD ── */}
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
              Laws, business, events &amp; entertainment — everything cannabis, written by{" "}
              <span className="font-black text-brand">Angelica M.</span> every morning.
            </p>
          </div>
          {/* Category tabs */}
          <div className="flex gap-0 border-t-2 border-black mt-5 overflow-x-auto">
            {CATEGORIES.map(c => (
              <a key={c} href={c === "All" ? "/news" : `/news?category=${c}`}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-r-2 border-black transition-all whitespace-nowrap flex-shrink-0 ${
                  cat === c ? "bg-lime text-brand" : "bg-white text-gray-600 hover:bg-lime/40 hover:text-brand"
                }`}>
                {c}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">

          {/* ARTICLES COLUMN */}
          <div>
            {/* Mobile dropdowns — show on small screens only */}
            <div className="lg:hidden space-y-3 mb-6">
              <MobileDropdown title="🌿 Top 10 Strains">
                <div className="space-y-0.5">
                  {TOP_STRAINS.map((s,i) => (
                    <Link key={s.slug} href={`/strains/${s.slug}`}
                      className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-lime border border-transparent hover:border-black transition-all">
                      <span className="text-[10px] font-black text-gray-300 w-4 text-right">{i+1}</span>
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${TYPE_DOT[s.type]||"bg-gray-400"}`} />
                      <span className="text-[12px] font-bold text-brand flex-1">{s.name}</span>
                      <span className="text-[9px] text-gray-400">{s.type}</span>
                    </Link>
                  ))}
                </div>
                <Link href="/strains" className="mt-2 flex items-center justify-center text-[11px] font-black bg-lime border border-black px-3 py-2 rounded-lg">
                  Browse All Strains →
                </Link>
              </MobileDropdown>

              <MobileDropdown title="🏦 Top Seed Banks">
                <div className="space-y-0.5">
                  {TOP_SEEDBANKS.map(b => <SeedbankLogo key={b.slug} slug={b.slug} name={b.name} />)}
                </div>
                <Link href="/seedbanks" className="mt-2 flex items-center justify-center text-[11px] font-black bg-white border-2 border-black px-3 py-2 rounded-lg hover:bg-lime transition-all shadow-brutal-sm">
                  Compare All Seed Banks →
                </Link>
              </MobileDropdown>
            </div>

            {loading ? (
              <div className="text-center py-20 text-gray-400 font-bold">Loading stories...</div>
            ) : (
              <NewsListing articles={articles} />
            )}
          </div>

          {/* SIDEBAR — desktop only */}
          <aside className="hidden lg:flex flex-col gap-5 sticky top-6">

            {/* TOP STRAINS */}
            <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal">
              <div className="bg-lime border-b-2 border-black px-4 py-2.5">
                <p className="text-[11px] font-black text-brand uppercase tracking-widest">🌿 Top 10 Strains</p>
              </div>
              <div className="p-3 space-y-0.5">
                {TOP_STRAINS.map((s,i) => (
                  <Link key={s.slug} href={`/strains/${s.slug}`}
                    className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-lime border border-transparent hover:border-black transition-all group">
                    <span className="text-[11px] font-black text-gray-300 w-4 text-right flex-shrink-0">{i+1}</span>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${TYPE_DOT[s.type]||"bg-gray-400"}`} />
                    <span className="text-[12px] font-bold text-brand flex-1">{s.name}</span>
                    <span className="text-[9px] text-gray-400">{s.type}</span>
                  </Link>
                ))}
              </div>
              <div className="px-3 pb-3">
                <Link href="/strains" className="flex items-center justify-center gap-1 text-[11px] font-black bg-lime/20 hover:bg-lime border border-lime px-3 py-2 rounded-lg transition-all text-brand">
                  Browse All {">"}370 Strains →
                </Link>
              </div>
            </div>

            {/* TOP SEEDBANKS */}
            <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal">
              <div className="bg-amber-50 border-b-2 border-black px-4 py-2.5">
                <p className="text-[11px] font-black text-brand uppercase tracking-widest">🏦 Top Seed Banks</p>
              </div>
              <div className="p-3 space-y-0.5">
                {TOP_SEEDBANKS.map(b => <SeedbankLogo key={b.slug} slug={b.slug} name={b.name} />)}
              </div>
              <div className="px-3 pb-3">
                <Link href="/seedbanks" className="flex items-center justify-center text-[11px] font-black bg-white hover:bg-lime border-2 border-black px-3 py-2 rounded-lg transition-all shadow-brutal-sm">
                  Compare All Seed Banks →
                </Link>
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal">
              <div className="bg-gray-50 border-b-2 border-black px-4 py-2.5">
                <p className="text-[11px] font-black text-brand uppercase tracking-widest">📂 Browse by Topic</p>
              </div>
              <div className="p-3 space-y-0.5">
                {[
                  {e:"⚖️",l:"Laws",        h:"/news?category=Laws"},
                  {e:"💼",l:"Business",    h:"/news?category=Business"},
                  {e:"🎬",l:"Entertainment",h:"/news?category=Entertainment"},
                  {e:"🎉",l:"Events",      h:"/news?category=Events"},
                  {e:"📰",l:"All News",    h:"/news"},
                ].map(x => (
                  <a key={x.h} href={x.h}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-lime border border-transparent hover:border-black transition-all text-[12px] font-bold text-brand">
                    <span>{x.e}</span>{x.l}
                  </a>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* SEO FOOTER */}
      <section className="bg-white border-t-2 border-black mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-sm font-black text-brand uppercase tracking-widest mb-5 border-b border-gray-200 pb-3">Explore StrainHub</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            <div>
              <div className="font-black text-brand mb-2">🌿 Top Strains</div>
              {TOP_STRAINS.slice(0,5).map(s => (
                <a key={s.slug} href={`/strains/${s.slug}`} className="block text-gray-500 hover:text-brand font-medium py-0.5">{s.name}</a>
              ))}
              <a href="/strains" className="block text-lime font-black mt-1">Browse All →</a>
            </div>
            <div>
              <div className="font-black text-brand mb-2">⚖️ News Topics</div>
              {["News","Laws","Business","Events","Entertainment"].map(c => (
                <a key={c} href={`/news?category=${c}`} className="block text-gray-500 hover:text-brand font-medium py-0.5">{c}</a>
              ))}
            </div>
            <div>
              <div className="font-black text-brand mb-2">🏦 Seed Banks</div>
              {TOP_SEEDBANKS.slice(0,5).map(s => (
                <a key={s.slug} href={`/seedbanks/${s.slug}`} className="block text-gray-500 hover:text-brand font-medium py-0.5">{s.name}</a>
              ))}
              <a href="/seedbanks" className="block text-lime font-black mt-1">All Seed Banks →</a>
            </div>
            <div>
              <div className="font-black text-brand mb-2">📚 Learn</div>
              {[
                {n:"Indica vs Sativa",h:"/learn/strains/indica-vs-sativa"},
                {n:"Cannabinoid Profiles",h:"/learn/strains/cannabinoid-profiles"},
                {n:"Grow Guide",h:"/learn/strains/grow-guide"},
                {n:"Cannabis Effects",h:"/learn/strains/effects"},
                {n:"AI Strain Diagnosis",h:"/diagnose"},
              ].map(l => (
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
