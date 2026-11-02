import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/root", "/api/"],
      },
    ],
    sitemap: "https://pragata.co.id/sitemap.xml",
  };
}
