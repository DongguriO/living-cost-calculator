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
    {
      url: "https://living-cost-calculator.vercel.app/travel-cost",
      lastModified: new Date(),
    },
    {
      url: "https://living-cost-calculator.vercel.app/rent-vs-jeonse",
      lastModified: new Date(),
    },
    {
      url: "https://living-cost-calculator.vercel.app/car-purchase-cost",
      lastModified: new Date(),
    },
    {
      url: "https://living-cost-calculator.vercel.app/wedding-cost",
      lastModified: new Date(),
    },
    {
      url: "https://living-cost-calculator.vercel.app/childcare-cost",
      lastModified: new Date(),
    },
    {
      url: "https://living-cost-calculator.vercel.app/privacy",
      lastModified: new Date(),
    },
    {
      url: "https://living-cost-calculator.vercel.app/contact",
      lastModified: new Date(),
    },
  ];
}