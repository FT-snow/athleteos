import type {
  CoachingMessageRecord,
  FrameSummaryRecord,
  MutationDescriptor,
  RepSummaryRecord,
  SessionSummaryRecord,
} from "./types";

export interface SessionStorageAdapter {
  saveSessionSummary(
    summary: SessionSummaryRecord,
  ): Promise<MutationDescriptor<SessionSummaryRecord> | void>;
  saveRepSummary(
    summary: RepSummaryRecord,
  ): Promise<MutationDescriptor<RepSummaryRecord> | void>;
  saveFrameSummary(
    summary: FrameSummaryRecord,
  ): Promise<MutationDescriptor<FrameSummaryRecord> | void>;
  saveCoachingMessage(
    message: CoachingMessageRecord,
  ): Promise<MutationDescriptor<CoachingMessageRecord> | void>;
}

export interface AdapterTransport {
  invoke<TPayload>(
    descriptor: MutationDescriptor<TPayload>,
  ): Promise<unknown>;
}
