"use server";

import { headers } from "next/headers";

import { getDict } from "@/lib/dictionaries";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";
import { tooManyAttempts } from "@/lib/rate-limit";
import { SITE } from "@/lib/site";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  cleanTag,
  cleanText,
  isInterest,
  isRole,
  isStudentBand,
  parseContact,
  type Interest,
} from "@/lib/validation";
import type { FieldErrors, WaitlistState } from "@/lib/waitlist-state";

/**
 * Early-access form. Runs only on the server, so the Supabase SECRET key
 * never reaches the browser.
 *
 * Order of checks: bots (honeypot, too-fast) → rate limit → validation →
 * insert. Bots get a fake "success" so they learn nothing.
 */
export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const rawLocale = formData.get("locale");
  const locale: Locale = typeof rawLocale === "string" && isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = (await getDict(locale)).waitlist;

  // 1. Bots: a hidden field humans never fill, and a form submitted in under 2 seconds.
  if (cleanText(formData.get("website"), 200)) return { status: "success", already: false };
  const startedAt = Number(formData.get("ts"));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 2_000) {
    return { status: "success", already: false };
  }

  // 2. Rate limit per visitor.
  const h = await headers();
  const visitor = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (tooManyAttempts(visitor)) return { status: "error", message: t.errors.rate };

  // 3. Validate.
  const fieldErrors: FieldErrors = {};

  const roleValue = formData.get("role");
  const role = isRole(roleValue) ? roleValue : null;
  if (!role) fieldErrors.role = t.errors.role;

  const contactRaw = formData.get("contact");
  const contact = parseContact(typeof contactRaw === "string" ? contactRaw : "");
  if (!contact) fieldErrors.contact = t.errors.contact;

  if (formData.get("consent") !== "on") fieldErrors.consent = t.errors.consent;

  const org = cleanText(formData.get("org"), 120);
  if (role === "agency" && (!org || org.length < 2)) fieldErrors.org = t.errors.org;

  if (!role || !contact || Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  const bandValue = formData.get("students");
  const interests: Interest[] = [...new Set(formData.getAll("interests").filter(isInterest))].slice(0, 5);

  const row = {
    role,
    contact: contact.value,
    contact_type: contact.type,
    full_name: cleanText(formData.get("name"), 80),
    org_name: role === "agency" ? org : null,
    students_band: role === "agency" && isStudentBand(bandValue) ? bandValue : null,
    interests,
    locale,
    source: cleanTag(formData.get("source")),
    medium: cleanTag(formData.get("medium")),
    campaign: cleanTag(formData.get("campaign")),
    consent_at: new Date().toISOString(),
    consent_version: SITE.consentVersion,
  };

  // 4. Store.
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without Supabase: pretend it worked so the UI can be tried.
      console.info("[waitlist] Supabase is not configured: demo mode, nothing was saved.", row);
      return { status: "success", already: false };
    }
    console.error("[waitlist] Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY.");
    return { status: "error", message: t.errors.unavailable };
  }

  const { error } = await supabase.from("waitlist").insert(row);
  if (error) {
    // 23505 = unique violation: this contact is already on the list. Not an error for the person.
    if (error.code === "23505") return { status: "success", already: true };
    console.error("[waitlist] insert failed:", error.code, error.message);
    return { status: "error", message: t.errors.generic };
  }

  return { status: "success", already: false };
}
