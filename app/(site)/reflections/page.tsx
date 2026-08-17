import type { Metadata } from "next";
import { getReflections } from "@/lib/queries";
import ReflectionRow from "@/components/content/ReflectionRow";

export const metadata: Metadata = {
  title: "Reflections",
  description: "Long-form writing — a single idea given room to breathe.",
};

export default async function ReflectionsPage() {
  const reflections = await getReflections();
  return (
    <div className="wrap">
      <div className="pt-20 pb-10">
        <div className="font-mono text-xs text-accent tracking-[0.1em]" style={{ marginBottom: "18px" }}>/reflections</div>
        <h1 className="font-serif text-[clamp(40px,7vw,84px)] leading-[0.95] tracking-[-0.02em]">Reflections</h1>
        <p className="text-ink-dim max-w-[520px] text-[15px]" style={{ marginTop: "22px" }}>
          Long-form writing. Where a single idea is given room to breathe, argue with itself, and arrive somewhere.
        </p>
      </div>
      <div className="flex flex-col mt-5">
        {reflections.map((r, i) => <ReflectionRow key={r.slug} r={r} index={i} />)}
      </div>
    </div>
  );
}
