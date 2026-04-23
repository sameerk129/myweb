"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { BriefcaseBusiness, Command, FolderGit2, Mail, Moon, Sun, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { useCommandPalette } from "@/components/nav/command-palette";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { featureFlags } from "@/config/feature-flags";

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const { open: openPalette } = useCommandPalette();
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const handleHomeClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== "/") return;
      event.preventDefault();
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [pathname],
  );

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 32);
  });

  React.useEffect(() => {
    const updateNavMetrics = () => {
      if (window.innerWidth < 640) {
        document.documentElement.style.setProperty("--floating-nav-height", "0px");
        document.documentElement.style.setProperty("--floating-nav-top", "0px");
        return;
      }
      const navHeight = navRef.current?.offsetHeight ?? 56;
      document.documentElement.style.setProperty("--floating-nav-height", `${navHeight}px`);
      document.documentElement.style.setProperty("--floating-nav-top", "0.75rem");
    };

    updateNavMetrics();
    window.addEventListener("resize", updateNavMetrics);
    return () => window.removeEventListener("resize", updateNavMetrics);
  }, [scrolled]);

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-40 hidden sm:block" data-testid="floating-nav">
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
              <div ref={navRef} className="flex w-full items-center gap-1.5">
                <Link
                  href="/"
                  className="ml-2 flex items-center gap-2 px-2 text-sm font-semibold tracking-tight"
                  aria-label={`${siteConfig.shortName} home`}
                  onClick={handleHomeClick}
                >
                  <Logo />
                  <span>{siteConfig.shortName}</span>
                </Link>
                <div className="bg-border mx-1 hidden h-5 w-px sm:block" />
                <ul className="hidden flex-1 items-center justify-center gap-0.5 sm:flex">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className={cn(
                          "text-foreground/75 rounded-full px-3 py-1.5 text-[13px] transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="ml-auto flex items-center gap-1">
                  <Button
                    type="button"
                    variant="subtle"
                    size="sm"
                    onClick={openPalette}
                    className="hidden gap-2 px-2.5 sm:inline-flex"
                    aria-label="Open command palette"
                  >
                    <Command className="size-3.5" aria-hidden />
                    <span className="text-muted-foreground text-[11px] tracking-wide">⌘K</span>
                  </Button>
                  <ThemeToggle className="relative" />
                </div>
              </div>
            </motion.nav>
          </AnimatePresence>
        </div>
      </header>
      <MobileThemeFab />
      <MobileBottomNav onHomeClick={handleHomeClick} />
    </>
  );
}

function Logo() {
  return (
    <span
      aria-hidden
      className="text-background grid h-7 w-7 place-items-center rounded-lg"
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--grad-from), var(--grad-via), var(--grad-to))",
      }}
    >
      <span className="text-[11px] font-black tracking-tighter">SK</span>
    </span>
  );
}

