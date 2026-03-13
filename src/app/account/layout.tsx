import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | StrainHub",
  description: "Manage your StrainHub account, subscription, and activity.",
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
