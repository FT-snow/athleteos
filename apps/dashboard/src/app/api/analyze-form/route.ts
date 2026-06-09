import { NextRequest, NextResponse } from "next/server";
import { queryOpenRouter } from "@/lib/openrouter";

const FORM_SYSTEM_PROMPT = `You are a biomechanical form analysis AI. Analyze the human pose in the image and return ONLY valid JSON with this exact structure:
{
  "overallScore": <0-100>,
  "riskLevel": "low"|"moderate"|"high"|"critical",
  "angles": [{"joint": "<name>", "angleDeg": <number>, "status": "good"|"warning"|"critical"}],
  "cues": ["<cue1>", "<cue2>", "<cue3>"]
}

IMPORTANT — Cue variety rules:
- Include a MIX of cue types in your response:
  1. INTERNAL cues: "brace your core", "drive through your heels", "pull your shoulders back"
  2. EXTERNAL cues: "push the floor away", "reach for the ceiling", "spread the ground apart"
  3. ANALOGY cues: "like you're sitting back into a chair", "as if crushing a tennis ball under your armpit", "imagine a string pulling the crown of your head up"
- Use at least 1 external or analogy cue in every 3-cue response
- Keep cues specific to the visible joint angles and exercise being performed`;

const COACH_SYSTEM_PROMPT = `You are an elite sports coach and biomechanics expert. Answer the athlete's question about their training, recovery, or form. Provide concise, actionable advice. Keep responses under 3 sentences. Return ONLY valid JSON with this structure:
{
  "advice": "<your coaching advice>",
  "cues": ["<cue1>", "<cue2>"]
}`;

const FORM_MODEL = process.env.OPENROUTER_FORM_MODEL || "openrouter/free";
const COACH_MODEL = process.env.OPENROUTER_COACH_MODEL || "openai/gpt-oss-20b";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, exerciseName, role, context, prompt } =
      await req.json();

    const isCoach = role === "coach";

    if (!isCoach && !imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const systemPrompt = isCoach ? COACH_SYSTEM_PROMPT : FORM_SYSTEM_PROMPT;

    const messages: { role: "system" | "user"; content: any }[] = [
      { role: "system", content: systemPrompt },
    ];

    if (isCoach) {
      const contextStr = context ? `Context: ${context}. ` : "";
      messages.push({
        role: "user",
        content: `${contextStr}Athlete asks: ${prompt || "Give training advice."}`,
      });
    } else {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: exerciseName
              ? `Analyze this ${exerciseName} pose for form quality and joint angles.`
              : "Analyze this athletic pose for form quality and joint angles.",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`,
              detail: "low" as const,
            },
          },
        ],
      });
    }

    const data = await queryOpenRouter(
      messages as any,
      isCoach ? COACH_MODEL : FORM_MODEL,
       isCoach ? 0.3 : 0.4,
    );

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "No analysis returned" },
        { status: 502 },
      );
    }

    const cleaned = content
      .replace(/```(?:json)?\s*/gi, "")
      .replace(/```\s*$/gm, "")
      .trim();
    const braceStart = cleaned.indexOf("{");
    const braceEnd = cleaned.lastIndexOf("}");
    const jsonStr =
      braceStart !== -1 && braceEnd > braceStart
        ? cleaned.slice(braceStart, braceEnd + 1)
        : cleaned;

    let parsed: any;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      if (isCoach) {
        const adviceMatch = cleaned.match(
          /"advice"\s*:\s*"((?:[^"\\]|\\.)*)"/,
        );
        parsed = {
          advice: adviceMatch ? adviceMatch[1] : cleaned.replace(/[{}"]/g, "").trim(),
          cues: [],
        };
      } else {
        parsed = {
          overallScore: 50,
          riskLevel: "moderate",
          angles: [],
          cues: [cleaned.replace(/[{}"]/g, "").trim()],
        };
      }
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    if (err?.message === "API_KEY_EXCEEDED") {
      return NextResponse.json(
        {
          error:
            "AI analysis is currently unavailable. Our API key has exceeded its limit. Please try again later or contact support.",
        },
        { status: 503 },
      );
    }

    console.error("Analyze form error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
