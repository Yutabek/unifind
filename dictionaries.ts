import "server-only";

import type { Dict } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

/** Replace {brand}, {company} and {email} everywhere in the dictionary. */
function brand<T>(value: T): T {
  if (typeof value === "string") {
    return value
      .replaceAll("{brand}", SITE.name)
      .replaceAll("{company}", SITE.company)
      .replaceAll("{email}", SITE.email) as T;
  }
  if (Array.isArray(value)) return value.map((item) => brand(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, brand(item)]),
    ) as T;
  }
  return value;
}

const cache = new Map<Locale, Dict>();

export async function getDict(locale: Locale): Promise<Dict> {
  const hit = cache.get(locale);
  if (hit) return hit;
  let raw: Dict;
  switch (locale) {
    case "ru":
      raw = (await import("@/content/ru")).ru;
      break;
    case "en":
      raw = (await import("@/content/en")).en;
      break;
    default:
      raw = (await import("@/content/uz")).uz;
  }
  const dict = brand(raw);
  cache.set(locale, dict);
  return dict;
}
