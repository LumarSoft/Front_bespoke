"use client";

import { ReactLenis } from "lenis/react";
import { type ReactNode } from "react";

/**
 * Smooth-scroll global con Lenis. Respeta prefers-reduced-motion
 * (Lenis se desactiva y el navegador usa scroll nativo).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
