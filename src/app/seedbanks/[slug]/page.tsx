"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
interface FAQ { question: string; answer: string; }
interface Seedbank {
  id: string; name: string; slug: string; country: string;
  state_province: string; city: string; founded_year: number;
  website: string; description: string; short_bio: string;
  logo_url: string; notable_strains: string[]; seed_types: string[];
  shipping_regions: string[]; payment_methods: string[];
  rating: number; review_count: number;
  reviews: { author: string; rating: number; body: string; date: string }[];
  social_instagram: string; social_twitter: string;
  is_verified: boolean; is_active: boolean; rank_popularity: number;
  faq: FAQ[];
}

function LogoImage({ src, name }: { src: string; name: string }) {
  const [err, setErr] = useState(false);
  if (!src || err) return (
    <div className="w-full h-full bg-gradient-to-br from-[#1a2a1a] to-[#0e1a0e] flex items-center justify-center">
      <span className="text-4xl font-black text-[#aaff00]">{name.charAt(0)}</span>
    </div>
  );
  return <img src={src} alt={name} className="w-full h-full object-contain p-2" onError={() => setErr(true)} />;
}

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm"|"md"|"lg" }) {
  const sz = size === "lg" ? "w-6 h-6" : size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => {
        const full = i <= Math.floor(rating); const half = !full && i <= rating+0.5;
        return <svg key={i} className={`${sz} ${full||half?"text-[#aaff00]":"text-gray-700"}`} fill={full||half?"currentColor":"none"} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>;
      })}
    </div>
  );
}

