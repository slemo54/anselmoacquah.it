import type { MetadataRoute } from "next";
import { Site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: Site.canonical,
      lastModified: new Date("2026-09-13"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
