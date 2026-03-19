"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Article } from "@/lib/articles";
import { addReaction } from "@/lib/articles";

const CAT_STYLES: Record<string, { pill: string; dot: string; bar: string; bg: string }> = {
  News:          { pill: "bg-blue-50 text-blue-700 border-blue-200",       dot: "bg-blue-500",   bar: "bg-blue-500",   bg: "bg-blue-50"   },
  Laws:          { pill: "bg-red-50 text-red-700 border-red-200",          dot: "bg-red-500",    bar: "bg-red-500",    bg: "bg-red-50"    },
  Business:      { pill: "bg-amber-50 text-amber-700 border-amber-200",    dot: "bg-amber-500",  bar: "bg-amber-500",  bg: "bg-amber-50"  },
  Events:        { pill: "bg-purple-50 text-purple-700 border-purple-200", dot: "bg-purple-500", bar: "bg-purple-500", bg: "bg-purple-50" },
  Entertainment: { pill: "bg-pink-50 text-pink-700 border-pink-200",       dot: "bg-pink-500",   bar: "bg-pink-500",   bg: "bg-pink-50"   },
};

const REACTIONS = [
  { key: "fire"   as const, emoji: "🔥", label: "Fire"  },
  { key: "heart"  as const, emoji: "❤️", label: "Love"  },
  { key: "wow"    as const, emoji: "😮", label: "Wow"   },
  { key: "laugh"  as const, emoji: "😂", label: "Haha"  },
  { key: "thumbs" as const, emoji: "👍", label: "Agree" },
];

function formatUSDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    weekday: "long", month: "long", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  }) + " ET";
}

