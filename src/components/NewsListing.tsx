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
const GRAD: Record<string,string> = {
  News:"from-blue-950 via-blue-900 to-brand",
  Laws:"from-red-950 via-red-900 to-brand",
  Business:"from-amber-950 via-amber-900 to-brand",
  Events:"from-purple-950 via-purple-900 to-brand",
  Entertainment:"from-pink-950 via-rose-900 to-brand",
};

function timeAgo(d: string) {
  const h = Math.floor((Date.now()-new Date(d).getTime())/3600000);
  if (h<1) return "Just now";
  if (h<24) return `${h}h ago`;
  const days=Math.floor(h/24);
  return days===1?"1 day ago":`${days} days ago`;
}

/* Full-bleed hook image with text overlay */
function HookImage({article,tall=false}:{article:Article;tall?:boolean}) {
  const cat = CAT_COLORS[article.category]||CAT_COLORS.News;
  const grad = GRAD[article.category]||GRAD.News;
  const h = tall ? "h-[340px] md:h-[420px]" : "h-[240px] md:h-[280px]";
  return (
    <div className={`relative w-full ${h} overflow-hidden`}>
      {article.hero_image_url ? (
        <>
          <Image src={article.hero_image_url} alt={article.title} fill
            className="object-cover" priority={tall}
            sizes="(max-width:768px) 100vw, 650px"/>
          {/* gradient overlay — bottom dark so text pops */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"/>
        </>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${grad}`}>
          <div className="absolute inset-0 opacity-[0.04]"
            style={{backgroundImage:"repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",backgroundSize:"20px 20px"}}/>
        </div>
      )}
      {/* category badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${cat.bg} ${cat.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`}/>{article.category}
        </span>
      </div>
      {/* breaking */}
      {Date.now()-new Date(article.published_at).getTime()<10800000 && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest animate-pulse">🔴 Breaking</span>
        </div>
      )}
      {/* hook text overlay — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
        {tall ? (
          <h2 className="text-white font-black text-xl md:text-2xl leading-tight tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
            {article.title}
          </h2>
        ) : (
          <h3 className="text-white font-black text-base md:text-lg leading-tight tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
            {article.title}
          </h3>
        )}
        {tall && (
          <p className="text-white/65 text-xs mt-1.5 line-clamp-2 leading-relaxed hidden md:block [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
            {article.summary}
          </p>
        )}
      </div>
    </div>
  );
}

function MetaStrip({article}:{article:Article}) {
  return (
    <div className="px-4 py-3 flex items-center justify-between border-t-2 border-black bg-white flex-shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-lime border-2 border-black flex items-center justify-center text-[9px] font-black text-brand flex-shrink-0">A</div>
        <span className="text-[11px] font-black text-brand">{article.author_name}</span>
      </div>
      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
        <span>{timeAgo(article.published_at)}</span>
        <span>·</span>
        <span>{article.reading_time} min</span>
      </div>
    </div>
  );
}

function FeaturedCard({article}:{article:Article}) {
  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <article className="h-full bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all flex flex-col">
        <HookImage article={article} tall/>
        <MetaStrip article={article}/>
      </article>
    </Link>
  );
}

function ArticleCard({article}:{article:Article}) {
  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <article className="h-full bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all flex flex-col">
        <HookImage article={article}/>
        <MetaStrip article={article}/>
      </article>
    </Link>
  );
}

export default function NewsListing({articles}:{articles:Article[]}) {
  if (!articles.length) return (
    <div className="text-center py-24 bg-white border-2 border-black rounded-2xl shadow-brutal">
      <div className="text-5xl mb-4">📰</div>
      <h2 className="text-2xl font-black text-brand mb-2">First edition drops at 9am ET</h2>
      <p className="text-gray-400 text-sm">Angelica M. publishes 2 fresh stories every morning.</p>
    </div>
  );

  const [first, second, third, ...rest] = articles;
  return (
    <div className="space-y-6">
      {/* 2 big featured side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {first && <FeaturedCard article={first}/>}
        {second && <FeaturedCard article={second}/>}
      </div>
      {(third||rest.length>0) && (
        <div className="flex items-center gap-4 py-1">
          <div className="flex-1 h-px bg-gray-200"/>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">More Stories</span>
          <div className="flex-1 h-px bg-gray-200"/>
        </div>
      )}
      {(third||rest.length>0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[third,...rest].filter(Boolean).map(a=><ArticleCard key={a!.slug} article={a!}/>)}
        </div>
      )}
    </div>
  );
}
