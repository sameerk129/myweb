import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/blocks/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { experiences } from "@/data/experience";
import { formatRange } from "@/lib/utils";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've shipped tier-1 systems."
      description="A timeline of teams, scale, and the problems I've owned end-to-end."
    >
      <ol className="relative space-y-12">
        <span
          aria-hidden
          className="absolute left-2 top-2 bottom-2 hidden w-px bg-gradient-to-b from-border via-border to-transparent sm:block"
        />
        {experiences.map((exp, i) => (
          <li key={exp.id} className="relative sm:pl-12">
            <span
              aria-hidden
              className="absolute left-0 top-1.5 hidden size-4 rounded-full sm:block"
              style={{
                background:
                  "radial-gradient(closest-side, var(--grad-from), var(--grad-to))",
                boxShadow: "0 0 0 4px color-mix(in oklab, var(--background) 80%, transparent)",
              }}
            />
            <Reveal delay={i * 0.05}>
              <article className="group rounded-2xl border border-border bg-card p-6 ring-soft transition-colors hover:bg-accent/30 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {exp.role}{" "}
                      <span className="text-muted-foreground">·</span>{" "}
                      {exp.url ? (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-foreground/90 underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                        >
                          {exp.company}
                          <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        exp.company
                      )}
                    </h3>
                    {exp.location && (
                      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                        {exp.location}
                      </p>
                    )}
                  </div>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {formatRange(exp.start, exp.end)}
                  </span>
                </div>

                <p className="mt-4 text-sm text-foreground/90 sm:text-[15px]">{exp.blurb}</p>

                <ul className="mt-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-foreground/40"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.stack.map((s) => (
                    <Badge key={s} variant="muted" className="text-[11px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
