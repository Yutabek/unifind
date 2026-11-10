import type { MetadataRoute } from "next";

import { lastVerifiedOn } from "@/data/registry";
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";

/** Every page in every language, each pointing at its translations (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", lastModified: lastVerifiedOn(), changeFrequency: "daily" as const, priority: 1 },
    { path: "/privacy", lastModified: SITE.consentVersion, changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/terms", lastModified: SITE.consentVersion, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return pages.flatMap((page) =>
    LOCALES.map((locale) => {
      const languages: Record<string, string> = {};
      for (const code of LOCALES) languages[LOCALE_TAGS[code]] = `${SITE.url}${localePath(code, page.path)}`;
      languages["x-default"] = `${SITE.url}${localePath(DEFAULT_LOCALE, page.path)}`;
      return {
        url: `${SITE.url}${localePath(locale, page.path)}`,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      };
    }),
  );
}
