"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { useCommandPalette } from "@/components/nav/command-palette";

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const { open: openPalette } = useCommandPalette();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 32);
  });

  return (
    <header
      className="fixed inset-x-0 top-3 z-40"
      data-testid="floating-nav"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.nav
            key={scrolled ? "compact" : "wide"}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className={cn(
              "glass flex w-full items-center gap-1.5 rounded-full px-2 py-2 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]",
              scrolled && "backdrop-blur-xl",
            )}
            aria-label="Primary"
          >
            <Link
              href="/"
              className="ml-2 flex items-center gap-2 px-2 text-sm font-semibold tracking-tight"
              aria-label={`${siteConfig.shortName} home`}
            >
              <Logo />
              <span className="hidden sm:inline">{siteConfig.shortName}</span>
            </Link>
            <div className="mx-1 hidden h-5 w-px bg-border sm:block" />
            <ul className="flex flex-1 items-center justify-center gap-0.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-[13px] text-foreground/75 transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              variant="subtle"
              size="sm"
              onClick={openPalette}
              className="hidden gap-2 px-2.5 sm:inline-flex"
              aria-label="Open command palette"
            >
              <Command className="size-3.5" aria-hidden />
              <span className="text-[11px] tracking-wide text-muted-foreground">⌘K</span>
            </Button>
            <ThemeToggle className="relative" />
          </motion.nav>
        </AnimatePresence>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span
      aria-hidden
      className="grid h-7 w-7 place-items-center rounded-lg text-background"
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--grad-from), var(--grad-via), var(--grad-to))",
      }}
    >
      <span className="text-[11px] font-black tracking-tighter">SK</span>
    </span>
  );
}
