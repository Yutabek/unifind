"use client";

import { BellRing, Plane } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import type { Dict } from "@/content/types";
import { CORRIDOR_ORDER, LEVELS, type Corridor, type Level, type ProgramId, type Status } from "@/data/registry";
import { addMonths, diffDays, monthIndex, startOfMonth, type DateStrings } from "@/lib/dates";
import { fmt, type Locale } from "@/lib/i18n";
import { phaseLabel, rangeLabel, type ProgramView } from "@/lib/program-view";
import { EntryFacts } from "@/components/ui/EntryFacts";
import { PrefillLink } from "@/components/ui/PrefillLink";
import { StatusStamp } from "@/components/ui/StatusStamp";

export interface MapStrings {
  windows: Dict["windows"];
  entry: Dict["entry"];
  status: Dict["status"];
  statusHelp: Dict["statusHelp"];
  legend: Dict["legend"];
  levels: Dict["levels"];
  corridors: Dict["corridors"];
  dates: DateStrings;
  external: string;
}

const MONTHS = 5;
const STATUS_ORDER: Status[] = ["confirmed", "expected", "rolling", "unconfirmed", "closed"];

type Geometry =
  | { kind: "bar"; left: number; width: number; openEnd: boolean }
  | { kind: "stub" } // the window ended before the axis starts
  | { kind: "line" }; // no dates to draw

function clamp(n: number): number {
  return Math.min(100, Math.max(0, n));
}

