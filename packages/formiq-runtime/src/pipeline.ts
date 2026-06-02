import type { RefObject } from "react";
import { useMemo, useRef, useState } from "react";
import type { PoseFrame, PosePipelineState } from "@formiq/types";

import { useCameraSession } from "./camera";
import { useVideoFrameLoop } from "./frame-loop";
import { createBodyLattice } from "./lattice";
import { usePoseLandmarker } from "./mediapipe";
import { createMockSessionGenerator } from "./mock-session";

export interface PosePipelineOptions {
  enabled?: boolean;
  preferMockWhenUnavailable?: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
}

export function createInitialPosePipelineState(): PosePipelineState {
  return {
    status: "idle",
    isCameraReady: false,
    isModelReady: false,
    usingMock: false,
    startedAtMs: null,
    latestFrame: null,
    errorMessage: null,
  };
}

export function usePosePipeline(options: PosePipelineOptions): PosePipelineState {
  const { enabled = true, preferMockWhenUnavailable = true, videoRef } = options;
  const camera = useCameraSession({ enabled, attachTo: videoRef });
  const landmarker = usePoseLandmarker({ enabled });
  const mockGeneratorRef = useRef(createMockSessionGenerator());
  const [latestFrame, setLatestFrame] = useState<PoseFrame | null>(null);
  const startedAtMsRef = useRef<number | null>(null);

  const shouldUseMock =
    preferMockWhenUnavailable &&
    enabled &&
    (camera.status === "unsupported" || camera.status === "error" || landmarker.status === "error");

  useVideoFrameLoop(
    videoRef,
    (timestampMs) => {
      if (!enabled || shouldUseMock) {
        return;
      }

      const instance = landmarker.landmarker as
        | {
            detectForVideo?: (
              video: HTMLVideoElement,
              timestampMs: number,
            ) => { landmarks?: Array<Array<{ x: number; y: number; z?: number; visibility?: number }>> };
          }
        | null;

      const video = videoRef.current;
      if (!video || typeof instance?.detectForVideo !== "function") {
        return;
      }

      const result = instance.detectForVideo(video, timestampMs);
      const landmarks = result.landmarks?.[0];
      if (!landmarks?.length) {
        return;
      }

      startedAtMsRef.current ??= timestampMs;
      setLatestFrame({
        timestampMs,
        landmarks,
        lattice: createBodyLattice(landmarks),
        source: "camera",
      });
    },
    { enabled },
  );

  useVideoFrameLoop(
    videoRef,
    (timestampMs) => {
      if (!shouldUseMock) {
        return;
      }

      startedAtMsRef.current ??= timestampMs;
      setLatestFrame(mockGeneratorRef.current.next(timestampMs));
    },
    { enabled: shouldUseMock },
  );

  return useMemo(() => {
    if (!enabled) {
      return createInitialPosePipelineState();
    }

    const errorMessage = camera.error ?? landmarker.error ?? null;

    let status: PosePipelineState["status"] = "idle";
    if (shouldUseMock) {
      status = "mock";
    } else if (errorMessage) {
      status = "error";
    } else if (camera.status === "requesting") {
      status = "requesting-camera";
    } else if (camera.status === "ready" && landmarker.status !== "ready") {
      status = "loading-model";
    } else if (camera.status === "ready") {
      status = latestFrame ? "running" : "camera-ready";
    }

    return {
      status,
      isCameraReady: camera.status === "ready",
      isModelReady: landmarker.status === "ready",
      usingMock: shouldUseMock,
      startedAtMs: startedAtMsRef.current,
      latestFrame,
      errorMessage,
    };
  }, [camera.error, camera.status, enabled, landmarker.error, landmarker.status, latestFrame, shouldUseMock]);
}
