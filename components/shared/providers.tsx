"use client";

import { TooltipProvider } from "@/components/shared/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
