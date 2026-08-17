"use client";

import { useMemo, useState } from "react";
import type { Observation } from "@/types";
import ObservationCard from "@/components/content/ObservationCard";

export default function ObservationsExplorer({ observations }: { observations: Observation[] }) {
  const [cat, setCat] = useState("All");
  const cats = useMemo(() => ["All", ...Array.from(new Set(observations.map((o) => o.category)))], [observations]);
  const list = observations.filter((o) => cat === "All" || o.category === cat);

  return (
    <>
      <div className="flex flex-wrap gap-2.5 items-center border-t border-line-soft border-b border-line-soft" style={{ padding: "26px 0" }}>
        <span className="text-[10px] tracking-[0.18em] uppercase text-ink-faint mr-1">Category</span>
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`chip ${cat === c ? "chip-on" : ""}`}>{c}</button>
        ))}
      </div>
      <div className="text-[11px] text-ink-faint tracking-[0.1em] py-5">
        {list.length} observation{list.length !== 1 ? "s" : ""}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((o) => <ObservationCard key={o.slug} o={o} />)}
      </div>
    </>
  );
}
