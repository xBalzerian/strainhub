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
  Energetic: "⚡", Sleepy: "😴", Uplifted: "🚀", Uplifting: "🚀", Focused: "🎯",
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

  // Only show placeholder if no URL or actual load error
  if (err || !strain.image_url) {
    return (
      <div className={`${t.bg} flex flex-col items-center justify-center gap-1 ${className}`}>
        <span className="text-4xl">{emoji}</span>
        <span className={`text-[9px] font-black ${t.text} uppercase tracking-widest`}>{strain.type}</span>
      </div>
    );
  }

  return (
    <div className={`relative ${t.bg} ${className}`}>
      <Image
        src={strain.image_url}
        alt={`${strain.name} cannabis strain`}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
        className="object-contain p-1.5"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        onError={() => setErr(true)}
        unoptimized={strain.image_url.includes("tempfile.aiquickdraw.com")}
      />
    </div>
  );
}


// ── GEM RANK BADGES ──────────────────────────────────────────────────────────
const GEM_BADGES: Record<number, { gem: string; label: string; bg: string; text: string; border: string; glow: string }> = {
  1:  { gem: "💎", label: "#1",  bg: "linear-gradient(135deg,#b9f2ff,#e0f7ff,#7dd3fc)", text: "text-sky-900",    border: "border-sky-400",    glow: "shadow-[0_0_8px_rgba(125,211,252,0.8)]" },
  2:  { gem: "🥇", label: "#2",  bg: "linear-gradient(135deg,#fde68a,#fbbf24,#f59e0b)", text: "text-amber-900",  border: "border-amber-400",  glow: "shadow-[0_0_8px_rgba(251,191,36,0.8)]"  },
  3:  { gem: "🥈", label: "#3",  bg: "linear-gradient(135deg,#e5e7eb,#d1d5db,#9ca3af)", text: "text-slate-800",  border: "border-slate-400",  glow: "shadow-[0_0_8px_rgba(156,163,175,0.7)]" },
  4:  { gem: "🥉", label: "#4",  bg: "linear-gradient(135deg,#fed7aa,#fb923c,#ea580c)", text: "text-orange-900", border: "border-orange-400", glow: "shadow-[0_0_8px_rgba(251,146,60,0.8)]"  },
  5:  { gem: "🔮", label: "#5",  bg: "linear-gradient(135deg,#e9d5ff,#a855f7,#7c3aed)", text: "text-purple-100", border: "border-purple-400", glow: "shadow-[0_0_8px_rgba(168,85,247,0.8)]"  },
  6:  { gem: "💙", label: "#6",  bg: "linear-gradient(135deg,#bfdbfe,#3b82f6,#1d4ed8)", text: "text-white",      border: "border-blue-400",   glow: "shadow-[0_0_8px_rgba(59,130,246,0.8)]"  },
  7:  { gem: "❤️", label: "#7",  bg: "linear-gradient(135deg,#fecaca,#ef4444,#b91c1c)", text: "text-white",      border: "border-red-400",    glow: "shadow-[0_0_8px_rgba(239,68,68,0.8)]"   },
  8:  { gem: "🌟", label: "#8",  bg: "linear-gradient(135deg,#fef9c3,#facc15,#ca8a04)", text: "text-yellow-900", border: "border-yellow-400", glow: "shadow-[0_0_6px_rgba(250,204,21,0.7)]"  },
  9:  { gem: "🩶", label: "#9",  bg: "linear-gradient(135deg,#f3f4f6,#e5e7eb,#d1d5db)", text: "text-gray-700",   border: "border-gray-300",   glow: ""                                        },
  10: { gem: "💚", label: "#10", bg: "linear-gradient(135deg,#bbf7d0,#4ade80,#16a34a)", text: "text-green-900",  border: "border-green-400",  glow: "shadow-[0_0_6px_rgba(74,222,128,0.7)]"  },
};

