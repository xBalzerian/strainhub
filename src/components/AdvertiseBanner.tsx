"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdvertiseBanner() {
  const pathname = usePathname();
  // Don't show the banner on the advertise page itself
  if (pathname === "/advertise") return null;

  return (
    <div className="w-full bg-brand border-b-2 border-black py-2.5 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            <span className="text-lime/60 text-[10px] font-black uppercase tracking-widest">Ad</span>
          </div>
          <p className="text-white font-bold text-sm leading-tight">
            Reach <span className="text-lime font-black">100K+</span> cannabis growers & buyers monthly
          </p>
        </div>
        <Link
          href="/advertise"
          className="flex-shrink-0 bg-lime text-brand font-black text-xs sm:text-sm px-4 py-2 rounded-lg border border-brand hover:bg-lime/90 transition-all whitespace-nowrap"
        >
          Advertise with Us →
        </Link>
      </div>
    </div>
  );
}
