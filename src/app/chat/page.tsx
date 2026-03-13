"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

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

// ─── Suggested prompts ────────────────────────────────────────────────────────
const SUGGESTED = [
  "Best 3 Sativa strains for energy 🚀",
  "What strain helps with anxiety?",
  "Top Indica strains for deep sleep 😴",
  "Highest THC strains right now?",
  "Best strains for focus and creativity",
  "Easy strains to grow for beginners 🌱",
  "What terpenes help with pain?",
  "Best CBD strains for daytime use",
  "How do I fix yellow leaves on my plant?",
  "Recommend a hybrid under 20% THC",
];

// ─── Strain name auto-link map ────────────────────────────────────────────────
const STRAIN_LINKS: Record<string, string> = {
  "OG Kush": "og-kush", "Blue Dream": "blue-dream", "Sour Diesel": "sour-diesel",
  "Girl Scout Cookies": "girl-scout-cookies", "GSC": "girl-scout-cookies",
  "Granddaddy Purple": "granddaddy-purple", "GDP": "granddaddy-purple",
  "Northern Lights": "northern-lights", "Jack Herer": "jack-herer",
  "White Widow": "white-widow", "Pineapple Express": "pineapple-express",
  "Gorilla Glue #4": "gorilla-glue-4", "Gorilla Glue": "gorilla-glue-4", "GG4": "gorilla-glue-4",
  "Wedding Cake": "wedding-cake", "Gelato": "gelato", "Zkittlez": "zkittlez",
  "Durban Poison": "durban-poison", "Amnesia Haze": "amnesia-haze",
  "Bruce Banner": "bruce-banner", "Green Crack": "green-crack",
  "Super Lemon Haze": "super-lemon-haze", "Purple Haze": "purple-haze",
  "AK-47": "ak-47", "Trainwreck": "trainwreck", "Chemdawg": "chemdawg",
  "Strawberry Cough": "strawberry-cough", "Bubba Kush": "bubba-kush",
  "Purple Punch": "purple-punch", "Sunset Sherbet": "sunset-sherbet",
  "Runtz": "runtz", "Ice Cream Cake": "ice-cream-cake",
  "Do-Si-Dos": "do-si-dos", "Mimosa": "mimosa",
  "Banana Kush": "banana-kush", "Lemon Haze": "lemon-haze",
  "Super Silver Haze": "super-silver-haze", "Candy Kush": "candy-kush",
  "Mango Kush": "mango-kush",
};

function linkifyStrains(html: string): string {
  Object.entries(STRAIN_LINKS).forEach(([name, slug]) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?<![">])\\b${escaped}\\b(?![^<]*>)`, "g");
    html = html.replace(regex,
      `<a href="/strains/${slug}" class="text-brand font-bold underline hover:text-lime-600 transition-colors">${name}</a>`
    );
  });
  return html;
}

// ─── Markdown renderer ────────────────────────────────────────────────────────
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

