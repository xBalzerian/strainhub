"use client";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import PaywallModal from "@/components/PaywallModal";

export default function LearnViewGate({ children }: { children: React.ReactNode }) {
  const { user, isPro, trackLearnView, loading, learnViewsRemaining } = useAuth();
  const [showPaywall, setShowPaywall] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const tracked = useRef(false);

  useEffect(() => {
    tracked.current = false;
    setBlocked(false);
    setShowPaywall(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (tracked.current) return;
    tracked.current = true;

    const check = async () => {
      const ok = await trackLearnView();
      if (!ok) {
        setBlocked(true);
        setShowPaywall(true);
      }
    };
    check();
  }, [loading, trackLearnView]);

  if (blocked) {
    return (
      <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-black text-black mb-2">Daily limit reached</h2>
          <p className="text-gray-500 mb-6">
            {!user
              ? "You've read 10 Learn pages today. Sign up free to keep reading."
              : "Upgrade to Pro for unlimited access to the entire Learn Hub."}
          </p>
          <button
            onClick={() => setShowPaywall(true)}
            className="px-8 py-3.5 bg-[#AAFF00] border-2 border-black font-black rounded-xl hover:shadow-[4px_4px_0px_#000] transition-all"
          >
            {!user ? "Sign Up Free" : "Upgrade to Pro"}
          </button>
        </div>
        {showPaywall && (
          <PaywallModal
            type={!user ? "signup" : "upgrade"}
            onClose={() => setShowPaywall(false)}
          />
        )}
      </div>
    );
  }

  return (
    <>
      {children}
      {!isPro && learnViewsRemaining <= 3 && learnViewsRemaining > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-black text-white rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl border border-gray-700 text-sm whitespace-nowrap">
          <span>📚 <strong>{learnViewsRemaining}</strong> Learn page{learnViewsRemaining !== 1 ? "s" : ""} left today</span>
          <button
            onClick={() => setShowPaywall(true)}
            className="bg-[#AAFF00] text-black font-black px-3 py-1 rounded-lg text-xs hover:bg-yellow-300 transition-all"
          >
            {!user ? "Sign Up" : "Go Pro"}
          </button>
        </div>
      )}
      {showPaywall && (
        <PaywallModal
          type={!user ? "signup" : "upgrade"}
          onClose={() => setShowPaywall(false)}
        />
      )}
    </>
  );
}
