import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * How many people are on the list, shown on the page only once it is big
 * enough to be a proof point (WAITLIST_COUNT_MIN, default 50). Never throws:
 * if the database is unreachable the page simply shows no number.
 */
export async function getWaitlistCount(): Promise<number | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const min = Number(process.env.WAITLIST_COUNT_MIN ?? 50);
  try {
    const { count, error } = await supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true })
      .abortSignal(AbortSignal.timeout(3_000));
    if (error || count == null) return null;
    return count >= (Number.isFinite(min) ? min : 50) ? count : null;
  } catch {
    return null;
  }
}
