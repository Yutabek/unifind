import { Info } from "lucide-react";

import type { Dict } from "@/content/types";

export function HowItWorks({ dict }: { dict: Dict }) {
  const { how } = dict;

  return (
    <section id="how" aria-labelledby="how-title" className="section">
      <div className="wrap">
        <div className="max-w-3xl">
          <h2 id="how-title" className="t-h2">
            {how.title}
          </h2>
          <p className="t-lead mt-5">{how.lead}</p>
        </div>

        <ol className="steps mt-14">
          {how.steps.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step-num" aria-hidden="true">
                {index + 1}
              </span>
              <h3 className="t-h3">{step.title}</h3>
              <p className="mt-2 text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-14 flex max-w-3xl gap-3 rounded-[var(--radius-panel)] bg-lapis-soft p-5 text-ink-2">
          <Info size={20} className="mt-0.5 text-lapis" aria-hidden="true" />
          <span>{how.note}</span>
        </p>
      </div>
    </section>
  );
}
