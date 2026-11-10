import { Plus } from "lucide-react";

import type { Dict } from "@/content/types";

/** Native <details>: works without JavaScript, and every answer stays in the HTML. */
export function Faq({ dict }: { dict: Dict }) {
  const { faq } = dict;

  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <h2 id="faq-title" className="t-h2 lg:col-span-4">
          {faq.title}
        </h2>

        <div className="faq lg:col-span-8">
          {faq.items.map((item) => (
            <details key={item.q}>
              <summary>
                <span>{item.q}</span>
                <Plus size={22} className="faq-icon" aria-hidden="true" />
              </summary>
              <p className="max-w-[44rem] pb-6 pr-8 text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
