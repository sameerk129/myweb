/**
 * Lightweight analytics shim.
 * Wire this up to PostHog / Plausible / Vercel Analytics by replacing `track`.
 * Reads NEXT_PUBLIC_ANALYTICS_PROVIDER for branching when needed.
 */

export type AnalyticsEvent =
  | { name: "cta_click"; payload: { id: string; href?: string } }
  | { name: "copy_email"; payload?: never }
  | { name: "open_command_palette"; payload?: never }
  | { name: "download_resume"; payload?: never }
  | { name: "contact_submit"; payload: { ok: boolean } }
  | { name: "easter_egg"; payload: { id: string } };

export function track<E extends AnalyticsEvent>(event: E) {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") {
    // Lightweight debug log only outside production.
    console.debug("[analytics]", event);
  }
}
