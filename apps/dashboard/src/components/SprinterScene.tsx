"use client";

import DotField from "./DotField";

export function SprinterScene() {
  return (
    <>
      <video
        src="/bg-video.mp4"
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-black/40 to-black/80" />
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(121,187,195,0.08)_0%,_transparent_70%)]" />
      <DotField
        dotRadius={3}
        dotSpacing={12}
        cursorRadius={300}
        bulgeStrength={20}
        glowRadius={100}
        gradientFrom="rgba(121, 187, 195, 0.3)"
        gradientTo="rgba(89, 155, 174, 0.08)"
        glowColor="#0a1520"
        className="fixed inset-0 z-[3] pointer-events-none"
      />
    </>
  );
}
