"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useProStatus } from "@/hooks/useProStatus";

interface Issue {
  name: string;
  category: string;
  confidence: "High" | "Medium" | "Low";
  symptoms: string[];
  causes: string[];
  treatment: string[];
  urgency: string;
}

interface Diagnosis {
  summary: string;
  severity: "Healthy" | "Mild" | "Moderate" | "Severe";
  issues: Issue[];
  preventionTips: string[];
  overallHealth: string;
}

const SEVERITY_CONFIG = {
  Healthy: { bg: "#f0fff4", border: "#22c55e", text: "#15803d", badge: "#dcfce7", badgeText: "#16a34a", icon: "✅", label: "Healthy Plant" },
  Mild: { bg: "#fefce8", border: "#eab308", text: "#854d0e", badge: "#fef9c3", badgeText: "#a16207", icon: "⚠️", label: "Mild Issues" },
  Moderate: { bg: "#fff7ed", border: "#f97316", text: "#9a3412", badge: "#ffedd5", badgeText: "#c2410c", icon: "🔶", label: "Moderate Issues" },
  Severe: { bg: "#fef2f2", border: "#ef4444", text: "#991b1b", badge: "#fee2e2", badgeText: "#b91c1c", icon: "🚨", label: "Severe — Act Now" },
};

const URGENCY_CONFIG: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  "Immediate": { bg: "#fef2f2", text: "#b91c1c", border: "#fca5a5", dot: "#ef4444" },
  "Within 48 hours": { bg: "#fff7ed", text: "#c2410c", border: "#fdba74", dot: "#f97316" },
  "Monitor": { bg: "#fefce8", text: "#a16207", border: "#fde047", dot: "#eab308" },
  "Non-urgent": { bg: "#f9fafb", text: "#4b5563", border: "#e5e7eb", dot: "#9ca3af" },
};

const CATEGORY_CONFIG: Record<string, { emoji: string; color: string }> = {
  Deficiency:   { emoji: "🍃", color: "#16a34a" },
  Toxicity:     { emoji: "⚗️",  color: "#7c3aed" },
  Pest:         { emoji: "🐛", color: "#b45309" },
  Disease:      { emoji: "🦠", color: "#dc2626" },
  Environmental:{ emoji: "🌡️", color: "#0284c7" },
  Physical:     { emoji: "💥", color: "#6b7280" },
};

const CONFIDENCE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  High:   { label: "High Confidence", color: "#15803d", bg: "#dcfce7" },
  Medium: { label: "Medium Confidence", color: "#a16207", bg: "#fef9c3" },
  Low:    { label: "Low Confidence", color: "#9ca3af", bg: "#f3f4f6" },
};

