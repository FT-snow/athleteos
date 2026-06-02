import type { CSSProperties } from "react";
import type { LiveVideoStageProps } from "@formiq/types";

import { cardStyle, joinClassName, palette } from "./primitives";

const STATUS_LABELS: Record<LiveVideoStageProps["status"], string> = {
  idle: "Idle",
  "requesting-camera": "Connecting camera",
  "camera-ready": "Camera ready",
  "loading-model": "Loading pose model",
  running: "Live tracking",
  mock: "Mock session",
  error: "Setup error",
};

export function LiveVideoStage({
  title = "Live Form Feed",
  subtitle = "Camera and overlay stage",
  status,
  mirrored = true,
  videoRef,
  overlayCanvasRef,
  latestFrame,
  errorMessage,
  emptyLabel = "Waiting for a video source",
  className,
}: LiveVideoStageProps) {
  const hasFrame = Boolean(latestFrame);
  const stageStyle: CSSProperties = {
    ...cardStyle,
    overflow: "hidden",
    padding: 18,
  };

  return (
    <section className={joinClassName(className)} style={stageStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: palette.muted }}>
            {subtitle}
          </div>
          <h2 style={{ margin: "6px 0 0", fontSize: 24 }}>{title}</h2>
        </div>
        <div
          style={{
            alignSelf: "flex-start",
            border: `1px solid ${palette.border}`,
            borderRadius: 999,
            padding: "8px 12px",
            fontSize: 13,
            color: status === "mock" ? palette.warning : status === "error" ? palette.danger : palette.accent,
          }}
        >
          {STATUS_LABELS[status]}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          borderRadius: 18,
          overflow: "hidden",
          background: "linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(8, 17, 31, 0.98))",
          border: `1px solid ${palette.border}`,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: mirrored ? "scaleX(-1)" : undefined,
            opacity: status === "mock" ? 0.18 : 1,
          }}
        />
        <canvas
          ref={overlayCanvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        />
        {!hasFrame ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              color: palette.muted,
              fontSize: 15,
              padding: 24,
              textAlign: "center",
            }}
          >
            {errorMessage ?? emptyLabel}
          </div>
        ) : null}
      </div>
    </section>
  );
}
