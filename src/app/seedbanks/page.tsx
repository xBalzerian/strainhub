import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";
import SeedbankCard from "@/components/SeedbankCard";

export const revalidate = 3600;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const metadata: Metadata = {
  title: "Best Cannabis Seed Banks 2026 | Reviews & Rankings | StrainHub",
  description: "Browse 60+ top cannabis seed banks — US, Canada & international. Compare ratings, seed types, shipping info, and genetics. Find your perfect seed source.",
  openGraph: {
    title: "Best Cannabis Seed Banks 2026 | StrainHub",
    description: "60+ top cannabis seed banks ranked by the community.",
    type: "website",
  },
};

interface Seedbank {
  id: string; name: string; slug: string; country: string;
  state_province: string; city: string; short_bio: string;
  logo_url: string; seed_types: string[]; shipping_regions: string[];
  rating: number; review_count: number; is_verified: boolean; rank_popularity: number;
}

export default async function SeedbanksPage() {
  const { data } = await supabase
    .from("seedbanks")
    .select("id,name,slug,country,state_province,city,short_bio,logo_url,seed_types,shipping_regions,rating,review_count,is_verified,rank_popularity")
    .eq("is_active", true)
    .order("rank_popularity", { ascending: true })
    .limit(200);

  const all: Seedbank[] = data || [];
  const usa = all.filter((s) => s.country === "USA");
  const canada = all.filter((s) => s.country === "Canada");
  const intl = all.filter((s) => s.country !== "USA" && s.country !== "Canada");

  return (
    <div className="min-h-screen bg-off-white">

      {/* ── HERO ── */}
      <div className="bg-brand text-white border-b-2 border-brand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
            <Link href="/" className="hover:text-lime transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-300">Seed Banks</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-6xl font-black mb-3 leading-none">
                Seed<span className="text-lime">Banks</span>
              </h1>
              <p className="text-gray-400 max-w-xl text-sm sm:text-base leading-relaxed">
                {all.length}+ seed banks ranked by the community — from elite US boutique breeders to global retailers. Find your perfect genetics source.
              </p>
            </div>
            <Link href="/seedbanks/claim"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-lime hover:bg-lime-dark text-brand font-black px-5 py-3 rounded-xl border-2 border-lime shadow-brutal-sm hover:shadow-brutal transition-all text-sm whitespace-nowrap">
              🏷️ List Your Seed Bank
            </Link>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { v: String(all.length) + "+", l: "Seed Banks Listed" },
              { v: String(usa.length), l: "🇺🇸 USA Based" },
              { v: String(canada.length), l: "🇨🇦 Canada Based" },
              { v: "Free", l: "Always to Browse" },
            ].map((s) => (
              <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <div className="text-2xl font-black text-lime">{s.v}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-14">

        {/* USA */}
        {usa.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-7">
              <span className="text-2xl">🇺🇸</span>
              <div>
                <h2 className="text-2xl font-black text-brand">United States</h2>
                <p className="text-gray-500 text-sm">{usa.length} seed banks</p>
              </div>
              <div className="ml-4 flex-1 h-0.5 bg-brand/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {usa.map((sb) => <SeedbankCard key={sb.id} {...sb} />)}
            </div>
          </section>
        )}

        {/* Canada */}
        {canada.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-7">
              <span className="text-2xl">🇨🇦</span>
              <div>
                <h2 className="text-2xl font-black text-brand">Canada</h2>
                <p className="text-gray-500 text-sm">{canada.length} seed banks</p>
              </div>
              <div className="ml-4 flex-1 h-0.5 bg-brand/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {canada.map((sb) => <SeedbankCard key={sb.id} {...sb} />)}
            </div>
          </section>
        )}

        {/* International */}
        {intl.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-7">
              <span className="text-2xl">🌍</span>
              <div>
                <h2 className="text-2xl font-black text-brand">International</h2>
                <p className="text-gray-500 text-sm">{intl.length} seed banks</p>
              </div>
              <div className="ml-4 flex-1 h-0.5 bg-brand/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {intl.map((sb) => <SeedbankCard key={sb.id} {...sb} />)}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-brand border-2 border-brand rounded-2xl p-8 sm:p-12 text-center shadow-brutal">
          <div className="text-4xl mb-4">🌱</div>
          <h3 className="text-2xl font-black text-white mb-2">Run a seed bank or breeding operation?</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Get your listing on StrainHub and reach thousands of serious growers every month. Free to submit.
          </p>
          <Link href="/seedbanks/claim"
            className="inline-flex items-center gap-2 bg-lime hover:bg-lime-dark text-brand font-black px-8 py-4 rounded-xl border-2 border-lime shadow-brutal-sm hover:shadow-brutal transition-all">
            🏷️ Claim or Submit Your Listing
          </Link>
        </section>
      </div>
    </div>
  );
}
