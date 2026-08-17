"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="wrap min-h-[70vh] flex flex-col justify-center">
      <div className="font-serif text-[clamp(48px,10vw,90px)] text-line leading-none">Something broke.</div>
      <p className="font-serif italic text-xl text-ink-dim mt-4">
        Even a mind in progress stumbles sometimes.
      </p>
      <div className="flex gap-4 mt-8">
        <button onClick={reset} className="btn btn-solid">Try again</button>
        <Link href="/" className="btn">Back to the archive</Link>
      </div>
    </div>
  );
}
