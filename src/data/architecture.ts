import type { LucideIcon } from "lucide-react";
import {
  Activity,
  GaugeCircle,
  Network,
  Radar,
  ShieldCheck,
} from "lucide-react";

export type Pillar = {
  id: string;
  title: string;
  blurb: string;
  bullets: string[];
  Icon: LucideIcon;
};

export const architecturePillars: Pillar[] = [
  {
    id: "scalability",
    title: "Scalability",
    blurb:
      "Design for the next order of magnitude — capacity models, sharding, async patterns.",
    bullets: [
      "Capacity engineering for 6× growth",
      "Hot-path partitioning & backpressure",
      "Stateless services, queue-shaped traffic",
    ],
    Icon: GaugeCircle,
  },
  {
    id: "reliability",
    title: "Reliability",
    blurb: "SLOs over vibes. Error budgets, graceful degradation, failure-first design.",
    bullets: [
      "99.9% → 99.99% on tier-1 systems",
      "Idempotency & retry budgets",
      "Blast-radius isolation",
    ],
    Icon: ShieldCheck,
  },
  {
    id: "distributed",
    title: "Distributed Systems",
    blurb:
      "Consistency you can reason about — events, sagas, ordering guarantees, exactly-once enough.",
    bullets: [
      "Event-driven & log-shaped architectures",
      "Outbox + CDC patterns",
      "Multi-region thinking",
    ],
    Icon: Network,
  },
  {
    id: "incidents",
    title: "Incident Management",
    blurb: "Calm under pressure. Runbooks, automation, post-incident learning.",
    bullets: [
      "Automated incident triggering",
      "Hot-path runbooks",
      "Blameless postmortems → action items",
    ],
    Icon: Activity,
  },
  {
    id: "observability",
    title: "Observability",
    blurb: "Metrics, traces, and logs as a product surface for the on-call.",
    bullets: [
      "RED/USE dashboards",
      "Trace-driven debugging",
      "SLO + alert hygiene",
    ],
    Icon: Radar,
  },
];
