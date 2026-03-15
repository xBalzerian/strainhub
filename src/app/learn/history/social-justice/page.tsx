import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Racial Justice & the War on Drugs | StrainHub Learn",
  description: "The War on Drugs has disproportionately targeted Black and Latino communities. A data-driven look at cannabis arrests, sentencing, and the equity movement.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/history" className="hover:text-black">History</Link><span>/</span>
          <span className="text-black font-semibold">Racial Justice & the Drug War</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fff1f2", color: "#be123c" }}>
            ✊ History
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Racial Justice & the Drug War</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Black Americans are nearly 4x more likely to be arrested for cannabis possession than white Americans — despite virtually identical usage rates. This disparity is not incidental. It was designed in.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Numbers</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">According to the ACLU&apos;s 2020 report <em>A Tale of Two Countries</em>, Black Americans are 3.73x more likely to be arrested for cannabis possession than white Americans nationally — despite near-identical usage rates across racial groups. In some counties the disparity exceeds 10:1. From 2001 to 2018, there were over 8 million cannabis arrests in the United States. Nearly half were for simple possession. The majority of those arrested were Black or Hispanic. In 2018 alone, a cannabis arrest occurred every 48 seconds — more than for all violent crimes combined.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Built-In Racism: The Origins</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">As documented in the Prohibition section, early cannabis bans were explicitly tied to anti-Mexican and anti-Black sentiment. Harry Anslinger&apos;s public statements and internal FBI memos are filled with racial slurs. His Congressional testimony framed cannabis as a threat primarily because of its association with Black and Hispanic users. This racial framing was not incidental — it was the core of the political argument. When Nixon&apos;s aide John Ehrlichman admitted in 1994 that the War on Drugs was designed to target &quot;Blacks and the antiwar left,&quot; he was confirming what researchers had long documented.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Sentencing Disparities</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The 1986 Anti-Drug Abuse Act established a 100:1 sentencing disparity between crack cocaine (associated with Black urban communities) and powder cocaine (associated with white users) — the same drug in different form. Cannabis mandatory minimums sent thousands of Black men to federal prison for amounts that routinely resulted in probation or dismissal for white defendants. A 2017 US Sentencing Commission report found Black men receive sentences 19.1% longer than white men for the same offense. The disparity compounds at every stage of the criminal justice system: stops, searches, arrests, charges, plea deals, and sentencing.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Multi-Generational Impact</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">A cannabis conviction — even for simple possession — triggers cascading consequences: loss of federal student aid eligibility, disqualification from public housing, deportation risk for non-citizens, loss of voting rights in many states, and permanent employment barriers due to background checks. These collateral consequences devastate economic mobility for individuals and entire communities. Meanwhile, the legal cannabis industry — built on the same commerce that sent Black men to prison — is overwhelmingly white-owned. A 2021 survey found only 2% of cannabis business owners are Black.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Equity Movement</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The cannabis equity movement argues that legalization without reparative justice merely transfers wealth from Black underground operators to white corporate executives. The three demands of the movement are: (1) automatic expungement of prior cannabis convictions, (2) social equity licensing programs giving priority access to people from disproportionately impacted communities, and (3) reinvestment of cannabis tax revenue into those communities. Illinois, California, New York, and New Jersey have the most robust equity provisions in their legalization laws — though implementation has been slow and contested everywhere.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "Black Americans 3.73x more likely to be arrested (ACLU 2020)",
                  "8 million cannabis arrests 2001–2018",
                  "1 arrest every 48 seconds in 2018",
                  "Only 2% of cannabis business owners are Black",
                  "Black men sentenced 19.1% longer for same offenses",
                  "40+ states now have some expungement provisions",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/learn/history" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to History</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
