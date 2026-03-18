import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface FAQ { question: string; answer: string; }
interface Seedbank {
  id: string; name: string; slug: string; country: string;
  state_province: string; city: string; founded_year: number;
  website: string; description: string; short_bio: string;
  logo_url: string; notable_strains: string[]; seed_types: string[];
  shipping_regions: string[]; payment_methods: string[];
  rating: number; review_count: number; reviews: { author: string; rating: number; body: string; date: string }[];
  social_instagram: string; social_twitter: string;
  is_verified: boolean; is_active: boolean; rank_popularity: number;
  faq: FAQ[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.floor(rating);
        const partial = !filled && i <= rating + 0.5;
        return (
          <svg key={i} className={`w-5 h-5 ${filled ? "text-[#aaff00]" : partial ? "text-[#aaff00]" : "text-gray-600"}`}
            fill={filled || partial ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      })}
    </div>
  );
}

function CountryFlag({ country }: { country: string }) {
  const flags: Record<string, string> = { USA: "🇺🇸", Canada: "🇨🇦", Netherlands: "🇳🇱", Spain: "🇪🇸", UK: "🇬🇧" };
  return <span>{flags[country] || "🌍"}</span>;
}

function SeedTypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    Feminized: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    Auto: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    Regular: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    CBD: "bg-green-500/20 text-green-300 border-green-500/30",
    "F1 Hybrid": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    Triploid: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    "Mix Packs": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    Clones: "bg-lime-500/20 text-lime-300 border-lime-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${colors[type] || "bg-gray-700 text-gray-300 border-gray-600"}`}>
      {type}
    </span>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: sb } = await supabase.from("seedbanks").select("name,short_bio,logo_url").eq("slug", params.slug).single();
  if (!sb) return { title: "Seed Bank Not Found" };
  return {
    title: `${sb.name} Review 2026 | Seeds, Genetics & Info | StrainHub`,
    description: sb.short_bio || `Detailed profile of ${sb.name} — ratings, notable strains, shipping info, and more.`,
    openGraph: { images: sb.logo_url ? [sb.logo_url] : [] },
  };
}

export async function generateStaticParams() {
  const { data } = await supabase.from("seedbanks").select("slug").limit(200);
  return (data || []).map((r) => ({ slug: r.slug }));
}

