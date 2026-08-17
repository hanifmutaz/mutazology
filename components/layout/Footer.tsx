import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line pt-[70px] pb-[50px] mt-10">
      <div className="wrap">
        <div className="flex justify-between items-end flex-wrap gap-8">
          <div>
            <div className="font-serif text-[40px] tracking-[0.06em]">
              <b>MUTAZ</b>OLOGY
            </div>
            <p className="font-serif italic text-ink-dim max-w-[360px] text-base leading-relaxed mt-3.5">
              &ldquo;I am not documenting what I know. I am documenting what I am becoming.&rdquo;
            </p>
          </div>

          <div className="flex gap-[70px] flex-wrap text-xs text-ink-faint leading-[2.1] tracking-[0.04em]">
            <div>
              <div className="text-ink-dim mb-2.5 tracking-[0.18em] uppercase text-[10px]">Archive</div>
              <Link href="/thoughts" className="block hover:text-accent">Thoughts</Link>
              <Link href="/reflections" className="block hover:text-accent">Reflections</Link>
              <Link href="/observations" className="block hover:text-accent">Observations</Link>
              <Link href="/principles" className="block hover:text-accent">Principles</Link>
              <Link href="/timeline" className="block hover:text-accent">Timeline</Link>
            </div>
            <div>
              <div className="text-ink-dim mb-2.5 tracking-[0.18em] uppercase text-[10px]">More</div>
              <Link href="/admin" className="block hover:text-accent">Admin</Link>
              <a href="/sitemap.xml" className="block hover:text-accent">Sitemap</a>
            </div>
          </div>
        </div>

        <div className="mt-[50px] pt-6 border-t border-line-soft flex justify-between text-[11px] text-ink-faint tracking-[0.06em] flex-wrap gap-2.5">
          <span>© {new Date().getFullYear()} Mutaz — mutazology.com</span>
          <span>the study of a mind in progress.</span>
        </div>
      </div>
    </footer>
  );
}
