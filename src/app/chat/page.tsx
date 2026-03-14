"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

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

const ALL_SUGGESTIONS = [
  "Best 3 Sativa strains for energy 🚀",
  "What strain helps with anxiety?",
  "Top Indica for deep sleep 😴",
  "Highest THC strains right now?",
  "Best strains for focus & creativity",
  "Easy strains to grow for beginners 🌱",
  "What terpenes help with pain?",
  "Best CBD strains for daytime use",
  "How do I fix yellow leaves? 🍂",
  "Recommend a hybrid under 20% THC",
  "Best strain for relaxation after work",
  "What's the difference: Indica vs Sativa?",
  "Best terpenes for euphoria?",
  "Strain for appetite boost 🍕",
  "Best outdoor strain for hot climate ☀️",
  "What is myrcene good for?",
  "Top 3 strains for creative writing",
  "Easiest strain to grow indoors?",
  "Best morning strain for productivity",
  "What strain is good for headaches?",
];
function getRandomSuggestions(count = 10) {
  return [...ALL_SUGGESTIONS].sort(() => Math.random() - 0.5).slice(0, count);
}

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
  "Runtz": "runtz", "Ice Cream Cake": "ice-cream-cake", "Blueberry": "blueberry",
};

function newSessionId() { return `cs_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`; }
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
    html = html.replace(regex, `<a href="/strains/${slug}" class="text-brand font-bold underline hover:text-lime-600 transition-colors">${name}</a>`);
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