export default async function SeedbankDetailPage({ params }: { params: { slug: string } }) {
  const { data: sb } = await supabase.from("seedbanks").select("*").eq("slug", params.slug).single();
  if (!sb) notFound();

  const faq: FAQ[] = Array.isArray(sb.faq) ? sb.faq : [];
  const strains: string[] = Array.isArray(sb.notable_strains) ? sb.notable_strains : [];
  const seedTypes: string[] = Array.isArray(sb.seed_types) ? sb.seed_types : [];
  const shipping: string[] = Array.isArray(sb.shipping_regions) ? sb.shipping_regions : [];
  const payments: string[] = Array.isArray(sb.payment_methods) ? sb.payment_methods : [];
  const reviews: { author: string; rating: number; body: string; date: string }[] = Array.isArray(sb.reviews) ? sb.reviews : [];

  const paymentIcons: Record<string, string> = {
    "Credit Card": "💳", "Bitcoin": "₿", "Crypto": "₿", "Cash": "💵",
    "Money Order": "📮", "Interac": "🏦", "Venmo": "📱", "Zelle": "📱",
    "Check": "📝", "Bank Transfer": "🏦", "Cash App": "📱", "iDeal": "🏦",
  };

  const shippingIcon: Record<string, string> = {
    USA: "🇺🇸", Canada: "🇨🇦", International: "🌍", UK: "🇬🇧",
    Netherlands: "🇳🇱", Spain: "🇪🇸",
  };

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": sb.name,
    "url": sb.website,
    "logo": sb.logo_url,
    "foundingDate": sb.founded_year?.toString(),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": sb.city,
      "addressRegion": sb.state_province,
      "addressCountry": sb.country,
    },
    "aggregateRating": sb.rating ? {
      "@type": "AggregateRating",
      "ratingValue": sb.rating,
      "reviewCount": sb.review_count || 1,
      "bestRating": 5,
    } : undefined,
    "description": sb.description,
    "sameAs": [
      sb.social_instagram ? `https://instagram.com/${sb.social_instagram.replace("@", "")}` : null,
      sb.social_twitter ? `https://twitter.com/${sb.social_twitter.replace("@", "")}` : null,
    ].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-[#0e0e0e]">

        {/* ── HERO HEADER ─────────────────────────────────────────── */}
        <div className="relative bg-gradient-to-b from-black via-[#111] to-[#0e0e0e] border-b border-white/5">
          {/* Subtle grid bg */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, #aaff00 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/seedbanks" className="hover:text-white transition-colors">Seed Banks</Link>
              <span>/</span>
              <span className="text-gray-300">{sb.name}</span>
            </nav>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              {/* Logo */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shadow-xl shadow-black/40">
                  {sb.logo_url ? (
                    <img
                      src={sb.logo_url} alt={`${sb.name} logo`}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span style="font-size:2.5rem">${sb.name.charAt(0)}</span>`;
                          parent.style.background = "linear-gradient(135deg,#1a1a1a,#2a2a2a)";
                        }
                      }}
                    />
                  ) : (
                    <span className="text-4xl font-black text-white">{sb.name.charAt(0)}</span>
                  )}
                </div>
                {sb.is_verified && (
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#aaff00] rounded-full flex items-center justify-center shadow-lg shadow-[#aaff00]/30">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Name + Meta */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                  <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">{sb.name}</h1>
                  {sb.is_verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#aaff00]/15 border border-[#aaff00]/30 text-[#aaff00] rounded-full text-xs font-bold tracking-wide">
                      ✓ VERIFIED
                    </span>
                  )}
                  <span className="text-xl"><CountryFlag country={sb.country} /></span>
                </div>

                {sb.short_bio && (
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 max-w-2xl">{sb.short_bio}</p>
                )}

                {/* Meta row */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  {(sb.city || sb.state_province) && (
                    <span className="flex items-center gap-1.5">
                      <span>📍</span>
                      <span className="text-gray-300">{[sb.city, sb.state_province, sb.country].filter(Boolean).join(", ")}</span>
                    </span>
                  )}
                  {sb.founded_year && (
                    <span className="flex items-center gap-1.5">
                      <span>📅</span>
                      <span className="text-gray-300">Est. {sb.founded_year}</span>
                    </span>
                  )}
                  {sb.website && (
                    <a href={sb.website} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[#aaff00] hover:text-[#ccff44] transition-colors font-medium">
                      <span>🌐</span>
                      <span>Visit Website ↗</span>
                    </a>
                  )}
                  {sb.social_instagram && (
                    <a href={`https://instagram.com/${sb.social_instagram.replace("@", "")}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 transition-colors">
                      <span>📸</span>
                      <span>{sb.social_instagram}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Claim button */}
              <div className="flex-shrink-0">
                <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#aaff00]/40 text-gray-300 hover:text-white text-sm font-semibold rounded-xl transition-all">
                  🏷️ Claim This Listing
                </Link>
              </div>
            </div>

            {/* ── STATS BAR ─────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {[
                { label: "Rating", value: sb.rating?.toFixed(1) || "N/A", sub: <StarRating rating={sb.rating || 0} />, color: "text-[#aaff00]" },
                { label: "Reviews", value: (sb.review_count || 0).toLocaleString(), sub: <span className="text-gray-500 text-xs">Verified</span>, color: "text-[#aaff00]" },
                { label: "Founded", value: sb.founded_year || "—", sub: <span className="text-gray-500 text-xs">{sb.founded_year ? new Date().getFullYear() - sb.founded_year + " yrs exp" : ""}</span>, color: "text-[#aaff00]" },
                { label: "Seed Types", value: seedTypes.length, sub: <span className="text-gray-500 text-xs">{seedTypes.slice(0,2).join(", ")}</span>, color: "text-[#aaff00]" },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
                  <div className={`text-2xl sm:text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
                  <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{s.label}</div>
                  <div>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN BODY ─────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT — Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* About */}
              <section className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 sm:p-8">
                <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#aaff00]/15 rounded-lg flex items-center justify-center text-sm">📖</span>
                  About {sb.name}
                </h2>
                <p className="text-gray-300 leading-relaxed text-[15px]">{sb.description}</p>
              </section>

              {/* Notable Strains */}
              {strains.length > 0 && (
                <section className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 sm:p-8">
                  <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#aaff00]/15 rounded-lg flex items-center justify-center text-sm">🌿</span>
                    Notable Strains
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {strains.map((strain) => {
                      const slug = strain.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                      return (
                        <Link key={strain} href={`/strains/${slug}`}
                          className="group flex items-center gap-3 p-3 bg-white/[0.04] hover:bg-[#aaff00]/10 border border-white/[0.06] hover:border-[#aaff00]/30 rounded-xl transition-all">
                          <span className="w-2 h-2 rounded-full bg-[#aaff00] flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="text-gray-300 group-hover:text-white text-sm font-medium leading-tight">{strain}</span>
                          <span className="ml-auto text-[#aaff00] opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Seed Types */}
              {seedTypes.length > 0 && (
                <section className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 sm:p-8">
                  <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#aaff00]/15 rounded-lg flex items-center justify-center text-sm">🌱</span>
                    Available Seed Types
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {seedTypes.map((t) => <SeedTypeBadge key={t} type={t} />)}
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {seedTypes.map((t) => {
                      const info: Record<string, string> = {
                        Feminized: "Guaranteed female plants — no males, maximum yield every grow.",
                        Auto: "Flowers automatically by age — perfect for beginners and fast harvests.",
                        Regular: "Natural male/female ratio — ideal for breeders and genetic work.",
                        CBD: "High CBD, low THC — therapeutic focus with minimal psychoactive effects.",
                        "F1 Hybrid": "First-generation crosses with exceptional uniformity and vigor.",
                        Triploid: "Sterile plants that stay seedless even near males — 99%+ sinsemilla.",
                        Clones: "Rooted cuttings for guaranteed genetic copies of proven phenotypes.",
                      };
                      return info[t] ? (
                        <div key={t} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                          <div className="flex items-center gap-2 mb-1">
                            <SeedTypeBadge type={t} />
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed">{info[t]}</p>
                        </div>
                      ) : null;
                    })}
                  </div>
                </section>
              )}

              {/* Customer Reviews */}
              {reviews.length > 0 && (
                <section className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 sm:p-8">
                  <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#aaff00]/15 rounded-lg flex items-center justify-center text-sm">⭐</span>
                    Community Reviews
                  </h2>
                  <div className="space-y-4">
                    {reviews.slice(0, 3).map((r, i) => (
                      <div key={i} className="p-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#aaff00]/30 to-green-900 rounded-full flex items-center justify-center text-xs font-bold text-white">
                              {r.author?.charAt(0) || "G"}
                            </div>
                            <span className="text-sm font-semibold text-gray-300">{r.author || "Grower"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: r.rating || 5 }).map((_, j) => (
                              <span key={j} className="text-[#aaff00] text-xs">★</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{r.body}</p>
                        {r.date && <p className="text-gray-600 text-xs mt-2">{r.date}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQ */}
              {faq.length > 0 && (
                <section className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 sm:p-8">
                  <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#aaff00]/15 rounded-lg flex items-center justify-center text-sm">❓</span>
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {faq.map((item, i) => (
                      <details key={i} className="group">
                        <summary className="flex items-center justify-between gap-4 p-4 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] rounded-2xl cursor-pointer transition-all list-none">
                          <span className="font-semibold text-white text-sm">{item.question}</span>
                          <span className="w-6 h-6 flex-shrink-0 bg-[#aaff00]/10 rounded-full flex items-center justify-center text-[#aaff00] text-xs group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <div className="px-4 pt-3 pb-4 text-gray-400 text-sm leading-relaxed border border-t-0 border-white/[0.06] rounded-b-2xl -mt-1 bg-white/[0.02]">
                          {item.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA Banner */}
              <section className="relative overflow-hidden bg-gradient-to-r from-[#aaff00]/15 via-[#aaff00]/10 to-transparent border border-[#aaff00]/20 rounded-3xl p-6 sm:p-8">
                <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10"
                  style={{ background: "radial-gradient(circle at 100% 50%, #aaff00, transparent)" }} />
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-white mb-1">Own or manage {sb.name}?</h3>
                    <p className="text-gray-400 text-sm">Claim this listing to update info, add promos, and post seed drop events.</p>
                  </div>
                  <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}`}
                    className="flex-shrink-0 bg-[#aaff00] text-black font-black px-6 py-3 rounded-xl hover:bg-[#99ee00] transition-colors text-sm whitespace-nowrap">
                    🏷️ Claim Listing
                  </Link>
                </div>
              </section>
            </div>

            {/* RIGHT — Sidebar */}
            <div className="space-y-5">

              {/* Quick Info Card */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-5 sticky top-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span>📋</span> Quick Info
                </h3>
                <dl className="space-y-3">
                  {[
                    { label: "Country", value: <span className="flex items-center gap-1.5 justify-end"><CountryFlag country={sb.country} /> {sb.country}</span> },
                    { label: "Location", value: [sb.city, sb.state_province].filter(Boolean).join(", ") || "—" },
                    { label: "Founded", value: sb.founded_year || "—" },
                    { label: "Status", value: sb.is_active ? <span className="flex items-center gap-1 text-[#aaff00]"><span className="w-2 h-2 rounded-full bg-[#aaff00] animate-pulse" />Active</span> : <span className="text-gray-500">Inactive</span> },
                    { label: "Rank", value: sb.rank_popularity ? `#${sb.rank_popularity} Global` : "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                      <dt className="text-gray-500 text-sm">{label}</dt>
                      <dd className="text-gray-200 text-sm font-semibold text-right">{value}</dd>
                    </div>
                  ))}
                  {sb.website && (
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                      <dt className="text-gray-500 text-sm">Website</dt>
                      <dd>
                        <a href={sb.website} target="_blank" rel="noopener noreferrer"
                          className="text-[#aaff00] hover:underline text-sm font-semibold flex items-center gap-1">
                          Visit ↗
                        </a>
                      </dd>
                    </div>
                  )}
                  {sb.social_instagram && (
                    <div className="flex items-center justify-between py-2">
                      <dt className="text-gray-500 text-sm">Instagram</dt>
                      <dd>
                        <a href={`https://instagram.com/${sb.social_instagram.replace("@", "")}`}
                          target="_blank" rel="noopener noreferrer"
                          className="text-pink-400 hover:text-pink-300 text-sm font-semibold">
                          {sb.social_instagram}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Seed Types */}
              {seedTypes.length > 0 && (
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-5">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>🌱</span> Seed Types
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {seedTypes.map((t) => <SeedTypeBadge key={t} type={t} />)}
                  </div>
                </div>
              )}

              {/* Shipping */}
              {shipping.length > 0 && (
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-5">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>📦</span> Ships To
                  </h3>
                  <div className="space-y-2">
                    {shipping.map((r) => (
                      <div key={r} className="flex items-center gap-2 text-sm">
                        <span>{shippingIcon[r] || "🌍"}</span>
                        <span className="text-gray-300">{r}</span>
                        <span className="ml-auto w-2 h-2 rounded-full bg-[#aaff00]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Methods */}
              {payments.length > 0 && (
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-5">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>💳</span> Payment Methods
                  </h3>
                  <div className="space-y-2">
                    {payments.map((p) => (
                      <div key={p} className="flex items-center gap-2 text-sm text-gray-300">
                        <span>{paymentIcons[p] || "💳"}</span>
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visit CTA */}
              {sb.website && (
                <a href={sb.website} target="_blank" rel="noopener noreferrer"
                  className="block text-center bg-[#aaff00] hover:bg-[#99ee00] text-black font-black py-4 rounded-2xl transition-colors shadow-lg shadow-[#aaff00]/10">
                  Visit {sb.name} ↗
                </a>
              )}

              {/* Promote banner */}
              <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}`}
                className="block text-center text-sm bg-white/[0.04] border border-white/10 hover:border-[#aaff00]/30 text-gray-400 hover:text-white font-semibold py-3 rounded-2xl transition-all">
                🎁 Add Promo or Drop Event
              </Link>

              {/* Back */}
              <Link href="/seedbanks"
                className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors justify-center">
                ← Back to all Seed Banks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
