import { Check, ShieldAlert } from "lucide-react";

import type { Dict, Plan } from "@/content/types";
import { PrefillLink } from "@/components/ui/PrefillLink";

/** "490 000 so'm" → the amount large, the currency small. Text without digits (e.g. "Free") stays whole. */
function splitPrice(price: string): { amount: string; currency: string } {
  const match = price.match(/^(\d[\d\s ,.]*\d)\s+(\D.*)$/);
  return match ? { amount: match[1], currency: match[2] } : { amount: price, currency: "" };
}

function PlanTicket({ plan, featured }: { plan: Plan; featured: boolean }) {
  const { amount, currency } = splitPrice(plan.price);
  const muted = featured ? "text-on-lapis-2" : "text-ink-2";

  return (
    // On wide screens the three tickets share three row tracks (subgrid), so the prices, the
    // perforations and the buttons line up across the row whatever the length of each text.
    <article
      className={`ticket flex flex-col lg:row-span-3 lg:grid lg:grid-rows-subgrid ${
        featured ? "ticket-lapis on-lapis lg:-my-4" : "shadow-[0_1px_0_rgb(20_28_75/0.06),0_14px_32px_-20px_rgb(20_28_75/0.35)]"
      }`}
    >
      <div className="p-7 pb-6">
        <h3 className="font-display text-[1.875rem] font-bold leading-none">{plan.name}</h3>
        <p className={`mt-2 ${muted}`}>{plan.tagline}</p>
        <p className="mt-7 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="num font-display text-[2.875rem] font-bold leading-none">{amount}</span>
          {currency && <span className={`font-display text-2xl font-bold ${muted}`}>{currency}</span>}
        </p>
        {/* Reserve the line on every ticket so the perforations line up across the row. */}
        <p className={`num mt-1.5 min-h-[1.5rem] text-sm ${featured ? "text-on-lapis-2" : "text-ink-3"}`}>{plan.usd}</p>
      </div>

      <div className="ticket-perf" aria-hidden="true" />

      <div className="flex flex-col p-7 pt-6">
        <ul className="space-y-3 pb-8">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-2.5 leading-snug">
              <Check
                size={18}
                strokeWidth={2.6}
                className={`mt-[0.2rem] ${featured ? "text-mint" : "text-emerald"}`}
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <PrefillLink className={`btn mt-auto w-full ${featured ? "btn-saffron" : "btn-primary"}`}>
          {plan.cta}
        </PrefillLink>
      </div>
    </article>
  );
}

export function Pricing({ dict }: { dict: Dict }) {
  const { pricing } = dict;

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section section-soft">
      <div className="wrap">
        <div className="max-w-3xl">
          <h2 id="pricing-title" className="t-h2">
            {pricing.title}
          </h2>
          <p className="t-lead mt-5">{pricing.lead}</p>
        </div>

        <div className="mt-14 grid gap-y-6 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-7 lg:gap-y-0">
          {pricing.plans.map((plan, index) => (
            <PlanTicket key={plan.name} plan={plan} featured={index === 1} />
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-10">
          <p className="flex gap-3 rounded-[var(--radius-panel)] border border-ink/15 bg-white/70 p-4 font-medium">
            <ShieldAlert size={20} className="mt-0.5 text-lapis" aria-hidden="true" />
            <span>{pricing.guarantee}</span>
          </p>
          <div className="space-y-2">
            <p className="t-small">{pricing.usdNote}</p>
            <p className="t-small">{pricing.groupNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
