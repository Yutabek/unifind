import type { Dict } from "@/content/types";
import { formatDate, type DateStrings } from "@/lib/dates";
import { fmt, plural, type Locale } from "@/lib/i18n";
import {
  CORRIDORS,
  getPhase,
  isStale,
  PROGRAMS,
  type Corridor,
  type Level,
  type ProgramId,
  type Status,
} from "@/data/registry";

/** A registry entry joined with its translated name and note. Plain data, safe to pass to client components. */
export interface ProgramView {
  id: ProgramId;
  corridor: Corridor;
  /** Airport-style route code, e.g. BUD. */
  code: string;
  levels: Level[];
  status: Status;
  name: string;
  note: string;
  opens?: string;
  deadline?: string;
  deadlineTime?: string;
  verifiedOn: string;
  stale: boolean;
  source: { host: string; url: string };
}

export function buildViews(dict: Dict, today: string): ProgramView[] {
  return PROGRAMS.map((p) => ({
    id: p.id,
    corridor: p.corridor,
    code: CORRIDORS[p.corridor].code,
    levels: [...p.levels],
    status: p.status,
    name: dict.registry[p.id].name,
    note: dict.registry[p.id].note,
    opens: p.opens,
    deadline: p.deadline,
    deadlineTime: p.deadlineTime,
    verifiedOn: p.verifiedOn,
    stale: isStale(p, today),
    source: p.source,
  }));
}

/** "~" marks a forecast: the date is expected, not announced. */
export function dateLabel(
  iso: string | undefined,
  status: Status,
  dates: DateStrings,
  style: "full" | "day" | "abbr" = "day",
): string {
  if (!iso) return "";
  const text = formatDate(iso, dates, style);
  return status === "expected" ? `~${text}` : text;
}

/** Short relative phrase: "in 7 days", "12 days left", "Closed"... */
export function phaseLabel(
  view: Pick<ProgramView, "status" | "opens" | "deadline">,
  today: string,
  locale: Locale,
  entry: Dict["entry"],
): string {
  const phase = getPhase(view, today);
  switch (phase.kind) {
    case "upcoming":
      return fmt(plural(locale, phase.days, entry.phase.upcoming), { n: phase.days });
    case "open":
      return fmt(plural(locale, phase.days, entry.phase.open), { n: phase.days });
    case "ended":
      return entry.phase.ended;
    case "closed":
      return entry.phase.closed;
    default:
      return entry.phase.varies;
  }
}

/** One-line description of a window, used in labels: "~Nov 17 to ~Jan 15". */
export function rangeLabel(
  view: Pick<ProgramView, "status" | "opens" | "deadline" | "deadlineTime">,
  dates: DateStrings,
  entry: Dict["entry"],
): string {
  const from = dateLabel(view.opens, view.status, dates, "day");
  const to = dateLabel(view.deadline, view.status, dates, "day");
  const time = view.deadlineTime ? `, ${view.deadlineTime}` : "";
  if (from && to) return `${from} – ${to}${time}`;
  if (to) return `${to}${time}`;
  if (from) return from;
  return entry.noDate;
}
