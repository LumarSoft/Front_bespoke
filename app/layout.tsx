import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Fraunces: serif editorial con "soft" opsz — evoca el oficio/sastrería de "bespoke".
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
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
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bone text-ink">
        <div className="grain" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
