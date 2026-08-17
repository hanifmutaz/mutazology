import type { Observation } from "@/types";

export default function ObservationCard({ o }: { o: Observation }) {
  return (
    <div className="group border-l border-line hover:border-accent transition-colors duration-300 pl-[26px] py-1.5" style={{ paddingLeft: "1.6rem" }}>
      <div className="text-[10px] tracking-[0.2em] uppercase text-ink-faint mb-3">
        {o.category} · {o.mood}
      </div>
      <p className="font-serif font-light text-lg leading-[1.55]">{o.text}</p>
    </div>
  );
}
