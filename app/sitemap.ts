import type { MetadataRoute } from "next";
import { getThoughts, getReflections, getPrinciples } from "@/lib/queries";
import { SITE } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const [thoughts, reflections, principles] = await Promise.all([
    getThoughts(), getReflections(), getPrinciples(),
  ]);

  const staticRoutes = ["", "/thoughts", "/reflections", "/observations", "/principles", "/timeline"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const dynamicRoutes = [
    ...thoughts.map((t) => ({ url: `${base}/thoughts/${t.slug}`, lastModified: new Date(t.date) })),
    ...reflections.map((r) => ({ url: `${base}/reflections/${r.slug}`, lastModified: new Date(r.date) })),
    ...principles.map((p) => ({ url: `${base}/principles/${p.number}`, lastModified: new Date(p.date) })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
