import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal & Regulatory: Complete Guide | StrainHub Learn",
  description: "US federal law, state-by-state status, international comparisons, consumer rights, and the business regulations that govern the legal cannabis industry.",
};

const TOPICS = [
  { emoji: "🏛️", title: "US Federal Law", subtitle: "Schedule I, CSA, and rescheduling", href: "/learn/legal/federal", desc: "Federal cannabis law, the Cole Memo, and the proposed shift to Schedule III." },
  { emoji: "🗺️", title: "State-by-State Legal Map", subtitle: "24 recreational states and counting", href: "/learn/legal/states", desc: "Possession limits, home grow rules, and medical programs by state." },
  { emoji: "🌍", title: "International Cannabis Laws", subtitle: "Country-by-country guide", href: "/learn/legal/international", desc: "From full legalization in Canada to the death penalty in Singapore." },
  { emoji: "🏢", title: "Cannabis Business Law", subtitle: "Licensing, 280E tax, banking", href: "/learn/legal/industry", desc: "Why cannabis businesses pay 40–80% effective tax rates and more." },
  { emoji: "🛡️", title: "Consumer Rights", subtitle: "Employment, housing, DUI, firearms", href: "/learn/legal/consumer-rights", desc: "What legal cannabis does and does not protect you from." },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/" className="hover:text-black font-medium">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/learn" className="hover:text-black font-medium">Learn</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-semibold">Legal & Regulatory</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5" style={{ background: "#fff7ed", color: "#b45309" }}>
            ⚖️ Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Legal & Regulatory</h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">US federal law, state-by-state status, international comparisons, consumer rights, and the business regulations that govern the legal cannabis industry.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPICS.map((t) => (
            <Link key={t.href} href={t.href}
              className="group bg-white border-2 border-gray-100 hover:border-black rounded-2xl p-6 transition-all hover:shadow-md flex flex-col gap-3">
              <div className="text-3xl">{t.emoji}</div>
              <div>
                <div className="font-black text-black text-base group-hover:underline">{t.title}</div>
                <div className="text-xs text-gray-400 font-semibold mt-0.5">{t.subtitle}</div>
              </div>
              <p className="text-sm text-gray-600 leading-snug flex-1">{t.desc}</p>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-black transition-colors mt-auto">
                Read guide
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link href="/learn" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Learn Hub
          </Link>
        </div>
      </div>
    </div>
  );
}