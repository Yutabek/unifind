import type { Dict } from "@/content/types";
import { CORRIDORS, CORRIDOR_ORDER } from "@/data/registry";

/** Four routes out of Tashkent, laid out like a departures board. */
export function Routes({ dict }: { dict: Dict }) {
  const { routes, corridors } = dict;

  return (
    <section id="routes" aria-labelledby="routes-title" className="section section-porcelain">
      <div className="wrap">
        <div className="max-w-3xl">
          <h2 id="routes-title" className="t-h2">
            {routes.title}
          </h2>
          <p className="t-lead mt-5">{routes.lead}</p>
        </div>

        <p className="mb-3 mt-12 text-sm font-semibold text-ink-3">{routes.from}</p>
        <ul>
          {CORRIDOR_ORDER.map((corridor) => {
            const item = routes.items[corridor];
            const students = routes.students[corridor];
            return (
              <li key={corridor} className="route">
                <div>
                  <p className="code" aria-hidden="true">
                    {CORRIDORS[corridor].code}
                  </p>
                  <p className="mt-2 font-semibold">{corridors[corridor]}</p>
                </div>

                <div>
                  <h3 className="t-h3">{item.tagline}</h3>
                  <p className="mt-1.5 max-w-[40rem] text-ink-2">{item.body}</p>
                </div>

                {students && (
                  <div className="min-[52rem]:text-right">
                    <p className="num font-display text-[2.5rem] font-bold leading-none">{students}</p>
                    <p className="t-small mt-1">{routes.studentsLabel}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="t-small mt-8 max-w-3xl">{routes.sourceNote}</p>
      </div>
    </section>
  );
}
