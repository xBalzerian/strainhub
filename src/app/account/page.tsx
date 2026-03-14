"use client";
import { useState, useEffect, useRef, Suspense, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, supabase } from "@/context/AuthContext";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
const MONTHLY_PLAN_ID = process.env.NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID || "";
const ANNUAL_PLAN_ID = process.env.NEXT_PUBLIC_PAYPAL_ANNUAL_PLAN_ID || "";

type Tab = "profile" | "subscription" | "activity";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const todayStr = () => new Date().toISOString().split("T")[0];

function Avatar({ src, name, size = 16 }: { src?: string | null; name?: string | null; size?: number }) {
  const letter = (name || "?")[0].toUpperCase();
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={name || "avatar"} referrerPolicy="no-referrer"
        className={`w-${size} h-${size} rounded-2xl border-2 border-black object-cover`} />
    );
  }
  return (
    <div className={`w-${size} h-${size} rounded-2xl border-2 border-black bg-lime flex items-center justify-center font-black text-2xl text-brand`}>
      {letter}
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: string; label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-brutal-sm flex flex-col gap-1">
      <div className="text-xl">{icon}</div>
      <div className="text-2xl font-black text-brand">{value}</div>
      <div className="text-xs font-black text-gray-700">{label}</div>
      {sub && <div className="text-[10px] text-gray-400">{sub}</div>}
    </div>
  );
}

