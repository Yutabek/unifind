"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n";
import { COOKIE_LANG } from "@/lib/site";

/** Switch language on the same page, and remember the choice for the next visit to "/". */
export function LanguageSwitcher({
  locale,
  label,
  tone = "light",
}: {
  locale: Locale;
  label: string;
  tone?: "light" | "dark";
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.replace(/^\/(uz|ru|en)(?=\/|$)/, "");
  const dark = tone === "dark";

  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center rounded-full border p-0.5 ${dark ? "border-white/30" : "border-ink/20"}`}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        // Slightly narrower buttons on very small phones (still above the 24px minimum target size).
        const base =
          "inline-flex min-h-9 min-w-8 items-center justify-center rounded-full px-1.5 text-sm font-semibold no-underline transition-colors min-[360px]:min-w-10 min-[360px]:px-2.5";
        const tones = active
          ? dark
            ? "bg-white text-lapis"
            : "bg-lapis text-white"
          : dark
            ? "text-on-lapis-2 hover:text-white"
            : "text-ink-2 hover:text-lapis";
        return (
          <Link
            key={code}
            href={`/${code}${rest}`}
            // Prefetching /ru from /uz would also pull in the Cyrillic font preloads of that page.
            prefetch={false}
            lang={code}
            hrefLang={code}
            title={LOCALE_NAMES[code]}
            aria-current={active ? "true" : undefined}
            className={`${base} ${tones}`}
            onClick={() => {
              try {
                document.cookie = `${COOKIE_LANG}=${code}; path=/; max-age=31536000; samesite=lax`;
              } catch {
                /* cookies blocked: the switch still works, it just won't be remembered */
              }
            }}
          >
            {code.toUpperCase()}
            <span className="sr-only"> · {LOCALE_NAMES[code]}</span>
          </Link>
        );
      })}
    </div>
  );
}
