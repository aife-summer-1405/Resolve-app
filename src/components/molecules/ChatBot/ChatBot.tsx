// src/components/molecules/ChatBot/ChatBot.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME: Msg = {
  role: "assistant",
  content:
    "سلام! من دستیار سفر هستم. درباره شهرها، جاذبه‌ها، بهترین زمان سفر و برنامه‌ریزی سفر در ایران بپرس.",
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== WELCOME) }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? data.error ?? "خطایی رخ داد" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "ارتباط برقرار نشد. دوباره تلاش کن." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="fixed bottom-4 left-12 z-[70]">
      {open && (
        <div className="mb-3 flex h-[460px] w-[calc(100vw-2rem)] max-w-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-surface text-foreground shadow-2xl">
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-[#202020]">
            <span className="text-sm font-semibold">دستیار سفر</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="بستن چت"
              className="transition hover:opacity-70"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-xs leading-6 ${
                    m.role === "user"
                      ? "bg-primary text-[#202020]"
                      : "bg-background text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-end">
                <div className="rounded-2xl bg-background px-3 py-2 text-xs text-muted">
                  در حال نوشتن...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-border p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="سوال سفرت را بنویس..."
              maxLength={500}
              className="h-9 flex-1 rounded-xl border border-border bg-background px-3 text-xs outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="ارسال"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-[#202020] transition hover:opacity-90 disabled:opacity-40"
            >
              <Send size={15} className="rotate-270" />
            </button>
          </div>
        </div>
      )}

<button
  type="button"
  onClick={() => setOpen((v) => !v)}
  aria-label="چت با دستیار سفر"
  className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-[#202020] shadow-lg transition hover:scale-105"
>
  <span className="absolute inset-0 animate-ping rounded-full bg-blue-500 opacity-40" />

  <span className="relative z-10">
    {open ? <X size={22} /> : <Bot  size={22} />}
  </span>
</button>
    </div>
  );
};

export default ChatBot;