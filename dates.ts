import { fmt } from "@/lib/i18n";

/**
 * Date helpers on plain "YYYY-MM-DD" strings. Everything is calendar-day math
 * in UTC so the server and the browser always agree (no time zones, no DST).
 */

export interface DateStrings {
  /** Month names used inside a date ("15 January"). */
  monthsGen: readonly string[];
  /** Short month names for the timeline axis ("Jan"). */
  monthsShort: readonly string[];
  /** Day + month + year. Placeholders: {d} {m} {y} */
  full: string;
  /** Day + month. Placeholders: {d} {m} */
  day: string;
  /** Day + short month. Placeholders: {d} {ms} */
  abbr: string;
}

const DAY_MS = 86_400_000;

/** Today in Tashkent (UTC+5, no daylight saving) as YYYY-MM-DD. */
export function todayInTashkent(now: Date = new Date()): string {
  return new Date(now.getTime() + 5 * 3_600_000).toISOString().slice(0, 10);
}

export function toDayNumber(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / DAY_MS);
}

export function fromDayNumber(n: number): string {
  return new Date(n * DAY_MS).toISOString().slice(0, 10);
}

/** Whole days from `a` to `b` (positive when b is later). */
export function diffDays(a: string, b: string): number {
  return toDayNumber(b) - toDayNumber(a);
}

export function startOfMonth(iso: string): string {
  return `${iso.slice(0, 8)}01`;
}

/** First day of the month that is `n` months after the month of `iso`. */
export function addMonths(iso: string, n: number): string {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1 + n, 1)).toISOString().slice(0, 10);
}

export function monthIndex(iso: string): number {
  return Number(iso.slice(5, 7)) - 1;
}

export function dayOfMonth(iso: string): number {
  return Number(iso.slice(8, 10));
}

export function formatDate(iso: string, s: DateStrings, style: "full" | "day" | "abbr" = "full"): string {
  const d = dayOfMonth(iso);
  const mi = monthIndex(iso);
  const y = iso.slice(0, 4);
  if (style === "abbr") return fmt(s.abbr, { d, ms: s.monthsShort[mi] });
  if (style === "day") return fmt(s.day, { d, m: s.monthsGen[mi] });
  return fmt(s.full, { d, m: s.monthsGen[mi], y });
}
