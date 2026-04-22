import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

// jsdom polyfills for animation / observer APIs used by framer-motion + Radix
if (typeof window !== "undefined") {
  if (!window.matchMedia) {
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList;
  }
  if (!window.IntersectionObserver) {
    class IO {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn().mockReturnValue([]);
      root = null;
      rootMargin = "";
      thresholds = [];
    }
    window.IntersectionObserver = IO as unknown as typeof IntersectionObserver;
  }
  if (!window.ResizeObserver) {
    class RO {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    window.ResizeObserver = RO as unknown as typeof ResizeObserver;
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = vi.fn();
  }
  if (!HTMLElement.prototype.hasPointerCapture) {
    HTMLElement.prototype.hasPointerCapture = vi.fn().mockReturnValue(false);
  }
  if (!HTMLElement.prototype.releasePointerCapture) {
    HTMLElement.prototype.releasePointerCapture = vi.fn();
  }
}

// Silence next-themes useTheme during unit tests where Provider isn't mounted
vi.mock("next-themes", async () => {
  const React = await import("react");
  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
    useTheme: () => {
      const [theme, setTheme] = React.useState<"dark" | "light">("dark");
      return {
        theme,
        resolvedTheme: theme,
        setTheme: (t: "dark" | "light") => setTheme(t),
        themes: ["light", "dark"],
        systemTheme: "dark",
      };
    },
  };
});

// Mock next/font calls used in layout
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-sans", className: "" }),
  Geist_Mono: () => ({ variable: "--font-mono", className: "" }),
}));
