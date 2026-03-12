import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-xl font-black mb-3">
              Strain<span className="bg-lime text-brand px-1.5 rounded-md">Hub</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The most comprehensive cannabis strain database. Built for growers, consumers, and curious minds. Free forever.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Explore</div>
            {[
              { href: "/strains", label: "All Strains" },
              { href: "/strains?type=Indica", label: "🍇 Indica" },
              { href: "/strains?type=Sativa", label: "☀️ Sativa" },
              { href: "/strains?type=Hybrid", label: "⚡ Hybrid" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="block text-sm text-gray-400 mb-2 hover:text-lime transition-colors">{l.label}</Link>
            ))}
          </div>

          {/* Learn */}
          <div>
            <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Learn</div>
            {[
              { href: "/learn/terpenes", label: "Terpene Guide" },
              { href: "/learn/cannabinoids", label: "Cannabinoids 101" },
              { href: "/learn/grow-guide", label: "Grow Guide" },
              { href: "/learn/deficiencies", label: "Deficiency Diagnosis" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="block text-sm text-gray-400 mb-2 hover:text-lime transition-colors">{l.label}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Company</div>
            {[
              { href: "/about", label: "About StrainHub" },
              { href: "/advertise", label: "Advertise With Us" },
              { href: "/contact", label: "Contact" },
              { href: "/privacy", label: "Privacy Policy" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="block text-sm text-gray-400 mb-2 hover:text-lime transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            ⚠️ For educational purposes only. Cannabis laws vary by location — always follow your local regulations. Effects described are based on user-reported experiences and are not intended as medical advice.
          </p>
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs text-gray-600">
            <span>© 2026 StrainHub. All rights reserved.</span>
            <span>🌿 Built for enthusiasts, by enthusiasts.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
