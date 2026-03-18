"use client";
import Link from "next/link";

export default function AdvertiseBanner() {
  return (
    <div className="w-full bg-brand border-y-2 border-black py-3 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex w-7 h-7 rounded-full bg-lime/20 border border-lime/40 items-center justify-center text-lime text-xs font-black">AD</span>
          <div>
            <p className="text-white font-black text-sm leading-tight">Reach 100K+ cannabis growers & buyers monthly</p>
            <p className="text-white/50 text-xs">Seed banks · Brands · Affiliate listings — all in one place</p>
          </div>
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
