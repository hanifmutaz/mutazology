import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getThoughts, getThoughtBySlug } from "@/lib/queries";
import { formatDate, excerpt, SITE } from "@/lib/utils";
import MoodDot from "@/components/ui/MoodDot";
import EvolutionTimeline from "@/components/reader/EvolutionTimeline";
import ShareBar from "@/components/reader/ShareBar";

export async function generateStaticParams() {
  const thoughts = await getThoughts();
  return thoughts.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const t = await getThoughtBySlug(params.slug);
  if (!t) return { title: "Not found" };
  const desc = excerpt(t.body.join(" "), 160);
  const ogUrl = `/api/og?title=${encodeURIComponent(t.title)}&excerpt=${encodeURIComponent(excerpt(t.body.join(" "), 90))}&kind=Thought`;
  return {
    title: t.title,
    description: desc,
    alternates: { canonical: `/thoughts/${t.slug}` },
    openGraph: {
      title: t.title, description: desc, type: "article",
      url: `${SITE.url}/thoughts/${t.slug}`, images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: t.title, description: desc, images: [ogUrl] },
  };
}

export default async function ThoughtPage({ params }: { params: { slug: string } }) {
  const t = await getThoughtBySlug(params.slug);
  if (!t) notFound();

  const jsonLd = {
    "@context": "https://schema.org", "@type": "CreativeWork",
    headline: t.title, author: { "@type": "Person", name: SITE.author },
    datePublished: t.date, articleSection: t.category,
  };

  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-read mx-auto pt-[70px] pb-[120px]">
        <Link href="/thoughts" className="text-[11px] tracking-[0.16em] uppercase text-ink-dim mb-11 inline-flex gap-2 transition-colors hover:text-accent">← Thoughts</Link>

        <div className="font-mono text-xs text-accent tracking-[0.08em] mb-[22px] flex items-center gap-2" style={{ marginBottom: "22px" }}>
          {t.category} · <MoodDot mood={t.mood} />
        </div>

        <h1 className="font-serif text-[clamp(34px,6vw,58px)] leading-[1.05] tracking-[-0.02em] mb-5">{t.title}</h1>

        <div className="flex gap-[22px] items-center pb-9 mb-11 border-b border-line text-xs text-ink-faint tracking-[0.05em] flex-wrap" style={{ gap: "22px" }}>
          {formatDate(t.date)} <span>·</span> {t.views} views <span>·</span> Thought
        </div>

        <div className="text-center">
          <div className="font-serif font-light text-[clamp(22px,4vw,30px)] leading-[1.6] text-ink"
            dangerouslySetInnerHTML={{ __html: t.body.map((s) => s.replace(/\n/g, "<br/>")).join("<br/><br/>") }} />
          <div className="font-serif italic text-lg text-ink-faint mt-10">— {SITE.author}</div>
        </div>

        {t.evolution && <EvolutionTimeline steps={t.evolution} />}

        <div className="flex gap-2 flex-wrap mt-[60px] pt-[34px] border-t border-line-soft" style={{ paddingTop: "34px" }}>
          {t.tags.map((x) => (
            <span key={x} className="text-[11px] text-ink-dim border border-line px-2.5 py-1 rounded-sm">#{x}</span>
          ))}
        </div>

        <ShareBar title={t.title} />
      </article>
    </div>
  );
}
