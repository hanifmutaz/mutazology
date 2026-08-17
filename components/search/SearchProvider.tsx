"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchResult, Thought } from "@/types";

// ---------------------------------------------------------------------------
// Client-side search + random-thought context. Receives a lightweight search
// index and the thought list from the server (built once, no client DB calls).
// ---------------------------------------------------------------------------

interface Ctx {
  open: () => void;
  close: () => void;
  openRandom: () => void;
}

const SearchCtx = createContext<Ctx>({ open: () => {}, close: () => {}, openRandom: () => {} });
export const useSearch = () => useContext(SearchCtx);

export interface IndexEntry {
  type: SearchResult["type"];
  title: string;
  excerpt: string;
  href: string;
  haystack: string;
}

export default function SearchProvider({
  index,
  thoughts,
  children,
}: {
  index: IndexEntry[];
  thoughts: Pick<Thought, "slug" | "title" | "body" | "category" | "mood" | "date">[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [random, setRandom] = useState<null | typeof thoughts[number]>(null);

  const open = useCallback(() => setSearchOpen(true), []);
  const close = useCallback(() => { setSearchOpen(false); setQ(""); }, []);

  const openRandom = useCallback(() => {
    const t = thoughts[Math.floor(Math.random() * thoughts.length)];
    setRandom(t);
  }, [thoughts]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") { setSearchOpen(false); setRandom(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return index.filter((e) => e.haystack.includes(query)).slice(0, 12);
  }, [q, index]);

  return (
    <SearchCtx.Provider value={{ open, close, openRandom }}>
      {children}

      {/* ---- SEARCH OVERLAY ---- */}
      {searchOpen && (
        <div className="fixed inset-0 z-[200] bg-[#060607]/90 backdrop-blur-md pt-[12vh]" onClick={close}>
          <div className="max-w-read mx-auto px-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4 border-b border-line pb-5">
              <span className="text-accent font-serif text-[26px]">⌕</span>
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the archive…"
                className="flex-1 bg-transparent outline-none font-serif text-3xl font-light placeholder:text-ink-faint"
              />
              <button onClick={close} className="font-mono text-[11px] text-ink-faint border border-line px-2 py-1 rounded-sm">ESC</button>
            </div>

            <div className="mt-6 max-h-[56vh] overflow-y-auto thin-scroll">
              {q && results.length === 0 && (
                <p className="text-ink-faint py-8 font-serif italic text-lg">
                  Nothing found. Perhaps the thought hasn&apos;t been written yet.
                </p>
              )}
              {results.map((r, i) => (
                <button
                  key={i}
                  onClick={() => { close(); router.push(r.href); }}
                  className="group flex items-baseline gap-4 py-4 border-b border-line-soft w-full text-left transition-all hover:pl-2.5"
                >
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-accent-dim min-w-[88px]">{r.type}</span>
                  <span>
                    <span className="block font-serif text-lg transition-colors group-hover:text-accent">{r.title}</span>
                    <span className="block text-xs text-ink-faint mt-0.5">{r.excerpt}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---- RANDOM THOUGHT ---- */}
      {random && (
        <div className="fixed inset-0 z-[210] bg-[#060607]/95 flex items-center justify-center p-8" onClick={() => setRandom(null)}>
          <button onClick={() => setRandom(null)} className="fixed top-6 right-8 text-xs tracking-[0.2em] uppercase text-ink-dim">Close ✕</button>
          <div className="max-w-[640px] text-center animate-[rtIn_0.8s_cubic-bezier(.16,1,.3,1)]" onClick={(e) => e.stopPropagation()}>
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-10">◈ A thought, at random</div>
            <p className="font-serif font-light text-[clamp(26px,4vw,40px)] leading-[1.45]">
              {random.body.join(" · ").replace(/\n/g, " ")}
            </p>
            <div className="mt-9 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-faint">
              {random.category} · {random.mood}
            </div>
            <div className="flex gap-3.5 justify-center mt-12">
              <button className="btn" onClick={openRandom}>Another</button>
              <button className="btn btn-solid" onClick={() => { const s = random.slug; setRandom(null); router.push(`/thoughts/${s}`); }}>Read it</button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes rtIn{from{opacity:0;transform:translateY(24px) scale(.98)}to{opacity:1;transform:none}}`}</style>
    </SearchCtx.Provider>
  );
}
