"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
const MONTHLY_PLAN_ID = process.env.NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID || "";
const ANNUAL_PLAN_ID = process.env.NEXT_PUBLIC_PAYPAL_ANNUAL_PLAN_ID || "";

type Tab = "profile" | "subscription" | "activity";

function AccountPageInner() {
  const { user, profile, isPro, signOut, refreshProfile, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);
  const [profileTimeout, setProfileTimeout] = useState(false);
  const paypalRendered = useRef(false);
  const paypalContainerRef = useRef<HTMLDivElement>(null);

  // Read tab from URL — default "profile"
  const tabParam = searchParams.get("tab") as Tab | null;
  const [tab, setTab] = useState<Tab>(
    tabParam === "subscription" || tabParam === "activity" ? tabParam : "profile"
  );

  // Sync tab if URL param changes (e.g. navigating from dropdown)
  useEffect(() => {
    if (tabParam === "subscription" || tabParam === "activity" || tabParam === "profile") {
      setTab(tabParam);
    }
  }, [tabParam]);

  // Update URL when tab changes (so back button works + links work)
  const switchTab = (t: Tab) => {
    setTab(t);
    router.replace(`/account${t !== "profile" ? `?tab=${t}` : ""}`, { scroll: false });
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push("/login?redirect=/account");
  }, [user, loading, router]);

  // Profile timeout fallback
  useEffect(() => {
    if (user && !profile) {
      const t = setTimeout(() => setProfileTimeout(true), 5000);
      return () => clearTimeout(t);
    }
  }, [user, profile]);

  // Load PayPal SDK
  useEffect(() => {
    if (!PAYPAL_CLIENT_ID || isPro) return;
    if (typeof window !== "undefined" && window.paypal) {
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

    window.paypal.Buttons({
      style: { shape: "pill", color: "gold", layout: "vertical", label: "subscribe" },
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

  // Re-render PayPal when billing toggle changes
  useEffect(() => {
    paypalRendered.current = false;
  }, [billing]);

  // Loading state
  if (loading || (!user && !profileTimeout)) {
    return (
      <div className="min-h-screen bg-[#F8F8F0] flex items-center justify-center">
        <div className="text-2xl animate-pulse">🌿</div>
      </div>
    );
  }
  if (!user) return null;

  // Safe profile fallback
  const safeProfile = profile ?? {
    id: user.id,
    email: user.email ?? "",
    full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
    avatar_url: user.user_metadata?.avatar_url || null,
    plan: "free" as const,
    plan_expires_at: null,
    views_today: 0,
    views_date: null,
    chats_today: 0,
    chats_date: null,
    created_at: user.created_at ?? new Date().toISOString(),
  };

  const planLabel = isPro
    ? safeProfile.plan === "annual" ? "Pro Annual" : "Pro Monthly"
    : "Free";
  const planExpiry = safeProfile.plan_expires_at
    ? new Date(safeProfile.plan_expires_at).toLocaleDateString()
    : null;

  return (
    <div className="min-h-screen bg-[#F8F8F0] px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* ── Profile Header ── */}
        <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-2 border-black overflow-hidden bg-lime flex items-center justify-center flex-shrink-0">
              {(user?.user_metadata?.avatar_url || safeProfile.avatar_url) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user?.user_metadata?.avatar_url || safeProfile.avatar_url!}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-2xl font-black">
                  {(safeProfile.full_name || safeProfile.email)[0].toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-black text-xl truncate">{safeProfile.full_name || "Anonymous"}</div>
              <div className="text-sm text-gray-400 truncate">{safeProfile.email}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${isPro ? "bg-lime border-black" : "bg-gray-100 border-gray-200 text-gray-500"}`}>
                  {isPro ? "✨ " : ""}{planLabel}
                </span>
                {planExpiry && isPro && (
                  <span className="text-xs text-gray-400">Renews {planExpiry}</span>
                )}
              </div>
            </div>
            <button
              onClick={async () => { await signOut(); router.push("/"); }}
              className="text-sm font-bold text-gray-400 hover:text-red-500 transition-all px-3 py-2 rounded-lg border border-gray-200 hover:border-red-200"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white border-2 border-black rounded-2xl p-1 mb-6 shadow-brutal-sm">
          {(["profile", "subscription", "activity"] as const).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
                tab === t ? "bg-lime border-2 border-black shadow-brutal-sm" : "text-gray-400 hover:text-brand"
              }`}
            >
              {t === "profile" ? "👤 Profile" : t === "subscription" ? "⭐ Subscription" : "📊 Activity"}
            </button>
          ))}
        </div>

        {/* ── Tab: Profile ── */}
        {tab === "profile" && (
          <div className="bg-white border-2 border-black rounded-3xl shadow-brutal-sm p-6 space-y-5">
            <h2 className="font-black text-lg">Account Details</h2>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Full Name</label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-medium">{safeProfile.full_name || "—"}</div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Email</label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-medium">{safeProfile.email}</div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Member Since</label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-medium">
                {new Date(safeProfile.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Link href="/strains" className="flex-1 py-3 bg-white border-2 border-black rounded-xl font-bold text-sm text-center hover:bg-lime-pale transition-all">
                🌿 Browse Strains
              </Link>
              <Link href="/chat" className="flex-1 py-3 bg-lime border-2 border-black rounded-xl font-bold text-sm text-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
                💬 AI Chat
              </Link>
            </div>
          </div>
        )}

        {/* ── Tab: Subscription ── */}
        {tab === "subscription" && (
          <div className="space-y-5">
            {isPro ? (
              /* ── Already Pro ── */
              <div className="bg-white border-2 border-black rounded-3xl shadow-brutal-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-lime border-2 border-black rounded-xl flex items-center justify-center text-2xl">✨</div>
                  <div>
                    <div className="font-black text-lg">StrainHub Pro Active</div>
                    <div className="text-sm text-gray-400">
                      {safeProfile.plan === "annual" ? "Annual Plan · $9.99/year" : "Monthly Plan · $2.99/month"}
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {["Unlimited strain views", "Unlimited AI chat", "Plant diagnosis", "Full cannabinoid data", "Ad-free experience"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm font-medium">
                      <span className="text-green-500 font-black">✓</span> {f}
                    </div>
                  ))}
                </div>
                {planExpiry && (
                  <div className="bg-lime-pale border-2 border-black rounded-xl px-4 py-3 text-sm font-medium">
                    🔄 Next renewal: <strong>{planExpiry}</strong>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-4 text-center">
                  To cancel, manage your subscription in your{" "}
                  <a href="https://www.paypal.com/myaccount/autopay" target="_blank" rel="noopener noreferrer" className="underline">
                    PayPal account
                  </a>.
                </p>
              </div>
            ) : subSuccess ? (
              /* ── Just subscribed ── */
              <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-8 text-center">
                <div className="text-5xl mb-3">🎉</div>
                <div className="font-black text-2xl mb-2">You&apos;re Pro!</div>
                <p className="text-gray-500 mb-6">All features are now unlocked. Enjoy StrainHub Pro!</p>
                <Link href="/chat" className="inline-block py-3 px-8 bg-lime border-2 border-black rounded-xl font-black shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
                  💬 Try AI Chat
                </Link>
              </div>
            ) : (
              /* ── Upgrade to Pro ── */
              <>
                {/* Current plan banner */}
                <div className="bg-white border-2 border-gray-200 rounded-2xl px-5 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-gray-400">Current Plan</div>
                    <div className="font-black text-base mt-0.5">Free</div>
                    <div className="text-xs text-gray-400 mt-0.5">10 strain views/day · 5 AI chats/day</div>
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-500">Free</span>
                </div>

                {/* Billing toggle */}
                <div className="bg-white border-2 border-black rounded-2xl p-1.5 flex shadow-brutal-sm">
                  <button
                    onClick={() => setBilling("monthly")}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${billing === "monthly" ? "bg-lime border-2 border-black shadow-brutal-sm" : "text-gray-400"}`}
                  >
                    Monthly · $2.99
                  </button>
                  <button
                    onClick={() => setBilling("annual")}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all relative ${billing === "annual" ? "bg-lime border-2 border-black shadow-brutal-sm" : "text-gray-400"}`}
                  >
                    Annual · $9.99
                    <span className="absolute -top-2.5 -right-1 bg-black text-lime text-[9px] font-black px-1.5 py-0.5 rounded-full">72% OFF</span>
                  </button>
                </div>

                {/* Features */}
                <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-brutal-sm">
                  <div className="font-black text-base mb-4">Everything in Pro:</div>
                  <div className="space-y-3">
                    {[
                      ["🔓", "Unlimited strain views"],
                      ["🤖", "Unlimited AI chat with StrainBot"],
                      ["🔬", "Plant diagnosis (upload photo)"],
                      ["🧬", "Full cannabinoid data (CBN, CBG, THCV)"],
                      ["🚫", "Ad-free experience"],
                      ["⚡", "Early access to new features"],
                    ].map(([icon, text]) => (
                      <div key={text} className="flex items-center gap-2.5 text-sm font-medium">
                        <span>{icon}</span> {text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* PayPal button */}
                <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-brutal-sm">
                  <div className="font-black text-base mb-1">
                    {billing === "monthly" ? "Monthly · $2.99/month" : "Annual · $9.99/year"}
                  </div>
                  <div className="text-xs text-gray-400 mb-4">
                    {billing === "annual" ? "Billed once a year. Cancel anytime." : "Billed monthly. Cancel anytime."}
                  </div>

                  {upgrading ? (
                    <div className="text-center py-4 font-bold text-gray-500 animate-pulse">Activating your Pro plan…</div>
                  ) : PAYPAL_CLIENT_ID ? (
                    <>
                      <div ref={paypalContainerRef} id="account-paypal-btn" className="min-h-[45px]" />
                      {!paypalLoaded && (
                        <div className="text-center text-xs text-gray-400 py-3 animate-pulse">Loading payment…</div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-4 text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                      PayPal not configured yet.{" "}
                      <Link href="/contact" className="underline text-brand">Contact us</Link> to upgrade.
                    </div>
                  )}

                  <p className="text-[11px] text-gray-400 text-center mt-3">
                    Secured by PayPal · Cancel anytime from your{" "}
                    <a href="https://www.paypal.com/myaccount/autopay" target="_blank" rel="noopener noreferrer" className="underline">PayPal account</a>
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Tab: Activity ── */}
        {tab === "activity" && (
          <div className="space-y-4">
            <div className="bg-white border-2 border-black rounded-3xl shadow-brutal-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-black text-lg">Today&apos;s Usage</h2>
                <button onClick={refreshProfile} className="text-xs text-gray-400 hover:text-brand border border-gray-200 rounded-lg px-2.5 py-1 hover:border-gray-400 transition-all">↻ Refresh</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black">
                    {isPro ? "∞" : (profile?.views_date === new Date().toISOString().split("T")[0] ? profile?.views_today || 0 : 0)}
                  </div>
                  <div className="text-xs font-bold text-gray-500 mt-1">Strains Viewed</div>
                  {!isPro && <div className="text-xs text-gray-400 mt-0.5">of 10 free</div>}
                  {isPro && <div className="text-xs text-green-600 font-bold mt-0.5">Unlimited ✨</div>}
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black">
                    {isPro ? "∞" : (profile?.chats_date === new Date().toISOString().split("T")[0] ? profile?.chats_today || 0 : 0)}
                  </div>
                  <div className="text-xs font-bold text-gray-500 mt-1">AI Chats</div>
                  {!isPro && <div className="text-xs text-gray-400 mt-0.5">of 5 free</div>}
                  {isPro && <div className="text-xs text-green-600 font-bold mt-0.5">Unlimited ✨</div>}
                </div>
              </div>
            </div>

            {!isPro && (
              <div className="bg-lime border-2 border-black rounded-3xl shadow-brutal-sm p-5 flex items-center justify-between gap-4">
                <div>
                  <div className="font-black">Upgrade to Pro</div>
                  <div className="text-sm text-gray-700 mt-0.5">Unlimited everything from $2.99/month</div>
                </div>
                <button
                  onClick={() => switchTab("subscription")}
                  className="px-4 py-2 bg-black text-lime font-black text-sm rounded-xl whitespace-nowrap hover:opacity-90 transition-all"
                >
                  Go Pro →
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F8F0] flex items-center justify-center"><div className="text-2xl animate-pulse">🌿</div></div>}>
      <AccountPageInner />
    </Suspense>
  );
}
