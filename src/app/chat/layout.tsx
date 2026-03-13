import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StrainBot AI Chat — Cannabis Expert Assistant | StrainHub",
  description: "Chat with StrainBot — our AI cannabis expert. Get personalized strain recommendations, grow help, terpene advice, and more. Free daily chats available.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "StrainBot AI Chat | StrainHub",
    description: "Ask our AI cannabis expert anything about strains, growing, terpenes, and effects.",
  },
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
