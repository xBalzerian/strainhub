"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Strain } from "@/lib/types";

const TYPE_STYLES = {
  Indica: { bg: "bg-indica-bg", text: "text-indica", border: "border-indica-border", pill: "bg-indica-bg border-indica-border text-indica" },
  Sativa: { bg: "bg-sativa-bg", text: "text-sativa", border: "border-sativa-border", pill: "bg-sativa-bg border-sativa-border text-sativa" },
  Hybrid: { bg: "bg-hybrid-bg", text: "text-hybrid", border: "border-hybrid-border", pill: "bg-hybrid-bg border-hybrid-border text-hybrid" },
};
const TYPE_EMOJI = { Indica: "🍇", Sativa: "☀️", Hybrid: "⚡" };
const MOOD_EMOJI: Record<string, string> = {
  Relaxed: "😌", Happy: "😄", Euphoric: "🤩", Creative: "🎨",
  Energetic: "⚡", Sleepy: "😴", Uplifted: "🚀", Focused: "🎯",
  Giggly: "😂", Hungry: "🍔", Tingly: "✨",
};
const DIFF_STYLE: Record<string, string> = {
  Easy: "text-sativa", Moderate: "text-hybrid", Difficult: "text-red-600",
};
const DIFF_DOT: Record<string, string> = {
  Easy: "bg-sativa", Moderate: "bg-hybrid", Difficult: "bg-red-600",
};

