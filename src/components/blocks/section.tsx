import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  bleed?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  bleed = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-24 sm:py-28 lg:py-32",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto w-full px-6 sm:px-8",
          bleed ? "max-w-[1400px]" : "max-w-6xl",
        )}
      >
        {(eyebrow || title || description) && (
          <header className="mb-12 max-w-2xl">
            {eyebrow && (
              <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-px w-6 bg-border" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
