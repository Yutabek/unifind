import "server-only";

/**
 * Best-effort limiter: a few attempts per minute per visitor, kept in memory.
 * On serverless each instance has its own memory, so this only slows down
 * naive repeated submits. Real protection comes from the unique contact
 * constraint in the database, the honeypot, and (optionally) Vercel's
 * Bot Protection / WAF rate limiting. See README.
 */

const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;
const hits = new Map<string, number[]>();

export function tooManyAttempts(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // keep the map from growing forever
  if (hits.size > 5_000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_ATTEMPTS;
}
