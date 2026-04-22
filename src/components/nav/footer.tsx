import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { siteConfig } from "@/lib/site-config";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-xl text-background"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--grad-from), var(--grad-via), var(--grad-to))",
              }}
            >
              <span className="text-[12px] font-black tracking-tighter">SK</span>
            </span>
            <div>
              <p className="text-sm font-semibold">{siteConfig.name}</p>
              <p className="text-xs text-muted-foreground">{siteConfig.role}</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Designed and built with care. Deployed on Vercel. If something here
            sparks an idea — let&apos;s talk.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm md:items-end">
          <div className="flex items-center gap-2">
            <Link
              aria-label="LinkedIn"
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border p-2 text-foreground/80 transition-colors hover:bg-accent"
            >
              <LinkedinIcon className="size-4" />
            </Link>
            <Link
              aria-label="GitHub"
              href={siteConfig.socials.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border p-2 text-foreground/80 transition-colors hover:bg-accent"
            >
              <GithubIcon className="size-4" />
            </Link>
            <Link
              aria-label="Email"
              href={`mailto:${siteConfig.email}`}
              className="rounded-full border border-border p-2 text-foreground/80 transition-colors hover:bg-accent"
            >
              <Mail className="size-4" />
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js & Tailwind.
          </p>
        </nav>
      </div>
      <Separator />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-[11px] text-muted-foreground sm:px-8">
        <span>v1 · iterating in public</span>
        <span className="hidden sm:inline">Press ⌘K anywhere</span>
      </div>
    </footer>
  );
}
