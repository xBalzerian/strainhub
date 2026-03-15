import { redirect } from "next/navigation";
export const metadata = {
  title: "Cannabis Terpenes — Complete Guide to All Terpenes | StrainHub",
  description: "Comprehensive guide to cannabis terpenes: myrcene, limonene, caryophyllene, linalool, pinene and more. Effects, strains, and science.",
  keywords: "cannabis terpenes, myrcene, limonene, caryophyllene, terpene effects",
  alternates: {
    canonical: "https://strainhub.vercel.app/learn/terpenes",
  },
  openGraph: {
    title: "Cannabis Terpenes — Complete Guide to All Terpenes | StrainHub",
    description: "Comprehensive guide to cannabis terpenes: myrcene, limonene, caryophyllene, linalool, pinene and more. Effects, strains, and science.",
    url: "https://strainhub.vercel.app/learn/terpenes",
    type: "article",
  },
};

export default function OldTerpenesPage() { redirect("/learn/effects/terpenes"); }
