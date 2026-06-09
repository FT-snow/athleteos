"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ReactNode, useState } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => {
    try {
      return new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    } catch {
      return null;
    }
  });

  if (!client) return <>{children}</>;
  return <ConvexAuthNextjsProvider client={client}>{children}</ConvexAuthNextjsProvider>;
}
