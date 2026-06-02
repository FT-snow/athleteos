import { NextResponse } from "next/server";
import { buildCoachPrompt, buildDeterministicCoaching } from "@formiq/ai";
import { buildSessionSummary } from "@formiq/core";
import type { CoachRequest, CoachResponse } from "@formiq/types";

export async function POST(request: Request) {
  const body = (await request.json()) as CoachRequest;
  const prompt = buildCoachPrompt(body.session, body.runtime);
  const summary = buildSessionSummary(body.session);

  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL;

  if (!apiKey || !model) {
    return NextResponse.json(buildDeterministicCoaching(body.session, summary, prompt));
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "You are a concise movement coach. Return JSON with summary, cues, focus, and source.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "coach_response",
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                summary: { type: "string" },
                cues: {
                  type: "array",
                  items: { type: "string" },
                  minItems: 3,
                },
                focus: { type: "string" },
                source: { type: "string" },
              },
              required: ["summary", "cues", "focus", "source"],
            },
          },
        },
      }),
    });

    if (!response.ok) {
      return NextResponse.json(buildDeterministicCoaching(body.session, summary, prompt));
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = payload.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(buildDeterministicCoaching(body.session, summary, prompt));
    }

    const parsed = JSON.parse(content) as CoachResponse;
    return NextResponse.json({ ...parsed, source: parsed.source || "openrouter", prompt });
  } catch {
    return NextResponse.json(buildDeterministicCoaching(body.session, summary, prompt));
  }
}
