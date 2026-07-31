"use client";

import { ReactLenis } from "lenis/react";
import { type ReactNode } from "react";

/**
 * Smooth-scroll global con Lenis. Respeta prefers-reduced-motion
 * (Lenis se desactiva y el navegador usa scroll nativo).
 *
 * Calibración: el `lerp: 0.09` anterior arrastraba demasiado la rueda — el
 * scroll seguía moviéndose bastante después de soltar, que es parte de lo que
 * el cliente leyó como poco natural. Con 0.14 el suavizado se nota pero la
 * rueda responde de inmediato.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.14,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
