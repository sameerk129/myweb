import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRange(start: string, end?: string | null) {
  if (!end) return `${start} — Present`;
  return `${start} — ${end}`;
}
