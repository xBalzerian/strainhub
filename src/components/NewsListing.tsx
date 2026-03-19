"use client";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/articles";

const CAT_STYLES: Record<string, string> = {
  News:          "bg-blue-100 text-blue-800 border-blue-200",
  Laws:          "bg-red-100 text-red-800 border-red-200",
  Business:      "bg-amber-100 text-amber-800 border-amber-200",
  Events:        "bg-purple-100 text-purple-800 border-purple-200",
  Entertainment: "bg-pink-100 text-pink-800 border-pink-200",
};
const CAT_EMOJI: Record<string, string> = {
  News:"📰", Laws:"⚖️", Business:"💼", Events:"🎉", Entertainment:"🎬",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "Yesterday" : `${d}d ago`;
}

function FeaturedCard({ article }: { article: Article }) {
  const cat = CAT_STYLES[article.category] || "bg-gray-100 text-gray-700 border-gray-200";
  const emoji = CAT_EMOJI[article.category] || "📄";
  const totalReactions = Object.values(article.reactions || {}).reduce((a: number, b) => a + (b as number), 0);
  return (
    <Link href={`/news/${article.slug}`} className="group block col-span-1 md:col-span-2">
      <article className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all flex flex-col md:flex-row h-full">
        <div className="relative md:w-[55%] aspect-video md:aspect-auto flex-shrink-0 bg-gray-100">
          {article.hero_image_url ? (
            <Image src={article.hero_image_url} alt={article.title} fill className="object-cover" priority sizes="700px" />
          ) : (
            <div className="w-full h-56 md:h-full bg-brand flex items-center justify-center text-6xl">📰</div>
          )}
          <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border ${cat}`}>
            {emoji} {article.category}
          </span>
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8 flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] text-gray-400 font-bold">{timeAgo(article.published_at)}</span>
            <span className="text-gray-200">·</span>
            <span className="text-[11px] text-gray-400">{article.reading_time} min read</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-brand leading-tight mb-3 group-hover:text-lime transition-colors line-clamp-3">
            {article.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5">{article.summary}</p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-lime border-2 border-brand flex items-center justify-center text-xs font-black text-brand">A</div>
              <div>
                <div className="text-xs font-black text-brand leading-none">{article.author_name}</div>
                <div className="text-[10px] text-gray-400">{article.author_title}</div>
              </div>
            </div>
            {totalReactions > 0 && <span className="text-[11px] text-gray-400">🔥 {totalReactions} reactions</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const cat = CAT_STYLES[article.category] || "bg-gray-100 text-gray-700 border-gray-200";
  const emoji = CAT_EMOJI[article.category] || "📄";
  const totalReactions = Object.values(article.reactions || {}).reduce((a: number, b) => a + (b as number), 0);
  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <article className="h-full bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all flex flex-col">
        <div className="relative w-full aspect-video bg-gray-100 flex-shrink-0">
          {article.hero_image_url ? (
            <Image src={article.hero_image_url} alt={article.title} fill className="object-cover" sizes="400px" />
          ) : (
            <div className="w-full h-full bg-brand flex items-center justify-center text-4xl">📰</div>
          )}
          <span className={`absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black border ${cat}`}>
            {emoji} {article.category}
          </span>
        </div>
        <div className="flex flex-col flex-1 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-gray-400 font-bold">{timeAgo(article.published_at)}</span>
            <span className="text-gray-200">·</span>
            <span className="text-[10px] text-gray-400">{article.reading_time} min</span>
          </div>
          <h2 className="font-black text-sm text-brand leading-tight mb-2 group-hover:text-lime transition-colors line-clamp-3 flex-1">
            {article.title}
          </h2>
          <p className="text-[11px] text-gray-500 line-clamp-2 mb-3">{article.summary}</p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <span className="text-[10px] font-bold text-gray-400">{article.author_name}</span>
            {totalReactions > 0 && <span className="text-[10px] text-gray-400">🔥 {totalReactions}</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function NewsListing({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="text-5xl mb-4">📰</div>
        <h2 className="text-2xl font-black text-brand mb-2">First articles dropping tomorrow</h2>
        <p className="text-gray-500 text-sm">Angelica M. publishes 2 new articles every morning. Check back soon.</p>
      </div>
    );
  }
  const [first, second, ...rest] = articles;
  return (
    <div className="space-y-6">
      {/* featured row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {first && <FeaturedCard article={first} />}
        {second && <ArticleCard article={second} />}
      </div>
      {/* rest */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      )}
    </div>
  );
}
