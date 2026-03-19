"use client";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/articles";

const CAT_PILL: Record<string, string> = {
  News:          "bg-blue-600 text-white",
  Laws:          "bg-red-600 text-white",
  Business:      "bg-amber-500 text-white",
  Events:        "bg-purple-600 text-white",
  Entertainment: "bg-pink-600 text-white",
};
const GRAD: Record<string, string> = {
  News:          "from-blue-950 to-blue-900",
  Laws:          "from-red-950 to-red-900",
  Business:      "from-amber-950 to-amber-900",
  Events:        "from-purple-950 to-purple-900",
  Entertainment: "from-pink-950 to-rose-900",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ArticleCard({ article }: { article: Article }) {
  const pill = CAT_PILL[article.category] || CAT_PILL.News;
  const grad = GRAD[article.category] || GRAD.News;

  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <article className="h-full bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">

        {/* ── IMAGE + CATEGORY BADGE ── */}
        <div className="relative w-full h-[200px] flex-shrink-0 overflow-hidden bg-brand">
          {article.hero_image_url ? (
            <img
              src={article.hero_image_url}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${grad}`} />
          )}
          {/* category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${pill}`}>
              {article.category}
            </span>
          </div>
        </div>

        {/* ── TEXT BODY ── */}
        <div className="flex flex-col flex-1 px-4 pt-4 pb-4 gap-2.5">

          {/* TITLE */}
          <h2 className="font-black text-brand text-base leading-snug line-clamp-3">
            {article.title}
          </h2>

          {/* EXCERPT */}
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
            {article.summary}
          </p>

          {/* DATE + READ TIME */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <span className="text-[11px] font-bold text-gray-400">📅 {formatDate(article.published_at)}</span>
            <span className="text-[11px] font-bold text-gray-400">⏱ {article.reading_time} min read</span>
          </div>

        </div>
      </article>
    </Link>
  );
}

export default function NewsListing({ articles }: { articles: Article[] }) {
  if (!articles.length) return (
    <div className="text-center py-24 bg-white border-2 border-black rounded-2xl shadow-brutal">
      <div className="text-5xl mb-4">📰</div>
      <h2 className="text-2xl font-black text-brand mb-2">First edition drops at 9am ET</h2>
      <p className="text-gray-400 text-sm">Fresh cannabis stories every morning.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {articles.map(a => (
        <ArticleCard key={a.slug} article={a} />
      ))}
    </div>
  );
}
