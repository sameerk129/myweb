import type { Metadata } from "next";
import { Section } from "@/components/blocks/section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on distributed systems, reliability, and the operational craft of running tier-1 services.",
};

export default function BlogIndex() {
  return (
    <Section
      eyebrow="Notes"
      title="Writing, soon."
      description="A blog-ready architecture is wired up. Posts will land here — distributed systems, reliability, and operational craft."
    >
      <Card className="p-8 text-sm text-muted-foreground">
        No posts yet. Subscribe via{" "}
        <a className="underline" href="/rss.xml">
          RSS
        </a>{" "}
        — coming with the first post.
      </Card>
    </Section>
  );
}
