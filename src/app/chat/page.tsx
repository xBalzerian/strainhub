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

// ─── Constants ────────────────────────────────────────────────────────────────
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

const STRAIN_LINKS: Record<string, string> = {
  "OG Kush": "og-kush", "Blue Dream": "blue-dream", "Sour Diesel": "sour-diesel",
  "Girl Scout Cookies": "girl-scout-cookies", "GSC": "girl-scout-cookies",
  "Granddaddy Purple": "granddaddy-purple", "GDP": "granddaddy-purple",
  "Northern Lights": "northern-lights", "Jack Herer": "jack-herer",
  "White Widow": "white-widow", "Pineapple Express": "pineapple-express",
  "Gorilla Glue #4": "gorilla-glue-4", "GG4": "gorilla-glue-4",
  "Wedding Cake": "wedding-cake", "Gelato": "gelato", "Zkittlez": "zkittlez",
  "Durban Poison": "durban-poison", "Amnesia Haze": "amnesia-haze",
  "Bruce Banner": "bruce-banner", "Green Crack": "green-crack",
  "Super Lemon Haze": "super-lemon-haze", "Purple Haze": "purple-haze",
  "AK-47": "ak-47", "Trainwreck": "trainwreck", "Chemdawg": "chemdawg",
  "Strawberry Cough": "strawberry-cough", "Bubba Kush": "bubba-kush",
  "Purple Punch": "purple-punch", "Sunset Sherbet": "sunset-sherbet",
  "Runtz": "runtz", "Ice Cream Cake": "ice-cream-cake",
};

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

