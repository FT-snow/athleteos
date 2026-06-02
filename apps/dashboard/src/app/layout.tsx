import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "AthleteOS — RecoveryIQ", description: "Daily recovery tracking & readiness" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
