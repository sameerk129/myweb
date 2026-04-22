import { Section } from "@/components/blocks/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      eyebrow="Voices"
      title="What teammates say."
      description="A few placeholder quotes — to be replaced with real attributed testimonials."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.06}>
            <Card className="relative h-full p-6">
              <span
                aria-hidden
                className="absolute -top-3 left-5 rounded-full bg-card px-2 text-2xl text-muted-foreground"
              >
                “
              </span>
              <p className="text-[15px] leading-relaxed text-foreground/90">
                {t.quote}
              </p>
              <footer className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role} · {t.company}
                </p>
              </footer>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
