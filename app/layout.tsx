import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import { GEO, OG_IMAGE, SITE_URL } from "@/lib/site";
import { siteJsonLd } from "@/lib/structured-data";

/**
 * Tipografía primaria de la marca (manual, pág. 16). Es la misma familia del
 * logotipo, así que todo el sitio y la marca hablan el mismo idioma.
 *
 * La secundaria del manual es Aptos (pág. 17), pero es una fuente de Microsoft
 * y no se distribuye como webfont — no está en Google Fonts. Si el cliente la
 * quiere garantizada para todos, hay que licenciarla y auto-hostearla.
 *
 * Se usa la versión VARIABLE (sin `weight`): un archivo cubre todos los pesos
 * de 100 a 900 de forma continua. Antes se declaraban pesos fijos, y como el
 * sitio usa cinco pesos en redonda y cursiva, next/font emitía y precargaba
 * diez archivos: unos 190 KB de tipografía peleando ancho de banda con la
 * imagen del LCP. La variable son dos archivos, ~78 KB en total, y además
 * habilita cualquier peso intermedio si el diseño lo pide más adelante.
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

/**
  * Metadata del sitio. El dominio vive en lib/site.ts — ver el TODO ahí.
  *
  * Criterio del título: en este rubro la búsqueda es local. Nadie busca
  * "Bespoke" salvo quien ya conoce el estudio; se busca "estudio de
  * arquitectura en Rosario". El título lleva marca + qué es + dónde, que es
  * exactamente el patrón que usan los estudios de Rosario que hoy rankean.
  * El anterior ("Bespoke Arquitectura — Arquitectura hecha a medida") no tenía
  * la ciudad, así que competía sólo por marca.
  *
  * `keywords` ya no lo usa Google desde hace años; se deja acotado porque
  * algunos buscadores menores y agregadores todavía lo leen, sin inflarlo.
  */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Bespoke Arquitectura | Estudio de arquitectura en ${GEO.city}`,
    template: "%s · Bespoke Arquitectura",
  },
  description:
    `Estudio de arquitectura en ${GEO.city} dirigido por la Arq. Cintia Colazzo. ` +
    "Diseño, gestión y dirección de obra a medida en proyectos residenciales y comerciales.",
  applicationName: "Bespoke Arquitectura",
  authors: [{ name: "Bespoke Arquitectura", url: SITE_URL }],
  creator: "Bespoke Arquitectura",
  publisher: "Bespoke Arquitectura",
  category: "Arquitectura",
  keywords: [
    "estudio de arquitectura Rosario",
    "arquitectos Rosario",
    "diseño arquitectónico Rosario",
    "dirección de obra Rosario",
    "arquitectura residencial Rosario",
    "arquitectura comercial Rosario",
    "casas a medida",
    "Cintia Colazzo",
    "Bespoke Arquitectura",
  ],
  // Canónica de la home. Las páginas de portfolio heredan el patrón desde su
  // propio `generateMetadata`.
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bespoke Arquitectura",
    description: "Arquitectura hecha a medida. Rosario, Argentina.",
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Bespoke Arquitectura",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Bespoke Arquitectura | Estudio de arquitectura en ${GEO.city}`,
    description: "Arquitectura hecha a medida. Rosario, Argentina.",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Sin esto Google recorta la vista previa de imagen, y en un estudio de
      // arquitectura la imagen ES el argumento de venta en el resultado.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  /**
   * Señales de localidad. No son un factor de ranking fuerte por sí mismas,
   * pero refuerzan la coherencia geográfica del sitio junto con el JSON-LD y
   * la ficha de Google.
   */
  other: {
    "geo.region": GEO.regionCode,
    "geo.placename": GEO.city,
  },
};

export const viewport: Viewport = {
  // El sitio abre en negro: sin esto, en mobile la barra del navegador queda
  // blanca y corta la puesta en escena del hero.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2ef" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-surface text-on-surface">
        {/*
          Datos estructurados del estudio. Van una sola vez, en el layout, para
          que valgan en todas las rutas. `JSON.stringify` acá es seguro: el
          objeto es literal y no incluye nada que venga del usuario.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <div className="grain" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
