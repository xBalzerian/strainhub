"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const SS_SLUGS: string[] = ["amsterdam-marijuana-seeds", "archive-seed-bank", "attitude-seedbank", "barneys-farm", "bc-bud-depot", "beaver-seeds", "blimburn-seeds", "bloom-seed-co", "bodhi-seeds", "cannarado-genetics", "capulator", "clearwater-genetics", "compound-genetics", "cookies-fam-genetics", "crop-king-seeds", "csi-humboldt", "dark-horse-genetics", "dna-genetics", "dutch-passion", "dying-breed-seeds", "ethos-genetics", "exotic-genetix", "fast-buds", "gg-strains", "greenhouse-seeds", "greenpoint-seeds", "growers-choice-seeds", "gtr-seeds", "herbies-seeds", "homegrown-cannabis-co", "humboldt-seed-company", "ilgm", "in-house-genetics", "mephisto-genetics", "ministry-of-cannabis", "msnl", "neptune-seed-bank", "nirvana-shop", "north-atlantic-seed-co", "oni-seed-co", "pacific-seed-bank", "pistil-petes", "premium-cultivars", "quebec-cannabis-seeds", "rare-dankness", "resin-seeds", "rocket-seeds", "royal-queen-seeds", "seed-junky-genetics", "seed-supreme", "seedsman", "sensi-seeds", "solfire-gardens", "sunwest-genetics", "symbiotic-genetics", "tangled-roots", "tga-genetics", "tiki-madman", "trilogene-seeds", "true-north-seed-bank", "weed-seeds-express", "zamnesia"];

