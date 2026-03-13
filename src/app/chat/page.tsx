"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import type { Metadata } from "next";

// ─── Types ───────────────────────────────────────────────────────────────────
interface StrainCard {
  name: string; slug: string; type: string;
  thc_max: number; thc_min: number; cbd_max: number;
  effects: string[]; flavors: string[]; terpenes: string[];
  description: string; image_url: string;
}
interface Message {
  role: "user" | "assistant";
  content: string;
  strains?: StrainCard[];
}
interface ChatSession {
  id: string; preview: string; updated_at: string; messages: Message[];
}

// ─── Suggested prompts ───────────────────────────────────────────────────────
const SUGGESTED = [
  "Show me 3 best high Sativa strains",
  "What's the best strain for anxiety and stress?",
  "Give me top 3 Indica strains for deep sleep",
  "What strains have the highest THC content?",
  "Best strains for creative focus and productivity",
  "Show me 3 beginner-friendly strains to grow",
  "What terpenes are best for pain relief?",
  "Recommend 3 CBD-dominant strains for daytime use",
  "Best hybrid strains under 20% THC",
  "How do I fix yellow leaves on my cannabis plant?",
];

// ─── Known strain slugs for auto-linking ─────────────────────────────────────
const STRAIN_LINKS: Record<string, string> = {
  "OG Kush": "og-kush", "Blue Dream": "blue-dream", "Sour Diesel": "sour-diesel",
  "Girl Scout Cookies": "girl-scout-cookies", "GSC": "girl-scout-cookies",
  "Granddaddy Purple": "granddaddy-purple", "GDP": "granddaddy-purple",
  "Northern Lights": "northern-lights", "Jack Herer": "jack-herer",
  "White Widow": "white-widow", "Pineapple Express": "pineapple-express",
  "Gorilla Glue": "gorilla-glue-4", "Gorilla Glue #4": "gorilla-glue-4", "GG4": "gorilla-glue-4",
  "Wedding Cake": "wedding-cake", "Gelato": "gelato", "Zkittlez": "zkittlez",
  "Durban Poison": "durban-poison", "Amnesia Haze": "amnesia-haze",
  "Bruce Banner": "bruce-banner", "Green Crack": "green-crack",
  "Super Lemon Haze": "super-lemon-haze", "Purple Haze": "purple-haze",
  "AK-47": "ak-47", "Trainwreck": "trainwreck", "Chemdawg": "chemdawg",
  "Strawberry Cough": "strawberry-cough", "Bubba Kush": "bubba-kush",
  "Purple Punch": "purple-punch", "Sunset Sherbet": "sunset-sherbet",
  "Runtz": "runtz", "Cereal Milk": "cereal-milk", "Ice Cream Cake": "ice-cream-cake",
  "Do-Si-Dos": "do-si-dos", "Mimosa": "mimosa", "MAC": "mac",
  "Tropical Zkittlez": "tropical-zkittlez", "Banana Kush": "banana-kush",
  "Lemon Haze": "lemon-haze", "Jack Flash": "jack-flash",
  "Black Jack": "black-jack", "Super Silver Haze": "super-silver-haze",
  "Candy Kush": "candy-kush", "Mango Kush": "mango-kush",
};

function linkifyStrains(html: string): string {
  Object.entries(STRAIN_LINKS).forEach(([name, slug]) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?<![">])\\b${escaped}\\b(?![^<]*>)`, "g");
    html = html.replace(regex, `<a href="/strains/${slug}" class="text-brand font-bold underline hover:text-lime-600 transition-colors" target="_self">${name}</a>`);
  });
  return html;
}

// ─── Markdown renderer ───────────────────────────────────────────────────────
function MarkdownText({ text }: { text: string }) {
  const html = linkifyStrains(
    text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-xs font-mono">$1</code>')
      .replace(/\n\n/g, "</p><p class='mt-2'>")
      .replace(/\n/g, "<br/>")
  );
  return <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
}

