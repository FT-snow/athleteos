"use client"

import { useEffect, useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@convex/api"
import { Moon, TrendingDown, Star, Droplets } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  getLast7Days,
  calcSleepDebt,
  calcAvgDuration,
  getBestNight,
  calcSleepScore,
} from "@/lib/sleep-storage"

interface SleepStatsProps {
  userId?: string
}

export function SleepStats({ userId }: SleepStatsProps) {
  const [mounted, setMounted] = useState(false)
  const [avg, setAvg] = useState(0)
  const [debt, setDebt] = useState(0)
  const [best, setBest] = useState<number>(0)
  const [score, setScore] = useState(0)

  const convexLogs = useQuery(
    api.sleep.getLast7Days,
    userId ? { userId: userId as any } : "skip",
  )

  useEffect(() => {
    if (convexLogs) {
      const logs = convexLogs.map((l: any) => ({
        duration: l.duration,
        quality: l.quality,
        date: l.date,
      }))
      const durations = logs.map((l: any) => l.duration)
      setAvg(
        durations.length
          ? Math.round((durations.reduce((a: number, b: number) => a + b, 0) / durations.length) * 10) / 10
          : 0,
      )
      const target = 8 * logs.length
      const totalActual = durations.reduce((a: number, b: number) => a + b, 0)
      setDebt(Math.round((target - totalActual) * 10) / 10)
      setBest(durations.length ? Math.max(...durations) : 0)
      const avgQ = logs.length
        ? logs.reduce((a: any, b: any) => a + b.quality, 0) / logs.length
        : 0
      setScore(Math.round(avgQ * 2 * 10) / 10)
      setMounted(true)
      return
    }

    const logs = getLast7Days()
    setAvg(calcAvgDuration(logs))
    setDebt(calcSleepDebt(logs))
    setBest(getBestNight(logs)?.duration ?? 0)
    setScore(calcSleepScore(logs))
    setMounted(true)
  }, [convexLogs])

  const stats = [
    {
      icon: <Moon className="w-4 h-4 text-[var(--teal-accent)]" />,
      label: "Avg This Week",
      value: mounted ? `${avg}h` : "--",
      sub: "nightly average",
      color: "text-[var(--foreground)]",
    },
    {
      icon: <TrendingDown className="w-4 h-4 text-[var(--teal-muted)]" />,
      label: "Sleep Debt",
      value: mounted ? `${debt}h` : "--",
      sub: debt > 0 ? "needs recovery" : "all caught up",
      color: debt > 2 ? "text-[var(--danger)]" : debt > 0 ? "text-[var(--warning)]" : "text-[var(--success)]",
    },
    {
      icon: <Star className="w-4 h-4 text-[var(--teal-mid)]" />,
      label: "Best Night",
      value: mounted ? `${best}h` : "--",
      sub: "this week",
      color: "text-[var(--foreground)]",
    },
    {
      icon: <Droplets className="w-4 h-4 text-[var(--teal-accent)]" />,
      label: "Sleep Score",
      value: mounted ? `${score}/10` : "--",
      sub: "quality index",
      color: score >= 7 ? "text-[var(--success)]" : score >= 5 ? "text-[var(--warning)]" : "text-[var(--danger)]",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-[4px] border border-[rgba(121,187,195,0.12)] bg-[rgba(5,14,18,0.75)] p-4 flex flex-col gap-1"
        >
          <div className="flex items-center gap-2 text-[var(--teal-muted)] font-label text-[10px]">
            {s.icon}
            <span>{s.label}</span>
          </div>
          <p className={cn("font-ui-mono text-2xl", s.color)}>
            {s.value}
          </p>
          <p className="font-card-subtitle text-[11px]">{s.sub}</p>
        </div>
      ))}
    </div>
  )
}
