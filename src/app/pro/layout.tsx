import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StrainHub Pro — Unlimited Strains, AI Chat & Plant Diagnosis",
  description: "Upgrade to StrainHub Pro for $2.99/month. Unlimited strain views, unlimited AI chat, plant photo diagnosis, full cannabinoid data, and ad-free experience.",
  openGraph: {
    title: "StrainHub Pro | Unlimited Cannabis Knowledge",
    description: "Upgrade for $2.99/month — unlimited strains, AI chat, plant diagnosis, and more.",
  },
  alternates: { canonical: "https://www.strainhub.org/pro" },
};

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
