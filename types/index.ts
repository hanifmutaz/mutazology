// ---------------------------------------------------------------------------
// MUTAZOLOGY — domain types
// ---------------------------------------------------------------------------

export type ContentStatus = "draft" | "published" | "archived" | "scheduled";
export type ContentKind = "thought" | "reflection" | "observation" | "principle";

export type MoodName =
  | "Dark" | "Calm" | "Bitter" | "Hopeful" | "Restless"
  | "Nostalgic" | "Rational" | "Uncertain" | "Reflective" | "Cynical";

export interface EvolutionStep {
  year: string;
  text: string;
  now?: boolean;
}

export interface Thought {
  slug: string;
  title: string;
  category: string;
  mood: MoodName;
  date: string;          // ISO
  featured: boolean;
  tags: string[];
  views: number;
  /** Each entry is a stanza; \n inside becomes a soft line break. */
  body: string[];
  evolution?: EvolutionStep[];
}

export type ReflectionBlock =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string };

export interface Reflection {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  mood: MoodName;
  date: string;
  readingTime: string;   // e.g. "6 min"
  tags: string[];
  body: ReflectionBlock[];
}

export interface Observation {
  slug: string;
  category: string;
  mood: MoodName;
  text: string;
  date: string;
}

export interface Principle {
  number: number;
  slug: string;
  title: string;
  statement: string;
  explanation: string;
  category: string;
  date: string;
  tags: string[];
}

export interface SearchResult {
  type: "Thought" | "Reflection" | "Observation" | "Principle";
  title: string;
  excerpt: string;
  href: string;
}

export interface TimelineItem {
  type: SearchResult["type"];
  title: string;
  date: string;
  href: string;
}

export const MOOD_COLORS: Record<MoodName, string> = {
  Dark: "#6c5b7b",
  Calm: "#5b7b6c",
  Bitter: "#7b5b5b",
  Hopeful: "#c9a86a",
  Restless: "#9b7b4a",
  Nostalgic: "#7b6a5b",
  Rational: "#5b6a7b",
  Uncertain: "#6b6862",
  Reflective: "#7b7b8a",
  Cynical: "#5a5a5a",
};

export const CATEGORIES = [
  "Life", "Self", "People", "Relationships", "Ambition", "Failure",
  "Success", "Money", "Work", "Career", "Growth", "Time",
  "Discipline", "Philosophy", "Society", "Technology",
] as const;
