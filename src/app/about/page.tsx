import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About StrainHub — The Most Detailed Cannabis Strain Database",
  description: "Learn about StrainHub, our mission to build the most comprehensive and accurate cannabis strain database on the internet.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F0] px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">About</span>
          <h1 className="text-4xl font-black mt-2 mb-4">We built the strain database <span className="text-brand">we always wanted.</span></h1>
          <p className="text-gray-600 text-lg leading-relaxed">StrainHub is a comprehensive cannabis strain encyclopedia — genetics, terpenes, effects, grow guides, and more. Free forever for the community.</p>
        </div>
        <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-8 mb-6 space-y-5">
          <h2 className="font-black text-xl">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">The internet is full of incomplete, inaccurate strain data. We&apos;re fixing that — building the deepest, most accurate cannabis strain resource available, with full genetic lineages, verified terpene profiles, real grow data, and community-driven reviews.</p>
          <p className="text-gray-600 leading-relaxed">Every page is crafted to be genuinely useful — not just keyword-stuffed content. We want growers, patients, and enthusiasts to find exactly what they need.</p>
        </div>
        <div className="bg-white border-2 border-black rounded-3xl shadow-brutal-sm p-8 mb-6 space-y-4">
          <h2 className="font-black text-xl">What We Cover</h2>
          <ul className="space-y-2 text-gray-600">
            {["cannabis strains with detailed profiles", "Full genetic lineages back to landrace strains", "Terpene profiles with effect breakdowns", "Grow guides: difficulty, yield, flowering times", "AI-powered strain finder and plant diagnosis", "Learning hub: free educational content for everyone"].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-brand font-black mt-0.5">✓</span>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4">
          <Link href="/strains" className="flex-1 py-3 bg-lime border-2 border-black rounded-xl font-black text-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">Browse Strains</Link>
          <Link href="/contact" className="flex-1 py-3 bg-white border-2 border-black rounded-xl font-black text-center hover:bg-lime-pale transition-all">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
