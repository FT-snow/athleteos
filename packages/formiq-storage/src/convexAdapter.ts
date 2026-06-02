import type { AdapterTransport, SessionStorageAdapter } from "./adapter";
import type {
  CoachingMessageRecord,
  FrameSummaryRecord,
  MutationDescriptor,
  RepSummaryRecord,
  SessionSummaryRecord,
} from "./types";

export interface ConvexMutationMap {
  saveSessionSummary: string;
  saveRepSummary: string;
  saveFrameSummary: string;
  saveCoachingMessage: string;
}

export interface ConvexAdapterOptions {
  transport?: AdapterTransport;
  mutations?: Partial<ConvexMutationMap>;
}

const defaultMutations: ConvexMutationMap = {
  saveSessionSummary: "sessions:create",
  saveRepSummary: "reps:create",
  saveFrameSummary: "frameSummaries:create",
  saveCoachingMessage: "coachingMessages:create",
};

const buildDescriptor = <TPayload>(
  path: string,
  payload: TPayload,
): MutationDescriptor<TPayload> => ({ path, payload });

export class ConvexStorageAdapter implements SessionStorageAdapter {
  private readonly transport?: AdapterTransport;
  private readonly mutations: ConvexMutationMap;

  constructor(options: ConvexAdapterOptions = {}) {
    this.transport = options.transport;
    this.mutations = {
      ...defaultMutations,
      ...options.mutations,
    };
  }

  async saveSessionSummary(summary: SessionSummaryRecord) {
    const descriptor = buildDescriptor(this.mutations.saveSessionSummary, summary);
    return this.dispatch(descriptor);
  }

  async saveRepSummary(summary: RepSummaryRecord) {
    const descriptor = buildDescriptor(this.mutations.saveRepSummary, summary);
    return this.dispatch(descriptor);
  }

  async saveFrameSummary(summary: FrameSummaryRecord) {
    const descriptor = buildDescriptor(this.mutations.saveFrameSummary, summary);
    return this.dispatch(descriptor);
  }

  async saveCoachingMessage(message: CoachingMessageRecord) {
    const descriptor = buildDescriptor(this.mutations.saveCoachingMessage, message);
    return this.dispatch(descriptor);
  }

  private async dispatch<TPayload>(descriptor: MutationDescriptor<TPayload>) {
    if (!this.transport) {
      return descriptor;
    }

    await this.transport.invoke(descriptor);
    return descriptor;
  }
}

export class ConvexHttpTransport implements AdapterTransport {
  constructor(
    private readonly deploymentUrl: string,
    private readonly fetchImplementation: typeof fetch = fetch,
    private readonly authToken?: string,
  ) {}

  async invoke<TPayload>(descriptor: MutationDescriptor<TPayload>) {
    const response = await this.fetchImplementation(
      `${this.deploymentUrl}/api/mutation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(this.authToken ? { Authorization: `Bearer ${this.authToken}` } : {}),
        },
        body: JSON.stringify({
          path: descriptor.path,
          args: descriptor.payload,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Convex mutation failed with status ${response.status}`);
    }

    return response.json();
  }
}