// ─── Profile Edit Modal ────────────────────────────────────────────────────────
function EditProfileModal({ currentName, onSave, onClose }: {
  currentName: string;
  onSave: (name: string) => Promise<void>;
  onClose: () => void;
}) {
  const [name, setName] = useState(currentName);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!name.trim()) return;
    setSaving(true);
    await onSave(name.trim());
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-6 w-full max-w-sm">
        <div className="font-black text-lg mb-4">Edit Profile</div>
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Display Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="w-full px-4 py-3 border-2 border-black rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-lime mb-5"
          placeholder="Your name"
          autoFocus
        />
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold hover:border-gray-400 transition-all">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving || !name.trim()}
            className="flex-1 py-2.5 bg-lime border-2 border-black rounded-xl text-sm font-black shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all disabled:opacity-50">
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function AccountPageInner() {
  const { user, profile, isPro, signOut, refreshProfile, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [chatSessions, setChatSessions] = useState<{ id: string; preview: string; updated_at: string }[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const paypalRendered = useRef(false);

  const tabParam = searchParams.get("tab") as Tab | null;
  const [tab, setTab] = useState<Tab>(
    tabParam === "subscription" || tabParam === "activity" ? tabParam : "profile"
  );

  useEffect(() => {
    if (tabParam === "subscription" || tabParam === "activity" || tabParam === "profile") {
      setTab(tabParam);
    }
  }, [tabParam]);

  const switchTab = (t: Tab) => {
    setTab(t);
    router.replace(`/account${t !== "profile" ? `?tab=${t}` : ""}`, { scroll: false });
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push("/login?redirect=/account");
  }, [user, loading, router]);

  // Load chat sessions for activity tab
  const loadChatSessions = useCallback(async () => {
    if (!user) return;
    setSessionsLoading(true);
    try {
      const res = await fetch(`/api/chat/sessions?userId=${user.id}`);
      const data = await res.json();
      setChatSessions(data.sessions || []);
    } catch { /**/ }
    setSessionsLoading(false);
  }, [user]);

  useEffect(() => {
    if (tab === "activity" && user) loadChatSessions();
  }, [tab, user, loadChatSessions]);

  // Load PayPal SDK
  useEffect(() => {
    if (!PAYPAL_CLIENT_ID || isPro) return;
    if (typeof window !== "undefined" && (window as Window & { paypal?: unknown }).paypal) {
      setPaypalLoaded(true);
      return;
    }
    const existing = document.querySelector('script[src*="paypal.com/sdk"]');
    if (existing) {
      existing.addEventListener("load", () => setPaypalLoaded(true));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    script.addEventListener("load", () => setPaypalLoaded(true));
    document.body.appendChild(script);
  }, [isPro]);

  // Render PayPal button
  useEffect(() => {
    if (!paypalLoaded || isPro || tab !== "subscription" || subSuccess) return;
    if (paypalRendered.current) return;
    const container = document.getElementById("account-paypal-btn");
    if (!container) return;
    container.innerHTML = "";
    paypalRendered.current = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paypal = (window as Window & { paypal?: any }).paypal;
    if (!paypal) return;

    paypal.Buttons({
      style: { shape: "rect", color: "black", layout: "vertical", label: "subscribe" },
      createSubscription: (_data: unknown, actions: { subscription: { create: (a: { plan_id: string }) => Promise<string> } }) =>
        actions.subscription.create({ plan_id: billing === "annual" ? ANNUAL_PLAN_ID : MONTHLY_PLAN_ID }),
      onApprove: async (data: { subscriptionID: string }) => {
        setUpgrading(true);
        await fetch("/api/subscription/activate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subscriptionId: data.subscriptionID, plan: billing, userId: user?.id }),
        });
        await refreshProfile();
        setSubSuccess(true);
        setUpgrading(false);
      },
    }).render("#account-paypal-btn");
  }, [paypalLoaded, isPro, tab, billing, user?.id, refreshProfile, subSuccess]);

  useEffect(() => { paypalRendered.current = false; }, [billing]);

  // Save display name
  async function handleSaveName(newName: string) {
    if (!user) return;
    await supabase.from("profiles").update({ full_name: newName }).eq("id", user.id);
    await refreshProfile();
  }

  // Handle sign out
  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    router.push("/");
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="text-4xl animate-bounce">🌿</div>
          <div className="text-sm font-bold text-gray-400 animate-pulse">Loading your account…</div>
        </div>
      </div>
    );
  }
  if (!user) return null;

  const safeProfile = profile ?? {
    id: user.id,
    email: user.email ?? "",
    full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
    avatar_url: user.user_metadata?.avatar_url || null,
    plan: "free" as const,
    plan_expires_at: null,
    ai_chats_used: 0,
    ai_chats_reset_at: null,
    strain_views_today: 0,
    strain_views_reset_at: null,
    created_at: user.created_at ?? new Date().toISOString(),
  };

  const displayName = safeProfile.full_name || safeProfile.email.split("@")[0] || "User";
  const planLabel = isPro
    ? safeProfile.plan === "annual" ? "Pro Annual" : "Pro Monthly"
    : "Free";
  const planExpiry = safeProfile.plan_expires_at
    ? new Date(safeProfile.plan_expires_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  const viewsToday = safeProfile.strain_views_reset_at?.startsWith(todayStr()) ? (safeProfile.strain_views_today || 0) : 0;
  const chatsToday = safeProfile.ai_chats_reset_at?.startsWith(todayStr()) ? (safeProfile.ai_chats_used || 0) : 0;
  const memberSince = new Date(safeProfile.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const daysOnPlatform = Math.floor((Date.now() - new Date(safeProfile.created_at).getTime()) / 86400000);

  return (
    <>
      {showEditModal && (
        <EditProfileModal
          currentName={safeProfile.full_name || ""}
          onSave={handleSaveName}
          onClose={() => setShowEditModal(false)}
        />
      )}

      <div className="min-h-screen bg-[#F8F8F0]">
        {/* ── Hero header ── */}
        <div className="bg-white border-b-2 border-black">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl border-2 border-black overflow-hidden bg-lime flex items-center justify-center">
                  {(safeProfile.avatar_url || user?.user_metadata?.avatar_url) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={safeProfile.avatar_url || user?.user_metadata?.avatar_url}
                      alt={displayName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-black text-brand">{displayName[0].toUpperCase()}</span>
                  )}
                </div>
                {isPro && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-lime border-2 border-black rounded-full flex items-center justify-center text-xs">✨</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-black truncate">{displayName}</h1>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
                    isPro ? "bg-lime border-black text-brand" : "bg-gray-100 border-gray-200 text-gray-500"
                  }`}>
                    {isPro ? "✨ Pro" : "Free"}
                  </span>
                </div>
                <div className="text-sm text-gray-400 mt-0.5 truncate">{safeProfile.email}</div>
                <div className="text-xs text-gray-400 mt-1">Member since {memberSince}</div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="text-xs font-bold px-3 py-2 border-2 border-black rounded-xl hover:bg-lime-pale transition-all whitespace-nowrap"
                >
                  ✏️ Edit Name
                </button>
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="text-xs font-bold px-3 py-2 border-2 border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-200 transition-all whitespace-nowrap disabled:opacity-50"
                >
                  {signingOut ? "Signing out…" : "Sign Out"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-3xl mx-auto px-4 py-8">

          {/* ── Tabs ── */}
          <div className="flex gap-1 bg-white border-2 border-black rounded-2xl p-1 mb-6 shadow-brutal-sm">
            {([
              { id: "profile", label: "👤 Profile" },
              { id: "subscription", label: isPro ? "✨ Pro Plan" : "⭐ Upgrade" },
              { id: "activity", label: "📊 Activity" },
            ] as { id: Tab; label: string }[]).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => switchTab(id)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  tab === id ? "bg-lime border-2 border-black shadow-brutal-sm" : "text-gray-400 hover:text-brand"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ══════════ TAB: PROFILE ══════════ */}
          {tab === "profile" && (
            <div className="space-y-4">
              {/* Account Details */}
              <div className="bg-white border-2 border-black rounded-3xl shadow-brutal-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-black text-lg">Account Details</h2>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="text-xs font-bold text-brand hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Display Name</label>
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                      <span className="text-sm font-medium">{safeProfile.full_name || "Not set"}</span>
                      {!safeProfile.full_name && (
                        <button onClick={() => setShowEditModal(true)} className="text-xs text-brand font-bold hover:underline">Add name</button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Email Address</label>
                    <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-medium flex items-center gap-2">
                      <span>{safeProfile.email}</span>
                      <span className="ml-auto text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Verified</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Account Plan</label>
                    <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl flex items-center justify-between">
                      <span className="text-sm font-bold">{planLabel}</span>
                      {!isPro && (
                        <button onClick={() => switchTab("subscription")} className="text-xs text-brand font-black hover:underline">Upgrade →</button>
                      )}
                      {isPro && planExpiry && (
                        <span className="text-xs text-gray-400">Renews {planExpiry}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Member Since</label>
                    <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-medium">
                      {memberSince} <span className="text-gray-400 text-xs">({daysOnPlatform} days)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border-2 border-black rounded-3xl shadow-brutal-sm p-6">
                <h2 className="font-black text-base mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/strains"
                    className="flex flex-col items-center gap-2 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl font-bold text-sm text-center hover:border-black hover:bg-lime-pale transition-all">
                    <span className="text-2xl">🌿</span>
                    Browse Strains
                  </Link>
                  <Link href="/chat"
                    className="flex flex-col items-center gap-2 py-4 bg-lime border-2 border-black rounded-2xl font-bold text-sm text-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
                    <span className="text-2xl">💬</span>
                    AI Chat
                  </Link>
                  <Link href="/diagnose"
                    className="flex flex-col items-center gap-2 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl font-bold text-sm text-center hover:border-black hover:bg-lime-pale transition-all">
                    <span className="text-2xl">🔬</span>
                    Plant Diagnose
                  </Link>
                  <Link href="/learn"
                    className="flex flex-col items-center gap-2 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl font-bold text-sm text-center hover:border-black hover:bg-lime-pale transition-all">
                    <span className="text-2xl">📚</span>
                    Learn Hub
                  </Link>
                </div>
              </div>

              {/* Upgrade nudge if free */}
              {!isPro && (
                <div className="bg-lime border-2 border-black rounded-3xl shadow-brutal p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-black text-base">Unlock Everything</div>
                    <div className="text-sm font-medium mt-0.5">Unlimited views, AI chat, plant diagnosis & more</div>
                    <div className="text-xs font-bold text-gray-700 mt-1">From $2.99/month · Cancel anytime</div>
                  </div>
                  <button
                    onClick={() => switchTab("subscription")}
                    className="flex-shrink-0 px-5 py-2.5 bg-black text-lime font-black text-sm rounded-xl hover:opacity-90 transition-all shadow-brutal-sm whitespace-nowrap"
                  >
                    Go Pro →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══════════ TAB: SUBSCRIPTION ══════════ */}
          {tab === "subscription" && (
            <div className="space-y-4">
              {isPro ? (
                /* Already Pro */
                <div className="space-y-4">
                  <div className="bg-white border-2 border-black rounded-3xl shadow-brutal-sm p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 bg-lime border-2 border-black rounded-2xl flex items-center justify-center text-xl">✨</div>
                      <div>
                        <div className="font-black text-lg">StrainHub Pro</div>
                        <div className="text-sm text-gray-400">
                          {safeProfile.plan === "annual" ? "Annual Plan · $9.99/year" : "Monthly Plan · $2.99/month"}
                        </div>
                      </div>
                      <div className="ml-auto">
                        <span className="text-xs font-black bg-lime border-2 border-black px-3 py-1 rounded-full">Active ✓</span>
                      </div>
                    </div>

                    {planExpiry && (
                      <div className="bg-lime-pale border-2 border-black rounded-2xl px-4 py-3 mb-5 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-black uppercase tracking-widest text-gray-500">Next Renewal</div>
                          <div className="font-black text-brand">{planExpiry}</div>
                        </div>
                        <span className="text-2xl">🔄</span>
                      </div>
                    )}

                    <div className="space-y-2.5">
                      {[
                        ["🔓", "Unlimited strain views"],
                        ["🤖", "Unlimited AI chat with StrainBot"],
                        ["🔬", "Plant diagnosis — upload any photo"],
                        ["🧬", "Full cannabinoid data (CBN, CBG, THCV)"],
                        ["🚫", "Completely ad-free"],
                        ["⚡", "Early access to new features"],
                      ].map(([icon, text]) => (
                        <div key={text} className="flex items-center gap-2.5 text-sm font-medium">
                          <span>{icon}</span>
                          <span>{text}</span>
                          <span className="ml-auto text-green-500 font-black text-xs">✓</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 text-center">
                    <p className="text-sm text-gray-500 mb-2">Need to cancel? Manage your subscription directly in PayPal.</p>
                    <a
                      href="https://www.paypal.com/myaccount/autopay"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-brand underline hover:text-lime-700"
                    >
                      Manage on PayPal →
                    </a>
                  </div>
                </div>
              ) : subSuccess ? (
                /* Just subscribed */
                <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-10 text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <div className="font-black text-2xl mb-2">Welcome to Pro!</div>
                  <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">All features are now unlocked. Enjoy unlimited access to everything StrainHub has to offer.</p>
                  <div className="flex gap-3 justify-center">
                    <Link href="/chat" className="py-3 px-6 bg-lime border-2 border-black rounded-xl font-black shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
                      💬 Try AI Chat
                    </Link>
                    <Link href="/strains" className="py-3 px-6 bg-white border-2 border-black rounded-xl font-bold hover:bg-lime-pale transition-all">
                      🌿 Browse Strains
                    </Link>
                  </div>
                </div>
              ) : (
                /* Upgrade form */
                <>
                  {/* Current plan */}
                  <div className="bg-white border-2 border-gray-200 rounded-2xl px-5 py-4 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Plan</div>
                      <div className="font-black text-base mt-0.5">Free</div>
                      <div className="text-xs text-gray-400 mt-0.5">10 strain views/day · 5 AI chats/day</div>
                    </div>
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-500">Free</span>
                  </div>

                  {/* Billing toggle */}
                  <div className="bg-white border-2 border-black rounded-2xl p-1.5 flex shadow-brutal-sm">
                    <button
                      onClick={() => setBilling("monthly")}
                      className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${
                        billing === "monthly" ? "bg-lime border-2 border-black shadow-brutal-sm" : "text-gray-400"
                      }`}
                    >
                      Monthly · $2.99
                    </button>
                    <button
                      onClick={() => setBilling("annual")}
                      className={`flex-1 py-3 rounded-xl text-sm font-black transition-all relative ${
                        billing === "annual" ? "bg-lime border-2 border-black shadow-brutal-sm" : "text-gray-400"
                      }`}
                    >
                      Annual · $9.99
                      <span className="absolute -top-3 right-2 bg-black text-lime text-[9px] font-black px-1.5 py-0.5 rounded-full">72% OFF</span>
                    </button>
                  </div>

                  {/* Features list */}
                  <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-brutal-sm">
                    <div className="font-black text-base mb-4">Everything unlocked with Pro:</div>
                    <div className="space-y-3">
                      {[
                        ["🔓", "Unlimited strain views"],
                        ["🤖", "Unlimited AI chat with StrainBot"],
                        ["🔬", "Plant diagnosis — upload any photo"],
                        ["🧬", "Full cannabinoid data (CBN, CBG, THCV)"],
                        ["🚫", "Completely ad-free experience"],
                        ["⚡", "Early access to new features"],
                      ].map(([icon, text]) => (
                        <div key={text} className="flex items-center gap-2.5 text-sm font-medium">
                          <span>{icon}</span>
                          <span>{text}</span>
                          <span className="ml-auto text-green-500 font-black">✓</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-brutal-sm">
                    <div className="font-black text-lg mb-0.5">
                      {billing === "monthly" ? "$2.99 / month" : "$9.99 / year"}
                    </div>
                    <div className="text-xs text-gray-400 mb-5">
                      {billing === "annual"
                        ? "Billed once per year. That's less than $1/month. Cancel anytime."
                        : "Billed monthly. Cancel anytime from your PayPal account."}
                    </div>

                    {upgrading ? (
                      <div className="text-center py-6">
                        <div className="text-3xl animate-bounce mb-2">🌿</div>
                        <div className="font-bold text-gray-500 animate-pulse">Activating your Pro plan…</div>
                      </div>
                    ) : PAYPAL_CLIENT_ID ? (
                      <div>
                        <div id="account-paypal-btn" className="min-h-[50px]" />
                        {!paypalLoaded && (
                          <div className="text-center text-xs text-gray-400 py-4 animate-pulse">Loading payment options…</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-5 border-2 border-dashed border-gray-200 rounded-2xl">
                        <div className="text-3xl mb-2">💳</div>
                        <div className="text-sm text-gray-400">Payment not configured yet.</div>
                        <Link href="/contact" className="text-sm font-bold text-brand underline mt-1 block">Contact us to upgrade</Link>
                      </div>
                    )}

                    <p className="text-[10px] text-gray-400 text-center mt-4">
                      🔒 Payments secured by PayPal ·{" "}
                      <a href="https://www.paypal.com/myaccount/autopay" target="_blank" rel="noopener noreferrer" className="underline">
                        Cancel anytime in PayPal
                      </a>
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ══════════ TAB: ACTIVITY ══════════ */}
          {tab === "activity" && (
            <div className="space-y-4">

              {/* Usage stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard icon="👁️" label="Views Today" value={isPro ? "∞" : viewsToday}
                  sub={isPro ? "Unlimited" : `of 10 free`} />
                <StatCard icon="💬" label="AI Chats Today" value={isPro ? "∞" : chatsToday}
                  sub={isPro ? "Unlimited" : `of 5 free`} />
                <StatCard icon="📅" label="Days Active" value={daysOnPlatform} sub="Since joining" />
                <StatCard icon="💾" label="Chat Sessions" value={chatSessions.length} sub="Total saved" />
              </div>

              {/* Usage bar (free users only) */}
              {!isPro && (
                <div className="bg-white border-2 border-black rounded-3xl shadow-brutal-sm p-6">
                  <h3 className="font-black text-base mb-4">Today&apos;s Usage</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span>Strain Views</span>
                        <span>{viewsToday} / 10</span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full border border-gray-200 overflow-hidden">
                        <div className="h-full bg-lime rounded-full transition-all"
                          style={{ width: `${Math.min(100, (viewsToday / 10) * 100)}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span>AI Chats</span>
                        <span>{chatsToday} / 5</span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full border border-gray-200 overflow-hidden">
                        <div className="h-full bg-lime rounded-full transition-all"
                          style={{ width: `${Math.min(100, (chatsToday / 5) * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <button onClick={() => switchTab("subscription")}
                      className="text-xs font-black text-brand hover:underline">
                      Upgrade to Pro for unlimited →
                    </button>
                  </div>
                </div>
              )}

              {/* Chat history */}
              <div className="bg-white border-2 border-black rounded-3xl shadow-brutal-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-base">Recent Chat Sessions</h3>
                  <Link href="/chat" className="text-xs font-black text-brand hover:underline">Open Chat →</Link>
                </div>

                {sessionsLoading ? (
                  <div className="text-center py-8 text-gray-400 text-sm animate-pulse">Loading sessions…</div>
                ) : chatSessions.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-3xl mb-2">💬</div>
                    <div className="text-sm text-gray-400 mb-3">No chat sessions yet.</div>
                    <Link href="/chat"
                      className="inline-block text-sm font-black bg-lime border-2 border-black px-4 py-2 rounded-xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
                      Start Chatting
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {chatSessions.slice(0, 8).map((s) => (
                      <Link key={s.id} href="/chat"
                        className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-2 border-transparent hover:border-black hover:bg-lime-pale rounded-2xl transition-all group">
                        <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center text-sm flex-shrink-0 group-hover:border-black transition-all">
                          💬
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold truncate">{s.preview || "Chat session"}</div>
                          <div className="text-[10px] text-gray-400">
                            {new Date(s.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                        <span className="text-gray-300 group-hover:text-brand text-lg transition-all">→</span>
                      </Link>
                    ))}
                    {chatSessions.length > 8 && (
                      <Link href="/chat" className="block text-center text-xs font-bold text-gray-400 hover:text-brand py-2 transition-all">
                        View all {chatSessions.length} sessions →
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Account created banner */}
              <div className="bg-white border-2 border-black rounded-3xl shadow-brutal-sm p-5 flex items-center gap-4">
                <div className="text-3xl">🌱</div>
                <div>
                  <div className="font-black text-sm">Growing with StrainHub</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    You&apos;ve been part of the community for <strong>{daysOnPlatform} day{daysOnPlatform !== 1 ? "s" : ""}</strong>.
                    {daysOnPlatform > 0 && " Keep exploring!"}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F8F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="text-4xl animate-bounce">🌿</div>
          <div className="text-sm font-bold text-gray-400">Loading…</div>
        </div>
      </div>
    }>
      <AccountPageInner />
    </Suspense>
  );
}
