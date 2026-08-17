import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SearchProvider, { type IndexEntry } from "@/components/search/SearchProvider";
import {
  getThoughts, getReflections, getObservations, getPrinciples,
} from "@/lib/queries";
import { excerpt } from "@/lib/utils";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  // Build a lightweight search index on the server (works with Supabase or seed).
  const [thoughts, reflections, observations, principles] = await Promise.all([
    getThoughts(), getReflections(), getObservations(), getPrinciples(),
  ]);

  const index: IndexEntry[] = [
    ...thoughts.map((t) => ({
      type: "Thought" as const, title: t.title, excerpt: excerpt(t.body.join(" ")),
      href: `/thoughts/${t.slug}`,
      haystack: `${t.title} ${t.body.join(" ")} ${t.category} ${t.mood} ${t.tags.join(" ")}`.toLowerCase(),
    })),
    ...reflections.map((r) => ({
      type: "Reflection" as const, title: r.title, excerpt: r.subtitle,
      href: `/reflections/${r.slug}`,
      haystack: `${r.title} ${r.subtitle} ${r.category} ${r.mood} ${r.tags.join(" ")}`.toLowerCase(),
    })),
    ...observations.map((o) => ({
      type: "Observation" as const, title: `On ${o.category.toLowerCase()}`, excerpt: excerpt(o.text),
      href: `/observations`,
      haystack: `${o.text} ${o.category} ${o.mood}`.toLowerCase(),
    })),
    ...principles.map((p) => ({
      type: "Principle" as const, title: `#${p.number} ${p.title}`, excerpt: p.statement,
      href: `/principles/${p.number}`,
      haystack: `${p.statement} ${p.title} ${p.category} ${p.tags.join(" ")}`.toLowerCase(),
    })),
  ];

  const thoughtsLite = thoughts.map((t) => ({
    slug: t.slug, title: t.title, body: t.body, category: t.category, mood: t.mood, date: t.date,
  }));

  return (
    <SearchProvider index={index} thoughts={thoughtsLite}>
      <Nav />
      <main className="pt-[66px] min-h-screen">{children}</main>
      <Footer />
    </SearchProvider>
  );
}
