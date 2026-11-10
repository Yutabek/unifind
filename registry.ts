import { diffDays } from "@/lib/dates";

/**
 * THE REGISTRY — the only place where deadlines and statuses live.
 *
 * Rules the site follows (and the product will follow too):
 *  1. A date is a hard fact only if the official page says so → "confirmed".
 *  2. A date we infer from the previous cycle is "expected", never "confirmed".
 *  3. Every entry carries the day someone last checked it (`verifiedOn`) and
 *     the official page it comes from. If an entry is not re-checked for
 *     STALE_AFTER_DAYS, the site says so by itself.
 *
 * To update: edit the entries below, set `verifiedOn` to the day you checked
 * the official page, commit, and Vercel redeploys. Localized names and notes
 * live in src/content/*.ts under `registry`, keyed by `id`.
 */

export type Corridor = "hungary" | "turkiye" | "korea" | "germany";
export type Level = "bachelor" | "master" | "phd";
export type Status = "confirmed" | "expected" | "rolling" | "unconfirmed" | "closed";
export type ProgramId = "sh" | "tb" | "gks-u-embassy" | "gks-u-university" | "gks-g" | "daad";

export interface Program {
  id: ProgramId;
  corridor: Corridor;
  levels: readonly Level[];
  status: Status;
  /** YYYY-MM-DD. For "expected" this is a forecast, not an announcement. */
  opens?: string;
  /** YYYY-MM-DD */
  deadline?: string;
  /** Local time of the deadline when the official page gives one. */
  deadlineTime?: string;
  /** Day an official person or page last confirmed this entry (YYYY-MM-DD). */
  verifiedOn: string;
  source: { host: string; url: string };
}

/** Airport-style codes: a corridor is a route from Tashkent (TAS). */
export const CORRIDORS: Record<Corridor, { code: string }> = {
  hungary: { code: "BUD" },
  turkiye: { code: "IST" },
  korea: { code: "ICN" },
  germany: { code: "BER" },
};

export const CORRIDOR_ORDER: readonly Corridor[] = ["hungary", "turkiye", "korea", "germany"];
export const LEVELS: readonly Level[] = ["bachelor", "master", "phd"];

/** An entry not re-checked for this many days is shown as "re-check pending". */
export const STALE_AFTER_DAYS = 21;

export const PROGRAMS: readonly Program[] = [
  {
    id: "sh",
    corridor: "hungary",
    levels: ["bachelor", "master", "phd"],
    status: "expected",
    opens: "2026-11-17",
    deadline: "2027-01-15",
    deadlineTime: "14:00 CET",
    verifiedOn: "2026-11-10",
    source: { host: "stipendiumhungaricum.hu", url: "https://stipendiumhungaricum.hu/" },
  },
  {
    id: "tb",
    corridor: "turkiye",
    levels: ["bachelor", "master", "phd"],
    status: "expected",
    opens: "2027-01-10",
    deadline: "2027-02-20",
    verifiedOn: "2026-11-10",
    source: { host: "turkiyeburslari.gov.tr", url: "https://turkiyeburslari.gov.tr/" },
  },
  {
    id: "gks-u-embassy",
    corridor: "korea",
    levels: ["bachelor"],
    status: "closed",
    deadline: "2026-09-30",
    verifiedOn: "2026-11-10",
    source: { host: "studyinkorea.go.kr", url: "https://www.studyinkorea.go.kr/" },
  },
  {
    id: "gks-u-university",
    corridor: "korea",
    levels: ["bachelor"],
    status: "rolling",
    verifiedOn: "2026-11-10",
    source: { host: "studyinkorea.go.kr", url: "https://www.studyinkorea.go.kr/" },
  },
  {
    id: "gks-g",
    corridor: "korea",
    levels: ["master", "phd"],
    status: "unconfirmed",
    verifiedOn: "2026-11-10",
    source: { host: "studyinkorea.go.kr", url: "https://www.studyinkorea.go.kr/" },
  },
  {
    id: "daad",
    corridor: "germany",
    levels: ["master", "phd"],
    status: "rolling",
    verifiedOn: "2026-11-10",
    source: {
      host: "daad.de",
      url: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
    },
  },
];

export function getProgram(id: ProgramId): Program {
  const found = PROGRAMS.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown program: ${id}`);
  return found;
}

/** Newest check date across the registry. */
export function lastVerifiedOn(programs: readonly Program[] = PROGRAMS): string {
  return programs.reduce((latest, p) => (p.verifiedOn > latest ? p.verifiedOn : latest), "0000-00-00");
}

export function isStale(program: Pick<Program, "verifiedOn">, today: string): boolean {
  return diffDays(program.verifiedOn, today) > STALE_AFTER_DAYS;
}

export type Phase =
  | { kind: "upcoming"; days: number }
  | { kind: "open"; days: number }
  | { kind: "ended" }
  | { kind: "closed" }
  | { kind: "varies" };

/** Where a program stands relative to today, from its dates and status. */
export function getPhase(program: Pick<Program, "status" | "opens" | "deadline">, today: string): Phase {
  if (program.status === "closed") return { kind: "closed" };
  if (program.status === "rolling" || program.status === "unconfirmed") {
    if (!program.opens && !program.deadline) return { kind: "varies" };
  }
  if (program.opens && diffDays(today, program.opens) > 0) {
    return { kind: "upcoming", days: diffDays(today, program.opens) };
  }
  if (program.deadline) {
    const left = diffDays(today, program.deadline);
    if (left >= 0) return { kind: "open", days: left };
    return { kind: "ended" };
  }
  return { kind: "varies" };
}

/** The entry to feature first: the soonest future date, else the first entry. */
export function pickFeatured(programs: readonly Program[], today: string): Program {
  const dated = programs
    .filter((p) => p.status !== "closed" && (p.opens || p.deadline))
    .map((p) => {
      const target = p.opens && diffDays(today, p.opens) >= 0 ? p.opens : p.deadline;
      return { p, d: target ? diffDays(today, target) : Number.POSITIVE_INFINITY };
    })
    .filter((x) => x.d >= 0)
    .sort((a, b) => a.d - b.d);
  return dated[0]?.p ?? programs[0];
}
