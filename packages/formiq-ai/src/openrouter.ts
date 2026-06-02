import type { CoachingMessage } from "./types";

export const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export type OpenRouterRole = "system" | "user" | "assistant";

export interface OpenRouterChatMessage {
  role: OpenRouterRole;
  content: string;
}

export interface OpenRouterChatRequest {
  model: string;
  messages: OpenRouterChatMessage[];
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  response_format?: {
    type: "json_object";
  };
}

export interface OpenRouterChatChoice {
  index: number;
  message: OpenRouterChatMessage;
  finish_reason?: string;
}

export interface OpenRouterChatResponse {
  id: string;
  model: string;
  choices: OpenRouterChatChoice[];
}

export interface OpenRouterClientConfig {
  apiKey: string;
  baseUrl?: string;
  appName?: string;
  appUrl?: string;
  fetchImplementation?: typeof fetch;
}

export interface OpenRouterCompletionOptions {
  client: OpenRouterClientConfig;
  request: OpenRouterChatRequest;
}

export const createOpenRouterChatRequest = (
  model: string,
  messages: OpenRouterChatMessage[],
  overrides: Omit<OpenRouterChatRequest, "model" | "messages"> = {},
): OpenRouterChatRequest => ({
  model,
  messages,
  temperature: 0.3,
  response_format: { type: "json_object" },
  ...overrides,
});

const isOpenRouterChatResponse = (
  value: unknown,
): value is OpenRouterChatResponse => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const response = value as Partial<OpenRouterChatResponse>;
  return (
    typeof response.id === "string" &&
    typeof response.model === "string" &&
    Array.isArray(response.choices)
  );
};

export const parseOpenRouterChatResponse = (
  value: unknown,
): OpenRouterChatResponse => {
  if (!isOpenRouterChatResponse(value)) {
    throw new Error("Invalid OpenRouter response payload");
  }

  return value;
};

export const parseCoachingMessage = (content: string): CoachingMessage => {
  const parsed = JSON.parse(content) as Partial<CoachingMessage>;

  if (
    typeof parsed.title !== "string" ||
    typeof parsed.summary !== "string" ||
    !Array.isArray(parsed.cues)
  ) {
    throw new Error("Model response did not match CoachingMessage shape");
  }

  return {
    title: parsed.title,
    summary: parsed.summary,
    cues: parsed.cues.filter((cue): cue is string => typeof cue === "string"),
    confidence:
      typeof parsed.confidence === "number" ? parsed.confidence : undefined,
  };
};

export const requestOpenRouterChatCompletion = async ({
  client,
  request,
}: OpenRouterCompletionOptions): Promise<OpenRouterChatResponse> => {
  const fetchImplementation = client.fetchImplementation ?? fetch;
  const baseUrl = client.baseUrl ?? OPENROUTER_BASE_URL;

  const response = await fetchImplementation(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${client.apiKey}`,
      "Content-Type": "application/json",
      ...(client.appName ? { "HTTP-Referer": client.appUrl ?? "https://formiq.local" } : {}),
      ...(client.appName ? { "X-Title": client.appName } : {}),
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter request failed with status ${response.status}`);
  }

  const payload: unknown = await response.json();
  return parseOpenRouterChatResponse(payload);
};

export const getFirstChatMessageContent = (
  response: OpenRouterChatResponse,
): string => {
  const firstChoice = response.choices[0];

  if (!firstChoice?.message.content) {
    throw new Error("OpenRouter response did not include a message");
  }

  return firstChoice.message.content;
};
