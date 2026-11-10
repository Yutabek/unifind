/**
 * Single place to rename the brand and set contact details.
 * "Hamroh" (Uzbek: travel companion) is a working name. Change `name` here
 * and it updates the header, footer, metadata, legal pages and social image.
 */

const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;

function normalizeUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return undefined;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export const SITE = {
  name: "Hamroh",
  /** Public URL of the site, no trailing slash. */
  url:
    normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeUrl(vercelProd) ??
    "http://localhost:3000",
  /** Legal entity shown in the footer and legal pages. */
  company: process.env.NEXT_PUBLIC_COMPANY_NAME?.trim() || "Your Company LLC",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@example.uz",
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL?.trim() || "",
  /** Bump when the privacy notice changes; stored next to each consent. */
  consentVersion: "2026-11-10",
  /** Hosting region of the database, mentioned in the privacy notice. */
  dataRegion: "Frankfurt (EU)",
} as const;

export const COOKIE_LANG = "hamroh_lang";
