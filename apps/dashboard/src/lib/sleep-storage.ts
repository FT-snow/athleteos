"use client"

export interface SleepEntry {
  id: string
  date: string
  bedtime: string
  waketime: string
  duration: number
  quality: number
  notes: string
}

const KEY = "athleteos_sleep_logs"

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function calcDuration(bedtime: string, waketime: string): number {
  const [bH, bM] = bedtime.split(":").map(Number)
  const [wH, wM] = waketime.split(":").map(Number)
  let bedMinutes = bH * 60 + bM
  let wakeMinutes = wH * 60 + wM
  if (wakeMinutes <= bedMinutes) wakeMinutes += 24 * 60
  return Math.round(((wakeMinutes - bedMinutes) / 60) * 10) / 10
}

export function getAllSleepLogs(): SleepEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as SleepEntry[]
  } catch {
    return []
  }
}

export function addDurationLog(date: string, duration: number, quality: number): SleepEntry {
  const logs = getAllSleepLogs()
  const bedHour = 22
  const wakeHour = Math.floor((bedHour + duration) % 24)
  const wakeMin = Math.round(((bedHour + duration) % 1) * 60)
  const newEntry: SleepEntry = {
    id: generateId(),
    date,
    bedtime: "22:00",
    waketime: `${String(wakeHour).padStart(2, "0")}:${String(wakeMin).padStart(2, "0")}`,
    duration,
    quality,
    notes: "Daily check-in",
  }
  const updated = [newEntry, ...logs]
  localStorage.setItem(KEY, JSON.stringify(updated))
  return newEntry
}

export function addSleepLog(entry: Omit<SleepEntry, "id" | "duration">): SleepEntry {
  const logs = getAllSleepLogs()
  const newEntry: SleepEntry = {
    ...entry,
    id: generateId(),
    duration: calcDuration(entry.bedtime, entry.waketime),
  }
  const updated = [newEntry, ...logs]
  localStorage.setItem(KEY, JSON.stringify(updated))
  return newEntry
}

export function deleteSleepLog(id: string): void {
  const logs = getAllSleepLogs()
  const updated = logs.filter((l) => l.id !== id)
  localStorage.setItem(KEY, JSON.stringify(updated))
}

export function getLast7Days(): SleepEntry[] {
  const logs = getAllSleepLogs()
  return logs.slice(0, 7)
}

export function calcSleepDebt(logs: SleepEntry[]): number {
  if (logs.length === 0) return 0
  const totalActual = logs.reduce((sum, l) => sum + l.duration, 0)
  const target = 8 * logs.length
  const debt = target - totalActual
  return Math.round(debt * 10) / 10
}

export function calcSleepScore(logs: SleepEntry[]): number {
  if (logs.length === 0) return 0
  const avg = logs.reduce((sum, l) => sum + l.quality, 0) / logs.length
  return Math.round(avg * 2 * 10) / 10
}

export function calcAvgDuration(logs: SleepEntry[]): number {
  if (logs.length === 0) return 0
  const avg = logs.reduce((sum, l) => sum + l.duration, 0) / logs.length
  return Math.round(avg * 10) / 10
}

export function getBestNight(logs: SleepEntry[]): SleepEntry | null {
  if (logs.length === 0) return null
  return logs.reduce((best, l) => (l.duration > best.duration ? l : best), logs[0])
}

export interface ConvexSleepLog {
  _id: string
  userId: string
  date: string
  bedtime: string
  waketime: string
  duration: number
  quality: number
  notes?: string
  createdAt: number
}

export function sleepEntryToConvex(
  entry: SleepEntry,
  userId: string,
): Omit<ConvexSleepLog, "_id" | "createdAt"> {
  return {
    userId,
    date: entry.date,
    bedtime: entry.bedtime,
    waketime: entry.waketime,
    duration: entry.duration,
    quality: entry.quality,
    notes: entry.notes || undefined,
  }
}

export function convexToSleepEntry(
  log: ConvexSleepLog,
): SleepEntry {
  return {
    id: log._id,
    date: log.date,
    bedtime: log.bedtime,
    waketime: log.waketime,
    duration: log.duration,
    quality: log.quality,
    notes: log.notes || "",
  }
}

export async function syncToConvex(
  userId: string,
  logMutation: (args: {
    userId: string
    date: string
    bedtime: string
    waketime: string
    duration: number
    quality: number
    notes?: string
  }) => Promise<any>,
): Promise<number> {
  const localLogs = getAllSleepLogs()
  let synced = 0
  for (const entry of localLogs) {
    try {
      await logMutation(sleepEntryToConvex(entry, userId))
      synced++
    } catch {
      // skip entries that fail
    }
  }
  return synced
}
