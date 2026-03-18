"use client";
import { useState } from "react";
import Link from "next/link";

type RequestType = "claim" | "new_listing" | "promo" | "event";

export default function ClaimListingPage() {
  const [requestType, setRequestType] = useState<RequestType>("claim");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    seedbank_name: "",
    seedbank_slug: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    website: "",
    message: "",
    promo_title: "",
    promo_description: "",
    promo_discount: "",
    promo_expires_at: "",
    event_title: "",
    event_description: "",
    event_date: "",
    event_url: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        ...form,
        request_type: requestType,
        seedbank_slug: form.seedbank_name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/claim_requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please email us directly at hello@strainhub.org");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  const TABS: { id: RequestType; label: string; icon: string; desc: string }[] = [
    { id: "claim", label: "Claim Listing", icon: "🏷️", desc: "Already listed? Claim ownership to manage your profile." },
    { id: "new_listing", label: "New Listing", icon: "➕", desc: "Not listed yet? Submit your seed bank for review." },
    { id: "promo", label: "Add Promotion", icon: "🎁", desc: "List a discount, deal, or promo for growers." },
    { id: "event", label: "Add Event", icon: "📅", desc: "Promote a drop, event, or launch to our community." },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center border border-gray-100 shadow-lg">
          <div className="w-20 h-20 bg-[#aaff00] rounded-full flex items-center justify-center text-4xl mx-auto mb-5">✓</div>
          <h1 className="text-2xl font-black mb-2">Request Submitted!</h1>
          <p className="text-gray-600 mb-6">
            We&apos;ll review your submission and get back to you at <strong>{form.contact_email}</strong> within 1–2 business days.
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-600 mb-6 text-left">
            <p className="font-semibold mb-1">What happens next?</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Our team reviews your submission</li>
              <li>We verify your ownership/affiliation</li>
              <li>You&apos;ll receive an email with next steps</li>
              <li>Your listing goes live once approved</li>
            </ul>
          </div>
          <Link href="/seedbanks" className="block bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-900 transition-colors">
            Back to Seed Banks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Hero */}
      <div className="bg-black text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/seedbanks" className="hover:text-white">Seed Banks</Link>
            <span>/</span>
            <span className="text-white">Claim Your Listing</span>
          </div>
          <h1 className="text-4xl font-black mb-3">
            Claim Your <span className="text-[#aaff00]">Listing</span>
          </h1>
          <p className="text-gray-300 max-w-xl">
            Are you a seed bank or breeder listed on StrainHub? Claim your profile to manage your info, add promos, and promote drops to thousands of growers.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Type selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setRequestType(tab.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                requestType === tab.id
                  ? "border-[#aaff00] bg-[#aaff00]/10"
                  : "border-gray-200 bg-white hover:border-gray-400"
              }`}
            >
              <div className="text-2xl mb-1">{tab.icon}</div>
              <div className="font-bold text-sm">{tab.label}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-tight">{tab.desc}</div>
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 space-y-5">
          <h2 className="text-xl font-black">
            {TABS.find(t => t.id === requestType)?.icon}{" "}
            {TABS.find(t => t.id === requestType)?.label}
          </h2>

          {/* Common fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Seed Bank / Breeder Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.seedbank_name}
                onChange={e => set("seedbank_name", e.target.value)}
                placeholder="e.g. Compound Genetics"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Website</label>
              <input
                value={form.website}
                onChange={e => set("website", e.target.value)}
                placeholder="https://yoursite.com"
                type="url"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.contact_name}
                onChange={e => set("contact_name", e.target.value)}
                placeholder="Full name"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                value={form.contact_email}
                onChange={e => set("contact_email", e.target.value)}
                placeholder="you@yourseedbank.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00]"
              />
            </div>
          </div>

          {/* Promo-specific fields */}
          {requestType === "promo" && (
            <div className="space-y-4 p-4 bg-green-50 rounded-2xl border border-green-200">
              <p className="text-sm font-bold text-green-800">📢 Promotion Details</p>
              <div>
                <label className="block text-sm font-semibold mb-1">Promo Title</label>
                <input
                  value={form.promo_title}
                  onChange={e => set("promo_title", e.target.value)}
                  placeholder="e.g. Spring Drop — 20% Off All Regulars"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Discount Code / Amount</label>
                  <input
                    value={form.promo_discount}
                    onChange={e => set("promo_discount", e.target.value)}
                    placeholder="e.g. SPRING20 or 20% off"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Expires</label>
                  <input
                    type="date"
                    value={form.promo_expires_at}
                    onChange={e => set("promo_expires_at", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Promo Description</label>
                <textarea
                  rows={3}
                  value={form.promo_description}
                  onChange={e => set("promo_description", e.target.value)}
                  placeholder="Describe the promotion for growers..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00] resize-none"
                />
              </div>
            </div>
          )}

          {/* Event-specific fields */}
          {requestType === "event" && (
            <div className="space-y-4 p-4 bg-purple-50 rounded-2xl border border-purple-200">
              <p className="text-sm font-bold text-purple-800">📅 Event / Drop Details</p>
              <div>
                <label className="block text-sm font-semibold mb-1">Event / Drop Title</label>
                <input
                  value={form.event_title}
                  onChange={e => set("event_title", e.target.value)}
                  placeholder="e.g. Summer 2025 Seed Drop"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={form.event_date}
                    onChange={e => set("event_date", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Drop / Event URL</label>
                  <input
                    type="url"
                    value={form.event_url}
                    onChange={e => set("event_url", e.target.value)}
                    placeholder="https://..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.event_description}
                  onChange={e => set("event_description", e.target.value)}
                  placeholder="Describe the drop or event for growers..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00] resize-none"
                />
              </div>
            </div>
          )}

          {/* General message */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              {requestType === "claim" ? "How can we verify you represent this seed bank?" :
               requestType === "new_listing" ? "Tell us about your seed bank" :
               "Additional notes"}
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={e => set("message", e.target.value)}
              placeholder={
                requestType === "claim"
                  ? "e.g. I'm the founder/owner. My domain email, social handles, etc."
                  : requestType === "new_listing"
                  ? "Founded year, location, notable strains, what makes your genetics special..."
                  : "Any additional info for our team..."
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#aaff00] resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#aaff00] text-black font-black py-4 rounded-2xl hover:bg-[#99ee00] transition-colors text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Request →"}
          </button>

          <p className="text-center text-xs text-gray-400">
            Prefer email? Reach us at{" "}
            <a href="mailto:hello@strainhub.org" className="underline hover:text-black">
              hello@strainhub.org
            </a>
          </p>
        </form>

        {/* Why claim */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "✏️", title: "Edit Your Profile", desc: "Update your bio, add photos, fix information, and keep your listing accurate." },
            { icon: "🎁", title: "Post Promotions", desc: "Announce deals, discount codes, and special offers to thousands of growers." },
            { icon: "📅", title: "Promote Drops", desc: "List your upcoming seed drops and events to drive traffic from our community." },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-bold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
