import { Users } from "lucide-react";

import type { Dict } from "@/content/types";
import { fmt, formatInt, localePath, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { getWaitlistCount } from "@/lib/waitlist-count";

import { WaitlistForm } from "./WaitlistForm";

/** The closing block: same lapis as the map, with the form on a white card. */
export async function Waitlist({ dict, locale }: { dict: Dict; locale: Locale }) {
  const t = dict.waitlist;
  const count = await getWaitlistCount();

  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="section section-lapis on-lapis">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="waitlist-title" className="t-h2 text-white">
            {t.title}
          </h2>
          <p className="t-lead mt-5 max-w-[28rem]">{t.lead}</p>

          {count !== null && (
            <p className="num mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/30 px-4 py-2 text-[0.9375rem] font-medium text-on-lapis">
              <Users size={18} aria-hidden="true" />
              {fmt(t.count, { n: formatInt(count, locale) })}
            </p>
          )}
        </div>

        <div className="lg:col-span-7">
          <div className="detail p-6 sm:p-9">
            <WaitlistForm
              locale={locale}
              t={t}
              privacyHref={localePath(locale, "/privacy")}
              telegramUrl={SITE.telegramUrl}
              external={dict.common.external}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
