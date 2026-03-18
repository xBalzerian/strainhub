"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const SCREENSHOTS = ["archive-seed-bank", "barneys-farm", "compound-genetics", "crop-king-seeds", "dna-genetics", "dutch-passion", "ethos-genetics", "fast-buds", "greenpoint-seeds", "herbies-seeds", "homegrown-cannabis-co", "humboldt-seed-company", "ilgm", "mephisto-genetics", "north-atlantic-seed-co", "royal-queen-seeds", "seed-supreme", "seedsman", "sensi-seeds", "zamnesia"];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function fetchSeedbank(slug: string) {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/seedbanks?slug=eq.${slug}&select=*&limit=1`,
    { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
  );
  const data = await res.json();
  return data?.[0] ?? null;
}

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

const FLAGS: Record<string,string> = { USA:"🇺🇸", Canada:"🇨🇦", Netherlands:"🇳🇱", Spain:"🇪🇸", UK:"🇬🇧" };
const PAY_ICON: Record<string,string> = { "Credit Card":"💳", Bitcoin:"₿", Crypto:"₿", Cash:"💵", "Money Order":"📮", Interac:"🏦", Venmo:"📱", Zelle:"📱", Check:"📝", "Bank Transfer":"🏦", "Cash App":"📱", iDeal:"🏦", Klarna:"💳" };
const SHIP_ICON: Record<string,string> = { USA:"🇺🇸", Canada:"🇨🇦", International:"🌍", UK:"🇬🇧" };
const SEED_COLORS: Record<string,string> = {
  Feminized: "bg-pink-100 text-pink-700 border-pink-200",
  Auto: "bg-blue-100 text-blue-700 border-blue-200",
  Regular: "bg-amber-100 text-amber-700 border-amber-200",
  CBD: "bg-green-100 text-green-700 border-green-200",
  "F1 Hybrid": "bg-purple-100 text-purple-700 border-purple-200",
  Triploid: "bg-orange-100 text-orange-700 border-orange-200",
};
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

function LogoImg({ src, name }: { src: string; name: string }) {
  const [err, setErr] = useState(false);
  if (!src || err) return (
    <div className="w-full h-full bg-lime-pale flex items-center justify-center">
      <span className="text-3xl font-black text-lime-dark">{name.charAt(0)}</span>
    </div>
  );
  return <img src={src} alt={name} className="w-full h-full object-contain p-2" onError={() => setErr(true)} />;
}

function Stars({ rating, sm }: { rating: number; sm?: boolean }) {
  return (
    <div className={`flex items-center gap-0.5 ${sm ? "text-xs" : "text-sm"}`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? "text-lime" : "text-gray-300"}>★</span>
      ))}
    </div>
  );
}

