import type { DailyRecoveryLog } from "@recoveryiq/core";

interface Props {
  log: DailyRecoveryLog;
  onLog: (log: DailyRecoveryLog) => void;
}

export function DailyTracker({ log }: Props) {
  if (!log) return <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"><p className="text-sm text-[var(--muted)]">No log for this date</p></div>;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <p className="mb-4 text-xs uppercase tracking-widest text-[var(--muted)]">Daily Check-In</p>
      <div className="space-y-4">
        <Section label="Sleep">
          <Row label="Hours" value={`${log.sleep.hours.toFixed(1)}h`} />
          <Row label="Quality" value={`${log.sleep.quality}/10`} />
          <Row label="Wake-ups" value={`${log.sleep.wakeUps}`} />
          <Row label="Morning Energy" value={`${log.sleep.morningEnergy}/10`} />
        </Section>
        <Section label="HRV Proxy">
          <Row label="Resting HR" value={`${log.hrv.restingHeartRate} bpm`} />
          <Row label="Morning Feel" value={`${log.hrv.morningFeelScore}/10`} />
        </Section>
        <Section label="Mental">
          <Row label="Motivation" value={`${log.mental.motivation}/10`} />
          <Row label="Stress" value={`${log.mental.stress}/10`} />
          <Row label="Confidence" value={`${log.mental.confidence}/10`} />
          <Row label="Focus" value={`${log.mental.focus}/10`} />
        </Section>
        <Section label="Training">
          <Row label="Load" value={`${log.trainingLoad?.toFixed(1) ?? "--"}/10`} />
        </Section>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-[var(--muted)]">{label}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
