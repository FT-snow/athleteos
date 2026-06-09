"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import type { InjuryRecord } from "@recoveryiq/rehab";
import { GridCard } from "@/components/FeatureCard";

const badgeStyles: Record<string, string> = {
  recovered: "bg-[#1a4a2e] text-[#4ade80] border border-[#4ade80] rounded-[3px]",
  rehab: "bg-[#4a3d1a] text-[#facc15] border border-[#facc15] rounded-[3px]",
  active: "bg-[#4a1a1a] text-[#f87171] border border-[#f87171] rounded-[3px]",
};

export function RehabInjuryDetail({ injury }: { injury: InjuryRecord }) {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!injury) return null;
  return (
    <GridCard variant="danger">
      <div
        ref={cardRef}
        className="p-5"
        onMouseEnter={() => {
          if (cardRef.current) gsap.to(cardRef.current, { scale: 1.01, duration: 0.2, ease: "power2.out" });
        }}
        onMouseLeave={() => {
          if (cardRef.current) gsap.to(cardRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
        }}
      >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium capitalize text-[var(--foreground)]">{injury.zone}</p>
          <p className="font-card-title text-[var(--foreground)] mt-1">{injury.diagnosis}</p>
        </div>
        <span className={`px-2.5 py-1 text-[10px] font-ui-mono uppercase tracking-wider ${badgeStyles[injury.status] || badgeStyles.active}`}>
          {injury.status}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div><span className="text-[var(--teal-muted)]">Severity: </span><span className="capitalize text-[var(--foreground)]">{injury.severity}</span></div>
        <div><span className="text-[var(--teal-muted)]">Date: </span><span className="text-[var(--foreground)]">{injury.dateOccurred}</span></div>
      </div>
      </div>
    </GridCard>
  );
}
