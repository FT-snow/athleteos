const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenRouterResponse {
  choices: {
    message: { content: string };
    finish_reason: string;
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function queryOpenRouter(
  messages: OpenRouterMessage[],
  model = process.env.OPENROUTER_DEFAULT_MODEL || "openrouter/free",
  temperature = 0.3,
): Promise<OpenRouterResponse> {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": "AthleteOS",
      },
      body: JSON.stringify({ model, messages, temperature }),
    },
  );

  if (response.status === 403) {
    throw new Error("API_KEY_EXCEEDED");
  }

  if (!response.ok) {
    throw new Error(`OpenRouter error: ${response.status}`);
  }

  return response.json();
}
