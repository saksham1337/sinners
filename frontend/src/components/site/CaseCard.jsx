import { Stat } from "./Blocks";

export const CaseCard = ({ c, compact = false }) => (
  <article id={c.id} className={`scroll-mt-24 border border-border bg-white ${c.lead ? "lg:col-span-2" : ""}`} data-testid={`case-study-${c.id}`}>
    <div className="p-7 lg:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-num text-[0.7rem] uppercase tracking-[0.18em] text-[#575B62]">{c.industry}</span>
        <span className="text-[#CBD5E1]">/</span>
        <span className="text-xs text-[#575B62]">{c.markets}</span>
        {c.type === "strategy" && (
          <span className="ml-auto rounded-full border border-[#CBD5E1] bg-[#EEF2F6] px-3 py-1 font-num text-[0.65rem] uppercase tracking-[0.15em] text-[#0F172A]" data-testid={`case-label-strategy-${c.id}`}>
            Strategy work, no reported results
          </span>
        )}
        {c.lead && <span className="ml-auto rounded-full bg-[#0D5940] px-3 py-1 font-num text-[0.65rem] uppercase tracking-[0.15em] text-white">All three pillars</span>}
      </div>
      <h3 className="mt-5 text-2xl lg:text-3xl font-semibold text-[#111418] max-w-2xl">{c.title}</h3>
      <p className="mt-4 text-[#575B62] leading-relaxed max-w-2xl">{c.summary}</p>
      {c.stats.length > 0 && (
        <div className={`mt-9 grid gap-8 grid-cols-2 ${c.lead ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {(compact ? c.stats.slice(0, 4) : c.stats).map((s, i) => <Stat key={s.label} {...s} testid={`case-${c.id}-stat-${i}`} />)}
        </div>
      )}
      {!compact && (
        <div className="mt-9 grid lg:grid-cols-12 gap-8 border-t border-border pt-8">
          <ul className="lg:col-span-8 space-y-3">
            {c.details.map((d) => (
              <li key={d} className="flex gap-3 text-sm text-[#111418] leading-relaxed"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#0D5940]" />{d}</li>
            ))}
          </ul>
          <div className="lg:col-span-4">
            <p className="eyebrow !text-[#8A8F98] mb-3">Services involved</p>
            <div className="flex flex-wrap gap-2">
              {c.services.map((s) => <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-[#575B62]">{s}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  </article>
);