export default function SeedbankDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [sb, setSb] = useState<Seedbank|null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [ssErr, setSsErr] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchSeedbank(slug).then(d => { setSb(d); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-off-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-brand border-t-lime rounded-full animate-spin" />
        <span className="text-gray-500 text-sm font-medium">Loading...</span>
      </div>
    </div>
  );

  if (!sb) return (
    <div className="min-h-screen bg-off-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">🌿</div>
        <h1 className="text-2xl font-black text-brand mb-2">Not Found</h1>
        <Link href="/seedbanks" className="text-lime-dark hover:underline font-semibold">← Back to Seed Banks</Link>
      </div>
    </div>
  );

  const faq: FAQ[] = Array.isArray(sb.faq) ? sb.faq : [];
  const strains: string[] = Array.isArray(sb.notable_strains) ? sb.notable_strains : [];
  const seedTypes: string[] = Array.isArray(sb.seed_types) ? sb.seed_types : [];
  const shipping: string[] = Array.isArray(sb.shipping_regions) ? sb.shipping_regions : [];
  const payments: string[] = Array.isArray(sb.payment_methods) ? sb.payment_methods : [];
  const reviews: { author: string; rating: number; body: string; date: string }[] = Array.isArray(sb.reviews) ? sb.reviews : [];
  const hasScreenshot = SCREENSHOTS.includes(sb.slug);
  const screenshotUrl = `https://raw.githubusercontent.com/xBalzerian/strainhub/main/public/images/seedbanks/${sb.slug}.webp`;
  const yearsActive = sb.founded_year ? new Date().getFullYear() - sb.founded_year : null;

  return (
    <div className="min-h-screen bg-off-white">

      {/* ── HERO HEADER (brand dark) ── */}
      <div className="bg-brand text-white border-b-2 border-brand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <Link href="/" className="hover:text-lime transition-colors">Home</Link>
            <span>/</span>
            <Link href="/seedbanks" className="hover:text-lime transition-colors">Seed Banks</Link>
            <span>/</span>
            <span className="text-gray-300">{sb.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 bg-white shadow-brutal">
                <LogoImg src={sb.logo_url} name={sb.name} />
              </div>
              {sb.is_verified && (
                <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-lime rounded-full flex items-center justify-center border-2 border-brand shadow-sm">
                  <svg className="w-3.5 h-3.5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-3xl sm:text-4xl font-black leading-none">{sb.name}</h1>
                {sb.is_verified && (
                  <span className="bg-lime text-brand text-[10px] font-black px-2 py-0.5 rounded-full border border-lime leading-none">
                    ✓ VERIFIED
                  </span>
                )}
                <span className="text-xl">{FLAGS[sb.country] || "🌍"}</span>
              </div>

              {sb.short_bio && (
                <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-2xl">{sb.short_bio}</p>
              )}

              {/* Meta pills */}
              <div className="flex flex-wrap gap-2">
                {(sb.city || sb.state_province) && (
                  <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-xs text-gray-300 flex items-center gap-1.5">
                    📍 {[sb.city, sb.state_province, sb.country].filter(Boolean).join(", ")}
                  </span>
                )}
                {sb.founded_year && (
                  <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-xs text-gray-300 flex items-center gap-1.5">
                    📅 Est. {sb.founded_year}{yearsActive ? ` · ${yearsActive}y` : ""}
                  </span>
                )}
                {sb.website && (
                  <a href={sb.website} target="_blank" rel="noopener noreferrer"
                    className="bg-lime text-brand border-2 border-lime px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 hover:bg-lime-dark transition-colors shadow-brutal-sm">
                    🌐 Visit Website ↗
                  </a>
                )}
                {sb.social_instagram && (
                  <a href={`https://instagram.com/${sb.social_instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer"
                    className="bg-white/10 border border-pink-400/40 px-3 py-1.5 rounded-full text-xs text-pink-300 font-semibold flex items-center gap-1.5 hover:bg-pink-500/20 transition-colors">
                    📸 {sb.social_instagram}
                  </a>
                )}
              </div>
            </div>

            <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}`}
              className="flex-shrink-0 bg-white/10 border border-white/20 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
              🏷️ Claim Listing
            </Link>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {[
              { label: "Rating", value: sb.rating?.toFixed(1) || "N/A", sub: <Stars rating={sb.rating || 0}/>, icon: "⭐" },
              { label: "Reviews", value: (sb.review_count || 0).toLocaleString(), sub: <span className="text-gray-500 text-[11px]">Verified</span>, icon: "💬" },
              { label: "Founded", value: sb.founded_year || "—", sub: <span className="text-gray-500 text-[11px]">{yearsActive ? `${yearsActive} yrs exp` : "Legacy"}</span>, icon: "📅" },
              { label: "Seed Types", value: seedTypes.length || "—", sub: <span className="text-gray-500 text-[11px] leading-tight">{seedTypes.slice(0,2).join(" · ")}</span>, icon: "🌱" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <div className="text-2xl font-black text-lime mb-0.5">{s.value}</div>
                <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{s.label}</div>
                <div>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WEBSITE SCREENSHOT ── */}
      {hasScreenshot && !ssErr && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
          <div className="border-2 border-brand rounded-2xl overflow-hidden shadow-brutal bg-white">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-brand/5 border-b-2 border-brand/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500"/>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500"/>
                <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500"/>
              </div>
              <div className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-1 text-xs text-gray-400 font-mono truncate">
                {sb.website || `${sb.slug}.com`}
              </div>
              {sb.website && (
                <a href={sb.website} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-lime-dark font-bold hover:underline whitespace-nowrap">
                  Visit ↗
                </a>
              )}
            </div>
            <div className="relative w-full" style={{paddingBottom:"56.25%"}}>
              <Image
                src={screenshotUrl}
                alt={`${sb.name} website screenshot`}
                fill
                className="object-cover object-top"
                sizes="(max-width:768px) 100vw, 1200px"
                loading="lazy"
                unoptimized
                onError={() => setSsErr(true)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN BODY ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* About */}
            <div className="bg-white border-2 border-brand rounded-2xl p-6 shadow-brutal">
              <h2 className="text-lg font-black text-brand mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-lime rounded-lg flex items-center justify-center text-xs border border-brand flex-shrink-0">📖</span>
                About {sb.name}
              </h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">{sb.description}</p>
            </div>

            {/* Notable Strains */}
            {strains.length > 0 && (
              <div className="bg-white border-2 border-brand rounded-2xl p-6 shadow-brutal">
                <h2 className="text-lg font-black text-brand mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-lime rounded-lg flex items-center justify-center text-xs border border-brand flex-shrink-0">🌿</span>
                  Notable Strains
                  <span className="ml-auto text-xs text-gray-400 font-normal">{strains.length} strains</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {strains.map((strain) => {
                    const strainSlug = strain.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
                    return (
                      <Link key={strain} href={`/strains/${strainSlug}`}
                        className="group flex items-center gap-2 p-2.5 bg-off-white hover:bg-lime-pale border-2 border-brand/20 hover:border-brand rounded-xl transition-all">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0"/>
                        <span className="text-brand text-xs font-semibold leading-tight truncate">{strain}</span>
                        <span className="ml-auto text-brand opacity-0 group-hover:opacity-100 transition-opacity text-[10px] flex-shrink-0 font-bold">→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Genetics Catalog */}
            {seedTypes.length > 0 && (
              <div className="bg-white border-2 border-brand rounded-2xl p-6 shadow-brutal">
                <h2 className="text-lg font-black text-brand mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-lime rounded-lg flex items-center justify-center text-xs border border-brand flex-shrink-0">🧬</span>
                  Genetics Catalog
                </h2>
                <div className="flex flex-wrap gap-2 mb-5">
                  {seedTypes.map(t => (
                    <span key={t} className={`px-2.5 py-1 rounded-full text-xs font-bold border ${SEED_COLORS[t] || "bg-gray-100 text-gray-600 border-gray-200"}`}>{t}</span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seedTypes.map(t => {
                    const info = TYPE_INFO[t]; if (!info) return null;
                    return (
                      <div key={t} className="flex gap-3 p-3.5 bg-off-white border border-brand/10 rounded-xl">
                        <span className="text-lg flex-shrink-0">{info.icon}</span>
                        <div>
                          <div className="text-xs font-black text-brand mb-0.5">{t}</div>
                          <p className="text-gray-500 text-xs leading-relaxed">{info.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reviews */}
            {reviews.length > 0 && (
              <div className="bg-white border-2 border-brand rounded-2xl p-6 shadow-brutal">
                <h2 className="text-lg font-black text-brand mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-lime rounded-lg flex items-center justify-center text-xs border border-brand flex-shrink-0">💬</span>
                  Grower Reviews
                </h2>
                <div className="space-y-3">
                  {reviews.slice(0,3).map((r,i) => (
                    <div key={i} className="p-4 bg-off-white border border-brand/10 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-lime border-2 border-brand flex items-center justify-center text-xs font-black text-brand">
                            {r.author?.charAt(0)?.toUpperCase()||"G"}
                          </div>
                          <div>
                            <div className="text-sm font-black text-brand">{r.author||"Grower"}</div>
                            {r.date && <div className="text-xs text-gray-400">{r.date}</div>}
                          </div>
                        </div>
                        <Stars rating={r.rating||5} sm/>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{r.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {faq.length > 0 && (
              <div className="bg-white border-2 border-brand rounded-2xl p-6 shadow-brutal">
                <h2 className="text-lg font-black text-brand mb-6 flex items-center gap-2">
                  <span className="w-7 h-7 bg-lime rounded-lg flex items-center justify-center text-xs border border-brand flex-shrink-0">❓</span>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {faq.map((item,i) => (
                    <div key={i} className={`border-2 rounded-xl overflow-hidden transition-all ${openFaq===i ? "border-brand" : "border-brand/20"}`}>
                      <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                        className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-lime-pale transition-colors">
                        <span className={`font-bold text-sm leading-snug ${openFaq===i ? "text-brand" : "text-gray-700"}`}>{item.question}</span>
                        <span className={`w-6 h-6 flex-shrink-0 rounded-full border-2 border-brand flex items-center justify-center text-xs font-black transition-all duration-200 ${openFaq===i ? "bg-lime text-brand rotate-45" : "bg-white text-brand"}`}>+</span>
                      </button>
                      {openFaq===i && (
                        <div className="px-4 pb-4 pt-2 text-gray-600 text-sm leading-relaxed bg-lime-pale border-t-2 border-brand/20">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Claim CTA */}
            <div className="bg-brand border-2 border-brand rounded-2xl p-6 sm:p-8 shadow-brutal">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <h3 className="text-lg font-black text-white mb-1">Is this your seed bank?</h3>
                  <p className="text-gray-400 text-sm max-w-sm">Claim this listing to edit your profile, post promos, and announce seed drops.</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}`}
                    className="bg-lime hover:bg-lime-dark text-brand font-black px-5 py-3 rounded-xl border-2 border-lime shadow-brutal-sm hover:shadow-brutal transition-all text-sm">
                    🏷️ Claim Listing
                  </Link>
                  <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}&type=promo`}
                    className="bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold px-4 py-3 rounded-xl transition-all text-sm">
                    🎁 Add Promo
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-5">

            {/* Quick Info */}
            <div className="bg-white border-2 border-brand rounded-2xl p-5 shadow-brutal lg:sticky lg:top-4">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">📋 Quick Info</h3>
              <dl className="space-y-0">
                {([
                  ["Country", `${FLAGS[sb.country]||"🌍"} ${sb.country}`],
                  ["Location", [sb.city,sb.state_province].filter(Boolean).join(", ")||sb.country],
                  ["Founded", String(sb.founded_year||"—")],
                  ["Experience", yearsActive ? `${yearsActive} years` : "—"],
                  ["Rank", sb.rank_popularity ? `#${sb.rank_popularity} Global` : "—"],
                ] as [string,string][]).map(([label,value]) => (
                  <div key={label} className="flex items-center justify-between py-2.5 border-b border-brand/10 last:border-0">
                    <dt className="text-gray-500 text-xs">{label}</dt>
                    <dd className="text-brand text-xs font-black">{value}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between py-2.5 border-b border-brand/10">
                  <dt className="text-gray-500 text-xs">Status</dt>
                  <dd className="flex items-center gap-1.5 text-xs font-black">
                    {sb.is_active ? (
                      <><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>Active</>
                    ) : (
                      <span className="text-gray-400">Inactive</span>
                    )}
                  </dd>
                </div>
                {sb.website && (
                  <div className="flex items-center justify-between py-2.5 border-b border-brand/10">
                    <dt className="text-gray-500 text-xs">Website</dt>
                    <dd><a href={sb.website} target="_blank" rel="noopener noreferrer" className="text-lime-dark hover:underline text-xs font-black">Visit ↗</a></dd>
                  </div>
                )}
                {sb.social_instagram && (
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-gray-500 text-xs">Instagram</dt>
                    <dd><a href={`https://instagram.com/${sb.social_instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 text-xs font-bold">{sb.social_instagram}</a></dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Ships To */}
            {shipping.length > 0 && (
              <div className="bg-white border-2 border-brand rounded-2xl p-5 shadow-brutal">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">📦 Ships To</h3>
                <div className="space-y-2">
                  {shipping.map(r => (
                    <div key={r} className="flex items-center gap-2 py-1.5 border-b border-brand/8 last:border-0">
                      <span>{SHIP_ICON[r]||"🌍"}</span>
                      <span className="text-brand text-xs font-semibold flex-1">{r}</span>
                      <span className="w-2 h-2 rounded-full bg-lime"/>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seed Types */}
            {seedTypes.length > 0 && (
              <div className="bg-white border-2 border-brand rounded-2xl p-5 shadow-brutal">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">🌱 Seed Types</h3>
                <div className="flex flex-wrap gap-1.5">
                  {seedTypes.map(t => (
                    <span key={t} className={`px-2.5 py-1 rounded-full text-xs font-bold border ${SEED_COLORS[t]||"bg-gray-100 text-gray-600 border-gray-200"}`}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {payments.length > 0 && (
              <div className="bg-white border-2 border-brand rounded-2xl p-5 shadow-brutal">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">💳 Payment</h3>
                <div className="space-y-1.5">
                  {payments.map(p => (
                    <div key={p} className="flex items-center gap-2 text-xs text-brand py-1 border-b border-brand/8 last:border-0">
                      <span>{PAY_ICON[p]||"💳"}</span><span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visit CTA */}
            {sb.website && (
              <a href={sb.website} target="_blank" rel="noopener noreferrer"
                className="block text-center bg-lime hover:bg-lime-dark text-brand font-black py-4 rounded-2xl border-2 border-brand shadow-brutal hover:shadow-brutal-lg transition-all hover:-translate-y-0.5 text-sm">
                Visit {sb.name} ↗
              </a>
            )}

            <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}&type=event`}
              className="block text-center text-xs bg-white border-2 border-brand text-brand hover:bg-lime-pale font-semibold py-3 rounded-xl transition-all shadow-brutal-sm">
              📅 Post a Seed Drop Event
            </Link>

            <Link href="/seedbanks" className="flex items-center justify-center gap-1.5 text-gray-500 hover:text-brand text-xs font-semibold transition-colors">
              ← All Seed Banks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