// ─── Strain Card ──────────────────────────────────────────────────────────────
function StrainCardItem({ strain }: { strain: StrainCard }) {
  const typeColor =
    strain.type === "Sativa" ? { bg: "#FEF9C3", text: "#92400E", border: "#FDE047" } :
    strain.type === "Indica" ? { bg: "#EDE9FE", text: "#5B21B6", border: "#C4B5FD" } :
    { bg: "#DCFCE7", text: "#166534", border: "#86EFAC" };

  return (
    <Link href={`/strains/${strain.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border-2 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 w-40 flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
      {/* Image — full width square */}
      <div className="relative w-full bg-gray-100 overflow-hidden" style={{ aspectRatio: "1/1" }}>
        {strain.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={strain.image_url} alt={strain.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 text-4xl">🌿</div>
        )}
        {/* Type badge — pill */}
        <span className="absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full border"
          style={{ background: typeColor.bg, color: typeColor.text, borderColor: typeColor.border }}>
          {strain.type}
        </span>
      </div>
      {/* Info */}
      <div className="p-2.5 flex flex-col gap-1">
        <div className="font-black text-[13px] leading-tight truncate">{strain.name}</div>
        <div className="text-[11px] text-gray-500 font-medium">THC {strain.thc_min}–{strain.thc_max}%</div>
        {strain.effects?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-0.5">
            {strain.effects.slice(0, 2).map((e) => (
              <span key={e} className="text-[10px] bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 font-medium">{e}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ChatPage() {
  const { isPro, chatsRemaining, user } = useAuth();

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
  const [suggestions] = useState(() => getRandomSuggestions(10));
  // Local chat count for non-logged-in display (not enforced)
  const [localChatsUsed] = useState(() => {
    if (typeof window === "undefined") return 0;
    const today = new Date().toISOString().split("T")[0];
    try {
      const saved = JSON.parse(localStorage.getItem("sh_guest_chats") || "{}");
      return saved.date === today ? (saved.count || 0) : 0;
    } catch { return 0; }
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { try { localStorage.setItem("sh_chat_messages", JSON.stringify(messages)); } catch { /**/ } }, [messages]);
  useEffect(() => { try { localStorage.setItem("sh_chat_session_id", sessionId); } catch { /**/ } }, [sessionId]);

  const scrollToBottom = useCallback(() => {
    const c = messagesContainerRef.current;
    if (c) c.scrollTop = c.scrollHeight;
  }, []);
  useEffect(() => { scrollToBottom(); }, [messages, loading, scrollToBottom]);

  const loadSessions = useCallback(async () => {
    if (!user) return;
    setLoadingSessions(true);
    try {
      const res = await fetch(`/api/chat/sessions?userId=${user.id}`);
      const data = await res.json();
      if (data.warning === "service_key_invalid") setHistoryUnavailable(true);
      else { setSessions(data.sessions || []); setHistoryUnavailable(false); }
    } catch { setHistoryUnavailable(true); }
    setLoadingSessions(false);
  }, [user]);
  useEffect(() => { if (user) loadSessions(); }, [user, loadSessions]);

  const saveCurrentSession = useCallback(async (msgs: Message[], sid: string) => {
    if (!user || msgs.length === 0) return;
    try {
      await fetch("/api/chat/sessions", {
        method: "POST", headers: { "Content-Type": "application/json" },
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
    setMessages(session.messages || []); setSessionId(session.id); setError(""); setSidebarOpen(false);
    try {
      localStorage.setItem("sh_chat_messages", JSON.stringify(session.messages || []));
      localStorage.setItem("sh_chat_session_id", session.id);
    } catch { /**/ }
  }

  async function deleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation(); setDeletingId(id);
    try {
      await fetch("/api/chat/sessions", { method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: id, userId: user?.id }) });
      setSessions((prev) => prev.filter((s) => s.id !== id));
      if (sessionId === id) startNewChat();
    } catch { /**/ }
    setDeletingId(null);
  }

  async function clearAllSessions() {
    if (!user) return;
    if (!confirm("Delete all chat history? This cannot be undone.")) return;
    try {
      await fetch("/api/chat/sessions", { method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, deleteAll: true }) });
      setSessions([]);
      startNewChat();
    } catch { /**/ }
  }

  // ── Send message — NO frontend trackChat, server handles limit ──────────────
  async function sendMessage(text?: string) {
    const content = (text || input).trim();
    if (!content || loading) return;
    setError("");
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages); setInput(""); setLoading(true);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })), userId: user?.id || null, sessionId }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      if (data.message) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message, strains: data.strains || [] }]);
        if (user && !historyUnavailable) setTimeout(() => loadSessions(), 600);
      } else {
        setError("No response received.");
      }
    } catch {
      setError("Network error — check your connection.");
    }
    setLoading(false);
  }

  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target; el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  const displayChatsLeft = isPro ? null : user ? chatsRemaining : Math.max(0, 5 - localChatsUsed);

  return (
    <div className="chat-fullscreen flex" style={{ height: "calc(100dvh - 64px)", overflow: "hidden" }}>

      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ══ SIDEBAR ══════════════════════════════════════════════════════════ */}
      <aside className={`
        ${user ? "flex" : "hidden lg:hidden"}
        fixed lg:relative z-40 lg:z-auto flex-shrink-0
        w-60 bg-white flex-col
        border-r-2 border-black
        transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `} style={{ top: 0, bottom: 0, height: "100%" }}>

        {/* Sidebar header */}
        <div className="px-4 py-3 border-b-2 border-black flex items-center justify-between flex-shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm tracking-tight">Chat History</span>
            {sessions.length > 0 && (
              <button onClick={clearAllSessions} title="Clear all history"
                className="w-5 h-5 flex items-center justify-center rounded text-gray-300 hover:text-red-400 transition-all">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            )}
          </div>
          <button onClick={startNewChat}
            className="text-[11px] font-black bg-[#AAFF00] border-2 border-black px-3 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all active:translate-y-0 active:shadow-none">
            + New
          </button>
        </div>

        {/* Session list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {historyUnavailable ? (
            <div className="text-center py-8 px-3">
              <div className="text-2xl mb-2">⚠️</div>
              <div className="text-xs text-gray-400">History unavailable</div>
            </div>
          ) : loadingSessions ? (
            <div className="flex flex-col gap-1.5 p-1">{[1,2,3].map(i => <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />)}</div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-10 px-3">
              <div className="text-3xl mb-2">💬</div>
              <div className="text-xs text-gray-400 font-medium">No chats yet</div>
              <div className="text-[11px] text-gray-300 mt-0.5">Start a conversation below</div>
            </div>
          ) : (
            sessions.map((s) => (
              <div key={s.id} onClick={() => loadSession(s)}
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between gap-2 cursor-pointer transition-all group ${
                  s.id === sessionId
                    ? "bg-[#AAFF00] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "hover:bg-gray-50 border-2 border-transparent hover:border-gray-200"
                }`}>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate leading-snug">{s.preview || "Chat session"}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{timeAgo(s.updated_at)}</div>
                </div>
                <button onClick={(e) => deleteSession(s.id, e)} disabled={deletingId === s.id}
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all">
                  {deletingId === s.id ? (
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* ══ MAIN CHAT AREA ═══════════════════════════════════════════════════ */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-gray-50">

        {/* ── Chat Header — professional, clean ── */}
        <div className="bg-white border-b-2 border-black flex-shrink-0">
          <div className="px-4 h-14 flex items-center gap-3">
            {/* Mobile menu toggle */}
            {user && (
              <button onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden w-8 h-8 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-black transition-all flex-shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
            )}

            {/* Bot identity */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="w-9 h-9 bg-[#AAFF00] border-2 border-black rounded-xl flex items-center justify-center text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                🤖
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-sm leading-tight">StrainBot</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" title="Online"></span>
                </div>
                <div className="text-[11px] text-gray-400 leading-tight">Cannabis Expert · Powered by Gemini</div>
              </div>
            </div>

            {/* Right side — usage + actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {isPro ? (
                <span className="flex items-center gap-1 text-[11px] font-black bg-[#AAFF00] border-2 border-black px-2.5 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  ✨ Pro
                </span>
              ) : user ? (
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-[10px] text-gray-400 leading-none">Today</div>
                    <div className="text-xs font-black leading-tight">
                      <span className={chatsRemaining === 0 ? "text-red-500" : "text-gray-800"}>{chatsRemaining}</span>
                      <span className="text-gray-300"> / 5</span>
                    </div>
                  </div>
                  {/* Mini progress bar */}
                  <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <div className="h-full bg-[#AAFF00] rounded-full transition-all"
                      style={{ width: `${Math.max(0, (chatsRemaining / 5) * 100)}%`, background: chatsRemaining <= 1 ? "#EF4444" : "#AAFF00" }} />
                  </div>
                  <Link href="/account?tab=subscription"
                    className="text-[11px] font-black border-2 border-black px-2.5 py-1 rounded-lg hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Upgrade
                  </Link>
                </div>
              ) : (
                <Link href="/login?redirect=/chat"
                  className="text-[11px] font-black bg-[#AAFF00] border-2 border-black px-3 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                  Sign in →
                </Link>
              )}
              {messages.length > 0 && (
                <button onClick={startNewChat}
                  className="text-[11px] font-bold text-gray-400 hover:text-black border-2 border-transparent hover:border-gray-200 px-2.5 py-1 rounded-lg transition-all">
                  New
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Messages area ── */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            /* ── Empty state / suggestions ── */
            <div className="flex flex-col items-center justify-center min-h-full px-4 py-8 text-center">
              <div className="w-16 h-16 bg-[#AAFF00] border-2 border-black rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">🌿</div>
              <h2 className="font-black text-xl mb-1">Ask StrainBot anything</h2>
              <p className="text-sm text-gray-400 mb-6 max-w-sm">Cannabis strains, growing tips, terpenes, effects — I know it all.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-xl">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)} disabled={loading}
                    className="text-left text-[11px] bg-white border-2 border-gray-200 hover:border-black hover:bg-[#AAFF00]/20 rounded-xl px-3 py-2 font-medium transition-all disabled:opacity-50 leading-snug shadow-sm hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
              {messages.map((msg, i) => (
                <div key={i} className="w-full">
                  {/* Message bubble */}
                  <div className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 bg-[#AAFF00] border-2 border-black rounded-xl flex items-center justify-center text-sm flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">🤖</div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-black text-white rounded-br-sm"
                        : "bg-white border-2 border-black rounded-bl-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.08)]"
                    }`}>
                      {msg.role === "assistant"
                        ? <MarkdownText text={msg.content} />
                        : <span className="text-sm font-medium">{msg.content}</span>
                      }
                    </div>
                    {msg.role === "user" && (
                      <div className="w-7 h-7 bg-gray-200 border-2 border-gray-300 rounded-xl flex items-center justify-center text-xs flex-shrink-0">👤</div>
                    )}
                  </div>

                  {/* Strain cards — horizontal scroll */}
                  {msg.role === "assistant" && msg.strains && msg.strains.length > 0 && (
                    <div className="mt-3 ml-10">
                      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin", scrollbarColor: "#e5e7eb transparent" }}>
                        {msg.strains.map((strain) => (
                          <StrainCardItem key={strain.slug} strain={strain} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-8 h-8 bg-[#AAFF00] border-2 border-black rounded-xl flex items-center justify-center text-sm flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">🤖</div>
                  <div className="bg-white border-2 border-black rounded-2xl rounded-bl-sm px-4 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.08)]">
                    <div className="flex gap-1.5 items-center h-4">
                      {[0, 150, 300].map((d) => (
                        <div key={d} className="w-2 h-2 bg-[#AAFF00] border border-black rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
                  <span className="text-xs text-red-600 font-medium">{error}</span>
                  {(error.toLowerCase().includes("upgrade") || error.toLowerCase().includes("pro") || error.toLowerCase().includes("chats")) && (
                    <Link href="/account?tab=subscription"
                      className="flex-shrink-0 bg-[#AAFF00] border-2 border-black rounded-xl px-3 py-1.5 text-black text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                      Go Pro →
                    </Link>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ── Input bar ── */}
        <div className="bg-white border-t-2 border-black px-4 py-3 flex-shrink-0">
          {!user && messages.length > 2 && (
            <div className="mb-2 flex items-center justify-between gap-2 bg-[#AAFF00]/30 border-2 border-black/20 rounded-xl px-3 py-1.5">
              <span className="text-[11px] font-bold">💡 Sign in to save your conversation</span>
              <Link href="/login?redirect=/chat" className="text-[11px] font-black text-black underline whitespace-nowrap">Sign in →</Link>
            </div>
          )}
          <div className="flex gap-2 items-end max-w-2xl mx-auto">
            <textarea ref={textareaRef} value={input} onChange={handleTextareaInput} onKeyDown={handleKeyDown}
              placeholder="Ask about strains, growing, terpenes..." rows={1} disabled={loading}
              className="flex-1 bg-gray-100 border-2 border-gray-200 focus:border-black focus:bg-white text-gray-900 placeholder:text-gray-400 rounded-2xl px-4 py-2.5 text-sm resize-none outline-none transition-all leading-relaxed disabled:opacity-60"
              style={{ minHeight: "44px", maxHeight: "120px" }} />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
              className="w-11 h-11 bg-[#AAFF00] border-2 border-black rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex-shrink-0">
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              )}
            </button>
          </div>
          <p className="text-center text-[10px] text-gray-300 mt-2">StrainBot can make mistakes. Always verify important decisions.</p>
        </div>
      </div>
    </div>
  );
}
