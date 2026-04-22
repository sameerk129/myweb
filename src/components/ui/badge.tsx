import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "success" | "warning" | "muted" | "gradient";

const variantClasses: Record<Variant, string> = {
  default: "bg-foreground text-background",
  outline: "border border-border text-foreground/80",
  success:
    "bg-[color-mix(in_oklab,var(--success)_18%,transparent)] text-[color-mix(in_oklab,var(--success)_90%,white)] border border-[color-mix(in_oklab,var(--success)_25%,transparent)]",
  warning:
    "bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] text-[color-mix(in_oklab,var(--warning)_92%,white)] border border-[color-mix(in_oklab,var(--warning)_25%,transparent)]",
  muted: "bg-muted text-muted-foreground",
  gradient:
    "text-background bg-[linear-gradient(120deg,var(--grad-from),var(--grad-via),var(--grad-to))]",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
