"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Article } from "@/lib/articles";
import { addReaction } from "@/lib/articles";

const CAT_STYLES: Record<string, { pill: string; dot: string; bar: string }> = {
  News:          { pill: "bg-blue-50 text-blue-700 border-blue-200",       dot: "bg-blue-500",   bar: "bg-blue-500"   },
  Laws:          { pill: "bg-red-50 text-red-700 border-red-200",          dot: "bg-red-500",    bar: "bg-red-500"    },
  Business:      { pill: "bg-amber-50 text-amber-700 border-amber-200",    dot: "bg-amber-500",  bar: "bg-amber-500"  },
  Events:        { pill: "bg-purple-50 text-purple-700 border-purple-200", dot: "bg-purple-500", bar: "bg-purple-500" },
  Entertainment: { pill: "bg-pink-50 text-pink-700 border-pink-200",       dot: "bg-pink-500",   bar: "bg-pink-500"   },
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
  return (
    <div className="bg-white border-2 border-black rounded-2xl p-6 my-10 shadow-brutal">
      <p className="text-sm font-black text-brand uppercase tracking-widest text-center mb-5">What do you think?</p>
      <div className="flex gap-3 flex-wrap justify-center">
        {REACTIONS.map((r) => (
          <button key={r.key} onClick={() => handleReact(r.key)} disabled={!!reacted}
            className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl border-2 transition-all ${
              reacted === r.key ? "bg-lime border-black scale-110 shadow-brutal"
              : reacted ? "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed"
              : "bg-white border-black hover:bg-lime hover:shadow-brutal hover:-translate-y-0.5 cursor-pointer"
            }`}>
            <span className="text-2xl leading-none">{r.emoji}</span>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-wide">{r.label}</span>
            {(counts as Record<string,number>)[r.key] > 0 && (
              <span className="text-[10px] font-black text-brand">{(counts as Record<string,number>)[r.key]}</span>
            )}
          </button>
        ))}
      </div>
      {reacted && <p className="text-xs text-gray-400 font-bold text-center mt-4">Thanks for reacting! Share this article 👇</p>}
    </div>
  );
}

export default function ArticlePage({ article }: { article: Article }) {
  const style = CAT_STYLES[article.category] || CAT_STYLES.News;
  return (
    <main className="min-h-screen bg-off-white">

      {/* HEADER — clean white */}
      <section className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-8">
          <nav className="flex items-center gap-2 text-[11px] text-gray-400 font-bold mb-5">
            <Link href="/" className="hover:text-lime transition-colors">Home</Link>
            <span>›</span>
            <Link href="/news" className="hover:text-lime transition-colors">News</Link>
            <span>›</span>
            <Link href={`/news?category=${article.category}`} className="hover:text-lime transition-colors">{article.category}</Link>
          </nav>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border mb-4 ${style.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {article.category}
            {Date.now() - new Date(article.published_at).getTime() < 10800000 && (
              <span className="ml-1 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Breaking</span>
            )}
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-brand leading-tight mb-4">{article.title}</h1>
          <p className="text-lg text-gray-500 leading-relaxed border-l-4 border-lime pl-4 mb-6">{article.summary}</p>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-lime border-2 border-black flex items-center justify-center font-black text-brand text-sm shadow-brutal-sm">A</div>
              <div>
                <div className="font-black text-sm text-brand">{article.author_name}</div>
                <div className="text-[11px] text-gray-400">{article.author_title} · StrainHub</div>
              </div>
            </div>
            <div className="text-[11px] text-gray-400 font-bold">
              📅 {formatUSDate(article.published_at)}
              <span className="ml-3">⏱ {article.reading_time} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      {article.hero_image_url && (
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-black shadow-brutal">
            <Image src={article.hero_image_url} alt={article.title} fill className="object-cover" priority sizes="896px" />
          </div>
        </div>
      )}

      {/* BODY + SIDEBAR */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">

          {/* main */}
          <div>
            <div className={`h-1 w-16 ${style.bar} rounded-full mb-6`} />
            <div className="prose prose-base max-w-none
              prose-headings:font-black prose-headings:text-brand prose-headings:tracking-tight
              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-lime
              prose-h3:text-base prose-h3:mt-5 prose-h3:mb-2
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-lime prose-a:font-bold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-brand prose-strong:font-black
              prose-li:text-gray-700 prose-li:my-1
              prose-blockquote:border-l-4 prose-blockquote:border-lime prose-blockquote:bg-lime/10 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-xl prose-blockquote:not-italic"
              dangerouslySetInnerHTML={{ __html: article.content || "" }}
            />
            {article.thumbnail_url && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-black shadow-brutal my-8">
                <Image src={article.thumbnail_url} alt={`${article.title} — visual`} fill className="object-cover" sizes="600px" />
              </div>
            )}
            <ReactionsBar article={article} />
            {article.faq?.length > 0 && (
              <section className="my-8">
                <h2 className="text-xl font-black text-brand mb-5 flex items-center gap-2">
                  <span className="bg-lime border-2 border-black w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">?</span>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {article.faq.map((f, i) => (
                    <details key={i} className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-brutal-sm group">
                      <summary className="px-5 py-4 font-black text-sm text-brand cursor-pointer flex items-center justify-between gap-3 list-none hover:bg-lime/10 transition-colors">
                        {f.question}
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-lime border border-black flex items-center justify-center text-xs font-black group-open:rotate-45 transition-transform duration-200">+</span>
                      </summary>
                      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{f.answer}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}
            <div className="mt-10 pt-6 border-t-2 border-black flex items-center gap-3 flex-wrap">
              <Link href="/news" className="inline-flex items-center gap-2 bg-white border-2 border-black font-black px-4 py-2.5 rounded-xl text-sm shadow-brutal hover:bg-lime transition-all">← All News</Link>
              <Link href={`/news?category=${article.category}`} className="inline-flex items-center gap-2 bg-white border-2 border-black font-black px-4 py-2.5 rounded-xl text-sm shadow-brutal hover:bg-lime transition-all">More {article.category} →</Link>
              <Link href="/strains" className="inline-flex items-center gap-2 bg-lime border-2 border-black font-black px-4 py-2.5 rounded-xl text-sm shadow-brutal hover:shadow-brutal-lg transition-all">🌿 Browse Strains</Link>
            </div>
          </div>

          {/* sidebar */}
          <aside className="hidden lg:flex flex-col gap-5">
            {article.related_strains?.length > 0 && (
              <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal">
                <h3 className="text-[11px] font-black text-brand uppercase tracking-widest mb-4 flex items-center gap-2"><span className="text-lime">🌿</span> Related Strains</h3>
                <div className="space-y-1">
                  {article.related_strains.map((slug) => (
                    <Link key={slug} href={`/strains/${slug}`} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-lime hover:bg-lime/10 px-2 py-1.5 rounded-lg transition-all">
                      <span className="w-2 h-2 rounded-full bg-lime flex-shrink-0" />
                      {slug.replace(/-/g," ").replace(/\w/g,c=>c.toUpperCase())}
                    </Link>
                  ))}
                </div>
                <Link href="/strains" className="block text-xs font-black text-lime mt-3 hover:underline">All strains →</Link>
              </div>
            )}
            {article.related_seedbanks?.length > 0 && (
              <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal">
                <h3 className="text-[11px] font-black text-brand uppercase tracking-widest mb-4">🏦 Seed Banks</h3>
                <div className="space-y-1">
                  {article.related_seedbanks.map((slug) => (
                    <Link key={slug} href={`/seedbanks/${slug}`} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-lime hover:bg-lime/10 px-2 py-1.5 rounded-lg transition-all">
                      <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                      {slug.replace(/-/g," ").replace(/\w/g,c=>c.toUpperCase())}
                    </Link>
                  ))}
                </div>
                <Link href="/seedbanks" className="block text-xs font-black text-lime mt-3 hover:underline">All seed banks →</Link>
              </div>
            )}
            <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal">
              <h3 className="text-[11px] font-black text-brand uppercase tracking-widest mb-4">📚 Explore</h3>
              <div className="space-y-1 text-xs font-bold">
                {[
                  {label:"🔥 Top Strains",href:"/strains"},
                  {label:"⚖️ Laws & Policy",href:"/news?category=Laws"},
                  {label:"💼 Business",href:"/news?category=Business"},
                  {label:"🎉 Events",href:"/news?category=Events"},
                  {label:"🎬 Entertainment",href:"/news?category=Entertainment"},
                  {label:"🧬 AI Diagnosis",href:"/diagnose"},
                  {label:"🏦 Seed Banks",href:"/seedbanks"},
                  {label:"📖 Learn",href:"/learn"},
                ].map(l=>(
                  <Link key={l.href} href={l.href} className="flex items-center gap-2 text-gray-600 hover:text-lime hover:bg-lime/10 px-2 py-1.5 rounded-lg transition-all">{l.label}</Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
