"use client"

import { useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@convex/api"
import { useConvexAuth } from "@convex-dev/auth/react"
import { SleepStats } from "./sleep-stats"
import { SleepLogForm } from "./sleep-log-form"
import { SleepHistory } from "./sleep-history"

export function SleepView() {
  const [refreshKey, setRefreshKey] = useState(0)
  const { isAuthenticated, isLoading } = useConvexAuth()
  const user = useQuery(api.users.getUser)
  const isAuthed = isAuthenticated && !isLoading && user !== undefined
  const convexUserId = isAuthed ? (user as any)?._id : undefined

  const handleLogged = () => {
    setRefreshKey((k) => k + 1)
  }

  return (
    <div className="pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="font-page-title text-[var(--foreground)]">Sleep Tracker</h1>
          <p className="text-[var(--teal-muted)] mt-1 text-sm">
            Log your sleep to power recovery recommendations and dashboard insights.
          </p>
        </div>

        <SleepStats key={refreshKey} userId={convexUserId} />
        <SleepLogForm onLogged={handleLogged} userId={convexUserId} />
        <SleepHistory refreshKey={refreshKey} userId={convexUserId} />
      </div>
    </div>
  )
}
