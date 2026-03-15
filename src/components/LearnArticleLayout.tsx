// Shared layout wrapper for all Learn article sub-pages
// Provides consistent sidebar + content grid, breadcrumbs, and related links

import Link from "next/link";

interface LearnArticleLayoutProps {
  children: React.ReactNode;
  section: string;
  sectionHref: string;
  title: string;
  description: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  sidebar?: React.ReactNode;
}

export default function LearnArticleLayout({
  children,
  section,
  sectionHref,
  title,
  description,
  badge,
  badgeBg,
  badgeColor,
  sidebar,
}: LearnArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
          <Link href="/" className="hover:text-black font-medium transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/learn" className="hover:text-black font-medium transition-colors">Learn</Link>
          <span className="text-gray-300">/</span>
          <Link href={sectionHref} className="hover:text-black font-medium transition-colors">{section}</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-semibold truncate max-w-[200px]">{title}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{ background: badgeBg, color: badgeColor }}
          >
            {badge}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-black mb-4 leading-tight max-w-3xl">
            {title}
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-14 items-start">
          {/* Main content */}
          <div className="space-y-10 min-w-0">
            {children}
          </div>

          {/* Sidebar */}
          {sidebar && (
            <div className="lg:sticky lg:top-24 space-y-5">
              {sidebar}
              <Link
                href={sectionHref}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to {section}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