export function DeadlineMap({
  views,
  today,
  locale,
  initialId,
  t,
}: {
  views: ProgramView[];
  today: string;
  locale: Locale;
  initialId: ProgramId;
  t: MapStrings;
}) {
  const [level, setLevel] = useState<Level | "all">("all");
  const [corridor, setCorridor] = useState<Corridor | "all">("all");
  const [selectedId, setSelectedId] = useState<ProgramId>(initialId);
  const detailRef = useRef<HTMLDivElement>(null);

  // The axis always starts on the first day of the current month and spans five months.
  const axis = useMemo(() => {
    const start = startOfMonth(today);
    const end = addMonths(start, MONTHS);
    const span = diffDays(start, end);
    const pct = (iso: string) => (diffDays(start, iso) / span) * 100;
    const ticks = Array.from({ length: MONTHS }, (_, i) => {
      const iso = addMonths(start, i);
      return {
        iso,
        left: pct(iso),
        label: t.dates.monthsShort[monthIndex(iso)],
        year: iso.slice(0, 4),
        showYear: i === 0 || monthIndex(iso) === 0,
      };
    });
    return { start, end, span, pct, ticks, todayLeft: clamp(pct(today)) };
  }, [today, t.dates.monthsShort]);

  function geometry(v: ProgramView): Geometry {
    if (v.status === "rolling" || v.status === "unconfirmed") return { kind: "line" };
    if (!v.opens && !v.deadline) return { kind: "line" };
    if (v.deadline && diffDays(axis.start, v.deadline) < 0) return { kind: "stub" };
    if (v.opens && diffDays(v.opens, axis.end) <= 0) return { kind: "line" };
    const startIso = v.opens ?? (v.deadline as string);
    const endIso = v.deadline ?? axis.end;
    const left = clamp(axis.pct(startIso));
    const right = clamp(axis.pct(endIso));
    return { kind: "bar", left, width: Math.max(right - left, 1.2), openEnd: !v.deadline };
  }

  const matches = (v: ProgramView) =>
    (level === "all" || v.levels.includes(level)) && (corridor === "all" || v.corridor === corridor);
  const anyMatch = views.some(matches);
  const filtered = level !== "all" || corridor !== "all";

  const selected = views.find((v) => v.id === selectedId) ?? views[0];

  function applyFilters(nextLevel: Level | "all", nextCorridor: Corridor | "all") {
    setLevel(nextLevel);
    setCorridor(nextCorridor);
    const ok = (v: ProgramView) =>
      (nextLevel === "all" || v.levels.includes(nextLevel)) &&
      (nextCorridor === "all" || v.corridor === nextCorridor);
    const current = views.find((v) => v.id === selectedId);
    if (!current || !ok(current)) {
      const first = views.find(ok);
      if (first) setSelectedId(first.id);
    }
  }

  function select(id: ProgramId) {
    setSelectedId(id);
    // On narrow screens the detail panel is far below the list: bring it into view.
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 61.99rem)").matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() =>
        detailRef.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" }),
      );
    }
  }

  const f = t.windows.filters;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-end sm:gap-x-12">
        <FilterGroup
          label={f.level}
          allLabel={f.all}
          value={level}
          options={LEVELS.map((l) => ({ value: l, label: t.levels[l] }))}
          onChange={(v) => applyFilters(v, corridor)}
        />
        <FilterGroup
          label={f.destination}
          allLabel={f.all}
          value={corridor}
          options={CORRIDOR_ORDER.map((c) => ({ value: c, label: t.corridors[c] }))}
          onChange={(v) => applyFilters(level, v)}
        />
        {filtered && (
          <button
            type="button"
            className="pb-2 text-[0.9375rem] font-semibold text-on-lapis underline decoration-saffron decoration-2 underline-offset-4"
            onClick={() => applyFilters("all", "all")}
          >
            {f.clear}
          </button>
        )}
      </div>

      {/* Map */}
      <div className="mt-8" role="group" aria-label={t.windows.mapLabel}>
        <div className="hidden px-[0.9rem] pb-1 lg:grid lg:grid-cols-[17rem_1fr] lg:gap-x-6" aria-hidden="true">
          <span />
          <Axis axis={axis} todayLabel={t.windows.today} />
        </div>
        <div className="px-[0.9rem] lg:hidden" aria-hidden="true">
          <Axis axis={axis} todayLabel={t.windows.today} />
        </div>

        <ul className="space-y-1" aria-label={t.windows.listLabel}>
          {views.map((v) => {
            const geo = geometry(v);
            const dim = !matches(v);
            const range = rangeLabel(v, t.dates, t.entry);
            return (
              <li key={v.id}>
                <button
                  type="button"
                  className="map-row"
                  aria-pressed={v.id === selected.id}
                  data-dim={dim}
                  onClick={() => select(v.id)}
                >
                  <span className="grid gap-1.5">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="font-display text-[1.625rem] font-bold leading-none text-on-lapis-2" aria-hidden="true">
                        {v.code}
                      </span>
                      <StatusStamp status={v.status} label={t.status[v.status]} />
                    </span>
                    <span className="block font-semibold leading-snug text-white">{v.name}</span>
                    <span className="num block text-sm leading-snug text-on-lapis-2">{range}</span>
                    {/* A closed entry already says so on its stamp. */}
                    {v.status !== "closed" && (
                      <span className="num block text-sm leading-snug text-on-lapis-2">
                        {phaseLabel(v, today, locale, t.entry)}
                      </span>
                    )}
                  </span>

                  <span className="track" aria-hidden="true">
                    {axis.ticks.slice(1).map((tick) => (
                      <span key={tick.iso} className="tick" style={{ left: `${tick.left}%` }} />
                    ))}
                    {geo.kind === "line" && <span className={`line-${v.status === "unconfirmed" ? "unconfirmed" : "varies"}`} />}
                    {geo.kind === "stub" && (
                      <span className="bar bar-closed" data-open-end="true" style={{ left: 0, width: "6%" }} />
                    )}
                    {geo.kind === "bar" && (
                      <span
                        className={`bar bar-${v.status === "confirmed" ? "confirmed" : v.status === "closed" ? "closed" : "expected"}`}
                        data-open-end={geo.openEnd}
                        style={{ left: `${geo.left}%`, width: `${geo.width}%` }}
                      />
                    )}
                    <span className="today-line" style={{ left: `${axis.todayLeft}%` }} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {!anyMatch && <p className="mt-4 px-[0.9rem] text-on-lapis-2">{t.windows.empty}</p>}

        {/* Legend */}
        <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2.5 px-[0.9rem] text-sm text-on-lapis-2">
          {STATUS_ORDER.map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span className={`sw sw-${s}`} aria-hidden="true" />
              {t.legend[s]}
            </li>
          ))}
        </ul>
      </div>

      {/* Detail */}
      <div ref={detailRef} className="detail mt-8 p-6 sm:p-9" aria-live="polite">
        <div key={selected.id} className="detail-swap grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="flex items-center gap-2.5 font-display text-[1.875rem] font-bold leading-none text-lapis">
                <span className="sr-only">{fmt(t.entry.route, { place: t.corridors[selected.corridor] })}</span>
                <span aria-hidden="true">TAS</span>
                <Plane size={18} className="text-ink-3" aria-hidden="true" />
                <span aria-hidden="true">{selected.code}</span>
              </p>
              <StatusStamp status={selected.status} label={t.status[selected.status]} />
            </div>
            <h3 className="t-display-sm mt-4">{selected.name}</h3>
            <p className="t-small mt-2">{t.statusHelp[selected.status]}</p>
            <p className="mt-4 max-w-[34rem] text-ink-2">{selected.note}</p>
            <div className="mt-6 max-w-[34rem] rounded-xl bg-lapis-soft p-4">
              <p className="font-semibold">{t.windows.detail.whatNow}</p>
              <p className="mt-1 text-ink-2">{t.windows.next[selected.status]}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <EntryFacts
              view={selected}
              today={today}
              locale={locale}
              entry={t.entry}
              dates={t.dates}
              external={t.external}
            />
            <PrefillLink interest={selected.corridor} className="btn btn-primary mt-7 w-full sm:w-auto">
              <BellRing size={18} aria-hidden="true" />
              {t.windows.detail.remind}
            </PrefillLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  allLabel,
  value,
  options,
  onChange,
}: {
  label: string;
  allLabel: string;
  value: T | "all";
  options: { value: T; label: string }[];
  onChange: (value: T | "all") => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-on-lapis-2">{label}</p>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        <button type="button" role="radio" aria-checked={value === "all"} className="chip" onClick={() => onChange("all")}>
          {allLabel}
        </button>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            className="chip"
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Axis({
  axis,
  todayLabel,
}: {
  axis: { ticks: { iso: string; left: number; label: string; year: string; showYear: boolean }[]; todayLeft: number };
  todayLabel: string;
}) {
  // On narrow screens the months are only ~50px apart, so a label like "Nov 2026" would run into
  // the next one: the year goes on a second line there (hence the taller strip) and sits beside
  // the month from 480px up.
  return (
    <div className="relative h-[3.5rem] min-[480px]:h-[2.6rem]">
      {axis.ticks.map((tick) => (
        <span
          key={tick.iso}
          className="absolute bottom-0 whitespace-nowrap text-[0.8125rem] font-medium leading-none text-on-lapis-2"
          style={{ left: `calc(${tick.left}% + 0.35rem)` }}
        >
          {tick.label}
          {tick.showYear && (
            <span className="mt-0.5 block font-normal min-[480px]:ml-1 min-[480px]:mt-0 min-[480px]:inline">
              {tick.year}
            </span>
          )}
        </span>
      ))}
      <span
        className="absolute top-0 -translate-x-1/2 whitespace-nowrap rounded-full bg-saffron px-2.5 py-1 text-xs font-bold leading-none text-ink"
        style={{ left: `${Math.min(Math.max(axis.todayLeft, 4), 96)}%` }}
      >
        {todayLabel}
      </span>
    </div>
  );
}
