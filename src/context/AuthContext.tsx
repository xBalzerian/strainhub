"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);

// ── Matches ACTUAL DB columns in profiles table ───────────────────────────────
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  plan: "free" | "monthly" | "annual";
  plan_expires_at: string | null;
  paypal_subscription_id?: string | null;
  is_admin?: boolean;
  // usage tracking — exact DB column names
  ai_chats_used: number;
  ai_chats_reset_at: string | null;
  strain_views_today: number;
  strain_views_reset_at: string | null;
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
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  trackView: () => Promise<boolean>;
  trackChat: () => Promise<boolean>;
}

const FREE_VIEW_LIMIT = 10;
const FREE_CHAT_LIMIT = 5;
const todayStr = () => new Date().toISOString().split("T")[0];

// Is the reset_at timestamp from today?
function isToday(isoStr: string | null): boolean {
  if (!isoStr) return false;
  return isoStr.startsWith(todayStr());
}

const AuthContext = createContext<AuthContextType | null>(null);

// Upsert profile — syncs name/avatar, never overwrites usage/plan
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
        ai_chats_used: 0,
        strain_views_today: 0,
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
    (profile.is_admin === true ||
      (profile.plan !== "free" &&
        (!profile.plan_expires_at || new Date(profile.plan_expires_at) > new Date())));

  // ── Usage helpers using actual DB columns ─────────────────────────────────
  const getChatsToday = () => {
    if (!profile) return 0;
    if (!isToday(profile.ai_chats_reset_at)) return 0; // reset at was yesterday → count is stale
    return profile.ai_chats_used || 0;
  };

  const getViewsToday = () => {
    if (!profile) return 0;
    if (!isToday(profile.strain_views_reset_at)) return 0;
    return profile.strain_views_today || 0;
  };

  const canView = isPro || getViewsToday() < FREE_VIEW_LIMIT;
  const canChat = !user ? true : isPro || getChatsToday() < FREE_CHAT_LIMIT;
  const viewsRemaining = isPro ? Infinity : Math.max(0, FREE_VIEW_LIMIT - getViewsToday());
  const chatsRemaining = isPro ? Infinity : !user ? FREE_CHAT_LIMIT : Math.max(0, FREE_CHAT_LIMIT - getChatsToday());

  // ── trackView ─────────────────────────────────────────────────────────────
  const trackView = async (): Promise<boolean> => {
    if (!user) return true;
    const { data: fresh } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (!fresh) return false;
    const isProNow = fresh.is_admin || (fresh.plan !== "free" && (!fresh.plan_expires_at || new Date(fresh.plan_expires_at) > new Date()));
    if (isProNow) { setProfile(fresh as UserProfile); return true; }

    const currentViews = isToday(fresh.strain_views_reset_at) ? (fresh.strain_views_today || 0) : 0;
    if (currentViews >= FREE_VIEW_LIMIT) { setProfile(fresh as UserProfile); return false; }

    const { data } = await supabase
      .from("profiles")
      .update({
        strain_views_today: currentViews + 1,
        strain_views_reset_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();
    if (data) setProfile(data as UserProfile);
    return true;
  };

  // ── trackChat ─────────────────────────────────────────────────────────────
  const trackChat = async (): Promise<boolean> => {
    if (!user) return true; // guests always allowed
    const { data: fresh } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (!fresh) return true; // if profile missing, let them chat (don't block)
    const isProNow = fresh.is_admin || (fresh.plan !== "free" && (!fresh.plan_expires_at || new Date(fresh.plan_expires_at) > new Date()));
    if (isProNow) { setProfile(fresh as UserProfile); return true; }

    const currentChats = isToday(fresh.ai_chats_reset_at) ? (fresh.ai_chats_used || 0) : 0;
    if (currentChats >= FREE_CHAT_LIMIT) { setProfile(fresh as UserProfile); return false; }

    const { data } = await supabase
      .from("profiles")
      .update({
        ai_chats_used: currentChats + 1,
        ai_chats_reset_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();
    if (data) setProfile(data as UserProfile);
    return true;
  };

  // ── Auth methods ──────────────────────────────────────────────────────────
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message || null };
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email, password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error: error?.message || null };
  };

  const signOut = async () => { await supabase.auth.signOut(); };

  return (
    <AuthContext.Provider value={{
      user, session, profile, loading, isPro, canView, canChat,
      viewsRemaining, chatsRemaining,
      signInWithGoogle, signInWithEmail, signUpWithEmail, signOut,
      refreshProfile, trackView, trackChat,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