function SeedTypeBadge({ type }: { type: string }) {
  const map: Record<string,string> = {
    Feminized:"bg-pink-500/15 text-pink-300 border-pink-500/25",
    Auto:"bg-blue-500/15 text-blue-300 border-blue-500/25",
    Regular:"bg-amber-500/15 text-amber-300 border-amber-500/25",
    CBD:"bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    "F1 Hybrid":"bg-violet-500/15 text-violet-300 border-violet-500/25",
    Triploid:"bg-orange-500/15 text-orange-300 border-orange-500/25",
    "Mix Packs":"bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
    Clones:"bg-lime-500/15 text-lime-300 border-lime-500/25",
  };
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${map[type]||"bg-white/5 text-gray-400 border-white/10"}`}>{type}</span>;
}

const FLAGS: Record<string,string> = {USA:"🇺🇸",Canada:"🇨🇦",Netherlands:"🇳🇱",Spain:"🇪🇸",UK:"🇬🇧"};
const PAY_ICON: Record<string,string> = {"Credit Card":"💳",Bitcoin:"₿",Crypto:"₿",Cash:"💵","Money Order":"📮",Interac:"🏦",Venmo:"📱",Zelle:"📱",Check:"📝","Bank Transfer":"🏦","Cash App":"📱",iDeal:"🏦",Klarna:"💳"};
const SHIP_ICON: Record<string,string> = {USA:"🇺🇸",Canada:"🇨🇦",International:"🌍",UK:"🇬🇧",Netherlands:"🇳🇱",Spain:"🇪🇸"};
const TYPE_INFO: Record<string,{icon:string;desc:string}> = {
  Feminized:{icon:"♀️",desc:"Guaranteed female plants — every seed produces bud. Max yield, zero wasted effort on males."},
  Auto:{icon:"⏱️",desc:"Flowers by age, not light cycle. Fast 8–10 week harvests, beginner-friendly."},
  Regular:{icon:"⚥",desc:"Natural male/female ratio. The breeder's choice for creating new crosses."},
  CBD:{icon:"💊",desc:"High CBD, minimal THC. Therapeutic effects without the psychoactive high."},
  "F1 Hybrid":{icon:"🧪",desc:"First-gen hybrids from inbred lines. Exceptional uniformity, vigor, and superior yields."},
  Triploid:{icon:"🔬",desc:"3-chromosome plants — seedless 99%+ even near males. Future of commercial cultivation."},
  "Mix Packs":{icon:"📦",desc:"Curated multi-strain bundles — explore genetics without buying full packs."},
  Clones:{icon:"🌿",desc:"Rooted cuttings of proven phenotypes. Skip germination, start growing immediately."},
};

export default function SeedbankDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [sb, setSb] = useState<Seedbank|null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number|null>(null);

  useEffect(()=>{
    if(!slug) return;
    supabase.from("seedbanks").select("*").eq("slug",slug).single()
      .then(({data})=>{ setSb(data as Seedbank|null); setLoading(false); });
  },[slug]);

  if(loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-[#aaff00]/30 border-t-[#aaff00] rounded-full animate-spin"/>
        <span className="text-gray-500 text-sm">Loading...</span>
      </div>
    </div>
  );

  if(!sb) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🌿</div>
        <h1 className="text-2xl font-black text-white mb-2">Not Found</h1>
        <Link href="/seedbanks" className="text-[#aaff00] hover:underline">← Back to Seed Banks</Link>
      </div>
    </div>
  );

  const faq: FAQ[] = Array.isArray(sb.faq)?sb.faq:[];
  const strains: string[] = Array.isArray(sb.notable_strains)?sb.notable_strains:[];
  const seedTypes: string[] = Array.isArray(sb.seed_types)?sb.seed_types:[];
  const shipping: string[] = Array.isArray(sb.shipping_regions)?sb.shipping_regions:[];
  const payments: string[] = Array.isArray(sb.payment_methods)?sb.payment_methods:[];
  const reviews: {author:string;rating:number;body:string;date:string}[] = Array.isArray(sb.reviews)?sb.reviews:[];
  const yearsActive = sb.founded_year ? new Date().getFullYear()-sb.founded_year : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a0d] via-[#090f09] to-[#0a0a0a]"/>
        <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(ellipse 80% 60% at 50% -20%, rgba(170,255,0,0.08), transparent)"}}/>
        <div className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:"radial-gradient(circle, #aaff00 1px, transparent 1px)",backgroundSize:"28px 28px"}}/>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-600 mb-8 font-medium">
            <Link href="/" className="hover:text-gray-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/seedbanks" className="hover:text-gray-400 transition-colors">Seed Banks</Link>
            <span>/</span>
            <span className="text-gray-400">{sb.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Logo */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60" style={{background:"linear-gradient(135deg,#111,#1a1a1a)"}}>
                <LogoImage src={sb.logo_url} name={sb.name}/>
              </div>
              {sb.is_verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#aaff00] rounded-full flex items-center justify-center shadow-lg shadow-[#aaff00]/40 border-2 border-[#0a0a0a]">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                </div>
              )}
              {sb.rank_popularity && sb.rank_popularity<=10 && (
                <div className="absolute -top-2 -left-2 bg-gradient-to-br from-yellow-400 to-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">#{sb.rank_popularity}</div>
              )}
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                <h1 className="text-3xl sm:text-5xl font-black leading-none tracking-tight">{sb.name}</h1>
                {sb.is_verified && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#aaff00]/10 border border-[#aaff00]/25 text-[#aaff00] rounded-full text-xs font-black tracking-widest uppercase">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Verified
                  </span>
                )}
                <span className="text-2xl">{FLAGS[sb.country]||"🌍"}</span>
              </div>
              {sb.short_bio && <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5 max-w-2xl">{sb.short_bio}</p>}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {(sb.city||sb.state_province) && (
                  <span className="flex items-center gap-1.5 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full text-xs text-gray-300">
                    📍 {[sb.city,sb.state_province,sb.country].filter(Boolean).join(", ")}
                  </span>
                )}
                {sb.founded_year && (
                  <span className="flex items-center gap-1.5 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full text-xs text-gray-300">
                    📅 Est. {sb.founded_year}{yearsActive && <span className="text-gray-500 ml-1">· {yearsActive}y</span>}
                  </span>
                )}
                {sb.website && (
                  <a href={sb.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-[#aaff00]/10 border border-[#aaff00]/25 px-3 py-1.5 rounded-full text-xs text-[#aaff00] font-semibold hover:bg-[#aaff00]/20 transition-colors">
                    🌐 Official Website ↗
                  </a>
                )}
                {sb.social_instagram && (
                  <a href={`https://instagram.com/${sb.social_instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-pink-500/10 border border-pink-500/20 px-3 py-1.5 rounded-full text-xs text-pink-400 font-semibold hover:bg-pink-500/15 transition-colors">
                    📸 {sb.social_instagram}
                  </a>
                )}
                {sb.social_twitter && (
                  <a href={`https://twitter.com/${sb.social_twitter.replace("@","")}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-sky-500/10 border border-sky-500/20 px-3 py-1.5 rounded-full text-xs text-sky-400 font-semibold hover:bg-sky-500/15 transition-colors">
                    🐦 {sb.social_twitter}
                  </a>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 lg:self-start">
              <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-[#aaff00]/30 text-gray-300 hover:text-white text-xs font-bold rounded-xl transition-all whitespace-nowrap">
                🏷️ Claim This Listing
              </Link>
            </div>
          </div>

          {/* Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {[
              {label:"Community Rating",big:sb.rating?.toFixed(1)??"N/A",sub:<StarRating rating={sb.rating||0}/>,icon:"⭐"},
              {label:"Verified Reviews",big:(sb.review_count||0).toLocaleString(),sub:<span className="text-[11px] text-gray-600">From the community</span>,icon:"💬"},
              {label:"Founded",big:sb.founded_year??"—",sub:<span className="text-[11px] text-gray-600">{yearsActive?`${yearsActive} years exp`:"Legacy breeder"}</span>,icon:"📅"},
              {label:"Seed Types",big:seedTypes.length||"—",sub:<span className="text-[11px] text-gray-600 leading-tight">{seedTypes.slice(0,2).join(" · ")}{seedTypes.length>2?` +${seedTypes.length-2}`:""}</span>,icon:"🌱"},
            ].map(s=>(
              <div key={s.label} className="relative overflow-hidden bg-white/[0.035] border border-white/[0.07] rounded-2xl p-4 sm:p-5 group hover:border-[#aaff00]/20 transition-all">
                <div className="absolute top-3 right-3 text-lg opacity-30 group-hover:opacity-60 transition-opacity">{s.icon}</div>
                <div className="text-2xl sm:text-3xl font-black mb-1 text-[#aaff00]">{s.big}</div>
                <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">{s.label}</div>
                <div>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN BODY */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* About */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 sm:p-8 hover:border-white/[0.1] transition-colors">
              <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2.5">
                <span className="w-7 h-7 bg-[#aaff00]/15 rounded-lg flex items-center justify-center text-xs flex-shrink-0">📖</span>
                About {sb.name}
              </h2>
              <p className="text-gray-400 leading-relaxed text-[15px]">{sb.description}</p>
            </div>

            {/* Notable Strains */}
            {strains.length>0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 sm:p-8 hover:border-white/[0.1] transition-colors">
                <h2 className="text-lg font-black text-white mb-5 flex items-center gap-2.5">
                  <span className="w-7 h-7 bg-[#aaff00]/15 rounded-lg flex items-center justify-center text-xs flex-shrink-0">🌿</span>
                  Notable Strains
                  <span className="ml-auto text-xs text-gray-600 font-normal">{strains.length} strains</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {strains.map(strain=>{
                    const strainSlug = strain.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
                    return (
                      <Link key={strain} href={`/strains/${strainSlug}`}
                        className="group flex items-center gap-2.5 p-3 bg-white/[0.03] hover:bg-[#aaff00]/8 border border-white/[0.06] hover:border-[#aaff00]/25 rounded-xl transition-all duration-150">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#aaff00]/60 flex-shrink-0 group-hover:bg-[#aaff00] transition-colors"/>
                        <span className="text-gray-400 group-hover:text-white text-xs font-medium leading-tight truncate">{strain}</span>
                        <span className="ml-auto text-[#aaff00] opacity-0 group-hover:opacity-100 transition-opacity text-[10px] flex-shrink-0">→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Genetics Catalog */}
            {seedTypes.length>0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-black text-white mb-5 flex items-center gap-2.5">
                  <span className="w-7 h-7 bg-[#aaff00]/15 rounded-lg flex items-center justify-center text-xs flex-shrink-0">🧬</span>
                  Genetics Catalog
                </h2>
                <div className="flex flex-wrap gap-2 mb-5">{seedTypes.map(t=><SeedTypeBadge key={t} type={t}/>)}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seedTypes.map(t=>{
                    const info = TYPE_INFO[t]; if(!info) return null;
                    return (
                      <div key={t} className="flex gap-3 p-3.5 bg-white/[0.025] border border-white/[0.05] rounded-2xl">
                        <span className="text-lg flex-shrink-0 mt-0.5">{info.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-gray-300 mb-1">{t}</div>
                          <p className="text-gray-500 text-xs leading-relaxed">{info.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reviews */}
            {reviews.length>0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-black text-white mb-5 flex items-center gap-2.5">
                  <span className="w-7 h-7 bg-[#aaff00]/15 rounded-lg flex items-center justify-center text-xs flex-shrink-0">💬</span>
                  Grower Reviews
                </h2>
                <div className="space-y-3">
                  {reviews.slice(0,3).map((r,i)=>(
                    <div key={i} className="p-4 bg-white/[0.025] border border-white/[0.05] rounded-2xl">
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#aaff00]/30 to-[#1a3a1a] flex items-center justify-center text-xs font-black text-[#aaff00]">
                            {r.author?.charAt(0)?.toUpperCase()||"G"}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-200">{r.author||"Anonymous Grower"}</div>
                            {r.date && <div className="text-xs text-gray-600">{r.date}</div>}
                          </div>
                        </div>
                        <StarRating rating={r.rating||5} size="sm"/>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{r.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {faq.length>0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-black text-white mb-6 flex items-center gap-2.5">
                  <span className="w-7 h-7 bg-[#aaff00]/15 rounded-lg flex items-center justify-center text-xs flex-shrink-0">❓</span>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {faq.map((item,i)=>(
                    <div key={i} className={`border rounded-2xl overflow-hidden transition-all duration-200 ${openFaq===i?"border-[#aaff00]/25 bg-[#aaff00]/[0.03]":"border-white/[0.06] bg-white/[0.02]"}`}>
                      <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left">
                        <span className={`font-semibold text-sm leading-snug transition-colors ${openFaq===i?"text-white":"text-gray-300"}`}>{item.question}</span>
                        <span className={`w-6 h-6 flex-shrink-0 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-200 ${openFaq===i?"bg-[#aaff00] border-[#aaff00] text-black rotate-45":"border-white/20 text-gray-400"}`}>+</span>
                      </button>
                      {openFaq===i && (
                        <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/[0.05] pt-4">{item.answer}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Claim CTA */}
            <div className="relative overflow-hidden rounded-3xl border border-[#aaff00]/20 p-6 sm:p-8"
              style={{background:"linear-gradient(135deg,rgba(170,255,0,0.06) 0%,rgba(170,255,0,0.02) 50%,transparent 100%)"}}>
              <div className="absolute right-0 top-0 w-64 h-full opacity-[0.06]"
                style={{background:"radial-gradient(ellipse at 100% 50%, #aaff00, transparent 70%)"}}/>
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <h3 className="text-lg font-black text-white mb-1.5">Is this your seed bank?</h3>
                  <p className="text-gray-400 text-sm max-w-sm">Claim this listing to edit your profile, post promotions, announce drops, and reach thousands of growers.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                  <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}`}
                    className="inline-flex items-center gap-2 bg-[#aaff00] text-black font-black px-5 py-3 rounded-xl hover:bg-[#ccff44] transition-colors text-sm whitespace-nowrap">
                    🏷️ Claim Listing
                  </Link>
                  <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}&type=promo`}
                    className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 text-gray-300 hover:text-white font-semibold px-5 py-3 rounded-xl hover:border-white/20 transition-all text-sm whitespace-nowrap">
                    🎁 Add Promo
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-4">

            {/* Quick Info */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-5 lg:sticky lg:top-6">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">📋 Quick Info</h3>
              <dl className="space-y-0">
                {([
                  ["Country", `${FLAGS[sb.country]||"🌍"} ${sb.country}`],
                  ["Location", [sb.city,sb.state_province].filter(Boolean).join(", ")||sb.country],
                  ["Founded", sb.founded_year||"—"],
                  ["Experience", yearsActive?`${yearsActive} years`:"—"],
                  ["Rank", sb.rank_popularity?`#${sb.rank_popularity} Global`:"—"],
                ] as [string,string][]).map(([label,value])=>(
                  <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                    <dt className="text-gray-500 text-xs">{label}</dt>
                    <dd className="text-gray-200 text-xs font-bold text-right">{value}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
                  <dt className="text-gray-500 text-xs">Status</dt>
                  <dd>{sb.is_active
                    ? <span className="flex items-center gap-1.5 text-[#aaff00] text-xs font-bold"><span className="w-1.5 h-1.5 rounded-full bg-[#aaff00] animate-pulse"/>Active</span>
                    : <span className="text-gray-500 text-xs">Inactive</span>}
                  </dd>
                </div>
                {sb.website && (
                  <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
                    <dt className="text-gray-500 text-xs">Website</dt>
                    <dd><a href={sb.website} target="_blank" rel="noopener noreferrer" className="text-[#aaff00] hover:underline text-xs font-bold">Visit ↗</a></dd>
                  </div>
                )}
                {sb.social_instagram && (
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-gray-500 text-xs">Instagram</dt>
                    <dd><a href={`https://instagram.com/${sb.social_instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 text-xs font-bold">{sb.social_instagram}</a></dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Ships To */}
            {shipping.length>0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-5">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">📦 Ships To</h3>
                <div className="space-y-2">
                  {shipping.map(r=>(
                    <div key={r} className="flex items-center gap-2.5 py-1.5 border-b border-white/[0.04] last:border-0">
                      <span className="text-base">{SHIP_ICON[r]||"🌍"}</span>
                      <span className="text-gray-300 text-xs font-medium flex-1">{r}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#aaff00]"/>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seed Types sidebar */}
            {seedTypes.length>0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-5">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">🌱 Seed Types</h3>
                <div className="flex flex-wrap gap-1.5">{seedTypes.map(t=><SeedTypeBadge key={t} type={t}/>)}</div>
              </div>
            )}

            {/* Payment Methods */}
            {payments.length>0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-5">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">💳 Payment</h3>
                <div className="space-y-2">
                  {payments.map(p=>(
                    <div key={p} className="flex items-center gap-2 text-xs text-gray-300 py-1 border-b border-white/[0.04] last:border-0">
                      <span className="text-sm">{PAY_ICON[p]||"💳"}</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sb.website && (
              <a href={sb.website} target="_blank" rel="noopener noreferrer"
                className="block text-center bg-[#aaff00] hover:bg-[#ccff44] text-black font-black py-4 rounded-2xl transition-all text-sm shadow-lg shadow-[#aaff00]/15 hover:-translate-y-0.5">
                Visit {sb.name} ↗
              </a>
            )}

            <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}&type=event`}
              className="block text-center text-xs bg-white/[0.04] border border-white/[0.08] hover:border-[#aaff00]/25 text-gray-500 hover:text-gray-300 font-semibold py-3 rounded-2xl transition-all">
              📅 Post a Seed Drop Event
            </Link>

            <Link href="/seedbanks" className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-400 text-xs transition-colors py-1">
              ← All Seed Banks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
