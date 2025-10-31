import type { MetadataRoute } from "next";
import { getRoutes } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.edlinitiative.org";
  const routes = await getRoutes();
  const paths = ["/", ...routes.main.map((l) => l.href).filter((h) => h !== "/")];
  const unique = Array.from(new Set(paths));

  return unique.map((p) => ({ url: new URL(p, base).toString(), lastModified: new Date() }));
}
