"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  plan: "free" | "monthly" | "annual";
  plan_expires_at: string | null;
  paypal_subscription_id?: string | null;
  strain_views_today: number;
  strain_views_reset_at: string | null;
  ai_chats_used: number;
  ai_chats_reset_at: string | null;
  diagnose_today: number;
  diagnose_date: string | null;
  learn_views_today: number;
  learn_views_date: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  isPro: boolean;
  canView: boolean;
  canChat: boolean;
  canDiagnose: boolean;
  canLearn: boolean;
  viewsRemaining: number;
  chatsRemaining: number;
  diagnoseRemaining: number;
  learnViewsRemaining: number;
  refreshProfile: () => Promise<void>;
  trackView: () => Promise<boolean>;
  trackChat: () => Promise<boolean>;
  trackDiagnose: () => Promise<boolean>;
  trackLearnView: () => Promise<boolean>;
  signOut: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
}

export const FREE_CHAT_LIMIT = 5;
export const FREE_VIEW_LIMIT = 10;
export const FREE_DIAGNOSE_LIMIT = 1;
export const FREE_LEARN_LIMIT = 10;
// Guest (not logged in) limits before signup wall
export const GUEST_VIEW_LIMIT = 10;
export const GUEST_LEARN_LIMIT = 10;

const todayStr = () => new Date().toISOString().split("T")[0];
function isToday(dateStr: string | null): boolean {
  if (!dateStr) return false;
  return dateStr.startsWith(todayStr());
}

const AuthContext = createContext<AuthContextType | null>(null);

async function upsertProfile(user: User) {
  const { data: existing } = await supabase.from("profiles").select("id").eq("id", user.id).single();
  if (existing) {
    const { data } = await supabase.from("profiles")
      .update({ email: user.email, full_name: user.user_metadata?.full_name || user.user_metadata?.name || undefined, avatar_url: user.user_metadata?.avatar_url || undefined })
      .eq("id", user.id).select().single();
    return data as UserProfile | null;
  } else {
    const { data } = await supabase.from("profiles")
      .insert({ id: user.id, email: user.email, full_name: user.user_metadata?.full_name || user.user_metadata?.name || null, avatar_url: user.user_metadata?.avatar_url || null, plan: "free", strain_views_today: 0, ai_chats_used: 0, diagnose_today: 0, learn_views_today: 0 })
      .select().single();
    return data as UserProfile | null;
  }
}

