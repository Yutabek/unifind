import type { Dict } from "@/content/types";

export function Problem({ dict }: { dict: Dict }) {
  const { problem } = dict;

  return (
    <section id="problem" aria-labelledby="problem-title" className="section section-porcelain">
      <div className="wrap">
        <h2 id="problem-title" className="t-h2 max-w-[20ch]">
          {problem.title}
        </h2>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-14">
          {problem.items.map((item, index) => (
            <li key={item.lead} className="border-t-2 border-dashed border-ink/20 pt-5">
              <span className="num font-display text-xl font-bold leading-none text-lapis" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="t-display-sm mt-3">{item.lead}</p>
              <p className="mt-3 text-ink-2">{item.body}</p>
            </li>
          ))}
        </ol>

        <p className="t-small mt-12 max-w-4xl">{problem.sources}</p>
      </div>
    </section>
  );
}
