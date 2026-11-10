import type { Corridor } from "@/data/registry";

export const ROLES = ["student", "parent", "agency"] as const;
export type Role = (typeof ROLES)[number];

export const CONTACT_TYPES = ["telegram", "phone", "email"] as const;
export type ContactType = (typeof CONTACT_TYPES)[number];

export const INTERESTS = ["hungary", "turkiye", "korea", "germany", "unsure"] as const;
export type Interest = Corridor | "unsure";

/** Values stored in the database; the labels come from the dictionaries. */
export const STUDENT_BANDS = ["1-10", "11-30", "31-100", "100+"] as const;
export type StudentBand = (typeof STUDENT_BANDS)[number];

export interface ParsedContact {
  type: ContactType;
  /** Normalized value used as the unique key. */
  value: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEGRAM_RE = /^[A-Za-z][A-Za-z0-9_]{4,31}$/;
const TELEGRAM_LINK_RE = /^(?:https?:\/\/)?(?:t|telegram)\.me\/([A-Za-z][A-Za-z0-9_]{4,31})\/?$/i;

/**
 * One field accepts an email, a phone number or a Telegram username.
 * Returns the normalized contact, or null when it is none of them.
 */
export function parseContact(input: string): ParsedContact | null {
  const raw = input.trim();
  if (raw.length < 3 || raw.length > 120) return null;

  // Telegram link → username
  const link = raw.match(TELEGRAM_LINK_RE);
  if (link) return { type: "telegram", value: `@${link[1].toLowerCase()}` };

  // Email
  if (raw.includes("@") && !raw.startsWith("@")) {
    const email = raw.toLowerCase();
    return EMAIL_RE.test(email) ? { type: "email", value: email } : null;
  }

  // Phone: digits with the usual separators
  if (/^[+\d][\d\s().-]*$/.test(raw)) {
    const digits = raw.replace(/\D/g, "");
    let e164: string | null = null;
    if (raw.startsWith("+")) {
      if (digits.length >= 8 && digits.length <= 15) e164 = `+${digits}`;
    } else if (digits.length === 9) {
      e164 = `+998${digits}`; // local Uzbek number, e.g. 90 123 45 67
    } else if (digits.length === 12 && digits.startsWith("998")) {
      e164 = `+${digits}`;
    }
    return e164 ? { type: "phone", value: e164 } : null;
  }

  // Telegram username, with or without @
  const username = raw.replace(/^@/, "");
  if (TELEGRAM_RE.test(username)) return { type: "telegram", value: `@${username.toLowerCase()}` };

  return null;
}

/** Trim, collapse inner whitespace and cap the length. Empty → null. */
export function cleanText(value: FormDataEntryValue | null, max: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, max);
  return cleaned.length > 0 ? cleaned : null;
}

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

export function isInterest(value: unknown): value is Interest {
  return typeof value === "string" && (INTERESTS as readonly string[]).includes(value);
}

export function isStudentBand(value: unknown): value is StudentBand {
  return typeof value === "string" && (STUDENT_BANDS as readonly string[]).includes(value);
}

/** Campaign tags from the URL are stored as-is, but only short plain tokens. */
export function cleanTag(value: FormDataEntryValue | null): string | null {
  const text = cleanText(value, 60);
  return text && /^[\w.\-+ ]+$/.test(text) ? text : null;
}
