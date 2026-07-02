"use client";

import { useRef } from "react";
import { useGSAP, ScrollTrigger } from "@/lib/gsap";

export interface UseScrollProgressOptions {
  start?: string;
  end?: string;
  pin?: boolean;
  scrub?: boolean | number;
  onUpdate?: (progress: number, self: ScrollTrigger) => void;
}

/**
 * Suscribe un elemento a su propio progreso de scroll (0→1) vía ScrollTrigger,
 * para pines (timeline, galería horizontal) o para alimentar contadores/uniforms
 * sin depender de la fuente global de scroll.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollProgressOptions = {}
) {
  const ref = useRef<T | null>(null);
  const progressRef = useRef(0);
  const { start = "top bottom", end = "bottom top", pin = false, scrub = true, onUpdate } = options;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start,
        end,
        pin,
        scrub,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          onUpdate?.(self.progress, self);
        },
      });

      return () => trigger.kill();
    },
    { scope: ref }
  );

  return { ref, progressRef };
}
