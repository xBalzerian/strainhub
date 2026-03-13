"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useProStatus } from "@/hooks/useProStatus";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "What strain is best for anxiety?",
  "How do I fix yellow leaves on my plant?",
  "What are the effects of high myrcene strains?",
  "Best Indica for sleep under 20% THC?",
  "How often should I water cannabis seedlings?",
];

function MarkdownText({ text }: { text: string }) {
  const html = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm font-mono">$1</code>')
    .replace(/\n\n/g, "</p><p class='mt-2'>")
    .replace(/\n/g, "<br/>");
  return <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { isPro, canChat, chatsRemaining, trackChat, hydrated } = useProStatus();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const content = (text || input).trim();
    if (!content) return;

    if (!trackChat()) {
      setError("You've used your 5 free messages today. Upgrade to Pro for unlimited chat.");
      return;
    }

    setError("");
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages([...newMessages, { role: "assistant", content: data.message }]);
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

  if (!hydrated) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#F8F8F0]">
      {/* Header */}
      <div className="bg-white border-b-2 border-black px-6 py-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-lime border-2 border-black rounded-xl flex items-center justify-center text-xl font-black shadow-brutal-sm">
          🤖
        </div>
        <div>
          <div className="font-black text-brand">StrainBot</div>
          <div className="text-xs text-gray-400">Powered by Gemini 2.5 Flash · Cannabis Expert AI</div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {isPro ? (
            <span className="text-xs font-bold bg-lime border border-black px-3 py-1 rounded-full">✨ Pro · Unlimited</span>
          ) : (
            <span className="text-xs font-bold text-gray-400">
              {chatsRemaining} msg{chatsRemaining !== 1 ? "s" : ""} left today ·{" "}
              <Link href="/pro" className="text-brand underline">Go Pro</Link>
            </span>
          )}
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-xs text-gray-400 hover:text-brand px-3 py-1 border border-gray-200 rounded-lg transition-all"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">🌿</div>
              <h2 className="text-2xl font-black text-brand mb-2">Ask StrainBot anything</h2>
              <p className="text-gray-500 text-sm">Cannabis strains, growing tips, terpenes, effects — I know it all.</p>
            </div>
            <div className="grid gap-2">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium hover:border-black hover:bg-lime-pale transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} max-w-3xl mx-auto w-full`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 bg-lime border-2 border-black rounded-lg flex items-center justify-center text-sm mr-2 mt-0.5 flex-shrink-0">
                🤖
              </div>
            )}
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-black text-white rounded-br-sm font-medium"
                  : "bg-white border-2 border-black rounded-bl-sm shadow-brutal-sm"
              }`}
            >
              {msg.role === "assistant" ? <MarkdownText text={msg.content} /> : msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start max-w-3xl mx-auto w-full">
            <div className="w-8 h-8 bg-lime border-2 border-black rounded-lg flex items-center justify-center text-sm mr-2 flex-shrink-0">
              🤖
            </div>
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
                <Link href="/pro" className="flex-shrink-0 bg-lime border-2 border-black rounded-lg px-3 py-1 text-brand text-xs font-black shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all">
                  Get Pro →
                </Link>
              )}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t-2 border-black px-4 py-4">
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={canChat ? "Ask about strains, growing, terpenes..." : "Upgrade to Pro for unlimited messages"}
              disabled={!canChat || loading}
              rows={1}
              className="w-full px-4 py-3 pr-12 bg-gray-100 border-2 border-gray-200 focus:border-black focus:bg-white rounded-2xl text-sm font-medium resize-none outline-none transition-all placeholder:text-gray-400 disabled:opacity-50 max-h-32 overflow-y-auto"
              style={{ lineHeight: "1.5" }}
            />
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading || !canChat}
            className="w-11 h-11 bg-lime border-2 border-black rounded-xl flex items-center justify-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-brutal-sm flex-shrink-0"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-gray-300 mt-2">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}
