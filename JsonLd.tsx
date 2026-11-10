import type { Locale } from "@/lib/i18n";
import { LOCALE_TAGS, LOCALES, localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";

/** Structured data for search engines: who runs the site and in which languages it exists. */
export function JsonLd({ locale, description }: { locale: Locale; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.company,
        url: SITE.url,
        email: SITE.email,
        ...(SITE.telegramUrl ? { sameAs: [SITE.telegramUrl] } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: `${SITE.url}${localePath(locale)}`,
        name: SITE.name,
        description,
        inLanguage: LOCALES.map((code) => LOCALE_TAGS[code]),
        publisher: { "@id": `${SITE.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so no value can ever close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
