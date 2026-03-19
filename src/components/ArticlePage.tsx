"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Article } from "@/lib/articles";
import { addReaction } from "@/lib/articles";

const CAT_STYLES: Record<string, string> = {
  News: "bg-blue-100 text-blue-800 border-blue-200",
  Laws: "bg-red-100 text-red-800 border-red-200",
  Business: "bg-amber-100 text-amber-800 border-amber-200",
  Events: "bg-purple-100 text-purple-800 border-purple-200",
  Entertainment: "bg-pink-100 text-pink-800 border-pink-200",
};
const CAT_EMOJI: Record<string, string> = { News:"📰",Laws:"⚖️",Business:"💼",Events:"🎉",Entertainment:"🎬" };

const REACTIONS = [
  { key: "fire" as const,   emoji: "🔥", label: "Fire"      },
  { key: "heart" as const,  emoji: "❤️", label: "Love"      },
  { key: "wow" as const,    emoji: "😮", label: "Wow"       },
  { key: "laugh" as const,  emoji: "😂", label: "Haha"      },
  { key: "thumbs" as const, emoji: "👍", label: "Agree"     },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "Yesterday" : `${d}d ago`;
}

function ReactionsBar({ article }: { article: Article }) {
  const [counts, setCounts] = useState(article.reactions || { fire:0, heart:0, laugh:0, wow:0, thumbs:0 });
  const [reacted, setReacted] = useState<string | null>(null);

  useEffect(() => {
    const key = `reacted_${article.slug}`;
    setReacted(localStorage.getItem(key));
  }, [article.slug]);

  const handleReact = async (type: keyof typeof counts) => {
    const key = `reacted_${article.slug}`;
    if (reacted) return;
    const updated = await addReaction(article.slug, type);
    if (updated) setCounts(updated as typeof counts);
    setReacted(type);
    localStorage.setItem(key, type);
  };

  return (
    <div className="flex flex-col items-center gap-3 py-8 border-y-2 border-black my-10">
      <p className="text-sm font-black text-brand uppercase tracking-widest">What do you think?</p>
      <div className="flex gap-3 flex-wrap justify-center">
        {REACTIONS.map((r) => (
          <button
            key={r.key}
            onClick={() => handleReact(r.key)}
            disabled={!!reacted}
            className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-2xl border-2 transition-all ${
              reacted === r.key
                ? "bg-lime border-brand scale-110 shadow-brutal"
                : reacted
                ? "bg-white border-gray-200 opacity-50 cursor-not-allowed"
                : "bg-white border-black hover:bg-lime hover:shadow-brutal hover:-translate-y-0.5 cursor-pointer"
            }`}
          >
            <span className="text-2xl leading-none">{r.emoji}</span>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-wide">{r.label}</span>
            {counts[r.key] > 0 && (
              <span className="text-[10px] font-black text-brand">{counts[r.key]}</span>
            )}
          </button>
        ))}
      </div>
      {reacted && <p className="text-xs text-gray-400 font-bold">Thanks for your reaction!</p>}
    </div>
  );
}

export default function ArticlePage({ article }: { article: Article }) {
  const cat = CAT_STYLES[article.category] || "bg-gray-100 text-gray-700 border-gray-200";
  const emoji = CAT_EMOJI[article.category] || "📄";

  return (
    <main className="min-h-screen bg-off-white">
      {/* ── HERO ── */}
      {article.hero_image_url && (
        <div className="relative w-full h-[40vh] md:h-[55vh] bg-brand border-b-2 border-black">
          <Image src={article.hero_image_url} alt={article.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-8">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border mb-3 ${cat}`}>
              {emoji} {article.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight drop-shadow-lg">
              {article.title}
            </h1>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* no-image title */}
        {!article.hero_image_url && (
          <>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border mb-4 ${cat}`}>
              {emoji} {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-brand leading-tight mb-6">{article.title}</h1>
          </>
        )}

        {/* byline */}
        <div className="flex items-center justify-between gap-4 mt-6 mb-8 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-lime border-2 border-brand flex items-center justify-center font-black text-brand text-sm">A</div>
            <div>
              <div className="font-black text-sm text-brand">{article.author_name}</div>
              <div className="text-[11px] text-gray-400">{article.author_title}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400 font-bold">
            <span>📅 {timeAgo(article.published_at)}</span>
            <span>⏱ {article.reading_time} min read</span>
          </div>
        </div>

        {/* summary lead */}
        {article.summary && (
          <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-lime pl-4 mb-8 font-medium italic">
            {article.summary}
          </p>
        )}

        {/* article body */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-black prose-headings:text-brand prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b-2 prose-h2:border-lime prose-h2:pb-2
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-lime prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-brand prose-strong:font-black
            prose-ul:my-4 prose-li:text-gray-700 prose-li:my-1
            prose-blockquote:border-l-4 prose-blockquote:border-lime prose-blockquote:bg-lime/10 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:rounded-r-xl prose-blockquote:not-italic"
          dangerouslySetInnerHTML={{ __html: article.content || "" }}
        />

        {/* thumbnail image 2 */}
        {article.thumbnail_url && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-black shadow-brutal my-8">
            <Image src={article.thumbnail_url} alt={`${article.title} — detail`} fill className="object-cover" />
          </div>
        )}

        {/* reactions */}
        <ReactionsBar article={article} />

        {/* FAQ */}
        {article.faq?.length > 0 && (
          <section className="my-10">
            <h2 className="text-2xl font-black text-brand mb-5 border-b-2 border-lime pb-2">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {article.faq.map((f, i) => (
                <details key={i} className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal-sm group">
                  <summary className="px-5 py-4 font-black text-sm text-brand cursor-pointer flex items-center justify-between gap-3 list-none">
                    {f.question}
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-lime border border-brand flex items-center justify-center text-xs font-black group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t-2 border-black pt-4">{f.answer}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* related strains */}
        {article.related_strains?.length > 0 && (
          <section className="my-10">
            <h2 className="text-xl font-black text-brand mb-4">🌿 Related Strains</h2>
            <div className="flex flex-wrap gap-2">
              {article.related_strains.map((slug) => (
                <Link key={slug} href={`/strains/${slug}`}
                  className="bg-white border-2 border-black px-3 py-1.5 rounded-xl text-sm font-bold hover:bg-lime transition-all shadow-brutal-sm">
                  {slug.replace(/-/g, " ").replace(/\w/g, c => c.toUpperCase())}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* related seedbanks */}
        {article.related_seedbanks?.length > 0 && (
          <section className="my-10">
            <h2 className="text-xl font-black text-brand mb-4">🏦 Related Seed Banks</h2>
            <div className="flex flex-wrap gap-2">
              {article.related_seedbanks.map((slug) => (
                <Link key={slug} href={`/seedbanks/${slug}`}
                  className="bg-white border-2 border-black px-3 py-1.5 rounded-xl text-sm font-bold hover:bg-lime transition-all shadow-brutal-sm">
                  {slug.replace(/-/g, " ").replace(/\w/g, c => c.toUpperCase())}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* back */}
        <div className="mt-12 pt-8 border-t-2 border-black">
          <Link href="/news" className="inline-flex items-center gap-2 bg-brand text-white font-black px-5 py-3 rounded-xl border-2 border-brand shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all">
            ← Back to News
          </Link>
        </div>
      </div>
    </main>
  );
}