interface ExtraSocial { fb?: string; yt?: string; gmb?: string; }
const EXTRA: Record<string, ExtraSocial> = {"compound-genetics": {"fb": "compoundgenetics", "yt": "compoundgenetics", "gmb": "https://maps.google.com/?q=Compound+Genetics+Los+Angeles+CA"}, "symbiotic-genetics": {"fb": "symbioticgenetics", "gmb": "https://maps.google.com/?q=Symbiotic+Genetics+San+Francisco+CA"}, "cookies-fam-genetics": {"fb": "CookiesSF", "yt": "cookiessf", "gmb": "https://maps.google.com/?q=Cookies+SF+San+Francisco+CA"}, "seed-junky-genetics": {"fb": "seedjunkygenetics", "gmb": "https://maps.google.com/?q=Seed+Junky+Genetics+Los+Angeles+CA"}, "ethos-genetics": {"fb": "EthosGenetics", "gmb": "https://maps.google.com/?q=Ethos+Genetics+Denver+CO"}, "dying-breed-seeds": {"fb": "dyingbreedseedsinc", "gmb": "https://maps.google.com/?q=Dying+Breed+Seeds+Sacramento+CA"}, "bloom-seed-co": {"fb": "bloomseedco"}, "archive-seed-bank": {"fb": "archiveseedbank", "gmb": "https://maps.google.com/?q=Archive+Seed+Bank+Portland+OR"}, "exotic-genetix": {"fb": "exotixgenetix"}, "gg-strains": {"fb": "GGStrains"}, "oni-seed-co": {"fb": "oniseedco"}, "in-house-genetics": {"fb": "inhousegenetics"}, "barneys-farm": {"fb": "barneysfarm", "yt": "barneysfarm", "gmb": "https://maps.google.com/?q=Barney%27s+Farm+Amsterdam"}, "dna-genetics": {"fb": "dnagenetics"}, "dark-horse-genetics": {"fb": "darkhorsecannabis"}, "pistil-petes": {"fb": "pistilpetes"}, "rare-dankness": {"fb": "raredankness"}, "tga-genetics": {"fb": "tgasubcool"}, "humboldt-seed-company": {"fb": "humboldtseedcompany", "gmb": "https://maps.google.com/?q=Humboldt+Seed+Company+CA"}, "bc-bud-depot": {"fb": "bcbuddepot", "gmb": "https://maps.google.com/?q=BC+Bud+Depot+British+Columbia"}, "resin-seeds": {"fb": "resinseeds"}, "greenpoint-seeds": {"fb": "greenpointseeds", "gmb": "https://maps.google.com/?q=Greenpoint+Seeds+Colorado"}, "mephisto-genetics": {"fb": "mephistogenetics", "yt": "mephistogenetics"}, "seedsman": {"fb": "seedsman", "yt": "seedsman", "gmb": "https://maps.google.com/?q=Seedsman+Barcelona"}, "true-north-seed-bank": {"fb": "truenorthseedbank", "gmb": "https://maps.google.com/?q=True+North+Seed+Bank+Canada"}, "ilgm": {"fb": "ilovegrowingmarijuana", "yt": "ilgm", "gmb": "https://maps.google.com/?q=ILGM+Los+Angeles+CA"}, "seed-supreme": {"fb": "seedsupreme", "gmb": "https://maps.google.com/?q=Seed+Supreme+Miami+FL"}, "north-atlantic-seed-co": {"fb": "northatlanticseedco"}, "neptune-seed-bank": {"fb": "neptuneseedbank", "gmb": "https://maps.google.com/?q=Neptune+Seed+Bank+San+Diego+CA"}, "royal-queen-seeds": {"fb": "royalqueenseeds", "yt": "royalqueenseeds", "gmb": "https://maps.google.com/?q=Royal+Queen+Seeds+Amsterdam"}, "solfire-gardens": {"fb": "solfiregardens"}, "homegrown-cannabis-co": {"fb": "homegrowncannabiscompany", "yt": "homegrowncannabisco", "gmb": "https://maps.google.com/?q=Homegrown+Cannabis+Co"}, "herbies-seeds": {"fb": "herbiesheadshop", "yt": "herbiesseeds"}, "dutch-passion": {"fb": "dutchpassionseeds", "yt": "dutchpassion", "gmb": "https://maps.google.com/?q=Dutch+Passion+Amsterdam"}, "fast-buds": {"fb": "fastbudscompany", "yt": "fastbuds", "gmb": "https://maps.google.com/?q=Fast+Buds+Barcelona"}, "cannarado-genetics": {"fb": "cannaradogenetics"}, "tiki-madman": {"fb": "tikimadman"}, "premium-cultivars": {"fb": "premiumcultivars"}, "crop-king-seeds": {"fb": "cropkingseeds", "yt": "cropkingseeds", "gmb": "https://maps.google.com/?q=Crop+King+Seeds+Vancouver"}, "msnl": {"fb": "marijuanaseedsnl"}, "sensi-seeds": {"fb": "sensiseeds", "yt": "sensiseeds", "gmb": "https://maps.google.com/?q=Sensi+Seeds+Amsterdam"}, "attitude-seedbank": {"fb": "attitudeseedbank"}, "zamnesia": {"fb": "zamnesia", "yt": "zamnesia", "gmb": "https://maps.google.com/?q=Zamnesia+Netherlands"}, "greenhouse-seeds": {"fb": "thegreenhouseseeds"}, "growers-choice-seeds": {"fb": "growerschoiceseeds"}, "blimburn-seeds": {"fb": "blimburnseeds"}, "pacific-seed-bank": {"fb": "pacificseedbank"}, "weed-seeds-express": {"fb": "weedseedsexpress"}, "beaver-seeds": {"fb": "beaverseeds"}, "sunwest-genetics": {"fb": "sunwestgenetics"}, "rocket-seeds": {"fb": "rocketseeds"}, "ministry-of-cannabis": {"fb": "ministryofcannabis", "gmb": "https://maps.google.com/?q=Ministry+of+Cannabis"}, "amsterdam-marijuana-seeds": {"fb": "amsterdammarijuanaseeds"}};

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
}

const FLAGS: Record<string,string> = { USA:"🇺🇸", Canada:"🇨🇦", Netherlands:"🇳🇱", Spain:"🇪🇸", UK:"🇬🇧" };
const PAY_ICON: Record<string,string> = { "Credit Card":"💳", Bitcoin:"₿", Crypto:"₿", Cash:"💵", "Money Order":"📮", Interac:"🏦", "Cash App":"📱", iDeal:"🏦", Klarna:"💳", "Bank Transfer":"🏦" };
const SHIP_ICON: Record<string,string> = { USA:"🇺🇸", Canada:"🇨🇦", International:"🌍", UK:"🇬🇧" };
const SEED_COLORS: Record<string,string> = {
  Feminized: "bg-pink-100 text-pink-700 border-pink-200",
  Auto: "bg-blue-100 text-blue-700 border-blue-200",
  Regular: "bg-amber-100 text-amber-700 border-amber-200",
  CBD: "bg-green-100 text-green-700 border-green-200",
  "F1 Hybrid": "bg-purple-100 text-purple-700 border-purple-200",
  Triploid: "bg-orange-100 text-orange-700 border-orange-200",
};

