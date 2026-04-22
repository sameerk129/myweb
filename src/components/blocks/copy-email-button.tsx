"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { toast } from "sonner";

export function CopyEmailButton({
  variant = "secondary",
  className,
  label,
}: {
  variant?: React.ComponentProps<typeof Button>["variant"];
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      track({ name: "copy_email" });
      toast.success("Email copied", { description: siteConfig.email });
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Couldn't copy — please copy manually.");
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      onClick={copy}
      aria-label="Copy email"
      className={className}
    >
      {copied ? (
        <Check className="size-4" aria-hidden />
      ) : (
        <Copy className="size-4" aria-hidden />
      )}
      <span>{label ?? (copied ? "Copied" : siteConfig.email)}</span>
    </Button>
  );
}
