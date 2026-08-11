import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PortfolioView from "@/components/portfolio-view";
import { portfolios, type Portfolio } from "@/lib/content";
import { GEO } from "@/lib/site";
import { portfolioJsonLd } from "@/lib/structured-data";

/**
 * Una sola página sirve a los dos portfolios. Lo único que cambia entre
 * Residencial y Comercial es la data y la clave de paleta (`theme`), que se
 * aplica con `data-portfolio` sobre el contenedor — ver globals.css.
 */

export function generateStaticParams() {
  return Object.keys(portfolios).map((categoria) => ({ categoria }));
}

// Cualquier slug fuera de residencial/comercial es 404.
export const dynamicParams = false;

function isPortfolioSlug(value: string): value is Portfolio["slug"] {
  return Object.hasOwn(portfolios, value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  if (!isPortfolioSlug(categoria)) return {};

  const portfolio = portfolios[categoria];

  /**
   * El título lleva el tipo de arquitectura y la ciudad, porque es así como se
   * busca: "arquitectura residencial Rosario", no "portfolio residencial".
   * Cada portfolio compite por su propio término y no contra la home.
   */
  const title = `Arquitectura ${portfolio.label.toLowerCase()} en ${GEO.city}`;
  const description = `${portfolio.intro} Obras del estudio Bespoke Arquitectura en ${GEO.city} y la región.`;

  return {
    title,
    description,
    alternates: { canonical: `/proyectos/${portfolio.slug}` },
    openGraph: {
      title: `${title} · Bespoke Arquitectura`,
      description,
      type: "website",
      locale: "es_AR",
      url: `/proyectos/${portfolio.slug}`,
      images: [
        {
          url: portfolio.cover.src,
          width: 1280,
          height: 720,
          alt: portfolio.cover.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Bespoke Arquitectura`,
      description,
      images: [portfolio.cover.src],
    },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  if (!isPortfolioSlug(categoria)) notFound();

  return (
    <>
      {/*
        Grafo de la colección: la página, su miga de pan y las obras como
        `CreativeWork`. Es lo que le da a Google una lista enumerable de obras
        con año, lugar y foto, en lugar de una galería de imágenes sueltas.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioJsonLd(categoria)),
        }}
      />
      <Navbar />
      <main>
        <PortfolioView portfolio={portfolios[categoria]} />
      </main>
      <Footer />
    </>
  );
}
