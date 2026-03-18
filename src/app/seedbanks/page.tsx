import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Cannabis Seed Banks in the USA & Canada | StrainHub",
  description: "Browse trusted cannabis seed banks in the US and Canada. Find breeder profiles, notable strains, shipping info, reviews, and more.",
  alternates: { canonical: "https://www.strainhub.org/seedbanks" },
};

export const revalidate = 3600;

interface SeedbankRow {
  id: string;
  name: string;
  slug: string;
  country: string;
  state_province: string;
  city: string;
  founded_year: number;
  short_bio: string;
  logo_url: string | null;
  notable_strains: string[];
  seed_types: string[];
  rating: number;
  review_count: number;
  is_verified: boolean;
  rank_popularity: number;
}

async function getSeedbanks(country?: string): Promise<SeedbankRow[]> {
  let query = supabase
    .from("seedbanks")
    .select("id, name, slug, country, state_province, city, founded_year, short_bio, logo_url, notable_strains, seed_types, rating, review_count, is_verified, rank_popularity")
    .eq("is_active", true)
    .order("rank_popularity", { ascending: true });
  if (country) query = query.eq("country", country);
  const { data, error } = await query;
  if (error) { console.error(error); return []; }
  return (data || []) as SeedbankRow[];
}

export default async function SeedbanksPage({
  searchParams,
}: {
  searchParams: { country?: string };
}) {
  const country = searchParams.country || "";
  const seedbanks = await getSeedbanks(country || undefined);

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Hero */}
      <div className="bg-black text-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Seed Banks</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Cannabis <span className="text-[#aaff00]">Seed Banks</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Discover trusted cannabis seed banks and breeders across the USA and Canada. Explore breeder profiles, notable strains, shipping details, and verified reviews.
          </p>
          <div className="flex gap-4 mt-6 text-sm">
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="text-[#aaff00] font-bold text-xl block">{seedbanks.length}</span>
              <span className="text-gray-400">Seed Banks Listed</span>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="text-[#aaff00] font-bold text-xl block">🇺🇸 USA</span>
              <span className="text-gray-400">& 🇨🇦 Canada</span>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="text-[#aaff00] font-bold text-xl block">✓</span>
              <span className="text-gray-400">Verified Profiles</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { label: "🌎 All", value: "" },
            { label: "🇺🇸 USA", value: "USA" },
            { label: "🇨🇦 Canada", value: "Canada" },
          ].map(tab => (
            <Link
              key={tab.value}
              href={tab.value ? `/seedbanks?country=${tab.value}` : "/seedbanks"}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                country === tab.value
                  ? "bg-[#aaff00] text-black"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-[#aaff00]"
              }`}
            >
              {tab.label}
            </Link>
          ))}
          <span className="ml-auto text-sm text-gray-500 self-center">{seedbanks.length} seed banks</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {seedbanks.map(sb => (
            <Link
              key={sb.slug}
              href={`/seedbanks/${sb.slug}`}
              className="bg-white rounded-2xl border border-gray-100 hover:border-[#aaff00] hover:shadow-lg transition-all overflow-hidden group"
            >
              {/* Card header */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 flex items-center gap-3">
                {sb.logo_url ? (
                  <img src={sb.logo_url} alt={sb.name} className="w-12 h-12 rounded-xl object-cover bg-white" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-[#aaff00] flex items-center justify-center text-black font-black text-lg">
                    {sb.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-white font-bold text-base truncate group-hover:text-[#aaff00] transition-colors">
                      {sb.name}
                    </h2>
                    {sb.is_verified && (
                      <span className="text-[#aaff00] text-xs shrink-0">✓</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs">
                    {sb.country === "USA" ? "🇺🇸" : "🇨🇦"} {sb.city}, {sb.state_province} · Est. {sb.founded_year}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{sb.short_bio}</p>

                {sb.seed_types && sb.seed_types.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {sb.seed_types.map(t => (
                      <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                )}

                {sb.notable_strains && sb.notable_strains.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-400 mb-1 font-medium">Notable Strains</p>
                    <p className="text-xs text-gray-700 line-clamp-1">
                      {sb.notable_strains.slice(0, 4).join(" · ")}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="font-bold text-sm">{sb.rating?.toFixed(1)}</span>
                    <span className="text-gray-400 text-xs">({sb.review_count?.toLocaleString()})</span>
                  </div>
                  <span className="text-[#aaff00] text-xs font-bold group-hover:underline">View Profile →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {seedbanks.length === 0 && (
          <div className="text-center py-20 text-gray-400">No seed banks found.</div>
        )}
      </div>
    </div>
  );
}
