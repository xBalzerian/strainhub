import { redirect } from "next/navigation";
export const metadata = {
  title: "Indica vs Sativa — What's the Real Difference? | StrainHub",
  description: "The definitive guide to indica vs sativa: genetics, effects, plant differences, and why the distinction matters for choosing strains.",
  keywords: "indica vs sativa, difference between indica and sativa, hybrid cannabis",
  alternates: {
    canonical: "https://www.strainhub.org/learn/indica-vs-sativa",
  },
  openGraph: {
    title: "Indica vs Sativa — What's the Real Difference? | StrainHub",
    description: "The definitive guide to indica vs sativa: genetics, effects, plant differences, and why the distinction matters for choosing strains.",
    url: "https://www.strainhub.org/learn/indica-vs-sativa",
    type: "article",
  },
};

export default function OldIndicaSativaPage() { redirect("/learn/strains/indica-vs-sativa"); }
