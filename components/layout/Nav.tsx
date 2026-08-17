"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearch } from "@/components/search/SearchProvider";

const LINKS = [
  { href: "/thoughts", label: "Thoughts" },
  { href: "/reflections", label: "Reflections" },
  { href: "/observations", label: "Observations" },
  { href: "/principles", label: "Principles" },
  { href: "/timeline", label: "Timeline" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const { open } = useSearch();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-[100] backdrop-blur-md transition-colors duration-500 ${
          scrolled ? "bg-bg/90 border-b border-line" : "bg-bg/70 border-b border-transparent"
        }`}
      >
        <div className="wrap flex items-center justify-between h-[66px]">
          <Link href="/" className="font-serif font-medium text-[19px] tracking-[0.14em]">
            <b className="text-ink">MUTAZ</b>OLOGY
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-[12.5px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                  isActive(l.href) ? "text-ink" : "text-ink-dim hover:text-ink"
                }`}
              >
                {l.label}
                {isActive(l.href) && (
                  <span className="absolute -bottom-1.5 inset-x-0 h-px bg-accent" />
                )}
              </Link>
            ))}
            <button
              onClick={open}
              className="flex items-center gap-2.5 text-xs text-ink-faint border border-line px-3 py-1.5 rounded-sm transition-colors hover:border-ink-faint hover:text-ink-dim"
            >
              Search
              <kbd className="font-mono text-[10px] border border-line px-1.5 py-px rounded-sm text-ink-faint">
                ⌘K
              </kbd>
            </button>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5"
            aria-label="Menu"
            onClick={() => setMobOpen((v) => !v)}
          >
            <span className="w-5 h-px bg-ink" />
            <span className="w-5 h-px bg-ink" />
            <span className="w-5 h-px bg-ink" />
          </button>
        </div>
      </nav>

      {mobOpen && (
        <div className="md:hidden fixed inset-x-0 top-[66px] bottom-0 z-[99] bg-bg px-7 py-10 flex flex-col gap-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-serif text-3xl py-3 border-b border-line-soft text-ink-dim"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => { setMobOpen(false); open(); }}
            className="font-serif text-3xl py-3 text-left text-ink-dim"
          >
            Search
          </button>
        </div>
      )}
    </>
  );
}
