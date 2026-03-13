import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — StrainHub",
  description: "StrainHub privacy policy. How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F0] px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Legal</span>
        <h1 className="text-4xl font-black mt-2 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: March 2026</p>
        <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-8 space-y-6 text-gray-600 leading-relaxed text-sm">
          {[
            { title: "Information We Collect", body: "We collect information you provide directly (name, email when signing up), information from OAuth providers (Google profile data), and usage data (pages visited, strains viewed) to improve your experience." },
            { title: "How We Use Your Information", body: "We use your data to provide and improve StrainHub services, personalize recommendations, enforce usage limits on the free tier, process Pro subscriptions, and send optional account notifications." },
            { title: "Data Sharing", body: "We do not sell your personal data. We may share anonymized, aggregated usage data for analytics purposes. Payment processing is handled by PayPal — we do not store your payment details." },
            { title: "Cookies", body: "We use essential cookies for authentication sessions. We do not use third-party advertising cookies. You can disable cookies in your browser but some features may not work." },
            { title: "Your Rights", body: "You may request deletion of your account and associated data at any time by contacting us. You can access and update your profile information from the account page." },
            { title: "Contact", body: "For privacy questions or data requests, use our contact page or email us directly." },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="font-black text-gray-900 mb-2">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
