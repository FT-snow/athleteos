"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { motion } from "framer-motion";
import { BentoCard } from "@/components/FeatureCard";

export function SettingsPanel() {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const [apiKey] = useState("Configured server-side");
  const [theme, setTheme] = useState("dark");

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <BentoCard variant="compact">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">
              API Configuration
            </p>
            <div className="space-y-1">
              <label className="text-xs text-[var(--teal-muted)]">OpenRouter Key</label>
              <input
                defaultValue={apiKey}
                type="text"
                className="w-full rounded-[4px] border border-[var(--card-border)] bg-[var(--bg)] px-3 py-2 text-xs text-[var(--foreground)] font-ui-mono"
                readOnly
              />
              <p className="text-[10px] text-[var(--teal-deep)]">Stored in environment variables</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-[var(--teal-muted)]">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full rounded-[4px] border border-[var(--card-border)] bg-[var(--bg)] px-3 py-2 text-xs text-[var(--foreground)]"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </BentoCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <BentoCard variant="compact">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">Data</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--teal-muted)]">Clear all session data</span>
              <button className="rounded-[4px] border border-[var(--card-border)] px-3 py-1 text-[10px] text-[var(--teal-muted)] transition-all hover:border-[var(--danger)] hover:text-[var(--danger)]">
                Clear
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--teal-muted)]">Export data</span>
              <button className="rounded-[4px] border border-[var(--card-border)] px-3 py-1 text-[10px] text-[var(--teal-muted)] transition-all hover:border-[var(--teal-accent)] hover:text-[var(--teal-accent)]">
                Export
              </button>
            </div>
          </div>
        </BentoCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <BentoCard variant="compact">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-heading-tech">Account</p>
            <button
              onClick={handleSignOut}
              className="w-full rounded-[4px] border border-[var(--danger)]/40 px-4 py-2.5 text-xs text-[var(--danger)] transition-all hover:bg-[var(--danger)]/10 active:scale-[0.98]"
            >
              Sign Out
            </button>
          </div>
        </BentoCard>
      </motion.div>
    </div>
  );
}
