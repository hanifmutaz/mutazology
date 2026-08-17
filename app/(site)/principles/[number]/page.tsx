import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPrinciples, getPrincipleByNumber } from "@/lib/queries";
import { formatDate, SITE } from "@/lib/utils";
import ShareBar from "@/components/reader/ShareBar";

export async function generateStaticParams() {
  const p = await getPrinciples();
  return p.map((x) => ({ number: String(x.number) }));
}

export async function generateMetadata({ params }: { params: { number: string } }): Promise<Metadata> {
  const p = await getPrincipleByNumber(Number(params.number));
  if (!p) return { title: "Not found" };
  const ogUrl = `/api/og?title=${encodeURIComponent(p.statement)}&excerpt=${encodeURIComponent(`Principle #${p.number}`)}&kind=Principle`;
  return {
    title: `Principle #${p.number} — ${p.title}`,
    description: p.statement,
    alternates: { canonical: `/principles/${p.number}` },
    openGraph: {
      title: `Principle #${p.number}`, description: p.statement, type: "article",
      url: `${SITE.url}/principles/${p.number}`, images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: `Principle #${p.number}`, description: p.statement, images: [ogUrl] },
  };
}

export default async function PrinciplePage({ params }: { params: { number: string } }) {
  const p = await getPrincipleByNumber(Number(params.number));
  if (!p) notFound();

  return (
    <div className="wrap">
      <article className="max-w-read mx-auto pt-[70px] pb-[120px]">
        <Link href="/principles" className="text-[11px] tracking-[0.16em] uppercase text-ink-dim mb-11 inline-flex gap-2 transition-colors hover:text-accent">← Principles</Link>

        <div className="font-mono text-xs text-accent tracking-[0.08em]" style={{ marginBottom: "10px" }}>Principle · {p.category}</div>
        <div className="font-serif text-[clamp(60px,14vw,150px)] text-line leading-[0.9]" style={{ margin: "10px 0 24px" }}>
          #{String(p.number).padStart(2, "0")}
        </div>

        <h1 className="font-serif font-light text-[clamp(28px,4.5vw,42px)] leading-[1.2] tracking-[-0.005em]">{p.statement}</h1>

        <div className="flex gap-[22px] items-center text-xs text-ink-faint tracking-[0.05em]" style={{ marginTop: "30px" }}>
          {formatDate(p.date)} <span>·</span> Principle
        </div>

        <div className="text-[18.5px] leading-[1.85] text-[#d8d5cd] mt-9">
          <p className="text-[21px] text-ink">{p.explanation}</p>
        </div>

        <div className="flex gap-2 flex-wrap mt-[60px] pt-[34px] border-t border-line-soft" style={{ paddingTop: "34px" }}>
          {p.tags.map((x) => (
            <span key={x} className="text-[11px] text-ink-dim border border-line px-2.5 py-1 rounded-sm">#{x}</span>
          ))}
        </div>

        <ShareBar title={`Principle #${p.number}`} />
      </article>
    </div>
  );
}
