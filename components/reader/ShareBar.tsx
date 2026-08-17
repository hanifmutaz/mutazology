"use client";

import { useState } from "react";

type Props = {
  title: string;
  /** Short quote/excerpt shown inside the WhatsApp message preview. */
  excerpt?: string;
  /** "Thought" | "Reflection" | "Principle" — shown as a small label. */
  kind?: string;
  category?: string;
};

export default function ShareBar({ title, excerpt, kind = "Thought", category }: Props) {
  const [copied, setCopied] = useState(false);

  const url = () => (typeof window !== "undefined" ? window.location.href : "");

  /** Editorial-style WhatsApp message: title, quote, source line, link. */
  const waMessage = () => {
    const lines = [
      `📖 *${title}*`,
      excerpt ? `_"${excerpt}"_` : null,
      "",
      `${kind}${category ? ` · ${category}` : ""} — *MUTAZOLOGY*`,
      "_the study of a mind in progress._",
      "",
      "Baca selengkapnya di:",
      url(),
    ].filter((l): l is string => l !== null);
    return lines.join("\n");
  };

  const text = encodeURIComponent(`${title} — MUTAZOLOGY`);

  const links: Record<string, () => string> = {
    "𝕏": () => `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url())}`,
    in: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`,
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className="mt-10">
      <span className="text-[10px] tracking-[0.2em] uppercase text-ink-faint block mb-3.5">Share</span>
      <div className="flex flex-wrap gap-3 items-center">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(waMessage())}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 h-[38px] pl-3.5 pr-4 border border-line rounded-sm
                     text-[12px] tracking-[0.04em] text-ink-dim transition-all duration-300
                     hover:border-accent hover:text-accent hover:-translate-y-0.5"
          aria-label="Share to WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.94.544 3.816 1.575 5.442L2 22l4.66-1.554A9.958 9.958 0 0 0 12.004 22C17.522 22 22 17.514 22 12.004 22 6.486 17.522 2 12.004 2zm0 18.11a8.09 8.09 0 0 1-4.132-1.13l-.296-.176-2.766.922.93-2.696-.192-.277a8.087 8.087 0 0 1-1.24-4.349c0-4.47 3.638-8.108 8.104-8.108 4.466 0 8.104 3.637 8.104 8.108 0 4.47-3.638 8.106-8.108 8.106z" />
          </svg>
          Share to WhatsApp
        </a>

        {Object.entries(links).map(([label, href]) => (
          <a
            key={label}
            href={href()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[38px] h-[38px] border border-line rounded-sm text-xs text-ink-dim flex items-center justify-center transition-colors hover:border-accent hover:text-accent"
            aria-label={`Share on ${label}`}
          >
            {label}
          </a>
        ))}

        <button
          onClick={copy}
          className="w-[38px] h-[38px] border border-line rounded-sm text-xs text-ink-dim flex items-center justify-center transition-colors hover:border-accent hover:text-accent"
          aria-label="Copy link"
        >
          {copied ? "✓" : "⧉"}
        </button>
      </div>
    </div>
  );
}
