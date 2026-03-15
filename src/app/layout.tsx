import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AuthCodeHandler from "@/components/AuthCodeHandler";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

const GA_ID = "G-JDYK0CE3K1";

export const metadata: Metadata = {
  title: {
    template: "%s | StrainHub",
    default: "StrainHub — #1 Cannabis Strain Database | Effects, Genetics & Grow Info",
  },
  description:
    "Explore 70,000+ cannabis strains with full terpene profiles, cannabinoid data, genetics, grow guides, and effects. The most comprehensive marijuana strain database — free forever.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.strainhub.org"),
  keywords: [
    "cannabis strains", "marijuana strains", "weed strains", "strain database",
    "terpene profiles", "THC content", "CBD strains", "indica sativa hybrid",
    "cannabis effects", "grow guide", "cannabis genetics"
  ],
  authors: [{ name: "StrainHub" }],
  creator: "StrainHub",
  publisher: "StrainHub",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    siteName: "StrainHub",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StrainHub — Cannabis Strain Database",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@strainhub",
    creator: "@strainhub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "q6kR4ix85Ga97vVPHmQA1KTNsTu_JdP80k4RpJJVu8U",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://www.strainhub.org",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Canonical domain */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://www.strainhub.org"} />
        {/* Preconnect for faster Supabase loads */}
        <link rel="preconnect" href="https://bfzcjunuuxzhqafuljlh.supabase.co" />
        {/* Preconnect to Google Analytics */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className="min-h-screen flex flex-col antialiased font-sans">
        {/* Google Analytics — loads after page is interactive */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
            });
          `}
        </Script>

        <AuthProvider>
          <AuthCodeHandler />
          <NavBar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
