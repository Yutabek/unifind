"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Dict } from "@/content/types";
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/lib/i18n";

/**
 * not-found.tsx gets no route params, so the language is read from the URL.
 * The server component passes the copy for all three languages (a few lines).
 */
export function NotFoundView({ copy }: { copy: Record<Locale, Dict["notFound"]> }) {
  const pathname = usePathname() ?? "";
  const first = pathname.split("/")[1];
  const locale: Locale = isLocale(first) ? first : DEFAULT_LOCALE;
  const t = copy[locale];

  return (
    <section className="section">
      <div className="wrap">
        <p className="code" aria-hidden="true">
          404
        </p>
        <h1 className="t-h2 mt-5">{t.title}</h1>
        <p className="t-lead mt-4 max-w-xl">{t.body}</p>
        <Link href={localePath(locale)} className="btn btn-primary mt-8">
          {t.cta}
        </Link>
      </div>
    </section>
  );
}
