"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthCodeHandlerInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      router.replace(`/auth/callback?code=${code}`);
    }
  }, [searchParams, router]);

  return null;
}

export default function AuthCodeHandler() {
  return (
    <Suspense fallback={null}>
      <AuthCodeHandlerInner />
    </Suspense>
  );
}