// ─── Strain Card ──────────────────────────────────────────────────────────────
function StrainCardItem({ strain }: { strain: StrainCard }) {
  const typeColor = strain.type === "Sativa"
    ? "bg-yellow-100 text-yellow-700 border-yellow-300"
    : strain.type === "Indica"
    ? "bg-purple-100 text-purple-700 border-purple-300"
    : "bg-green-100 text-green-700 border-green-300";

  return (
    <Link href={`/strains/${strain.slug}`}
      className="group flex flex-col bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal-sm hover:shadow-brutal hover:-translate-y-1 transition-all duration-200">
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

// ─── Helpers ──────────────────────────────────────────────────────────────────
function newSessionId() {
  return `cs_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
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
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Persist to localStorage on every change
  useEffect(() => {
    try { localStorage.setItem("sh_chat_messages", JSON.stringify(messages)); } catch { /**/ }
  }, [messages]);
  useEffect(() => {
    try { localStorage.setItem("sh_chat_session_id", sessionId); } catch { /**/ }
  }, [sessionId]);

  // Scroll to bottom
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  // Load sidebar sessions
  const loadSessions = useCallback(async () => {
    if (!user) return;
    setLoadingSessions(true);
    try {
      const res = await fetch(`/api/chat/sessions?userId=${user.id}`);
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch { /**/ }
    setLoadingSessions(false);
  }, [user]);

  useEffect(() => { if (user) loadSessions(); }, [user, loadSessions]);

  // ── New chat: clear state, refresh sidebar ──
  function startNewChat() {
    const newId = newSessionId();
    setMessages([]);
    setSessionId(newId);
    setError("");
    setInput("");
    setSidebarOpen(false);
    try {
      localStorage.setItem("sh_chat_messages", "[]");
      localStorage.setItem("sh_chat_session_id", newId);
    } catch { /**/ }
    // Refresh sidebar so last chat appears immediately
    if (user) loadSessions();
  }

  // ── Load a past session ──
  function loadSession(session: ChatSession) {
    const msgs = session.messages || [];
    setMessages(msgs);
    setSessionId(session.id);
    setError("");
    setSidebarOpen(false);
    try {
      localStorage.setItem("sh_chat_messages", JSON.stringify(msgs));
      localStorage.setItem("sh_chat_session_id", session.id);
    } catch { /**/ }
  }

  // ── Delete a session ──
  async function deleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await fetch("/api/chat/sessions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: id, userId: user?.id }),
      });
      setSessions((prev) => prev.filter((s) => s.id !== id));
      if (sessionId === id) startNewChat();
    } catch { /**/ }
    setDeletingId(null);
  }

  // ── Send message ──
  async function sendMessage(text?: string) {
    const content = (text || input).trim();
    if (!content || loading) return;

    const allowed = await trackChat();
    if (!allowed) {
      setError("You've used your free messages today. Upgrade to Pro for unlimited chat.");
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
        body: JSON.stringify({ messages: newMessages, userId: user?.id || null, sessionId }),
      });
      const data = await res.json();

      if (data.message) {
        const assistantMsg: Message = {
          role: "assistant",
          content: data.message,
          strains: data.strains || [],
        };
        setMessages((prev) => [...prev, assistantMsg]);
        // ✅ Refresh sidebar after every reply so new sessions appear immediately
        if (user) setTimeout(() => loadSessions(), 600);
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch {
      setError("Network error — please try again.");
    }
    setLoading(false);
  }

  // ── Textarea auto-resize ──
  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-50">

      {/* ── Sidebar ── */}
      {user && (
        <>
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}
          <aside className={`
            fixed lg:relative z-40 lg:z-auto top-0 left-0 h-full
            w-72 lg:w-64 xl:w-72 bg-white border-r-2 border-black flex flex-col flex-shrink-0
            transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}>
            {/* Sidebar header */}
            <div className="p-4 border-b-2 border-black flex items-center justify-between gap-2">
              <span className="font-black text-sm">Chat History</span>
              <button onClick={startNewChat}
                className="text-xs font-black bg-lime border-2 border-black px-3 py-1.5 rounded-xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all whitespace-nowrap">
                + New Chat
              </button>
            </div>

            {/* Session list */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {loadingSessions ? (
                <div className="text-center py-8 text-xs text-gray-400 animate-pulse">Loading…</div>
              ) : sessions.length === 0 ? (
                <div className="text-center py-10 text-xs text-gray-400 px-4">
                  <div className="text-3xl mb-2">💬</div>
                  No chats yet.<br />Start a conversation!
                </div>
              ) : (
                sessions.map((s) => (
                  <div key={s.id}
                    onClick={() => loadSession(s)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-2 cursor-pointer transition-all ${
                      s.id === sessionId
                        ? "bg-lime border-2 border-black shadow-brutal-sm"
                        : "hover:bg-gray-50 border-2 border-transparent hover:border-gray-200"
                    }`}>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate leading-snug">{s.preview || "Chat session"}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{timeAgo(s.updated_at)}</div>
                    </div>
                    {/* Delete button — always visible, not hidden */}
                    <button
                      onClick={(e) => deleteSession(s.id, e)}
                      disabled={deletingId === s.id}
                      title="Delete chat"
                      className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg transition-all
                        ${deletingId === s.id
                          ? "opacity-40 cursor-not-allowed"
                          : "text-gray-300 hover:text-red-400 hover:bg-red-50"
                        }`}>
                      {deletingId === s.id ? (
                        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          </aside>
        </>
      )}

      {/* ── Main chat area ── */}
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
            <div className="text-[10px] text-gray-400">Cannabis Expert · Powered by Gemini</div>
          </div>
          <div className="flex items-center gap-2">
            {isPro ? (
              <span className="text-xs font-bold bg-lime border border-black px-2.5 py-1 rounded-full">✨ Pro</span>
            ) : user ? (
              <span className="text-xs font-medium text-gray-400">
                {chatsRemaining} left ·{" "}
                <Link href="/account?tab=subscription" className="text-brand underline font-bold">Go Pro</Link>
              </span>
            ) : (
              <Link href="/login?redirect=/chat"
                className="text-xs font-black bg-lime border-2 border-black px-3 py-1.5 rounded-lg shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
                Sign in →
              </Link>
            )}
            {messages.length > 0 && (
              <button onClick={startNewChat}
                className="text-xs text-gray-400 hover:text-brand px-2.5 py-1 border border-gray-200 rounded-lg hover:border-gray-400 transition-all">
                New
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">

          {/* Empty state */}
          {messages.length === 0 && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="text-5xl mb-3">🌿</div>
                <h1 className="text-2xl font-black text-brand mb-2">Ask StrainBot anything</h1>
                <p className="text-gray-500 text-sm">Cannabis strains, growing tips, terpenes, effects — I know it all.</p>
                {!user && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-lime-pale border-2 border-black rounded-xl px-4 py-2 text-xs font-bold">
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

          {/* Message list */}
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
              {/* Strain cards */}
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

          {/* Loading dots */}
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

          {/* Error */}
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

        {/* Input bar */}
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
              className="flex-1 px-4 py-3 bg-gray-100 border-2 border-gray-200 focus:border-black focus:bg-white rounded-2xl text-sm font-medium resize-none outline-none transition-all placeholder:text-gray-400 disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-12 h-12 bg-lime border-2 border-black rounded-2xl flex items-center justify-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-brutal-sm disabled:hover:translate-y-0 flex-shrink-0">
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              )}
            </button>
          </div>
          <div className="max-w-3xl mx-auto mt-1.5 text-center text-[10px] text-gray-300">
            StrainBot can make mistakes. Always verify important grow decisions.
          </div>
        </div>
      </div>
    </div>
  );
}
