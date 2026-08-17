import Link from "next/link";
import type { Principle } from "@/types";
import { formatDate } from "@/lib/utils";

export default function PrincipleRow({ p }: { p: Principle }) {
  return (
    <Link
      href={`/principles/${p.number}`}
      className="group bg-bg hover:bg-bg-soft transition-colors duration-300 px-6 md:px-8 py-7 grid grid-cols-[70px_1fr] md:grid-cols-[120px_1fr] gap-5 md:gap-8 items-center"
    >
      <div className="font-serif text-3xl md:text-[44px] leading-none text-accent-dim/25 group-hover:text-accent transition-colors">
        #{String(p.number).padStart(2, "0")}
      </div>
      <div>
        <div className="font-serif text-[clamp(18px,2.2vw,24px)] leading-snug">{p.statement}</div>
        <div className="mt-2.5 text-[11px] text-ink-faint tracking-[0.05em]">
          {p.category} · {formatDate(p.date)}
        </div>
      </div>
    </Link>
  );
}
