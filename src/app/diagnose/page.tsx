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
  Healthy: { color: "bg-green-100 border-green-400 text-green-800", icon: "✅", label: "Healthy Plant" },
  Mild: { color: "bg-yellow-100 border-yellow-400 text-yellow-800", icon: "⚠️", label: "Mild Issues" },
  Moderate: { color: "bg-orange-100 border-orange-400 text-orange-800", icon: "🔶", label: "Moderate Issues" },
  Severe: { color: "bg-red-100 border-red-400 text-red-800", icon: "🚨", label: "Severe Issues" },
};

const URGENCY_COLOR: Record<string, string> = {
  "Immediate": "bg-red-100 text-red-700 border-red-300",
  "Within 48 hours": "bg-orange-100 text-orange-700 border-orange-300",
  "Monitor": "bg-yellow-100 text-yellow-700 border-yellow-300",
  "Non-urgent": "bg-gray-100 text-gray-600 border-gray-300",
};

const CATEGORY_EMOJI: Record<string, string> = {
  Deficiency: "🍃", Toxicity: "⚗️", Pest: "🐛", Disease: "🦠", Environmental: "🌡️", Physical: "💥",
};

export default function DiagnosePage() {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isPro, hydrated } = useProStatus();

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) { setError("Please upload an image file."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("Image must be under 10MB."); return; }
    setError("");
    setDiagnosis(null);
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  async function diagnoseImage() {
    if (!imageFile || !image) return;
    setLoading(true);
    setError("");

    try {
      // Convert to base64
      const base64 = image.split(",")[1];
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });
      const data = await res.json();

      if (data.async) {
        setError("Vision analysis is processing. Please try again in a moment.");
        setLoading(false);
        return;
      }

      if (data.error) { setError(data.error); }
      else if (data.diagnosis) { setDiagnosis(data.diagnosis); }
    } catch {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() { setImage(null); setImageFile(null); setDiagnosis(null); setError(""); }

  if (!hydrated) return null;

  if (!isPro) {
    return (
      <div className="min-h-screen bg-[#F8F8F0] flex items-center justify-center px-4">
        <div className="bg-white border-2 border-black rounded-3xl shadow-brutal p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔬</div>
          <h1 className="text-3xl font-black mb-2">Plant Diagnosis</h1>
          <p className="text-gray-500 font-medium mb-2">
            Upload a photo of your cannabis plant and our AI will instantly identify:
          </p>
          <div className="text-left space-y-2 mb-8 bg-gray-50 rounded-2xl p-4">
            {["🍃 Nutrient deficiencies & toxicities", "🐛 Pests & infestations", "🦠 Diseases (mildew, bud rot)", "🌡️ Environmental stress", "💊 Full treatment plan"].map((f) => (
              <div key={f} className="text-sm font-medium text-brand">{f}</div>
            ))}
          </div>
          <Link
            href="/pro"
            className="w-full py-4 bg-lime border-2 border-black rounded-2xl font-black text-brand text-lg shadow-brutal hover:-translate-y-0.5 transition-all block text-center"
          >
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
          <p className="text-gray-500">Upload a photo — our AI identifies issues and provides a treatment plan in seconds.</p>
        </div>

        {!diagnosis ? (
          <>
            {/* Upload Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onClick={() => !image && fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl transition-all cursor-pointer ${
                dragging ? "border-black bg-lime-pale scale-[1.01]" : image ? "border-black bg-white cursor-default" : "border-gray-300 bg-white hover:border-black hover:bg-lime-pale"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              {image ? (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="Plant to diagnose" className="w-full max-h-80 object-contain rounded-3xl p-2" />
                  <button
                    onClick={(e) => { e.stopPropagation(); reset(); }}
                    className="absolute top-4 right-4 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-gray-700 transition-all"
                  >
                    ✕
                  </button>
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
              <button
                onClick={diagnoseImage}
                disabled={loading}
                className="w-full mt-4 py-4 bg-lime border-2 border-black rounded-2xl font-black text-lg shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Analyzing your plant...
                  </span>
                ) : "🔬 Analyze Plant"}
              </button>
            )}

            {error && (
              <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-2xl px-4 py-3 text-sm text-red-600 font-medium">
                {error}
              </div>
            )}

            {/* Tips */}
            <div className="mt-8 bg-white border-2 border-gray-200 rounded-2xl p-6">
              <div className="font-bold text-sm mb-3 text-gray-500 uppercase tracking-widest">📷 For best results</div>
              <div className="grid gap-2">
                {[
                  "Take a close-up photo of affected leaves",
                  "Good lighting — natural light works best",
                  "Include both tops and undersides of leaves if possible",
                  "Show multiple affected areas if present",
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-2 text-sm text-brand">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Results */
          <div className="space-y-5">
            {/* Severity Banner */}
            <div className={`border-2 rounded-2xl px-6 py-4 flex items-center gap-3 ${SEVERITY_CONFIG[diagnosis.severity].color}`}>
              <span className="text-3xl">{SEVERITY_CONFIG[diagnosis.severity].icon}</span>
              <div>
                <div className="font-black text-lg">{SEVERITY_CONFIG[diagnosis.severity].label}</div>
                <div className="text-sm font-medium opacity-80">{diagnosis.summary}</div>
              </div>
            </div>

            {/* Overall Health */}
            <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal-sm">
              <div className="font-black mb-2">🌱 Overall Assessment</div>
              <p className="text-sm text-gray-600 leading-relaxed">{diagnosis.overallHealth}</p>
            </div>

            {/* Issues */}
            {diagnosis.issues.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-black text-xl">Issues Found ({diagnosis.issues.length})</h2>
                {diagnosis.issues.map((issue, i) => (
                  <div key={i} className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal-sm">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{CATEGORY_EMOJI[issue.category] || "⚠️"}</span>
                        <div>
                          <div className="font-black">{issue.name}</div>
                          <div className="text-xs text-gray-400">{issue.category} · Confidence: {issue.confidence}</div>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${URGENCY_COLOR[issue.urgency] || URGENCY_COLOR["Monitor"]}`}>
                        {issue.urgency}
                      </span>
                    </div>

                    {issue.symptoms.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Symptoms</div>
                        <div className="flex flex-wrap gap-1.5">
                          {issue.symptoms.map((s) => (
                            <span key={s} className="text-xs bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 font-medium">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {issue.causes.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Likely Causes</div>
                        <ul className="text-sm text-gray-600 space-y-0.5">
                          {issue.causes.map((c) => <li key={c} className="flex gap-2"><span>•</span>{c}</li>)}
                        </ul>
                      </div>
                    )}

                    {issue.treatment.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Treatment Plan</div>
                        <ol className="space-y-2">
                          {issue.treatment.map((t, j) => (
                            <li key={j} className="flex gap-3 text-sm">
                              <span className="w-5 h-5 bg-lime border border-black rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">{j + 1}</span>
                              <span className="text-brand">{t}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Prevention Tips */}
            {diagnosis.preventionTips.length > 0 && (
              <div className="bg-lime-pale border-2 border-black rounded-2xl p-5">
                <div className="font-black mb-3">🛡️ Prevention Tips</div>
                <ul className="space-y-2">
                  {diagnosis.preventionTips.map((tip) => (
                    <li key={tip} className="flex gap-2 text-sm text-brand">
                      <span className="text-green-600 font-bold">✓</span>{tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 py-3 bg-white border-2 border-black rounded-xl font-bold hover:bg-lime-pale transition-all"
              >
                📸 Diagnose Another
              </button>
              <Link
                href="/chat"
                className="flex-1 py-3 bg-lime border-2 border-black rounded-xl font-bold text-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all"
              >
                💬 Ask StrainBot
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
