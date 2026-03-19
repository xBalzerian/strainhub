"use client";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/articles";

const CAT_STYLES: Record<string, { pill: string; dot: string }> = {
  News:          { pill: "bg-blue-50 text-blue-700 border-blue-200",   dot: "bg-blue-500"   },
  Laws:          { pill: "bg-red-50 text-red-700 border-red-200",      dot: "bg-red-500"    },
  Business:      { pill: "bg-amber-50 text-amber-700 border-amber-200",dot: "bg-amber-500"  },
  Events:        { pill: "bg-purple-50 text-purple-700 border-purple-200", dot: "bg-purple-500" },
  Entertainment: { pill: "bg-pink-50 text-pink-700 border-pink-200",   dot: "bg-pink-500"   },
};
const CAT_EMOJI: Record<string, string> = { News:"📰",Laws:"⚖️",Business:"💼",Events:"🎉",Entertainment:"🎬" };

// US Eastern time display (target audience)
function formatUSDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "1 day ago" : `${d} days ago`;
}

// ── FEATURED (big left card) ─────────────────────────────────────────────────
function FeaturedCard({ article }: { article: Article }) {
  const style = CAT_STYLES[article.category] || CAT_STYLES.News;
  const emoji = CAT_EMOJI[article.category] || "📄";
  const totalReactions = Object.values(article.reactions || {}).reduce((a: number, b) => a + (b as number), 0);

  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <article className="h-full bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all flex flex-col lg:flex-row">
        {/* image */}
        <div className="relative lg:w-[58%] aspect-video lg:aspect-auto flex-shrink-0 bg-gray-50">
          {article.hero_image_url ? (
            <Image
              src={article.hero_image_url} alt={article.title}
              fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 600px"
            />
          ) : (
            <div className="w-full h-56 lg:h-full bg-lime/20 flex items-center justify-center text-5xl">📰</div>
          )}
          {/* category badge */}
          <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border ${style.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {article.category}
          </span>
        </div>

        {/* content */}
        <div className="flex flex-col justify-between p-5 lg:p-7 flex-1 min-h-[200px]">
          <div>
            {/* breaking label if < 3h old */}
            {Date.now() - new Date(article.published_at).getTime() < 10800000 && (
              <span className="inline-flex items-center gap-1 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest mb-2">
                🔴 Breaking
              </span>
            )}
            <h2 className="text-xl lg:text-2xl font-black text-brand leading-tight mb-3 group-hover:text-lime transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{article.summary}</p>
          </div>

          {/* footer */}
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
              {totalReactions > 0 && <><span>·</span><span>🔥 {totalReactions}</span></>}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ── REGULAR CARD ─────────────────────────────────────────────────────────────
function ArticleCard({ article }: { article: Article }) {
  const style = CAT_STYLES[article.category] || CAT_STYLES.News;
  const emoji = CAT_EMOJI[article.category] || "📄";
  const totalReactions = Object.values(article.reactions || {}).reduce((a: number, b) => a + (b as number), 0);

  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <article className="h-full bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all flex flex-col">
        {/* image */}
        <div className="relative w-full aspect-video bg-gray-50 flex-shrink-0">
          {article.hero_image_url ? (
            <Image src={article.hero_image_url} alt={article.title} fill className="object-cover" sizes="400px" />
          ) : (
            <div className="w-full h-full bg-lime/20 flex items-center justify-center text-3xl">📰</div>
          )}
          <span className={`absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black border ${style.pill}`}>
            <span className={`w-1 h-1 rounded-full ${style.dot}`} />
            {article.category}
          </span>
          {Date.now() - new Date(article.published_at).getTime() < 10800000 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">New</span>
          )}
        </div>

        {/* content */}
        <div className="flex flex-col flex-1 p-4">
          <h2 className="font-black text-sm text-brand leading-tight mb-2 group-hover:text-lime transition-colors line-clamp-3 flex-1">
            {article.title}
          </h2>
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

// ── COMPACT LIST ITEM (for sidebar/extras) ────────────────────────────────────
function ListItem({ article }: { article: Article }) {
  const style = CAT_STYLES[article.category] || CAT_STYLES.News;
  return (
    <Link href={`/news/${article.slug}`} className="group flex gap-3 items-start py-3 border-b border-gray-100 last:border-0 hover:bg-lime/10 px-1 rounded transition-colors">
      <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${style.dot}`} />
      <div>
        <p className="text-sm font-bold text-brand group-hover:text-lime transition-colors leading-tight line-clamp-2">{article.title}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{timeAgo(article.published_at)} · {article.reading_time} min</p>
      </div>
    </Link>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
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

  const [first, second, third, ...rest] = articles;

  return (
    <div className="space-y-8">

      {/* ── ROW 1: Big featured + sidebar stack ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* featured — takes 2 cols */}
        <div className="lg:col-span-2">
          {first && <FeaturedCard article={first} />}
        </div>
        {/* sidebar — second article card + compact list */}
        <div className="flex flex-col gap-0">
          {second && <ArticleCard article={second} />}
        </div>
      </div>

      {/* ── DIVIDER with label ── */}
      {rest.length > 0 && (
        <div className="flex items-center gap-4">
          <div className="flex-1 h-0.5 bg-black" />
          <span className="text-xs font-black uppercase tracking-widest text-brand px-2">More Stories</span>
          <div className="flex-1 h-0.5 bg-black" />
        </div>
      )}

      {/* ── CARD GRID for rest ── */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      )}
    </div>
  );
}
