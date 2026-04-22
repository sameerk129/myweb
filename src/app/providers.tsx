"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CommandPaletteProvider } from "@/components/nav/command-palette";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={250} skipDelayDuration={500}>
        <CommandPaletteProvider>
          {children}
          <Toaster
            theme="system"
            position="bottom-right"
            richColors
            closeButton
          />
        </CommandPaletteProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
