import { redirect } from "next/navigation";
export const metadata = {
  title: "Cannabinoids Guide — THC, CBD, CBG, CBN & More | StrainHub",
  description: "Complete guide to cannabis cannabinoids: THC, CBD, CBG, CBN, THCV, and CBC. How they work, what they do, and how they interact.",
  keywords: "cannabinoids, THC, CBD, CBG, CBN, THCV, endocannabinoid system",
  alternates: {
    canonical: "https://www.strainhub.org/learn/cannabinoids",
  },
  openGraph: {
    title: "Cannabinoids Guide — THC, CBD, CBG, CBN & More | StrainHub",
    description: "Complete guide to cannabis cannabinoids: THC, CBD, CBG, CBN, THCV, and CBC. How they work, what they do, and how they interact.",
    url: "https://www.strainhub.org/learn/cannabinoids",
    type: "article",
  },
};

export default function OldCannabinoidsPage() { redirect("/learn/effects/cannabinoids"); }
