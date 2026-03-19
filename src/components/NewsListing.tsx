"use client";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/articles";

const CAT_STYLES: Record<string, { pill: string; dot: string }> = {
  News:          { pill: "bg-blue-50 text-blue-700 border-blue-200",       dot: "bg-blue-500"   },
  Laws:          { pill: "bg-red-50 text-red-700 border-red-200",          dot: "bg-red-500"    },
  Business:      { pill: "bg-amber-50 text-amber-700 border-amber-200",    dot: "bg-amber-500"  },
  Events:        { pill: "bg-purple-50 text-purple-700 border-purple-200", dot: "bg-purple-500" },
  Entertainment: { pill: "bg-pink-50 text-pink-700 border-pink-200",       dot: "bg-pink-500"   },
};
const CAT_EMOJI: Record<string, string> = { News:"📰",Laws:"⚖️",Business:"💼",Events:"🎉",Entertainment:"🎬" };

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "1 day ago" : `${d} days ago`;
}

function FeaturedCard({ article, isFirst = false }: { article: Article; isFirst?: boolean }) {
  const style = CAT_STYLES[article.category] || CAT_STYLES.News;

  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <article className="h-full bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all flex flex-col lg:flex-row">
        {/* image */}
        <div className="relative lg:w-[58%] aspect-video lg:aspect-auto flex-shrink-0 bg-gray-100 min-h-[220px]">
          {article.hero_image_url ? (
            <Image src={article.hero_image_url} alt={article.title} fill
              className="object-cover" priority={isFirst} sizes="(max-width:1024px) 100vw, 600px" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-5xl">📰</div>
          )}
          <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border ${style.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {article.category}
          </span>
          {Date.now() - new Date(article.published_at).getTime() < 10800000 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wide animate-pulse">🔴 Breaking</span>
          )}
        </div>

        {/* content */}
        <div className="flex flex-col justify-between p-5 lg:p-7 flex-1 min-h-[200px]">
          <div>
            {isFirst ? (
              <h2 className="text-xl lg:text-2xl font-black text-brand leading-tight mb-3 group-hover:text-[#1a1a1a] transition-colors [text-shadow:none] group-hover:[text-shadow:0_1px_8px_rgba(170,255,0,0.25)]">
                {article.title}
              </h2>
            ) : (
              <h3 className="text-lg lg:text-xl font-black text-brand leading-tight mb-3 group-hover:text-[#1a1a1a] transition-colors group-hover:[text-shadow:0_1px_8px_rgba(170,255,0,0.25)]">
                {article.title}
              </h3>
            )}
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{article.summary}</p>
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-lime border-2 border-black flex items-center justify-center text-[11px] font-black text-brand">A</div>
              <div>
                <div className="text-[11px] font-black text-brand leading-tight">{article.author_name}</div>
                <div className="text-[10px] text-gray-400">{article.author_title}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold">
              <span>{timeAgo(article.published_at)}</span>
              <span>·</span>
              <span>{article.reading_time} min read</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ArticleCard({ article, headingLevel = "h3" }: { article: Article; headingLevel?: "h3" | "h4" }) {
  const style = CAT_STYLES[article.category] || CAT_STYLES.News;

  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <article className="h-full bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all flex flex-col">
        <div className="relative w-full aspect-video bg-gray-100 flex-shrink-0">
          {article.hero_image_url ? (
            <Image src={article.hero_image_url} alt={article.title} fill className="object-cover" sizes="420px" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-3xl">📰</div>
          )}
          <span className={`absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black border ${style.pill}`}>
            <span className={`w-1 h-1 rounded-full ${style.dot}`} />
            {article.category}
          </span>
          {Date.now() - new Date(article.published_at).getTime() < 10800000 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">New</span>
          )}
        </div>
        <div className="flex flex-col flex-1 p-4">
          {headingLevel === "h3" ? (
            <h3 className="font-black text-sm text-brand leading-tight mb-2 group-hover:text-[#1a1a1a] group-hover:[text-shadow:0_1px_8px_rgba(170,255,0,0.25)] transition-colors line-clamp-3 flex-1">
              {article.title}
            </h3>
          ) : (
            <h4 className="font-black text-sm text-brand leading-tight mb-2 group-hover:text-[#1a1a1a] group-hover:[text-shadow:0_1px_8px_rgba(170,255,0,0.25)] transition-colors line-clamp-3 flex-1">
              {article.title}
            </h4>
          )}
          <p className="text-[11px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">{article.summary}</p>
          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-lime border border-black flex items-center justify-center text-[9px] font-black text-brand">A</div>
              <span className="text-[10px] font-bold text-gray-500">{article.author_name}</span>
            </div>
            <div className="flex items-center gap-2 text-[9px] text-gray-400">
              <span>{timeAgo(article.published_at)}</span>
              <span>·</span>
              <span>{article.reading_time} min</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function NewsListing({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-24 bg-white border-2 border-black rounded-2xl shadow-brutal">
        <div className="text-5xl mb-4">📰</div>
        <h2 className="text-2xl font-black text-brand mb-2">First edition drops tomorrow</h2>
        <p className="text-gray-500 text-sm">Angelica M. publishes 2 fresh cannabis articles every morning at 9am ET.</p>
      </div>
    );
  }

  const [first, second, ...rest] = articles;

  return (
    <div className="space-y-8">
      {/* ROW 1: big featured (2 cols) + second article card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        <div className="lg:col-span-2">
          {first && <FeaturedCard article={first} isFirst />}
        </div>
        <div>
          {second && <FeaturedCard article={second} />}
        </div>
      </div>

      {rest.length > 0 && (
        <div className="flex items-center gap-4">
          <div className="flex-1 h-0.5 bg-black" />
          <span className="text-[11px] font-black uppercase tracking-widest text-brand px-2">More Stories</span>
          <div className="flex-1 h-0.5 bg-black" />
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((a) => <ArticleCard key={a.slug} article={a} headingLevel="h3" />)}
        </div>
      )}
    </div>
  );
}
