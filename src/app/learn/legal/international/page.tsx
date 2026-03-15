import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "International Cannabis Laws: Country-by-Country Guide | StrainHub Learn",
  description: "Cannabis laws around the world — full legalization in Canada, Uruguay, Germany, medical-only countries, and where it remains strictly prohibited.",
};

export default function Page() {
  const countries = [
    { country: "Canada", status: "Full Legal", since: "2018", notes: "First G7 nation. Federal Cannabis Act. 30g public possession." },
    { country: "Uruguay", status: "Full Legal", since: "2013", notes: "First country to fully legalize. Government controlled. Citizens only." },
    { country: "Germany", status: "Full Legal", since: "2024", notes: "Adults 18+, 25g public, 50g home, home grow 3 plants. No commercial sales yet." },
    { country: "Malta", status: "Full Legal", since: "2021", notes: "First EU nation. 7g public, home grow 4 plants. No commercial dispensaries." },
    { country: "Luxembourg", status: "Full Legal", since: "2023", notes: "Home grow only. No commercial sales. Age 18+." },
    { country: "Netherlands", status: "Decrim/Tolerated", since: "1976", notes: "Coffeeshops legal in practice. Cultivation still illegal." },
    { country: "Portugal", status: "Decriminalized", since: "2001", notes: "All drugs decriminalized (not legal). Up to 10-day supply for personal use." },
    { country: "Switzerland", status: "Decriminalized", since: "2012", notes: "Under 10g decriminalized. Pilot regulated sales program launched 2023." },
    { country: "Czech Republic", status: "Decriminalized", since: "2010", notes: "Up to 10g. Medical legal since 2013." },
    { country: "Spain", status: "Decriminalized", since: "1992", notes: "Private use/grow legal. Cannabis clubs operate in gray area." },
    { country: "Israel", status: "Medical", since: "1992", notes: "Medical since 1992; decrim for personal use 2017. Major research hub." },
    { country: "Australia", status: "Medical", since: "2016", notes: "Federal medical legal. ACT territory decrim for personal use." },
    { country: "New Zealand", status: "Medical", since: "2020", notes: "Medical legal. Recreational referendum 2020 narrowly failed (53.4% no)." },
    { country: "Thailand", status: "Partial", since: "2022", notes: "Removed from narcotics list 2022 then partially reversed 2024. Evolving." },
    { country: "United Kingdom", status: "Medical Only", since: "2018", notes: "Medical via specialist prescription only. Recreational Class B, 5yr max." },
    { country: "Japan", status: "Prohibited", since: "1948", notes: "Zero tolerance. Possession = up to 5 years. Very strictly enforced." },
    { country: "Singapore", status: "Prohibited", since: "1973", notes: "Among strictest globally. Trafficking can carry death penalty." },
    { country: "UAE", status: "Prohibited", since: "—", notes: "Zero tolerance. Possession = 4+ years minimum. Foreign nationals deported." },
  ];
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/legal" className="hover:text-black">Legal</Link><span>/</span>
          <span className="text-black font-semibold">International Laws</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fefce8", color: "#854d0e" }}>
            🌍 Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">International Cannabis Laws</h1>
          <p className="text-gray-500 text-lg leading-relaxed">From full federal legalization in Canada to the death penalty in Singapore — cannabis laws vary more dramatically than almost any other substance globally. Know before you travel.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 pr-4 font-black">Country</th>
                <th className="text-left py-3 pr-4 font-black">Status</th>
                <th className="text-left py-3 pr-4 font-black">Since</th>
                <th className="text-left py-3 font-black">Notes</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((c, i) => {
                const color = c.status === "Full Legal" ? "bg-green-50" : c.status.includes("Decrim") ? "bg-yellow-50" : c.status === "Medical" || c.status === "Medical Only" ? "bg-blue-50" : c.status === "Partial" ? "bg-orange-50" : "bg-red-50";
                return (
                  <tr key={c.country} className={`border-b border-gray-100 ${color}`}>
                    <td className="py-2.5 pr-4 font-bold">{c.country}</td>
                    <td className="py-2.5 pr-4 font-semibold text-xs">{c.status}</td>
                    <td className="py-2.5 pr-4 text-gray-500">{c.since}</td>
                    <td className="py-2.5 text-gray-600 text-xs">{c.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm text-red-800">
          <strong>⚠️ Travel Warning:</strong> Never travel internationally with cannabis. Customs laws are the most strictly enforced, and even trace amounts can result in serious criminal charges in many countries. Singapore, Japan, UAE, and Indonesia carry severe penalties including lengthy prison sentences.
        </div>
        <Link href="/learn/legal" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to Legal</Link>
      </div>
    </div>
  );
}
