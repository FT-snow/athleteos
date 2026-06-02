import type { RefObject } from "react";
import { useEffectEvent } from "react";
import { useEffect, useRef } from "react";

export interface FrameLoopOptions {
  enabled?: boolean;
}

export function useAnimationFrameLoop(
  callback: (timestampMs: number) => void,
  options: FrameLoopOptions = {},
) {
  const { enabled = true } = options;
  const onFrame = useEffectEvent(callback);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    let frameId = 0;

    const tick = (timestampMs: number) => {
      onFrame(timestampMs);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [enabled, onFrame]);
}

type VideoFrameCallback = (now: number, metadata: VideoFrameCallbackMetadata) => void;

type VideoFrameElement = HTMLVideoElement & {
  requestVideoFrameCallback?: (callback: VideoFrameCallback) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

export function useVideoFrameLoop(
  videoRef: RefObject<HTMLVideoElement | null>,
  callback: (timestampMs: number) => void,
  options: FrameLoopOptions = {},
) {
  const { enabled = true } = options;
  const onFrame = useEffectEvent(callback);
  const rafId = useRef<number | null>(null);
  const videoFrameHandle = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    const video = videoRef.current as VideoFrameElement | null;
    if (!video) {
      return;
    }

    let cancelled = false;

    if (typeof video.requestVideoFrameCallback === "function") {
      const tick: VideoFrameCallback = (_now, metadata) => {
        if (cancelled) {
          return;
        }

        onFrame(metadata.mediaTime * 1000);
        videoFrameHandle.current = video.requestVideoFrameCallback?.(tick) ?? null;
      };

      videoFrameHandle.current = video.requestVideoFrameCallback(tick);

      return () => {
        cancelled = true;
        if (videoFrameHandle.current !== null) {
          video.cancelVideoFrameCallback?.(videoFrameHandle.current);
        }
      };
    }

    const fallbackTick = (timestampMs: number) => {
      if (cancelled) {
        return;
      }

      onFrame(timestampMs);
      rafId.current = window.requestAnimationFrame(fallbackTick);
    };

    rafId.current = window.requestAnimationFrame(fallbackTick);

    return () => {
      cancelled = true;
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, [enabled, onFrame, videoRef]);
}
