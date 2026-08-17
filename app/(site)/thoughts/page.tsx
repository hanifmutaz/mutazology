import type { Metadata } from "next";
import { getThoughts } from "@/lib/queries";
import ThoughtsExplorer from "@/components/content/ThoughtsExplorer";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Short-form fragments — the raw material of the archive.",
};

export default async function ThoughtsPage() {
  const thoughts = await getThoughts();
  return (
    <div className="wrap">
      <div className="pt-20 pb-10">
        <div className="font-mono text-xs text-accent tracking-[0.1em] mb-[18px]" style={{ marginBottom: "18px" }}>/thoughts</div>
        <h1 className="font-serif font-light text-[clamp(36px,6vw,68px)] leading-[1.05] tracking-[-0.005em]">Thoughts</h1>
        <p className="text-ink-dim max-w-[520px] mt-[22px] text-[15px]" style={{ marginTop: "22px" }}>
          Short-form fragments. The raw material of the archive — caught before they hardened into anything final.
        </p>
      </div>
      <ThoughtsExplorer thoughts={thoughts} />
    </div>
  );
}
