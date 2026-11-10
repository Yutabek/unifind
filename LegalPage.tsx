import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import type { LegalDoc } from "@/content/types";
import { localePath, type Locale } from "@/lib/i18n";

/** Privacy notice and terms share one plain reading layout. */
export function LegalPage({ doc, locale, backLabel }: { doc: LegalDoc; locale: Locale; backLabel: string }) {
  return (
    <article className="section">
      <div className="wrap max-w-[50rem]">
        <Link href={localePath(locale)} className="link inline-flex items-center gap-1.5 text-[0.9375rem]">
          <ArrowLeft size={16} aria-hidden="true" />
          {backLabel}
        </Link>

        <h1 className="t-h2 mt-8">{doc.title}</h1>
        <p className="t-small mt-3">{doc.updated}</p>
        <p className="t-lead mt-7 max-w-[40rem]">{doc.intro}</p>

        <div className="prose-legal mt-4">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
