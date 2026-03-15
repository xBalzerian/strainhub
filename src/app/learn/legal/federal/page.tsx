import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Federal Cannabis Law in the United States | StrainHub Learn",
  description: "Complete guide to federal cannabis law — Schedule I status, the Controlled Substances Act, DEA enforcement, banking, and the proposed rescheduling to Schedule III.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/legal" className="hover:text-black">Legal</Link><span>/</span>
          <span className="text-black font-semibold">Federal Law</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fefce8", color: "#854d0e" }}>
            🏛️ Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Federal Cannabis Law (US)</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Cannabis remains federally illegal in the United States under the Controlled Substances Act — a fact that creates profound contradictions with 24 states that have legalized adult use. Here&apos;s exactly where federal law stands and where it&apos;s heading.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Controlled Substances Act & Schedule I</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The Controlled Substances Act (CSA, 1970) classifies cannabis as a Schedule I substance — defined as having &quot;no currently accepted medical use, high abuse potential, and lack of accepted safety for use under medical supervision.&quot; Schedule I is the most restrictive classification, placing cannabis alongside heroin and above cocaine (Schedule II). This classification was made by President Nixon over the explicit recommendation of his own Shafer Commission, which had advised decriminalization. Schedule I status makes cannabis federally illegal to possess, distribute, cultivate, or sell — regardless of state law. All federal lands (national parks, military bases, federal buildings) remain strictly prohibited regardless of surrounding state law.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Federal-State Conflict</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The Supremacy Clause of the US Constitution establishes that federal law supersedes state law when they conflict — meaning federal cannabis prohibition technically overrides all state legalization laws. In practice, the federal government has declined to enforce prohibition in legal states since 2013, when the Obama administration issued the Cole Memorandum directing federal prosecutors to deprioritize cannabis enforcement where states had robust regulatory systems. The Trump administration rescinded the Cole Memo in 2018 but didn&apos;t reinstate aggressive enforcement. The Biden and subsequent administrations have continued non-enforcement in legal states. However, this is prosecutorial discretion — not legal protection. Federal prosecution remains legally possible at any time.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Banking Problem</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Federal illegality creates a severe banking problem for the cannabis industry. Banks are federally regulated (FDIC, Federal Reserve) and risk criminal liability for providing services to cannabis businesses under federal anti-money-laundering laws (the Bank Secrecy Act). Most major banks refuse cannabis accounts, forcing thousands of cannabis businesses to operate cash-only — creating public safety risks, tax collection difficulties, and operational inefficiencies. The SAFE Banking Act (Secure and Fair Enforcement for Banking Act) has passed the House of Representatives multiple times since 2019 but has repeatedly stalled in the Senate. A small number of state-chartered credit unions and community banks do serve the cannabis industry under FinCEN guidance issued in 2014.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Proposed Rescheduling to Schedule III (2024)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">In May 2024, the DEA proposed rescheduling cannabis from Schedule I to Schedule III — the most significant federal cannabis policy shift in 54 years. Schedule III drugs (like anabolic steroids and ketamine) are recognized as having &quot;moderate to low physical dependence potential&quot; and accepted medical uses. Rescheduling to Schedule III would: allow cannabis businesses to deduct normal business expenses from taxes (currently prohibited under IRS Section 280E, costing the industry hundreds of millions annually), open the door to pharmaceutical research, and signal a significant policy shift. Critically, it would NOT federally legalize cannabis — Schedule III drugs are still controlled substances. Interstate commerce and retail sale would remain prohibited. The rulemaking process is ongoing as of 2025.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Federal Employees & Cannabis</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Federal employees — including military, intelligence, and most government contractors — are subject to federal drug-free workplace policies regardless of state law. A federal employee who uses cannabis legally under state law can still be fired and lose their security clearance. The intelligence community has maintained strict policies: the CIA, NSA, and FBI historically disqualified applicants who had used cannabis in the past 1–3 years. Some agencies have softened policies somewhat (CIA updated guidance in 2020), but federal employment and cannabis use remain fundamentally incompatible in most roles requiring clearance. Military personnel face UCMJ (Uniform Code of Military Justice) discipline for cannabis use regardless of state law or location.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {["Cannabis: Schedule I since 1970 CSA", "Schedule I = no accepted medical use (legally)", "Cole Memo (2013) paused federal enforcement in legal states", "Cole Memo rescinded 2018 — non-enforcement continues", "SAFE Banking Act: passed House but stalled Senate multiple times", "DEA proposed Schedule III rescheduling: May 2024", "Federal lands remain prohibited regardless of state law"].map(f => (
                  <li key={f} className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span><span>{f}</span></li>
                ))}
              </ul>
            </div>
            <Link href="/learn/legal" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to Legal</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
