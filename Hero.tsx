import { ArrowDown, Plane } from "lucide-react";

import type { Dict } from "@/content/types";
import { vars } from "@/lib/css";
import { fmt, type Locale } from "@/lib/i18n";
import type { ProgramView } from "@/lib/program-view";
import { EntryFacts } from "@/components/ui/EntryFacts";
import { LogoMark } from "@/components/ui/Logo";
import { StatusStamp } from "@/components/ui/StatusStamp";

/**
 * The hero shows the product doing its one job: a question, an honest answer
 * and the registry entry behind it, with its status stamped on.
 */
export function Hero({
  dict,
  locale,
  today,
  featured,
}: {
  dict: Dict;
  locale: Locale;
  today: string;
  featured: ProgramView;
}) {
  const { hero, entry, status, corridors } = dict;
  const place = corridors[featured.corridor];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink-2">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex size-full rounded-full bg-saffron opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2.5 rounded-full bg-saffron" />
            </span>
            {hero.badge}
          </p>

          <h1 id="hero-title" className="t-hero mt-6">
            <span className="block text-ink-3">{hero.q}</span>
            <span className="block">{hero.a}</span>
          </h1>

          <p className="t-lead mt-7 max-w-[35rem]">{hero.lead}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#waitlist" className="btn btn-primary">
              {hero.ctaPrimary}
            </a>
            <a href="#windows" className="btn btn-ghost">
              {hero.ctaSecondary}
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>

          <p className="t-small mt-6 max-w-[33rem]">{hero.note}</p>
        </div>

        <div className="lg:col-span-5">
          <div className="chat mx-auto max-w-[27rem] lg:mx-0 lg:ml-auto">
            <div className="chat-head">
              <LogoMark size={36} />
              <p className="font-semibold leading-tight">{hero.chat.title}</p>
            </div>

            <div className="chat-body">
              <p className="msg msg-user seq" style={vars({ "--d": "0.3s" })}>
                {fmt(hero.chat.user, { name: featured.name })}
              </p>

              <div className="msg-stack">
                <p className="typing" style={vars({ "--d": "0.9s" })}>
                  <span className="sr-only">{hero.chat.typing}</span>
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                </p>
                <p className="msg msg-bot seq" style={vars({ "--d": "2s" })}>
                  {hero.chat.reply[featured.status]}
                </p>
              </div>

              <article className="ticket seq" style={vars({ "--d": "2.3s" })} aria-label={featured.name}>
                <div className="p-5 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                    <p className="flex items-center gap-2 font-display text-[1.75rem] font-bold leading-none text-lapis">
                      <span className="sr-only">{fmt(entry.route, { place })}</span>
                      <span aria-hidden="true">TAS</span>
                      <Plane size={17} className="text-ink-3" aria-hidden="true" />
                      <span aria-hidden="true">{featured.code}</span>
                    </p>
                    <StatusStamp
                      status={featured.status}
                      label={status[featured.status]}
                      className="stamp-press"
                      style={vars({ "--stamp-delay": "2.7s" })}
                    />
                  </div>
                  <p className="mt-3 font-semibold leading-snug">{featured.name}</p>
                </div>

                <div className="ticket-perf" aria-hidden="true" />

                <div className="p-5 pt-4">
                  <EntryFacts
                    view={featured}
                    today={today}
                    locale={locale}
                    entry={entry}
                    dates={dict.dates}
                    external={dict.common.external}
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
