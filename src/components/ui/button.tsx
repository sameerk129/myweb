"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "subtle";
type Size = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]",
  secondary:
    "bg-card text-foreground border border-border hover:bg-accent hover:text-accent-foreground",
  ghost: "text-foreground/80 hover:bg-accent hover:text-accent-foreground",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
  subtle:
    "bg-muted text-foreground hover:bg-muted/70",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-sm md:text-[15px]",
  icon: "h-10 w-10 p-0",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", asChild = false, ...props },
    ref,
  ) {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50 active:translate-y-[1px]",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
