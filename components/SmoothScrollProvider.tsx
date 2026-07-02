"use client";

import { useGSAP, ScrollSmoother } from "@/lib/gsap";
import { scrollState } from "@/lib/scrollState";
import { prefersReducedMotion } from "@/lib/motionPrefs";

/**
 * Fuente única de scroll del sitio. Monta la estructura obligatoria de
 * ScrollSmoother (#smooth-wrapper > #smooth-content) y escribe progreso/velocidad
 * en scrollState para que la capa WebGL reaccione sin manejar scroll por su cuenta.
 *
 * Con prefers-reduced-motion, no se instancia ScrollSmoother: la clase
 * "has-smooth-scroll" no se aplica y los wrappers quedan en flujo normal (ver
 * globals.css), así el scroll nativo del navegador sigue funcionando intacto.
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    document.documentElement.classList.add("has-smooth-scroll");

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      smoothTouch: 0.1,
      effects: true,
      normalizeScroll: true,
      onUpdate: (self: ScrollSmoother) => {
        scrollState.progress = self.progress;
        scrollState.velocity = self.getVelocity();
      },
    });

    scrollState.smoother = smoother;

    return () => {
      document.documentElement.classList.remove("has-smooth-scroll");
      scrollState.smoother = null;
      smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
