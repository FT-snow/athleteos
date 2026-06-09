"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@convex/api"
import { Moon, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { addSleepLog, calcDuration } from "@/lib/sleep-storage"

interface SleepLogFormProps {
  onLogged: () => void
  userId?: string
}

export function SleepLogForm({ onLogged, userId }: SleepLogFormProps) {
  const [bedtime, setBedtime] = useState("23:00")
  const [waketime, setWaketime] = useState("07:00")
  const [quality, setQuality] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const logSleepMutation = useMutation(api.sleep.logSleep)

  const today = new Date().toISOString().split("T")[0]

  const previewDuration = bedtime && waketime
    ? calcDuration(bedtime, waketime)
    : null

  const handleSubmit = async () => {
    if (!bedtime || !waketime) {
      setError("Please set both bedtime and wake time.")
      return
    }
    if (quality === 0) {
      setError("Please rate your sleep quality.")
      return
    }
    setError("")
    setLoading(true)
    try {
      const duration = calcDuration(bedtime, waketime)

      if (userId) {
        try {
          await logSleepMutation({
            userId: userId as any,
            date: today,
            bedtime,
            waketime,
            duration,
            quality,
            notes: notes || undefined,
          })
        } catch (e) {
          console.error("Convex save failed, falling back to localStorage", e)
          addSleepLog({ date: today, bedtime, waketime, quality, notes })
        }
      } else {
        addSleepLog({ date: today, bedtime, waketime, quality, notes })
      }

      setSuccess(true)
      setNotes("")
      setQuality(0)
      onLogged()
      setTimeout(() => setSuccess(false), 3000)
    } catch {
      setError("Failed to save. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-[4px] border border-[rgba(121,187,195,0.12)] bg-[rgba(5,14,18,0.75)] p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Moon className="w-5 h-5 text-[var(--teal-accent)]" />
        <h2 className="font-ui text-[var(--foreground)] font-semibold text-lg">Log Last Night&apos;s Sleep</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-4">

          <div>
            <label className="block font-label text-[10px] text-[var(--teal-muted)] mb-1.5">
              Bedtime
            </label>
            <input
              type="time"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
              className="w-full rounded-[4px] border border-[rgba(121,187,195,0.25)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-sm text-[var(--foreground)] outline-none font-ui transition-colors focus:border-[var(--teal-accent)] focus:ring-1 focus:ring-[var(--teal-accent)]/30"
            />
          </div>

          <div>
            <label className="block font-label text-[10px] text-[var(--teal-muted)] mb-1.5">
              Wake Time
            </label>
            <input
              type="time"
              value={waketime}
              onChange={(e) => setWaketime(e.target.value)}
              className="w-full rounded-[4px] border border-[rgba(121,187,195,0.25)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-sm text-[var(--foreground)] outline-none font-ui transition-colors focus:border-[var(--teal-accent)] focus:ring-1 focus:ring-[var(--teal-accent)]/30"
            />
          </div>

          {previewDuration !== null && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-[4px] border border-[rgba(121,187,195,0.2)] bg-[rgba(121,187,195,0.06)]">
              <span className="text-[var(--teal-accent)] font-ui text-sm">
                Duration: {previewDuration}h
              </span>
              <span className="text-[var(--teal-muted)]/50 font-label text-[10px]">
                ({previewDuration >= 8 ? "Goal met" :
                  `${Math.round((8 - previewDuration) * 10) / 10}h short of goal`})
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4">

          <div>
            <label className="block font-label text-[10px] text-[var(--teal-muted)] mb-1.5">
              Sleep Quality
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setQuality(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={cn(
                      "w-8 h-8 transition-colors",
                      star <= (hoveredStar || quality)
                        ? "fill-[var(--teal-accent)] text-[var(--teal-accent)]"
                        : "text-[rgba(255,255,255,0.15)]"
                    )}
                  />
                </button>
              ))}
              {quality > 0 && (
                <span className="font-label text-xs text-[var(--teal-muted)] ml-2">
                  {["", "Poor", "Fair", "Good", "Great", "Perfect"][quality]}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block font-label text-[10px] text-[var(--teal-muted)] mb-1.5">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did you feel? Stressed, caffeine, late meal..."
              rows={3}
              className="w-full rounded-[4px] border border-[rgba(121,187,195,0.25)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--teal-muted)]/40 outline-none font-ui transition-colors focus:border-[var(--teal-accent)] focus:ring-1 focus:ring-[var(--teal-accent)]/30 resize-none"
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-[var(--danger)] text-sm rounded-[4px] border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.06)] px-4 py-2">
          {error}
        </p>
      )}

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={cn(
            "px-6 py-3 rounded-[4px] text-sm font-ui font-semibold transition-all duration-200",
            "bg-[var(--teal-accent)] hover:bg-[var(--teal-mid)] text-black",
            "active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          {loading ? "Saving..." : "Log Sleep"}
        </button>

        {success && (
          <span className="text-[var(--success)] font-label text-sm">
            Sleep logged successfully
          </span>
        )}
      </div>
    </div>
  )
}
