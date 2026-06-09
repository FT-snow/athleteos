import { actionGeneric } from "convex/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

interface JointAngle {
  joint: string;
  angleDeg: number;
  status: "good" | "warning" | "critical";
}

interface FormAnalysis {
  overallScore: number;
  riskLevel: "low" | "moderate" | "high" | "critical";
  angles: JointAngle[];
  cues: string[];
}

const SYSTEM_PROMPT = `You are a biomechanical form analysis AI. Analyze the human pose in the image and return ONLY valid JSON with this exact structure:
{
  "overallScore": <0-100>,
  "riskLevel": "low"|"moderate"|"high"|"critical",
  "angles": [{"joint": "<name>", "angleDeg": <number>, "status": "good"|"warning"|"critical"}],
  "cues": ["<cue1>", "<cue2>", "<cue3>"]
}`;

export const analyze = actionGeneric({
  args: {
    imageBase64: v.string(),
    exerciseName: v.optional(v.string()),
    sessionId: v.optional(v.id("sessions")),
  },
  handler: async (ctx, args): Promise<FormAnalysis> => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("OPENROUTER_API_KEY not set");

    const resp = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://athlete-os.app",
          "X-Title": "AthleteOS Form Analysis",
        },
        body: JSON.stringify({
          model: "google/gemini-3.5-flash",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: args.exerciseName
                    ? `Analyze this ${args.exerciseName} pose for form quality and joint angles.`
                    : "Analyze this athletic pose for form quality and joint angles.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${args.imageBase64}`,
                    detail: "low",
                  },
                },
              ],
            },
          ],
          max_tokens: 1024,
          temperature: 0.1,
        }),
      },
    );

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`OpenRouter error ${resp.status}: ${text}`);
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content in OpenRouter response");

    const cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*$/gm, "").trim();
    const parsed: FormAnalysis = JSON.parse(cleaned);

    if (args.sessionId) {
      await ctx.runMutation(internal.frameSummaries.create, {
        sessionId: args.sessionId,
        frameIndex: Date.now(),
        timestampMs: Date.now(),
        summary: JSON.stringify(parsed),
      });
    }

    return parsed;
  },
});
