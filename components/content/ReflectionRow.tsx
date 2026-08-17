import Link from "next/link";
import type { Reflection } from "@/types";
import { formatDate } from "@/lib/utils";
import MoodDot from "@/components/ui/MoodDot";

export default function ReflectionRow({ r, index }: { r: Reflection; index: number }) {
  return (
    <Link
      href={`/reflections/${r.slug}`}
      className="group grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-6 items-center py-[30px] border-b border-line-soft transition-all hover:pl-3"
    >
      <div className="font-mono text-xs text-ink-faint">{String(index + 1).padStart(2, "0")}</div>
      <div>
        <h3 className="font-serif text-[clamp(20px,2.4vw,28px)] leading-tight transition-colors group-hover:text-accent">
          {r.title}
        </h3>
        <div className="text-ink-dim text-sm mt-1.5">{r.subtitle}</div>
        <div className="mt-2.5 text-[11px] text-ink-faint tracking-[0.05em] flex items-center gap-2">
          <MoodDot mood={r.mood} /> · {r.category} · {formatDate(r.date)}
        </div>
      </div>
      <div className="hidden md:block text-[11px] text-ink-faint tracking-[0.06em] whitespace-nowrap">
        {r.readingTime} read
      </div>
    </Link>
  );
}