function GemBadge({ rank, size = "md" }: { rank: number; size?: "sm" | "md" }) {
  const b = GEM_BADGES[rank];
  if (!b) return null;
  const pad = size === "sm" ? "px-1.5 py-0.5 text-[8px]" : "px-2 py-0.5 text-[10px]";
  return (
    <span
      className={`inline-flex items-center gap-0.5 font-black rounded-full border ${b.text} ${b.border} ${b.glow} ${pad} leading-none`}
      style={{ background: b.bg }}
    >
      <span className="leading-none">{b.gem}</span>
      <span>{b.label}</span>
    </span>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
export default function StrainCard({
  strain,
  priority = false,
  compact = false,
}: {
  strain: Strain;
  priority?: boolean;
  compact?: boolean;
}) {
  const t = TYPE_STYLES[strain.type as keyof typeof TYPE_STYLES] || TYPE_STYLES.Hybrid;

  // compact = true → used in 2-col grids on mobile. Vertical card: image top, info below.
  if (compact) {
    return (
      <Link href={`/strains/${strain.slug}`} className="group block h-full">
        <article className="h-full flex flex-col bg-white border-2 border-black rounded-xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 transition-all duration-150">
          {/* Image top */}
          <div className="relative w-full aspect-[4/3] border-b-2 border-black flex-shrink-0">
            {strain.rank_popularity <= 10 && (
              <span className="absolute top-1.5 left-1.5 z-10">
                <GemBadge rank={Math.round(strain.rank_popularity)} size="sm" />
              </span>
            )}
            <span className={`absolute top-1.5 right-1.5 z-10 text-[9px] font-bold px-1.5 py-0.5 rounded border ${t.bg} ${t.border} ${t.text}`}>
              {strain.type}
            </span>
            <StrainImg strain={strain} priority={priority} className="w-full h-full" />
          </div>
          {/* Info */}
          <div className="flex flex-col flex-1 p-2.5 gap-2">
            <h3 className="font-black text-[13px] leading-tight">{strain.name}</h3>
            <div className="flex gap-1 flex-wrap">
              <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5">
                <span className="text-[10px]">🔥</span>
                <span className={`text-[10px] font-black ${THC_COLOR(strain.thc_max)}`}>{strain.thc_max}%</span>
                <span className="text-[8px] text-gray-400">THC</span>
              </div>
              <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5">
                <span className="text-[10px]">💧</span>
                <span className="text-[10px] font-black">{strain.cbd_max}%</span>
                <span className="text-[8px] text-gray-400">CBD</span>
              </div>
              <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5">
                <span className="text-[10px]">⏱</span>
                <span className="text-[10px] font-black">{strain.flowering_weeks_max}w</span>
              </div>
            </div>
            {strain.effects?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {strain.effects.slice(0, 3).map((e) => (
                  <span key={e} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-lime-pale border border-lime-dark text-brand">
                    {MOOD_EMOJI[e] || "✨"} {e}
                  </span>
                ))}
              </div>
            )}
            {strain.helps_with?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {strain.helps_with.slice(0, 2).map((h) => (
                  <span key={h} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sativa-bg border border-sativa-border text-sativa">{h}</span>
                ))}
              </div>
            )}
          </div>
          <div className="px-2.5 py-2 bg-gray-50 border-t-2 border-black flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${DIFF_DOT[strain.grow_difficulty] || "bg-gray-400"}`} />
              <span className={`text-[9px] font-bold ${DIFF_TEXT[strain.grow_difficulty] || "text-gray-500"}`}>{strain.grow_difficulty}</span>
            </div>
            <div className="flex gap-1">
              {strain.flavors?.slice(0, 2).map((f) => (
                <span key={f} className="text-[8px] px-1 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-medium">{f}</span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/strains/${strain.slug}`} className="group block h-full">
      <article
        className="
          h-full flex flex-col
          bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal
          hover:shadow-brutal-lg hover:-translate-y-1
          transition-all duration-150 ease-out
          [transform:translateZ(0)] [will-change:transform]
        "
      >

        {/* ════════════════════════════════════════
            MOBILE (<sm): image left, content right
        ════════════════════════════════════════ */}
        <div className="sm:hidden flex flex-col flex-1">
          <div className="flex flex-1">
            {/* Image — top-left, fixed width */}
            <div className="relative flex-shrink-0 w-[130px] self-stretch">
              {strain.rank_popularity <= 10 && (
                <span className="absolute top-2 left-2 z-10">
                  <GemBadge rank={Math.round(strain.rank_popularity)} size="sm" />
                </span>
              )}
              <StrainImg strain={strain} priority={priority} className="w-full h-full min-h-[130px]" />
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 min-w-0 p-3 border-l-2 border-black gap-2">
              <div className="flex items-start justify-between gap-1.5">
                <h3 className="font-black text-[14px] leading-tight">{strain.name}</h3>
                <span className={`flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${t.bg} ${t.border} ${t.text}`}>
                  {strain.type}
                </span>
              </div>
              <div className="flex gap-1 flex-wrap">
                <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-lg px-1.5 py-1">
                  <span className="text-[11px]">🔥</span>
                  <span className={`text-[11px] font-black ${THC_COLOR(strain.thc_max)}`}>{strain.thc_max}%</span>
                  <span className="text-[8px] text-gray-400 ml-0.5">THC</span>
                </div>
                <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-lg px-1.5 py-1">
                  <span className="text-[11px]">💧</span>
                  <span className="text-[11px] font-black">{strain.cbd_max}%</span>
                  <span className="text-[8px] text-gray-400 ml-0.5">CBD</span>
                </div>
                <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-lg px-1.5 py-1">
                  <span className="text-[11px]">⏱</span>
                  <span className="text-[11px] font-black">{strain.flowering_weeks_max}w</span>
                </div>
              </div>
              {strain.effects?.length > 0 && (
                <div>
                  <div className="text-[8px] font-black text-gray-400 uppercase tracking-wide mb-1">Effects</div>
                  <div className="flex flex-wrap gap-1">
                    {strain.effects.slice(0, 3).map((e) => (
                      <span key={e} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-lime-pale border border-lime-dark text-brand">
                        {MOOD_EMOJI[e] || "✨"} {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {strain.helps_with?.length > 0 && (
                <div>
                  <div className="text-[8px] font-black text-gray-400 uppercase tracking-wide mb-1">Helps With</div>
                  <div className="flex flex-wrap gap-1">
                    {strain.helps_with.slice(0, 3).map((h) => (
                      <span key={h} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sativa-bg border border-sativa-border text-sativa">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {strain.terpenes?.length > 0 && (
                <div>
                  <div className="text-[8px] font-black text-gray-400 uppercase tracking-wide mb-1">Terpenes</div>
                  <div className="flex flex-wrap gap-1">
                    {strain.terpenes.slice(0, 2).map((tp) => (
                      <span key={tp} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indica-bg border border-indica-border text-indica">
                        {tp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-3 py-2 bg-gray-50 border-t-2 border-black flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${DIFF_DOT[strain.grow_difficulty] || "bg-gray-400"}`} />
              <span className={`text-[10px] font-bold ${DIFF_TEXT[strain.grow_difficulty] || "text-gray-500"}`}>
                {strain.grow_difficulty} Grow
              </span>
            </div>
            <div className="flex gap-1">
              {strain.flavors?.slice(0, 2).map((f) => (
                <span key={f} className="text-[8px] px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-medium">{f}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            DESKTOP (sm+): image top, content below
        ════════════════════════════════════════ */}
        <div className="hidden sm:flex flex-col flex-1">
          <div className="relative w-full aspect-[4/3] border-b-2 border-black">
            {strain.rank_popularity <= 10 && (
              <span className="absolute top-2.5 left-2.5 z-10">
                <GemBadge rank={Math.round(strain.rank_popularity)} />
              </span>
            )}
            <span className={`absolute top-2.5 right-2.5 z-10 text-[10px] font-bold px-2 py-0.5 rounded-lg border ${t.bg} ${t.border} ${t.text}`}>
              {strain.type}
            </span>
            <StrainImg strain={strain} priority={priority} className="w-full h-full" />
          </div>

          <div className="flex flex-col flex-1 p-4 gap-3">
            <div>
              <h3 className="font-black text-base leading-tight">{strain.name}</h3>
              {strain.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-snug">{strain.description}</p>
              )}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5">
                <span className="text-xs">🔥</span>
                <span className={`text-xs font-black ${THC_COLOR(strain.thc_max)}`}>{strain.thc_max}%</span>
                <span className="text-[10px] text-gray-400">THC</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5">
                <span className="text-xs">💧</span>
                <span className="text-xs font-black">{strain.cbd_max}%</span>
                <span className="text-[10px] text-gray-400">CBD</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5">
                <span className="text-xs">⏱</span>
                <span className="text-xs font-black">{strain.flowering_weeks_max}w</span>
              </div>
            </div>
            {strain.effects?.length > 0 && (
              <div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-wide mb-1.5">Effects</div>
                <div className="flex flex-wrap gap-1">
                  {strain.effects.slice(0, 3).map((e) => (
                    <span key={e} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-lime-pale border border-lime-dark text-brand">
                      {MOOD_EMOJI[e] || "✨"} {e}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {strain.helps_with?.length > 0 && (
              <div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-wide mb-1.5">Helps With</div>
                <div className="flex flex-wrap gap-1">
                  {strain.helps_with.slice(0, 3).map((h) => (
                    <span key={h} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-sativa-bg border border-sativa-border text-sativa">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {strain.terpenes?.length > 0 && (
              <div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-wide mb-1.5">Terpenes</div>
                <div className="flex flex-wrap gap-1">
                  {strain.terpenes.slice(0, 3).map((tp) => (
                    <span key={tp} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-indica-bg border border-indica-border text-indica">
                      {tp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-2.5 bg-gray-50 border-t-2 border-black flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${DIFF_DOT[strain.grow_difficulty] || "bg-gray-400"}`} />
              <span className={`text-[10px] font-bold ${DIFF_TEXT[strain.grow_difficulty] || "text-gray-500"}`}>
                {strain.grow_difficulty} Grow
              </span>
            </div>
            <div className="flex gap-1">
              {strain.flavors?.slice(0, 2).map((f) => (
                <span key={f} className="text-[9px] px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-medium">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
