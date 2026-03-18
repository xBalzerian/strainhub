"use client";
import Link from "next/link";
import { useState } from "react";

const BANKS = [
  { slug: "compound-genetics",   name: "Compound Genetics" },
  { slug: "cookies-fam-genetics", name: "Cookies Fam" },
  { slug: "seed-junky-genetics",  name: "Seed Junky" },
  { slug: "ethos-genetics",       name: "Ethos Genetics" },
  { slug: "royal-queen-seeds",    name: "Royal Queen Seeds" },
  { slug: "barneys-farm",         name: "Barney\'s Farm" },
  { slug: "seedsman",             name: "Seedsman" },
  { slug: "crop-king-seeds",      name: "Crop King Seeds" },
  { slug: "ilgm",                 name: "ILGM" },
  { slug: "mephisto-genetics",    name: "Mephisto Genetics" },
];

function BankLogo({ slug, name }: { slug: string; name: string }) {
  const [err, setErr] = useState(false);
  const src = `https://raw.githubusercontent.com/xBalzerian/strainhub/main/public/images/logos/${slug}.png`;
  return (
    <Link
      href={`/seedbanks/${slug}`}
      className="flex-shrink-0 snap-start group flex flex-col items-center gap-2 bg-white border-2 border-brand/15 hover:border-lime rounded-2xl px-4 py-4 shadow-sm hover:shadow-brutal-sm transition-all hover:-translate-y-0.5 w-[90px] sm:w-[100px]"
    >
      <div className="w-12 h-12 rounded-xl overflow-hidden bg-off-white border border-brand/10 flex items-center justify-center">
        {err ? (
          <span className="text-xl font-black text-lime">{name.charAt(0)}</span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name} className="w-full h-full object-contain p-1" loading="lazy" onError={() => setErr(true)} />
        )}
      </div>
      <span className="text-[10px] font-black text-brand text-center leading-tight line-clamp-2">{name}</span>
    </Link>
  );
}

export default function SeedbankLogoCloud() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible scrollbar-hide snap-x snap-mandatory">
      {BANKS.map((b) => <BankLogo key={b.slug} slug={b.slug} name={b.name} />)}
    </div>
  );
}
