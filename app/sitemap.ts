import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://머니머니사이트주소.com",
      lastModified: new Date(),
    },
    {
      url: "https://머니머니사이트주소.com/living-cost",
      lastModified: new Date(),
    },
    {
      url: "https://머니머니사이트주소.com/car-cost",
      lastModified: new Date(),
    },
    {
      url: "https://머니머니사이트주소.com/moving-cost",
      lastModified: new Date(),
    },
  ];
}