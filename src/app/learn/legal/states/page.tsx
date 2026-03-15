import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "US State Cannabis Laws: Full Legalization Map | StrainHub Learn",
  description: "Up-to-date guide to US state cannabis laws — recreational, medical, decriminalized, and prohibited states with possession limits and purchase rules.",
};

export default function Page() {
  const states = [
    { name: "Alaska", status: "Recreational", year: 2014, possession: "1 oz", notes: "Home grow: 6 plants" },
    { name: "Arizona", status: "Recreational", year: 2020, possession: "1 oz", notes: "Home grow: 6 plants" },
    { name: "California", status: "Recreational", year: 2016, possession: "1 oz", notes: "Home grow: 6 plants" },
    { name: "Colorado", status: "Recreational", year: 2012, possession: "1 oz", notes: "First legal state; home grow: 6 plants" },
    { name: "Connecticut", status: "Recreational", year: 2021, possession: "1.5 oz", notes: "Home grow: 6 plants (July 2023)" },
    { name: "Delaware", status: "Recreational", year: 2023, possession: "1 oz", notes: "Retail sales began 2024" },
    { name: "Illinois", status: "Recreational", year: 2019, possession: "30g", notes: "Strong equity provisions" },
    { name: "Maine", status: "Recreational", year: 2016, possession: "2.5 oz", notes: "Home grow: 3 mature plants" },
    { name: "Maryland", status: "Recreational", year: 2022, possession: "1.5 oz", notes: "Retail launched 2023" },
    { name: "Massachusetts", status: "Recreational", year: 2016, possession: "1 oz", notes: "Home grow: 6 plants" },
    { name: "Michigan", status: "Recreational", year: 2018, possession: "2.5 oz", notes: "Home grow: 12 plants" },
    { name: "Minnesota", status: "Recreational", year: 2023, possession: "2 oz", notes: "Retail sales 2025" },
    { name: "Missouri", status: "Recreational", year: 2022, possession: "3 oz", notes: "Home grow: 6 plants" },
    { name: "Montana", status: "Recreational", year: 2020, possession: "1 oz", notes: "Home grow: 4 plants" },
    { name: "Nevada", status: "Recreational", year: 2016, possession: "1 oz", notes: "Home grow: 6 plants" },
    { name: "New Jersey", status: "Recreational", year: 2020, possession: "6 oz", notes: "No home grow" },
    { name: "New Mexico", status: "Recreational", year: 2021, possession: "2 oz", notes: "Home grow: 6 plants" },
    { name: "New York", status: "Recreational", year: 2021, possession: "3 oz", notes: "Strong equity; home grow legal" },
    { name: "Ohio", status: "Recreational", year: 2023, possession: "2.5 oz", notes: "Retail launched 2024" },
    { name: "Oregon", status: "Recreational", year: 2014, possession: "1 oz (public)", notes: "8 oz at home; home grow: 4 plants" },
    { name: "Rhode Island", status: "Recreational", year: 2022, possession: "1 oz", notes: "Home grow: 6 plants" },
    { name: "Vermont", status: "Recreational", year: 2018, possession: "1 oz", notes: "Home grow: 6 plants" },
    { name: "Virginia", status: "Recreational", year: 2021, possession: "1 oz", notes: "Home grow: 4 plants" },
    { name: "Washington", status: "Recreational", year: 2012, possession: "1 oz", notes: "No home grow" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/legal" className="hover:text-black">Legal</Link><span>/</span>
          <span className="text-black font-semibold">US State Laws</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fefce8", color: "#854d0e" }}>
            🗺️ Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">US State Cannabis Laws</h1>
          <p className="text-gray-500 text-lg leading-relaxed">24 states have full adult-use legalization. 38 states have medical programs. The patchwork of state laws creates a complex legal landscape — here&apos;s what you need to know in each state.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div className="grid grid-cols-3 gap-4">
          {[{label:"24", sub:"Recreational states"},{label:"38", sub:"Medical states"},{label:"13", sub:"Decrim only / prohibited"}].map(s=>(
            <div key={s.label} className="bg-white border-2 border-black rounded-2xl p-5 text-center">
              <div className="text-4xl font-black text-[#AAFF00]">{s.label}</div>
              <div className="text-xs text-gray-500 mt-1 font-semibold">{s.sub}</div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-black text-black mb-4">Recreational (Adult-Use) States</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left py-3 pr-4 font-black">State</th>
                  <th className="text-left py-3 pr-4 font-black">Year</th>
                  <th className="text-left py-3 pr-4 font-black">Public Possession</th>
                  <th className="text-left py-3 font-black">Notes</th>
                </tr>
              </thead>
              <tbody>
                {states.map((s, i) => (
                  <tr key={s.name} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="py-2.5 pr-4 font-bold">{s.name}</td>
                    <td className="py-2.5 pr-4 text-gray-500">{s.year}</td>
                    <td className="py-2.5 pr-4">{s.possession}</td>
                    <td className="py-2.5 text-gray-500 text-xs">{s.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
          <strong>⚠️ Important:</strong> Laws change frequently. Always verify current laws for your specific state and municipality — some cities have local restrictions stricter than state law. This information is for educational purposes only, not legal advice.
        </div>
        <Link href="/learn/legal" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to Legal</Link>
      </div>
    </div>
  );
}
