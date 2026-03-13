import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F8F0] flex items-center justify-center">
        <div className="text-3xl animate-pulse">🌿</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
