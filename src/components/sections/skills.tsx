import { Section } from "@/components/blocks/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills matrix"
      title="The tools I reach for."
      description="Polyglot by necessity, JVM-first by preference. Strong opinions, loosely held."
    >
      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <StaggerItem key={group.id}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
                <CardDescription>{group.caption}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Badge key={item} variant="outline" className="text-[12px]">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
