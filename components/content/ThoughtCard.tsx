import Link from "next/link";
import type { Thought } from "@/types";
import { formatDate, excerpt } from "@/lib/utils";
import MoodDot from "@/components/ui/MoodDot";

export default function ThoughtCard({ t }: { t: Thought }) {
  return (
    <Link
      href={`/thoughts/${t.slug}`}
      className="group bg-bg hover:bg-bg-soft transition-colors duration-300 p-8 flex flex-col min-h-[230px]"
    >
      <div className="text-[10.5px] tracking-[0.2em] uppercase text-accent-dim mb-4">{t.category}</div>
      <h3 className="font-serif text-[19px] leading-tight mb-3">{t.title}</h3>
      <p className="text-ink-dim text-[14.5px] leading-relaxed flex-1">{excerpt(t.body.join(" "))}</p>
      <div className="flex justify-between items-center mt-[22px] text-[11px] text-ink-faint tracking-[0.05em]">
        <MoodDot mood={t.mood} />
        <span>{formatDate(t.date)}</span>
      </div>
    </Link>
  );
}
