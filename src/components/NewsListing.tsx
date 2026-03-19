"use client";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/articles";

const CAT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  News:          { bg:"bg-blue-600",   text:"text-white", dot:"bg-blue-400"   },
  Laws:          { bg:"bg-red-600",    text:"text-white", dot:"bg-red-400"    },
  Business:      { bg:"bg-amber-500",  text:"text-white", dot:"bg-amber-300"  },
  Events:        { bg:"bg-purple-600", text:"text-white", dot:"bg-purple-400" },
  Entertainment: { bg:"bg-pink-600",   text:"text-white", dot:"bg-pink-400"   },
};
const GRAD: Record<string, string> = {
  News:"from-blue-950 via-blue-900 to-brand",
  Laws:"from-red-950 via-red-900 to-brand",
  Business:"from-amber-950 via-amber-900 to-brand",
  Events:"from-purple-950 via-purple-900 to-brand",
  Entertainment:"from-pink-950 via-rose-900 to-brand",
};

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  return days === 1 ? "Yesterday" : `${days} days ago`;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/* ─── HOOK IMAGE ─────────────────────────────────────────────────────── */
function HookImage({ article, size = "md" }: { article: Article; size?: "lg" | "md" | "sm" }) {
  const cat = CAT_COLORS[article.category] || CAT_COLORS.News;
  const grad = GRAD[article.category] || GRAD.News;
  const heightMap = { lg: "h-[380px]", md: "h-[220px]", sm: "h-[180px]" };
  const h = heightMap[size];

  return (
    <div className={`relative w-full ${h} flex-shrink-0 overflow-hidden`}>
      {article.hero_image_url ? (
        <>
          <Image
            src={article.hero_image_url}
            alt={article.title}
            fill
            className="object-cover"
            priority={size === "lg"}
            sizes={size === "lg" ? "100vw" : "(max-width:768px) 100vw, 400px"}
          />
          {/* gradient overlay: stronger at bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/5 pointer-events-none" />
        </>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${grad}`}>
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        </div>
      )}

      {/* top badges row */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${cat.bg} ${cat.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
          {article.category}
        </span>
        {Date.now() - new Date(article.published_at).getTime() < 10800000 && (
          <span className="inline-flex items-center gap-1 bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest animate-pulse">
            🔴 Breaking
          </span>
        )}
      </div>

      {/* bottom text overlay — strictly inside the image div */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
        {size === "lg" ? (
          <>
            <h2 className="text-white font-black text-xl md:text-2xl leading-tight [text-shadow:0_2px_12px_rgba(0,0,0,1)] mb-1.5">
              {article.title}
            </h2>
            <p className="text-white/70 text-xs leading-relaxed line-clamp-2 [text-shadow:0_1px_4px_rgba(0,0,0,0.9)] hidden sm:block">
              {article.summary}
            </p>
          </>
        ) : (
          <h3 className="text-white font-black text-sm md:text-base leading-tight [text-shadow:0_2px_12px_rgba(0,0,0,1)] line-clamp-3">
            {article.title}
          </h3>
        )}
      </div>
    </div>
  );
}

/* ─── META STRIP ─────────────────────────────────────────────────────── */
function MetaStrip({ article }: { article: Article }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between border-t-2 border-black bg-white flex-shrink-0">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-bold text-gray-500">📅 {formatDate(article.published_at)}</span>
      </div>
      <span className="text-[10px] text-gray-400 font-bold">⏱ {article.reading_time} min</span>
    </div>
  );
}

/* ─── HERO CARD (full width, large) ─────────────────────────────────── */
function HeroCard({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <article className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all flex flex-col">
        <HookImage article={article} size="lg" />
        <MetaStrip article={article} />
      </article>
    </Link>
  );
}

/* ─── REGULAR CARD (3-col grid) ──────────────────────────────────────── */
function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <article className="h-full bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all flex flex-col">
        <HookImage article={article} size="md" />
        <MetaStrip article={article} />
      </article>
    </Link>
  );
}

/* ─── MAIN EXPORT ────────────────────────────────────────────────────── */
export default function NewsListing({ articles }: { articles: Article[] }) {
  if (!articles.length) return (
    <div className="text-center py-24 bg-white border-2 border-black rounded-2xl shadow-brutal">
      <div className="text-5xl mb-4">📰</div>
      <h2 className="text-2xl font-black text-brand mb-2">First edition drops at 9am ET</h2>
      <p className="text-gray-400 text-sm">Angelica M. publishes 2 fresh stories every morning.</p>
    </div>
  );

  const [first, ...rest] = articles;

  return (
    <div className="space-y-5">

      {/* ── TOP HERO: full width ── */}
      {first && <HeroCard article={first} />}

      {/* ── DIVIDER ── */}
      {rest.length > 0 && (
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">More Stories</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      )}

      {/* ── 3-COLUMN GRID ── */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map(a => <ArticleCard key={a.slug} article={a} />)}
        </div>
      )}

    </div>
  );
}
