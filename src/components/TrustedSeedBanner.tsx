import type { ReactNode } from "react";

/**
 * TrustedSeedBanner — big featured banner promoting trusted seed retailers.
 * Marijuanaseeds.com (US) + MJseedscanada.ca (Canada)
 * Responsive: two cards side-by-side on desktop, stacked on mobile.
 */

function StoreCard({
  flag,
  region,
  storeName,
  domain,
  href,
  tagline,
  bullets,
  cta,
}: {
  flag: string;
  region: string;
  storeName: string;
  domain: string;
  href: string;
  tagline: string;
  bullets: string[];
  cta: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group relative block bg-white border-2 border-black rounded-2xl shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
    >
      {/* top accent strip */}
      <div className="h-2 bg-lime border-b-2 border-black" />
      <div className="p-5 sm:p-7">
        {/* flag + region */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl sm:text-3xl leading-none">{flag}</span>
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-gray-400 border border-gray-200 rounded-full px-2.5 py-1">
            {region}
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-lime-dark">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-dark animate-pulse" />
            Trusted Store
          </span>
        </div>

        {/* store name */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-brand leading-tight">
          {storeName}
        </h3>
        <p className="text-xs sm:text-sm font-bold text-gray-500 mt-1">{tagline}</p>

        {/* bullets */}
        <ul className="mt-4 space-y-2">
          {bullets.map((b: string) => (
            <li key={b} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-gray-700">
              <span className="text-lime-dark font-black mt-0.5">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-sm sm:text-base font-bold text-gray-400 truncate">{domain}</span>
          <span className="inline-flex items-center gap-2 bg-brand text-white font-black text-sm px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border-2 border-black group-hover:bg-black transition-all whitespace-nowrap">
            {cta}
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function TrustedSeedBanner({
  variant = "section",
  contextLabel,
}: {
  variant?: "section" | "inline";
  contextLabel?: string;
}) {
  const heading: ReactNode = contextLabel ? (
    <>
      Planning to buy{" "}
      <span className="bg-lime px-2 rounded-lg text-brand">{contextLabel} seeds?</span>
    </>
  ) : (
    <>
      Planning to buy <span className="bg-lime px-2 rounded-lg text-brand">marijuana seeds?</span>
    </>
  );

  return (
    <section
      aria-label="Trusted seed retailers"
      className={
        variant === "inline"
          ? "relative bg-brand border-y-2 border-black py-10 sm:py-14 px-4 sm:px-6"
          : "relative bg-brand border-y-2 border-black py-14 sm:py-20 px-4 sm:px-6"
      }
    >
      <div className="max-w-7xl mx-auto">
        {/* dot grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #AAFF00 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* header */}
        <div className="relative text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-lime text-brand border-2 border-black px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-brutal-sm mb-4">
            🌱 Trusted Seed Retailers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1]">
            {heading}
          </h2>
          <p className="text-white/50 text-sm sm:text-base font-medium mt-3 max-w-2xl mx-auto">
            Buy from the most trusted seed banks in North America — verified genetics, discreet shipping, and guaranteed delivery.
          </p>
        </div>

        {/* cards — side by side on desktop, stacked on mobile */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 max-w-5xl mx-auto">
          <StoreCard
            flag="🇺🇸"
            region="United States"
            storeName="MarijuanaSeeds.com"
            domain="marijuanaseeds.com"
            href="https://www.marijuanaseeds.com"
            tagline="America's most trusted seed bank"
            bullets={[
              "Premium genetics, feminized & autoflower seeds",
              "Discreet, fast shipping across the US",
              "Germination guarantee on every order",
            ]}
            cta="Shop US Seeds"
          />
          <StoreCard
            flag="🇨🇦"
            region="Canada"
            storeName="MJ Seeds Canada"
            domain="mjseedscanada.ca"
            href="https://mjseedscanada.ca"
            tagline="Canada's #1 cannabis seed bank"
            bullets={[
              "500+ strains — feminized, autoflower & regular",
              "Stealth shipping to all Canadian provinces",
              "90% germination guarantee, seedsman support",
            ]}
            cta="Shop Canada Seeds"
          />
        </div>
      </div>
    </section>
  );
}
