import type { MetadataRoute } from "next";

// Pre-launch: block all crawlers from the entire site.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
