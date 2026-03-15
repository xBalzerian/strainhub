import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Therapeutic & Medicinal Applications | StrainHub Learn",
  description: "Comprehensive guide to therapeutic & medicinal applications — science-backed cannabis education from StrainHub.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/effects" className="hover:text-black">Effects</Link><span>/</span>
          <span className="text-black font-semibold">Therapeutic & Medicinal Applications</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#faf5ff", color: "#6d28d9" }}>
            Learn Hub
          </div>
          <h1 className="text-4xl font-black text-black mb-4">Therapeutic & Medicinal Applications</h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://base44.app/api/apps/69b215547e21a09debcd5b78/files/public/69b215547e21a09debcd5b78/0b00a1801_medical.jpg" alt="Medical cannabis illustration" className="w-full h-56 md:h-72 object-cover rounded-2xl border border-gray-100 mt-6 mb-2" />
          <p className="text-gray-500 text-lg">This comprehensive guide is coming soon. In the meantime, explore related topics in our Learn Hub.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🚧</div>
          <h2 className="font-black text-lg text-black mb-2">Deep Dive Coming Soon</h2>
          <p className="text-sm text-gray-500 mb-6">Our editorial team is preparing a comprehensive, science-backed guide on this topic.</p>
          <Link href="/learn/effects" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all">
            ← Back to Effects
          </Link>
        </div>
      </div>
    </div>
  );
}
