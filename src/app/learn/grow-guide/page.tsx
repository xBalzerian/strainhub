import { redirect } from "next/navigation";
export const metadata = {
  title: "Cannabis Grow Guide — Week by Week Growing | StrainHub",
  description: "Complete cannabis growing guide covering germination, vegetative, flowering, and harvest stages. Expert tips for indoor and outdoor grows.",
  keywords: "cannabis grow guide, how to grow weed, cannabis cultivation, growing marijuana",
  alternates: {
    canonical: "https://strainhub.vercel.app/learn/grow-guide",
  },
  openGraph: {
    title: "Cannabis Grow Guide — Week by Week Growing | StrainHub",
    description: "Complete cannabis growing guide covering germination, vegetative, flowering, and harvest stages. Expert tips for indoor and outdoor grows.",
    url: "https://strainhub.vercel.app/learn/grow-guide",
    type: "article",
  },
};

export default function OldGrowGuidePage() { redirect("/learn/strains/grow-guide"); }
