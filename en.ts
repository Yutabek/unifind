import type { Dict } from "./types";
import { privacyEn, termsEn } from "./legal/en";

export type { Dict } from "./types";

export const en: Dict = {
  meta: {
    title: "{brand}: scholarship deadlines with sources, in Telegram",
    description:
      "A study-abroad assistant for students from Uzbekistan. Every deadline shows its official page and the day we last checked it. Hungary, Türkiye, South Korea and Germany.",
    ogTagline: "Scholarship deadlines you can check.",
  },

  common: {
    skip: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    language: "Language",
    external: "opens in a new tab",
    back: "Back to the home page",
  },

  dates: {
    monthsGen: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    full: "{m} {d}, {y}",
    day: "{m} {d}",
    abbr: "{ms} {d}",
  },

  status: {
    confirmed: "Confirmed",
    expected: "Expected",
    rolling: "Varies",
    unconfirmed: "Unconfirmed",
    closed: "Closed",
  },
  statusHelp: {
    confirmed: "The official page states this date.",
    expected: "A forecast based on the previous cycle. Not official yet.",
    rolling: "Dates differ by programme or university.",
    unconfirmed: "Sources disagree. Wait for the official page.",
    closed: "This window has passed.",
  },
  legend: {
    confirmed: "Stated by the official page",
    expected: "Expected, not official yet",
    rolling: "Varies by programme",
    unconfirmed: "Sources disagree",
    closed: "Window has passed",
  },
  levels: { bachelor: "Bachelor", master: "Master", phd: "PhD" },
  corridors: {
    hungary: "Hungary",
    turkiye: "Türkiye",
    korea: "South Korea",
    germany: "Germany",
  },

  nav: {
    windows: "Deadlines",
    how: "How it works",
    trust: "Our rules",
    pricing: "Pricing",
    agencies: "Agencies",
    faq: "Questions",
    cta: "Join early access",
  },

  hero: {
    badge: "Early access is open",
    q: "When does the scholarship open?",
    a: "The answer comes with its source.",
    lead: "{brand} is a Telegram assistant for students from Uzbekistan. It answers from official pages for Hungary, Türkiye, South Korea and Germany, shows the day each date was last checked, and says plainly when a date is only expected.",
    ctaPrimary: "Join early access",
    ctaSecondary: "See the deadlines",
    note: "The deadline map below is live today. The Telegram assistant opens to the waitlist first.",
    chat: {
      title: "{brand} in Telegram",
      user: "When does {name} open?",
      typing: "Typing",
      reply: {
        expected:
          "My registry lists this as expected, not confirmed: it follows the previous cycle. Here is the entry.",
        confirmed: "Confirmed on the official page. Here is the entry.",
        rolling: "This one varies by programme. Here is the entry.",
        unconfirmed: "Sources disagree on this one, so I will not guess. Here is the entry.",
        closed: "This window has closed. Here is the entry.",
      },
    },
  },

  entry: {
    route: "Route from Tashkent to {place}",
    opens: "Opens",
    deadline: "Deadline",
    checked: "Checked",
    source: "Official page",
    noDate: "Not announced",
    phase: {
      upcoming: { one: "in {n} day", few: "in {n} days", many: "in {n} days", other: "in {n} days" },
      open: { one: "{n} day left", few: "{n} days left", many: "{n} days left", other: "{n} days left" },
      ended: "Window ended",
      closed: "Closed",
      varies: "Dates vary",
    },
    stale: "Re-check pending",
    staleHelp: "This entry has not been re-checked for over {n} days. Confirm it on the official page.",
  },

  windows: {
    title: "Deadlines, as we know them today",
    lead: "Solid bars are dates the official page states. Hatched bars are expected: a forecast from the previous cycle, not an announcement. Pick a level or a destination to narrow the map.",
    mapLabel: "Deadline map",
    listLabel: "Programmes",
    filters: { level: "Level", destination: "Destination", all: "All", clear: "Clear filters" },
    today: "Today",
    detail: {
      whatNow: "What to do now",
      remind: "Remind me about this",
      official: "Open the official page",
    },
    next: {
      confirmed:
        "Check the requirements on the official page and start collecting documents. Put the deadline in your calendar.",
      expected:
        "Prepare documents now: passport validity, copies, a language-test plan. On the expected date, open the official page and confirm the dates before you rely on them.",
      rolling:
        "Dates differ by programme and university. Open the page of the programme you care about and note its own deadline.",
      unconfirmed:
        "Sources disagree, so there is nothing to plan around yet. Check the official page again before you act.",
      closed: "This window has passed. Ask which window comes next and prepare for that one.",
    },
    empty: "No programme matches these filters.",
    footnote:
      "Last checked on {date}. If an official page disagrees with us, trust the official page and tell us at {email}. We aim to correct errors within 24 hours.",
  },

  registry: {
    sh: {
      name: "Stipendium Hungaricum 2027/28",
      note: "The Hungarian government scholarship programme. Applications go through more than one channel, so read the official steps before the window opens.",
    },
    tb: {
      name: "Türkiye Bursları 2027",
      note: "The Turkish government scholarship programme. The window shown follows the previous cycle.",
    },
    "gks-u-embassy": {
      name: "GKS undergraduate 2027, embassy track",
      note: "The embassy track for this intake has closed. The university track below may still be open.",
    },
    "gks-u-university": {
      name: "GKS undergraduate 2027, university track",
      note: "Each university sets its own dates. Check the pages of the universities you want.",
    },
    "gks-g": {
      name: "GKS graduate",
      note: "Published sources disagree on the timing, so we show no dates.",
    },
    daad: {
      name: "DAAD scholarships",
      note: "DAAD runs many schemes, each with its own call and deadline. Open the scheme you need.",
    },
  },

  problem: {
    title: "There is plenty of information. Reliable information is rare.",
    items: [
      {
        lead: "28,954 people left Uzbekistan to study abroad in 2025.",
        body: "That is 19.3% fewer than in 2024. A missed date or a wrong document can still cost a full year.",
      },
      {
        lead: "One page, two kinds of dates.",
        body: "While researching, we found 2027 scholarship pages that mix expected and confirmed dates, and at least one that shows the wrong year. A date you cannot check is a date you cannot plan around.",
      },
      {
        lead: "Help starts at 4.0 million UZS.",
        body: "Standard packages that agencies publish run from about 4.0 to 10.7 million UZS, which is 55–148% of an average monthly wage. Some promise admission or a visa. Nobody can promise that.",
      },
    ],
    sources:
      "Sources: National Statistics Committee via Kun.uz (12 February 2026); Statistics Agency, average wage of 7.27 million UZS in January–September 2026; agency price pages, November 2026, with dollar prices converted at the Central Bank rate of 11,941.65 UZS (3 November 2026).",
  },

  how: {
    title: "From a question to a plan",
    lead: "The same four steps for every destination.",
    steps: [
      {
        title: "Tell us where you stand",
        body: "Twelve questions: level, destinations, language tests, budget, when you want to start. About five minutes.",
      },
      {
        title: "Get matches with sources",
        body: "Up to three destinations and programmes that fit, each with its official page and the day it was checked.",
      },
      {
        title: "Get your calendar",
        body: "A deadline calendar and Telegram reminders. Expected dates stay marked as expected until the official page confirms them.",
      },
      {
        title: "Prepare your documents",
        body: "Checklists for each programme and feedback on your documents. You write, we review.",
      },
    ],
    note: "The first two steps and a 14-day calendar are free. The full plan, reminders and document feedback are part of the Application Pass.",
  },

  routes: {
    title: "Four routes from Tashkent",
    lead: "We start where Uzbek students go and where official scholarships exist. The United Kingdom and the United States follow after launch.",
    from: "From Tashkent (TAS)",
    items: {
      hungary: {
        tagline: "Stipendium Hungaricum",
        body: "The Hungarian government scholarship. We track the date it opens and the steps of its application.",
      },
      turkiye: {
        tagline: "Türkiye Bursları",
        body: "The Turkish government scholarship. One main window a year, which we follow from the previous cycle until the official page confirms it.",
      },
      korea: {
        tagline: "GKS",
        body: "Korean government scholarships have an embassy track and a university track with different dates. We show them separately.",
      },
      germany: {
        tagline: "DAAD",
        body: "Germany’s scholarships are split into many schemes. We list each with its own call and deadline.",
      },
    },
    studentsLabel: "Left to study in 2025",
    students: { hungary: "", turkiye: "2,496", korea: "3,513", germany: "391" },
    sourceNote:
      "Departures for study in 2025: National Statistics Committee, via Kun.uz and Dunyo IA. We found no separate published figure for Hungary.",
  },

  trust: {
    title: "Rules we hold ourselves to",
    lead: "A study-abroad assistant is only useful if you can trust it. The product is built around these rules.",
    items: [
      {
        title: "Every fact has a source",
        body: "Deadlines and requirements come from a registry where each entry carries its official page and the day it was last checked.",
      },
      {
        title: "Expected is not confirmed",
        body: "A forecast is labelled as a forecast. If an entry goes unchecked for three weeks, the site says so itself.",
      },
      {
        title: "We coach, we do not ghostwrite",
        body: "We ask questions, point out gaps and give feedback. Your essay and your letters stay yours.",
      },
      {
        title: "No promise of admission or a visa",
        body: "Nobody except the committee and the embassy can promise either. We will not.",
      },
      {
        title: "No pay-to-rank",
        body: "No agency, university or programme can pay to be recommended. By default we do not recommend agencies at all.",
      },
      {
        title: "Errors get fixed fast",
        body: "Tell us when something is wrong. We aim to correct it, or explain why we did not, within 24 hours.",
      },
    ],
  },

  pricing: {
    title: "One price, no subscription",
    lead: "Early-access prices. Nothing is charged today: payment through Payme and Click opens at launch.",
    plans: [
      {
        name: "Diagnostic",
        price: "Free",
        usd: "",
        tagline: "See where you stand.",
        features: [
          "12-question profile",
          "Top three matches, each with its source",
          "14-day deadline calendar",
        ],
        cta: "Join early access",
      },
      {
        name: "Application Pass",
        price: "490,000 UZS",
        usd: "about $41",
        tagline: "Everything for one application season.",
        features: [
          "12 months of access",
          "A shortlist of up to 10 programmes",
          "Personal plan and Telegram reminders",
          "Document checklists for each programme",
          "3 document reviews",
          "Visa checklist for supported destinations",
          "7-day refund",
        ],
        cta: "Join early access",
      },
      {
        name: "Pass+",
        price: "990,000 UZS",
        usd: "about $83",
        tagline: "More feedback, with your family in the loop.",
        features: [
          "Everything in the Application Pass",
          "Up to 15 document reviews",
          "Text mock interviews",
          "One written expert review",
          "A status page for your family",
          "Priority support",
        ],
        cta: "Join early access",
      },
    ],
    usdNote: "Dollar amounts use the Central Bank rate of 11,941.65 UZS per dollar (3 November 2026).",
    guarantee: "No plan promises admission, a scholarship or a visa.",
    groupNote: "Schools and IELTS centres: ask about group licences.",
  },

  agencies: {
    title: "For agencies: more cases, same quality",
    lead: "Counsellors lose hours to documents, status questions from parents and the deadline crunch. {brand} takes the repeatable part and leaves the advice to you.",
    points: [
      {
        title: "More active cases per counsellor",
        body: "Checklists, reminders and first-pass document checks run on their own.",
      },
      {
        title: "Parent updates without the calls",
        body: "Families see where each application stands, so nobody has to ask.",
      },
      {
        title: "Templates and a shared registry",
        body: "Your team and your students see the same sourced deadlines.",
      },
      {
        title: "Analytics from enquiry to application",
        body: "See which channels and destinations bring students who actually apply.",
      },
    ],
    pilot: {
      title: "Pilot: 30 days, free",
      body: "Up to ten active students. We set it up with you and ask for honest feedback in return.",
      cta: "Apply for the pilot",
    },
    policy:
      "We do not recommend agencies to students by default, and there is no paid placement. Pilot agencies may opt in to receive referrals, which are clearly labelled as referrals.",
  },

  faq: {
    title: "Questions people ask",
    items: [
      {
        q: "What is {brand}, and what works today?",
        a: "{brand} is a study-abroad assistant for students from Uzbekistan that answers from official pages. Today the deadline map on this page is live. The Telegram assistant is opening step by step, and people on the waitlist get in first.",
      },
      {
        q: "Do you guarantee admission or a visa?",
        a: "No. Admission is decided by the university or the scholarship committee, and visas by the embassy. We help you prepare and keep track. We never promise a result.",
      },
      {
        q: "Will you write my essay or motivation letter?",
        a: "No. We ask questions, point out weak spots and give feedback on your drafts. The text stays yours, which is also what committees expect.",
      },
      {
        q: "Where do the dates come from, and how fresh are they?",
        a: "From official pages. Each entry in the registry shows its source and the day it was last checked. When a date is only a forecast, it is marked Expected. If an entry goes unchecked for three weeks, the page says so itself.",
      },
      {
        q: "What does it cost, and can I get a refund?",
        a: "The Diagnostic is free. The Application Pass is 490,000 UZS once, with a 7-day refund. Nothing is charged until launch, when payment through Payme and Click opens.",
      },
      {
        q: "What happens to my data?",
        a: "We store the contact you leave and the answers you choose, on servers in Frankfurt, Germany. We do not collect biometric data. You can ask us to delete everything at {email}. The details are in the privacy notice.",
      },
      {
        q: "Which destinations do you cover?",
        a: "Hungary, Türkiye, South Korea and Germany first. The United Kingdom and the United States follow after launch.",
      },
      {
        q: "I run an agency. How can we take part?",
        a: "Apply for the 30-day pilot. We set it up with you for up to ten active students, and you tell us what works.",
      },
      {
        q: "Which languages do you support?",
        a: "Uzbek, Russian and English, on this site and in the assistant.",
      },
    ],
  },

  waitlist: {
    title: "Join early access",
    lead: "Leave one contact. We write when your destination opens, and send reminders once the assistant is live.",
    roleLabel: "I am a",
    roles: { student: "Student", parent: "Parent", agency: "Agency" },
    contactLabel: "Telegram username, phone or email",
    contactHint: "We use it only to reach you about {brand}.",
    contactPlaceholder: "@username or +998 90 123 45 67",
    nameLabel: "Your name",
    optional: "optional",
    interestsLabel: "Interested in",
    interests: {
      hungary: "Hungary",
      turkiye: "Türkiye",
      korea: "South Korea",
      germany: "Germany",
      unsure: "Not sure yet",
    },
    orgLabel: "Agency name",
    studentsLabel: "Active students now",
    studentsOptions: ["1–10", "11–30", "31–100", "More than 100"],
    consent:
      "I have read the privacy notice and agree that {company} stores my contact to write to me about {brand}.",
    privacyLink: "Privacy notice",
    submit: "Join early access",
    submitting: "Sending…",
    success: {
      title: "You are on the list.",
      body: "We will write to you when your destination opens. Until then, the deadline map above stays up to date.",
      already: "This contact is already on the list. Nothing more to do.",
      telegram: "Open our Telegram",
    },
    errors: {
      required: "Please fill this in.",
      contact: "Enter a Telegram username, a phone number with country code, or an email.",
      consent: "Please confirm to continue.",
      role: "Choose who you are.",
      org: "Enter the agency name.",
      generic: "Something went wrong on our side. Try again in a minute.",
      unavailable: "The list is temporarily unavailable. Please try again soon.",
      rate: "Too many attempts. Wait a minute and try again.",
    },
    count: "{n} people are already on the list",
  },

  footer: {
    tagline: "Scholarship deadlines you can check.",
    disclaimer:
      "{brand} is an independent service. It is not affiliated with the Hungarian, Turkish, Korean or German governments, with DAAD, or with any university, and it does not act on their behalf.",
    privacy: "Privacy notice",
    terms: "Terms of use",
    registryChecked: "Registry last checked {date}",
    rights: "© {year} {company}",
    contact: "Contact",
  },

  notFound: {
    title: "This page does not exist",
    body: "The link may be old or mistyped.",
    cta: "Go to the home page",
  },

  legal: { privacy: privacyEn, terms: termsEn },
};
