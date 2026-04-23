"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuroraBg } from "@/components/blocks/aurora-bg";
import { LogoScatterBg } from "@/components/blocks/logo-scatter-bg";
import { CopyEmailButton } from "@/components/blocks/copy-email-button";
import { siteConfig } from "@/lib/site-config";
import { profile } from "@/data/profile";
import { track } from "@/lib/analytics";
import { featureFlags } from "@/config/feature-flags";
import { cn } from "@/lib/utils";

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[92vh] items-start"
      style={{
        paddingTop:
          "calc(var(--floating-nav-top, 0.75rem) + var(--floating-nav-height, 56px) + 36px)",
      }}
    >
      <AuroraBg />
      {featureFlags.heroLogoScatterBackground && <LogoScatterBg />}
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-6"
        >
          <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-[12px]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </Badge>

          <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-[5rem]">
            Backend systems that
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient">stay calm at scale.</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed text-pretty sm:text-lg">
            I&apos;m <span className="text-foreground">Sameer Kumar</span> — a Senior Backend
            Engineer with 11+ years scaling distributed platforms in production. Currently at{" "}
            <span className="text-foreground">Atlassian</span>, where I took Jira Service Management
            from 10K → 60K agents and lifted SLA from 99.9% → 99.99%.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="group"
              onClick={() =>
                track({
                  name: "cta_click",
                  payload: { id: "hero_resume", href: siteConfig.resumeUrl },
                })
              }
            >
              <a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer">
                <Download className="size-4" />
                View Resume
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              onClick={() =>
                track({ name: "cta_click", payload: { id: "hero_contact", href: "#contact" } })
              }
            >
              <a href="#contact">
                <Sparkles className="size-4" />
                Contact me
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              onClick={() =>
                track({
                  name: "cta_click",
                  payload: { id: "hero_linkedin", href: siteConfig.socials.linkedin },
                })
              }
            >
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer">
                <LinkedinIcon className="size-4" />
                LinkedIn
              </a>
            </Button>
            <CopyEmailButton variant="ghost" />
          </div>

          <div className="mt-3 flex w-full max-w-4xl flex-wrap items-center gap-2.5">
            <p className="text-muted-foreground w-full text-[11px] tracking-[0.16em] uppercase">
              Experience Across
            </p>
            <OrgLogo
              label="Atlassian"
              srcLight="/logos/light/atlassian.svg"
              srcDark="/logos/dark/atlassian.svg"
              highlight
              logoClassName="h-5.5 w-auto max-w-[1.6rem]"
            />
            <OrgLogo
              label="IIT Kanpur"
              srcLight="/logos/light/iit-kanpur.png"
              srcDark="/logos/dark/iit-kanpur.png"
              highlight
              logoClassName="h-5 w-auto max-w-[1.9rem]"
            />
            <OrgLogo
              label="Instawork"
              srcLight="/logos/light/instawork.svg"
              srcDark="/logos/dark/instawork.svg"
              hideLabel
              logoClassName="h-4.5 w-auto max-w-[5.1rem]"
            />
            <OrgLogo
              label="GreyOrange"
              srcLight="/logos/light/greyorange.png"
              srcDark="/logos/dark/greyorange.png"
              hideLabel
              logoClassName="h-4.5 w-auto max-w-[5.6rem]"
            />
            <OrgLogo
              label="Bizongo"
              srcLight="/logos/light/bizongo.svg"
              srcDark="/logos/dark/bizongo.svg"
              hideLabel
              logoClassName="h-4.5 w-auto max-w-[4.7rem]"
            />
          </div>

          <dl className="border-border mt-10 grid w-full max-w-3xl grid-cols-2 gap-x-8 gap-y-3 border-t pt-6 text-sm sm:grid-cols-4">
            <Stat label="Currently" value="Atlassian" />
            <Stat label="Education" value={profile.education.school} />
            <Stat
              label="Based"
              value={siteConfig.location}
              icon={<MapPin className="size-3.5" />}
            />
            <Stat label="Open to" value="Sr / Staff roles" />
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

function OrgLogo({
  label,
  srcLight,
  srcDark,
  highlight = false,
  hideLabel = false,
  logoClassName,
}: {
  label: string;
  srcLight: string;
  srcDark: string;
  highlight?: boolean;
  hideLabel?: boolean;
  logoClassName?: string;
}) {
  return (
    <div
      className={
        highlight
          ? "text-foreground/90 inline-flex items-center gap-2.5 rounded-full border border-cyan-300/35 bg-gradient-to-r from-cyan-500/12 to-violet-500/12 px-3 py-2 text-xs shadow-[0_0_0_1px_rgba(34,211,238,0.1),0_8px_24px_-16px_rgba(99,102,241,0.45)]"
          : "border-border/70 bg-card/70 text-foreground/85 inline-flex items-center gap-2.5 rounded-full border px-3 py-2 text-xs"
      }
    >
      <span className="flex h-7 min-w-[2.5rem] items-center justify-center overflow-hidden rounded-sm bg-white/[0.06] px-1.5">
        <img
          src={srcLight}
          alt=""
          aria-hidden
          className={cn(
            "block h-4.5 w-auto max-w-[4.8rem] object-contain dark:hidden",
            logoClassName,
          )}
        />
        <img
          src={srcDark}
          alt=""
          aria-hidden
          className={cn(
            "hidden h-4.5 w-auto max-w-[4.8rem] object-contain dark:block",
            logoClassName,
          )}
        />
      </span>
      {!hideLabel && <span>{label}</span>}
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <dt className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">{label}</dt>
      <dd className="text-foreground mt-1 inline-flex items-center gap-1.5">
        {icon}
        {value}
      </dd>
    </div>
  );
}
