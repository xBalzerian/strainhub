"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Strain } from "@/lib/types";

export default function NavBar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Strain[]>([]);
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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
    { href: "/learn", label: "Learn" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black h-16 flex items-center px-6 gap-4 [transform:translateZ(0)]">
      {/* Logo */}
      <Link href="/" className="text-xl font-black tracking-tight text-brand">
        Strain<span className="bg-lime text-brand px-1.5 py-0.5 rounded-md">Hub</span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex gap-1 ml-4">
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-sm font-bold px-3 py-2 rounded-lg transition-all ${
              pathname === l.href
                ? "bg-lime text-brand"
                : "text-gray-500 hover:text-brand hover:bg-lime-pale"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Search */}
      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden sm:block" ref={searchRef}>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            className="bg-gray-100 border-2 border-gray-200 focus:border-lime focus:bg-white text-brand pl-9 pr-4 py-2 rounded-xl text-sm font-semibold w-52 focus:w-72 transition-all outline-none placeholder:text-gray-400"
            placeholder="Search strains..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
          />
          {open && results.length > 0 && (
            <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border-2 border-black rounded-2xl shadow-brutal overflow-hidden z-50 max-h-80 overflow-y-auto">
              {results.map((s) => (
                <Link
                  key={s.slug}
                  href={`/strains/${s.slug}`}
                  onClick={() => { setOpen(false); setQuery(""); }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-lime-pale transition-colors"
                >
                  {s.image_url && (
                    <img src={s.image_url} alt={s.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                  )}
                  <div>
                    <div className="text-sm font-bold">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.type} · THC {s.thc_max}% · {s.effects?.[0]}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/strains"
          className="hidden sm:block text-sm font-bold px-4 py-2 border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all"
        >
          Browse All
        </Link>
        <button className="text-sm font-bold px-4 py-2 bg-lime border-2 border-black rounded-xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
          Get Pro 🌿
        </button>
      </div>
    </nav>
  );
}

