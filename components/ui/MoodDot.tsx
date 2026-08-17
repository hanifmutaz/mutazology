import type { MoodName } from "@/types";
import { moodColor } from "@/lib/utils";

export default function MoodDot({ mood }: { mood: MoodName }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: moodColor(mood) }}
        aria-hidden
      />
      {mood}
    </span>
  );
}
