import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600;
export const dynamicParams = true;

interface FaqItem { question: string; answer: string; }
interface SeedbankDetail {
  id: string;
  name: string;
  slug: string;
  country: string;
  state_province: string;
  city: string;
  founded_year: number;
  website: string;
  description: string;
  short_bio: string;
  logo_url: string | null;
  notable_strains: string[];
  seed_types: string[];
  shipping_regions: string[];
  payment_methods: string[];
  rating: number;
  review_count: number;
  social_instagram: string | null;
  social_twitter: string | null;
  is_verified: boolean;
  rank_popularity: number;
  faq: FaqItem[];
}

async function getSeedbank(slug: string): Promise<SeedbankDetail | null> {
  const { data } = await supabase
    .from("seedbanks")
    .select("*")
    .eq("slug", slug)
    .single();
  return data as SeedbankDetail | null;
}

async function getAllSeedbankSlugs(): Promise<{ slug: string }[]> {
  const { data } = await supabase
    .from("seedbanks")
    .select("slug")
    .eq("is_active", true);
  return (data || []).map(s => ({ slug: s.slug as string }));
}

export async function generateStaticParams() {
  return getAllSeedbankSlugs();
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sb = await getSeedbank(params.slug);
  if (!sb) return { title: "Seed Bank Not Found" };
  return {
    title: `${sb.name} — Cannabis Seed Bank Profile | StrainHub`,
    description: sb.short_bio || `${sb.name} is a cannabis seed bank based in ${sb.city}, ${sb.state_province}.`,
    alternates: { canonical: `https://www.strainhub.org/seedbanks/${sb.slug}` },
    openGraph: {
      title: `${sb.name} | StrainHub`,
      description: sb.short_bio,
      images: sb.logo_url ? [{ url: sb.logo_url }] : [],
    },
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-lg ${i <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
      ))}
    </div>
  );
}

