"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { logo, media, studio } from "@/lib/content";
import BackgroundVideo from "@/components/ui/background-video";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero: el logo real sobre video de fondo en loop.
 *
 * Fusiona los dos heroes que convivían en el proyecto — el del logo (que
 * dependía de una capa WebGL sólo para tener fondo oscuro) y el de la foto
 * día/noche. El video cumple las dos funciones a la vez y responde al pedido
 * de "video de fondo o reproducción continua".
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

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        className="eyebrow relative mx-auto text-paper/70"
      >
        Estudio de arquitectura · {studio.location}
      </motion.p>

      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          className="w-full max-w-3xl px-6"
        >
          {/* Versión negativa: el hero es fondo oscuro (manual, pág. 13). */}
          <Image
            src={logo.negativa.src}
            alt={logo.alt}
            width={logo.negativa.width}
            height={logo.negativa.height}
            priority
            sizes="(max-width: 768px) 90vw, 48rem"
            className="h-auto w-full"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.75 }}
          className="mt-10 max-w-xl font-display text-xl font-light text-paper/80 md:text-2xl"
        >
          Cada detalle, una <span className="type-emphasis text-clay-soft">decisión</span> de
          diseño.
        </motion.p>
      </div>

      <motion.a
        href="#estudio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1 }}
        className="group relative mx-auto flex flex-col items-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-paper/60 transition-colors hover:text-paper"
      >
        <span>Scroll</span>
        <span className="grid size-10 place-items-center rounded-full border border-paper/25 transition-colors group-hover:border-paper/60">
          <ArrowDown className="size-4" />
        </span>
      </motion.a>
    </section>
  );
}
