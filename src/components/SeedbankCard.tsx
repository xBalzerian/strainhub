"use client";
import { useState } from "react";
import Link from "next/link";

interface SeedbankCardProps {
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
}

const FLAGS: Record<string, string> = {
  USA: "🇺🇸", Canada: "🇨🇦", Netherlands: "🇳🇱", Spain: "🇪🇸", UK: "🇬🇧",
};
const SEED_COLORS: Record<string, string> = {
  Feminized: "bg-pink-900/60 text-pink-300",
  Auto: "bg-blue-900/60 text-blue-300",
  Regular: "bg-amber-900/60 text-amber-300",
  CBD: "bg-green-900/60 text-green-300",
  "F1 Hybrid": "bg-purple-900/60 text-purple-300",
  Triploid: "bg-orange-900/60 text-orange-300",
};

export default function SeedbankCard({ id, name, slug, country, state_province, city, short_bio, logo_url, seed_types, shipping_regions, rating, review_count, is_verified }: SeedbankCardProps) {
  const [logoErr, setLogoErr] = useState(false);
  const location = [city, state_province].filter(Boolean).join(", ") || country;
  const types: string[] = Array.isArray(seed_types) ? seed_types : [];
  const regions: string[] = Array.isArray(shipping_regions) ? shipping_regions : [];

  return (
    <Link href={`/seedbanks/${slug}`}
      className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#aaff00]/30 rounded-2xl p-5 transition-all duration-200 flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        {/* Logo */}
        <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center"
          style={{ background: logoErr ? "linear-gradient(135deg,#1a2a1a,#2a3a2a)" : undefined }}>
          {logo_url && !logoErr ? (
            <img
              src={logo_url}
              alt={name}
              className="w-full h-full object-contain p-1.5"
              onError={() => setLogoErr(true)}
            />
          ) : (
            <span className="text-xl font-black text-[#aaff00]">{name.charAt(0)}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <h2 className="font-black text-white text-sm group-hover:text-[#aaff00] transition-colors leading-tight">{name}</h2>
            {is_verified && (
              <span className="w-4 h-4 bg-[#aaff00] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span>{FLAGS[country] || "🌍"}</span>
            <span>{location}</span>
          </div>
        </div>

        {rating > 0 && (
          <div className="flex-shrink-0 text-right">
            <div className="text-[#aaff00] font-black text-sm">{rating.toFixed(1)}</div>
            <div className="text-gray-600 text-xs">★ {(review_count || 0).toLocaleString()}</div>
          </div>
        )}
      </div>

      {short_bio && (
        <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">{short_bio}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {types.slice(0, 3).map((t) => (
          <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${SEED_COLORS[t] || "bg-gray-800 text-gray-400"}`}>
            {t}
          </span>
        ))}
        {regions.includes("International") && (
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-white/5 text-gray-400">🌍 Intl</span>
        )}
      </div>
    </Link>
  );
}
