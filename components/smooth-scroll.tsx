"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

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
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}

/**
 * Lleva la página al tope en cada cambio de ruta.
 *
 * Hace falta porque Lenis pisa el scroll-to-top del App Router: Next hace su
 * `scrollTo(0)` durante la navegación, pero Lenis es quien escribe la posición
 * en cada frame y sigue teniendo guardado el scroll anterior, así que en el
 * frame siguiente lo vuelve a aplicar. Resultado: al saltar de Residencial a
 * Comercial la página abría por la mitad, donde había quedado la anterior.
 * Poniendo el valor en el propio Lenis (`immediate`, que lo aplica de una y no
 * anima el recorrido) ya no queda nada viejo que restaurar.
 *
 * Dos excepciones:
 *   · Si la URL trae ancla (`/#proyectos`, `/#estudio`) no tocamos nada: ahí el
 *     destino es la sección, no el tope.
 *   · La primera carga se saltea, para no pisar la restauración de scroll del
 *     navegador al refrescar.
 */
function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();
  const primeraCarga = useRef(true);

  useEffect(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }
    if (!lenis || window.location.hash) return;

    lenis.scrollTo(0, { immediate: true, force: true });
  }, [lenis, pathname]);

  return null;
}