// ── Guest session tracking (localStorage) ────────────────────────────────────
const GUEST_KEY = "sh_guest";
function getGuestData(): { views: number; learn: number; date: string } {
  if (typeof window === "undefined") return { views: 0, learn: 0, date: todayStr() };
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    if (!raw) return { views: 0, learn: 0, date: todayStr() };
    const parsed = JSON.parse(raw);
    if (parsed.date !== todayStr()) return { views: 0, learn: 0, date: todayStr() };
    return parsed;
  } catch { return { views: 0, learn: 0, date: todayStr() }; }
}
function setGuestData(data: { views: number; learn: number; date: string }) {
  if (typeof window === "undefined") return;
  localStorage.setItem(GUEST_KEY, JSON.stringify(data));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [guestData, setGuestDataState] = useState<{ views: number; learn: number; date: string }>({ views: 0, learn: 0, date: todayStr() });

  useEffect(() => { setGuestDataState(getGuestData()); }, []);

  const fetchProfile = useCallback(async (u: User) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", u.id).single();
    if (data) setProfile(data as UserProfile);
    else { const created = await upsertProfile(u); if (created) setProfile(created); }
  }, []);

  const refreshProfile = useCallback(async () => { if (user) await fetchProfile(user); }, [user, fetchProfile]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user); else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session); setUser(session?.user ?? null);
      if (session?.user) { if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") await upsertProfile(session.user); await fetchProfile(session.user); }
      else { setProfile(null); setLoading(false); }
    });
    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  useEffect(() => { if (profile !== null || user === null) setLoading(false); }, [profile, user]);

  const isPro = !!profile && profile.plan !== "free" && (!profile.plan_expires_at || new Date(profile.plan_expires_at) > new Date());

  // ── Usage getters ──────────────────────────────────────────────────────────
  const getViewsToday = () => { if (!profile) return guestData.views; if (!isToday(profile.strain_views_reset_at)) return 0; return profile.strain_views_today || 0; };
  const getChatsToday = () => { if (!profile) return 0; if (!isToday(profile.ai_chats_reset_at)) return 0; return profile.ai_chats_used || 0; };
  const getDiagnoseToday = () => { if (!profile) return 0; if (!isToday(profile.diagnose_date)) return 0; return profile.diagnose_today || 0; };
  const getLearnToday = () => { if (!profile) return guestData.learn; if (!isToday(profile.learn_views_date)) return 0; return profile.learn_views_today || 0; };

  const GUEST_LIMIT = !user ? GUEST_VIEW_LIMIT : FREE_VIEW_LIMIT;
  const GUEST_LEARN = !user ? GUEST_LEARN_LIMIT : FREE_LEARN_LIMIT;

  const canView = isPro || getViewsToday() < GUEST_LIMIT;
  const canChat = isPro || (!user ? true : getChatsToday() < FREE_CHAT_LIMIT);
  const canDiagnose = isPro || (!user ? false : getDiagnoseToday() < FREE_DIAGNOSE_LIMIT);
  const canLearn = isPro || getLearnToday() < GUEST_LEARN;

  const viewsRemaining = isPro ? Infinity : Math.max(0, GUEST_LIMIT - getViewsToday());
  const chatsRemaining = isPro ? Infinity : !user ? FREE_CHAT_LIMIT : Math.max(0, FREE_CHAT_LIMIT - getChatsToday());
  const diagnoseRemaining = isPro ? Infinity : !user ? 0 : Math.max(0, FREE_DIAGNOSE_LIMIT - getDiagnoseToday());
  const learnViewsRemaining = isPro ? Infinity : Math.max(0, GUEST_LEARN - getLearnToday());

  // ── trackView ──────────────────────────────────────────────────────────────
  const trackView = useCallback(async (): Promise<boolean> => {
    if (isPro) return true;
    if (!user) {
      const g = getGuestData();
      if (g.views >= GUEST_VIEW_LIMIT) return false;
      const updated = { ...g, views: g.views + 1, date: todayStr() };
      setGuestData(updated); setGuestDataState(updated); return true;
    }
    const { data: fresh } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (!fresh) return true;
    const isProNow = fresh.plan !== "free" && (!fresh.plan_expires_at || new Date(fresh.plan_expires_at) > new Date());
    if (isProNow) { setProfile(fresh as UserProfile); return true; }
    const todayViews = isToday(fresh.strain_views_reset_at) ? (fresh.strain_views_today || 0) : 0;
    if (todayViews >= FREE_VIEW_LIMIT) { setProfile(fresh as UserProfile); return false; }
    const { data: updated } = await supabase.from("profiles").update({ strain_views_today: todayViews + 1, strain_views_reset_at: new Date().toISOString() }).eq("id", user.id).select().single();
    if (updated) setProfile(updated as UserProfile);
    return true;
  }, [user, isPro]);

  // ── trackChat ──────────────────────────────────────────────────────────────
  const trackChat = useCallback(async (): Promise<boolean> => {
    if (isPro || !user) return true;
    const { data: fresh } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (!fresh) return true;
    const isProNow = fresh.plan !== "free" && (!fresh.plan_expires_at || new Date(fresh.plan_expires_at) > new Date());
    if (isProNow) { setProfile(fresh as UserProfile); return true; }
    const todayChats = isToday(fresh.ai_chats_reset_at) ? (fresh.ai_chats_used || 0) : 0;
    if (todayChats >= FREE_CHAT_LIMIT) { setProfile(fresh as UserProfile); return false; }
    const { data: updated } = await supabase.from("profiles").update({ ai_chats_used: todayChats + 1, ai_chats_reset_at: new Date().toISOString() }).eq("id", user.id).select().single();
    if (updated) setProfile(updated as UserProfile);
    return true;
  }, [user, isPro]);

  // ── trackDiagnose ──────────────────────────────────────────────────────────
  const trackDiagnose = useCallback(async (): Promise<boolean> => {
    if (isPro) return true;
    if (!user) return false; // must be logged in to diagnose
    const { data: fresh } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (!fresh) return true;
    const isProNow = fresh.plan !== "free" && (!fresh.plan_expires_at || new Date(fresh.plan_expires_at) > new Date());
    if (isProNow) { setProfile(fresh as UserProfile); return true; }
    const todayDx = isToday(fresh.diagnose_date) ? (fresh.diagnose_today || 0) : 0;
    if (todayDx >= FREE_DIAGNOSE_LIMIT) { setProfile(fresh as UserProfile); return false; }
    const { data: updated } = await supabase.from("profiles").update({ diagnose_today: todayDx + 1, diagnose_date: todayStr() }).eq("id", user.id).select().single();
    if (updated) setProfile(updated as UserProfile);
    return true;
  }, [user, isPro]);

  // ── trackLearnView ─────────────────────────────────────────────────────────
  const trackLearnView = useCallback(async (): Promise<boolean> => {
    if (isPro) return true;
    if (!user) {
      const g = getGuestData();
      if (g.learn >= GUEST_LEARN_LIMIT) return false;
      const updated = { ...g, learn: g.learn + 1, date: todayStr() };
      setGuestData(updated); setGuestDataState(updated); return true;
    }
    const { data: fresh } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (!fresh) return true;
    const isProNow = fresh.plan !== "free" && (!fresh.plan_expires_at || new Date(fresh.plan_expires_at) > new Date());
    if (isProNow) { setProfile(fresh as UserProfile); return true; }
    const todayLearn = isToday(fresh.learn_views_date) ? (fresh.learn_views_today || 0) : 0;
    if (todayLearn >= FREE_LEARN_LIMIT) { setProfile(fresh as UserProfile); return false; }
    const { data: updated } = await supabase.from("profiles").update({ learn_views_today: todayLearn + 1, learn_views_date: todayStr() }).eq("id", user.id).select().single();
    if (updated) setProfile(updated as UserProfile);
    return true;
  }, [user, isPro]);

  const signOut = useCallback(async () => { await supabase.auth.signOut(); }, []);
  const signInWithEmail = useCallback(async (email: string, password: string) => { const { error } = await supabase.auth.signInWithPassword({ email, password }); return { error }; }, []);
  const signUpWithEmail = useCallback(async (email: string, password: string, name?: string) => { const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } }); return { error }; }, []);
  const signInWithGoogle = useCallback(async () => { const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/account` } }); return { error }; }, []);

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, isPro, canView, canChat, canDiagnose, canLearn, viewsRemaining, chatsRemaining, diagnoseRemaining, learnViewsRemaining, refreshProfile, trackView, trackChat, trackDiagnose, trackLearnView, signOut, signInWithEmail, signUpWithEmail, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
