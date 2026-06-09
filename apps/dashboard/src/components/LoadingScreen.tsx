"use client"

import { useState, useEffect } from "react"
import MagicRings from "./MagicRings"

export function LoadingScreen({ onDone, duration = 1800 }: { onDone: () => void; duration?: number }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onDone, 500)
    }, duration)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 blur-md opacity-75">
        <MagicRings
          color="#CFF2EF"
          colorTwo="#E8F8F6"
          ringCount={8}
          lineThickness={3}
          opacity={0.65}
          followMouse
          speed={1.5}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4">
        <h1 className="text-6xl font-bold tracking-tighter text-[var(--teal-accent)]" style={{ fontFamily: "var(--font-display)" }}>
          Athlete.os
        </h1>
        <p className="text-[10px] tracking-[0.3em] text-[var(--teal-muted)] uppercase" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
          Loading
        </p>
      </div>
    </div>
  )
}
