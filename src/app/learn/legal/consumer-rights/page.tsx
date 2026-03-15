import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Consumer Rights & Legal Protections | StrainHub Learn",
  description: "Know your rights as a cannabis consumer — employment protections, housing, DUI laws, expungement, parental rights, and how to navigate cannabis legally.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/legal" className="hover:text-black">Legal</Link><span>/</span>
          <span className="text-black font-semibold">Consumer Rights</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fefce8", color: "#854d0e" }}>
            🛡️ Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Consumer Rights & Protections</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Legal cannabis doesn&apos;t mean consequence-free cannabis. Employment, housing, driving, parenting, and firearm rights all interact with cannabis use in ways that many consumers don&apos;t fully understand.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Employment: The Biggest Gotcha</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Most US states allow employers to drug test and fire employees for cannabis use — even in fully legal states. Employer rights generally supersede employee rights here. Exceptions are growing: California (AB 2188, 2024), New York, New Jersey, and several other states now prohibit employers from firing workers for off-duty cannabis use detected by blood tests, though testing for impairment at work remains permitted. Safety-sensitive positions (aviation, transportation, nuclear, federal contractors) always retain full testing authority regardless of state law. DOT-regulated employees (truck drivers, pilots, train operators) are federally regulated and face zero tolerance. If your job involves drug testing, know your state&apos;s specific employer provisions before consuming.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Cannabis DUI: Impaired Driving Law</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Driving under the influence of cannabis is illegal in every US state — including fully legal states. Unlike alcohol, there is no universally accepted blood-level threshold for cannabis impairment (the 0.08 BAC equivalent). Some states use 5ng/mL THC in blood as a per se DUI standard (Colorado, Washington), but this is scientifically controversial since THC blood levels don&apos;t correlate well with impairment — regular users can have elevated blood THC while functionally unimpaired. Most states use &quot;any detectable amount&quot; or impairment-based standards judged by law enforcement observation. Standardized Field Sobriety Tests (SFSTs) are used but have limited reliability for cannabis. Oral fluid roadside testing devices are being deployed in several states.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Housing: Landlords & Public Housing</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Private landlords in legal states can legally prohibit cannabis use or cultivation on their property regardless of state legalization — and most do, due to insurance, property damage concerns, and the residual federal illegality. Always check your lease: violating a no-cannabis clause can be grounds for eviction. Federal public housing (Section 8 / HUD housing) has a strict no-cannabis policy regardless of state law — federal housing authority residents who test positive or are caught can face eviction and loss of housing assistance. Some states (California, New York) have enacted tenant protections limiting landlord ability to prohibit off-premises consumption, but on-premises smoking bans remain enforceable.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text*black mb-3">Expungement: Clearing Your Record</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Over 40 states with some form of legalization now have expungement provisions for prior cannabis convictions. The scope varies widely: some states provide automatic expungement (California, Illinois, New York — records cleared automatically without a petition), while others require individuals to file petitions, pay fees, and appear in court. Eligible offenses typically include possession and small-scale sales but generally exclude trafficking, distribution to minors, and use of a weapon. Illinois expunged nearly 500,000 records automatically by 2023. Federal records — including federal court convictions — are NOT eligible for state expungement and require presidential pardons (Biden issued a federal pardon for simple possession in 2022, affecting ~6,500 individuals).</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Firearms & Cannabis: A Serious Conflict</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Federal law (18 U.S.C. § 922(g)(3)) prohibits any &quot;unlawful user&quot; of a controlled substance from possessing firearms. Since cannabis is federally Schedule I, cannabis users — even legal state users — are technically prohibited from purchasing or possessing firearms under federal law. ATF Form 4473 (required for all licensed dealer firearms purchases) explicitly asks about controlled substance use, and answering yes (or being truthful about cannabis use) results in denial. Lying on Form 4473 is a federal felony. This creates an impossible situation for millions of Americans in legal states who both use cannabis legally and own firearms lawfully under state law. Several federal court cases challenging this prohibition are ongoing.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Rights Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {["Most employers can still fire for cannabis use","Some states now prohibit off-duty use termination","Cannabis DUI illegal in ALL states","Federal housing: zero tolerance regardless of state law","40+ states have expungement provisions","Federal law prohibits gun ownership by cannabis users"].map(f=>(
                  <li key={f} className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span><span>{f}</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 font-semibold">⚠️ This is educational information only. For specific legal situations, consult a licensed attorney in your state.</div>
            <Link href="/learn/legal" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to Legal</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
