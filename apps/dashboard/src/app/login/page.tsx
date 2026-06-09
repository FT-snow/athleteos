"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthActions, useConvexAuth } from "@convex-dev/auth/react";
import MagicRings from "@/components/MagicRings";

function AuthLoadingOverlay({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
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
          {message}
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const { signIn } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const freshSignIn = useRef(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const isFresh = freshSignIn.current || sessionStorage.getItem("freshSignIn") === "true";
      sessionStorage.removeItem("freshSignIn");
      window.location.href = isFresh ? "/?login=new" : "/";
    }
  }, [isAuthenticated, isLoading]);

  if (submitting) {
    return <AuthLoadingOverlay message="Signing in..." />;
  }

  if (isAuthenticated) {
    return <AuthLoadingOverlay message="Redirecting..." />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn("password", { email, password, flow });
      freshSignIn.current = true;
    } catch (err: any) {
      setError(err?.message ?? "Authentication failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display-athletic text-3xl font-medium tracking-tighter text-[var(--foreground)]">
            Athlete<span className="text-[var(--teal-accent)]">.OS</span>
          </h1>
          <p className="mt-2 text-xs tracking-[0.2em] text-[var(--teal-muted)] uppercase font-heading-tech">
            Performance Intelligence
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--teal-dark)]/30 bg-gradient-to-br from-[rgba(20,20,24,0.85)] via-[rgba(20,20,24,0.7)] to-[var(--teal-dark)]/5 p-6 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-ui">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[var(--teal-dark)]/40 bg-black/40 px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--teal-deep)] transition-all focus:border-[var(--teal-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--teal-accent)]/30"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-[10px] uppercase tracking-widest text-[var(--teal-muted)] font-ui">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-lg border border-[var(--teal-dark)]/40 bg-black/40 px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--teal-deep)] transition-all focus:border-[var(--teal-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--teal-accent)]/30"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-[var(--danger)]/30 bg-[var(--danger)]/5 px-3 py-2">
                <p className="text-xs text-[var(--danger)]">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || isLoading}
              className="w-full rounded-lg bg-[var(--teal-accent)] px-4 py-2.5 text-sm font-semibold text-black transition-all hover:bg-[var(--teal-mid)] active:scale-[0.98] disabled:opacity-50"
            >
              {flow === "signIn" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => { setFlow(flow === "signIn" ? "signUp" : "signIn"); setError(""); }}
              className="text-xs text-[var(--teal-muted)] transition-colors hover:text-[var(--teal-accent)]"
            >
              {flow === "signIn"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
