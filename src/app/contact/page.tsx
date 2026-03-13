import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact StrainHub",
  description: "Get in touch with the StrainHub team. Questions, partnerships, advertising, or data corrections — we&apos;d love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F0] px-4 py-16">
      <div className="max-w-xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Contact</span>
        <h1 className="text-4xl font-black mt-2 mb-2">Get in touch</h1>
        <p className="text-gray-500 mb-8">Questions, partnerships, advertising, or data corrections — reach out below.</p>
        <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-8 space-y-5">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1.5">Your Name</label>
            <input type="text" placeholder="Jane Doe" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-black outline-none transition-all" />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1.5">Email</label>
            <input type="email" placeholder="you@email.com" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-black outline-none transition-all" />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1.5">Subject</label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-black outline-none transition-all bg-white">
              <option>General question</option>
              <option>Data correction</option>
              <option>Advertising / partnerships</option>
              <option>Breeder verification</option>
              <option>Bug report</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1.5">Message</label>
            <textarea rows={5} placeholder="Tell us what's on your mind..." className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-black outline-none transition-all resize-none" />
          </div>
          <button className="w-full py-3.5 bg-lime border-2 border-black rounded-xl font-black shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
            Send Message 🌿
          </button>
          <p className="text-xs text-gray-400 text-center">We typically respond within 24–48 hours.</p>
        </div>
      </div>
    </div>
  );
}
