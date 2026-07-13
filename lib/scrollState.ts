import type { ScrollSmoother } from "gsap/ScrollSmoother";

/**
 * Puente entre el DOM (ScrollSmoother, fuente única de scroll) y la capa WebGL.
 * Es un objeto mutable, no un estado de React: se lee dentro de useFrame en cada
 * frame y no debe disparar renders.
 */
export const scrollState = {
  progress: 0,
  velocity: 0,
  smoother: null as ScrollSmoother | null,
};
