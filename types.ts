import type { DateStrings } from "@/lib/dates";
import type { PluralForms } from "@/lib/i18n";
import type { Corridor, Level, ProgramId, Status } from "@/data/registry";

export interface Feature {
  title: string;
  body: string;
}

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export interface Plan {
  name: string;
  price: string;
  /** Rough dollar value; empty for the free plan. */
  usd: string;
  tagline: string;
  features: string[];
  cta: string;
}

/**
 * Every language file (en.ts, uz.ts, ru.ts) must satisfy this shape, so a
 * missing translation is a build error rather than a blank on the page.
 * Use {brand}, {company} and {email} anywhere: they are filled in from
 * src/lib/site.ts when the dictionary is loaded.
 */
export interface Dict {
  meta: { title: string; description: string; ogTagline: string };

  common: {
    skip: string;
    menuOpen: string;
    menuClose: string;
    language: string;
    external: string;
    back: string;
  };

  dates: DateStrings;

  status: Record<Status, string>;
  /** Longer explanation shown in the detail panel. */
  statusHelp: Record<Status, string>;
  /** Short legend labels under the map. */
  legend: Record<Status, string>;
  levels: Record<Level, string>;
  corridors: Record<Corridor, string>;

  nav: {
    windows: string;
    how: string;
    trust: string;
    pricing: string;
    agencies: string;
    faq: string;
    cta: string;
  };

  hero: {
    badge: string;
    q: string;
    a: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
    chat: {
      title: string;
      /** The question shown in the demo chat: {name} is the featured registry entry. */
      user: string;
      typing: string;
      reply: Record<Status, string>;
    };
  };

  /** Labels of one registry entry (hero card and detail panel). */
  entry: {
    route: string;
    opens: string;
    deadline: string;
    checked: string;
    source: string;
    noDate: string;
    phase: {
      upcoming: PluralForms;
      open: PluralForms;
      ended: string;
      closed: string;
      varies: string;
    };
    stale: string;
    staleHelp: string;
  };

  windows: {
    title: string;
    lead: string;
    mapLabel: string;
    listLabel: string;
    filters: { level: string; destination: string; all: string; clear: string };
    today: string;
    detail: { whatNow: string; remind: string; official: string };
    next: Record<Status, string>;
    empty: string;
    footnote: string;
  };

  registry: Record<ProgramId, { name: string; note: string }>;

  problem: {
    title: string;
    items: { lead: string; body: string }[];
    sources: string;
  };

  how: {
    title: string;
    lead: string;
    steps: Feature[];
    note: string;
  };

  routes: {
    title: string;
    lead: string;
    from: string;
    items: Record<Corridor, { tagline: string; body: string }>;
    studentsLabel: string;
    /** Pre-formatted for the language; empty string hides the figure. */
    students: Record<Corridor, string>;
    sourceNote: string;
  };

  trust: { title: string; lead: string; items: Feature[] };

  pricing: {
    title: string;
    lead: string;
    plans: [Plan, Plan, Plan];
    usdNote: string;
    guarantee: string;
    groupNote: string;
  };

  agencies: {
    title: string;
    lead: string;
    points: Feature[];
    pilot: { title: string; body: string; cta: string };
    policy: string;
  };

  faq: { title: string; items: { q: string; a: string }[] };

  waitlist: {
    title: string;
    lead: string;
    roleLabel: string;
    roles: { student: string; parent: string; agency: string };
    contactLabel: string;
    contactHint: string;
    contactPlaceholder: string;
    nameLabel: string;
    optional: string;
    interestsLabel: string;
    interests: Record<Corridor | "unsure", string>;
    orgLabel: string;
    studentsLabel: string;
    studentsOptions: [string, string, string, string];
    consent: string;
    privacyLink: string;
    submit: string;
    submitting: string;
    success: { title: string; body: string; already: string; telegram: string };
    errors: {
      required: string;
      contact: string;
      consent: string;
      role: string;
      org: string;
      generic: string;
      unavailable: string;
      rate: string;
    };
    count: string;
  };

  footer: {
    tagline: string;
    disclaimer: string;
    privacy: string;
    terms: string;
    registryChecked: string;
    rights: string;
    contact: string;
  };

  notFound: { title: string; body: string; cta: string };

  legal: { privacy: LegalDoc; terms: LegalDoc };
}
