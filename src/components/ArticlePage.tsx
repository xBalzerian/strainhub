"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Article } from "@/lib/articles";
import { addReaction } from "@/lib/articles";

const CAT_STYLES: Record<string, { pill: string; dot: string; bar: string; bg: string }> = {
  News:          { pill:"bg-blue-50 text-blue-700 border-blue-200",       dot:"bg-blue-500",   bar:"bg-blue-500",   bg:"bg-blue-50"   },
  Laws:          { pill:"bg-red-50 text-red-700 border-red-200",          dot:"bg-red-500",    bar:"bg-red-500",    bg:"bg-red-50"    },
  Business:      { pill:"bg-amber-50 text-amber-700 border-amber-200",    dot:"bg-amber-500",  bar:"bg-amber-500",  bg:"bg-amber-50"  },
  Events:        { pill:"bg-purple-50 text-purple-700 border-purple-200", dot:"bg-purple-500", bar:"bg-purple-500", bg:"bg-purple-50" },
  Entertainment: { pill:"bg-pink-50 text-pink-700 border-pink-200",       dot:"bg-pink-500",   bar:"bg-pink-500",   bg:"bg-pink-50"   },
};

const REACTIONS = [
  { key:"fire"   as const, emoji:"🔥", label:"Fire"  },
  { key:"heart"  as const, emoji:"❤️", label:"Love"  },
  { key:"wow"    as const, emoji:"😮", label:"Wow"   },
  { key:"laugh"  as const, emoji:"😂", label:"Haha"  },
  { key:"thumbs" as const, emoji:"👍", label:"Agree" },
];

/* Hard-coded top 10 strains for sidebar — sorted by popularity */
const TOP_STRAINS = [
  {name:"Blue Dream",      slug:"blue-dream",         type:"Hybrid"},
  {name:"Sour Diesel",     slug:"sour-diesel",         type:"Sativa"},
  {name:"Girl Scout Cookies",slug:"girl-scout-cookies",type:"Hybrid"},
  {name:"OG Kush",         slug:"og-kush",             type:"Hybrid"},
  {name:"Original Glue",   slug:"original-glue",       type:"Hybrid"},
  {name:"Pineapple Express",slug:"pineapple-express",  type:"Hybrid"},
  {name:"Gelato",          slug:"gelato",              type:"Hybrid"},
  {name:"Wedding Cake",    slug:"wedding-cake",        type:"Indica"},
  {name:"Runtz",           slug:"runtz",               type:"Hybrid"},
  {name:"Purple Punch",    slug:"purple-punch",        type:"Indica"},
];

const TYPE_DOT: Record<string,string> = {
  Hybrid:"bg-amber-400", Sativa:"bg-green-500", Indica:"bg-purple-500"
};

/* 5 seed banks with logos on GitHub */
const TOP_SEEDBANKS = [
  {name:"ILGM",              slug:"ilgm"},
  {name:"Seedsman",          slug:"seedsman"},
  {name:"Crop King Seeds",   slug:"crop-king-seeds"},
  {name:"Royal Queen Seeds", slug:"royal-queen-seeds"},
  {name:"MSNL",              slug:"msnl"},
  {name:"Attitude Seedbank", slug:"attitude-seedbank"},
  {name:"Barneys Farm",      slug:"barneys-farm"},
  {name:"Fast Buds",         slug:"fast-buds"},
];

const GH_RAW = "https://raw.githubusercontent.com/xBalzerian/strainhub/main";

function formatUSDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    timeZone:"America/New_York", weekday:"long", month:"long",
    day:"numeric", year:"numeric", hour:"numeric", minute:"2-digit", hour12:true,
  }) + " ET";
}

