"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Section } from "@/components/blocks/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CopyEmailButton } from "@/components/blocks/copy-email-button";
import { siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("That doesn't look like a valid email."),
  company: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(20, "A few sentences, please — at least 20 characters."),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: ContactPayload) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const ok = res.ok;
      track({ name: "contact_submit", payload: { ok } });
      if (!ok) throw new Error("Bad response");
      toast.success("Message sent.", { description: "I'll reply within 48 hours." });
      reset();
    } catch {
      toast.error("Couldn't send right now.", {
        description: `Please email me directly at ${siteConfig.email}.`,
      });
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something hard together."
      description="Reach out about Senior / Staff Backend or Platform Engineering roles, advisory work, or interesting systems problems."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Card className="flex flex-col gap-5 p-6 sm:p-8">
          <Badge variant="gradient" className="self-start">
            Currently open to roles
          </Badge>
          <h3 className="text-2xl font-semibold tracking-tight">
            Say hi — the human way.
          </h3>
          <p className="text-sm text-muted-foreground">
            Email is fastest. I read every message and reply within 48 hours.
          </p>
          <div className="flex flex-wrap gap-2">
            <CopyEmailButton variant="primary" />
            <Button asChild variant="secondary">
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer">
                Resume PDF
              </a>
            </Button>
          </div>
          <ul className="mt-4 grid gap-3 text-sm text-foreground/85">
            <li>
              <span className="text-muted-foreground">Best for:</span>{" "}
              Senior / Staff Backend & Platform roles, scalability consulting.
            </li>
            <li>
              <span className="text-muted-foreground">Timezone:</span> IST (UTC+5:30) — flexible.
            </li>
            <li>
              <span className="text-muted-foreground">Response time:</span> ≤ 48 hours.
            </li>
          </ul>
        </Card>

        <Card className="p-6 sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            data-testid="contact-form"
            className="grid gap-4"
          >
            <div className="grid gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your full name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="company">
                  Company <span className="opacity-60">(optional)</span>
                </Label>
                <Input id="company" placeholder="Where you're writing from" {...register("company")} />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="What are you building? What's the problem?"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                {...register("message")}
              />
              {errors.message && (
                <p id="message-error" role="alert" className="text-xs text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-[11px] text-muted-foreground">
                I treat your message like email — no marketing, ever.
              </p>
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="size-4" aria-hidden />
                )}
                {isSubmitting ? "Sending…" : "Send message"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Section>
  );
}
