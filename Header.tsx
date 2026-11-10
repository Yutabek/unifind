import Link from "next/link";

import type { Dict } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Header({ locale, dict }: { locale: Locale; dict: Dict }) {
  const home = `/${locale}`;
  const links = [
    { href: `${home}#windows`, label: dict.nav.windows },
    { href: `${home}#how`, label: dict.nav.how },
    { href: `${home}#trust`, label: dict.nav.trust },
    { href: `${home}#pricing`, label: dict.nav.pricing },
    { href: `${home}#agencies`, label: dict.nav.agencies },
    { href: `${home}#faq`, label: dict.nav.faq },
  ];
  // The desktop bar shows the first five; the menu on small screens shows all.
  const desktopLinks = links.slice(0, 5);

  return (
    <header className="site-header">
      {/* Below 360px (small phones) the gaps and the wordmark shrink a little so the bar never scrolls sideways. */}
      <div className="wrap flex h-16 items-center justify-between gap-2 min-[360px]:gap-3 lg:h-[4.5rem]">
        <Link
          href={home}
          prefetch={false}
          className="flex items-center gap-2 no-underline min-[360px]:gap-2.5"
          aria-label={SITE.name}
        >
          <LogoMark size={34} />
          <span className="font-display text-[1.5rem] font-bold leading-none tracking-tight text-ink min-[360px]:text-[1.75rem]">
            {SITE.name}
          </span>
        </Link>

        <nav aria-label={SITE.name} className="hidden items-center gap-7 lg:flex">
          {desktopLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 min-[360px]:gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} label={dict.common.language} />
          <a href={`${home}#waitlist`} className="btn btn-primary hidden !min-h-11 !px-4 !py-2 text-[0.9375rem] md:inline-flex">
            {dict.nav.cta}
          </a>
          <MobileMenu
            links={links}
            ctaHref={`${home}#waitlist`}
            ctaLabel={dict.nav.cta}
            openLabel={dict.common.menuOpen}
            closeLabel={dict.common.menuClose}
          />
        </div>
      </div>
    </header>
  );
}