function StrainImage({ strain, priority, className }: { strain: Strain; priority: boolean; className?: string }) {
  const t = TYPE_STYLES[strain.type as keyof typeof TYPE_STYLES] || TYPE_STYLES.Hybrid;
  const emoji = TYPE_EMOJI[strain.type as keyof typeof TYPE_EMOJI] || "🌿";
  const [imgError, setImgError] = useState(false);

  const hasValidImage =
    !imgError &&
    !!strain.image_url &&
    !strain.image_url.includes("tempfile.aiquickdraw") &&
    !strain.image_url.includes("base44.app");

  if (!hasValidImage) {
    return (
      <div className={`${t.bg} flex flex-col items-center justify-center gap-1 ${className}`}>
        <span className="text-4xl">{emoji}</span>
        <span className={`text-[9px] font-black ${t.text} uppercase tracking-widest`}>{strain.type}</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={strain.image_url!}
        alt={`${strain.name} cannabis strain`}
        fill
        sizes="(max-width: 640px) 120px, (max-width: 1024px) 33vw, 25vw"
        className="object-cover"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default function StrainCard({
  strain,
  priority = false,
}: {
  strain: Strain;
  priority?: boolean;
}) {
  const t = TYPE_STYLES[strain.type as keyof typeof TYPE_STYLES] || TYPE_STYLES.Hybrid;
  const thcColor =
    strain.thc_max >= 28 ? "text-red-600" : strain.thc_max >= 22 ? "text-hybrid" : "text-sativa";
  const diffDot = DIFF_DOT[strain.grow_difficulty] || "bg-gray-400";
  const diffText = DIFF_STYLE[strain.grow_difficulty] || "text-gray-500";

  return (
    <Link href={`/strains/${strain.slug}`} className="group block">
      <article
        className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal
          hover:shadow-brutal-lg hover:-translate-y-0.5
          transition-transform duration-150 ease-out
          [transform:translateZ(0)] [will-change:transform]"
      >

        {/* ─── MOBILE: horizontal layout ─────────────────────── */}
        <div className="flex sm:hidden">
          {/* Left: image square */}
          <div className="relative flex-shrink-0 w-[110px]">
            <StrainImage strain={strain} priority={priority} className="w-full h-full min-h-[110px]" />
            {/* badges overlay */}
            {strain.rank_popularity <= 10 && (
              <span className="absolute top-1.5 left-1.5 bg-lime border-2 border-black text-[9px] font-black px-1.5 py-0.5 rounded-md z-10">
                #{Math.round(strain.rank_popularity)}
              </span>
            )}
          </div>

          {/* Right: all info */}
          <div className="flex flex-col flex-1 min-w-0 p-3 border-l-2 border-black">
            {/* Name + type badge */}
            <div className="flex items-start justify-between gap-1.5 mb-1">
              <h3 className="font-black text-[14px] leading-tight">{strain.name}</h3>
              <span className={`flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${t.bg} ${t.border} ${t.text}`}>
                {strain.type}
              </span>
            </div>

            {/* THC / CBD / Flower — single row, all visible */}
            <div className="flex gap-1.5 mb-2">
              <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                <span className="text-xs">🔥</span>
                <span className={`text-xs font-black ${thcColor}`}>{strain.thc_max}%</span>
                <span className="text-[9px] text-gray-400 ml-0.5">THC</span>
              </div>
              <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                <span className="text-xs">💧</span>
                <span className="text-xs font-black">{strain.cbd_max}%</span>
                <span className="text-[9px] text-gray-400 ml-0.5">CBD</span>
              </div>
              <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                <span className="text-xs">⏱</span>
                <span className="text-xs font-black">{strain.flowering_weeks_max}w</span>
              </div>
            </div>

            {/* Effects */}
            <div className="mb-1.5">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-wide mb-1">Effects</div>
              <div className="flex flex-wrap gap-1">
                {strain.effects?.slice(0, 3).map((e) => (
                  <span key={e} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-lime-pale border border-lime-dark text-brand">
                    {MOOD_EMOJI[e] || "✨"} {e}
                  </span>
                ))}
              </div>
            </div>

            {/* Helps with */}
            <div className="mb-1.5">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-wide mb-1">Helps With</div>
              <div className="flex flex-wrap gap-1">
                {strain.helps_with?.slice(0, 3).map((h) => (
                  <span key={h} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sativa-bg border border-sativa-border text-sativa">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer: grow difficulty + terpenes */}
            <div className="flex items-center justify-between mt-auto pt-1.5 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${diffDot}`} />
                <span className={`text-[9px] font-bold ${diffText}`}>{strain.grow_difficulty}</span>
              </div>
              <div className="flex gap-1">
                {strain.terpenes?.slice(0, 2).map((tp) => (
                  <span key={tp} className="text-[8px] font-semibold px-1.5 py-0.5 bg-indica-bg border border-indica-border rounded text-indica">
                    {tp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── SM+: vertical card layout (unchanged from original) ─ */}
        <div className="hidden sm:block">
          {/* Image */}
          <div className="relative">
            <StrainImage strain={strain} priority={priority} className="w-full aspect-square" />
            {strain.rank_popularity <= 10 && (
              <span className="absolute top-2.5 left-2.5 bg-lime border-2 border-black text-xs font-black px-2 py-0.5 rounded-lg shadow-brutal-sm z-10">
                #{Math.round(strain.rank_popularity)}
              </span>
            )}
            <span className={`absolute top-2.5 right-2.5 ${t.bg} border ${t.border} ${t.text} text-[10px] font-bold px-2 py-1 rounded-lg z-10`}>
              {strain.type}
            </span>
          </div>

          {/* Body */}
          <div className="p-3.5">
            <h3 className="font-black text-[15px] mb-1.5 leading-tight">{strain.name}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{strain.description}</p>

            {/* Stats */}
            <div className="flex gap-2 mb-3">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-center">
                <div className={`text-sm font-black ${thcColor}`}>🔥 {strain.thc_max}%</div>
                <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">THC Max</div>
              </div>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-center">
                <div className="text-sm font-black">💧 {strain.cbd_max}%</div>
                <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">CBD</div>
              </div>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-center">
                <div className="text-sm font-black">⏱ {strain.flowering_weeks_max}w</div>
                <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">Flower</div>
              </div>
            </div>

            {/* Effects */}
            <div className="mb-2.5">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-1.5">Effects</div>
              <div className="flex gap-1.5 flex-wrap">
                {strain.effects?.slice(0, 3).map((e) => (
                  <span key={e} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-lime-pale border border-lime-dark text-brand">
                    {MOOD_EMOJI[e] || "✨"} {e}
                  </span>
                ))}
              </div>
            </div>

            {/* Terpenes */}
            <div className="mb-2.5">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-1.5">Terpenes</div>
              <div className="flex gap-1.5 flex-wrap">
                {strain.terpenes?.slice(0, 2).map((tp) => (
                  <span key={tp} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indica-bg border border-indica-border text-indica">
                    {tp}
                  </span>
                ))}
              </div>
            </div>

            {/* Helps With */}
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-1.5">Helps With</div>
              <div className="flex gap-1.5 flex-wrap">
                {strain.helps_with?.slice(0, 3).map((h) => (
                  <span key={h} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sativa-bg border border-sativa-border text-sativa">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-3.5 py-2.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <span className={`text-[11px] font-bold ${diffText}`}>
              <span className={`inline-block w-2 h-2 rounded-full ${diffDot} mr-1`} />
              {strain.grow_difficulty} Grow
            </span>
            <div className="flex gap-1.5">
              {strain.flavors?.slice(0, 2).map((f) => (
                <span key={f} className="text-[9px] font-semibold px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

      </article>
    </Link>
  );
}
