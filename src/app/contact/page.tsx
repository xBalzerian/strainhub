"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ContactForm() {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get("subject") === "advertising"
    ? "Advertising / partnerships"
    : searchParams.get("subject") === "store-partnership"
    ? "Store / affiliate listing"
    : "General question";

  const [form, setForm] = useState({ name: "", email: "", subject: defaultSubject, message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white border-2 border-brand rounded-3xl shadow-brutal p-10 text-center">
        <div className="text-5xl mb-4">🌿</div>
        <h2 className="text-2xl font-black text-brand mb-2">Message sent!</h2>
        <p className="text-gray-500 text-sm">We'll get back to you within 24–48 hours. Thanks for reaching out.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-brand rounded-3xl shadow-brutal p-8 space-y-5">
      <div>
        <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1.5">Your Name</label>
        <input required type="text" placeholder="Jane Doe" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-brand outline-none transition-all" />
      </div>
      <div>
        <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1.5">Email</label>
        <input required type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-brand outline-none transition-all" />
      </div>
      <div>
        <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1.5">Subject</label>
        <select value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-brand outline-none transition-all bg-white">
          <option>General question</option>
          <option>Advertising / partnerships</option>
          <option>Store / affiliate listing</option>
          <option>Data correction</option>
          <option>Breeder verification</option>
          <option>Bug report</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1.5">Message</label>
        <textarea required rows={5} placeholder="Tell us what's on your mind..." value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-brand outline-none transition-all resize-none" />
      </div>
      <button type="submit" disabled={status === "sending"}
        className="w-full py-3.5 bg-lime border-2 border-brand rounded-xl font-black shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all disabled:opacity-60">
        {status === "sending" ? "Sending..." : "Send Message 🌿"}
      </button>
      {status === "error" && <p className="text-red-500 text-xs text-center">Something went wrong. Try emailing us directly at hello@strainhub.org</p>}
      <p className="text-xs text-gray-400 text-center">We typically respond within 24–48 hours.</p>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F0] px-4 py-16">
      <div className="max-w-xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Contact</span>
        <h1 className="text-4xl font-black mt-2 mb-2">Get in touch</h1>
        <p className="text-gray-500 mb-8">Questions, partnerships, advertising, or data corrections — reach out below.</p>
        <Suspense fallback={<div>Loading...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
