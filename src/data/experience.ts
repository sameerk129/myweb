export type Experience = {
  id: string;
  company: string;
  role: string;
  start: string;
  end?: string | null;
  location?: string;
  blurb: string;
  highlights: string[];
  stack: string[];
  url?: string;
};

export const experiences: Experience[] = [
  {
    id: "atlassian",
    company: "Atlassian",
    role: "Senior Software Engineer",
    start: "Dec 2024",
    end: null,
    location: "Bengaluru",
    blurb:
      "Scaling Jira Service Management — distributed systems, capacity engineering, platform migration.",
    highlights: [
      "Increased JSM capacity from 10K → 60K agents (6× scale).",
      "Identified and unblocked bottlenecks across distributed services.",
      "Migrated AWS workloads to Atlassian's internal platform.",
      "Lifted SLA availability from 99.9% → 99.99%.",
      "Automated incident triggering and fixed critical DB failure modes.",
    ],
    stack: ["Java", "Spring Boot", "Kafka", "AWS", "DynamoDB", "Datadog"],
    url: "https://www.atlassian.com",
  },
  {
    id: "instawork",
    company: "Instawork",
    role: "Senior Software Engineer",
    start: "May 2022",
    end: "Aug 2023",
    location: "Bengaluru",
    blurb:
      "Platformized booking — multi-team scalable usage and BizApp adoption from 10% → 70%.",
    highlights: [
      "Migrated booking service to multi-team scalable usage model.",
      "Saved ~5 engineer-days/month per consuming service.",
      "Led the Business App revamp end-to-end.",
      "Drove product adoption from 10% → 70%.",
    ],
    stack: ["Python", "Django", "PostgreSQL", "Redis", "AWS"],
    url: "https://www.instawork.com",
  },
  {
    id: "bizongo",
    company: "Bizongo",
    role: "Software Engineer II",
    start: "Jul 2018",
    end: "May 2022",
    location: "Mumbai",
    blurb:
      "Built core platform services — auth, GDPR readiness, artwork approval pipeline ($1M ARR).",
    highlights: [
      "Reduced artwork approval cycle from 1 month → 4 days.",
      "Generated $1M ARR via the new approval workflow.",
      "Built centralized user/auth service used across products.",
      "Enabled GDPR readiness and faster product launches.",
    ],
    stack: ["Ruby on Rails", "Node.js", "PostgreSQL", "MongoDB", "AWS"],
    url: "https://www.bizongo.com",
  },
  {
    id: "greyorange",
    company: "GreyOrange",
    role: "Software Engineer",
    start: "May 2015",
    end: "Jul 2018",
    location: "Gurugram",
    blurb:
      "Warehouse robotics — TCP/UDP communication, remote diagnostics for fleet operations.",
    highlights: [
      "Built TCP/UDP warehouse automation communication system.",
      "Enabled remote diagnosis, materially reducing travel cost.",
    ],
    stack: ["C#", ".NET", "Java", "TCP/UDP"],
    url: "https://www.greyorange.com",
  },
];
