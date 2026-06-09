"use client"

export interface ProfileData {
  name: string
  username: string
  age: number
  birthday: string
  weight: number
  height: number
  gender: string
  sport: string
}

const PROFILE_KEY = "athleteos_profile"
const COMPLETED_KEY = "athleteos_profile_completed"

export function saveProfile(profile: ProfileData): void {
  if (typeof window === "undefined") return
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  localStorage.setItem(COMPLETED_KEY, "true")
}

export function clearProfile(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(PROFILE_KEY)
  localStorage.removeItem(COMPLETED_KEY)
}

export function getProfile(): ProfileData | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object") return null
    return parsed as ProfileData
  } catch {
    return null
  }
}

export function hasProfile(): boolean {
  if (typeof window === "undefined") return false
  try {
    return localStorage.getItem(COMPLETED_KEY) === "true"
  } catch {
    return false
  }
}

export function hasConvexProfile(): Promise<boolean> {
  return Promise.resolve(hasProfile())
}

export function isProfileComplete(profile: ProfileData): boolean {
  const required = ["name", "username", "sport"] as const
  const optional = ["age", "gender", "weight", "height"] as const

  for (const field of required) {
    const val = profile[field]
    if (val === undefined || val === null || val === "") {
      return false
    }
  }

  for (const field of optional) {
    const val = profile[field]
    if (val === undefined || val === null || val === "") {
      console.warn(`Profile missing optional field: ${field}`)
    }
  }

  return true
}
