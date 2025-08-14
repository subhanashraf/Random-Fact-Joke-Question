import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboardqwertyuiop/", "/api/"],
      },
    ],
    sitemap: "https://randomgenerator.com/sitemap.xml",
  }
}
