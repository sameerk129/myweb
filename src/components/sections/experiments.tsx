import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/blocks/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { experiments } from "@/data/experiments";
import { cn } from "@/lib/utils";

const ACCENT: Record<(typeof experiments)[number]["accent"], string> = {
  violet: "from-violet-500/60 to-fuchsia-500/50",
  cyan: "from-cyan-500/55 to-sky-500/45",
  amber: "from-amber-500/60 to-orange-500/50",
  emerald: "from-emerald-500/60 to-teal-500/50",
};

export function Experiments() {
  return (
    <Section
      id="experiments"
      eyebrow="Experiments"
      title="Playground apps with polished product taste."
      description="A curated set of interactive builds where interface aesthetics, motion, and utility are intentionally crafted together."
    >
      <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {experiments.map((experiment) => (
          <StaggerItem key={experiment.id} className="h-full">
            <Link
              href={experiment.href}
              target="_blank"
              rel="noreferrer"
              className="group block h-full"
              aria-label={`${experiment.name} live app`}
            >
              <Card className="bg-card/90 flex h-full flex-col overflow-hidden">
                <div className="border-border/80 relative h-52 overflow-hidden border-b md:h-56">
                  <img
                    src={experiment.image}
                    alt={`${experiment.name} screenshot`}
                    className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 bg-gradient-to-tr opacity-45 mix-blend-screen",
                      ACCENT[experiment.accent],
                    )}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent"
                  />
                  <Badge
                    variant="outline"
                    className="absolute top-4 left-4 border-white/30 bg-black/25 text-white backdrop-blur"
                  >
                    Live experiment
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight">{experiment.name}</h3>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-foreground mt-0.5 size-4 transition-colors" />
                  </div>
                  <p className="text-muted-foreground text-sm">{experiment.summary}</p>
                  <p className="text-foreground/85 text-sm">{experiment.description}</p>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="text-muted-foreground text-xs">{experiment.domain}</span>
                    <span className="text-foreground/90 group-hover:text-foreground text-xs font-medium transition-colors">
                      Open app
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
