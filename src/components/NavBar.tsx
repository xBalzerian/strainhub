"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { Strain } from "@/lib/types";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Strain[]>([]);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, profile, isPro, signOut } = useAuth();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) setOpen(false);
      if (!userMenuRef.current?.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (query.length < 2) { setResults([]); setOpen(false); return; }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/strains/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.strains || []);
      setOpen(true);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/strains", label: "Strains" },
    { href: "/chat", label: "💬 AI Chat" },
    { href: "/diagnose", label: "🔬 Diagnose" },
    { href: "/learn", label: "Learn" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black h-16 flex items-center px-6 gap-4 [transform:translateZ(0)]">
        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-tight text-brand flex-shrink-0">
          Strain<span className="bg-lime text-brand px-1.5 py-0.5 rounded-md">Hub</span>
        </Link>

        {/* Nav Links desktop */}
        <div className="hidden lg:flex gap-1 ml-4">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-bold px-3 py-2 rounded-lg transition-all ${
                pathname === l.href ? "bg-lime text-brand" : "text-gray-500 hover:text-brand hover:bg-lime-pale"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden sm:block" ref={searchRef}>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              className="bg-gray-100 border-2 border-gray-200 focus:border-lime focus:bg-white text-brand pl-9 pr-4 py-2 rounded-xl text-sm font-semibold w-44 focus:w-60 transition-all outline-none placeholder:text-gray-400"
              placeholder="Search strains..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => results.length > 0 && setOpen(true)}
            />
            {open && results.length > 0 && (
              <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border-2 border-black rounded-2xl shadow-brutal overflow-hidden z-50 max-h-80 overflow-y-auto">
                {results.map((s) => (
                  <Link key={s.slug} href={`/strains/${s.slug}`}
                    onClick={() => { setOpen(false); setQuery(""); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-lime-pale transition-colors"
                  >
                    {s.image_url && <img src={s.image_url} alt={s.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200" />}
                    <div>
                      <div className="text-sm font-bold">{s.name}</div>
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
              {/* Compact avatar trigger */}
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-gray-100 transition-all"
              >
                <div className="w-8 h-8 rounded-full border-2 border-black overflow-hidden flex items-center justify-center flex-shrink-0 bg-lime">
                  {(user?.user_metadata?.avatar_url || profile?.avatar_url) ? (
                    <img
                      src={user?.user_metadata?.avatar_url || profile?.avatar_url}
                      alt="avatar"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-sm font-black leading-none">
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
                  {/* User header */}
                  <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-gray-100 bg-gray-50">
                    <div className="w-9 h-9 rounded-full border border-gray-200 overflow-hidden flex-shrink-0 bg-lime flex items-center justify-center">
                      {(user?.user_metadata?.avatar_url || profile?.avatar_url) ? (
                        <img
                          src={user?.user_metadata?.avatar_url || profile?.avatar_url}
                          alt="avatar"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-sm font-black">
                          {(profile?.full_name || user?.email || "?")[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-gray-900 truncate">
                        {profile?.full_name || user?.user_metadata?.full_name || "User"}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate">{profile?.email || user?.email}</div>
                    </div>
                    {isPro && (
                      <span className="flex-shrink-0 text-[9px] font-black bg-lime border border-black px-1.5 py-0.5 rounded-full">PRO</span>
                    )}
                  </div>
                  {/* Nav items */}
                  <div className="py-1">
                    <Link href="/account" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      My Account
                    </Link>
                    <Link href="/account?tab=subscription" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                      Subscription
                    </Link>
                    <Link href="/chat" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                      AI Chat
                    </Link>
                  </div>
                  <div className="border-t border-gray-100">
                    <button
                      onClick={async () => { setUserMenuOpen(false); await signOut(); router.push("/"); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block text-sm font-bold px-4 py-2 border-2 border-black rounded-xl hover:bg-lime-pale transition-all">
                Sign In
              </Link>
              <Link href="/pro" className="hidden sm:block text-sm font-black px-4 py-2 bg-lime border-2 border-black rounded-xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
                Get Pro 🌿
              </Link>
            </>
          )}

          {/* Mobile menu toggle */}
          <button className="lg:hidden p-2 rounded-lg border-2 border-black hover:bg-lime-pale transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <div className="w-5 h-0.5 bg-black mb-1" />
            <div className="w-5 h-0.5 bg-black mb-1" />
            <div className="w-5 h-0.5 bg-black" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b-2 border-black shadow-brutal lg:hidden">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl font-bold text-sm transition-all ${pathname === l.href ? "bg-lime text-brand" : "text-gray-500 hover:bg-lime-pale"}`}>
                {l.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-2 space-y-1">
              {user ? (
                <>
                  <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl font-bold text-sm text-gray-500 hover:bg-lime-pale">👤 My Account</Link>
                  <button onClick={async () => { setMobileMenuOpen(false); await signOut(); router.push("/"); }}
                    className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50">
                    🚪 Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 border-2 border-black rounded-xl font-black text-sm text-center">Sign In</Link>
                  <Link href="/pro" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 bg-lime border-2 border-black rounded-xl font-black text-sm text-center">🌿 Get Pro</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
