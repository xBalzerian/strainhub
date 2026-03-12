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
      <head>
        {/* Preconnect to Google Fonts — eliminates render-blocking DNS lookup */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* font-display=swap prevents invisible text during load */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <NavBar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
