"use client";

import DraftingFrame from "@/components/ui/DraftingFrame";
import { useSplitReveal } from "@/hooks/useSplitReveal";
import { useScrollVideo } from "@/hooks/useScrollVideo";

/**
 * Un video real de una obra en construcción, scrubeado cuadro a cuadro con
 * el scroll (misma técnica que Apple usa con canvas + sprite sheet, acá con
 * <video> directo). Momento literal que acompaña al volumen procedural de
 * Proceso: ahí es la metodología en abstracto, acá es la obra real.
 */
export default function Obra() {
  const { containerRef, videoRef } = useScrollVideo({ scrollLengthVh: 320 });
  const titleRef = useSplitReveal<HTMLHeadingElement>({ type: "lines", y: "100%" });

  return (
    <section
      id="obra"
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-noir text-hueso"
    >
      <video
        ref={videoRef}
        src="/videos/construccion.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-noir/85 via-noir/10 to-noir/50"
        aria-hidden="true"
      />
      <DraftingFrame label="02 / OBRA" dark />

      <div className="relative flex h-full flex-col justify-end px-6 pb-20 md:px-10 md:pb-28">
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-hueso/60">Cómo construimos</span>
        <h2
          ref={titleRef}
          aria-label="De la idea a la obra construida."
          className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-6xl"
        >
          De la idea a la obra construida.
        </h2>
      </div>
    </section>
  );
}