function StrainCardItem({ strain }: { strain: StrainCard }) {
  const typeStyle =
    strain.type === "Sativa" ? "bg-yellow-100 text-yellow-700 border-yellow-300" :
    strain.type === "Indica" ? "bg-purple-100 text-purple-700 border-purple-300" :
    "bg-green-100 text-green-700 border-green-300";
  return (
    <Link href={`/strains/${strain.slug}`}
      className="group flex flex-col bg-white border-2 border-black rounded-xl overflow-hidden hover:shadow-brutal hover:-translate-y-0.5 transition-all duration-200">
      <div className="relative h-24 bg-gray-100 overflow-hidden flex-shrink-0">
        {strain.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={strain.image_url} alt={strain.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">🌿</div>
        )}
        <span className={`absolute top-1.5 left-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full border ${typeStyle}`}>
          {strain.type}
        </span>
      </div>
      <div className="p-2 flex flex-col gap-1">
        <div className="font-black text-xs leading-tight">{strain.name}</div>
        <div className="flex gap-2 text-[10px] text-gray-500 font-medium">
          <span>THC {strain.thc_min}–{strain.thc_max}%</span>
          {strain.cbd_max > 0.5 && <span>CBD {strain.cbd_max}%</span>}
        </div>
        {strain.effects?.length > 0 && (
          <div className="flex flex-wrap gap-0.5">
            {strain.effects.slice(0, 2).map((e) => (
              <span key={e} className="text-[9px] bg-gray-100 rounded-full px-1.5 py-0.5">{e}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
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
  const [historyUnavailable, setHistoryUnavailable] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Persist
  useEffect(() => { try { localStorage.setItem("sh_chat_messages", JSON.stringify(messages)); } catch { /**/ } }, [messages]);
  useEffect(() => { try { localStorage.setItem("sh_chat_session_id", sessionId); } catch { /**/ } }, [sessionId]);

  // Scroll to bottom — only scroll the messages container, not the page
  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);
  useEffect(() => { scrollToBottom(); }, [messages, loading, scrollToBottom]);

  // Sessions
  const loadSessions = useCallback(async () => {
    if (!user) return;
    setLoadingSessions(true);
    try {
      const res = await fetch(`/api/chat/sessions?userId=${user.id}`);
      const data = await res.json();
      if (data.warning === "service_key_invalid") { setHistoryUnavailable(true); }
      else { setSessions(data.sessions || []); setHistoryUnavailable(false); }
    } catch { setHistoryUnavailable(true); }
    setLoadingSessions(false);
  }, [user]);
  useEffect(() => { if (user) loadSessions(); }, [user, loadSessions]);

  const saveCurrentSession = useCallback(async (msgs: Message[], sid: string) => {
    if (!user || msgs.length === 0) return;
    try {
      await fetch("/api/chat/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sid, userId: user.id, messages: msgs,
          preview: msgs.find(m => m.role === "user")?.content?.slice(0, 80) || "Chat" }),
      });
    } catch { /**/ }
  }, [user]);

  const startNewChat = useCallback(async () => {
    if (user && messages.length > 0) await saveCurrentSession(messages, sessionId);
    const newId = newSessionId();
    setMessages([]); setSessionId(newId); setError(""); setInput(""); setSidebarOpen(false);
    try { localStorage.setItem("sh_chat_messages", "[]"); localStorage.setItem("sh_chat_session_id", newId); } catch { /**/ }
    if (user) setTimeout(() => loadSessions(), 500);
  }, [user, messages, sessionId, saveCurrentSession, loadSessions]);

  function loadSession(session: ChatSession) {
    setMessages(session.messages || []);
    setSessionId(session.id);
    setError(""); setSidebarOpen(false);
    try {
      localStorage.setItem("sh_chat_messages", JSON.stringify(session.messages || []));
      localStorage.setItem("sh_chat_session_id", session.id);
    } catch { /**/ }
  }

  async function deleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation(); setDeletingId(id);
    try {
      await fetch("/api/chat/sessions", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: id, userId: user?.id }),
      });
      setSessions((prev) => prev.filter((s) => s.id !== id));
      if (sessionId === id) startNewChat();
    } catch { /**/ }
    setDeletingId(null);
  }

  async function sendMessage(text?: string) {
    const content = (text || input).trim();
    if (!content || loading) return;
    if (user) {
      const allowed = await trackChat();
      if (!allowed) {
        setError("You've used all your free chats today. Upgrade to Pro for unlimited chat! 🚀");
        return;
      }
    }
    setError("");
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages); setInput(""); setLoading(true);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })), userId: user?.id || null, sessionId }),
      });
      if (!res.ok) { const e = await res.json().catch(() => ({})); setError(e.error || "Something went wrong."); setLoading(false); return; }
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else if (data.message) {
        const assistantMsg: Message = { role: "assistant", content: data.message, strains: data.strains || [] };
        setMessages((prev) => [...prev, assistantMsg]);
        if (user && !historyUnavailable) setTimeout(() => loadSessions(), 600);
      } else { setError("No response received."); }
    } catch { setError("Network error — check your connection."); }
    setLoading(false);
  }

  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    // chat-fullscreen class triggers CSS to hide footer + lock viewport
    <div className="chat-fullscreen flex" style={{ height: "100dvh", paddingTop: "64px", overflow: "hidden" }}>

      {/* ── Sidebar overlay (mobile) ── */}
      {user && sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      {user && (
        <aside className={`
          fixed lg:relative z-40 lg:z-auto
          w-64 bg-white border-r-2 border-black flex flex-col flex-shrink-0
          transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `} style={{ top: "64px", bottom: 0, height: "calc(100dvh - 64px)" }}>

          <div className="px-3 py-2.5 border-b-2 border-black flex items-center justify-between gap-2 flex-shrink-0">
            <span className="font-black text-xs">Chat History</span>
            <button onClick={startNewChat}
              className="text-xs font-black bg-lime border-2 border-black px-2.5 py-1 rounded-lg shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
              + New
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
            {historyUnavailable ? (
              <div className="text-center py-6 px-3">
                <div className="text-xl mb-1">⚠️</div>
                <div className="text-[10px] text-gray-400 leading-relaxed">History unavailable.<br />Messages saved locally.</div>
              </div>
            ) : loadingSessions ? (
              <div className="flex flex-col gap-1 p-2">
                {[1,2,3].map(i => <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />)}
              </div>
            ) : sessions.length === 0 ? (
              <div className="text-center py-8 px-4">
                <div className="text-2xl mb-1.5">💬</div>
                <div className="text-[10px] text-gray-400">No chats yet.<br />Start a conversation!</div>
              </div>
            ) : (
              sessions.map((s) => (
                <div key={s.id} onClick={() => loadSession(s)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between gap-2 cursor-pointer transition-all ${
                    s.id === sessionId ? "bg-lime border-2 border-black" : "hover:bg-gray-50 border-2 border-transparent hover:border-gray-200"
                  }`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold truncate leading-snug">{s.preview || "Chat session"}</div>
                    <div className="text-[9px] text-gray-400 mt-0.5">{timeAgo(s.updated_at)}</div>
                  </div>
                  <button onClick={(e) => deleteSession(s.id, e)} disabled={deletingId === s.id}
                    className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-gray-300 hover:text-red-400 transition-all disabled:opacity-40">
                    {deletingId === s.id ? (
                      <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        </aside>
      )}

      {/* ── Main Chat ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-gray-50">

        {/* Header */}
        <div className="bg-white border-b-2 border-black px-3 py-2 flex items-center gap-2 flex-shrink-0">
          {user && (
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden w-8 h-8 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:border-black transition-all flex-shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          )}
          <div className="w-8 h-8 bg-lime border-2 border-black rounded-lg flex items-center justify-center text-base shadow-brutal-sm flex-shrink-0">🤖</div>
          <div className="flex-1 min-w-0">
            <div className="font-black text-brand text-sm leading-tight">StrainBot</div>
            <div className="text-[9px] text-gray-400 leading-tight">Cannabis Expert · Powered by Gemini</div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {isPro ? (
              <span className="text-[10px] font-bold bg-lime border border-black px-2 py-0.5 rounded-full">✨ Pro</span>
            ) : user ? (
              <span className="text-[10px] text-gray-400">
                {chatsRemaining} left ·{" "}
                <Link href="/account?tab=subscription" className="text-brand underline font-bold">Upgrade</Link>
              </span>
            ) : (
              <Link href="/login?redirect=/chat"
                className="text-xs font-black bg-lime border-2 border-black px-2.5 py-1 rounded-lg shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
                Sign in →
              </Link>
            )}
            {messages.length > 0 && (
              <button onClick={startNewChat}
                className="text-[10px] text-gray-400 hover:text-brand px-2 py-1 border border-gray-200 rounded-lg hover:border-gray-400 transition-all">
                New
              </button>
            )}
          </div>
        </div>

        {/* Messages — this is the ONLY scrollable area */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-3 py-4">
          {messages.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center px-4 pb-4">
              <div className="text-3xl mb-2">🌿</div>
              <h2 className="font-black text-lg mb-1">Ask StrainBot anything</h2>
              <p className="text-xs text-gray-500 mb-5 max-w-xs">Cannabis strains, growing tips, terpenes, effects — I know it all.</p>
              {/* Suggestion chips — compact 2-col grid */}
              <div className="grid grid-cols-2 gap-1.5 w-full max-w-lg">
                {SUGGESTED.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)} disabled={loading}
                    className="text-left text-xs bg-white border-2 border-gray-200 hover:border-black hover:bg-lime/20 rounded-xl px-3 py-2 font-medium transition-all disabled:opacity-50 leading-snug">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className="w-full">
                  <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 bg-lime border-2 border-black rounded-md flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">🤖</div>
                    )}
                    <div className={`max-w-[85%] px-3 py-2.5 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-black text-white rounded-br-sm font-medium"
                        : "bg-white border-2 border-black rounded-bl-sm shadow-brutal-sm"
                    }`}>
                      {msg.role === "assistant"
                        ? <MarkdownText text={msg.content} />
                        : <span>{msg.content}</span>}
                    </div>
                  </div>
                  {msg.role === "assistant" && msg.strains && msg.strains.length > 0 && (
                    <div className="mt-2 ml-8">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {msg.strains.map((strain) => (
                          <StrainCardItem key={strain.slug} strain={strain} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 bg-lime border-2 border-black rounded-md flex items-center justify-center text-xs mr-2 flex-shrink-0">🤖</div>
                  <div className="bg-white border-2 border-black rounded-2xl rounded-bl-sm px-3 py-2.5 shadow-brutal-sm">
                    <div className="flex gap-1 items-center h-4">
                      {[0,150,300].map((d) => (
                        <div key={d} className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl px-3 py-2.5 text-xs text-red-600 font-medium flex items-center justify-between gap-3">
                  <span>{error}</span>
                  {error.includes("free chats") && (
                    <Link href="/account?tab=subscription"
                      className="flex-shrink-0 bg-lime border-2 border-black rounded-lg px-2.5 py-1 text-brand text-xs font-black shadow-brutal-sm hover:shadow-brutal transition-all">
                      Go Pro →
                    </Link>
                  )}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white border-t-2 border-black px-3 py-2.5 flex-shrink-0">
          {!user && messages.length > 2 && (
            <div className="mb-2 flex items-center justify-between gap-2 bg-lime/30 border-2 border-black rounded-lg px-3 py-1.5">
              <span className="text-xs font-bold">💡 Sign in to save this conversation</span>
              <Link href="/login?redirect=/chat" className="text-xs font-black text-brand underline whitespace-nowrap">Sign in →</Link>
            </div>
          )}
          <div className="flex gap-2 items-end max-w-2xl mx-auto">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask about strains, growing, terpenes..."
              rows={1}
              disabled={loading}
              className="flex-1 bg-gray-100 border-2 border-gray-200 focus:border-black focus:bg-white text-brand placeholder:text-gray-400 rounded-xl px-3 py-2.5 text-sm resize-none outline-none transition-all leading-relaxed disabled:opacity-60"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-11 h-11 bg-lime border-2 border-black rounded-xl flex items-center justify-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none flex-shrink-0">
              {loading ? (
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              )}
            </button>
          </div>
          <p className="text-center text-[9px] text-gray-400 mt-1.5">StrainBot can make mistakes. Always verify important decisions.</p>
        </div>
      </div>
    </div>
  );
}
