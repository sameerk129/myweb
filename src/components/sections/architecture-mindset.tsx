import { Section } from "@/components/blocks/section";
import { Card } from "@/components/ui/card";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { architecturePillars } from "@/data/architecture";

export function ArchitectureMindset() {
  return (
    <Section
      id="mindset"
      eyebrow="Architecture mindset"
      title="How I think about building systems."
      description="Five pillars that shape every design review, every PR comment, every on-call hour."
    >
      <StaggerGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {architecturePillars.map((p) => (
          <StaggerItem key={p.id}>
            <Card className="group relative h-full overflow-hidden p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 size-48 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70"
                style={{
                  background:
                    "radial-gradient(closest-side, color-mix(in oklab, var(--grad-from) 35%, transparent), transparent 70%)",
                }}
              />
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-xl border border-border bg-background text-foreground"
                >
                  <p.Icon className="size-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{p.blurb}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-foreground/85">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-foreground/40" />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
