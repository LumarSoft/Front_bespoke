import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PortfolioView from "@/components/portfolio-view";
import { portfolios, type Portfolio } from "@/lib/content";

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
  return {
    title: `Proyectos ${portfolio.label}`,
    description: portfolio.intro,
    openGraph: {
      title: `Proyectos ${portfolio.label} · Bespoke Arquitectura`,
      description: portfolio.intro,
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
      <Navbar />
      <main>
        <PortfolioView portfolio={portfolios[categoria]} />
      </main>
      <Footer />
    </>
  );
}
