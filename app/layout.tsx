import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

/**
 * Tipografía primaria de la marca (manual, pág. 16). Es la misma familia del
 * logotipo, así que todo el sitio y la marca hablan el mismo idioma.
 *
 * La secundaria del manual es Aptos (pág. 17), pero es una fuente de Microsoft
 * y no se distribuye como webfont — no está en Google Fonts. Va declarada como
 * primera opción de la pila del `body` en globals.css: quien la tenga instalada
 * (Microsoft 365) la usa, el resto cae en Montserrat. Si el cliente la quiere
 * garantizada para todos, hay que licenciarla y auto-hostearla.
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  // TODO(cliente): el email nuevo es @bespokearquitectura.com.ar pero el sitio
  // apunta a arquitecturabespoke.ar. Falta confirmar cuál es el dominio final;
  // de eso depende este metadataBase y las URLs canónicas.
  metadataBase: new URL("https://arquitecturabespoke.ar"),
  title: {
    default: "Bespoke Arquitectura — Arquitectura hecha a medida",
    template: "%s · Bespoke Arquitectura",
  },
  description:
    "Estudio de arquitectura de la Arq. Cintia Colazzo en Rosario. Diseño, gestión y dirección de obra a medida, con obsesión por el detalle.",
  keywords: [
    "arquitectura",
    "estudio de arquitectura",
    "Rosario",
    "diseño a medida",
    "Bespoke",
    "Cintia Colazzo",
  ],
  openGraph: {
    title: "Bespoke Arquitectura",
    description: "Arquitectura hecha a medida. Rosario, Argentina.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-surface text-on-surface">
        <div className="grain" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
