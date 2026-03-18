"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SCREENSHOTS = ["archive-seed-bank", "barneys-farm", "compound-genetics", "crop-king-seeds", "dna-genetics", "dutch-passion", "ethos-genetics", "fast-buds", "greenpoint-seeds", "herbies-seeds", "homegrown-cannabis-co", "humboldt-seed-company", "ilgm", "mephisto-genetics", "north-atlantic-seed-co", "royal-queen-seeds", "seed-supreme", "seedsman", "sensi-seeds", "zamnesia"];
const FLAGS: Record<string, string> = { USA: "🇺🇸", Canada: "🇨🇦", Netherlands: "🇳🇱", Spain: "🇪🇸", UK: "🇬🇧" };
const SEED_COLORS: Record<string, string> = {
  Feminized: "bg-pink-100 text-pink-700 border-pink-200",
  Auto: "bg-blue-100 text-blue-700 border-blue-200",
  Regular: "bg-amber-100 text-amber-700 border-amber-200",
  CBD: "bg-green-100 text-green-700 border-green-200",
  "F1 Hybrid": "bg-purple-100 text-purple-700 border-purple-200",
  Triploid: "bg-orange-100 text-orange-700 border-orange-200",
};

interface Props {
  id: string; name: string; slug: string; country: string;
  state_province: string; city: string; short_bio: string;
  logo_url: string; seed_types: string[]; shipping_regions: string[];
  rating: number; review_count: number; is_verified: boolean;
}

export default function SeedbankCard({ id, name, slug, country, state_province, city, short_bio, logo_url, seed_types, shipping_regions, rating, review_count, is_verified }: Props) {
  const [logoErr, setLogoErr] = useState(false);
  const [ssErr, setSsErr] = useState(false);
  const hasScreenshot = SCREENSHOTS.includes(slug);
  const screenshotUrl = `https://raw.githubusercontent.com/xBalzerian/strainhub/main/public/images/seedbanks/${slug}.webp`;
  const location = [city, state_province].filter(Boolean).join(", ") || country;
  const types: string[] = Array.isArray(seed_types) ? seed_types : [];
  const regions: string[] = Array.isArray(shipping_regions) ? shipping_regions : [];

  return (
    <Link href={`/seedbanks/${slug}`}
      className="group block bg-white border-2 border-brand rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all duration-150 ease-out [transform:translateZ(0)] [will-change:transform]">

      {/* Screenshot preview strip */}
      {hasScreenshot && !ssErr ? (
        <div className="relative w-full h-32 overflow-hidden bg-off-white border-b-2 border-brand">
          <Image
            src={screenshotUrl}
            alt={`${name} website preview`}
            fill
            sizes="(max-width:640px) 100vw, 33vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            unoptimized
            onError={() => setSsErr(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
        </div>
      ) : (
        <div className="w-full h-24 bg-lime-pale border-b-2 border-brand flex items-center justify-center">
          <span className="text-4xl font-black text-lime-dark opacity-30 select-none">{name.charAt(0)}</span>
        </div>
      )}

      <div className="p-4">
        {/* Logo + name row */}
        <div className="flex items-start gap-3 mb-3">
          {/* Logo */}
          <div className="w-11 h-11 flex-shrink-0 rounded-xl overflow-hidden border-2 border-brand bg-off-white flex items-center justify-center shadow-brutal-sm">
            {logo_url && !logoErr ? (
              <img
                src={logo_url}
                alt={`${name} logo`}
                className="w-full h-full object-contain p-1"
                onError={() => setLogoErr(true)}
              />
            ) : (
              <span className="text-lg font-black text-brand">{name.charAt(0)}</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="font-black text-brand text-sm leading-tight group-hover:text-lime-dark transition-colors">{name}</h2>
              {is_verified && (
                <span className="inline-flex items-center gap-0.5 bg-lime text-brand text-[9px] font-black px-1.5 py-0.5 rounded-full border border-brand leading-none">
                  ✓ VERIFIED
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <span>{FLAGS[country] || "🌍"}</span>
              <span>{location}</span>
            </div>
          </div>

          {rating > 0 && (
            <div className="flex-shrink-0 text-right">
              <div className="text-sm font-black text-brand">{rating.toFixed(1)}</div>
              <div className="flex text-lime text-xs justify-end">
                {Array.from({length: Math.round(rating)}).map((_,i) => <span key={i}>★</span>)}
              </div>
            </div>
          )}
        </div>

        {/* Bio */}
        {short_bio && (
          <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">{short_bio}</p>
        )}

        {/* Seed type pills */}
        <div className="flex flex-wrap gap-1.5">
          {types.slice(0, 3).map((t) => (
            <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${SEED_COLORS[t] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
              {t}
            </span>
          ))}
          {regions.includes("International") && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-brand text-lime border border-brand">
              🌍 Intl
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
