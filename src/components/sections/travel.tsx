"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/blocks/section";
import { Card } from "@/components/ui/card";
import { WorldMap } from "@/components/blocks/world-map";
import { countries } from "@/data/travel";
import { cn } from "@/lib/utils";

export function Travel() {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <Section
      id="travel"
      eyebrow="Travel & personality"
      title="Places that shaped how I think."
      description="A lifelong love for systems also extends to cultures, cities, and good food. Each pin is a story."
      bleed
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="relative">
          <WorldMap countries={countries} activeId={active} onSelect={setActive} />
          <p className="mt-2 text-xs text-muted-foreground">
            {countries.length} countries · click a pin to focus a card
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {countries.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onMouseEnter={() => setActive(c.id)}
                onFocus={() => setActive(c.id)}
                onClick={() => setActive(c.id)}
                className="text-left"
                aria-pressed={isActive}
              >
                <Card
                  className={cn(
                    "group relative overflow-hidden p-4 transition-all",
                    isActive
                      ? "border-gradient -translate-y-0.5"
                      : "hover:-translate-y-0.5",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      aria-hidden
                      className="grid size-10 place-items-center rounded-lg bg-muted text-xl"
                      animate={isActive ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {c.flag}
                    </motion.span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{c.name}</p>
                      <p className="truncate text-[11px] uppercase tracking-wider text-muted-foreground">
                        {c.represents}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-foreground/80">{c.note}</p>
                </Card>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
