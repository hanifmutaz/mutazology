import "server-only";
import { getServerClient } from "@/lib/supabase/server";
import {
  THOUGHTS, REFLECTIONS, OBSERVATIONS, PRINCIPLES,
} from "@/lib/data/seed";
import type {
  Thought, Reflection, Observation, Principle,
  SearchResult, TimelineItem, MoodName,
} from "@/types";

// ---------------------------------------------------------------------------
// Data access layer.
// Every function tries Supabase first; if it is not configured (or a query
// fails) it transparently falls back to the bundled seed content. This is what
// lets the site deploy to Vercel and work immediately, then "light up" fully
// the moment Supabase env vars are added.
// ---------------------------------------------------------------------------

// ---- helpers ---------------------------------------------------------------

type Row = Record<string, any>;

function mapThought(r: Row): Thought {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category?.name ?? r.category ?? "Life",
    mood: (r.mood?.name ?? r.mood ?? "Reflective") as MoodName,
    date: r.published_at ?? r.created_at ?? r.date,
    featured: !!r.featured,
    tags: r.tags ?? [],
    views: r.views ?? 0,
    body: Array.isArray(r.body) ? r.body : String(r.body ?? "").split("\n\n"),
    evolution: r.evolution ?? undefined,
  };
}

// ---- THOUGHTS --------------------------------------------------------------

export async function getThoughts(): Promise<Thought[]> {
  const sb = getServerClient();
  if (sb) {
    const { data, error } = await sb
      .from("thoughts")
      .select("slug,title,body,featured,views,published_at,created_at,category:categories(name),mood:moods(name)")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (!error && data?.length) return data.map(mapThought);
  }
  return [...THOUGHTS].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getThoughtBySlug(slug: string): Promise<Thought | null> {
  const all = await getThoughts();
  return all.find((t) => t.slug === slug) ?? null;
}

export async function getFeaturedThought(): Promise<Thought> {
  const all = await getThoughts();
  return all.find((t) => t.featured) ?? all[0];
}

// ---- REFLECTIONS -----------------------------------------------------------

export async function getReflections(): Promise<Reflection[]> {
  // Reflections use a rich block body; served from seed unless you extend the
  // Supabase mapper to parse markdown into blocks.
  return [...REFLECTIONS].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getReflectionBySlug(slug: string): Promise<Reflection | null> {
  const all = await getReflections();
  return all.find((r) => r.slug === slug) ?? null;
}

// ---- OBSERVATIONS ----------------------------------------------------------

export async function getObservations(): Promise<Observation[]> {
  const sb = getServerClient();
  if (sb) {
    const { data, error } = await sb
      .from("observations")
      .select("slug,body,published_at,created_at,category:categories(name),mood:moods(name)")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (!error && data?.length) {
      return data.map((r: Row) => ({
        slug: r.slug,
        category: r.category?.name ?? "Life",
        mood: (r.mood?.name ?? "Reflective") as MoodName,
        text: r.body,
        date: r.published_at ?? r.created_at,
      }));
    }
  }
  return [...OBSERVATIONS].sort((a, b) => b.date.localeCompare(a.date));
}

// ---- PRINCIPLES ------------------------------------------------------------

export async function getPrinciples(): Promise<Principle[]> {
  const sb = getServerClient();
  if (sb) {
    const { data, error } = await sb
      .from("principles")
      .select("number,slug,title,statement,explanation,created_at,category:categories(name)")
      .eq("status", "published")
      .order("number", { ascending: true });
    if (!error && data?.length) {
      return data.map((r: Row) => ({
        number: r.number,
        slug: r.slug,
        title: r.title,
        statement: r.statement,
        explanation: r.explanation ?? "",
        category: r.category?.name ?? "Philosophy",
        date: r.created_at,
        tags: r.tags ?? [],
      }));
    }
  }
  return [...PRINCIPLES].sort((a, b) => a.number - b.number);
}

export async function getPrincipleByNumber(n: number): Promise<Principle | null> {
  const all = await getPrinciples();
  return all.find((p) => p.number === n) ?? null;
}

// ---- STATS -----------------------------------------------------------------

export async function getStats() {
  const [t, r, o, p] = await Promise.all([
    getThoughts(), getReflections(), getObservations(), getPrinciples(),
  ]);
  return {
    thoughts: t.length,
    reflections: r.length,
    observations: o.length,
    principles: p.length,
    totalViews: t.reduce((a, x) => a + x.views, 0),
    years: 3,
  };
}

// ---- SEARCH (unified across kinds) ----------------------------------------

export async function searchAll(q: string): Promise<SearchResult[]> {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  const [thoughts, reflections, observations, principles] = await Promise.all([
    getThoughts(), getReflections(), getObservations(), getPrinciples(),
  ]);
  const out: SearchResult[] = [];

  for (const t of thoughts) {
    const hay = `${t.title} ${t.body.join(" ")} ${t.category} ${t.mood} ${t.tags.join(" ")}`.toLowerCase();
    if (hay.includes(query)) out.push({ type: "Thought", title: t.title, excerpt: excerpt(t.body.join(" ")), href: `/thoughts/${t.slug}` });
  }
  for (const r of reflections) {
    const hay = `${r.title} ${r.subtitle} ${r.category} ${r.mood} ${r.tags.join(" ")}`.toLowerCase();
    if (hay.includes(query)) out.push({ type: "Reflection", title: r.title, excerpt: r.subtitle, href: `/reflections/${r.slug}` });
  }
  for (const o of observations) {
    const hay = `${o.text} ${o.category} ${o.mood}`.toLowerCase();
    if (hay.includes(query)) out.push({ type: "Observation", title: `On ${o.category.toLowerCase()}`, excerpt: excerpt(o.text), href: `/observations` });
  }
  for (const p of principles) {
    const hay = `${p.statement} ${p.title} ${p.category} ${p.tags.join(" ")}`.toLowerCase();
    if (hay.includes(query)) out.push({ type: "Principle", title: `#${p.number} ${p.title}`, excerpt: p.statement, href: `/principles/${p.number}` });
  }
  return out.slice(0, 20);
}

// ---- TIMELINE --------------------------------------------------------------

export async function getTimeline(): Promise<TimelineItem[]> {
  const [thoughts, reflections, observations, principles] = await Promise.all([
    getThoughts(), getReflections(), getObservations(), getPrinciples(),
  ]);
  const items: TimelineItem[] = [
    ...thoughts.map((t) => ({ type: "Thought" as const, title: t.title, date: t.date, href: `/thoughts/${t.slug}` })),
    ...reflections.map((r) => ({ type: "Reflection" as const, title: r.title, date: r.date, href: `/reflections/${r.slug}` })),
    ...observations.map((o) => ({ type: "Observation" as const, title: `On ${o.category.toLowerCase()}`, date: o.date, href: `/observations` })),
    ...principles.map((p) => ({ type: "Principle" as const, title: `#${p.number} · ${p.title}`, date: p.date, href: `/principles/${p.number}` })),
  ];
  return items.sort((a, b) => b.date.localeCompare(a.date));
}

// ---- util ------------------------------------------------------------------

function excerpt(s: string, n = 120): string {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
