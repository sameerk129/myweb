import { NextResponse } from "next/server";
import { contactSchema } from "@/components/sections/contact";

/**
 * Minimal, type-safe contact endpoint.
 * Hook this into Resend / Postmark / Slack webhook by replacing the `deliver` call.
 */
export const runtime = "nodejs";

const ipBucket = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // requests
const WINDOW_MS = 60_000; // per minute

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = ipBucket.get(ip);
  if (!entry || entry.resetAt < now) {
    ipBucket.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

async function deliver(payload: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] payload", payload);
    return;
  }
  // Wire to your provider here. e.g.:
  // await fetch("https://api.resend.com/emails", { ... });
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  await deliver(parsed.data);
  return NextResponse.json({ ok: true });
}
