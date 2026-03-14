import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Germination Science & Methods | StrainHub Learn",
  description: "Comprehensive guide to germination science & methods — science-backed cannabis education from StrainHub.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/seeds" className="hover:text-black">Seeds</Link><span>/</span>
          <span className="text-black font-semibold">Germination Science & Methods</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fffbeb", color: "#92400e" }}>
            Learn Hub
          </div>
          <h1 className="text-4xl font-black text-black mb-4">Germination Science & Methods</h1>
          <p className="text-gray-500 text-lg">This comprehensive guide is coming soon. In the meantime, explore related topics in our Learn Hub.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🚧</div>
          <h2 className="font-black text-lg text-black mb-2">Deep Dive Coming Soon</h2>
          <p className="text-sm text-gray-500 mb-6">Our editorial team is preparing a comprehensive, science-backed guide on this topic.</p>
          <Link href="/learn/seeds" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all">
            ← Back to Seeds
          </Link>
        </div>
      </div>
    </div>
  );
}
