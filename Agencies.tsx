import { ArrowRight } from "lucide-react";

import type { Dict } from "@/content/types";
import { PrefillLink } from "@/components/ui/PrefillLink";

export function Agencies({ dict }: { dict: Dict }) {
  const { agencies } = dict;

  return (
    <section id="agencies" aria-labelledby="agencies-title" className="section section-porcelain">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h2 id="agencies-title" className="t-h2 max-w-[18ch]">
            {agencies.title}
          </h2>
          <p className="t-lead mt-5 max-w-[40rem]">{agencies.lead}</p>

          <ul className="mt-11 grid gap-x-9 gap-y-8 sm:grid-cols-2">
            {agencies.points.map((point) => (
              <li key={point.title} className="border-t-2 border-dashed border-ink/20 pt-4">
                <h3 className="t-h3">{point.title}</h3>
                <p className="mt-2 text-ink-2">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-[var(--radius-card)] border-2 border-dashed border-lapis/40 bg-lapis-soft p-7 sm:p-9 lg:sticky lg:top-28">
            <h3 className="t-display-sm">{agencies.pilot.title}</h3>
            <p className="mt-3 text-ink-2">{agencies.pilot.body}</p>
            <PrefillLink role="agency" className="btn btn-primary mt-7 w-full sm:w-auto">
              {agencies.pilot.cta}
              <ArrowRight size={18} aria-hidden="true" />
            </PrefillLink>
            <p className="t-small mt-6">{agencies.policy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
