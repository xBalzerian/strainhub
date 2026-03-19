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

function ReactionsBar({ article }: { article: Article }) {
  const [counts, setCounts] = useState(article.reactions || { fire:0,heart:0,laugh:0,wow:0,thumbs:0 });
  const [reacted, setReacted] = useState<string | null>(null);
  useEffect(() => { setReacted(localStorage.getItem(`reacted_${article.slug}`)); }, [article.slug]);
  const handleReact = async (type: keyof typeof counts) => {
    if (reacted) return;
    const updated = await addReaction(article.slug, type);
    if (updated) setCounts(updated as typeof counts);
    setReacted(type);
    localStorage.setItem(`reacted_${article.slug}`, type);
  };
  const total = Object.values(counts).reduce((a,b) => a + b, 0);
  return (
    <div className="bg-white border-2 border-black rounded-2xl p-6 my-10 shadow-brutal">
      <p className="text-sm font-black text-brand uppercase tracking-widest text-center mb-1">React to this story</p>
      <p className="text-[11px] text-gray-400 text-center mb-5">{total > 0 ? `${total} reader${total !== 1 ? "s" : ""} reacted` : "Be the first to react"}</p>
      <div className="flex gap-2 flex-wrap justify-center">
        {REACTIONS.map((r) => (
          <button key={r.key} onClick={() => handleReact(r.key)} disabled={!!reacted}
            className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl border-2 transition-all min-w-[60px] ${
              reacted === r.key
                ? "bg-lime border-black scale-105 shadow-brutal"
                : reacted
                ? "bg-gray-50 border-gray-200 opacity-40 cursor-not-allowed"
                : "bg-white border-black hover:bg-lime/40 hover:border-black hover:-translate-y-0.5 cursor-pointer"
            }`}>
            <span className="text-xl leading-none">{r.emoji}</span>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-wide">{r.label}</span>
            {(counts as Record<string,number>)[r.key] > 0 && (
              <span className="text-[10px] font-black text-brand leading-none">{(counts as Record<string,number>)[r.key]}</span>
            )}
          </button>
        ))}
      </div>
      {reacted && <p className="text-[11px] text-gray-400 text-center mt-4 font-bold">Thanks! Share this with a fellow cannabis lover 🌿</p>}
    </div>
  );
}

// ── SIDEBAR WIDGET ───────────────────────────────────────────────────────────
function SidebarWidget({ title, children, accent = "bg-lime" }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal">
      <div className={`${accent} border-b-2 border-black px-4 py-2.5`}>
        <h3 className="text-[11px] font-black text-brand uppercase tracking-widest">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function ArticlePage({ article }: { article: Article }) {
  const style = CAT_STYLES[article.category] || CAT_STYLES.News;

  // Quick-links for "More in [Category]" based on category
  const CAT_LINKS: Record<string, { label: string; href: string }[]> = {
    Laws:    [
      { label: "US Federal Cannabis Laws", href: "/news?category=Laws" },
      { label: "State Legalization Tracker", href: "/news?category=Laws" },
      { label: "Cannabis & Banking Law", href: "/news?category=Laws" },
    ],
    Business: [
      { label: "Dispensary Industry News", href: "/news?category=Business" },
      { label: "Cannabis Investment Trends", href: "/news?category=Business" },
      { label: "MSO Operator News", href: "/news?category=Business" },
    ],
    Entertainment: [
      { label: "Celebrity Cannabis Brands", href: "/news?category=Entertainment" },
      { label: "Cannabis & Pop Culture", href: "/news?category=Entertainment" },
      { label: "Music & Cannabis", href: "/news?category=Entertainment" },
    ],
    News: [
      { label: "Breaking Cannabis News", href: "/news?category=News" },
      { label: "Cannabis Research Updates", href: "/news?category=News" },
      { label: "Industry Headlines", href: "/news" },
    ],
    Events: [
      { label: "Cannabis Events 2026", href: "/news?category=Events" },
      { label: "Trade Shows & Expos", href: "/news?category=Events" },
      { label: "Community Events", href: "/news?category=Events" },
    ],
  };
  const catLinks = CAT_LINKS[article.category] || CAT_LINKS.News;

  return (
    <main className="min-h-screen bg-off-white">

      {/* ── ARTICLE HEADER — white, clean ── */}
      <section className="bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-8">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-gray-400 font-bold mb-5">
            <Link href="/" className="hover:text-lime transition-colors">Home</Link>
            <span>›</span>
            <Link href="/news" className="hover:text-lime transition-colors">News</Link>
            <span>›</span>
            <Link href={`/news?category=${article.category}`} className="hover:text-lime transition-colors">{article.category}</Link>
          </nav>

          {/* category pill + breaking badge */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border ${style.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {article.category}
            </span>
            {Date.now() - new Date(article.published_at).getTime() < 10800000 && (
              <span className="inline-flex items-center gap-1 bg-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
                🔴 Breaking
              </span>
            )}
          </div>

          {/* H1 — the article headline */}
          <h1 className="text-3xl md:text-4xl font-black text-brand leading-tight mb-4 max-w-3xl">
            {article.title}
          </h1>

          {/* lead summary */}
          <p className="text-lg text-gray-500 leading-relaxed border-l-4 border-lime pl-4 mb-6 max-w-3xl">
            {article.summary}
          </p>

          {/* byline */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-lime border-2 border-black flex items-center justify-center font-black text-brand text-sm">A</div>
              <div>
                <address className="not-italic font-black text-sm text-brand">{article.author_name}</address>
                <div className="text-[11px] text-gray-400">{article.author_title} · StrainHub</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-gray-400 font-bold flex-wrap">
              <time dateTime={article.published_at}>📅 {formatUSDate(article.published_at)}</time>
              <span>⏱ {article.reading_time} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      {article.hero_image_url && (
        <div className="max-w-5xl mx-auto px-6 py-6">
          <figure className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-black shadow-brutal">
            <Image src={article.hero_image_url} alt={article.title} fill
              className="object-cover" priority sizes="(max-width:1024px) 100vw, 1024px" />
          </figure>
        </div>
      )}

      {/* ── BODY + SIDEBAR ── */}
      <div className="max-w-5xl mx-auto px-6 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">

          {/* ── MAIN CONTENT ── */}
          <article>
            <div className={`h-1 w-14 ${style.bar} rounded-full mb-6`} />
            <div
              className="
                prose prose-base max-w-none
                prose-headings:font-black prose-headings:text-brand prose-headings:tracking-tight
                prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3
                prose-h2:border-b-2 prose-h2:border-lime prose-h2:pb-2
                prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-brand
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-lime prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-brand prose-strong:font-black
                prose-li:text-gray-700 prose-li:my-1
                prose-ul:my-4 prose-ol:my-4
                prose-blockquote:border-l-4 prose-blockquote:border-lime
                prose-blockquote:bg-lime/10 prose-blockquote:px-4 prose-blockquote:py-2
                prose-blockquote:rounded-r-xl prose-blockquote:not-italic
              "
              dangerouslySetInnerHTML={{ __html: article.content || "" }}
            />

            {/* secondary image */}
            {article.thumbnail_url && (
              <figure className="my-8">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-black shadow-brutal">
                  <Image src={article.thumbnail_url} alt={`${article.title} — additional visual`}
                    fill className="object-cover" sizes="700px" />
                </div>
              </figure>
            )}

            {/* reactions */}
            <ReactionsBar article={article} />

            {/* FAQ */}
            {article.faq?.length > 0 && (
              <section aria-label="Frequently Asked Questions" className="my-8">
                <h2 className="text-xl font-black text-brand mb-5 flex items-center gap-2 border-b-2 border-lime pb-2">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {article.faq.map((f, i) => (
                    <details key={i} className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-brutal-sm group">
                      <summary className="px-5 py-4 font-black text-sm text-brand cursor-pointer flex items-center justify-between gap-3 list-none hover:bg-lime/10 transition-colors">
                        <span>{f.question}</span>
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-lime border border-black flex items-center justify-center text-xs font-black group-open:rotate-45 transition-transform duration-200">+</span>
                      </summary>
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{f.answer}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* related strains inline (mobile-friendly) */}
            {article.related_strains?.length > 0 && (
              <section className="my-8 lg:hidden">
                <h2 className="text-base font-black text-brand mb-3 flex items-center gap-2">
                  <span className="bg-lime border border-black w-5 h-5 rounded flex items-center justify-center text-[10px]">🌿</span>
                  Related Strains
                </h2>
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
            <div className="mt-10 pt-6 border-t-2 border-black flex items-center gap-3 flex-wrap">
              <Link href="/news" className="inline-flex items-center gap-2 bg-white border-2 border-black font-black px-4 py-2.5 rounded-xl text-sm shadow-brutal hover:bg-lime transition-all">← All News</Link>
              <Link href={`/news?category=${article.category}`} className="inline-flex items-center gap-2 bg-white border-2 border-black font-black px-4 py-2.5 rounded-xl text-sm shadow-brutal hover:bg-lime transition-all">More {article.category} →</Link>
              <Link href="/strains" className="inline-flex items-center gap-2 bg-lime border-2 border-black font-black px-4 py-2.5 rounded-xl text-sm shadow-brutal hover:shadow-brutal-lg transition-all">🌿 Explore Strains</Link>
            </div>
          </article>

          {/* ── SIDEBAR ── */}
          <aside className="hidden lg:flex flex-col gap-5 sticky top-6">

            {/* Author card */}
            <SidebarWidget title="✍️ Written By" accent="bg-lime">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-lime border-2 border-black flex items-center justify-center font-black text-brand text-lg flex-shrink-0">A</div>
                <div>
                  <div className="font-black text-sm text-brand">{article.author_name}</div>
                  <div className="text-[11px] text-gray-500">{article.author_title}</div>
                  <div className="text-[10px] text-gray-400">StrainHub Editorial</div>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Angelica covers cannabis laws, industry trends, and culture across the US and Canada.
                New stories every morning at 9am ET.
              </p>
            </SidebarWidget>

            {/* Related Strains */}
            {article.related_strains?.length > 0 && (
              <SidebarWidget title="🌿 Related Strains" accent="bg-lime/60">
                <div className="space-y-1">
                  {article.related_strains.map((slug) => (
                    <Link key={slug} href={`/strains/${slug}`}
                      className="flex items-center justify-between gap-2 text-sm font-bold text-brand hover:text-lime hover:bg-lime/10 px-2 py-2 rounded-lg transition-all group/item">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-lime border border-black flex-shrink-0" />
                        {slug.replace(/-/g," ").replace(/\w/g,c=>c.toUpperCase())}
                      </span>
                      <span className="text-gray-300 group-hover/item:text-lime text-xs">→</span>
                    </Link>
                  ))}
                </div>
                <Link href="/strains" className="mt-3 flex items-center justify-center gap-1 text-[11px] font-black text-brand bg-lime/20 hover:bg-lime border border-lime px-3 py-2 rounded-lg transition-all">
                  Browse All Strains →
                </Link>
              </SidebarWidget>
            )}

            {/* More in this category */}
            <SidebarWidget title={`📂 More in ${article.category}`} accent={`${CAT_STYLES[article.category]?.bg || "bg-gray-50"}`}>
              <div className="space-y-1 mb-3">
                {catLinks.map(l => (
                  <Link key={l.href+l.label} href={l.href}
                    className="flex items-center gap-2 text-[12px] font-bold text-gray-600 hover:text-brand hover:bg-lime/10 px-2 py-2 rounded-lg transition-all">
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot} flex-shrink-0`} />
                    {l.label}
                  </Link>
                ))}
              </div>
              <Link href={`/news?category=${article.category}`}
                className="flex items-center justify-center gap-1 text-[11px] font-black text-brand bg-gray-50 hover:bg-lime border-2 border-black px-3 py-2 rounded-lg transition-all shadow-brutal-sm">
                All {article.category} News →
              </Link>
            </SidebarWidget>

            {/* Seed Banks */}
            {article.related_seedbanks?.length > 0 && (
              <SidebarWidget title="🏦 Seed Banks Mentioned" accent="bg-amber-50">
                <div className="space-y-1">
                  {article.related_seedbanks.map((slug) => (
                    <Link key={slug} href={`/seedbanks/${slug}`}
                      className="flex items-center justify-between gap-2 text-sm font-bold text-brand hover:text-lime hover:bg-lime/10 px-2 py-2 rounded-lg transition-all group/item">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 border border-black flex-shrink-0" />
                        {slug.replace(/-/g," ").replace(/\w/g,c=>c.toUpperCase())}
                      </span>
                      <span className="text-gray-300 group-hover/item:text-lime text-xs">→</span>
                    </Link>
                  ))}
                </div>
                <Link href="/seedbanks" className="mt-3 flex items-center justify-center gap-1 text-[11px] font-black text-brand bg-amber-50 hover:bg-lime border border-amber-200 px-3 py-2 rounded-lg transition-all">
                  Compare Seed Banks →
                </Link>
              </SidebarWidget>
            )}

            {/* Quick explore */}
            <SidebarWidget title="🧭 Explore StrainHub" accent="bg-gray-50">
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  {e:"⚖️",label:"Laws",href:"/news?category=Laws"},
                  {e:"💼",label:"Business",href:"/news?category=Business"},
                  {e:"🎬",label:"Entertainment",href:"/news?category=Entertainment"},
                  {e:"🎉",label:"Events",href:"/news?category=Events"},
                  {e:"🌿",label:"Strains",href:"/strains"},
                  {e:"🧬",label:"Diagnose",href:"/diagnose"},
                  {e:"📖",label:"Learn",href:"/learn"},
                  {e:"💬",label:"AI Chat",href:"/chat"},
                ].map(l=>(
                  <Link key={l.href} href={l.href}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 hover:text-brand hover:bg-lime/20 px-2 py-2 rounded-lg transition-all">
                    <span>{l.e}</span> {l.label}
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
