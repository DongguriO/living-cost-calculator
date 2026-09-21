import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://living-cost-calculator.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://living-cost-calculator.vercel.app/living-cost",
      lastModified: new Date(),
    },
    {
      url: "https://living-cost-calculator.vercel.app/car-cost",
      lastModified: new Date(),
    },
    {
      url: "https://living-cost-calculator.vercel.app/moving-cost",
      lastModified: new Date(),
    },
  ];
}