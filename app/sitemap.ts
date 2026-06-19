import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://www.christophermeyer.dev",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.christophermeyer.dev/freelance",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
