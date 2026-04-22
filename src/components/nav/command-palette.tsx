"use client";

import * as React from "react";
import { Command } from "cmdk";
import {
  ArrowUpRight,
  Briefcase,
  FileDown,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Rocket,
  Sun,
  Wrench,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { useTheme } from "next-themes";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

type Ctx = { open: () => void; close: () => void; toggle: () => void; isOpen: boolean };

const PaletteCtx = React.createContext<Ctx | null>(null);

export function useCommandPalette() {
  const ctx = React.useContext(PaletteCtx);
  if (!ctx) throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  return ctx;
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  const ctx: Ctx = React.useMemo(
    () => ({
      isOpen,
      open: () => {
        setOpen(true);
        track({ name: "open_command_palette" });
      },
      close: () => setOpen(false),
      toggle: () => setOpen((v) => !v),
    }),
    [isOpen],
  );

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        track({ name: "open_command_palette" });
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(href: string, opts?: { external?: boolean; cta?: string }) {
    setOpen(false);
    if (opts?.cta) track({ name: "cta_click", payload: { id: opts.cta, href } });
    if (opts?.external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.assign(href);
    }
  }

  return (
    <PaletteCtx.Provider value={ctx}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/55 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            role="dialog"
            aria-label="Command palette"
            aria-modal
          >
            <Command label="Command palette" className="bg-card text-foreground">
              <div className="border-b border-border p-3">
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search…"
                  className={cn(
                    "h-10 w-full bg-transparent px-1 text-sm outline-none",
                    "placeholder:text-muted-foreground/70",
                  )}
                />
              </div>
              <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No results.
                </Command.Empty>

                <Command.Group heading="Jump to" className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  <Item icon={<Rocket className="size-4" />} onSelect={() => go("#hero")}>
                    Top
                  </Item>
                  <Item icon={<Briefcase className="size-4" />} onSelect={() => go("#experience")}>
                    Experience
                  </Item>
                  <Item icon={<Wrench className="size-4" />} onSelect={() => go("#skills")}>
                    Skills
                  </Item>
                  <Item icon={<Rocket className="size-4" />} onSelect={() => go("#projects")}>
                    Projects
                  </Item>
                  <Item icon={<MapPin className="size-4" />} onSelect={() => go("#travel")}>
                    Travel
                  </Item>
                  <Item icon={<MessageCircle className="size-4" />} onSelect={() => go("#contact")}>
                    Contact
                  </Item>
                </Command.Group>

                <Command.Group heading="Actions" className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <Item
                    icon={<FileDown className="size-4" />}
                    onSelect={() => {
                      track({ name: "download_resume" });
                      go(siteConfig.resumeUrl, { external: true, cta: "palette_resume" });
                    }}
                  >
                    Download resume
                  </Item>
                  <Item icon={<Mail className="size-4" />} onSelect={() => go(`mailto:${siteConfig.email}`)}>
                    Email me
                  </Item>
                  <Item
                    icon={<LinkedinIcon className="size-4" />}
                    onSelect={() => go(siteConfig.socials.linkedin, { external: true, cta: "palette_linkedin" })}
                  >
                    LinkedIn <External />
                  </Item>
                  <Item
                    icon={<GithubIcon className="size-4" />}
                    onSelect={() => go(siteConfig.socials.github, { external: true, cta: "palette_github" })}
                  >
                    GitHub <External />
                  </Item>
                </Command.Group>

                <Command.Group heading="Theme" className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <Item icon={<Moon className="size-4" />} onSelect={() => { setTheme("dark"); setOpen(false); }}>
                    Dark mode
                  </Item>
                  <Item icon={<Sun className="size-4" />} onSelect={() => { setTheme("light"); setOpen(false); }}>
                    Light mode
                  </Item>
                </Command.Group>
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </PaletteCtx.Provider>
  );
}

function Item({
  icon,
  children,
  onSelect,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm",
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
      )}
    >
      <span className="text-muted-foreground">{icon}</span>
      <span className="flex flex-1 items-center justify-between">{children}</span>
    </Command.Item>
  );
}

function External() {
  return <ArrowUpRight className="size-3.5 text-muted-foreground" aria-hidden />;
}
