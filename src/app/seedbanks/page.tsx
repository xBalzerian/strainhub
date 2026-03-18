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
  description: "Browse 60+ top cannabis seed banks — US, Canada & international. Compare ratings, seed types, shipping regions, and genetics. Find your perfect seed source.",
  openGraph: {
    title: "Best Cannabis Seed Banks 2026 | StrainHub",
    description: "60+ top cannabis seed banks ranked by community rating. Compare genetics, shipping, and more.",
    type: "website",
  },
};

interface Seedbank {
  id: string;
  name: string;
  slug: string;
  country: string;
  state_province: string;
  city: string;
  short_bio: string;
  logo_url: string;
  seed_types: string[];
  shipping_regions: string[];
  rating: number;
  review_count: number;
  is_verified: boolean;
  rank_popularity: number;
}

export default async function SeedbanksPage() {
  const { data: seedbanks } = await supabase
    .from("seedbanks")
    .select("id,name,slug,country,state_province,city,short_bio,logo_url,seed_types,shipping_regions,rating,review_count,is_verified,rank_popularity")
    .eq("is_active", true)
    .order("rank_popularity", { ascending: true })
    .limit(200);

  const all: Seedbank[] = seedbanks || [];
  const usa = all.filter((s) => s.country === "USA");
  const canada = all.filter((s) => s.country === "Canada");
  const intl = all.filter((s) => s.country !== "USA" && s.country !== "Canada");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0d1a0d] to-[#0a0a0a] border-b border-white/5">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(170,255,0,0.07), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #aaff00 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <nav className="flex items-center gap-2 text-xs text-gray-600 mb-8 font-medium">
            <Link href="/" className="hover:text-gray-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Seed Banks</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black mb-3 leading-none">
                Cannabis <span className="text-[#aaff00]">Seed Banks</span>
              </h1>
              <p className="text-gray-400 max-w-xl text-sm sm:text-base leading-relaxed">
                {all.length}+ seed banks ranked by the community — from elite US boutique breeders to global retailers. Find your perfect genetics source.
              </p>
            </div>
            <Link href="/seedbanks/claim"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#aaff00] hover:bg-[#ccff44] text-black font-black px-5 py-3 rounded-xl transition-colors text-sm whitespace-nowrap shadow-lg shadow-[#aaff00]/15">
              🏷️ List Your Seed Bank
            </Link>
          </div>

          <div className="flex gap-8 mt-10 flex-wrap">
            {[
              { v: String(all.length) + "+", l: "Seed Banks" },
              { v: String(usa.length), l: "🇺🇸 USA Based" },
              { v: String(canada.length), l: "🇨🇦 Canada" },
              { v: "Free", l: "Always to Browse" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-black text-[#aaff00]">{s.v}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* USA */}
        {usa.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-7">
              <span className="text-2xl">🇺🇸</span>
              <div>
                <h2 className="text-xl font-black text-white">United States Seed Banks</h2>
                <p className="text-gray-600 text-sm">{usa.length} seed banks</p>
              </div>
              <div className="ml-auto h-px flex-1 bg-white/[0.05]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {usa.map((sb) => (
                <SeedbankCard key={sb.id} {...sb} />
              ))}
            </div>
          </section>
        )}

        {/* Canada */}
        {canada.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-7">
              <span className="text-2xl">🇨🇦</span>
              <div>
                <h2 className="text-xl font-black text-white">Canadian Seed Banks</h2>
                <p className="text-gray-600 text-sm">{canada.length} seed banks</p>
              </div>
              <div className="ml-auto h-px flex-1 bg-white/[0.05]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {canada.map((sb) => (
                <SeedbankCard key={sb.id} {...sb} />
              ))}
            </div>
          </section>
        )}

        {/* International */}
        {intl.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-7">
              <span className="text-2xl">🌍</span>
              <div>
                <h2 className="text-xl font-black text-white">International Seed Banks</h2>
                <p className="text-gray-600 text-sm">{intl.length} seed banks</p>
              </div>
              <div className="ml-auto h-px flex-1 bg-white/[0.05]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {intl.map((sb) => (
                <SeedbankCard key={sb.id} {...sb} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative overflow-hidden border border-[#aaff00]/20 rounded-3xl p-8 sm:p-12 text-center"
          style={{ background: "linear-gradient(135deg, rgba(170,255,0,0.05) 0%, rgba(170,255,0,0.02) 50%, transparent 100%)" }}>
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, #aaff00 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="relative">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-2xl font-black text-white mb-2">Run a seed bank or breeding operation?</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              Get your listing on StrainHub and reach thousands of serious growers every month. Free to submit.
            </p>
            <Link href="/seedbanks/claim"
              className="inline-flex items-center gap-2 bg-[#aaff00] text-black font-black px-8 py-4 rounded-2xl hover:bg-[#ccff44] transition-all shadow-lg shadow-[#aaff00]/15 hover:-translate-y-0.5">
              🏷️ Claim or Submit Your Listing
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
