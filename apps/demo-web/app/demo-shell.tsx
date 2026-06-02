"use client";

import { useEffect, useMemo, useRef, useState, useTransition, lazy, Suspense } from "react";
import { Activity, BrainCircuit, Camera, RefreshCcw, Sparkles, Timer, Upload } from "lucide-react";
import {
  buildSessionMetrics,
  buildSessionSummary,
  deriveBottlenecks,
  formatDuration,
} from "@formiq/core";
import { buildMockSession, createRuntimeStatus, sessionToTimeline } from "@formiq/runtime";
import { MetricCard, Panel, SectionTitle, StatusPill, TimelineBars } from "@formiq/ui";
import { createSessionRecord } from "@formiq/storage";
import type { CoachResponse, SessionRecord } from "@formiq/types";

const AvatarStage = lazy(() => import("@formiq/3d").then((mod) => ({ default: mod.AvatarStage })));

const currency = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function DemoShell() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<"idle" | "ready" | "blocked" | "uploaded">("idle");
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d");
  const [session, setSession] = useState<SessionRecord>(() => createSessionRecord(buildMockSession(0)));
  const [coach, setCoach] = useState<CoachResponse | null>(null);
  const [coachError, setCoachError] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const metrics = useMemo(() => buildSessionMetrics(session), [session]);
  const summary = useMemo(() => buildSessionSummary(session), [session]);
  const bottlenecks = useMemo(() => deriveBottlenecks(session), [session]);
  const runtime = useMemo(() => createRuntimeStatus(cameraState === "uploaded" ? "ready" : cameraState, session), [cameraState, session]);
  const timeline = useMemo(() => sessionToTimeline(session), [session]);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const url = URL.createObjectURL(file);
    if (videoRef.current && file.type.startsWith("video/")) {
      videoRef.current.srcObject = null;
      videoRef.current.src = url;
      setCameraState("uploaded");
    } else {
       // Could support images, but demo is geared toward video sequence
       alert("Please upload a video file for biomechanical tracking.");
    }
  }

  async function enableCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraState("blocked");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraState("ready");
    } catch {
      setCameraState("blocked");
    }
  }

  function generateSession(seed = Date.now()) {
    const next = createSessionRecord(buildMockSession(seed));
    startTransition(() => {
      setSession(next);
      setCoach(null);
      setCoachError(null);
    });
  }

  async function requestCoaching() {
    setCoachError(null);
    setIsRequesting(true);

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session, runtime }),
      });

      if (!response.ok) {
        throw new Error("Unable to analyze session.");
      }

      const payload = (await response.json()) as CoachResponse;
      startTransition(() => {
        setCoach(payload);
      });
    } catch (error) {
      setCoachError(error instanceof Error ? error.message : "Unknown coaching error.");
    } finally {
      setIsRequesting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <StatusPill tone="neutral">FormIQ Live Demo</StatusPill>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Movement coaching with a usable fallback path.</h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--muted)] sm:text-base">
                Use the webcam when available, or generate a deterministic mock session to exercise the full coaching loop.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <button className="button" onClick={enableCamera} type="button">
              <Camera className="h-4 w-4" />
              Camera
            </button>
            <label className="button cursor-pointer">
              <Upload className="h-4 w-4" />
              Upload Video
              <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
            </label>
            <button className="button" onClick={() => generateSession()} type="button">
              <RefreshCcw className="h-4 w-4" />
              Mock session
            </button>
            <button className="button button-primary" disabled={isRequesting || isPending} onClick={requestCoaching} type="button">
              <Sparkles className="h-4 w-4" />
              {isRequesting ? "Refreshing" : "Run coaching"}
            </button>
            <button className="button" onClick={() => setViewMode(v => v === "2d" ? "3d" : "2d")} type="button">
              Toggle {viewMode === "2d" ? "3D" : "2D"} View
            </button>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Panel className="overflow-hidden p-0 relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,#25314f,transparent_55%),linear-gradient(160deg,#101828,#06090f)]">
              <video autoPlay className={`h-full w-full object-cover ${viewMode === "3d" ? "opacity-20" : "opacity-70"}`} muted playsInline ref={videoRef} loop />
              
              {viewMode === "3d" && (
                <Suspense fallback={null}>
                  <AvatarStage formFlags={{ spine: true }} />
                </Suspense>
              )}

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] mask-[linear-gradient(180deg,rgba(0,0,0,0.85),rgba(0,0,0,0.25))]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div className="max-w-sm rounded-3xl border border-white/10 bg-black/35 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Runtime state</p>
                  <p className="mt-2 text-lg font-medium text-white">{runtime.headline}</p>
                  <p className="mt-1 text-sm text-slate-300">{runtime.detail}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/35 px-4 py-3 text-right backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Session clock</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{formatDuration(metrics.durationMs)}</p>
                </div>
              </div>
            </div>
          </Panel>

          <div className="grid gap-6">
            <Panel>
              <SectionTitle eyebrow="Overview" title="Session summary" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MetricCard icon={Activity} label="Reps" value={currency.format(metrics.reps)} />
                <MetricCard icon={Timer} label="Avg tempo" value={`${metrics.avgTempo.toFixed(1)}s`} />
                <MetricCard icon={BrainCircuit} label="Model confidence" value={`${metrics.confidence.toFixed(0)}%`} />
                <MetricCard icon={Sparkles} label="Range quality" value={`${metrics.rangeScore.toFixed(0)}%`} />
              </div>
            </Panel>

            <Panel>
              <SectionTitle eyebrow="Pressure Points" title="Bottleneck notes" />
              <div className="mt-4 space-y-3">
                {bottlenecks.map((item) => (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4" key={item.title}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{item.title}</p>
                      <StatusPill tone={item.tone}>{item.severity}</StatusPill>
                    </div>
                    <p className="mt-2 text-sm text-[var(--muted)]">{item.note}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel>
            <SectionTitle eyebrow="Rep Flow" title="Lattice timeline" />
            <div className="mt-4">
              <TimelineBars items={timeline} />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MetricCard label="Left drift" value={`${summary.leftDrift.toFixed(1)} deg`} />
              <MetricCard label="Depth loss" value={`${summary.depthLoss.toFixed(0)}%`} />
              <MetricCard label="Recovery" value={`${summary.recoveryScore.toFixed(0)}%`} />
            </div>
          </Panel>

          <Panel>
            <SectionTitle eyebrow="Coach" title="Generated guidance" />
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-[var(--muted)]">{coach?.summary ?? "Run coaching to see either OpenRouter output or the deterministic fallback response."}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {(coach?.cues ?? summary.defaultCues).map((cue) => (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4" key={cue}>
                    <p className="text-sm">{cue}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Next focus</p>
                <p className="mt-2 text-base font-medium">{coach?.focus ?? summary.nextFocus}</p>
              </div>

              {coachError ? <p className="text-sm text-rose-300">{coachError}</p> : null}
            </div>
          </Panel>
        </section>
      </div>
    </main>
  );
}
