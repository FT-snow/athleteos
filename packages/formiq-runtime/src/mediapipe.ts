import { useEffect, useState } from "react";

export interface PoseLandmarkerSession {
  status: "idle" | "loading" | "ready" | "error" | "unsupported";
  landmarker: unknown;
  error: string | null;
}

export interface PoseLandmarkerOptions {
  enabled?: boolean;
  filesetResolverUrl?: string;
  modelAssetPath?: string;
  runningMode?: "VIDEO" | "IMAGE";
  numPoses?: number;
}

const DEFAULT_FILESET_RESOLVER_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
const DEFAULT_MODEL_ASSET_PATH =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task";

export function usePoseLandmarker(options: PoseLandmarkerOptions = {}): PoseLandmarkerSession {
  const {
    enabled = true,
    filesetResolverUrl = DEFAULT_FILESET_RESOLVER_URL,
    modelAssetPath = DEFAULT_MODEL_ASSET_PATH,
    runningMode = "VIDEO",
    numPoses = 1,
  } = options;
  const [session, setSession] = useState<PoseLandmarkerSession>({
    status: enabled ? "loading" : "idle",
    landmarker: null,
    error: null,
  });

  useEffect(() => {
    if (!enabled) {
      setSession({ status: "idle", landmarker: null, error: null });
      return;
    }

    if (typeof window === "undefined") {
      setSession({ status: "unsupported", landmarker: null, error: "Window is unavailable." });
      return;
    }

    let cancelled = false;
    let activeLandmarker: { close?: () => void } | null = null;
    setSession({ status: "loading", landmarker: null, error: null });

    import("@mediapipe/tasks-vision")
      .then(async ({ FilesetResolver, PoseLandmarker }) => {
        const vision = await FilesetResolver.forVisionTasks(filesetResolverUrl);
        const landmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath },
          runningMode,
          numPoses,
        });
        activeLandmarker = landmarker;

        if (cancelled) {
          landmarker.close?.();
          return;
        }

        setSession({ status: "ready", landmarker, error: null });
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return;
        }

        const message = error instanceof Error ? error.message : "Pose landmarker failed to load.";
        setSession({ status: "error", landmarker: null, error: message });
      });

    return () => {
      cancelled = true;
      activeLandmarker?.close?.();
    };
  }, [enabled, filesetResolverUrl, modelAssetPath, numPoses, runningMode]);

  return session;
}
