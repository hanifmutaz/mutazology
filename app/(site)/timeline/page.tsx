import type { Metadata } from "next";
import Link from "next/link";
import { getTimeline } from "@/lib/queries";
import { monthName } from "@/lib/utils";
import type { TimelineItem } from "@/types";

export const metadata: Metadata = {
  title: "Timeline",
  description: "The archive read chronologically — the shape of a mind changing over time.",
};

export default async function TimelinePage() {
  const items = await getTimeline();

  // group by year → month
  const byYear: Record<string, Record<string, TimelineItem[]>> = {};
  for (const it of items) {
    const y = it.date.slice(0, 4);
    const m = monthName(it.date);
    (byYear[y] ??= {});
    (byYear[y][m] ??= []).push(it);
  }
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="wrap">
      <div className="pt-20 pb-10">
        <div className="font-mono text-xs text-accent tracking-[0.1em]" style={{ marginBottom: "18px" }}>/timeline</div>
        <h1 className="font-serif font-light text-[clamp(36px,6vw,68px)] leading-[1.05] tracking-[-0.005em]">Timeline</h1>
        <p className="text-ink-dim max-w-[520px] text-[15px]" style={{ marginTop: "22px" }}>
          The archive read chronologically — the shape of a mind changing over time. This is the signature view: proof that nothing here is finished.
        </p>
      </div>

      {years.map((y) => (
        <div key={y} className="py-[60px] border-t border-line-soft">
          <div className="font-serif font-light text-[clamp(48px,10vw,120px)] text-line leading-none mb-2.5 tracking-[-0.01em]">{y}</div>
          {Object.keys(byYear[y]).map((m) => (
            <div key={m} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 py-[26px] border-b border-line-soft" style={{ padding: "26px 0" }}>
              <div className="text-xs tracking-[0.18em] uppercase text-ink-faint pt-1.5">{m}</div>
              <div className="flex flex-col gap-3.5">
                {byYear[y][m].map((it, i) => (
                  <Link key={i} href={it.href} className="group flex items-baseline gap-4 transition-all hover:pl-2">
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faint min-w-[78px]">{it.type}</span>
                    <span className="font-serif text-xl transition-colors group-hover:text-accent">{it.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
