import { Section } from "@/components/blocks/section";
import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { highlights } from "@/data/highlights";

export function Highlights() {
  return (
    <Section
      id="highlights"
      eyebrow="Career highlights"
      title="The numbers behind the work."
      description="Outcomes from real production systems — capacity, reliability, and revenue impact."
    >
      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h) => (
          <StaggerItem key={h.id}>
            <Card className="relative overflow-hidden p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full opacity-40 blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, color-mix(in oklab, var(--grad-via) 45%, transparent), transparent 70%)",
                }}
              />
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {h.label}
              </p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                <AnimatedCounter
                  value={h.value}
                  decimals={h.decimals}
                  prefix={h.prefix}
                  suffix={h.suffix}
                />
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{h.caption}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
