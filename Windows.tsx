import type { Dict } from "@/content/types";
import { lastVerifiedOn } from "@/data/registry";
import { formatDate } from "@/lib/dates";
import { fmt, type Locale } from "@/lib/i18n";
import type { ProgramView } from "@/lib/program-view";

import { DeadlineMap } from "./DeadlineMap";

/** The deadline map: the one bold block of the page, on lapis. */
export function Windows({
  dict,
  locale,
  today,
  views,
  featured,
}: {
  dict: Dict;
  locale: Locale;
  today: string;
  views: ProgramView[];
  featured: ProgramView;
}) {
  const { windows } = dict;

  return (
    <section id="windows" aria-labelledby="windows-title" className="section section-lapis on-lapis">
      <div className="wrap">
        <div className="max-w-3xl">
          <h2 id="windows-title" className="t-h2 text-white">
            {windows.title}
          </h2>
          <p className="t-lead mt-5">{windows.lead}</p>
        </div>

        <div className="mt-12">
          <DeadlineMap
            views={views}
            today={today}
            locale={locale}
            initialId={featured.id}
            t={{
              windows,
              entry: dict.entry,
              status: dict.status,
              statusHelp: dict.statusHelp,
              legend: dict.legend,
              levels: dict.levels,
              corridors: dict.corridors,
              dates: dict.dates,
              external: dict.common.external,
            }}
          />
        </div>

        <p className="t-small mt-8 max-w-3xl">
          {fmt(windows.footnote, { date: formatDate(lastVerifiedOn(), dict.dates, "full") })}
        </p>
      </div>
    </section>
  );
}
