import type { EvolutionStep } from "@/types";

export default function EvolutionTimeline({ steps }: { steps: EvolutionStep[] }) {
  return (
    <div className="mt-[70px] pt-11 border-t border-line">
      <div className="font-mono text-xs text-accent tracking-[0.1em] mb-[30px]">◈ Evolution of this thought</div>
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <div key={i} className={`relative pl-[34px] pb-9 ${last ? "" : "border-l border-line"}`}>
            <span className="absolute -left-[6px] top-0 w-[11px] h-[11px] rounded-full bg-bg border border-accent" />
            <div className="font-mono text-xs text-accent mb-2">{s.year}</div>
            <p className={`font-serif font-light text-[19px] leading-[1.5] ${s.now ? "text-ink" : "text-ink-dim"}`}>
              {s.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