function MobileBottomNav({
  onHomeClick,
}: {
  onHomeClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const hideLabels = featureFlags.mobileBottomNavHideLabels;
  const sectionItems = React.useMemo(
    () =>
      [
        { id: "work", label: "Work", href: "#experience-heading", icon: BriefcaseBusiness },
        { id: "projects", label: "Projects", href: "#projects-heading", icon: FolderGit2 },
        { id: "skills", label: "Skills", href: "#skills-heading", icon: Wrench },
        { id: "contact", label: "Contact", href: "#contact-heading", icon: Mail },
      ] as const,
    [],
  );
  const mobileItems = React.useMemo(
    () =>
      [
        sectionItems[0],
        sectionItems[1],
        { id: "home", label: "Top", href: "/" },
        sectionItems[2],
        sectionItems[3],
      ] as const,
    [sectionItems],
  );
  const [activeId, setActiveId] = React.useState<string>("home");
  const manualTargetRef = React.useRef<string | null>(null);
  const manualLockTimeoutRef = React.useRef<number | null>(null);

  const applyManualTargetLock = React.useCallback((targetId: string) => {
    manualTargetRef.current = targetId;
    setActiveId(targetId);

    if (manualLockTimeoutRef.current !== null) {
      window.clearTimeout(manualLockTimeoutRef.current);
    }

    // Keep tapped tab active while smooth anchor scroll is in flight.
    manualLockTimeoutRef.current = window.setTimeout(() => {
      manualTargetRef.current = null;
      manualLockTimeoutRef.current = null;
    }, 900);
  }, []);

  React.useEffect(() => {
    const getOrderedHeadings = () => {
      return sectionItems
        .map((item) => {
          const el = document.getElementById(item.href.replace("#", ""));
          if (!el) return null;
          return { id: item.id as string, el, top: el.offsetTop };
        })
        .filter((entry): entry is { id: string; el: HTMLElement; top: number } => !!entry)
        .sort((a, b) => a.top - b.top);
    };

    const getCurrentByViewport = () => {
      const threshold = Math.max(72, window.innerHeight * 0.28);
      let current = sectionItems[0].id as string;
      let nextCandidate: string | null = null;
      let nextTop = Number.POSITIVE_INFINITY;
      const orderedHeadings = getOrderedHeadings();

      for (const heading of orderedHeadings) {
        const top = heading.el.getBoundingClientRect().top;
        if (top <= threshold) {
          current = heading.id;
        } else if (top < nextTop) {
          nextTop = top;
          nextCandidate = heading.id;
        }
      }

      if (window.scrollY < 8 && nextCandidate) {
        return "home";
      }
      return current || nextCandidate || "home";
    };

    const updateActiveSection = () => {
      if (manualTargetRef.current) {
        setActiveId((prev) => (prev === manualTargetRef.current ? prev : manualTargetRef.current!));
        return;
      }
      const current = getCurrentByViewport();
      setActiveId((prev) => (prev === current ? prev : current));
    };

    const updateFromHash = () => {
      const hash = window.location.hash;
      if (!hash) {
        if (window.scrollY < 8) setActiveId("home");
        return;
      }
      const match = sectionItems.find((item) => item.href === hash);
      if (match) {
        setActiveId(match.id as string);
      }
    };

    const headingElements = getOrderedHeadings().map((entry) => entry.el);

    const observer = new IntersectionObserver(
      () => {
        updateActiveSection();
      },
      {
        root: null,
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0, 0.1, 0.3, 0.6, 1],
      },
    );

    for (const el of headingElements) {
      observer.observe(el);
    }

    updateActiveSection();
    updateFromHash();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateFromHash);
    return () => {
      if (manualLockTimeoutRef.current !== null) {
        window.clearTimeout(manualLockTimeoutRef.current);
      }
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [mobileItems, sectionItems]);

  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 sm:hidden" aria-label="Mobile navigation">
      <div className="glass border-border/80 grid grid-cols-5 rounded-2xl border px-1.5 py-1.5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.55)]">
        {mobileItems.map((item) => {
          if (item.id === "home") {
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => {
                  applyManualTargetLock("home");
                  onHomeClick(event);
                }}
                aria-label="Top mobile"
                className={cn(
                  "text-foreground/85 hover:text-accent-foreground flex min-h-12 flex-col items-center justify-center rounded-xl px-1 text-[11px] font-semibold transition-colors",
                  hideLabels ? "gap-0.5" : "gap-1",
                  activeId === "home" && "text-accent-foreground shadow-none",
                )}
              >
                <span
                  className={cn(
                    "border-border/60 grid size-12 place-items-center rounded-full border bg-[linear-gradient(145deg,var(--grad-from),var(--grad-via),var(--grad-to))] shadow-[0_14px_30px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/15 transition-transform",
                    activeId === "home" ? "scale-100" : "scale-[0.97]",
                  )}
                >
                  <Logo />
                </span>
              </a>
            );
          }

          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => applyManualTargetLock(item.id as string)}
              aria-label={`${item.label} mobile`}
              className={cn(
                "text-foreground/78 hover:bg-accent hover:text-accent-foreground flex min-h-12 flex-col items-center justify-center rounded-xl px-1 text-[11px] font-medium transition-colors",
                hideLabels ? "gap-0.5" : "gap-1",
                activeId === item.id && "bg-accent text-accent-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {!hideLabels && <span aria-hidden>{item.label}</span>}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function MobileThemeFab() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const current = (theme === "system" ? resolvedTheme : theme) ?? "dark";
  const isDark = current === "dark";

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      aria-label="Toggle mobile theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed relative right-4 bottom-[5.8rem] z-40 size-11 rounded-full shadow-[0_12px_30px_-16px_rgba(0,0,0,0.5)] sm:hidden"
    >
      <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
