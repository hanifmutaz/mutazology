import Link from "next/link";
import {
  getFeaturedThought, getThoughts, getReflections,
  getObservations, getPrinciples, getStats,
} from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import MoodDot from "@/components/ui/MoodDot";
import ThoughtCard from "@/components/content/ThoughtCard";
import ReflectionRow from "@/components/content/ReflectionRow";
import ObservationCard from "@/components/content/ObservationCard";
import PrincipleRow from "@/components/content/PrincipleRow";
import RandomButton from "@/components/search/RandomButton";

export default async function HomePage() {
  const [featured, thoughts, reflections, observations, principles, stats] = await Promise.all([
    getFeaturedThought(), getThoughts(), getReflections(),
    getObservations(), getPrinciples(), getStats(),
  ]);

  const latest = thoughts.slice(0, 6);
  const refs = reflections.slice(0, 4);
  const obs = observations.slice(0, 4);
  const prins = principles.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="wrap min-h-[calc(100vh-66px)] flex flex-col justify-center py-16 relative">
        <Reveal className="kicker tracking-[0.42em] uppercase text-[11px] mb-[30px]">A living archive · est. 2026</Reveal>
        <Reveal as="h1">
          <span className="font-serif font-normal text-[clamp(56px,12vw,148px)] leading-[0.92] tracking-[-0.02em] block">MUTAZOLOGY</span>
        </Reveal>
        <Reveal className="font-serif italic font-light text-[clamp(19px,3vw,30px)] text-ink-dim mt-[26px]" >
          <span className="block mt-6">the study of a mind in progress.</span>
        </Reveal>
        <Reveal className="max-w-[520px] mt-[34px]">
          <p className="text-ink-dim text-base leading-[1.75] mt-8">
            Not a collection of answers. A record of a mind still forming — thoughts, reflections,
            observations and principles, kept honestly enough that the old ones are allowed to be wrong.
          </p>
        </Reveal>
        <Reveal className="flex gap-4 mt-11 flex-wrap">
          <Link className="btn btn-solid" href="/thoughts">Enter the archive</Link>
          <RandomButton />
        </Reveal>
        <div className="absolute bottom-6 left-7 text-[10px] tracking-[0.3em] uppercase text-ink-faint flex items-center gap-3">
          <span className="w-11 h-px bg-ink-faint" /> Scroll
        </div>
      </section>

      {/* FEATURED */}
      <section className="wrap py-[88px] border-t border-line-soft">
        <div className="flex items-baseline justify-between mb-11 flex-wrap gap-3.5">
          <Reveal as="h2"><span className="font-serif text-[clamp(28px,4vw,44px)]">Featured thought</span></Reveal>
          <Reveal className="font-mono text-xs text-accent">01</Reveal>
        </div>
        <Reveal>
          <Link href={`/thoughts/${featured.slug}`} className="block relative border border-line p-[clamp(34px,6vw,72px)] bg-gradient-to-b from-bg-soft to-bg">
            <div className="absolute top-6 font-serif text-[90px] text-line leading-none select-none" style={{ right: "2.1rem" }}>&ldquo;</div>
            <div className="font-serif font-light text-[clamp(24px,3.4vw,40px)] leading-[1.42] tracking-[-0.01em]"
              dangerouslySetInnerHTML={{ __html: featured.body.join("<br/>").replace(/\n/g, "<br/>") }} />
            <div className="mt-9 flex gap-5 items-center text-ink-faint text-xs tracking-[0.06em]">
              <MoodDot mood={featured.mood} /> <span>·</span> {featured.category} <span>·</span> {formatDate(featured.date)}
            </div>
          </Link>
        </Reveal>
      </section>

      {/* LATEST THOUGHTS */}
      <section className="wrap py-[88px] border-t border-line-soft">
        <SectionHead title="Latest thoughts" more="/thoughts" moreLabel="All thoughts →" />
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line-soft border border-line-soft">
            {latest.map((t) => <ThoughtCard key={t.slug} t={t} />)}
          </div>
        </Reveal>
      </section>

      {/* REFLECTIONS */}
      <section className="wrap py-[88px] border-t border-line-soft">
        <SectionHead title="Reflections" more="/reflections" moreLabel="All reflections →" />
        <Reveal>
          <div className="flex flex-col">
            {refs.map((r, i) => <ReflectionRow key={r.slug} r={r} index={i} />)}
          </div>
        </Reveal>
      </section>

      {/* OBSERVATIONS */}
      <section className="wrap py-[88px] border-t border-line-soft">
        <SectionHead title="Selected observations" more="/observations" moreLabel="All observations →" />
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {obs.map((o) => <ObservationCard key={o.slug} o={o} />)}
          </div>
        </Reveal>
      </section>

      {/* PRINCIPLES */}
      <section className="wrap py-[88px] border-t border-line-soft">
        <SectionHead title="Principles" more="/principles" moreLabel="All principles →" />
        <Reveal>
          <div className="flex flex-col gap-px bg-line-soft border border-line-soft">
            {prins.map((p) => <PrincipleRow key={p.number} p={p} />)}
          </div>
        </Reveal>
      </section>

      {/* STATS */}
      <section className="wrap py-[88px] border-t border-line-soft">
        <div className="flex items-baseline justify-between mb-11">
          <Reveal as="h2"><span className="font-serif text-[clamp(28px,4vw,44px)]">The archive in numbers</span></Reveal>
          <Reveal className="font-mono text-xs text-accent">Σ</Reveal>
        </div>
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-line-soft border border-line-soft">
            <Stat n={stats.thoughts} l="Thoughts" />
            <Stat n={stats.reflections} l="Reflections" />
            <Stat n={stats.observations} l="Observations" />
            <Stat n={stats.principles} l="Principles" />
            <Stat n={stats.years} l="Years documented" />
          </div>
        </Reveal>
      </section>
    </>
  );
}

function SectionHead({ title, more, moreLabel }: { title: string; more: string; moreLabel: string }) {
  return (
    <div className="flex items-baseline justify-between mb-11 flex-wrap gap-3.5">
      <Reveal as="h2"><span className="font-serif text-[clamp(28px,4vw,44px)]">{title}</span></Reveal>
      <Reveal>
        <Link href={more} className="text-xs tracking-[0.1em] uppercase text-ink-dim border-b border-line pb-1 transition-colors hover:text-ink hover:border-accent">
          {moreLabel}
        </Link>
      </Reveal>
    </div>
  );
}

function Stat({ n, l }: { n: number; l: string }) {
  return (
    <div className="bg-bg px-[26px] py-[38px]" style={{ padding: "38px 26px" }}>
      <div className="font-serif text-[clamp(36px,5vw,58px)] leading-none tracking-[-0.02em]">{n}</div>
      <div className="text-[11px] tracking-[0.16em] uppercase text-ink-faint mt-3.5">{l}</div>
    </div>
  );
}
