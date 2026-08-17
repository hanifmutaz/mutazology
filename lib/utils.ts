import type { MoodName } from "@/types";
import { MOOD_COLORS } from "@/types";

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export function monthName(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { month: "long" });
}

export function moodColor(mood: MoodName): string {
  return MOOD_COLORS[mood] ?? "#6b6862";
}

export function excerpt(s: string, n = 120): string {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

/** Render a seed body stanza: escape nothing (trusted seed) but convert \n. */
export function stanzaToHtml(s: string): string {
  return s.replace(/\n/g, "<br/>");
}

export const SITE = {
  name: "MUTAZOLOGY",
  tagline: "the study of a mind in progress.",
  author: "Mutaz",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mutazology.com",
};