export default function DiagnosePage() {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [expandedIssue, setExpandedIssue] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { isPro, hydrated } = useProStatus();

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) { setError("Please upload an image file."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("Image must be under 10MB."); return; }
    setError(""); setDiagnosis(null); setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  async function diagnoseImage() {
    if (!imageFile || !image) return;
    setLoading(true); setError("");
    try {
      const base64 = image.split(",")[1];
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });
      const data = await res.json();
      if (data.async) { setError("Vision analysis is processing. Please try again in a moment."); }
      else if (data.error) { setError(data.error); }
      else if (data.diagnosis) { setDiagnosis(data.diagnosis); setExpandedIssue(0); }
    } catch { setError("Failed to analyze image. Please try again."); }
    finally { setLoading(false); }
  }

  function reset() { setImage(null); setImageFile(null); setDiagnosis(null); setError(""); }

  function downloadPDF() {
    if (!diagnosis) return;
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const sev = SEVERITY_CONFIG[diagnosis.severity];

    const issuesHTML = diagnosis.issues.map((issue, i) => {
      const cat = CATEGORY_CONFIG[issue.category] || { emoji: "🔍", color: "#333" };
      const urg = URGENCY_CONFIG[issue.urgency] || URGENCY_CONFIG["Non-urgent"];
      const conf = CONFIDENCE_CONFIG[issue.confidence] || CONFIDENCE_CONFIG["Low"];
      return `
        <div style="margin-bottom:20px;border:1.5px solid #e5e7eb;border-radius:12px;overflow:hidden;page-break-inside:avoid;">
          <div style="background:#f9fafb;padding:14px 18px;border-bottom:1.5px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:20px;">${cat.emoji}</span>
              <div>
                <div style="font-weight:800;font-size:15px;color:#111;">#${i+1} — ${issue.name}</div>
                <div style="font-size:12px;color:${cat.color};font-weight:600;">${issue.category}</div>
              </div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="background:${conf.bg};color:${conf.color};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${conf.label}</span>
              <span style="background:${urg.bg};color:${urg.text};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;border:1px solid ${urg.border};">⏱ ${issue.urgency}</span>
            </div>
          </div>
          <div style="padding:16px 18px;display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div>
              <div style="font-weight:700;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Observed Symptoms</div>
              ${issue.symptoms.map(s => `<div style="font-size:13px;color:#374151;padding:3px 0;display:flex;gap:6px;"><span style="color:#f97316;font-weight:700;">•</span>${s}</div>`).join("")}
            </div>
            <div>
              <div style="font-weight:700;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Root Causes</div>
              ${issue.causes.map(c => `<div style="font-size:13px;color:#374151;padding:3px 0;display:flex;gap:6px;"><span style="color:#6b7280;font-weight:700;">•</span>${c}</div>`).join("")}
            </div>
          </div>
          <div style="padding:0 18px 16px;">
            <div style="font-weight:700;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Treatment Protocol</div>
            ${issue.treatment.map((t, ti) => `
              <div style="display:flex;gap:10px;padding:6px 0;border-bottom:1px solid #f3f4f6;align-items:flex-start;">
                <div style="min-width:22px;height:22px;background:#AAFF00;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;color:#000;">${ti+1}</div>
                <div style="font-size:13px;color:#111;line-height:1.5;">${t}</div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");

    const html = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<title>Plant Diagnosis Report — StrainHub</title>
<style>
  * { margin:0;padding:0;box-sizing:border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#fff; color:#111; padding:40px; max-width:820px; margin:0 auto; }
  @media print { body { padding:20px; } }
</style>
</head><body>
  <!-- Header -->
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;padding-bottom:20px;border-bottom:2px solid #000;">
    <div>
      <div style="font-size:26px;font-weight:900;letter-spacing:-0.5px;">Strain<span style="background:#AAFF00;padding:0 6px;border-radius:6px;">Hub</span></div>
      <div style="font-size:13px;color:#6b7280;font-weight:600;margin-top:4px;">AI Plant Diagnosis Report</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:12px;color:#6b7280;">${date} at ${time}</div>
      <div style="font-size:11px;color:#9ca3af;margin-top:2px;">strainhub.vercel.app</div>
    </div>
  </div>

  <!-- Severity Banner -->
  <div style="background:${sev.bg};border:2px solid ${sev.border};border-radius:14px;padding:18px 22px;margin-bottom:20px;display:flex;align-items:center;gap:14px;">
    <span style="font-size:32px;">${sev.icon}</span>
    <div>
      <div style="font-weight:900;font-size:18px;color:${sev.text};">${sev.label}</div>
      <div style="font-size:14px;color:${sev.text};opacity:0.85;margin-top:3px;">${diagnosis.summary}</div>
    </div>
  </div>

  <!-- Overall Health -->
  <div style="background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:12px;padding:16px 20px;margin-bottom:20px;">
    <div style="font-weight:800;font-size:13px;color:#374151;margin-bottom:6px;">🌱 OVERALL HEALTH ASSESSMENT</div>
    <p style="font-size:14px;color:#374151;line-height:1.6;">${diagnosis.overallHealth}</p>
  </div>

  <!-- Issues found -->
  ${diagnosis.issues.length > 0 ? `
    <div style="font-weight:900;font-size:16px;margin-bottom:14px;color:#111;">🔍 Issues Found (${diagnosis.issues.length})</div>
    ${issuesHTML}
  ` : `<div style="text-align:center;padding:20px;color:#16a34a;font-weight:700;">✅ No issues detected — your plant looks healthy!</div>`}

  <!-- Prevention Tips -->
  ${diagnosis.preventionTips?.length > 0 ? `
    <div style="background:#f0fdf4;border:1.5px solid #86efac;border-radius:12px;padding:16px 20px;margin-top:8px;page-break-inside:avoid;">
      <div style="font-weight:800;font-size:13px;color:#15803d;margin-bottom:10px;">🛡️ PREVENTION & MAINTENANCE TIPS</div>
      ${diagnosis.preventionTips.map((tip, i) => `
        <div style="display:flex;gap:10px;padding:5px 0;font-size:13px;color:#374151;">
          <span style="color:#22c55e;font-weight:700;">${i+1}.</span>${tip}
        </div>
      `).join("")}
    </div>
  ` : ""}

  <!-- Footer -->
  <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;">
    <div style="font-size:11px;color:#9ca3af;">Generated by StrainHub AI · For informational purposes only</div>
    <div style="font-size:11px;color:#9ca3af;">strainhub.vercel.app</div>
  </div>
</body></html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (win) {
      win.onload = () => {
        setTimeout(() => { win.print(); }, 300);
      };
    }
  }

  if (!hydrated) return null;

  if (!isPro) {
    return (
      <div className="min-h-screen bg-[#F8F8F0] flex items-center justify-center px-4">
        <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔬</div>
          <h1 className="text-3xl font-black mb-2">Plant Diagnosis</h1>
          <p className="text-gray-500 font-medium mb-6">Upload a photo — AI identifies pests, deficiencies, diseases & gives a full treatment plan.</p>
          <div className="text-left space-y-2 mb-8 bg-gray-50 rounded-2xl p-4">
            {["🍃 Nutrient deficiencies & toxicities","🐛 Pests & infestations","🦠 Diseases (mildew, bud rot)","🌡️ Environmental stress","📄 Downloadable PDF report"].map(f => (
              <div key={f} className="text-sm font-medium text-brand">{f}</div>
            ))}
          </div>
          <Link href="/pro" className="w-full py-4 bg-lime border-2 border-black rounded-2xl font-black text-brand text-lg shadow-brutal hover:-translate-y-0.5 transition-all block text-center">
            🌿 Unlock Plant Diagnosis — $2.99/mo
          </Link>
          <p className="text-xs text-gray-400 mt-3">Or $9.99/year · Cancel anytime</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F0] px-4 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-lime border-2 border-black rounded-full px-4 py-1.5 text-sm font-bold mb-4 shadow-brutal-sm">
            🔬 AI Plant Diagnosis
          </div>
          <h1 className="text-4xl font-black text-brand mb-2">Diagnose Your Plant</h1>
          <p className="text-gray-500">Upload a photo — AI identifies issues and gives a full treatment plan in seconds.</p>
        </div>

        {!diagnosis ? (
          <>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onClick={() => !image && fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl transition-all cursor-pointer ${
                dragging ? "border-black bg-lime-pale scale-[1.01]" : image ? "border-black bg-white cursor-default" : "border-gray-300 bg-white hover:border-black hover:bg-lime-pale"
              }`}
            >
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              {image ? (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="Plant to diagnose" className="w-full max-h-80 object-contain rounded-3xl p-2" />
                  <button onClick={(e) => { e.stopPropagation(); reset(); }}
                    className="absolute top-4 right-4 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-gray-700 transition-all">✕</button>
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="text-5xl mb-4">📸</div>
                  <div className="font-black text-brand mb-1">Drop your plant photo here</div>
                  <div className="text-sm text-gray-400">or click to browse · JPG, PNG, WebP · Max 10MB</div>
                </div>
              )}
            </div>

            {image && (
              <button onClick={diagnoseImage} disabled={loading}
                className="w-full mt-4 py-4 bg-lime border-2 border-black rounded-2xl font-black text-lg shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? <span className="flex items-center justify-center gap-2"><span className="animate-spin">⏳</span> Analyzing your plant...</span> : "🔬 Analyze Plant"}
              </button>
            )}

            {error && <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-2xl px-4 py-3 text-sm text-red-600 font-medium">{error}</div>}

            <div className="mt-8 bg-white border-2 border-gray-200 rounded-2xl p-6">
              <div className="font-bold text-sm mb-3 text-gray-500 uppercase tracking-widest">📷 For best results</div>
              <div className="grid gap-2">
                {["Take a close-up photo of affected leaves","Good lighting — natural light works best","Include both tops and undersides of leaves","Show multiple affected areas if present"].map(tip => (
                  <div key={tip} className="flex items-start gap-2 text-sm text-brand">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>{tip}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div ref={resultsRef} className="space-y-4">

            {/* Top action bar */}
            <div className="flex items-center justify-between">
              <button onClick={reset} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors">
                ← Analyze Another
              </button>
              <button onClick={downloadPDF}
                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-brutal-sm">
                ⬇ Download PDF Report
              </button>
            </div>

            {/* Severity Banner */}
            {(() => {
              const sev = SEVERITY_CONFIG[diagnosis.severity];
              return (
                <div className="rounded-2xl border-2 p-5 flex items-start gap-4"
                  style={{ background: sev.bg, borderColor: sev.border }}>
                  <span className="text-4xl mt-0.5">{sev.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-black text-xl" style={{ color: sev.text }}>{sev.label}</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: sev.badge, color: sev.badgeText }}>
                        {diagnosis.issues.length} issue{diagnosis.issues.length !== 1 ? "s" : ""} found
                      </span>
                    </div>
                    <p className="text-sm mt-1.5 leading-relaxed" style={{ color: sev.text, opacity: 0.85 }}>{diagnosis.summary}</p>
                  </div>
                </div>
              );
            })()}

            {/* Overall Health */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-5">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">🌱 Overall Health Assessment</div>
              <p className="text-sm text-gray-700 leading-relaxed">{diagnosis.overallHealth}</p>
            </div>

            {/* Plant Image + quick stats */}
            {image && (
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 flex gap-4 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Analyzed plant" className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200 flex-shrink-0" />
                <div className="grid grid-cols-2 gap-2 flex-1">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-400 font-semibold">Severity</div>
                    <div className="font-black text-sm text-brand">{diagnosis.severity}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-400 font-semibold">Issues Found</div>
                    <div className="font-black text-sm text-brand">{diagnosis.issues.length}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-400 font-semibold">Urgency</div>
                    <div className="font-black text-sm text-brand">
                      {diagnosis.issues.find(i => i.urgency === "Immediate") ? "Immediate" :
                       diagnosis.issues.find(i => i.urgency === "Within 48 hours") ? "48 hrs" : "Monitor"}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-400 font-semibold">Analyzed</div>
                    <div className="font-black text-sm text-brand">{new Date().toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Issues */}
            {diagnosis.issues.length > 0 && (
              <div>
                <div className="font-black text-lg text-brand mb-3">🔍 Diagnosed Issues</div>
                <div className="space-y-3">
                  {diagnosis.issues.map((issue, i) => {
                    const cat = CATEGORY_CONFIG[issue.category] || { emoji: "🔍", color: "#333" };
                    const urg = URGENCY_CONFIG[issue.urgency] || URGENCY_CONFIG["Non-urgent"];
                    const conf = CONFIDENCE_CONFIG[issue.confidence] || CONFIDENCE_CONFIG["Low"];
                    const isOpen = expandedIssue === i;
                    return (
                      <div key={i} className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
                        {/* Issue Header — clickable to expand */}
                        <button onClick={() => setExpandedIssue(isOpen ? -1 : i)}
                          className="w-full text-left p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                          <span className="text-2xl">{cat.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-black text-brand">#{i+1} {issue.name}</span>
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: cat.color, background: cat.color + "18" }}>{issue.category}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: conf.bg, color: conf.color }}>{conf.label}</span>
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full border" style={{ background: urg.bg, color: urg.text, borderColor: urg.border }}>
                                <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 mb-px" style={{ background: urg.dot }}></span>
                                {issue.urgency}
                              </span>
                            </div>
                          </div>
                          <span className={`text-gray-400 text-lg transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▼</span>
                        </button>

                        {/* Expanded content */}
                        {isOpen && (
                          <div className="border-t-2 border-gray-100 px-4 pb-4 pt-4 space-y-4">
                            {/* Symptoms */}
                            <div>
                              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Observed Symptoms</div>
                              <div className="grid gap-1.5">
                                {issue.symptoms.map((s, si) => (
                                  <div key={si} className="flex items-start gap-2 text-sm text-gray-700">
                                    <span className="text-orange-400 font-black mt-0.5">▸</span>{s}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Causes */}
                            <div>
                              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Root Causes</div>
                              <div className="grid gap-1.5">
                                {issue.causes.map((c, ci) => (
                                  <div key={ci} className="flex items-start gap-2 text-sm text-gray-700">
                                    <span className="text-gray-400 font-black mt-0.5">▸</span>{c}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Treatment Steps */}
                            <div>
                              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Treatment Protocol</div>
                              <div className="space-y-2">
                                {issue.treatment.map((t, ti) => (
                                  <div key={ti} className="flex items-start gap-3 bg-gray-50 rounded-xl px-3 py-2.5">
                                    <div className="w-6 h-6 rounded-full bg-lime border-2 border-black flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">{ti+1}</div>
                                    <div className="text-sm text-gray-800 leading-relaxed">{t}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Prevention Tips */}
            {diagnosis.preventionTips?.length > 0 && (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5">
                <div className="text-xs font-black uppercase tracking-widest text-green-700 mb-3">🛡️ Prevention & Maintenance</div>
                <div className="space-y-2">
                  {diagnosis.preventionTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="text-green-500 font-black mt-0.5">{i+1}.</span>{tip}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Download again at bottom */}
            <div className="flex gap-3">
              <button onClick={downloadPDF}
                className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-2xl font-black text-sm hover:bg-gray-800 transition-all shadow-brutal-sm">
                ⬇ Download Full PDF Report
              </button>
              <button onClick={reset}
                className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-black py-3.5 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all shadow-brutal-sm">
                📸 Analyze Another Plant
              </button>
            </div>

            {/* Disclaimer */}
            <p className="text-center text-xs text-gray-400 pb-4">
              AI diagnosis is for informational purposes only. Always verify with a professional grower for severe issues.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