function LogoImg({ src, name }: { src: string; name: string }) {
  const [err, setErr] = useState(false);
  const ghLogo = `https://raw.githubusercontent.com/xBalzerian/strainhub/main/public/images/logos/${name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}.png`;
  const finalSrc = err ? ghLogo : (src || ghLogo);
  const [ghErr, setGhErr] = useState(false);
  if (ghErr) return (
    <div className="w-full h-full bg-lime-pale flex items-center justify-center">
      <span className="text-3xl font-black text-lime-dark">{name.charAt(0)}</span>
    </div>
  );
  return <img src={finalSrc} alt={name} className="w-full h-full object-contain p-2" onError={err ? () => setGhErr(true) : () => setErr(true)} />;
}

function Stars({ rating, sm }: { rating: number; sm?: boolean }) {
  return (
    <div className={`flex gap-0.5 ${sm ? "text-xs" : "text-sm"}`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? "text-lime" : "text-gray-300"}>★</span>
      ))}
    </div>
  );
}

export default function SeedbankDetailClient({ slug }: { slug: string }) {
  const [sb, setSb] = useState<Seedbank|null>(null);
  const [loading, setLoading] = useState(true);
  const [ssErr, setSsErr] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchSeedbank(slug).then(d => { setSb(d); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-off-white flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-brand border-t-lime rounded-full animate-spin" />
    </div>
  );
  if (!sb) return (
    <div className="min-h-screen bg-off-white flex items-center justify-center text-center">
      <div><div className="text-5xl mb-4">🌿</div><h1 className="text-2xl font-black mb-2">Not Found</h1>
      <Link href="/seedbanks" className="text-lime-dark hover:underline">← Back to Seed Banks</Link></div>
    </div>
  );

  const extra = EXTRA[sb.slug] || {};
  const strains: string[] = Array.isArray(sb.notable_strains) ? sb.notable_strains : [];
  const seedTypes: string[] = Array.isArray(sb.seed_types) ? sb.seed_types : [];
  const shipping: string[] = Array.isArray(sb.shipping_regions) ? sb.shipping_regions : [];
  const payments: string[] = Array.isArray(sb.payment_methods) ? sb.payment_methods : [];
  const reviews: {author:string;rating:number;body:string;date:string}[] = Array.isArray(sb.reviews) ? sb.reviews : [];
  const hasScreenshot = SS_SLUGS.includes(sb.slug);
  const screenshotUrl = `https://raw.githubusercontent.com/xBalzerian/strainhub/main/public/images/seedbanks/${sb.slug}.webp`;
  const yearsActive = sb.founded_year ? new Date().getFullYear() - sb.founded_year : null;

  // Social links
  const socials = [
    sb.social_instagram && { icon:"📸", label:"Instagram", handle: sb.social_instagram.replace("@",""), url:`https://instagram.com/${sb.social_instagram.replace("@","")}`, color:"text-pink-500 border-pink-200 bg-pink-50 hover:bg-pink-100" },
    sb.social_twitter && { icon:"𝕏", label:"X/Twitter", handle: sb.social_twitter, url:`https://x.com/${sb.social_twitter.replace("@","")}`, color:"text-gray-800 border-gray-200 bg-gray-50 hover:bg-gray-100" },
    extra.fb && { icon:"👍", label:"Facebook", handle: extra.fb, url:`https://facebook.com/${extra.fb}`, color:"text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100" },
    extra.yt && { icon:"▶", label:"YouTube", handle: extra.yt, url:`https://youtube.com/@${extra.yt}`, color:"text-red-600 border-red-200 bg-red-50 hover:bg-red-100" },
  ].filter(Boolean) as {icon:string;label:string;handle:string;url:string;color:string}[];

  return (
    <div className="min-h-screen bg-off-white">

            <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": sb.name,
          "url": sb.website || undefined,
          "logo": sb.logo_url || undefined,
          "address": (sb.city || sb.state_province) ? {
            "@type": "PostalAddress",
            "addressLocality": sb.city,
            "addressRegion": sb.state_province,
            "addressCountry": sb.country,
          } : undefined,
          "aggregateRating": sb.rating ? {
            "@type": "AggregateRating",
            "ratingValue": String(sb.rating),
            "reviewCount": String(sb.review_count || 1),
            "bestRating": "5",
          } : undefined,
        })}}
      />
      {/* HERO */}
      <div className="bg-brand text-white border-b-2 border-brand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <Link href="/" className="hover:text-lime">Home</Link><span>/</span>
            <Link href="/seedbanks" className="hover:text-lime">Seed Banks</Link><span>/</span>
            <span className="text-gray-300">{sb.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 bg-white shadow-brutal">
                <LogoImg src={sb.logo_url} name={sb.name} />
              </div>
              {sb.is_verified && (
                <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-lime rounded-full flex items-center justify-center border-2 border-brand">
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
                {sb.is_verified && <span className="bg-lime text-brand text-[10px] font-black px-2 py-0.5 rounded-full border border-lime">✓ VERIFIED</span>}
                <span className="text-xl">{FLAGS[sb.country] || "🌍"}</span>
              </div>
              {sb.short_bio && <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-2xl">{sb.short_bio}</p>}

              {/* Meta + social pills on hero */}
              <div className="flex flex-wrap gap-2">
                {(sb.city || sb.state_province) && (
                  <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-xs text-gray-300 flex items-center gap-1.5">
                    📍 {[sb.city, sb.state_province, sb.country].filter(Boolean).join(", ")}
                  </span>
                )}
                {sb.founded_year && (
                  <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-xs text-gray-300">
                    📅 Est. {sb.founded_year}
                  </span>
                )}
                {sb.website && (
                  <a href={sb.website} target="_blank" rel="noopener noreferrer"
                    className="bg-lime text-brand border-2 border-lime px-3 py-1.5 rounded-full text-xs font-black hover:bg-lime-dark transition-colors shadow-brutal-sm">
                    🌐 Visit Website ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {[
              { label:"Rating", value: sb.rating?.toFixed(1)||"N/A", sub: <Stars rating={sb.rating||0}/> },
              { label:"Reviews", value: (sb.review_count||0).toLocaleString(), sub:<span className="text-gray-500 text-[11px]">Verified</span> },
              { label:"Founded", value: String(sb.founded_year||"—"), sub:<span className="text-gray-500 text-[11px]">{yearsActive?`${yearsActive} yrs`:"Legacy"}</span> },
              { label:"Seed Types", value: String(seedTypes.length||"—"), sub:<span className="text-gray-500 text-[11px] leading-tight">{seedTypes.slice(0,2).join(" · ")}</span> },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <div className="text-2xl font-black text-lime mb-0.5">{s.value}</div>
                <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{s.label}</div>
                <div>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WEBSITE SCREENSHOT */}
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
                {sb.website?.replace("https://","").replace("http://","") || `${sb.slug}.com`}
              </div>
              {sb.website && (
                <a href={sb.website} target="_blank" rel="noopener noreferrer" className="text-xs text-lime-dark font-black hover:underline whitespace-nowrap">
                  Open ↗
                </a>
              )}
            </div>
            <div className="relative w-full" style={{paddingBottom:"56.25%"}}>
              <Image src={screenshotUrl} alt={`${sb.name} website`} fill className="object-cover object-top" sizes="(max-width:768px) 100vw, 1200px" loading="lazy" unoptimized onError={() => setSsErr(true)} />
            </div>
          </div>
        </div>
      )}

      {/* MAIN BODY */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* Social Media */}
            {socials.length > 0 && (
              <div className="bg-white border-2 border-brand rounded-2xl p-6 shadow-brutal">
                <h2 className="text-lg font-black text-brand mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-lime rounded-lg flex items-center justify-center text-xs border border-brand flex-shrink-0">📱</span>
                  Follow {sb.name}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {socials.map(s => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${s.color}`}>
                      <span className="text-2xl">{s.icon}</span>
                      <div className="text-center">
                        <div className="text-xs font-black">{s.label}</div>
                        <div className="text-[10px] opacity-70 truncate max-w-[80px]">{s.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* About */}
            <div className="bg-white border-2 border-brand rounded-2xl p-6 shadow-brutal">
              <h2 className="text-lg font-black text-brand mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-lime rounded-lg flex items-center justify-center text-xs border border-brand flex-shrink-0">📖</span>
                About {sb.name}
              </h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">{sb.description}</p>
            </div>

            {/* GMB Map */}
            

            {/* Notable Strains */}
            {strains.length > 0 && (
              <div className="bg-white border-2 border-brand rounded-2xl p-6 shadow-brutal">
                <h2 className="text-lg font-black text-brand mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-lime rounded-lg flex items-center justify-center text-xs border border-brand flex-shrink-0">🌿</span>
                  Notable Strains
                  <span className="ml-auto text-xs text-gray-400 font-normal">{strains.length} strains</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {strains.map((strain) => {
                    const strainSlug = strain.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
                    return (
                      <Link key={strain} href={`/strains/${strainSlug}`}
                        className="group flex items-center gap-2 p-2.5 bg-off-white hover:bg-lime-pale border-2 border-brand/20 hover:border-brand rounded-xl transition-all">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0"/>
                        <span className="text-brand text-xs font-semibold truncate">{strain}</span>
                        <span className="ml-auto text-[10px] font-bold opacity-0 group-hover:opacity-100 flex-shrink-0">→</span>
                      </Link>
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

            {/* Claim CTA */}
            <div className="bg-brand border-2 border-brand rounded-2xl p-6 shadow-brutal">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <h3 className="text-lg font-black text-white mb-1">Is this your seed bank?</h3>
                  <p className="text-gray-400 text-sm max-w-sm">Claim this listing to edit your profile, post promos, and announce seed drops.</p>
                </div>
                <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}`}
                  className="bg-lime hover:bg-lime-dark text-brand font-black px-5 py-3 rounded-xl border-2 border-lime shadow-brutal-sm transition-all text-sm whitespace-nowrap">
                  🏷️ Claim Listing
                </Link>
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
                    {sb.is_active ? <><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>Active</> : <span className="text-gray-400">Inactive</span>}
                  </dd>
                </div>
                {sb.website && (
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-gray-500 text-xs">Website</dt>
                    <dd><a href={sb.website} target="_blank" rel="noopener noreferrer" className="text-lime-dark hover:underline text-xs font-black">Visit ↗</a></dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Social sidebar */}
            {socials.length > 0 && (
              <div className="bg-white border-2 border-brand rounded-2xl p-5 shadow-brutal">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">🌐 Social</h3>
                <div className="space-y-2">
                  {socials.map(s => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 py-2 px-3 rounded-xl border border-brand/10 hover:border-brand hover:bg-lime-pale transition-all group">
                      <span className="text-base">{s.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-black text-brand">{s.label}</div>
                        <div className="text-[10px] text-gray-400 truncate">{s.handle}</div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-300 group-hover:text-brand transition-colors">↗</span>
                    </a>
                  ))}
                  {extra.gmb && (
                    <a href={extra.gmb} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 py-2 px-3 rounded-xl border border-brand/10 hover:border-brand hover:bg-lime-pale transition-all group">
                      <span className="text-base">📍</span>
                      <div className="flex-1">
                        <div className="text-xs font-black text-brand">Google Maps</div>
                        <div className="text-[10px] text-gray-400">View location</div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-300 group-hover:text-brand">↗</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Ships To */}
            {shipping.length > 0 && (
              <div className="bg-white border-2 border-brand rounded-2xl p-5 shadow-brutal">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">📦 Ships To</h3>
                <div className="space-y-1.5">
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

            {sb.website && (
              <a href={sb.website} target="_blank" rel="noopener noreferrer"
                className="block text-center bg-lime hover:bg-lime-dark text-brand font-black py-4 rounded-2xl border-2 border-brand shadow-brutal hover:shadow-brutal-lg transition-all hover:-translate-y-0.5 text-sm">
                Visit {sb.name} ↗
              </a>
            )}

            <Link href="/seedbanks" className="flex items-center justify-center gap-1.5 text-gray-400 hover:text-brand text-xs font-semibold transition-colors">
              ← All Seed Banks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
