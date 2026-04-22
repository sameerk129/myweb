"use client";

import * as React from "react";
import { toast } from "sonner";
import { track } from "@/lib/analytics";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  React.useEffect(() => {
    let buf: string[] = [];
    function onKey(e: KeyboardEvent) {
      buf = [...buf, e.key].slice(-KONAMI.length);
      if (buf.join(",").toLowerCase() === KONAMI.join(",").toLowerCase()) {
        track({ name: "easter_egg", payload: { id: "konami" } });
        toast.success("🚀 You found it.", {
          description: "All systems nominal. SLO budget intact.",
        });
        document.documentElement.animate(
          [
            { filter: "hue-rotate(0deg)" },
            { filter: "hue-rotate(360deg)" },
            { filter: "hue-rotate(0deg)" },
          ],
          { duration: 1800, easing: "ease-in-out" },
        );
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
