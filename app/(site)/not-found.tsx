import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap min-h-[70vh] flex flex-col justify-center">
      <div className="font-serif text-[clamp(60px,14vw,140px)] text-line leading-none">404</div>
      <div className="font-serif italic text-2xl md:text-[26px] text-ink-dim mt-2.5">
        This thought does not exist yet.
      </div>
      <Link href="/" className="btn w-fit mt-[34px]" style={{ marginTop: "34px" }}>← Return to the archive</Link>
    </div>
  );
}
