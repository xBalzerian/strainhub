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
        <span className="text-4xl">{emoji}</span>
        <span className={`text-[9px] font-black ${t.text} uppercase tracking-widest`}>{strain.type}</span>
      </div>
    );
  }

  return (
    <div className={`relative ${t.bg} ${className}`}>
      <Image
        src={strain.image_url!}
        alt={`${strain.name} cannabis strain`}
        fill
        sizes="(max-width: 640px) 130px, (max-width: 1024px) 33vw, 25vw"
        className="object-contain p-1.5"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        onError={() => setErr(true)}
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

        {/* ════════════════════════════════════════════════
            MOBILE  (<sm): your drawn layout
            Image top-left corner, content fills right & bottom

            ┌─────────┬─────────────────────┐
            │         │  Name        Type   │
            │  IMAGE  │  THC  CBD  Flower   │
            │         │  Effects            │
            ├─────────┘  Helps With         │
            │            Terpenes           │
            ├───────────────────────────────┤
            │  ● Easy Grow       Sweet Van  │
            └───────────────────────────────┘
        ════════════════════════════════════════════════ */}
        <div className="sm:hidden flex flex-col flex-1">
          {/* Top section: image + info side by side */}
          <div className="flex flex-1">
            {/* Image — top-left, fixed width */}
            <div className="relative flex-shrink-0 w-[130px] self-stretch">
              {strain.rank_popularity <= 10 && (
                <span className="absolute top-2 left-2 z-10 bg-lime border-2 border-black text-[10px] font-black px-1.5 py-0.5 rounded-lg shadow-brutal-sm">
                  #{Math.round(strain.rank_popularity)}
                </span>
              )}
              <StrainImg strain={strain} priority={priority} className="w-full h-full min-h-[130px]" />
            </div>

            {/* Info — fills remaining space to the right */}
            <div className="flex flex-col flex-1 min-w-0 p-3 border-l-2 border-black gap-2">
              {/* Name + type */}
              <div className="flex items-start justify-between gap-1.5">
                <h3 className="font-black text-[14px] leading-tight">{strain.name}</h3>
                <span className={`flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${t.bg} ${t.border} ${t.text}`}>
                  {strain.type}
                </span>
              </div>

              {/* Stats */}
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

              {/* Effects */}
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

              {/* Helps with */}
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

              {/* Terpenes */}
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

          {/* Footer — full width under both image and info */}
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

        {/* ════════════════════════════════════════════════
            DESKTOP (sm+): image on top, content below

            ┌──────────────────────┐
            │                      │
            │      🖼 image        │
            │   (full, contained)  │
            │                      │
            ├──────────────────────┤
            │  Name         Type   │
            │  Description 2 lines │
            │  🔥THC  💧CBD  ⏱Wks  │
            │  Effects             │
            │  Helps With          │
            │  Terpenes            │
            ├──────────────────────┤
            │  ● Grow     Flavors  │
            └──────────────────────┘
        ════════════════════════════════════════════════ */}
        <div className="hidden sm:flex flex-col flex-1">
          {/* Image top */}
          <div className="relative w-full aspect-square border-b-2 border-black">
            {strain.rank_popularity <= 10 && (
              <span className="absolute top-2.5 left-2.5 z-10 bg-lime border-2 border-black text-[11px] font-black px-2 py-0.5 rounded-lg shadow-brutal-sm">
                #{Math.round(strain.rank_popularity)}
              </span>
            )}
            <span className={`absolute top-2.5 right-2.5 z-10 text-[10px] font-bold px-2 py-0.5 rounded-lg border ${t.bg} ${t.border} ${t.text}`}>
              {strain.type}
            </span>
            <StrainImg strain={strain} priority={priority} className="w-full h-full" />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-3.5 gap-2.5">
            <h3 className="font-black text-[15px] leading-tight">{strain.name}</h3>

            {strain.description && (
              <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{strain.description}</p>
            )}

            {/* Stats */}
            <div className="flex gap-1.5">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-center">
                <div className={`text-xs font-black ${THC_COLOR(strain.thc_max)}`}>🔥 {strain.thc_max}%</div>
                <div className="text-[8px] text-gray-400 font-semibold uppercase tracking-wide mt-0.5">THC</div>
              </div>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-center">
                <div className="text-xs font-black">💧 {strain.cbd_max}%</div>
                <div className="text-[8px] text-gray-400 font-semibold uppercase tracking-wide mt-0.5">CBD</div>
              </div>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-center">
                <div className="text-xs font-black">⏱ {strain.flowering_weeks_max}w</div>
                <div className="text-[8px] text-gray-400 font-semibold uppercase tracking-wide mt-0.5">Flower</div>
              </div>
            </div>

            {strain.effects?.length > 0 && (
              <div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Effects</div>
                <div className="flex flex-wrap gap-1">
                  {strain.effects.slice(0, 3).map((e) => (
                    <span key={e} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-lime-pale border border-lime-dark text-brand">
                      {MOOD_EMOJI[e] || "✨"} {e}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {strain.helps_with?.length > 0 && (
              <div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Helps With</div>
                <div className="flex flex-wrap gap-1">
                  {strain.helps_with.slice(0, 3).map((h) => (
                    <span key={h} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sativa-bg border border-sativa-border text-sativa">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {strain.terpenes?.length > 0 && (
              <div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Terpenes</div>
                <div className="flex flex-wrap gap-1">
                  {strain.terpenes.slice(0, 3).map((tp) => (
                    <span key={tp} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indica-bg border border-indica-border text-indica">
                      {tp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1" />

            {/* Footer */}
            <div className="pt-2.5 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${DIFF_DOT[strain.grow_difficulty] || "bg-gray-400"}`} />
                <span className={`text-[10px] font-bold ${DIFF_TEXT[strain.grow_difficulty] || "text-gray-500"}`}>
                  {strain.grow_difficulty} Grow
                </span>
              </div>
              {strain.flavors?.length > 0 && (
                <div className="flex gap-1">
                  {strain.flavors.slice(0, 2).map((f) => (
                    <span key={f} className="text-[9px] px-1.5 py-0.5 bg-gray-50 border border-gray-200 rounded text-gray-500 font-medium">{f}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </article>
    </Link>
  );
}
