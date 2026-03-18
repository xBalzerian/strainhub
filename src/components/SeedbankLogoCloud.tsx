"use client";
import Link from "next/link";
import { useState } from "react";

const BANKS = [{"slug": "compound-genetics", "name": "Compound Genetics"}, {"slug": "cookies-fam-genetics", "name": "Cookies Fam"}, {"slug": "seed-junky-genetics", "name": "Seed Junky"}, {"slug": "ethos-genetics", "name": "Ethos Genetics"}, {"slug": "barneys-farm", "name": "Barney's Farm"}, {"slug": "ilgm", "name": "ILGM"}, {"slug": "royal-queen-seeds", "name": "Royal Queen Seeds"}, {"slug": "seedsman", "name": "Seedsman"}, {"slug": "crop-king-seeds", "name": "Crop King Seeds"}, {"slug": "mephisto-genetics", "name": "Mephisto Genetics"}, {"slug": "dutch-passion", "name": "Dutch Passion"}, {"slug": "fast-buds", "name": "Fast Buds"}];

function BankLogo({ slug, name }: { slug: string; name: string }) {
  const [err, setErr] = useState(false);
  const src = `https://raw.githubusercontent.com/xBalzerian/strainhub/main/public/images/logos/${slug}.png`;

  if (err) return null; // hide entirely if logo fails — keeps design clean

  return (
    <Link
      href={`/seedbanks/${slug}`}
      className="flex-shrink-0 snap-start group flex flex-col items-center gap-2.5 p-3 sm:p-4 rounded-2xl bg-white border border-gray-100 hover:border-lime hover:shadow-md transition-all duration-150 hover:-translate-y-0.5 w-[76px] sm:w-[88px]"
    >
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0 ring-1 ring-gray-100 group-hover:ring-lime transition-all">
        <img
          src={src}
          alt={name}
          className="w-full h-full object-contain p-1"
          loading="lazy"
          onError={() => setErr(true)}
        />
      </div>
      <span className="text-[9px] sm:text-[10px] font-bold text-gray-600 group-hover:text-brand text-center leading-tight line-clamp-2 w-full">{name}</span>
    </Link>
  );
}

export default function SeedbankLogoCloud() {
  return (
    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible scrollbar-hide snap-x snap-mandatory px-1">
      {BANKS.map((b) => (
        <BankLogo key={b.slug} slug={b.slug} name={b.name} />
      ))}
    </div>
  );
}
