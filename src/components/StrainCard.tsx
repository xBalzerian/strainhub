"use client";
import Link from "next/link";
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

const DIFF_STYLE = {
  Easy: "text-sativa",
  Moderate: "text-hybrid",
  Difficult: "text-red-600",
};

function StrainImage({ strain }: { strain: Strain }) {
  const t = TYPE_STYLES[strain.type] || TYPE_STYLES.Hybrid;
  const emoji = TYPE_EMOJI[strain.type] || "🌿";

  // If no image or known broken domain, show placeholder immediately
  const isKnownBroken = !strain.image_url || strain.image_url.includes("tempfile.aiquickdraw.com");

  if (isKnownBroken) {
    return (
      <div className={`w-full aspect-square ${t.bg} flex flex-col items-center justify-center gap-2`}>
        <span className="text-5xl">{emoji}</span>
        <span className={`text-[10px] font-black ${t.text} uppercase tracking-widest`}>{strain.type}</span>
      </div>
    );
  }

  return (
    <img
      src={strain.image_url}
      alt={`${strain.name} cannabis strain`}
      className="w-full aspect-square object-cover"
      loading="lazy"
      onError={(e) => {
        const target = e.currentTarget;
        target.style.display = "none";
        const parent = target.parentElement;
        if (parent) {
          parent.innerHTML = `<div class="w-full aspect-square ${t.bg} flex flex-col items-center justify-center gap-2"><span class="text-5xl">${emoji}</span><span class="text-xs font-black ${t.text} uppercase tracking-widest">${strain.type}</span></div>`;
        }
      }}
    />
  );
}

export default function StrainCard({ strain }: { strain: Strain }) {
  const t = TYPE_STYLES[strain.type] || TYPE_STYLES.Hybrid;
  const thcColor = strain.thc_max >= 28 ? "text-red-600" : strain.thc_max >= 22 ? "text-hybrid" : "text-sativa";
  const diffIcon = strain.grow_difficulty === "Easy" ? "🟢" : strain.grow_difficulty === "Moderate" ? "🟡" : "🔴";

  return (
    <Link href={`/strains/${strain.slug}`} className="group block">
      <article className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-1 transition-all duration-200">
        {/* Image */}
        <div className="relative">
          <StrainImage strain={strain} />
          {strain.rank_popularity <= 10 && (
            <span className="absolute top-2.5 left-2.5 bg-lime border-2 border-black text-xs font-black px-2 py-0.5 rounded-lg shadow-brutal-sm">
              #{Math.round(strain.rank_popularity)}
            </span>
          )}
          <span className={`absolute top-2.5 right-2.5 ${t.bg} border ${t.border} ${t.text} text-[10px] font-bold px-2 py-1 rounded-lg`}>
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
          <span className={`text-[11px] font-bold ${DIFF_STYLE[strain.grow_difficulty]}`}>
            {diffIcon} {strain.grow_difficulty} Grow
          </span>
          <div className="flex gap-1.5">
            {strain.flavors?.slice(0, 2).map((f) => (
              <span key={f} className="text-[9px] font-semibold px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500">
                {f}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
