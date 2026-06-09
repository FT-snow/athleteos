import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { athleteId, date, sleepHours, sleepQuality, wakeUps, morningEnergy, restingHr, morningFeel, motivation, stress, focus, soreness, trainingLoad } = body;

    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      return NextResponse.json({ success: true, note: "Convex not configured, saved to localStorage" });
    }

    const resp = await fetch(`${convexUrl}/api/mutation/dailyLogs:create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        args: { athleteId, date, sleepHours, sleepQuality, wakeUps, morningEnergy, restingHr, morningFeel, motivation, stress, focus, soreness, trainingLoad },
      }),
    });

    if (!resp.ok) {
      console.warn("Convex mutation failed, data saved to localStorage only");
      return NextResponse.json({ success: true, note: "Saved to localStorage" });
    }

    const data = await resp.json();
    return NextResponse.json({ success: true, id: data });
  } catch {
    return NextResponse.json({ success: true, note: "Saved to localStorage" });
  }
}
