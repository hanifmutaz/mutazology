import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReflections, getReflectionBySlug } from "@/lib/queries";
import { formatDate, SITE } from "@/lib/utils";
import MoodDot from "@/components/ui/MoodDot";
import ShareBar from "@/components/reader/ShareBar";

export async function generateStaticParams() {
  const r = await getReflections();
  return r.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const r = await getReflectionBySlug(params.slug);
  if (!r) return { title: "Not found" };
  const ogUrl = `/api/og?title=${encodeURIComponent(r.title)}&excerpt=${encodeURIComponent(r.subtitle)}&kind=Reflection`;
  return {
    title: r.title,
    description: r.subtitle,
    alternates: { canonical: `/reflections/${r.slug}` },
    openGraph: {
      title: r.title, description: r.subtitle, type: "article",
      url: `${SITE.url}/reflections/${r.slug}`, images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: r.title, description: r.subtitle, images: [ogUrl] },
  };
}

export default async function ReflectionPage({ params }: { params: { slug: string } }) {
  const r = await getReflectionBySlug(params.slug);
  if (!r) notFound();

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: r.title, description: r.subtitle,
    author: { "@type": "Person", name: SITE.author },
    datePublished: r.date, articleSection: r.category,
  };

  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-read mx-auto pt-[70px] pb-[120px]">
        <Link href="/reflections" className="text-[11px] tracking-[0.16em] uppercase text-ink-dim mb-11 inline-flex gap-2 transition-colors hover:text-accent">← Reflections</Link>

        <div className="font-mono text-xs text-accent tracking-[0.08em] flex items-center gap-2" style={{ marginBottom: "22px" }}>
          {r.category} · <MoodDot mood={r.mood} />
        </div>

        <h1 className="font-serif text-[clamp(34px,6vw,58px)] leading-[1.05] tracking-[-0.02em] mb-5">{r.title}</h1>
        <div className="font-serif italic font-light text-[22px] text-ink-dim mb-[34px]" style={{ marginBottom: "34px" }}>{r.subtitle}</div>

        <div className="flex gap-[22px] items-center pb-9 mb-11 border-b border-line text-xs text-ink-faint tracking-[0.05em] flex-wrap" style={{ gap: "22px" }}>
          {formatDate(r.date)} <span>·</span> {r.readingTime} read <span>·</span> Reflection
        </div>

        <div className="text-[18.5px] leading-[1.85] text-[#d8d5cd]">
          {r.body.map((b, i) => {
            if (b.type === "h") return <h2 key={i} className="font-serif text-[30px] mt-12 mb-5 tracking-[-0.01em] text-ink">{b.text}</h2>;
            if (b.type === "quote") return <blockquote key={i} className="font-serif italic text-[23px] leading-[1.5] text-accent border-l border-accent-dim pl-[26px] my-[38px]" style={{ paddingLeft: "26px", margin: "38px 0" }}>{b.text}</blockquote>;
            return <p key={i} className={`mb-7 ${b.type === "lead" ? "text-[21px] text-ink" : ""}`}>{b.text}</p>;
          })}
          <div className="font-serif italic text-lg text-ink-faint mt-[50px]" style={{ marginTop: "50px" }}>— {SITE.author}</div>
        </div>

        <div className="flex gap-2 flex-wrap mt-[60px] pt-[34px] border-t border-line-soft" style={{ paddingTop: "34px" }}>
          {r.tags.map((x) => (
            <span key={x} className="text-[11px] text-ink-dim border border-line px-2.5 py-1 rounded-sm">#{x}</span>
          ))}
        </div>

        <ShareBar title={r.title} />
      </article>
    </div>
  );
}
