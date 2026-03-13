import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Advertise on StrainHub — Reach Millions of Cannabis Enthusiasts",
  description: "Partner with StrainHub to reach a highly engaged audience of cannabis growers, patients, and enthusiasts. Premium ad placements for seed banks, dispensaries, and cannabis brands.",
};

export default function AdvertisePage() {
  const placements = [
    { name: "Homepage Hero Banner", size: "1200×300", desc: "Prime visibility above the fold on our highest-traffic page", price: "Contact for pricing" },
    { name: "Strain Page Sidebar", size: "300×600", desc: "Shown on every strain detail page — 70k+ pages", price: "Contact for pricing" },
    { name: "Search Results Top", size: "728×90", desc: "Appears at the top of all strain search results", price: "Contact for pricing" },
    { name: "Category Sponsor", size: "Custom", desc: "Sponsor a strain category (e.g. \"Best for Sleep\", \"Highest THC\")", price: "Contact for pricing" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F0] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Advertise</span>
        <h1 className="text-4xl font-black mt-2 mb-3">Reach cannabis enthusiasts <span className="text-brand">at scale.</span></h1>
        <p className="text-gray-500 text-lg mb-10">StrainHub is one of the fastest-growing cannabis databases on the internet. Connect your brand with growers, patients, and connoisseurs who are actively searching for products like yours.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[["100K+", "Monthly Visitors"], ["70K+", "Strain Pages"], ["5min+", "Avg. Session Time"]].map(([num, label]) => (
            <div key={label} className="bg-white border-2 border-black rounded-2xl shadow-brutal-sm p-5 text-center">
              <div className="text-3xl font-black text-brand">{num}</div>
              <div className="text-xs font-bold text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-black text-xl mb-4">Ad Placements</h2>
        <div className="space-y-3 mb-10">
          {placements.map((p) => (
            <div key={p.name} className="bg-white border-2 border-black rounded-2xl p-5 flex items-center justify-between gap-4">
              <div>
                <div className="font-black">{p.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{p.size} · {p.desc}</div>
              </div>
              <span className="text-xs font-bold text-gray-500 whitespace-nowrap">{p.price}</span>
            </div>
          ))}
        </div>

        <div className="bg-lime border-2 border-black rounded-3xl shadow-brutal p-8 text-center">
          <h2 className="font-black text-2xl mb-2">Ready to partner?</h2>
          <p className="text-gray-700 mb-6">We work with seed banks, dispensaries, grow supply brands, and cannabis tech companies. Custom sponsorship packages available.</p>
          <Link href="/contact" className="inline-block py-3 px-8 bg-black text-lime font-black rounded-xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
            Get in Touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