/* ── COMPACT REACTIONS ── */
function ReactionsBar({ article }: { article: Article }) {
  const [counts, setCounts] = useState(article.reactions || {fire:0,heart:0,laugh:0,wow:0,thumbs:0});
  const [reacted, setReacted] = useState<string|null>(null);
  useEffect(()=>{ setReacted(localStorage.getItem(`reacted_${article.slug}`)); },[article.slug]);
  const handleReact = async (type: keyof typeof counts) => {
    if (reacted) return;
    const updated = await addReaction(article.slug, type);
    if (updated) setCounts(updated as typeof counts);
    setReacted(type); localStorage.setItem(`reacted_${article.slug}`, type);
  };
  const total = Object.values(counts as Record<string,number>).reduce((a,b)=>a+b,0);
  return (
    <div className="my-8 bg-white border-2 border-black rounded-2xl shadow-brutal overflow-hidden">
      <div className="bg-lime border-b-2 border-black px-4 py-2.5 flex items-center justify-between">
        <span className="text-[11px] font-black text-brand uppercase tracking-widest">React to this story</span>
        {total>0 && <span className="text-[10px] font-bold text-brand/60">{total} reaction{total!==1?"s":""}</span>}
      </div>
      <div className="px-4 py-3 flex items-center gap-2">
        {REACTIONS.map(r=>{
          const count=(counts as Record<string,number>)[r.key]||0;
          const isMe=reacted===r.key;
          return (
            <button key={r.key} onClick={()=>handleReact(r.key)} disabled={!!reacted} title={r.label}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl border-2 transition-all ${
                isMe?"bg-lime border-black scale-105 shadow-brutal-sm"
                :reacted?"bg-gray-50 border-gray-200 opacity-40 cursor-not-allowed"
                :"bg-white border-gray-200 hover:border-black hover:bg-lime/30 cursor-pointer active:scale-95"
              }`}>
              <span className="text-lg leading-none">{r.emoji}</span>
              {count>0
                ? <span className="text-[9px] font-black text-brand leading-none mt-0.5">{count}</span>
                : <span className="text-[9px] text-gray-400 leading-none mt-0.5">{r.label}</span>
              }
            </button>
          );
        })}
      </div>
      {reacted && <div className="px-4 pb-3 text-[11px] text-gray-400 font-bold text-center -mt-1">Thanks! Share this 🌿</div>}
    </div>
  );
}

/* ── SIDEBAR WIDGET ── */
function Widget({title,accent="bg-lime",children}:{title:string;accent?:string;children:React.ReactNode}) {
  return (
    <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal">
      <div className={`${accent} border-b-2 border-black px-4 py-2.5`}>
        <p className="text-[11px] font-black text-brand uppercase tracking-widest">{title}</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/* ── SEEDBANK LOGO ── */
function SeedbankLogo({slug,name}:{slug:string;name:string}) {
  const [err,setErr]=useState(false);
  const logo=`${GH_RAW}/public/images/logos/${slug}.png`;
  return (
    <Link href={`/seedbanks/${slug}`}
      className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-lime transition-all group border border-transparent hover:border-black">
      <div className="w-8 h-8 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 bg-white flex items-center justify-center">
        {!err
          ? <Image src={logo} alt={name} width={32} height={32} className="object-contain w-full h-full" onError={()=>setErr(true)} />
          : <span className="text-[9px] font-black text-gray-500 text-center leading-tight px-0.5">{name.slice(0,4)}</span>
        }
      </div>
      <span className="text-[12px] font-bold text-brand leading-tight">{name}</span>
    </Link>
  );
}

/* ── MAIN ── */
export default function ArticlePage({article}:{article:Article}) {
  const style=CAT_STYLES[article.category]||CAT_STYLES.News;

  return (
    <main className="min-h-screen bg-off-white">

      {/* HEADER */}
      <section className="bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-7">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold mb-5">
            <Link href="/" className="hover:text-lime transition-colors">Home</Link>
            <span>›</span>
            <Link href="/news" className="hover:text-lime transition-colors">News</Link>
            <span>›</span>
            <Link href={`/news?category=${article.category}`} className="hover:text-lime transition-colors">{article.category}</Link>
          </nav>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border ${style.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}/>{article.category}
            </span>
            {Date.now()-new Date(article.published_at).getTime()<10800000 && (
              <span className="inline-flex items-center gap-1 bg-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide animate-pulse">🔴 Breaking</span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand leading-tight mb-4 max-w-3xl">{article.title}</h1>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed border-l-4 border-lime pl-4 mb-6 max-w-3xl">{article.summary}</p>
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
              <span>· ⏱ {article.reading_time} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* HERO IMAGE — full display, no crop */}
      {article.hero_image_url && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          <figure className="relative w-full rounded-2xl overflow-hidden border-2 border-black shadow-brutal bg-brand"
            style={{height:"min(56vw,480px)"}}>
            <Image src={article.hero_image_url} alt={article.title} fill className="object-cover"
              priority sizes="(max-width:1024px) 100vw, 1024px"/>
          </figure>
        </div>
      )}

      {/* BODY + SIDEBAR */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px] gap-8 items-start">

          {/* ARTICLE */}
          <article>
            <div className={`h-1 w-12 ${style.bar} rounded-full mb-6`}/>
            <div className="article-body" dangerouslySetInnerHTML={{__html:article.content||""}}/>

            {article.thumbnail_url && (
              <figure className="my-8">
                <div className="relative w-full rounded-2xl overflow-hidden border-2 border-black shadow-brutal bg-brand"
                  style={{height:"min(56vw,420px)"}}>
                  <Image src={article.thumbnail_url} alt={`${article.title} — visual`} fill
                    className="object-contain" sizes="700px"/>
                </div>
              </figure>
            )}

            <ReactionsBar article={article}/>

            {/* FAQ */}
            {article.faq?.length>0 && (
              <section aria-label="Frequently Asked Questions" className="my-8">
                <h2 className="text-xl font-black text-brand mb-5 border-b-2 border-lime pb-2">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {article.faq.map((f,i)=>(
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

            {/* mobile strains */}
            {article.related_strains?.length>0 && (
              <section className="my-6 lg:hidden">
                <h3 className="text-sm font-black text-brand mb-3">🌿 Related Strains</h3>
                <div className="flex flex-wrap gap-2">
                  {article.related_strains.map(s=>(
                    <Link key={s} href={`/strains/${s}`}
                      className="bg-white border-2 border-black px-3 py-1.5 rounded-xl text-xs font-black hover:bg-lime transition-all shadow-brutal-sm">
                      {s.replace(/-/g," ").replace(/\w/g,c=>c.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-10 pt-5 border-t-2 border-black flex items-center gap-2.5 flex-wrap">
              <Link href="/news" className="inline-flex items-center gap-1.5 bg-white border-2 border-black font-black px-4 py-2.5 rounded-xl text-sm shadow-brutal hover:bg-lime transition-all">← All News</Link>
              <Link href={`/news?category=${article.category}`} className="inline-flex items-center gap-1.5 bg-white border-2 border-black font-black px-4 py-2.5 rounded-xl text-sm shadow-brutal hover:bg-lime transition-all">More {article.category} →</Link>
              <Link href="/strains" className="inline-flex items-center gap-1.5 bg-lime border-2 border-black font-black px-4 py-2.5 rounded-xl text-sm shadow-brutal hover:shadow-brutal-lg transition-all">🌿 Explore Strains</Link>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="hidden lg:flex flex-col gap-5 sticky top-6">

            {/* ── TOP 10 STRAINS ── */}
            <Widget title="🌿 Top 10 Strains" accent="bg-lime">
              <div className="space-y-0.5">
                {TOP_STRAINS.map((s,i)=>(
                  <Link key={s.slug} href={`/strains/${s.slug}`}
                    className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-lime transition-all group border border-transparent hover:border-black">
                    <span className="text-[11px] font-black text-gray-300 w-4 text-right flex-shrink-0">{i+1}</span>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${TYPE_DOT[s.type]||"bg-gray-400"}`}/>
                    <span className="text-[12px] font-bold text-brand flex-1">{s.name}</span>
                    <span className="text-[9px] font-bold text-gray-400">{s.type}</span>
                  </Link>
                ))}
              </div>
              <Link href="/strains" className="mt-3 flex items-center justify-center gap-1 text-[11px] font-black text-brand bg-lime/20 hover:bg-lime border border-lime px-3 py-2 rounded-lg transition-all">
                Browse All {">"}370 Strains →
              </Link>
            </Widget>

            {/* ── TOP SEED BANKS WITH LOGOS ── */}
            <Widget title="🏦 Top Seed Banks" accent="bg-amber-50">
              <div className="space-y-0.5">
                {TOP_SEEDBANKS.map(b=>(
                  <SeedbankLogo key={b.slug} slug={b.slug} name={b.name}/>
                ))}
              </div>
              <Link href="/seedbanks" className="mt-3 flex items-center justify-center gap-1 text-[11px] font-black text-brand bg-amber-50 hover:bg-lime border border-amber-300 hover:border-black px-3 py-2 rounded-lg transition-all">
                Compare All Seed Banks →
              </Link>
            </Widget>

            {/* ── LATEST ARTICLES ── */}
            <Widget title="📰 Latest Articles" accent="bg-gray-50">
              <div className="space-y-0">
                {/* These will be populated — show links to news categories */}
                {[
                  {cat:"⚖️ Laws",    href:"/news?category=Laws"},
                  {cat:"💼 Business", href:"/news?category=Business"},
                  {cat:"🎬 Entertainment",href:"/news?category=Entertainment"},
                  {cat:"🎉 Events",   href:"/news?category=Events"},
                  {cat:"📰 News",     href:"/news?category=News"},
                ].map(l=>(
                  <Link key={l.href} href={l.href}
                    className="flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-lime/10 border border-transparent hover:border-black transition-all group">
                    <span className="text-[12px] font-bold text-brand group-hover:text-lime transition-colors">{l.cat}</span>
                    <span className="text-gray-300 text-xs group-hover:text-brand transition-colors">→</span>
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-2 pt-3">
                  <Link href="/news" className="flex items-center justify-center gap-1 text-[11px] font-black text-brand bg-white hover:bg-lime border-2 border-black px-3 py-2 rounded-lg transition-all shadow-brutal-sm">
                    All News →
                  </Link>
                </div>
              </div>
            </Widget>

            {/* ── EXPLORE ── */}
            <Widget title="🧭 Explore" accent="bg-off-white">
              <div className="grid grid-cols-2 gap-1">
                {[
                  {e:"🧬",l:"Diagnose",h:"/diagnose"},
                  {e:"📖",l:"Learn",h:"/learn"},
                  {e:"💬",l:"AI Chat",h:"/chat"},
                  {e:"📣",l:"Advertise",h:"/advertise"},
                ].map(x=>(
                  <Link key={x.h} href={x.h}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 hover:text-brand hover:bg-lime/20 px-2 py-1.5 rounded-lg transition-all">
                    <span>{x.e}</span>{x.l}
                  </Link>
                ))}
              </div>
            </Widget>

          </aside>
        </div>
      </div>
    </main>
  );
}
