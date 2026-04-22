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
  const headingId = id ? `${id}-heading` : undefined;
  const isFirstContentSection = id === "highlights";

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 pt-20 pb-24 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32",
        !isFirstContentSection && "mt-10 sm:mt-12 lg:mt-14",
        className,
      )}
      {...props}
    >
      <div className={cn("mx-auto w-full px-6 sm:px-8", bleed ? "max-w-[1400px]" : "max-w-6xl")}>
        {(eyebrow || title || description) && (
          <header
            id={headingId}
            className="mb-12 max-w-2xl"
            style={{
              scrollMarginTop:
                "calc(var(--floating-nav-top, 0.75rem) + var(--floating-nav-height, 56px) + 12px)",
            }}
          >
            {eyebrow && (
              <div className="text-muted-foreground mb-3 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase">
                <span className="bg-border h-px w-6" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.6rem]">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-[17px]">
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
