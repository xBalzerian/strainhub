"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Strain } from "@/lib/types";

const TYPE_STYLES = {
  Indica: { bg: "bg-indica-bg", text: "text-indica", border: "border-indica-border" },
  Sativa: { bg: "bg-sativa-bg", text: "text-sativa", border: "border-sativa-border" },
  Hybrid: { bg: "bg-hybrid-bg", text: "text-hybrid", border: "border-hybrid-border" },
};
const TYPE_EMOJI = { Indica: "🍇", Sativa: "☀️", Hybrid: "⚡" };
const MOOD_EMOJI: Record<string, string> = {
  Relaxed: "😌", Happy: "😄", Euphoric: "🤩", Creative: "🎨",
  Energetic: "⚡", Sleepy: "😴", Uplifted: "🚀", Focused: "🎯",
  Giggly: "😂", Hungry: "🍔", Tingly: "✨",
};
const DIFF_DOT: Record<string, string> = {
  Easy: "bg-sativa", Moderate: "bg-hybrid", Difficult: "bg-red-500",
};
const DIFF_TEXT: Record<string, string> = {
  Easy: "text-sativa", Moderate: "text-hybrid", Difficult: "text-red-600",
};
const THC_COLOR = (v: number) =>
  v >= 28 ? "text-red-600" : v >= 22 ? "text-hybrid" : "text-sativa";

/* ─── Image with contain + colored bg ─────────────────────────────────────── */
function StrainImg({
  strain,
  priority,
  className,
}: {
  strain: Strain;
  priority: boolean;
  className?: string;
}) {
  const t = TYPE_STYLES[strain.type as keyof typeof TYPE_STYLES] || TYPE_STYLES.Hybrid;
  const emoji = TYPE_EMOJI[strain.type as keyof typeof TYPE_EMOJI] || "🌿";
  const [err, setErr] = useState(false);

  const valid =
    !err &&
    !!strain.image_url &&
    !strain.image_url.includes("tempfile.aiquickdraw") &&
    !strain.image_url.includes("base44.app");

  if (!valid) {
    return (
      <div className={`${t.bg} flex flex-col items-center justify-center gap-1 ${className}`}>
        <span className="text-5xl">{emoji}</span>
        <span className={`text-[9px] font-black ${t.text} uppercase tracking-widest`}>
          {strain.type}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${t.bg} ${className}`}>
      <Image
        src={strain.image_url!}
        alt={`${strain.name} cannabis strain`}
        fill
        sizes="(max-width: 640px) 140px, 200px"
        className="object-contain p-1"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        onError={() => setErr(true)}
      />
    </div>
  );
}

/* ─── Main card ────────────────────────────────────────────────────────────── */
export default function StrainCard({
  strain,
  priority = false,
}: {
  strain: Strain;
  priority?: boolean;
}) {
  const t = TYPE_STYLES[strain.type as keyof typeof TYPE_STYLES] || TYPE_STYLES.Hybrid;

  return (
    <Link href={`/strains/${strain.slug}`} className="group block">
      <article
        className="
          bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal
          hover:shadow-brutal-lg hover:-translate-y-0.5
          transition-transform duration-150 ease-out
          [transform:translateZ(0)] [will-change:transform]
        "
      >
        {/*
          Layout sketch (your drawing):
          ┌──────────┬──────────────────────────┐
          │          │  Name · Type badge        │
          │  IMAGE   │  THC · CBD · Flower       │
          │          │  Effects                  │
          ├──────────┤  Helps With               │
          │ diff dot │  Terpenes                 │
          │  footer  │                           │
          └──────────┴──────────────────────────┘

          Image sits top-left, info wraps right & below it.
          We use CSS grid with named areas to achieve this cleanly.
        */}

        <div
          className="grid"
          style={{
            gridTemplateColumns: "140px 1fr",
            gridTemplateRows: "auto auto",
            gridTemplateAreas: `
              "img  info"
              "foot foot"
            `,
          }}
        >
          {/* ── Image area ─────────────────────────────────── */}
          <div style={{ gridArea: "img" }} className="relative">
            {strain.rank_popularity <= 10 && (
              <span
                className="absolute top-2 left-2 z-10 bg-lime border-2 border-black
                  text-[10px] font-black px-1.5 py-0.5 rounded-lg shadow-brutal-sm"
              >
                #{Math.round(strain.rank_popularity)}
              </span>
            )}
            <StrainImg
              strain={strain}
              priority={priority}
              className="w-full h-full min-h-[140px]"
            />
          </div>

          {/* ── Info area ──────────────────────────────────── */}
          <div
            style={{ gridArea: "info" }}
            className="p-3 border-l-2 border-black flex flex-col gap-2"
          >
            {/* Name + type */}
            <div className="flex items-start justify-between gap-1.5">
              <h3 className="font-black text-[15px] leading-tight">{strain.name}</h3>
              <span
                className={`flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-md border
                  ${t.bg} ${t.border} ${t.text}`}
              >
                {strain.type}
              </span>
            </div>

            {/* Stats row */}
            <div className="flex gap-1.5 flex-wrap">
              <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                <span className="text-xs">🔥</span>
                <span className={`text-xs font-black ${THC_COLOR(strain.thc_max)}`}>
                  {strain.thc_max}%
                </span>
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
            {strain.effects?.length > 0 && (
              <div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-wide mb-1">
                  Effects
                </div>
                <div className="flex flex-wrap gap-1">
                  {strain.effects.slice(0, 3).map((e) => (
                    <span
                      key={e}
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-lime-pale border border-lime-dark text-brand"
                    >
                      {MOOD_EMOJI[e] || "✨"} {e}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Helps with */}
            {strain.helps_with?.length > 0 && (
              <div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-wide mb-1">
                  Helps With
                </div>
                <div className="flex flex-wrap gap-1">
                  {strain.helps_with.slice(0, 3).map((h) => (
                    <span
                      key={h}
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sativa-bg border border-sativa-border text-sativa"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Footer (full width below both) ─────────────── */}
          <div
            style={{ gridArea: "foot" }}
            className="px-3 py-2 bg-gray-50 border-t-2 border-black flex items-center justify-between gap-2"
          >
            {/* Grow difficulty */}
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${DIFF_DOT[strain.grow_difficulty] || "bg-gray-400"}`} />
              <span className={`text-[10px] font-bold ${DIFF_TEXT[strain.grow_difficulty] || "text-gray-500"}`}>
                {strain.grow_difficulty} Grow
              </span>
            </div>

            {/* Terpenes */}
            <div className="flex gap-1 flex-wrap justify-end">
              {strain.terpenes?.slice(0, 2).map((tp) => (
                <span
                  key={tp}
                  className="text-[8px] font-semibold px-1.5 py-0.5 bg-indica-bg border border-indica-border rounded text-indica"
                >
                  {tp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
