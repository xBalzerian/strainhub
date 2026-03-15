import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Long-Term Health Effects of Cannabis | StrainHub Learn",
  description: "An honest, evidence-based review of the long-term health effects of regular cannabis use — respiratory, cognitive, mental health, and dependency risks.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/effects" className="hover:text-black">Effects</Link><span>/</span>
          <span className="text-black font-semibold">Long-Term Health Considerations</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0fdf4", color: "#15803d" }}>
            🏥 Effects
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Long-Term Health Considerations</h1>
          <p className="text-gray-500 text-lg leading-relaxed">An honest look at what long-term, regular cannabis use actually does to the body and mind — based on the best available evidence, not prohibition-era propaganda or legalization-era minimization.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Respiratory Health</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Regular cannabis smoking is associated with chronic bronchitis symptoms — increased mucus production, chronic cough, and more frequent respiratory infections. This is caused by combustion byproducts (tar, particulates, carbon monoxide), not cannabinoids themselves. Importantly, unlike tobacco, cannabis smoking has not been consistently linked to lung cancer in epidemiological studies, likely because cannabinoids have anti-tumor properties that may offset carcinogenic exposure. Vaporization (heating to 170–200°C without combustion) eliminates most combustion toxins and is substantially safer for the respiratory tract. Daily heavy smokers show some spirometry changes (reduced FEV1), which largely recover with cessation.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Cognitive Effects of Heavy Long-Term Use</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The evidence for persistent cognitive effects in adults is nuanced. Studies of heavy, long-term adult users show modest deficits in memory, attention, and processing speed — but most of these differences become statistically insignificant after 72 hours of abstinence, and normalize to population levels after about 28 days. The picture is different for adolescents: heavy use during the period of prefrontal cortical development (roughly ages 14–25) is associated with more lasting effects on memory, IQ, and executive function. A 2012 Dunedin cohort study found IQ loss of ~8 points in those who began heavy use before age 18, persisting even after cessation — though methodological critiques exist. The consensus is: adult use carries minimal long-term cognitive risk; adolescent heavy use carries real risk.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Mental Health: Anxiety, Depression & Psychosis Risk</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The relationship between cannabis and mental health is dose-, age-, and genetics-dependent. For most adult users, moderate use does not cause anxiety disorders or depression — many use cannabis specifically to manage these conditions. However, heavy daily use of high-THC cannabis is associated with increased anxiety and depression symptoms over time. The most concerning finding is the link between high-potency THC use and psychosis. Meta-analyses consistently show that high-potency cannabis (25%+ THC) doubles the risk of psychotic disorder in individuals with genetic predisposition (particularly those carrying the COMT Val/Val genotype or family history of schizophrenia). Cannabis does not cause psychosis in people with no predisposition, but it can accelerate onset in those who are vulnerable by several years.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Cannabis Use Disorder & Dependency</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Approximately 9% of people who try cannabis will develop cannabis use disorder (CUD) — defined as persistent use despite negative consequences. This rises to ~17% for those who start in adolescence and ~50% for daily users. Cannabis is not physically addictive in the way opioids or alcohol are, but psychological dependency is real and can be clinically significant. Withdrawal symptoms (irritability, sleep disruption, appetite loss, anxiety) are real but mild compared to alcohol or opioid withdrawal, typically resolving within 1–2 weeks. Cannabidiol (CBD) shows early promise as a treatment for CUD, with one trial showing significant reduction in use in dependent smokers.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Cardiovascular Effects</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Acute cannabis use transiently increases heart rate by 20–50 bpm and causes vasodilation. In healthy young adults this is well tolerated. In older adults or those with cardiovascular disease, the tachycardia and hemodynamic changes carry more risk. A 2019 study (Journal of the American Heart Association) found daily cannabis users had significantly higher risk of heart attack, stroke, and heart failure compared to non-users — though causality is difficult to establish given confounding factors. The cardiovascular risk profile appears more significant than previously recognized, particularly for older adults and those with pre-existing conditions, and warrants serious consideration. Edibles and non-inhalation methods avoid the rapid cardiovascular peak associated with smoking.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "Smoking → chronic bronchitis; no clear lung cancer link",
                  "Vaporization eliminates most combustion risks",
                  "Adult cognitive effects largely reverse after 28 days abstinence",
                  "Adolescent heavy use linked to lasting IQ & memory effects",
                  "High-THC doubles psychosis risk in predisposed individuals",
                  "~9% of users develop cannabis use disorder",
                  "Withdrawal is real but mild vs. alcohol/opioids",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/learn/effects" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to Effects</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
