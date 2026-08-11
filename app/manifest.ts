import type { MetadataRoute } from "next";
import { GEO } from "@/lib/site";

/**
 * Manifest. No es SEO en sentido estricto, pero es uno de los chequeos de
 * Lighthouse y define cómo se ve el sitio cuando alguien lo guarda en la
 * pantalla de inicio del teléfono.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Bespoke Arquitectura — Estudio de arquitectura en ${GEO.city}`,
    short_name: "Bespoke",
    description:
      "Arquitectura hecha a medida. Diseño, gestión y dirección de obra en Rosario.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "es-AR",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
