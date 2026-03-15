import StrainViewGate from "@/components/StrainViewGate";

export default function StrainLayout({ children }: { children: React.ReactNode }) {
  return <StrainViewGate>{children}</StrainViewGate>;
}