/* ── REACTIONS — compact single row, works perfectly on mobile ── */
function ReactionsBar({ article }: { article: Article }) {
  const [counts, setCounts] = useState(article.reactions || { fire:0,heart:0,laugh:0,wow:0,thumbs:0 });
  const [reacted, setReacted] = useState<string | null>(null);

  useEffect(() => {
    setReacted(localStorage.getItem(`reacted_${article.slug}`));
  }, [article.slug]);

  const handleReact = async (type: keyof typeof counts) => {
    if (reacted) return;
    const updated = await addReaction(article.slug, type);
    if (updated) setCounts(updated as typeof counts);
    setReacted(type);
    localStorage.setItem(`reacted_${article.slug}`, type);
  };

  const total = Object.values(counts as Record<string,number>).reduce((a,b) => a + b, 0);

  return (
    <div className="my-8 bg-white border-2 border-black rounded-2xl shadow-brutal overflow-hidden">
      {/* header row */}
      <div className="bg-lime border-b-2 border-black px-4 py-2.5 flex items-center justify-between">
        <span className="text-[11px] font-black text-brand uppercase tracking-widest">React to this story</span>
        {total > 0 && (
          <span className="text-[10px] font-black text-brand/60">{total} reaction{total !== 1 ? "s" : ""}</span>
        )}
      </div>
      {/* compact single row of emoji buttons */}
      <div className="px-4 py-3 flex items-center gap-2">
        {REACTIONS.map((r) => {
          const count = (counts as Record<string,number>)[r.key] || 0;
          const isMe = reacted === r.key;
          return (
            <button
              key={r.key}
              onClick={() => handleReact(r.key)}
              disabled={!!reacted}
              title={r.label}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl border-2 transition-all text-center ${
                isMe
                  ? "bg-lime border-black scale-105 shadow-brutal-sm"
                  : reacted
                  ? "bg-gray-50 border-gray-200 opacity-40 cursor-not-allowed"
                  : "bg-white border-gray-200 hover:border-black hover:bg-lime/30 cursor-pointer active:scale-95"
              }`}
            >
              <span className="text-lg leading-none">{r.emoji}</span>
              {count > 0 ? (
                <span className="text-[9px] font-black text-brand leading-none mt-0.5">{count}</span>
              ) : (
                <span className="text-[9px] text-gray-400 leading-none mt-0.5">{r.label}</span>
              )}
            </button>
          );
        })}
      </div>
      {reacted && (
        <div className="px-4 pb-3 text-[11px] text-gray-400 font-bold text-center -mt-1">
          Thanks! Share this with a fellow cannabis lover 🌿
        </div>
      )}
    </div>
  );
}

/* ── SIDEBAR WIDGET ── */
function SidebarWidget({
  title, children, accent = "bg-lime",
}: {
  title: string; children: React.ReactNode; accent?: string;
}) {
  return (
    <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal">
      <div className={`${accent} border-b-2 border-black px-4 py-2.5`}>
        <h3 className="text-[11px] font-black text-brand uppercase tracking-widest">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/* ── MAIN COMPONENT ── */
export default function ArticlePage({ article }: { article: Article }) {
  const style = CAT_STYLES[article.category] || CAT_STYLES.News;

  const CAT_LINKS: Record<string, { label: string; href: string }[]> = {
    Laws:          [{ label:"US Federal Cannabis Laws", href:"/news?category=Laws" },{ label:"State Legalization Tracker", href:"/news?category=Laws" },{ label:"Cannabis Banking Reform", href:"/news?category=Laws" }],
    Business:      [{ label:"Dispensary Industry News", href:"/news?category=Business" },{ label:"Cannabis Investment Trends", href:"/news?category=Business" },{ label:"MSO Operator News", href:"/news?category=Business" }],
    Entertainment: [{ label:"Celebrity Cannabis Brands", href:"/news?category=Entertainment" },{ label:"Cannabis & Pop Culture", href:"/news?category=Entertainment" },{ label:"Music & Cannabis", href:"/news?category=Entertainment" }],
    News:          [{ label:"Breaking Cannabis News", href:"/news?category=News" },{ label:"Cannabis Research Updates", href:"/news?category=News" },{ label:"Industry Headlines", href:"/news" }],
    Events:        [{ label:"Cannabis Events 2026", href:"/news?category=Events" },{ label:"Trade Shows & Expos", href:"/news?category=Events" },{ label:"Community Events", href:"/news?category=Events" }],
  };
  const catLinks = CAT_LINKS[article.category] || CAT_LINKS.News;

  return (
    <main className="min-h-screen bg-off-white">

      {/* ─── HEADER — white, clean ─────────────────────────────────────── */}
      <section className="bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-7">

          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold mb-5">
            <Link href="/" className="hover:text-lime transition-colors">Home</Link>
            <span>›</span>
            <Link href="/news" className="hover:text-lime transition-colors">News</Link>
            <span>›</span>
            <Link href={`/news?category=${article.category}`} className="hover:text-lime transition-colors">{article.category}</Link>
          </nav>

          {/* pills row */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border ${style.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {article.category}
            </span>
            {Date.now() - new Date(article.published_at).getTime() < 10800000 && (
              <span className="inline-flex items-center gap-1 bg-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide animate-pulse">
                🔴 Breaking
              </span>
            )}
          </div>

          {/* H1 */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand leading-tight mb-4 max-w-3xl">
            {article.title}
          </h1>

          {/* lead */}
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed border-l-4 border-lime pl-4 mb-6 max-w-3xl">
            {article.summary}
          </p>

          {/* byline */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-lime border-2 border-black flex items-center justify-center font-black text-brand text-sm flex-shrink-0">A</div>
              <div>
                <address className="not-italic font-black text-sm text-brand leading-tight">{article.author_name}</address>
                <div className="text-[10px] text-gray-400">{article.author_title} · StrainHub</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-gray-400 font-bold flex-wrap">
              <time dateTime={article.published_at}>📅 {formatUSDate(article.published_at)}</time>
              <span className="hidden sm:inline">·</span>
              <span>⏱ {article.reading_time} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HERO IMAGE — contain, no crop ─────────────────────────────── */}
      {article.hero_image_url && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          <figure className="relative w-full rounded-2xl overflow-hidden border-2 border-black shadow-brutal bg-brand">
            {/* use a fixed height, object-contain so full image shows */}
            <div className="relative w-full" style={{ height: "min(56vw, 480px)" }}>
              <Image
                src={article.hero_image_url}
                alt={article.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width:1024px) 100vw, 1024px"
              />
            </div>
          </figure>
        </div>
      )}

      {/* ─── BODY + SIDEBAR ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px] gap-8 items-start">

          {/* ── MAIN CONTENT ── */}
          <article>
            {/* category accent bar */}
            <div className={`h-1 w-12 ${style.bar} rounded-full mb-6`} />

            {/* ARTICLE BODY — uses .article-body CSS class for guaranteed H2/H3 styles */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content || "" }}
            />

            {/* secondary image */}
            {article.thumbnail_url && (
              <figure className="my-8">
                <div className="relative w-full rounded-2xl overflow-hidden border-2 border-black shadow-brutal bg-brand"
                     style={{ height: "min(56vw, 420px)" }}>
                  <Image
                    src={article.thumbnail_url}
                    alt={`${article.title} — additional visual`}
                    fill
                    className="object-contain"
                    sizes="700px"
                  />
                </div>
              </figure>
            )}

            {/* reactions */}
            <ReactionsBar article={article} />

            {/* FAQ */}
            {article.faq?.length > 0 && (
              <section aria-label="Frequently Asked Questions" className="my-8">
                <h2 className="text-xl font-black text-brand mb-5 border-b-2 border-lime pb-2">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {article.faq.map((f, i) => (
                    <details key={i} className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-brutal-sm group">
                      <summary className="px-4 py-3.5 font-black text-sm text-brand cursor-pointer flex items-center justify-between gap-3 list-none hover:bg-lime/10 transition-colors">
                        <span>{f.question}</span>
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-lime border border-black flex items-center justify-center text-xs font-black group-open:rotate-45 transition-transform duration-200">+</span>
                      </summary>
                      <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{f.answer}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* related strains — mobile only (sidebar hidden on mobile) */}
            {article.related_strains?.length > 0 && (
              <section className="my-6 lg:hidden">
                <h3 className="text-sm font-black text-brand mb-3 flex items-center gap-2">
                  <span className="bg-lime border border-black w-5 h-5 rounded flex items-center justify-center text-[10px]">🌿</span>
                  Related Strains
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.related_strains.map((slug) => (
                    <Link key={slug} href={`/strains/${slug}`}
                      className="bg-white border-2 border-black px-3 py-1.5 rounded-xl text-xs font-black hover:bg-lime transition-all shadow-brutal-sm">
                      {slug.replace(/-/g," ").replace(/\w/g,c=>c.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* back nav */}
            <div className="mt-10 pt-5 border-t-2 border-black flex items-center gap-2.5 flex-wrap">
              <Link href="/news" className="inline-flex items-center gap-1.5 bg-white border-2 border-black font-black px-4 py-2.5 rounded-xl text-sm shadow-brutal hover:bg-lime transition-all">← All News</Link>
              <Link href={`/news?category=${article.category}`} className="inline-flex items-center gap-1.5 bg-white border-2 border-black font-black px-4 py-2.5 rounded-xl text-sm shadow-brutal hover:bg-lime transition-all">More {article.category} →</Link>
              <Link href="/strains" className="inline-flex items-center gap-1.5 bg-lime border-2 border-black font-black px-4 py-2.5 rounded-xl text-sm shadow-brutal hover:shadow-brutal-lg transition-all">🌿 Explore Strains</Link>
            </div>
          </article>

          {/* ── SIDEBAR ── */}
          <aside className="hidden lg:flex flex-col gap-5 sticky top-6">

            {/* Author */}
            <SidebarWidget title="✍️ Written By" accent="bg-lime">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-lime border-2 border-black flex items-center justify-center font-black text-brand text-base flex-shrink-0">A</div>
                <div>
                  <div className="font-black text-sm text-brand">{article.author_name}</div>
                  <div className="text-[11px] text-gray-500 leading-tight">{article.author_title}</div>
                  <div className="text-[10px] text-gray-400">StrainHub · Daily at 9am ET</div>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Angelica covers cannabis laws, industry trends, and culture across the US and Canada. New story every morning.
              </p>
            </SidebarWidget>

            {/* Related Strains */}
            {article.related_strains?.length > 0 && (
              <SidebarWidget title="🌿 Related Strains" accent="bg-lime/50">
                <div className="space-y-0.5 mb-3">
                  {article.related_strains.map((slug) => (
                    <Link key={slug} href={`/strains/${slug}`}
                      className="flex items-center justify-between gap-2 text-[13px] font-bold text-brand hover:bg-lime/20 px-2 py-2 rounded-lg transition-all group/s">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-lime border border-black flex-shrink-0" />
                        {slug.replace(/-/g," ").replace(/\w/g,c=>c.toUpperCase())}
                      </span>
                      <span className="text-gray-300 group-hover/s:text-lime text-xs transition-colors">→</span>
                    </Link>
                  ))}
                </div>
                <Link href="/strains" className="flex items-center justify-center gap-1 text-[11px] font-black text-brand bg-lime/20 hover:bg-lime border border-lime px-3 py-2 rounded-lg transition-all">
                  Browse All Strains →
                </Link>
              </SidebarWidget>
            )}

            {/* More in Category */}
            <SidebarWidget title={`📂 More ${article.category} News`} accent={`${CAT_STYLES[article.category]?.bg || "bg-gray-50"}`}>
              <div className="space-y-0.5 mb-3">
                {catLinks.map(l => (
                  <Link key={l.label} href={l.href}
                    className="flex items-center gap-2 text-[12px] font-bold text-gray-600 hover:text-brand hover:bg-lime/10 px-2 py-2 rounded-lg transition-all">
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot} flex-shrink-0`} />
                    {l.label}
                  </Link>
                ))}
              </div>
              <Link href={`/news?category=${article.category}`}
                className="flex items-center justify-center gap-1 text-[11px] font-black text-brand bg-white hover:bg-lime border-2 border-black px-3 py-2 rounded-lg transition-all shadow-brutal-sm">
                All {article.category} News →
              </Link>
            </SidebarWidget>

            {/* Seed Banks */}
            {article.related_seedbanks?.length > 0 && (
              <SidebarWidget title="🏦 Seed Banks" accent="bg-amber-50">
                <div className="space-y-0.5 mb-3">
                  {article.related_seedbanks.map((slug) => (
                    <Link key={slug} href={`/seedbanks/${slug}`}
                      className="flex items-center justify-between gap-2 text-[13px] font-bold text-brand hover:bg-lime/10 px-2 py-2 rounded-lg transition-all group/sb">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 border border-black flex-shrink-0" />
                        {slug.replace(/-/g," ").replace(/\w/g,c=>c.toUpperCase())}
                      </span>
                      <span className="text-gray-300 group-hover/sb:text-lime text-xs transition-colors">→</span>
                    </Link>
                  ))}
                </div>
                <Link href="/seedbanks" className="flex items-center justify-center gap-1 text-[11px] font-black text-brand bg-amber-50 hover:bg-lime border border-amber-300 px-3 py-2 rounded-lg transition-all">
                  Compare Seed Banks →
                </Link>
              </SidebarWidget>
            )}

            {/* Explore grid */}
            <SidebarWidget title="🧭 Explore StrainHub" accent="bg-gray-50">
              <div className="grid grid-cols-2 gap-1">
                {[
                  {e:"⚖️",l:"Laws",h:"/news?category=Laws"},
                  {e:"💼",l:"Business",h:"/news?category=Business"},
                  {e:"🎬",l:"Entertainment",h:"/news?category=Entertainment"},
                  {e:"🎉",l:"Events",h:"/news?category=Events"},
                  {e:"🌿",l:"Strains",h:"/strains"},
                  {e:"🧬",l:"Diagnose",h:"/diagnose"},
                  {e:"📖",l:"Learn",h:"/learn"},
                  {e:"💬",l:"AI Chat",h:"/chat"},
                ].map(x=>(
                  <Link key={x.h} href={x.h}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 hover:text-brand hover:bg-lime/20 px-2 py-1.5 rounded-lg transition-all">
                    <span>{x.e}</span>{x.l}
                  </Link>
                ))}
              </div>
            </SidebarWidget>

          </aside>
        </div>
      </div>
    </main>
  );
}
