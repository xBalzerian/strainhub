import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Prohibition: The Real History | StrainHub Learn",
  description: "The true story of cannabis prohibition in the US — racism, lobbying, and politics behind the 1937 Marihuana Tax Act and Nixon's War on Drugs.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/history" className="hover:text-black">History</Link><span>/</span>
          <span className="text-black font-semibold">Prohibition</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fff1f2", color: "#be123c" }}>
            ⚖️ History
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Prohibition: The Real History</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Cannabis prohibition was not the product of scientific consensus. It was built on racism, corporate lobbying, and political opportunism — facts that are now thoroughly documented and openly acknowledged by its own architects.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Before Prohibition (pre-1910)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Until the early 20th century, cannabis was a fully legal and widely used medicine in the United States. The US Pharmacopeia listed it from 1850 to 1942. Dozens of pharmaceutical companies — including Squibb, Eli Lilly, and Parke-Davis — sold cannabis tinctures openly in pharmacies as treatments for pain, insomnia, and nervous disorders. Hemp was grown across the country for rope, paper, and textiles. There was no public concern about cannabis and no scientific basis for banning it.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Immigration & the Birth of Anti-Cannabis Sentiment</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">After the Mexican Revolution (1910–1920), hundreds of thousands of Mexican immigrants entered the US Southwest, bringing with them recreational cannabis smoking — then deliberately called &quot;marihuana&quot; to emphasize its foreign origin. Anti-immigration hysteria drove the first state bans: Utah (1915), California (1913), Texas (1919). Newspaper headlines warned of &quot;Mexican marihuana&quot; driving crime waves. The science didn&apos;t support the claims — but the racism made the narrative politically powerful.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Harry Anslinger & the Federal Bureau of Narcotics</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Harry Anslinger, appointed head of the Federal Bureau of Narcotics in 1930, is the single most important architect of cannabis prohibition. His bureau was facing post-Prohibition budget cuts and needed a new target. Anslinger launched a nationwide media campaign portraying cannabis as a violence-inducing drug causing murder, insanity, and sexual deviance — the &quot;reefer madness&quot; narrative. His internal memos and Congressional testimony are filled with racial slurs, explicitly linking cannabis to Black jazz musicians and Mexican immigrants. He told Congress: <em>&quot;Marijuana is the most violence-causing drug in the history of mankind.&quot;</em> No scientific evidence supported this claim.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Marihuana Tax Act (1937)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The 1937 Marihuana Tax Act effectively federally banned cannabis by imposing prohibitive taxes on its transfer. The American Medical Association opposed it — their representative, Dr. William Woodward, testified that the evidence of harm was fabricated and that prohibition would destroy legitimate medicine. Congress ignored him and passed the act in under three minutes of substantive debate. Corporate interests played a role: William Randolph Hearst (whose newspapers had been running Anslinger&apos;s stories for years) owned timber and paper mills threatened by hemp, and Du Pont had just patented nylon — a direct competitor to hemp rope and fabric.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Nixon, the CSA & Schedule I (1970–1971)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">President Nixon&apos;s Controlled Substances Act (1970) placed cannabis as Schedule I — the most restrictive classification, reserved for drugs with &quot;no accepted medical use and high abuse potential.&quot; This directly contradicted Nixon&apos;s own Shafer Commission, which recommended decriminalization after two years of research. Nixon rejected the report without reading it. In 1994, his domestic policy chief John Ehrlichman admitted plainly: <em>&quot;We knew we couldn&apos;t make it illegal to be against the Vietnam War or Black, but by getting the public to associate the hippies with marijuana and Blacks with heroin, we could disrupt those communities, arrest their leaders, and vilify them.&quot;</em></p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "US Pharmacopeia: listed cannabis 1850–1942",
                  "First state ban: Utah 1915",
                  "Federal ban: Marihuana Tax Act 1937",
                  "AMA opposed the 1937 ban",
                  "Schedule I designation: 1970 CSA",
                  "Shafer Commission recommended decrim — Nixon ignored it",
                  "Nixon aide confirmed racial motivation in 1994",
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
