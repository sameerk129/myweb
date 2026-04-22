import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, type = "text", ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-border bg-card/60 px-3 py-2 text-sm text-foreground",
        "placeholder:text-muted-foreground/70",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors",
        className,
      )}
      {...props}
    />
  );
});
