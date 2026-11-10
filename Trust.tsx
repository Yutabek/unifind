import { BadgeCheck, Compass, Hourglass, ShieldOff, Wrench, WalletCards } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Dict } from "@/content/types";

/** One icon per rule, in the same order as the copy in the dictionaries. */
const ICONS: LucideIcon[] = [BadgeCheck, Hourglass, Compass, ShieldOff, WalletCards, Wrench];

export function Trust({ dict }: { dict: Dict }) {
  const { trust } = dict;

  return (
    <section id="trust" aria-labelledby="trust-title" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="trust-title" className="t-h2">
              {trust.title}
            </h2>
            <p className="t-lead mt-5">{trust.lead}</p>
          </div>
        </div>

        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
          {trust.items.map((item, index) => {
            const Icon = ICONS[index] ?? BadgeCheck;
            return (
              <li key={item.title}>
                <span className="grid size-11 place-items-center rounded-[var(--radius-control)] bg-lapis text-white">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="t-h3 mt-4">{item.title}</h3>
                <p className="mt-2 text-ink-2">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
