import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
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
    >
      <body className="min-h-full bg-bone text-ink">
        <div className="grain" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
