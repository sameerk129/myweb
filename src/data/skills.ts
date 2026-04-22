export type SkillGroup = {
  id: string;
  title: string;
  caption: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: "Backend",
    caption: "JVM-first, polyglot when it matters.",
    items: ["Java", "Spring Boot", "Django", "Ruby on Rails", "C#", ".NET", "Node.js"],
  },
  {
    id: "data",
    title: "Databases",
    caption: "Right tool, right workload.",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "DynamoDB", "Redshift", "BigTable"],
  },
  {
    id: "infra",
    title: "Cloud & Infra",
    caption: "Cloud-native, IaC, async by default.",
    items: ["AWS", "Azure", "Kafka", "Terraform"],
  },
  {
    id: "obs",
    title: "Observability",
    caption: "If you can't see it, you can't fix it.",
    items: ["Datadog", "Grafana", "Tempo", "Splunk", "Elasticsearch"],
  },
];
