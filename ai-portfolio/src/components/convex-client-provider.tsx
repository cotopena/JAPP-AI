"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { type ReactNode, useMemo } from "react";

type Props = {
  children: ReactNode;
};

export function ConvexClientProvider({ children }: Props) {
  const client = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    return url ? new ConvexReactClient(url) : null;
  }, []);

  if (!client) {
    return (
      <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-red-300 bg-red-50 p-6 text-sm text-red-900">
        <p className="font-semibold">Missing NEXT_PUBLIC_CONVEX_URL</p>
        <p className="mt-2">
          Run <code>npx convex dev</code> in this folder to generate your local
          Convex environment.
        </p>
      </div>
    );
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
