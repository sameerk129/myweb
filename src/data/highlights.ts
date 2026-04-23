export type Highlight = {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  caption: string;
  decimals?: number;
};

export const highlights: Highlight[] = [
  {
    id: "scale",
    value: 6,
    suffix: "×",
    label: "Platform scale",
    caption: "Took JSM agent capacity from 10K → 60K at Atlassian.",
  },
  {
    id: "uptime",
    value: 99.99,
    suffix: "%",
    decimals: 2,
    label: "Availability",
    caption: "Lifted SLA from 99.9% → 99.99% on tier-1 services.",
  },
  {
    id: "years",
    value: 11,
    suffix: "+",
    label: "Years building",
    caption: "Distributed backends in high-traffic production.",
  },
  {
    id: "arr",
    value: 1,
    prefix: "$",
    suffix: "M",
    label: "ARR generated",
    caption: "Compressed approval cycle 1 month → 4 days at Bizongo.",
  },
];
