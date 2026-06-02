import type { ExerciseConfig, FrameMetrics, RepMetrics, RepPhase } from "@formiq/types";
import { scoreRep } from "./scoring";

export interface RepCounterState {
  phase: RepPhase;
  repIndex: number;
  repStartMs?: number;
  bottomMs?: number;
  minAngleDeg: number;
  maxAngleDeg: number;
  lastTimestampMs?: number;
}

export interface RepCounterUpdate {
  state: RepCounterState;
  completedRep?: RepMetrics;
}

export function createRepCounterState(): RepCounterState {
  return {
    phase: "idle",
    repIndex: 0,
    minAngleDeg: Number.POSITIVE_INFINITY,
    maxAngleDeg: Number.NEGATIVE_INFINITY,
  };
}

function nextExtrema(state: RepCounterState, angleDeg: number): Pick<RepCounterState, "minAngleDeg" | "maxAngleDeg"> {
  return {
    minAngleDeg: Math.min(state.minAngleDeg, angleDeg),
    maxAngleDeg: Math.max(state.maxAngleDeg, angleDeg),
  };
}

function resetActiveRep(state: RepCounterState): RepCounterState {
  return {
    ...state,
    repStartMs: undefined,
    bottomMs: undefined,
    minAngleDeg: Number.POSITIVE_INFINITY,
    maxAngleDeg: Number.NEGATIVE_INFINITY,
  };
}

function updateCounter(
  state: RepCounterState,
  frame: FrameMetrics,
  config: ExerciseConfig,
): RepCounterUpdate {
  const angleKey = config.primaryAngleJoint;
  const angleDeg = frame.jointAngles[angleKey];

  if (angleDeg === undefined) {
    return { state: { ...state, lastTimestampMs: frame.timestampMs } };
  }

  const withExtrema: RepCounterState = {
    ...state,
    ...nextExtrema(state, angleDeg),
    lastTimestampMs: frame.timestampMs,
  };

  switch (state.phase) {
    case "idle":
    case "lockedOut": {
      if (angleDeg <= config.thresholds.startAngleDeg) {
        return {
          state: {
            ...withExtrema,
            phase: "descent",
            repStartMs: frame.timestampMs,
          },
        };
      }

      return { state: withExtrema };
    }

    case "descent": {
      if (angleDeg <= config.thresholds.bottomAngleDeg) {
        return {
          state: {
            ...withExtrema,
            phase: "bottom",
            bottomMs: frame.timestampMs,
          },
        };
      }

      return { state: withExtrema };
    }

    case "bottom": {
      if (angleDeg > config.thresholds.bottomAngleDeg + 5) {
        return {
          state: {
            ...withExtrema,
            phase: "ascent",
          },
        };
      }

      return { state: withExtrema };
    }

    case "ascent": {
      if (angleDeg >= config.thresholds.lockoutAngleDeg && withExtrema.repStartMs !== undefined) {
        const completedRep = scoreRep({
          exercise: config.exercise,
          side: frame.primarySide,
          repIndex: state.repIndex + 1,
          startedAtMs: withExtrema.repStartMs,
          endedAtMs: frame.timestampMs,
          minAngleDeg: withExtrema.minAngleDeg,
          maxAngleDeg: withExtrema.maxAngleDeg,
          bottomTimestampMs: withExtrema.bottomMs,
          config,
        });

        return {
          completedRep,
          state: {
            ...resetActiveRep(withExtrema),
            phase: "lockedOut",
            repIndex: state.repIndex + 1,
          },
        };
      }

      return { state: withExtrema };
    }
  }
}

export function updateSquatCounter(
  state: RepCounterState,
  frame: FrameMetrics,
  config: ExerciseConfig,
): RepCounterUpdate {
  return updateCounter(state, frame, config);
}

export function updatePushupCounter(
  state: RepCounterState,
  frame: FrameMetrics,
  config: ExerciseConfig,
): RepCounterUpdate {
  return updateCounter(state, frame, config);
}
