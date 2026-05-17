"use client";
import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{ h: string; m: string; s: string } | null>(null);

  useEffect(() => {
    // Set launch time = now + 10 hours from first load, stored in localStorage
    const STORAGE_KEY = "strain_launch_ts";
    let launchTs = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (!launchTs || launchTs < Date.now()) {
      launchTs = Date.now() + 10 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, launchTs.toString());
    }

    const tick = () => {
      const diff = Math.max(0, launchTs - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="flex justify-center gap-4 mb-6">
      {[
        { val: timeLeft.h, label: "Hours" },
        { val: timeLeft.m, label: "Mins" },
        { val: timeLeft.s, label: "Secs" },
      ].map((unit) => (
        <div
          key={unit.label}
          className="bg-[#0D0D0D] border border-[#AAFF00]/30 rounded-xl px-5 py-4 min-w-[72px] text-center"
        >
          <div className="text-[#AAFF00] font-mono font-black text-4xl tabular-nums">
            {unit.val}
          </div>
          <div className="text-gray-500 text-xs uppercase tracking-widest mt-1">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
