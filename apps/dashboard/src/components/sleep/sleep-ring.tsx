"use client"

import { useEffect, useState } from "react"

interface SleepRingProps {
  duration: number
  goal?: number
  size?: number
}

export function SleepRing({ duration, goal = 8, size = 120 }: SleepRingProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const radius = (size / 2) * 0.7
  const circumference = 2 * Math.PI * radius
  const pct = mounted ? Math.min(duration / goal, 1) : 0
  const filled = pct * circumference
  const gap = circumference - filled

  const color =
    duration >= 8 ? "var(--teal-accent)" :
    duration >= 6 ? "var(--warning)" :
    "var(--danger)"

  return (
    <div className="relative flex items-center justify-center"
         style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />
        {mounted && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${filled} ${gap}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        )}
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-ui-mono text-xl text-[var(--foreground)]">
          {mounted ? `${duration}h` : "--"}
        </span>
        <span className="font-label text-[10px] text-[var(--teal-muted)]">of {goal}h</span>
      </div>
    </div>
  )
}
