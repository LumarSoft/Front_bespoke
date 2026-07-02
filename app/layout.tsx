import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import WebGLCanvas from "@/components/WebGLCanvas";
import Cursor from "@/components/ui/Cursor";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bespoke — Arquitectura a medida",
  description:
    "Bespoke arquitectura es un estudio independiente especializado en el diseño, la gestión y la dirección de proyectos residenciales y comerciales de diferentes escalas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-hueso text-noir">
        <Preloader />
        <WebGLCanvas />
        <Cursor />
        <Header />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