// ─── Strain Card component ────────────────────────────────────────────────────
function StrainCardItem({ strain }: { strain: StrainCard }) {
  const typeColor = strain.type === "Sativa" ? "bg-yellow-100 text-yellow-700 border-yellow-300"
    : strain.type === "Indica" ? "bg-purple-100 text-purple-700 border-purple-300"
    : "bg-green-100 text-green-700 border-green-300";

  return (
    <Link href={`/strains/${strain.slug}`}
      className="group flex flex-col bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal-sm hover:shadow-brutal hover:-translate-y-1 transition-all duration-200 w-full">
      {/* Image */}
      <div className="relative h-36 bg-gray-100 overflow-hidden flex-shrink-0">
        {strain.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={strain.image_url} alt={strain.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🌿</div>
        )}
        <span className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full border ${typeColor}`}>
          {strain.type}
        </span>
      </div>
      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5">
        <div className="font-black text-sm leading-tight">{strain.name}</div>
        <div className="flex gap-2 text-xs text-gray-500 font-medium">
          <span>THC {strain.thc_min}–{strain.thc_max}%</span>
          {strain.cbd_max > 0.5 && <span>CBD {strain.cbd_max}%</span>}
        </div>
        {strain.effects && strain.effects.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {strain.effects.slice(0, 3).map((e) => (
              <span key={e} className="text-[10px] bg-lime-pale border border-gray-200 rounded-full px-2 py-0.5 font-medium">{e}</span>
            ))}
          </div>
        )}
        <div className="text-[11px] text-lime font-black mt-0.5 group-hover:underline">View strain →</div>
      </div>
    </Link>
  );
}

// ─── New session ID ───────────────────────────────────────────────────────────
function newSessionId() {
  return `cs_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// ─── Main Chat Page ───────────────────────────────────────────────────────────
export default function ChatPage() {
  const { isPro, canChat, chatsRemaining, trackChat, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("sh_chat_messages") || "[]"); } catch { return []; }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState(() => {
    if (typeof window === "undefined") return newSessionId();
    return localStorage.getItem("sh_chat_session_id") || newSessionId();
  });
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Persist messages + sessionId to localStorage whenever they change
  useEffect(() => {
    try { localStorage.setItem("sh_chat_messages", JSON.stringify(messages)); } catch { /* quota */ }
  }, [messages]);
  useEffect(() => {
    try { localStorage.setItem("sh_chat_session_id", sessionId); } catch { /* quota */ }
  }, [sessionId]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  // Load history sidebar
  const loadSessions = useCallback(async () => {
    if (!user) return;
    setLoadingSessions(true);
    const res = await fetch(`/api/chat/sessions?userId=${user.id}`);
    const data = await res.json();
    setSessions(data.sessions || []);
    setLoadingSessions(false);
  }, [user]);

  useEffect(() => {
    if (user) loadSessions();
  }, [user, loadSessions]);

  function startNewChat() {
    const newId = newSessionId();
    setMessages([]);
    setSessionId(newId);
    setError("");
    setSidebarOpen(false);
    try {
      localStorage.setItem("sh_chat_messages", "[]");
      localStorage.setItem("sh_chat_session_id", newId);
    } catch { /* quota */ }
  }

  function loadSession(session: ChatSession) {
    const msgs = session.messages || [];
    setMessages(msgs);
    setSessionId(session.id);
    setError("");
    setSidebarOpen(false);
    try {
      localStorage.setItem("sh_chat_messages", JSON.stringify(msgs));
      localStorage.setItem("sh_chat_session_id", session.id);
    } catch { /* quota */ }
  }

  async function deleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    await fetch("/api/chat/sessions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: id, userId: user?.id }),
    });
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (sessionId === id) startNewChat();
  }

  async function sendMessage(text?: string) {
    const content = (text || input).trim();
    if (!content || loading) return;

    const allowed = await trackChat();
    if (!allowed) {
      setError("You've used your 5 free messages today. Upgrade to Pro for unlimited chat.");
      return;
    }

    setError("");
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          userId: user?.id || null,
          sessionId,
        }),
      });
      const data = await res.json();
      if (data.message) {
        const assistantMsg: Message = {
          role: "assistant",
          content: data.message,
          strains: data.strains?.length > 0 ? data.strains : undefined,
        };
        setMessages([...newMessages, assistantMsg]);
        // Refresh sidebar sessions for logged-in users
        if (user) setTimeout(loadSessions, 500);
      } else {
        setError("Failed to get a response. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
  }

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#F8F8F0] relative">

      {/* ── Sidebar: Chat History ── */}
      {user && (
        <>
          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}
          <aside className={`
            fixed lg:relative z-40 lg:z-auto top-0 lg:top-auto left-0 h-full lg:h-auto
            w-72 bg-white border-r-2 border-black flex flex-col
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            lg:w-64 xl:w-72 flex-shrink-0
          `} style={{ marginTop: sidebarOpen ? "0" : undefined }}>
            <div className="p-4 border-b-2 border-black flex items-center justify-between">
              <span className="font-black text-sm">Chat History</span>
              <button onClick={startNewChat}
                className="text-xs font-black bg-lime border-2 border-black px-3 py-1.5 rounded-xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
                + New Chat
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {loadingSessions ? (
                <div className="text-center py-8 text-sm text-gray-400 animate-pulse">Loading…</div>
              ) : sessions.length === 0 ? (
                <div className="text-center py-8 text-xs text-gray-400 px-4">
                  <div className="text-2xl mb-2">💬</div>
                  No chats yet. Start a conversation!
                </div>
              ) : (
                sessions.map((s) => (
                  <button key={s.id} onClick={() => loadSession(s)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl group flex items-center justify-between gap-2 transition-all ${
                      s.id === sessionId ? "bg-lime border-2 border-black shadow-brutal-sm" : "hover:bg-gray-50 border-2 border-transparent"
                    }`}>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{s.preview || "Chat"}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{timeAgo(s.updated_at)}</div>
                    </div>
                    <button onClick={(e) => deleteSession(s.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all text-xs px-1">✕</button>
                  </button>
                ))
              )}
            </div>
          </aside>
        </>
      )}

      {/* ── Main Chat Area ── */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Header */}
        <div className="bg-white border-b-2 border-black px-4 py-3 flex items-center gap-3 flex-shrink-0">
          {user && (
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden w-9 h-9 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-black transition-all flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <div className="w-9 h-9 bg-lime border-2 border-black rounded-xl flex items-center justify-center text-lg font-black shadow-brutal-sm flex-shrink-0">🤖</div>
          <div className="flex-1 min-w-0">
            <div className="font-black text-brand text-sm">StrainBot</div>
            <div className="text-[10px] text-gray-400">Cannabis Expert AI · Powered by Gemini</div>
          </div>
          <div className="flex items-center gap-2">
            {isPro ? (
              <span className="text-xs font-bold bg-lime border border-black px-2.5 py-1 rounded-full">✨ Pro</span>
            ) : user ? (
              <span className="text-xs font-bold text-gray-400">
                {chatsRemaining} left ·{" "}
                <Link href="/account?tab=subscription" className="text-brand underline">Go Pro</Link>
              </span>
            ) : (
              <Link href="/login?redirect=/chat"
                className="text-xs font-black bg-lime border-2 border-black px-3 py-1.5 rounded-lg shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
                Sign in →
              </Link>
            )}
            {messages.length > 0 && (
              <button onClick={startNewChat}
                className="text-xs text-gray-400 hover:text-brand px-2.5 py-1 border border-gray-200 rounded-lg transition-all">
                New
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
          {messages.length === 0 && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="text-5xl mb-3">🌿</div>
                <h1 className="text-2xl font-black text-brand mb-2">Ask StrainBot anything</h1>
                <p className="text-gray-500 text-sm">Cannabis strains, growing tips, terpenes, effects — I know it all.</p>
                {!user && (
                  <div className="mt-3 inline-flex items-center gap-2 bg-lime-pale border-2 border-black rounded-xl px-4 py-2 text-xs font-bold">
                    💡 <Link href="/login?redirect=/chat" className="underline">Sign in</Link> to save your chat history
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUGGESTED.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)}
                    className="text-left px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium hover:border-black hover:bg-lime-pale transition-all leading-snug">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className="max-w-3xl mx-auto w-full">
              <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 bg-lime border-2 border-black rounded-lg flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">🤖</div>
                )}
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-black text-white rounded-br-sm font-medium"
                    : "bg-white border-2 border-black rounded-bl-sm shadow-brutal-sm"
                }`}>
                  {msg.role === "assistant" ? <MarkdownText text={msg.content} /> : msg.content}
                </div>
              </div>

              {/* Strain cards below assistant message */}
              {msg.role === "assistant" && msg.strains && msg.strains.length > 0 && (
                <div className="mt-3 ml-9">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {msg.strains.map((strain) => (
                      <StrainCardItem key={strain.slug} strain={strain} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start max-w-3xl mx-auto w-full">
              <div className="w-7 h-7 bg-lime border-2 border-black rounded-lg flex items-center justify-center text-xs mr-2 flex-shrink-0">🤖</div>
              <div className="bg-white border-2 border-black rounded-2xl rounded-bl-sm px-4 py-3 shadow-brutal-sm">
                <div className="flex gap-1.5 items-center h-5">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="max-w-3xl mx-auto w-full">
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl px-4 py-3 text-sm text-red-600 font-medium flex items-center justify-between gap-4">
                <span>{error}</span>
                {!isPro && (
                  <Link href="/account?tab=subscription"
                    className="flex-shrink-0 bg-lime border-2 border-black rounded-lg px-3 py-1 text-brand text-xs font-black shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
                    Get Pro →
                  </Link>
                )}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t-2 border-black px-4 py-3 flex-shrink-0">
          <div className="max-w-3xl mx-auto flex gap-3 items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder={canChat ? "Ask about strains, growing, terpenes…" : "Upgrade to Pro for unlimited messages"}
              disabled={loading}
              rows={1}
              className="flex-1 px-4 py-3 bg-gray-100 border-2 border-gray-200 focus:border-black focus:bg-white rounded-2xl text-sm font-medium resize-none outline-none transition-all placeholder:text-gray-400 disabled:opacity-50 overflow-hidden"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-11 h-11 bg-lime border-2 border-black rounded-xl flex items-center justify-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-brutal-sm flex-shrink-0"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <p className="text-center text-xs text-gray-300 mt-1.5">Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
}
