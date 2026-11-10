/**
 * Client-safe i18n helpers (constants and tiny string utilities).
 * The dictionaries themselves are loaded on the server only: see dictionaries.ts.
 */

export const LOCALES = ["uz", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uz";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Language names written in their own language, for the switcher. */
export const LOCALE_NAMES: Record<Locale, string> = {
  uz: "Oʻzbekcha",
  ru: "Русский",
  en: "English",
};

/** BCP-47 tags for `lang` and hreflang. */
export const LOCALE_TAGS: Record<Locale, string> = {
  uz: "uz-Latn",
  ru: "ru",
  en: "en",
};

export const OG_LOCALES: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

/** Replace {name} placeholders. Unknown placeholders are left untouched. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export type PluralForms = { one: string; few?: string; many?: string; other: string };

/** Minimal plural selection for the three supported languages. */
export function plural(locale: Locale, n: number, forms: PluralForms): string {
  const abs = Math.abs(n);
  if (locale === "ru") {
    const mod10 = abs % 10;
    const mod100 = abs % 100;
    if (mod10 === 1 && mod100 !== 11) return forms.one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms.few ?? forms.other;
    return forms.many ?? forms.other;
  }
  return abs === 1 ? forms.one : forms.other;
}

/** 12345 → "12,345" in English, "12 345" (no-break space) in Uzbek and Russian. No Intl: same output everywhere. */
export function formatInt(n: number, locale: Locale): string {
  const separator = locale === "en" ? "," : " ";
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/** Path of a page in a given language, e.g. localePath("ru", "/privacy"). */
export function localePath(locale: Locale, path = ""): string {
  return `/${locale}${path === "/" ? "" : path}`;
}
