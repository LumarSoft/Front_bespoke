import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Las rutas internas de Next no aportan nada al índice y consumen
      // presupuesto de rastreo.
      { userAgent: "*", disallow: ["/_next/static/chunks/", "/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
