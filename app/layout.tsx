import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arquitecturabespoke.ar"),
  title: {
    default: "Bespoke Arquitectura — Estudio de arquitectura y construcción",
    template: "%s · Bespoke Arquitectura",
  },
  description:
    "Estudio independiente especializado en el diseño, la gestión y la dirección de proyectos residenciales y comerciales. Arquitectura hecha a medida.",
  keywords: [
    "arquitectura",
    "estudio de arquitectura",
    "diseño",
    "dirección de obra",
    "Rosario",
    "Bespoke",
  ],
  openGraph: {
    title: "Bespoke Arquitectura",
    description:
      "Arquitectura exclusiva, completamente única, diseñada especialmente.",
    locale: "es_AR",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        {children}
      </body>
    </html>
  );
}
