"use client"

import { useState, useEffect } from "react"
import MagicRings from "./MagicRings"

export function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading")

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), 2200)
    const doneTimer = setTimeout(() => setPhase("done"), 2700)
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
          phase === "loading" ? "opacity-100" : "opacity-0 pointer-events-none"
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
      {children}
    </>
  )
}
