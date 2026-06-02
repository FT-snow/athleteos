import type { DailyRecoveryLog, BodyZone } from "@recoveryiq/core";

function randomBetween(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

const zones: BodyZone[] = ["legs", "back", "shoulders", "arms", "core", "knees", "hips", "neck"];

export function generateMockLogs(days = 30): DailyRecoveryLog[] {
  const logs: DailyRecoveryLog[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    
    const sleepHours = randomBetween(5.5, 9);
    const sleepQuality = Math.round(randomBetween(3, 10));
    const wakeUps = Math.floor(randomBetween(0, 3));
    const morningEnergy = Math.round(randomBetween(2, 10));
    
    const sorenessCount = Math.floor(randomBetween(0, 4));
    const soreness: any[] = [];
    for (let s = 0; s < sorenessCount; s++) {
      const zone = zones[Math.floor(Math.random() * zones.length)];
      if (!soreness.find(e => e.zone === zone)) {
        soreness.push({ date: dateStr, zone, rating: Math.round(randomBetween(1, 5)) });
      }
    }
    
    logs.push({
      date: dateStr,
      sleep: { date: dateStr, hours: sleepHours, quality: sleepQuality, wakeUps, morningEnergy },
      soreness,
      hrv: { date: dateStr, restingHeartRate: Math.round(randomBetween(50, 80)), morningFeelScore: Math.round(randomBetween(2, 10)) },
      mental: {
        date: dateStr,
        motivation: Math.round(randomBetween(3, 10)),
        stress: Math.round(randomBetween(1, 8)),
        confidence: Math.round(randomBetween(4, 10)),
        focus: Math.round(randomBetween(3, 10)),
      },
      trainingLoad: randomBetween(1, 10),
      injuryNotes: undefined,
    });
  }
  return logs;
}

export function getMockAthlete() {
  return { id: "athlete-1", name: "Alex Rivera", sport: "golf" };
}
