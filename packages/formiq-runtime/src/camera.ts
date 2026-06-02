import type { RefObject } from "react";
import { useEffect, useState } from "react";

export interface CameraOptions {
  enabled?: boolean;
  constraints?: MediaStreamConstraints;
  attachTo?: RefObject<HTMLVideoElement | null>;
}

export interface CameraSessionState {
  status: "idle" | "requesting" | "ready" | "error" | "unsupported";
  stream: MediaStream | null;
  error: string | null;
}

const DEFAULT_CONSTRAINTS: MediaStreamConstraints = {
  audio: false,
  video: {
    facingMode: "user",
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
};

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

export function useCameraSession(options: CameraOptions = {}): CameraSessionState {
  const { enabled = true, constraints = DEFAULT_CONSTRAINTS, attachTo } = options;
  const [state, setState] = useState<CameraSessionState>({
    status: enabled ? "requesting" : "idle",
    stream: null,
    error: null,
  });

  useEffect(() => {
    if (!enabled) {
      setState((current) => {
        stopStream(current.stream);
        return { status: "idle", stream: null, error: null };
      });
      return;
    }

    if (typeof window === "undefined" || !navigator?.mediaDevices?.getUserMedia) {
      setState({
        status: "unsupported",
        stream: null,
        error: "Camera APIs are unavailable in this environment.",
      });
      return;
    }

    let cancelled = false;
    let activeStream: MediaStream | null = null;

    setState({ status: "requesting", stream: null, error: null });

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(async (stream) => {
        if (cancelled) {
          stopStream(stream);
          return;
        }

        activeStream = stream;

        if (attachTo?.current) {
          attachTo.current.srcObject = stream;
          await attachTo.current.play().catch(() => undefined);
        }

        setState({ status: "ready", stream, error: null });
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return;
        }

        const message = error instanceof Error ? error.message : "Unable to access camera.";
        setState({ status: "error", stream: null, error: message });
      });

    return () => {
      cancelled = true;
      if (attachTo?.current) {
        attachTo.current.srcObject = null;
      }
      stopStream(activeStream);
    };
  }, [attachTo, constraints, enabled]);

  return state;
}

export function detachCameraStream(video: HTMLVideoElement | null) {
  if (video) {
    video.srcObject = null;
  }
}
