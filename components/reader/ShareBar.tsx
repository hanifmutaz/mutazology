"use client";

import { useState } from "react";

export default function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const url = () => (typeof window !== "undefined" ? window.location.href : "");
  const text = encodeURIComponent(`${title} — MUTAZOLOGY`);

  const links: Record<string, () => string> = {
    "𝕏": () => `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url())}`,
    "✆": () => `https://wa.me/?text=${text}%20${encodeURIComponent(url())}`,
    "in": () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`,
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { /* no-op */ }
  };

  return (
    <div className="flex gap-3 mt-10 items-center">
      <span className="text-[10px] tracking-[0.2em] uppercase text-ink-faint">Share</span>
      {Object.entries(links).map(([label, href]) => (
        <a
          key={label}
          href={href()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[34px] h-[34px] border border-line rounded-sm text-xs text-ink-dim flex items-center justify-center transition-colors hover:border-accent hover:text-accent"
          aria-label={`Share on ${label}`}
        >
          {label}
        </a>
      ))}
      <button
        onClick={copy}
        className="w-[34px] h-[34px] border border-line rounded-sm text-xs text-ink-dim flex items-center justify-center transition-colors hover:border-accent hover:text-accent"
        aria-label="Copy link"
      >
        {copied ? "✓" : "⧉"}
      </button>
    </div>
  );
}
