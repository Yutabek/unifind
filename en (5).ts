import type { LegalDoc } from "../types";

/**
 * DRAFTS. These texts describe what the site actually does today, in plain
 * language. They are not legal advice: have a lawyer qualified in Uzbekistan
 * review and adapt them (company details, retention, governing law, the
 * competent authority) before you collect real data at scale.
 */

export const privacyEn: LegalDoc = {
  title: "Privacy notice",
  updated: "Last updated: 10 November 2026",
  intro:
    "This notice explains what {company} (“we”) does with the information you leave on the {brand} website. We keep it short because we collect very little.",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "{company} runs {brand}. You can reach us about anything in this notice at {email}.",
      ],
    },
    {
      heading: "What we collect",
      paragraphs: ["When you join early access, the form sends us:"],
      items: [
        "your contact: a Telegram username, a phone number or an email address;",
        "who you are (student, parent or agency) and, if you choose, your name;",
        "the destinations you are interested in;",
        "for agencies: the agency name and a range for the number of active students;",
        "the language of the page, the campaign tags in the link you came from, and the time and version of your consent.",
      ],
    },
    {
      heading: "What we do not collect",
      paragraphs: [
        "We do not ask for passports, grades, photos or any biometric or genetic data, and we do not use advertising or analytics trackers on this site.",
      ],
    },
    {
      heading: "Why we use it",
      paragraphs: [
        "We use your contact to write to you about early access and, once the assistant is live, to send the reminders you asked for. We use the other answers to understand which destinations matter most. The basis is your consent, which you can withdraw at any time.",
      ],
    },
    {
      heading: "Where it is stored",
      paragraphs: [
        "The waitlist is stored in a database hosted in Frankfurt, Germany (European Union). The website is served by Vercel. Both act on our behalf, and server logs may briefly include your IP address. We do not sell your data and we do not share it for advertising.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "Until you withdraw consent or ask us to delete it, and in any case no longer than 24 months after you joined.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "You can ask us to show you what we hold, correct it, delete it, or stop using it. Write to {email} from the contact you left, and we will reply as soon as we can and within 30 days. You may also complain to the authority responsible for personal data protection in Uzbekistan.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "The site sets one small cookie, “hamroh_lang”, only to remember the language you picked. There are no advertising or analytics cookies.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "Data travels over an encrypted connection. The waitlist table can only be written by our server and is not readable from the public internet.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "If we change this notice in a way that matters, we will update the date above and, where we can, tell you using the contact you left.",
      ],
    },
  ],
};

export const termsEn: LegalDoc = {
  title: "Terms of use",
  updated: "Last updated: 10 November 2026",
  intro:
    "By using this website you agree to these terms. They are short on purpose. If something is unclear, write to {email}.",
  sections: [
    {
      heading: "What {brand} is",
      paragraphs: [
        "{brand} is an informational and educational service for people planning to study abroad. It is in early access: some features described on this site are still being built. {brand} is not an admissions agency, an embassy or a scholarship provider.",
      ],
    },
    {
      heading: "No guarantees",
      paragraphs: [
        "We work from official pages and show the day each entry was last checked. Dates marked “Expected” are forecasts, not announcements. Always confirm on the official page before you act. Admission, scholarships and visas are decided by universities, committees and embassies, and we never promise a result.",
      ],
    },
    {
      heading: "Using the site",
      paragraphs: [
        "Give us true information when you join the list. Do not misuse the site: no automated scraping at a scale that affects other people, no attempts to break or overload it.",
      ],
    },
    {
      heading: "Early access and payments",
      paragraphs: [
        "Nothing is charged today. Prices shown are indicative early-access prices. When payments open, they will come with their own purchase terms, including the refund period shown on the pricing section.",
      ],
    },
    {
      heading: "Content and names",
      paragraphs: [
        "The design, text and code of this site belong to {company}. Names of programmes, governments and organisations belong to their owners and are used only to describe them. We are not affiliated with them.",
      ],
    },
    {
      heading: "Links to other sites",
      paragraphs: [
        "We link to official pages so you can check facts yourself. We do not control those sites and are not responsible for their content.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "To the extent the law allows, {company} is not liable for decisions made only on the basis of this site, or for losses from a missed or changed deadline. We will correct errors we are told about, aiming for 24 hours.",
      ],
    },
    {
      heading: "Changes and governing law",
      paragraphs: [
        "We may update these terms and will change the date above when we do. These terms are governed by the laws of the Republic of Uzbekistan.",
      ],
    },
  ],
};
