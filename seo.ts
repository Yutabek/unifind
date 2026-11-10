import type { Metadata } from "next";

import type { Dict } from "@/content/types";
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, OG_LOCALES, localePath, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

/** canonical + hreflang for a page that exists in every language. `path` is e.g. "/privacy". */
export function alternatesFor(locale: Locale, path = ""): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const code of LOCALES) languages[LOCALE_TAGS[code]] = localePath(code, path);
  languages["x-default"] = localePath(DEFAULT_LOCALE, path);
  return { canonical: localePath(locale, path), languages };
}

/**
 * Per-page metadata. Next replaces (does not merge) nested objects such as
 * `openGraph`, so each page states the whole object through this helper.
 */
export function pageMetadata(options: {
  locale: Locale;
  dict: Dict;
  path?: string;
  /** Page title without the site name; leave out for the home page. */
  title?: string;
  description?: string;
}): Metadata {
  const { locale, dict, path = "", title } = options;
  const description = options.description ?? dict.meta.description;
  const fullTitle = title ? `${title} · ${SITE.name}` : dict.meta.title;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((code) => code !== locale).map((code) => OG_LOCALES[code]),
      url: localePath(locale, path),
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
