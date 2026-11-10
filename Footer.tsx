import Link from "next/link";

import type { Dict } from "@/content/types";
import { lastVerifiedOn } from "@/data/registry";
import { formatDate } from "@/lib/dates";
import { fmt, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";

import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const f = dict.footer;
  const checked = fmt(f.registryChecked, { date: formatDate(lastVerifiedOn(), dict.dates, "full") });
  const linkClass = "text-on-lapis-2 underline decoration-white/25 underline-offset-4 hover:text-white hover:decoration-saffron";

  return (
    <footer className="on-lapis bg-lapis-night text-on-lapis">
      <div className="wrap py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href={`/${locale}`} prefetch={false} className="flex items-center gap-2.5 no-underline" aria-label={SITE.name}>
              <LogoMark size={34} />
              <span className="font-display text-[1.75rem] font-bold leading-none text-white">{SITE.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-on-lapis-2">{f.tagline}</p>
          </div>

          <div className="md:col-span-4">
            <p className="text-sm font-semibold text-white">{f.contact}</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={`mailto:${SITE.email}`} className={linkClass}>
                  {SITE.email}
                </a>
              </li>
              {SITE.telegramUrl && (
                <li>
                  <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Telegram
                    <span className="sr-only"> ({dict.common.external})</span>
                  </a>
                </li>
              )}
              <li>
                <Link href={`/${locale}/privacy`} className={linkClass}>
                  {f.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className={linkClass}>
                  {f.terms}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 md:justify-self-end">
            <LanguageSwitcher locale={locale} label={dict.common.language} tone="dark" />
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-sm leading-relaxed text-on-lapis-2">
          <p className="max-w-3xl">{f.disclaimer}</p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            <span>{checked}</span>
            <span>{fmt(f.rights, { year: new Date().getFullYear() })}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