export default async function SeedbankDetailPage({ params }: { params: { slug: string } }) {
  const sb = await getSeedbank(params.slug);
  if (!sb) notFound();

  const flag = sb.country === "USA" ? "🇺🇸" : "🇨🇦";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": sb.name,
    "url": sb.website,
    "foundingDate": sb.founded_year?.toString(),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": sb.city,
      "addressRegion": sb.state_province,
      "addressCountry": sb.country,
    },
    ...(sb.rating ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": sb.rating,
        "reviewCount": sb.review_count,
      }
    } : {}),
    "description": sb.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#f5f5f0]">
        <div className="bg-black text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href={`/seedbanks/claim?name=${encodeURIComponent(sb.name)}`}
              className="block text-center text-sm bg-gray-50 border border-gray-200 text-gray-600 hover:border-[#aaff00] hover:text-black font-semibold py-3 rounded-2xl transition-colors">
              🏷️ Claim This Listing
            </Link>

            <Link href="/seedbanks" className="hover:text-white">Seed Banks</Link>
              <span>/</span>
              <span className="text-white">{sb.name}</span>
            </div>

            <div className="flex items-start gap-5">
              {sb.logo_url ? (
                <img src={sb.logo_url} alt={sb.name} className="w-20 h-20 rounded-2xl object-cover bg-white shrink-0" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-[#aaff00] flex items-center justify-center text-black font-black text-3xl shrink-0">
                  {sb.name.charAt(0)}
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl md:text-4xl font-black">{sb.name}</h1>
                  {sb.is_verified && (
                    <span className="bg-[#aaff00] text-black text-xs font-bold px-2 py-1 rounded-full">✓ VERIFIED</span>
                  )}
                  <span className="text-gray-400 text-sm">{flag} {sb.country}</span>
                </div>
                <p className="text-gray-300 mt-1 text-base">{sb.short_bio}</p>
                <div className="flex items-center gap-4 mt-3 flex-wrap text-sm text-gray-400">
                  <span>📍 {sb.city}, {sb.state_province}</span>
                  <span>📅 Est. {sb.founded_year}</span>
                  {sb.website && (
                    <a href={sb.website} target="_blank" rel="noopener noreferrer"
                      className="text-[#aaff00] hover:underline">🌐 Website ↗</a>
                  )}
                  {sb.social_instagram && (
                    <span className="text-pink-400">{sb.social_instagram}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-[#aaff00] font-black text-xl">{sb.rating?.toFixed(1)}</div>
                <div className="text-gray-400 text-xs mt-0.5">Rating</div>
                <StarRating rating={sb.rating} />
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-[#aaff00] font-black text-xl">{sb.review_count?.toLocaleString()}</div>
                <div className="text-gray-400 text-xs mt-0.5">Reviews</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-[#aaff00] font-black text-xl">{sb.founded_year}</div>
                <div className="text-gray-400 text-xs mt-0.5">Founded</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-[#aaff00] font-black text-xl">{sb.seed_types?.length ?? 0}</div>
                <div className="text-gray-400 text-xs mt-0.5">Seed Types</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-7">
            <section className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-black mb-3">About {sb.name}</h2>
              <p className="text-gray-700 leading-relaxed">{sb.description}</p>
            </section>

            {sb.notable_strains && sb.notable_strains.length > 0 && (
              <section className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-xl font-black mb-4">🌿 Notable Strains</h2>
                <div className="flex flex-wrap gap-2">
                  {sb.notable_strains.map((strain: string) => {
                    const strainSlug = strain.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                    return (
                      <Link
                        key={strain}
                        href={`/strains/${strainSlug}`}
                        className="bg-gray-50 hover:bg-[#aaff00] hover:text-black border border-gray-200 hover:border-[#aaff00] text-gray-700 px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
                      >
                        {strain}
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {sb.faq && sb.faq.length > 0 && (
              <section className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-xl font-black mb-4">❓ Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {sb.faq.map((item: FaqItem, i: number) => (
                    <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-bold text-gray-900 mb-1">{item.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-black text-base mb-4">📋 Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Country</span>
                  <span className="font-semibold">{flag} {sb.country}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Location</span>
                  <span className="font-semibold text-right">{sb.city}, {sb.state_province}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Founded</span>
                  <span className="font-semibold">{sb.founded_year}</span>
                </div>
                {sb.website && (
                  <div className="flex justify-between items-start">
                    <span className="text-gray-500">Website</span>
                    <a href={sb.website} target="_blank" rel="noopener noreferrer"
                      className="text-[#aaff00] font-semibold hover:underline">Visit ↗</a>
                  </div>
                )}
                {sb.social_instagram && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Instagram</span>
                    <span className="font-semibold text-pink-500">{sb.social_instagram}</span>
                  </div>
                )}
              </div>
            </div>

            {sb.seed_types && sb.seed_types.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-black text-base mb-3">🌱 Seed Types</h3>
                <div className="flex flex-wrap gap-2">
                  {sb.seed_types.map((t: string) => (
                    <span key={t} className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {sb.shipping_regions && sb.shipping_regions.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-black text-base mb-3">🚚 Ships To</h3>
                <div className="flex flex-wrap gap-2">
                  {sb.shipping_regions.map((r: string) => (
                    <span key={r} className="bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1 rounded-full">{r}</span>
                  ))}
                </div>
              </div>
            )}

            {sb.payment_methods && sb.payment_methods.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-black text-base mb-3">💳 Payment Methods</h3>
                <div className="flex flex-wrap gap-2">
                  {sb.payment_methods.map((p: string) => (
                    <span key={p} className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-3 py-1 rounded-full">{p}</span>
                  ))}
                </div>
              </div>
            )}

            {sb.website && (
              <a href={sb.website} target="_blank" rel="noopener noreferrer"
                className="block bg-[#aaff00] text-black text-center font-black py-4 rounded-2xl hover:bg-[#99ee00] transition-colors text-sm">
                Visit {sb.name} ↗
              </a>
            )}

            <Link href="/seedbanks"
              className="block text-center text-sm text-gray-500 hover:text-black transition-colors">
              ← Back to all Seed Banks
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
