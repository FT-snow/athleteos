import type { FatigueConfig, FatigueResult, RepMetrics } from "@formiq/types";

function average(values: number[]): number {
  return values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function detectFatigueOnset(
  reps: RepMetrics[],
  config: FatigueConfig,
): FatigueResult {
  if (reps.length <= config.warmupRepCount + config.rollingWindow) {
    return {
      detected: false,
      confidence: 0,
      scoreTrend: 0,
      romTrend: 0,
      tempoTrend: 0,
      reasons: [],
    };
  }

  const baseline = reps.slice(0, config.warmupRepCount);
  const baselineScore = average(baseline.map((rep) => rep.score));
  const baselineRom = average(baseline.map((rep) => rep.rangeOfMotionDeg));
  const baselineTempo = average(baseline.map((rep) => rep.durationMs));

  for (let index = config.warmupRepCount; index < reps.length; index += 1) {
    const window = reps.slice(Math.max(config.warmupRepCount, index - config.rollingWindow + 1), index + 1);
    const scoreTrend = average(window.map((rep) => rep.score)) - baselineScore;
    const romTrend = average(window.map((rep) => rep.rangeOfMotionDeg)) - baselineRom;
    const tempoTrend = average(window.map((rep) => rep.durationMs)) / Math.max(baselineTempo, 1) - 1;
    const reasons: string[] = [];

    if (scoreTrend <= -config.scoreDropThreshold) {
      reasons.push("score_drop");
    }

    if (romTrend <= -config.romDropThresholdDeg) {
      reasons.push("rom_drop");
    }

    if (tempoTrend >= config.tempoSlowdownRatio) {
      reasons.push("tempo_slowdown");
    }

    if (reasons.length >= 2) {
      return {
        detected: true,
        onsetRepIndex: reps[index]?.repIndex,
        confidence: Math.min(1, reasons.length / 3),
        scoreTrend,
        romTrend,
        tempoTrend,
        reasons,
      };
    }
  }

  return {
    detected: false,
    confidence: 0,
    scoreTrend: 0,
    romTrend: 0,
    tempoTrend: 0,
    reasons: [],
  };
}
