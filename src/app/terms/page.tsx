import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — StrainHub",
  description: "StrainHub terms of service. Your rights and responsibilities when using our platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F0] px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Legal</span>
        <h1 className="text-4xl font-black mt-2 mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: March 2026</p>
        <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-8 space-y-6 text-gray-600 leading-relaxed text-sm">
          {[
            {
              title: "1. Acceptance of Terms",
              body: "By accessing or using StrainHub, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform. You must be of legal age to view cannabis-related content in your jurisdiction."
            },
            {
              title: "2. Educational Use Only",
              body: "StrainHub provides educational information about cannabis strains for informational purposes only. Nothing on this site constitutes medical advice. Consult a qualified healthcare provider before making any health decisions. Strain effect descriptions reflect user-reported experiences, not medical claims."
            },
            {
              title: "3. User Accounts",
              body: "You are responsible for maintaining the security of your account. You may not share your account or use another person's account. We reserve the right to suspend accounts that violate these terms or engage in abuse of our platform."
            },
            {
              title: "4. Free & Pro Tiers",
              body: "Free accounts are subject to daily usage limits (10 strain views, 5 AI chats per day). Pro subscriptions are billed monthly or annually via PayPal. Subscriptions auto-renew until cancelled. No refunds are issued for partial periods. Cancel anytime through your PayPal account."
            },
            {
              title: "5. User Content",
              body: "By submitting grow photos, reviews, or other content, you grant StrainHub a non-exclusive license to display and distribute that content. You represent that you own the content and it does not violate any third-party rights. We reserve the right to remove content that violates our community guidelines."
            },
            {
              title: "6. Prohibited Conduct",
              body: "You may not: scrape or bulk-download strain data without permission, use the platform for illegal purposes, attempt to circumvent usage limits, upload content you don't own, or impersonate other users or brands."
            },
            {
              title: "7. Disclaimer of Warranties",
              body: "StrainHub is provided 'as is' without warranties of any kind. We do not guarantee the accuracy, completeness, or timeliness of strain data. Genetic lineage and cannabinoid information is sourced from public data and may contain errors."
            },
            {
              title: "8. Limitation of Liability",
              body: "To the maximum extent permitted by law, StrainHub shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform."
            },
            {
              title: "9. Changes to Terms",
              body: "We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of significant changes via email."
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="font-black text-gray-900 mb-2">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-6">
          <Link href="/privacy" className="flex-1 py-3 bg-white border-2 border-black rounded-xl font-bold text-sm text-center hover:bg-lime-pale transition-all">Privacy Policy</Link>
          <Link href="/contact" className="flex-1 py-3 bg-lime border-2 border-black rounded-xl font-bold text-sm text-center border-black shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
