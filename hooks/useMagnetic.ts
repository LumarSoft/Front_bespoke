"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motionPrefs";

export interface UseMagneticOptions {
  strength?: number;
}

/**
 * Botón magnético: sigue el cursor con lag dentro de su propio radio y vuelve
 * a 0 al salir. Desactivado en touch / prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  options: UseMagneticOptions = {}
) {
  const ref = useRef<T | null>(null);
  const { strength = 0.4 } = options;

  useGSAP(
    (_context, contextSafe) => {
      const el = ref.current;
      if (!el || isTouchDevice() || prefersReducedMotion() || !contextSafe) return;

      const quickX = gsap.quickTo(el, "x", { duration: 0.6, ease: "buttery" });
      const quickY = gsap.quickTo(el, "y", { duration: 0.6, ease: "buttery" });

      const onMove = contextSafe((event: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);
        quickX(relX * strength);
        quickY(relY * strength);
      });

      const onLeave = contextSafe(() => {
        quickX(0);
        quickY(0);
      });

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref }
  );

  return ref;
}
