"use client";
import { useState, useEffect, useCallback } from "react";

const PRO_KEY = "sh_pro_status";
const VIEWS_KEY = "sh_daily_views";
const CHAT_KEY = "sh_daily_chat";
export const FREE_VIEW_LIMIT = 10;
export const FREE_CHAT_LIMIT = 5;

interface ProStatus {
  isPro: boolean;
  plan: "free" | "monthly" | "annual";
  expiresAt: number | null;
}
interface DailyTracker { count: number; date: string; }

function today() { return new Date().toISOString().split("T")[0]; }

function getTracker(key: string): DailyTracker {
  if (typeof window === "undefined") return { count: 0, date: today() };
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { count: 0, date: today() };
    const parsed: DailyTracker = JSON.parse(raw);
    if (parsed.date !== today()) return { count: 0, date: today() };
    return parsed;
  } catch { return { count: 0, date: today() }; }
}

function setTracker(key: string, count: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify({ count, date: today() }));
}

export function useProStatus() {
  const [proStatus, setProStatus] = useState<ProStatus>({ isPro: false, plan: "free", expiresAt: null });
  const [viewsToday, setViewsToday] = useState(0);
  const [chatsToday, setChatsToday] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PRO_KEY);
      if (raw) {
        const status: ProStatus = JSON.parse(raw);
        if (status.expiresAt && Date.now() > status.expiresAt) {
          localStorage.removeItem(PRO_KEY);
          setProStatus({ isPro: false, plan: "free", expiresAt: null });
        } else {
          setProStatus(status);
        }
      }
    } catch { /**/ }
    setViewsToday(getTracker(VIEWS_KEY).count);
    setChatsToday(getTracker(CHAT_KEY).count);
    setHydrated(true);
  }, []);

  const activatePro = useCallback((plan: "monthly" | "annual") => {
    const days = plan === "annual" ? 365 : 30;
    const status: ProStatus = { isPro: true, plan, expiresAt: Date.now() + days * 86400000 };
    localStorage.setItem(PRO_KEY, JSON.stringify(status));
    setProStatus(status);
  }, []);

  const deactivatePro = useCallback(() => {
    localStorage.removeItem(PRO_KEY);
    setProStatus({ isPro: false, plan: "free", expiresAt: null });
  }, []);

  const trackView = useCallback((): boolean => {
    if (proStatus.isPro) return true;
    const t = getTracker(VIEWS_KEY);
    if (t.count >= FREE_VIEW_LIMIT) return false;
    setTracker(VIEWS_KEY, t.count + 1);
    setViewsToday(t.count + 1);
    return true;
  }, [proStatus.isPro]);

  const trackChat = useCallback((): boolean => {
    if (proStatus.isPro) return true;
    const t = getTracker(CHAT_KEY);
    if (t.count >= FREE_CHAT_LIMIT) return false;
    setTracker(CHAT_KEY, t.count + 1);
    setChatsToday(t.count + 1);
    return true;
  }, [proStatus.isPro]);

  return {
    isPro: proStatus.isPro, plan: proStatus.plan, expiresAt: proStatus.expiresAt, hydrated,
    canView: proStatus.isPro || viewsToday < FREE_VIEW_LIMIT,
    canChat: proStatus.isPro || chatsToday < FREE_CHAT_LIMIT,
    viewsToday, chatsToday,
    viewsRemaining: proStatus.isPro ? Infinity : Math.max(0, FREE_VIEW_LIMIT - viewsToday),
    chatsRemaining: proStatus.isPro ? Infinity : Math.max(0, FREE_CHAT_LIMIT - chatsToday),
    activatePro, deactivatePro, trackView, trackChat,
  };
}
