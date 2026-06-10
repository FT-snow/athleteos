"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ArrowUp, Dumbbell, Apple, Moon, Activity, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import { useQuery } from "convex/react"
import { api } from "@convex/api"
import { getLatestQuizLog, formatQuizLogSummary, type QuizLog } from "@/lib/quiz-data"

interface Message {
  role: "user" | "coach"
  text: string
}

const quickActions = [
  { icon: Dumbbell, label: "Plan my training", desc: "Build a custom workout plan" },
  { icon: Apple, label: "Log what I ate", desc: "Track nutrition & macros" },
  { icon: Moon, label: "Check my recovery", desc: "Sleep & HRV analysis" },
  { icon: Activity, label: "Check my stats", desc: "ACWR, soreness & load" },
  { icon: Brain, label: "Ask anything", desc: "General performance Q&A" },
]

export function AICoachView() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const athleteId = typeof window !== "undefined" ? localStorage.getItem("athlete_id") : null
  const convexLogs = useQuery(api.dailyLogs.listRecent, { athleteId: athleteId ?? "", limit: 30 })

  const latestLog = useMemo(() => {
    if (convexLogs && convexLogs.length > 0) {
      return convexLogs[0] as unknown as QuizLog
    }
    return getLatestQuizLog()
  }, [convexLogs])

  const hasUserMessages = messages.some(m => m.role === "user")

  const initialized = useRef(false)
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    if (latestLog && messages.length === 0) {
      setMessages([{ role: "coach", text: formatQuizLogSummary(latestLog) }])
    }
  }, [latestLog])

  const coachContext = useMemo(() => {
    if (!latestLog) return ""
    const zones = latestLog.soreness.map(s => `${s.zone} (${s.rating}/5)`).join(", ") || "none"
    return `ATHLETE DATA — Sleep: ${latestLog.sleepHours}h/${latestLog.sleepQuality}/10, Energy: ${latestLog.morningEnergy}/10, HRV feel: ${latestLog.morningFeel}/10, RHR: ${latestLog.restingHr}, Motivation: ${latestLog.motivation}/10, Stress: ${latestLog.stress}/10, Focus: ${latestLog.focus}/10, Soreness: ${zones}, Training load: ${latestLog.trainingLoad}/10`
  }, [latestLog])

  const requestCoachReply = async (prompt: string) => {
    const resp = await fetch("/api/analyze-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "coach", context: coachContext, prompt }),
    })

    if (!resp.ok) {
      throw new Error("Request failed")
    }

    const data = await resp.json()
    return [data.advice, ...(data.cues || [])].filter(Boolean).join("\n")
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const text = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", text }])
    setLoading(true)

    try {
      const reply = await requestCoachReply(text)
      if (reply) {
        setMessages(prev => [...prev, { role: "coach", text: reply }])
      } else {
        setMessages(prev => [
          ...prev,
          { role: "coach", text: latestLog ? formatQuizLogSummary(latestLog) : "I understood your question. Could you provide more detail?" },
        ])
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        { role: "coach", text: latestLog ? formatQuizLogSummary(latestLog) : "AI Coach is currently unavailable. Please try again later." },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleActionClick = async (label: string) => {
    if (loading) return
    setMessages(prev => [...prev, { role: "user", text: label }])
    setLoading(true)

    try {
      const reply = await requestCoachReply(`I want to: ${label}. Give me specific advice.`)
      if (reply) {
        setMessages(prev => [...prev, { role: "coach", text: reply }])
      } else {
        setMessages(prev => [
          ...prev,
          { role: "coach", text: latestLog ? formatQuizLogSummary(latestLog) : "I'll help with that. Can you tell me more?" },
        ])
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "coach", text: latestLog ? formatQuizLogSummary(latestLog) : "AI Coach is currently unavailable. Please try again later." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full min-h-[70vh] w-full bg-transparent">

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[75%] rounded-[4px] px-4 py-3 text-sm leading-relaxed",
              msg.role === "user"
                ? "bg-[var(--teal-accent)]/20 text-[var(--foreground)]"
                : "border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)]"
            )}>
              {msg.role === "coach" && (
                <span className="mb-1.5 inline-flex items-center gap-1 rounded-[4px] bg-[var(--teal-accent)]/15 px-1.5 py-0.5 text-[10px] font-medium text-[var(--teal-accent)]">AI</span>
              )}
              <div className="prose prose-invert prose-xs max-w-none [&_p]:text-sm [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:text-sm [&_strong]:text-[var(--teal-light)] [&_code]:bg-[rgba(255,255,255,0.06)] [&_code]:px-1 [&_code]:rounded-[2px] [&_code]:text-xs">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="border border-[var(--card-border)] bg-[var(--card)] rounded-[4px] px-4 py-3">
              <span className="text-sm text-[var(--teal-muted)]">Thinking...</span>
            </div>
          </div>
        )}

        {!hasUserMessages && !loading && (
          <div className="pt-2">
            <p className="mb-3 text-sm font-medium text-[var(--teal-muted)]">What do you want to explore?</p>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {quickActions.map(({ icon: Icon, label, desc }) => (
                <button
                  key={label}
                  onClick={() => handleActionClick(label)}
                  className="flex flex-col items-center gap-1 rounded-[4px] border border-[var(--card-border)] bg-[var(--card)] p-2 text-center transition-all hover:scale-[1.02] hover:border-[var(--card-border-hover)]"
                >
                  <Icon className="h-4 w-4 text-[var(--teal-accent)]" />
                  <span className="text-[10px] font-medium text-[var(--foreground)] leading-tight">{label}</span>
                  <span className="text-[8px] leading-tight text-[var(--teal-muted)] hidden sm:block">{desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 py-4 border-t border-[var(--border)]">
        <div className="flex items-end gap-2 rounded-[4px] border border-[var(--card-border)] bg-[var(--card)] p-2 transition-colors focus-within:border-[var(--teal-accent)]/50">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Ask your coach..."
            rows={1}
            className="max-h-[120px] min-h-[48px] flex-1 resize-none border-none bg-transparent px-3 py-3 text-sm text-[var(--foreground)] placeholder-[var(--teal-muted)] outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="mb-1 mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-[var(--teal-accent)] text-black transition-all hover:bg-[var(--teal-mid)] disabled:opacity-30"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  )
}
