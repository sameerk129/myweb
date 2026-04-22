export type ProjectStatus = "shipped" | "beta" | "wip" | "archived";

export type Project = {
  id: string;
  name: string;
  summary: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  metrics?: { label: string; value: string }[];
  github?: string;
  demo?: string;
  image?: string;
  accent?: "violet" | "cyan" | "emerald" | "amber" | "rose";
};

export const projects: Project[] = [
  {
    id: "jsm-capacity-scale",
    name: "JSM Capacity Scale (Atlassian)",
    summary: "Scaled Jira Service Management from 10K to 60K agents.",
    description:
      "Identified and removed distributed-system bottlenecks across critical service paths, enabling 6x capacity growth while protecting reliability and latency.",
    stack: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "AWS"],
    status: "shipped",
    metrics: [
      { label: "Capacity", value: "10K → 60K agents" },
      { label: "Scale gain", value: "6x" },
    ],
    accent: "cyan",
  },
  {
    id: "sla-reliability",
    name: "SLA Reliability Uplift",
    summary: "Improved platform availability from 99.9% to 99.99%.",
    description:
      "Built reliability guardrails, incident automation, and database remediations that significantly reduced operational risk in high-traffic production environments.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Datadog", "Grafana"],
    status: "shipped",
    metrics: [
      { label: "Availability", value: "99.9% → 99.99%" },
      { label: "Incidents", value: "Auto-triggering enabled" },
    ],
    accent: "emerald",
  },
  {
    id: "aws-platform-migration",
    name: "AWS to Internal Platform Migration",
    summary: "Migrated production AWS workloads to Atlassian internal platform.",
    description:
      "Led migration planning and execution with a focus on reliability and scalability, reducing platform fragility while preserving service behavior.",
    stack: ["AWS", "Terraform", "Kubernetes", "Java", "Observability"],
    status: "shipped",
    metrics: [
      { label: "Outcome", value: "Safe workload migration" },
      { label: "Impact", value: "Higher platform resilience" },
    ],
    accent: "violet",
  },
  {
    id: "instawork-booking-migration",
    name: "Booking Service Migration (Instawork)",
    summary: "Migrated booking service for scalable multi-team usage.",
    description:
      "Restructured service boundaries and integrations to support faster iteration and safer ownership handoffs across teams.",
    stack: ["Ruby on Rails", "PostgreSQL", "Redis", "AWS"],
    status: "shipped",
    metrics: [
      { label: "Engineer time saved", value: "~5 days/month/service" },
      { label: "Adoption", value: "Multi-team enablement" },
    ],
    accent: "amber",
  },
  {
    id: "instawork-business-app",
    name: "Business App Revamp (Instawork)",
    summary: "Revamped Business App workflows to drive adoption.",
    description:
      "Redesigned backend flows and reliability pathways for the business application, making day-to-day operations faster and easier for teams.",
    stack: ["Ruby on Rails", "PostgreSQL", "Redis", "AWS"],
    status: "shipped",
    metrics: [
      { label: "Adoption", value: "10% → 70%" },
      { label: "Outcome", value: "Higher business usage" },
    ],
    accent: "rose",
  },
  {
    id: "bizongo-artwork-approval",
    name: "Artwork Approval Platform (Bizongo)",
    summary: "Cut approval cycle from one month to four days per artwork.",
    description:
      "Built and scaled a workflow platform that compressed approval timelines and improved commercial throughput for packaging operations.",
    stack: ["Django", "PostgreSQL", "Redis", "AWS"],
    status: "shipped",
    metrics: [
      { label: "Cycle time", value: "1 month → 4 days" },
      { label: "Revenue impact", value: "$1M ARR" },
    ],
    accent: "emerald",
  },
  {
    id: "bizongo-auth-platform",
    name: "Centralized Auth Service (Bizongo)",
    summary: "Built centralized user/auth platform across products.",
    description:
      "Implemented shared authentication and user management capabilities that enabled GDPR readiness and accelerated product launches.",
    stack: ["Django", "PostgreSQL", "Redis", "Elasticsearch"],
    status: "shipped",
    metrics: [
      { label: "Compliance", value: "GDPR ready" },
      { label: "Delivery", value: "Faster launches" },
    ],
    accent: "cyan",
  },
  {
    id: "greyorange-warehouse-comms",
    name: "Warehouse TCP/UDP Communication System",
    summary: "Built low-latency communication stack for warehouse bots.",
    description:
      "Designed device communication and remote diagnosis capabilities for warehouse automation, reducing travel overhead and improving field support speed.",
    stack: ["C#", ".NET", "TCP/UDP"],
    status: "archived",
    metrics: [
      { label: "Domain", value: "Warehouse automation" },
      { label: "Ops impact", value: "Reduced travel cost" },
    ],
    accent: "amber",
  },
];
