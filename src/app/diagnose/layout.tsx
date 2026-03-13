import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cannabis Plant Diagnosis Tool — Identify Pests & Deficiencies | StrainHub",
  description: "Upload a photo of your cannabis plant and get an AI-powered diagnosis. Identify nutrient deficiencies, pests, mold, and stress with treatment recommendations.",
  keywords: ["cannabis plant diagnosis", "marijuana plant problems", "cannabis yellow leaves", "cannabis deficiency", "cannabis pests", "grow help"],
  openGraph: {
    title: "Cannabis Plant Diagnosis AI | StrainHub",
    description: "Upload a photo and get AI-powered diagnosis of cannabis plant problems — deficiencies, pests, and more.",
  },
  alternates: { canonical: "https://strainhub.vercel.app/diagnose" },
};

export default function DiagnoseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
