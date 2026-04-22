import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Section } from "@/components/blocks/section";
import { Card } from "@/components/ui/card";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { projects, type ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  shipped: "Shipped",
  beta: "Beta",
  wip: "In progress",
  archived: "Archived",
};

const STATUS_VARIANT: Record<ProjectStatus, BadgeProps["variant"]> = {
  shipped: "success",
  beta: "warning",
  wip: "gradient",
  archived: "muted",
};

const ACCENT: Record<NonNullable<(typeof projects)[number]["accent"]>, string> = {
  violet: "from-violet-500/40 to-fuchsia-500/40",
  cyan: "from-cyan-500/40 to-sky-500/40",
  emerald: "from-emerald-500/40 to-teal-500/40",
  amber: "from-amber-500/40 to-orange-500/40",
  rose: "from-rose-500/40 to-pink-500/40",
};

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Things I built"
      title="Real initiatives I shipped in production."
      description="A portfolio of backend and platform projects from Atlassian, Instawork, Bizongo, and GreyOrange."
    >
      <StaggerGroup
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        data-testid="projects-grid"
      >
        {projects.map((p) => (
          <StaggerItem key={p.id}>
            <Card
              data-testid="project-card"
              className="group relative flex h-full flex-col overflow-hidden"
            >
              <div className="relative h-32 w-full overflow-hidden">
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    ACCENT[p.accent ?? "violet"],
                  )}
                />
                <div aria-hidden className="absolute inset-0 bg-grid opacity-30 mix-blend-overlay" />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <Badge variant={STATUS_VARIANT[p.status]} className="backdrop-blur">
                    {STATUS_LABEL[p.status]}
                  </Badge>
                </div>
                <div className="absolute right-4 top-4 flex items-center gap-2">
                  {p.github && (
                    <Link
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.name} on GitHub`}
                      className="rounded-full border border-white/20 bg-black/30 p-1.5 text-white/90 backdrop-blur transition-colors hover:bg-black/50"
                    >
                      <GithubIcon className="size-3.5" />
                    </Link>
                  )}
                  {p.demo && (
                    <Link
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.name} live demo`}
                      className="rounded-full border border-white/20 bg-black/30 p-1.5 text-white/90 backdrop-blur transition-colors hover:bg-black/50"
                    >
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-base font-semibold tracking-tight">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.summary}</p>
                <p className="text-sm text-foreground/85">{p.description}</p>

                {p.metrics && p.metrics.length > 0 && (
                  <dl className="mt-1 grid grid-cols-2 gap-3 rounded-xl border border-border bg-background/40 p-3">
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {m.label}
                        </dt>
                        <dd className="text-sm font-medium text-foreground">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {p.stack.map((s) => (
                    <Badge key={s} variant="outline" className="text-[11px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
