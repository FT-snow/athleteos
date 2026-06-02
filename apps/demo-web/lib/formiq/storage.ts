import type { SessionData, SessionRecord } from "@formiq/types";

export function createSessionRecord(session: SessionData): SessionRecord {
  return {
    ...session,
    savedAt: new Date().toISOString(),
  };
}
