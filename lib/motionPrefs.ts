export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

export const MQ_DESKTOP = "(min-width: 768px)";
export const MQ_MOBILE = "(max-width: 767px)";
export const MQ_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
