import type { MetadataRoute } from "next";
import { portfolioList } from "@/lib/content";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

/**
 * Sitemap. Dos detalles que importan:
 *
 * 1. La home va como `SITE_URL` **sin** barra final, que es exactamente lo que
 *    emite la canónica del metadata. Si el sitemap declara una variante y la
 *    canónica otra, Google tiene que elegir cuál es la buena y se pierde señal.
 *    Verificado sobre el HTML servido, no asumido.
 *
 * 2. Cada URL declara sus imágenes (extensión de sitemap de Google). En un
 *    estudio de arquitectura la búsqueda por imágenes es una puerta de entrada
 *    real, y sin esto Google tiene que descubrirlas sola.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}${OG_IMAGE.url}`],
    },
    ...portfolioList.map((portfolio) => ({
      url: `${SITE_URL}/proyectos/${portfolio.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      // Todas las fotos de todas las obras del portfolio: en arquitectura la
      // búsqueda por imágenes es una puerta de entrada real, y desde que las
      // galerías viven dentro de un diálogo, el sitemap es la única forma que
      // tiene Google de descubrirlas.
      images: portfolio.proyectos.flatMap((obra) =>
        obra.gallery.map((foto) => `${SITE_URL}${foto.src}`),
      ),
    })),
  ];
}
