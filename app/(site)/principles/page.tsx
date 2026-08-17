import type { Metadata } from "next";
import { getPrinciples } from "@/lib/queries";
import PrincipleRow from "@/components/content/PrincipleRow";

export const metadata: Metadata = {
  title: "Principles",
  description: "Rules earned, not inherited — lessons compressed into single lines.",
};

export default async function PrinciplesPage() {
  const principles = await getPrinciples();
  return (
    <div className="wrap">
      <div className="pt-20 pb-10">
        <div className="font-mono text-xs text-accent tracking-[0.1em]" style={{ marginBottom: "18px" }}>/principles</div>
        <h1 className="font-serif font-light text-[clamp(36px,6vw,68px)] leading-[1.05] tracking-[-0.005em]">Principles</h1>
        <p className="text-ink-dim max-w-[520px] text-[15px]" style={{ marginTop: "22px" }}>
          Rules earned, not inherited. Each one is a lesson compressed into a single line I try not to forget.
        </p>
      </div>
      <div className="flex flex-col gap-px bg-line-soft border border-line-soft mt-5">
        {principles.map((p) => <PrincipleRow key={p.number} p={p} />)}
      </div>
    </div>
  );
}
