import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 3600;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const metadata: Metadata = {
  title: "Best Cannabis Seed Banks 2026 | Reviews & Rankings | StrainHub",
  description: "Browse 60+ top cannabis seed banks — US, Canada & international. Compare ratings, seed types, shipping regions, and genetics. Find your perfect seed source.",
};

interface Seedbank {
  id: string; name: string; slug: string; country: string;
  state_province: string; city: string; founded_year: number;
  website: string; short_bio: string; logo_url: string;
  seed_types: string[]; shipping_regions: string[];
  rating: number; review_count: number;
  is_verified: boolean; rank_popularity: number;
}

function CountryFlag({ country }: { country: string }) {
  const flags: Record<string, string> = { USA: "🇺🇸", Canada: "🇨🇦", Netherlands: "🇳🇱", Spain: "🇪🇸", UK: "🇬🇧" };
  return <>{flags[country] || "🌍"}</>;
}

export default async function SeedbanksPage() {
  const { data: seedbanks } = await supabase
    .from("seedbanks")
    .select("id,name,slug,country,state_province,city,founded_year,website,short_bio,logo_url,seed_types,shipping_regions,rating,review_count,is_verified,rank_popularity")
    .eq("is_active", true)
    .order("rank_popularity", { ascending: true })
    .limit(200);

  const all = seedbanks || [];
  const usa = all.filter(s => s.country === "USA");
  const canada = all.filter(s => s.country === "Canada");
  const intl = all.filter(s => s.country !== "USA" && s.country !== "Canada");

  const SeedbankCard = ({ sb }: { sb: Seedbank }) => (
    <Link href={`/seedbanks/${sb.slug}`}
      className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#aaff00]/30 rounded-2xl p-5 transition-all duration-200 flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        {/* Logo */}
        <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
          {sb.logo_url ? (
            <img
              src={sb.logo_url}
              alt={sb.name}
              className="w-full h-full object-contain p-1.5"
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = "none";
                const p = t.parentElement;
                if (p) {
                  p.innerHTML = `<span class="text-xl font-black text-white">${sb.name.charAt(0)}</span>`;
                  p.style.background = "linear-gradient(135deg,#1a2a1a,#2a3a2a)";
                }
              }}
            />
          ) : (
            <span className="text-xl font-black text-white">{sb.name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <h2 className="font-black text-white text-sm group-hover:text-[#aaff00] transition-colors leading-tight">{sb.name}</h2>
            {sb.is_verified && (
              <span className="w-4 h-4 bg-[#aaff00] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <CountryFlag country={sb.country} />
            <span>{[sb.city, sb.state_province].filter(Boolean).join(", ") || sb.country}</span>
          </div>
        </div>
        {sb.rating && (
          <div className="flex-shrink-0 text-right">
            <div className="text-[#aaff00] font-black text-sm">{sb.rating.toFixed(1)}</div>
            <div className="text-gray-500 text-xs">★ {(sb.review_count || 0).toLocaleString()}</div>
          </div>
        )}
      </div>

      {sb.short_bio && (
        <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">{sb.short_bio}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {(Array.isArray(sb.seed_types) ? sb.seed_types : []).slice(0, 3).map((t: string) => {
          const colors: Record<string, string> = {
            Feminized: "bg-pink-900/50 text-pink-300",
            Auto: "bg-blue-900/50 text-blue-300",
            Regular: "bg-amber-900/50 text-amber-300",
            CBD: "bg-green-900/50 text-green-300",
            "F1 Hybrid": "bg-purple-900/50 text-purple-300",
          };
          return (
            <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${colors[t] || "bg-gray-800 text-gray-400"}`}>
              {t}
            </span>
          );
        })}
        {(Array.isArray(sb.shipping_regions) ? sb.shipping_regions : []).includes("International") && (
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-white/5 text-gray-400">🌍 Intl</span>
        )}
      </div>
    </Link>
  );

  const SectionHeader = ({ title, count, emoji }: { title: string; count: number; emoji: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-2xl">{emoji}</span>
      <div>
        <h2 className="text-xl font-black text-white">{title}</h2>
        <p className="text-gray-500 text-sm">{count} seed banks</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0e0e0e]">
      {/* Hero */}
      <div className="relative bg-black border-b border-white/5 py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #aaff00 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-300">Seed Banks</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
                Cannabis <span className="text-[#aaff00]">Seed Banks</span>
              </h1>
              <p className="text-gray-400 max-w-xl text-base">
                {all.length}+ seed banks ranked by community rating — US boutique breeders to global retailers. Find your genetics source.
              </p>
            </div>
            <Link href="/seedbanks/claim"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#aaff00] hover:bg-[#99ee00] text-black font-black px-5 py-3 rounded-xl transition-colors text-sm">
              🏷️ List Your Seed Bank
            </Link>
          </div>
          {/* Stats */}
          <div className="flex gap-6 mt-8 flex-wrap">
            {[
              { v: all.length + "+", l: "Seed Banks" },
              { v: usa.length, l: "USA Based" },
              { v: canada.length, l: "Canada Based" },
              { v: "100%", l: "Free to Browse" },
            ].map(s => (
              <div key={s.l}>
                <div className="text-2xl font-black text-[#aaff00]">{s.v}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* USA Section */}
        {usa.length > 0 && (
          <section>
            <SectionHeader title="United States Seed Banks" count={usa.length} emoji="🇺🇸" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {usa.map(sb => <SeedbankCard key={sb.id} sb={sb} />)}
            </div>
          </section>
        )}

        {/* Canada Section */}
        {canada.length > 0 && (
          <section>
            <SectionHeader title="Canadian Seed Banks" count={canada.length} emoji="🇨🇦" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {canada.map(sb => <SeedbankCard key={sb.id} sb={sb} />)}
            </div>
          </section>
        )}

        {/* International Section */}
        {intl.length > 0 && (
          <section>
            <SectionHeader title="International Seed Banks" count={intl.length} emoji="🌍" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {intl.map(sb => <SeedbankCard key={sb.id} sb={sb} />)}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#aaff00]/10 to-transparent border border-[#aaff00]/20 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-2">Run a seed bank or breeding operation?</h3>
          <p className="text-gray-400 mb-6">Get your listing on StrainHub and reach thousands of serious growers every month.</p>
          <Link href="/seedbanks/claim"
            className="inline-flex items-center gap-2 bg-[#aaff00] text-black font-black px-8 py-4 rounded-2xl hover:bg-[#99ee00] transition-colors">
            🏷️ Claim or Submit Your Listing
          </Link>
        </section>
      </div>
    </div>
  );
}
