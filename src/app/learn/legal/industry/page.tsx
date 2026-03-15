import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Business & Industry Law | StrainHub Learn",
  description: "Licensing, compliance, 280E tax burden, intellectual property, and the key legal frameworks governing cannabis businesses in the US.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/legal" className="hover:text-black">Legal</Link><span>/</span>
          <span className="text-black font-semibold">Industry & Business Law</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fefce8", color: "#854d0e" }}>
            🏢 Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Industry & Business Law</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Operating a cannabis business legally requires navigating a unique minefield of federal tax law, state licensing, zoning, banking restrictions, and compliance requirements that exist nowhere else in American business.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">State Licensing: The Foundation</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Every cannabis business in the US must be licensed by its state — and license types are granular. A typical state framework includes separate licenses for: cultivation (often tiered by canopy size), manufacturing/processing, distribution, retail dispensary, microbusiness, delivery, and testing laboratory. Some states also license event vendors, consumption lounges, and delivery platforms separately. License caps (limiting the total number of licenses issued) are common and controversial — they protect existing operators but create barriers for new entrants, particularly from equity communities. License applications are complex, expensive (often $5,000–$50,000 in fees plus buildout costs), and can take 6–24 months to obtain.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">IRS Section 280E: The Tax Burden</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Section 280E of the Internal Revenue Code was enacted in 1982 to prevent drug traffickers from deducting business expenses. Because cannabis remains federally Schedule I, cannabis businesses cannot deduct normal business expenses — payroll, rent, utilities, marketing, legal fees — from their federal taxable income. Only the cost of goods sold (COGS) is deductible. This means cannabis businesses often pay effective federal tax rates of 40–80% on gross profit — compared to 21% for ordinary C-corporations. A typical dispensary generating $5M in revenue might pay $1.5M in federal taxes where a comparable non-cannabis retailer would pay $300,000. Proposed rescheduling to Schedule III would eliminate 280E, potentially transforming industry profitability overnight.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Banking & Financial Services</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">As detailed in the Federal Law section, most cannabis businesses operate cash-heavy due to banking access limitations. This creates operational, security, and compliance challenges. Workarounds include: state-chartered credit unions (which operate outside federal banking regulation), payment processors using gray-area ACH structures, and point-of-banking systems (PIN debit transactions processed as cash equivalents). The SAFE Banking Act — which would explicitly protect banks serving cannabis businesses — has passed the House seven times without Senate action. Some large banks quietly serve cannabis clients via holding company structures, but officially deny doing so to avoid regulatory scrutiny.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Compliance & Track-and-Trace</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">All legal cannabis must be tracked from seed to sale using state-mandated software — typically Metrc (Marijuana Enforcement Tracking Reporting & Compliance), BioTrackTHC, or LEAF. Every plant, harvest batch, processed product, and retail transaction is logged in real-time. This creates extraordinary compliance burdens: cultivators must tag individual plants, manufacturers must record batch weights to the gram, and retailers must scan every transaction. Compliance failures (discrepancies between physical inventory and software records) can result in license suspension or revocation. Third-party testing by licensed labs is mandatory for all products — typically testing for potency (THC/CBD), terpenes, pesticides, heavy metals, microbials, and residual solvents.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {["Section 280E: no normal deductions = 40–80% effective tax rate","License types: cultivation, processing, distribution, retail","Track-and-trace: seed-to-sale mandatory (Metrc)","Mandatory lab testing: potency, pesticides, microbials","SAFE Banking Act: passed House 7x, stalled Senate","Rescheduling to S-III would eliminate 280E"].map(f=>(
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
