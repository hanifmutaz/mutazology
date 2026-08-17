"use client";

import { useMemo, useState } from "react";
import type { Thought } from "@/types";
import ThoughtCard from "@/components/content/ThoughtCard";

export default function ThoughtsExplorer({ thoughts }: { thoughts: Thought[] }) {
  const [cat, setCat] = useState("All");
  const [mood, setMood] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"new" | "views">("new");

  const cats = useMemo(() => ["All", ...Array.from(new Set(thoughts.map((t) => t.category)))], [thoughts]);
  const moods = useMemo(() => ["All", ...Array.from(new Set(thoughts.map((t) => t.mood)))], [thoughts]);

  const list = useMemo(() => {
    let l = thoughts.filter((t) =>
      (cat === "All" || t.category === cat) &&
      (mood === "All" || t.mood === mood) &&
      (!q || `${t.title} ${t.body.join(" ")} ${t.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()))
    );
    l = sort === "views"
      ? [...l].sort((a, b) => b.views - a.views)
      : [...l].sort((a, b) => b.date.localeCompare(a.date));
    return l;
  }, [thoughts, cat, mood, q, sort]);

  return (
    <>
      <div className="flex flex-wrap gap-2.5 items-center py-[26px] border-t border-line-soft border-b border-line-soft" style={{ padding: "26px 0" }}>
        <span className="text-[10px] tracking-[0.18em] uppercase text-ink-faint mr-1">Category</span>
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`chip ${cat === c ? "chip-on" : ""}`}>{c}</button>
        ))}
        <div className="ml-auto flex items-center gap-2.5 border border-line px-3.5 py-2 min-w-[220px]">
          <span className="text-ink-faint">⌕</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter thoughts…"
            className="bg-transparent outline-none text-ink text-[13px] w-full placeholder:text-ink-faint"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 items-center py-[26px]" style={{ padding: "26px 0" }}>
        <span className="text-[10px] tracking-[0.18em] uppercase text-ink-faint mr-1">Mood</span>
        {moods.map((m) => (
          <button key={m} onClick={() => setMood(m)} className={`chip ${mood === m ? "chip-mood-on" : ""}`}>{m}</button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] tracking-[0.18em] uppercase text-ink-faint mr-1">Sort</span>
          <button onClick={() => setSort("new")} className={`chip ${sort === "new" ? "chip-on" : ""}`}>Newest</button>
          <button onClick={() => setSort("views")} className={`chip ${sort === "views" ? "chip-on" : ""}`}>Most read</button>
        </div>
      </div>

      <div className="text-[11px] text-ink-faint tracking-[0.1em] py-5">
        {list.length} thought{list.length !== 1 ? "s" : ""}
      </div>

      {list.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line-soft border border-line-soft">
          {list.map((t) => <ThoughtCard key={t.slug} t={t} />)}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="font-serif italic text-2xl text-ink-faint">No thoughts match that.</div>
          <div className="text-[13px] text-ink-faint mt-3.5">The archive is quiet here — for now.</div>
        </div>
      )}
    </>
  );
}
