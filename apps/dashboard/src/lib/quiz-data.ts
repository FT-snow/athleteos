"use client"

export interface QuizLog {
  date: string
  sleepHours: number
  sleepQuality: number
  wakeUps: number
  morningEnergy: number
  restingHr: number
  morningFeel: number
  motivation: number
  stress: number
  focus: number
  soreness: { zone: string; rating: number }[]
  trainingLoad: number
}

export function getQuizLogs(): QuizLog[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem("athleteos_quiz_logs")
    if (!raw) return []
    return JSON.parse(raw) as QuizLog[]
  } catch {
    return []
  }
}

export function getLatestQuizLog(): QuizLog | null {
  const logs = getQuizLogs()
  return logs.length > 0 ? logs[0] : null
}

export function formatQuizLogSummary(log: QuizLog): string {
  const zones = log.soreness.map(s => `${s.zone} (${s.rating}/5)`).join(", ") || "none"
  return [
    `📊 **Your Latest Check-in**`,
    `Sleep: ${log.sleepHours}h (quality ${log.sleepQuality}/10, wake-ups ${log.wakeUps})`,
    `Energy: ${log.morningEnergy}/10  |  HRV feel: ${log.morningFeel}/10  |  RHR: ${log.restingHr} bpm`,
    `Mental: motivation ${log.motivation}/10, stress ${log.stress}/10, focus ${log.focus}/10`,
    `Soreness: ${zones}`,
    `Training load: ${log.trainingLoad}/10`,
    ``,
    `AI Coach credits are depleted. Here's a snapshot of your recovery data above.`,
  ].join("\n")
}

export function generateRecoveryPlan(log: QuizLog) {
  const recommendations: { day: string; type: string; duration: string; intensity: string; reason: string }[] = []
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const isoToday = new Date().toISOString().slice(0, 10)

  let idx = 0
  if (log.sleepHours < 6) {
    recommendations.push({ day: dayNames[idx++ % 7], type: "Rest & Nap", duration: "60 min", intensity: "Low", reason: "Sleep debt recovery" })
  }
  if (log.soreness.length > 0) {
    const zones = log.soreness.map(s => s.zone).join(", ")
    recommendations.push({ day: dayNames[idx++ % 7], type: "Light Mobility", duration: "30 min", intensity: "Low", reason: `Sore: ${zones}` })
  }
  if (log.stress > 7) {
    recommendations.push({ day: dayNames[idx++ % 7], type: "Breathwork / De-stress", duration: "20 min", intensity: "Very Low", reason: "High stress" })
  }
  if (log.trainingLoad > 7) {
    recommendations.push({ day: dayNames[idx++ % 7], type: "Active Recovery", duration: "40 min", intensity: "Low", reason: "High training load" })
  }
  if (log.morningEnergy < 5) {
    recommendations.push({ day: dayNames[idx++ % 7], type: "Rest Day", duration: "-", intensity: "-", reason: "Low energy" })
  }
  if (log.sleepHours >= 7 && log.sleepQuality >= 7 && log.motivation >= 7) {
    recommendations.push({ day: dayNames[idx++ % 7], type: "Strength Training", duration: "45 min", intensity: "Moderate", reason: "High readiness" })
  }
  if (log.motivation >= 6 && log.stress <= 5) {
    recommendations.push({ day: dayNames[idx++ % 7], type: "Conditioning", duration: "40 min", intensity: "Moderate", reason: "Good mental state" })
  }
  if (log.morningFeel >= 7) {
    recommendations.push({ day: dayNames[idx++ % 7], type: "Sport Practice", duration: "60 min", intensity: "High", reason: "Feeling fresh" })
  }
  if (idx === 0) {
    recommendations.push({ day: dayNames[0], type: "Active Recovery", duration: "30 min", intensity: "Low", reason: "Maintenance" })
    recommendations.push({ day: dayNames[1], type: "Strength", duration: "45 min", intensity: "Moderate", reason: "General fitness" })
    recommendations.push({ day: dayNames[2], type: "Rest", duration: "-", intensity: "-", reason: "Recovery" })
  }

  while (recommendations.length < 7) {
    const last = recommendations[recommendations.length - 1]
    const restTypes = ["Light Mobility", "Active Recovery", "Rest"]
    recommendations.push({
      day: dayNames[recommendations.length % 7],
      type: restTypes[recommendations.length % restTypes.length],
      duration: "30 min",
      intensity: "Low",
      reason: "Auto recovery",
    })
  }

  return recommendations.slice(0, 7)
}
