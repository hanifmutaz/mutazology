import type { Metadata } from "next";
import { getObservations } from "@/lib/queries";
import ObservationsExplorer from "@/components/content/ObservationsExplorer";

export const metadata: Metadata = {
  title: "Observations",
  description: "Notes on people, work, money, society and behaviour — more analytical than motivational.",
};

export default async function ObservationsPage() {
  const observations = await getObservations();
  return (
    <div className="wrap">
      <div className="pt-20 pb-10">
        <div className="font-mono text-xs text-accent tracking-[0.1em]" style={{ marginBottom: "18px" }}>/observations</div>
        <h1 className="font-serif font-light text-[clamp(36px,6vw,68px)] leading-[1.05] tracking-[-0.005em]">Observations</h1>
        <p className="text-ink-dim max-w-[520px] text-[15px]" style={{ marginTop: "22px" }}>
          Notes on people, work, money, society and behaviour. More analytical than motivational — closer to field notes than advice.
        </p>
      </div>
      <ObservationsExplorer observations={observations} />
    </div>
  );
}
