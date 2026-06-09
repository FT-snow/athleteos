"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BentoCard } from "@/components/FeatureCard";
import { getLatestQuizLog, formatQuizLogSummary } from "@/lib/quiz-data";

interface CoachAdviceProps {
  context?: string;
  placeholder?: string;
}

export function CoachAdvice({ context = "general", placeholder = "Ask your coach..." }: CoachAdviceProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    try {
      const resp = await fetch("/api/analyze-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "coach", context, prompt: question }),
      });

      if (!resp.ok) throw new Error("Request failed");
      const data = await resp.json();
      const reply = data.cues?.join("\n") || data.advice || "No response";
      setMessages((prev) => [...prev, { role: "coach", content: reply }]);
    } catch {
      const log = getLatestQuizLog();
      const fallback = log ? formatQuizLogSummary(log) : "Sorry, unable to get advice right now.";
      setMessages((prev) => [...prev, { role: "coach", content: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <BentoCard variant="flat" hoverEffect="none">
      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">
          Coach&apos;s Advice
        </p>

        <div className="max-h-64 space-y-3 overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-xs text-[var(--teal-deep)] italic">
              Ask a question to get coaching advice...
            </p>
          )}
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg px-3 py-2 text-xs max-w-[80%] ${
                    m.role === "user"
                      ? "bg-[var(--teal-accent)] text-[var(--background)]"
                      : "border border-[var(--border)] text-[var(--teal-light)]"
                  }`}
                >
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs text-[var(--teal-deep)] font-heading-tech">
                <span className="animate-pulse">Thinking</span>
                <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>.</span>
                <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>.</span>
                <span className="animate-pulse" style={{ animationDelay: "0.6s" }}>.</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex gap-2">
          <textarea
            ref={textRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="flex-1 resize-none rounded border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--teal-deep)] focus:border-[var(--teal-accent)] focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="rounded bg-[var(--teal-accent)] px-3 py-2 text-xs text-[var(--background)] transition-all hover:bg-[var(--teal-mid)] disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
    </BentoCard>
  );
}
