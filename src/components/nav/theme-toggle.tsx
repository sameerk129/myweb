"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    // Mount flag — required so theme-dependent attributes don't cause
    // hydration mismatches on first paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const current = (theme === "system" ? resolvedTheme : theme) ?? "dark";
  const isDark = current === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle color theme"
      data-theme-current={mounted ? current : undefined}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={className}
    >
      <Sun
        className="size-4 scale-100 rotate-0 transition-all dark:-rotate-90 dark:scale-0"
        aria-hidden
      />
      <Moon
        className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
        aria-hidden
      />
    </Button>
  );
}
