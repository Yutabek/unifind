import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { preload } from "react-dom";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { getDict } from "@/lib/dictionaries";
import { LOCALES, LOCALE_TAGS, isLocale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

import "../globals.css";

/**
 * This is the root layout: there is no app/layout.tsx, so every page lives
 * under /uz, /ru or /en and <html lang> always matches the page language.
 * "/" is redirected in next.config.ts.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b2b8c",
  colorScheme: "light",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDict(locale);

  return {
    metadataBase: new URL(SITE.url),
    applicationName: SITE.name,
    title: { default: dict.meta.title, template: `%s · ${SITE.name}` },
    description: dict.meta.description,
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  // The fonts the first screen needs. Other subsets download only when a page uses their characters.
  const font = { as: "font", type: "font/woff2", crossOrigin: "anonymous" } as const;
  preload("/fonts/onest-latin-wght-normal.woff2", font);
  preload("/fonts/sofia-sans-condensed-latin-wght-normal.woff2", font);
  if (locale === "ru") {
    preload("/fonts/onest-cyrillic-wght-normal.woff2", font);
    preload("/fonts/sofia-sans-condensed-cyrillic-wght-normal.woff2", font);
  }
  // Uzbek headlines are full of ʻ (o‘, g‘): a 1 KB patch glyph, see fonts.css.
  if (locale === "uz") preload("/fonts/sofia-sans-condensed-okina-wght-normal.woff2", font);

  return (
    <html lang={LOCALE_TAGS[locale]}>
      <body>
        <a href="#main" className="skip">
          {dict.common.skip}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
