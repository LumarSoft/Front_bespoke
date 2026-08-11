import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { logo, media, studio } from "@/lib/content";
import BackgroundVideo from "@/components/ui/background-video";

/**
 * Hero: el logo real sobre video de fondo en loop.
 *
 * Fusiona los dos heroes que convivían en el proyecto — el del logo (que
 * dependía de una capa WebGL sólo para tener fondo oscuro) y el de la foto
 * día/noche. El video cumple las dos funciones a la vez y responde al pedido
 * de "video de fondo o reproducción continua".
 *
 * No lleva `"use client"`: las animaciones de entrada son CSS (ver la sección
 * "Entrada del hero" en globals.css), así que la portada se pinta sin esperar
 * a que hidrate React. Lo único cliente acá adentro es el video de fondo, que
 * tiene su propia frontera.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink px-6 pb-14 pt-36 text-paper md:px-10"
    >
      <BackgroundVideo
        src={media.heroVideo.src}
        poster={media.heroVideo.poster}
        objectPosition={media.heroVideo.objectPosition}
        priority
        className="opacity-60"
      />

      {/* Velos de legibilidad: el logo es blanco y necesita fondo oscuro. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink"
      />

      <p className="eyebrow hero-rise hero-d1 relative mx-auto text-paper/70">
        Estudio de arquitectura · {studio.location}
      </p>

      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        {/*
          El logo ES el H1 de la home. Antes el hero no tenía ningún encabezado
          —sólo la imagen y un párrafo—, así que la página entraba sin H1 y la
          jerarquía arrancaba en los H2 de las secciones.

          El texto del H1 va en un `sr-only` (buscadores y lectores de pantalla)
          y la imagen queda decorativa con `alt=""`, para que el nombre del
          estudio no se anuncie dos veces.
        */}
        <h1 className="hero-wipe w-full max-w-3xl px-6">
          <span className="sr-only">
            {studio.full} — {studio.tagline} en Rosario
          </span>
          {/*
            Este logo es el elemento LCP de la home: es lo más grande que se
            pinta arriba del pliegue. Por eso lleva `preload` (mete un
            <link rel="preload"> en el head) y `fetchPriority="high"`.

            OJO: en Next 16 el prop `priority` está deprecado. Acá estaba puesto
            y no alcanzaba — Lighthouse marcaba "fetchpriority=high should be
            applied to the image preload request" porque `priority` ya no emite
            esa señal.

            `quality={90}`: el logotipo es line-art con bordes netos, y al 75 la
            compresión AVIF le come filo a las curvas de la B a tamaño grande.
          */}
          <Image
            src={logo.negativa.src}
            alt=""
            aria-hidden
            width={logo.negativa.width}
            height={logo.negativa.height}
            preload
            fetchPriority="high"
            quality={90}
            sizes="(max-width: 768px) 90vw, 48rem"
            className="h-auto w-full"
          />
        </h1>

        <p className="hero-rise hero-d2 mt-10 max-w-xl font-display text-xl font-light text-paper/80 md:text-2xl">
          Cada detalle, una <span className="type-emphasis text-clay-soft">decisión</span> de
          diseño.
        </p>
      </div>

      <a
        href="#estudio"
        className="group hero-fade hero-d3 relative mx-auto flex flex-col items-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-paper/60 transition-colors hover:text-paper"
      >
        <span>Scroll</span>
        <span className="grid size-10 place-items-center rounded-full border border-paper/25 transition-colors group-hover:border-paper/60">
          <ArrowDown className="size-4" />
        </span>
      </a>
    </section>
  );
}
