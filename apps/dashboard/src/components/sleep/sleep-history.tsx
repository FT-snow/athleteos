"use client"

import { useEffect, useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@convex/api"
import { Trash2, Star, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { SleepEntry, getAllSleepLogs, deleteSleepLog, convexToSleepEntry } from "@/lib/sleep-storage"
import { SleepRing } from "./sleep-ring"

interface SleepHistoryProps {
  refreshKey: number
  userId?: string
}

export function SleepHistory({ refreshKey, userId }: SleepHistoryProps) {
  const [logs, setLogs] = useState<SleepEntry[]>([])
  const [mounted, setMounted] = useState(false)

  const convexLogs = useQuery(
    api.sleep.getSleepLogs,
    userId ? { userId: userId as any } : "skip",
  )
  const convexDelete = useMutation(api.sleep.logSleep)

  useEffect(() => {
    if (convexLogs) {
      setLogs(convexLogs.map((l: any) => convexToSleepEntry(l)))
      setMounted(true)
      return
    }
    setLogs(getAllSleepLogs())
    setMounted(true)
  }, [convexLogs, refreshKey])

  const handleDelete = async (id: string) => {
    deleteSleepLog(id)
    setLogs(getAllSleepLogs())
  }

  const durationColor = (d: number) =>
    d >= 8 ? "text-green-400" :
    d >= 6 ? "text-amber-400" :
    "text-red-400"

  const durationBg = (d: number) =>
    d >= 8 ? "border-green-400/20 bg-green-400/5" :
    d >= 6 ? "border-amber-400/20 bg-amber-400/5" :
    "border-red-400/20 bg-red-400/5"

  if (!mounted) return null

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16
                      text-[var(--teal-muted)] border border-[var(--card-border)] rounded-[4px] bg-[var(--card)]">
        <Moon className="w-10 h-10 mb-3 opacity-30" />
        <p className="text-sm">No sleep logs yet.</p>
        <p className="text-xs mt-1">Log your first night above.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-page-title text-[var(--foreground)] mb-4">Sleep History</h2>
      <div className="space-y-3">
        {logs.map((entry) => (
          <div
            key={entry.id}
            className={cn(
              "flex items-center gap-4 p-4 rounded-[4px] border transition-all",
              "bg-[var(--card)] border-[var(--card-border)] hover:border-[var(--card-border-hover)]"
            )}
          >
            <SleepRing duration={entry.duration} size={72} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[var(--foreground)] text-sm">
                  {new Date(entry.date + "T12:00:00").toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full border font-medium",
                    durationBg(entry.duration),
                    durationColor(entry.duration)
                  )}
                >
                  {entry.duration}h
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-[var(--teal-muted)]">
                <span>Moon {entry.bedtime}</span>
                <span>&rarr;</span>
                <span>Sun {entry.waketime}</span>
              </div>

              <div className="flex items-center gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      "w-3.5 h-3.5",
                      s <= entry.quality
                        ? "fill-amber-400 text-amber-400"
                        : "text-[var(--teal-dark)]"
                    )}
                  />
                ))}
              </div>

              {entry.notes && (
                <p className="text-xs text-[var(--teal-muted)] mt-1.5 truncate">
                  &ldquo;{entry.notes}&rdquo;
                </p>
              )}
            </div>

            <button
              onClick={() => handleDelete(entry.id)}
              className="p-2 rounded-[4px] text-[var(--teal-muted)] hover:text-red-400
                         hover:bg-red-400/10 transition-colors shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
