"use client";

import { useLenis } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Las secciones de Marcelo (Obra, Proceso) usan ScrollTrigger con pin/scrub.
 * Lenis anima el scrollTop nativo, pero sin este puente ScrollTrigger queda
 * un frame atrasado. Debe montarse dentro de <ReactLenis>.
 */
export default function GsapScrollSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  return null;
}
