import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import { CustomCursor } from "@/components/CustomCursor";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display-athletic" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-ui",
});

export const metadata: Metadata = {
  title: "AthleteOS",
  description: "Form analysis & recovery intelligence",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(playfair.variable, spaceGrotesk.variable)}>
      <body className="antialiased font-sans">
        <CustomCursor />
        <ConvexAuthNextjsServerProvider>
          <ConvexClientProvider>
            <LoadingWrapper>
              {children}
              <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-[rgba(121,187,195,0.08)] bg-[#000]/60 flex items-center justify-between px-6 py-2.5 text-[10px] tracking-[0.2em] text-[var(--teal-muted)]/50 font-heading-tech">
                <span>ATHLETEOS</span>
                <span>PERFORMANCE INTELLIGENCE</span>
              </footer>
            </LoadingWrapper>
          </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
      </body>
    </html>
  );
}
