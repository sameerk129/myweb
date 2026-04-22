import { cn } from "@/lib/utils";

export function AuroraBg({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute -top-32 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--grad-from) 35%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute top-40 left-[15%] h-[420px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--grad-via) 30%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute top-10 right-[10%] h-[380px] w-[480px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--grad-to) 28%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-[0.35]" />
      <div className="absolute inset-0 bg-noise opacity-[0.5] mix-blend-overlay" />
    </div>
  );
}
