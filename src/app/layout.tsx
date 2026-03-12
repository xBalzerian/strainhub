import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | StrainHub",
    default: "StrainHub — #1 Cannabis Strain Database | Effects, Genetics & Grow Info",
  },
  description: "Explore 100+ cannabis strains with full terpene profiles, effects, genetics, and grow guides. Find the perfect strain — free forever.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://strainhub.com"),
  openGraph: {
    siteName: "StrainHub",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
