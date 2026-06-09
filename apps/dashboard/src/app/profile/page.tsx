"use client";

import { ProfileDashboard } from "@/components/ProfileDashboard";
import { SprinterScene } from "@/components/SprinterScene";

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <SprinterScene />
      <ProfileDashboard />
    </div>
  );
}
