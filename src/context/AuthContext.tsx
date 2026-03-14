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
  paypal_subscription_id: string | null;
  // Actual DB columns (from supabase-auth.sql)
  views_today: number;
  views_date: string | null;   // DATE as string "YYYY-MM-DD"
  chats_today: number;
  chats_date: string | null;   // DATE as string "YYYY-MM-DD"
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
  viewsRemaining: number;
  chatsRemaining: number;
  refreshProfile: () => Promise<void>;
  trackView: () => Promise<boolean>;
  trackChat: () => Promise<boolean>;
  signOut: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
}

const FREE_CHAT_LIMIT = 5;
const FREE_VIEW_LIMIT = 10;

const todayStr = () => new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

function isToday(dateStr: string | null): boolean {
  if (!dateStr) return false;
  return dateStr.startsWith(todayStr());
}

const AuthContext = createContext<AuthContextType | null>(null);

// Upsert profile on login — syncs name/avatar, never overwrites usage/plan
async function upsertProfile(user: User) {
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (existing) {
    const { data } = await supabase
      .from("profiles")
      .update({
        email: user.email,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || undefined,
        avatar_url: user.user_metadata?.avatar_url || undefined,
      })
      .eq("id", user.id)
      .select()
      .single();
    return data as UserProfile | null;
  } else {
    const { data } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatar_url: user.user_metadata?.avatar_url || null,
        plan: "free",
        views_today: 0,
        chats_today: 0,
      })
      .select()
      .single();
    return data as UserProfile | null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (u: User) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", u.id)
      .single();

    if (data) {
      setProfile(data as UserProfile);
    } else {
      const created = await upsertProfile(u);
      if (created) setProfile(created);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user);
  }, [user, fetchProfile]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          await upsertProfile(session.user);
        }
        await fetchProfile(session.user);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile !== null || user === null) setLoading(false);
  }, [profile, user]);

  // ── Pro check ──────────────────────────────────────────────────────────────
  const isPro =
    !!profile &&
    profile.plan !== "free" &&
    (!profile.plan_expires_at || new Date(profile.plan_expires_at) > new Date());

  // ── Usage helpers (match actual DB columns) ───────────────────────────────
  const getChatsToday = () => {
    if (!profile) return 0;
    if (!isToday(profile.chats_date)) return 0;
    return profile.chats_today || 0;
  };

  const getViewsToday = () => {
    if (!profile) return 0;
    if (!isToday(profile.views_date)) return 0;
    return profile.views_today || 0;
  };

  const canView = isPro || getViewsToday() < FREE_VIEW_LIMIT;
  const canChat = !user ? true : isPro || getChatsToday() < FREE_CHAT_LIMIT;
  const viewsRemaining = isPro ? Infinity : Math.max(0, FREE_VIEW_LIMIT - getViewsToday());
  const chatsRemaining = isPro ? Infinity : !user ? FREE_CHAT_LIMIT : Math.max(0, FREE_CHAT_LIMIT - getChatsToday());

  // ── trackView ─────────────────────────────────────────────────────────────
  const trackView = useCallback(async (): Promise<boolean> => {
    if (!user || !profile) return true;
    const { data: fresh } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (!fresh) return true;
    const isProNow = fresh.plan !== "free" && (!fresh.plan_expires_at || new Date(fresh.plan_expires_at) > new Date());
    if (isProNow) { setProfile(fresh as UserProfile); return true; }
    const todayViews = isToday(fresh.views_date) ? (fresh.views_today || 0) : 0;
    if (todayViews >= FREE_VIEW_LIMIT) { setProfile(fresh as UserProfile); return false; }
    const { data: updated } = await supabase
      .from("profiles")
      .update({ views_today: todayViews + 1, views_date: todayStr() })
      .eq("id", user.id)
      .select()
      .single();
    if (updated) setProfile(updated as UserProfile);
    return true;
  }, [user, profile]);

  // ── trackChat — NOT called from frontend anymore (server handles limit) ───
  // Kept for compatibility but server-side enforcement is primary
  const trackChat = useCallback(async (): Promise<boolean> => {
    if (!user || !profile) return true;
    const { data: fresh } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (!fresh) return true;
    const isProNow = fresh.plan !== "free" && (!fresh.plan_expires_at || new Date(fresh.plan_expires_at) > new Date());
    if (isProNow) { setProfile(fresh as UserProfile); return true; }
    const todayChats = isToday(fresh.chats_date) ? (fresh.chats_today || 0) : 0;
    if (todayChats >= FREE_CHAT_LIMIT) { setProfile(fresh as UserProfile); return false; }
    const { data: updated } = await supabase
      .from("profiles")
      .update({ chats_today: todayChats + 1, chats_date: todayStr() })
      .eq("id", user.id)
      .select()
      .single();
    if (updated) setProfile(updated as UserProfile);
    return true;
  }, [user, profile]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string, name?: string) => {
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
    return { error };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/account` } });
    return { error };
  }, []);

  return (
    <AuthContext.Provider value={{
      user, session, profile, loading, isPro, canView, canChat,
      viewsRemaining, chatsRemaining,
      refreshProfile, trackView, trackChat, signOut,
      signInWithEmail, signUpWithEmail, signInWithGoogle,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
