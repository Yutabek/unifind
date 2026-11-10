import { ArrowUpRight, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

import type { Dict } from "@/content/types";
import { STALE_AFTER_DAYS, getPhase } from "@/data/registry";
import { formatDate, type DateStrings } from "@/lib/dates";
import { fmt, type Locale } from "@/lib/i18n";
import { dateLabel, phaseLabel, type ProgramView } from "@/lib/program-view";

/**
 * The facts of one registry entry: opens, deadline, when it was checked and
 * where it comes from. Used on the hero ticket and in the map's detail panel.
 */
export function EntryFacts({
  view,
  today,
  locale,
  entry,
  dates,
  external,
}: {
  view: ProgramView;
  today: string;
  locale: Locale;
  entry: Dict["entry"];
  dates: DateStrings;
  external: string;
}) {
  const phase = getPhase(view, today);
  const hint = phaseLabel(view, today, locale, entry);
  // `wide` rows hold a long unbreakable value (a web address), so they take the
  // whole width with the label above instead of sitting in the second column.
  const rows: { label: string; value: ReactNode; wide?: boolean }[] = [];

  if (view.opens || view.deadline) {
    if (view.opens) {
      rows.push({
        label: entry.opens,
        value: (
          <>
            {dateLabel(view.opens, view.status, dates, "day")}
            {phase.kind === "upcoming" && <span className="t-small"> {hint}</span>}
          </>
        ),
      });
    }
    if (view.deadline) {
      rows.push({
        label: entry.deadline,
        value: (
          <>
            {dateLabel(view.deadline, view.status, dates, "full")}
            {view.deadlineTime ? `, ${view.deadlineTime}` : ""}
            {phase.kind !== "upcoming" && <span className="t-small"> {hint}</span>}
          </>
        ),
      });
    }
  } else {
    rows.push({ label: entry.deadline, value: hint });
  }

  rows.push({ label: entry.checked, value: formatDate(view.verifiedOn, dates, "full") });
  rows.push({
    label: entry.source,
    wide: true,
    value: (
      <a
        href={view.source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="link inline-flex max-w-full items-center gap-1 [overflow-wrap:anywhere]"
      >
        {view.source.host}
        <ArrowUpRight size={16} aria-hidden="true" className="shrink-0" />
        <span className="sr-only"> ({external})</span>
      </a>
    ),
  });

  return (
    <>
      <dl className="num grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-2.5 text-[0.9688rem] leading-snug">
        {rows.map((row) => (
          <div
            key={row.label}
            className={row.wide ? "col-span-2 grid grid-cols-[minmax(0,1fr)] gap-0.5" : "contents"}
          >
            <dt className="t-small pt-px">{row.label}</dt>
            <dd className="min-w-0 font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
      {view.stale && (
        <p className="mt-4 flex gap-2 rounded-lg bg-saffron-soft px-3 py-2 text-sm leading-snug text-amber-ink" role="note">
          <TriangleAlert size={16} className="mt-0.5" aria-hidden="true" />
          <span>
            <strong className="font-semibold">{entry.stale}.</strong>{" "}
            {fmt(entry.staleHelp, { n: STALE_AFTER_DAYS })}
          </span>
        </p>
      )}
    </>
  );
}
