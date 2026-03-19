"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { Strain } from "@/lib/types";

// ─── LEARN MEGA-MENU DATA ────────────────────────────────────────────────────
const LEARN_MENU = [
  {
    section: "🌿 Strains",
    color: "#16a34a",
    bg: "#f0fdf4",
    href: "/learn/strains",
    links: [
      { label: "Indica vs. Sativa: The Science", href: "/learn/strains/indica-vs-sativa" },
      { label: "Cannabinoid Profiles Explained", href: "/learn/strains/cannabinoid-profiles" },
      { label: "Terpene Profiles & Effects", href: "/learn/strains/terpene-categories" },
      { label: "Why Strains Feel Different", href: "/learn/strains/effects" },
      { label: "Geographic Origins & Landraces", href: "/learn/strains/geographic-origins" },
      { label: "Cultivation Traits Guide", href: "/learn/strains/cultivation-traits" },
      { label: "Strains for Medical Use", href: "/learn/strains/medical-strains" },
      { label: "Using Strain Grow Data", href: "/learn/strains/grow-guide" },
    ],
  },
  {
    section: "🫘 Seeds",
    color: "#92400e",
    bg: "#fffbeb",
    href: "/learn/seeds",
    links: [
      { label: "Seed Types: Regular, Fem & Auto", href: "/learn/seeds/types" },
      { label: "Germination Methods Guide", href: "/learn/seeds/germination" },
      { label: "How to Choose the Right Seeds", href: "/learn/seeds/selection" },
      { label: "Long-Term Seed Storage", href: "/learn/seeds/storage" },
      { label: "Breeding Fundamentals", href: "/learn/seeds/breeding" },
      { label: "Seed Laws & Legality", href: "/learn/seeds/legal" },
    ],
  },
  {
    section: "🔬 Effects & Science",
    color: "#6d28d9",
    bg: "#faf5ff",
    href: "/learn/effects",
    links: [
      { label: "Cannabinoids: THC, CBD, CBG+", href: "/learn/effects/cannabinoids" },
      { label: "Terpene Pharmacology", href: "/learn/effects/terpenes" },
      { label: "The Entourage Effect", href: "/learn/effects/entourage-effect" },
      { label: "Acute Effects on the Brain", href: "/learn/effects/acute-effects" },
      { label: "Long-Term Effects & Research", href: "/learn/effects/long-term" },
      { label: "Medical Uses & Evidence", href: "/learn/effects/medical" },
      { label: "Drug Interactions Guide", href: "/learn/effects/interactions" },
    ],
  },
  {
    section: "💨 Consumption",
    color: "#0369a1",
    bg: "#f0f9ff",
    href: "/learn/consumption",
    links: [
      { label: "Inhalation: Smoking & Vaporizing", href: "/learn/consumption/inhalation" },
      { label: "Edibles: Onset, Dosing & Science", href: "/learn/consumption/edibles" },
      { label: "Topicals & Transdermal", href: "/learn/consumption/topicals" },
      { label: "Bioavailability Comparison", href: "/learn/consumption/bioavailability" },
      { label: "Choosing the Right Method", href: "/learn/consumption/method-selection" },
      { label: "Emerging Methods", href: "/learn/consumption/emerging" },
    ],
  },
  {
    section: "⚖️ Legal",
    color: "#b45309",
    bg: "#fff7ed",
    href: "/learn/legal",
    links: [
      { label: "US Federal Law", href: "/learn/legal/federal" },
      { label: "State-by-State Legal Map", href: "/learn/legal/states" },
      { label: "International Cannabis Laws", href: "/learn/legal/international" },
      { label: "Cannabis Business & Industry Law", href: "/learn/legal/industry" },
      { label: "Consumer Rights & Protections", href: "/learn/legal/consumer-rights" },
    ],
  },
  {
    section: "📜 History",
    color: "#be123c",
    bg: "#fff1f2",
    href: "/learn/history",
    links: [
      { label: "Ancient Origins: 10,000 BCE", href: "/learn/history/origins" },
      { label: "Religious & Ritual Use", href: "/learn/history/religious" },
      { label: "Colonial Spread", href: "/learn/history/colonial-spread" },
      { label: "Prohibition: The Real History", href: "/learn/history/prohibition" },
      { label: "Cultural Movements", href: "/learn/history/cultural-movements" },
      { label: "Social Justice & the Drug War", href: "/learn/history/social-justice" },
      { label: "Science History", href: "/learn/history/science-history" },
      { label: "The Modern Industry", href: "/learn/history/industry-evolution" },
    ],
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Strain[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState<number | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLDivElement>(null);
  const learnTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user, profile, isPro, signOut } = useAuth();

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) setSearchOpen(false);
      if (!userMenuRef.current?.contains(e.target as Node)) setUserMenuOpen(false);
      if (!learnRef.current?.contains(e.target as Node)) setLearnOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLearnOpen(false);
  }, [pathname]);

  // Search
  useEffect(() => {
    if (query.length < 2) { setResults([]); setSearchOpen(false); return; }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/strains/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.strains || []);
      setSearchOpen(true);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  const handleLearnEnter = useCallback(() => {
    if (learnTimeout.current) clearTimeout(learnTimeout.current);
    setLearnOpen(true);
  }, []);

  const handleLearnLeave = useCallback(() => {
    learnTimeout.current = setTimeout(() => setLearnOpen(false), 120);
  }, []);

  const navLinks = [
    { href: "/strains", label: "Strains" },
    { href: "/seedbanks", label: "Seed Banks" },
    { href: "/news", label: "News" },
    { href: "/chat", label: "AI Chat" },
    { href: "/diagnose", label: "Diagnose" },
    { href: "/pricing", label: "Pricing" },
  ];

  const isLearnActive = pathname.startsWith("/learn");

  return (
    <>
      {/* ── MAIN NAV ──────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6 gap-3 shadow-sm [transform:translateZ(0)]">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-tight flex-shrink-0" style={{ color: "#1a1a1a" }}>
          Strain<span className="bg-[#AAFF00] text-black px-1.5 py-0.5 rounded-md ml-0.5">Hub</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-0.5 ml-3">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-semibold px-3 py-2 rounded-lg transition-all ${
                pathname === l.href
                  ? "bg-[#AAFF00] text-black"
                  : "text-gray-600 hover:text-black hover:bg-gray-100"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Learn with mega-menu trigger */}
          <div
            ref={learnRef}
            className="relative"
            onMouseEnter={handleLearnEnter}
            onMouseLeave={handleLearnLeave}
          >
            <button
              onClick={() => setLearnOpen(!learnOpen)}
              className={`flex items-center gap-1 text-sm font-semibold px-3 py-2 rounded-lg transition-all ${
                isLearnActive
                  ? "bg-[#AAFF00] text-black"
                  : "text-gray-600 hover:text-black hover:bg-gray-100"
              }`}
            >
              Learn
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${learnOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* ── MEGA MENU ────────────────────────────────────────────── */}
            {learnOpen && (
              <div
                className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[860px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
                onMouseEnter={handleLearnEnter}
                onMouseLeave={handleLearnLeave}
              >
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <div>
                    <div className="text-sm font-black text-black">Cannabis Education Hub</div>
                    <div className="text-xs text-gray-500 mt-0.5">38 guides · Free forever · No account needed</div>
                  </div>
                  <Link
                    href="/learn"
                    onClick={() => setLearnOpen(false)}
                    className="text-xs font-bold bg-[#AAFF00] text-black px-3 py-1.5 rounded-lg hover:bg-[#99ee00] transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                {/* Grid of 6 sections */}
                <div className="grid grid-cols-3 gap-0 divide-x divide-gray-100">
                  {LEARN_MENU.map((section) => (
                    <div key={section.section} className="p-4">
                      {/* Section header */}
                      <Link
                        href={section.href}
                        onClick={() => setLearnOpen(false)}
                        className="flex items-center gap-2 mb-3 group"
                      >
                        <span className="text-sm font-black text-black group-hover:underline">
                          {section.section}
                        </span>
                        <svg className="w-3 h-3 text-gray-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>

                      {/* Topic links */}
                      <ul className="space-y-0.5">
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setLearnOpen(false)}
                              className={`block text-xs py-1 px-2 rounded-md transition-all ${
                                pathname === link.href
                                  ? "bg-[#AAFF00] text-black font-semibold"
                                  : "text-gray-600 hover:text-black hover:bg-gray-50 font-medium"
                              }`}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Bottom strip */}
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 flex items-center gap-6">
                  {[
                    { label: "🌡️ Deficiency Diagnosis", href: "/learn/deficiencies" },
                    { label: " Growing Guide", href: "/learn/grow-guide" },
                    { label: "🌍 Landrace Strains", href: "/learn/landraces" },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setLearnOpen(false)}
                      className="text-xs font-semibold text-gray-600 hover:text-black transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                  <span className="ml-auto text-xs text-gray-400">More coming soon →</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden sm:block" ref={searchRef}>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              className="bg-gray-100 border border-gray-200 focus:border-[#AAFF00] focus:bg-white text-black pl-9 pr-4 py-2 rounded-xl text-sm font-medium w-40 focus:w-56 transition-all outline-none placeholder:text-gray-400"
              placeholder="Search strains..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => results.length > 0 && setSearchOpen(true)}
            />
            {searchOpen && results.length > 0 && (
              <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto">
                {results.map((s) => (
                  <Link key={s.slug} href={`/strains/${s.slug}`}
                    onClick={() => { setSearchOpen(false); setQuery(""); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    {s.image_url && <img src={s.image_url} alt={s.name} className="w-9 h-9 rounded-lg object-cover border border-gray-100 flex-shrink-0" />}
                    <div>
                      <div className="text-sm font-bold text-black">{s.name}</div>
                      <div className="text-xs text-gray-500">{s.type} · THC {s.thc_max}% · {s.effects?.[0]}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User area */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-gray-100 transition-all"
              >
                <div className="w-8 h-8 rounded-full border-2 border-black overflow-hidden flex items-center justify-center bg-[#AAFF00]">
                  {(user?.user_metadata?.avatar_url || profile?.avatar_url) ? (
                    <img src={user?.user_metadata?.avatar_url || profile?.avatar_url} alt="avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="text-sm font-black leading-none text-black">
                      {(profile?.full_name || user?.email || "?")[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+6px)] w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-gray-100 bg-gray-50">
                    <div className="w-9 h-9 rounded-full border border-gray-200 overflow-hidden flex-shrink-0 bg-[#AAFF00] flex items-center justify-center">
                      {(user?.user_metadata?.avatar_url || profile?.avatar_url) ? (
                        <img src={user?.user_metadata?.avatar_url || profile?.avatar_url} alt="avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="text-sm font-black text-black">{(profile?.full_name || user?.email || "?")[0].toUpperCase()}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-gray-900 truncate">{profile?.full_name || user?.user_metadata?.full_name || "User"}</div>
                      <div className="text-[10px] text-gray-400 truncate">{profile?.email || user?.email}</div>
                    </div>
                    {isPro && <span className="flex-shrink-0 text-[9px] font-black bg-[#AAFF00] border border-black px-1.5 py-0.5 rounded-full">PRO</span>}
                  </div>
                  <div className="py-1">
                    {[
                      { href: "/account", icon: "👤", label: "My Account" },
                      { href: "/account?tab=subscription", icon: "⭐", label: "Subscription" },
                      { href: "/chat", icon: "💬", label: "AI Chat" },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <span>{item.icon}</span>{item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100">
                    <button onClick={async () => { setUserMenuOpen(false); await signOut(); router.push("/"); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors">
                      <span>🚪</span>Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">Log in</Link>
              <Link href="/pro" className="text-sm font-bold bg-[#AAFF00] text-black px-4 py-2 rounded-xl hover:bg-[#99ee00] transition-all">Get Pro</Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-all"
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-black transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-black transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-black transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ───────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white overflow-y-auto">
          <div className="px-4 py-4 space-y-1 border-b border-gray-100">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  pathname === l.href ? "bg-[#AAFF00] text-black" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Learn section in mobile */}
          <div className="px-4 py-4">
            <button
              onClick={() => setMobileLearnOpen(!mobileLearnOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isLearnActive ? "bg-[#AAFF00] text-black" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>📚 Learn Hub</span>
              <svg className={`w-4 h-4 transition-transform ${mobileLearnOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileLearnOpen && (
              <div className="mt-2 space-y-2">
                {LEARN_MENU.map((section, idx) => (
                  <div key={section.section} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setActiveMobileSection(activeMobileSection === idx ? null : idx)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-sm font-bold text-black"
                    >
                      <span>{section.section}</span>
                      <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${activeMobileSection === idx ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeMobileSection === idx && (
                      <div className="px-3 pb-3 pt-2 space-y-1">
                        {section.links.map((link) => (
                          <Link key={link.href} href={link.href}
                            className={`block px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                              pathname === link.href ? "bg-[#AAFF00] text-black" : "text-gray-600 hover:bg-gray-50 hover:text-black"
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile auth */}
          <div className="px-4 py-4 border-t border-gray-100">
            {user ? (
              <button onClick={async () => { setMobileMenuOpen(false); await signOut(); router.push("/"); }}
                className="w-full text-sm font-semibold text-red-500 px-4 py-3 rounded-xl hover:bg-red-50 text-left transition-all">
                🚪 Sign Out
              </button>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="flex-1 text-center text-sm font-semibold text-gray-700 px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">Log in</Link>
                <Link href="/pro" className="flex-1 text-center text-sm font-bold bg-[#AAFF00] text-black px-4 py-3 rounded-xl hover:bg-[#99ee00] transition-all">Get Pro</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
