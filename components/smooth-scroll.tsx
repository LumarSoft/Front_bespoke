"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import type Lenis from "lenis";

/**
 * Smooth-scroll global con Lenis.
 *
 * ── Por qué se carga tarde y con `import()` dinámico ─────────────────────────
 * Lenis corre un bucle de `requestAnimationFrame` permanente. Medido con
 * Lighthouse en mobile, arrancar durante la carga le costaba ~0,5 s de hilo
 * principal justo en la ventana que define el LCP. Nadie hace scroll en el
 * primer segundo, así que se inicializa recién cuando la página terminó de
 * cargar y el navegador está libre. Antes de eso el scroll es el nativo, que se
 * siente igual de fluido para el primer gesto; después toma el control Lenis.
 *
 * El `await import("lenis")` además lo saca del chunk inicial: son ~24 KB que
 * no se descargan hasta que hacen falta.
 *
 * Calibración: el `lerp: 0.09` original arrastraba demasiado la rueda — el
 * scroll seguía moviéndose bastante después de soltar, que es parte de lo que
 * el cliente leyó como poco natural. Con 0.14 el suavizado se nota pero la
 * rueda responde de inmediato.
 *
 * Con `prefers-reduced-motion` no se inicializa nunca: queda el scroll nativo.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const primeraCarga = useRef(true);

  /**
   * Suaviza los enlaces a secciones de la página sin cambiar el comportamiento
   * de enlaces externos, nuevas pestañas ni navegaciones entre rutas.
   *
   * El listener vive en captura para adelantarse al scroll de Next y del
   * navegador. Si Lenis todavía no terminó su carga diferida, `scrollIntoView`
   * funciona como fallback; la regla CSS de `html` le aporta la misma sutileza.
   */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const alPulsarAncla = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const enlace =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!enlace) return;

      const destinoUrl = new URL(enlace.href, window.location.href);
      if (
        destinoUrl.origin !== window.location.origin ||
        destinoUrl.pathname !== window.location.pathname ||
        !destinoUrl.hash
      ) {
        return;
      }

      const id = decodeURIComponent(destinoUrl.hash.slice(1));
      const destino = document.getElementById(id);
      if (!destino) return;

      event.preventDefault();
      // Evita que Next procese el mismo click después y aplique su salto
      // inmediato. El evento propio permite que el menú mobile se cierre.
      event.stopImmediatePropagation();
      window.dispatchEvent(new Event("bespoke:section-navigation"));
      if (window.location.hash !== destinoUrl.hash) {
        window.history.pushState(null, "", destinoUrl.hash);
      }

      if (lenisRef.current) {
        lenisRef.current.scrollTo(destino, { lerp: 0.1 });
      } else {
        destino.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // `window` captura antes que el listener delegado de Next en `document`.
    // Así Next ve `defaultPrevented` y no ejecuta un segundo salto inmediato.
    window.addEventListener("click", alPulsarAncla, true);
    return () => window.removeEventListener("click", alPulsarAncla, true);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelado = false;
    let frame = 0;

    const iniciar = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelado) return;

      const lenis = new Lenis({
        lerp: 0.14,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });
      lenisRef.current = lenis;

      const bucle = (tiempo: number) => {
        lenis.raf(tiempo);
        frame = requestAnimationFrame(bucle);
      };
      frame = requestAnimationFrame(bucle);
    };

    const cuandoElNavegadorEsteLibre = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => void iniciar(), { timeout: 1500 });
      } else {
        setTimeout(() => void iniciar(), 200);
      }
    };

    if (document.readyState === "complete") {
      cuandoElNavegadorEsteLibre();
    } else {
      window.addEventListener("load", cuandoElNavegadorEsteLibre, { once: true });
    }

    return () => {
      cancelado = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("load", cuandoElNavegadorEsteLibre);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

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
  useEffect(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }
    if (window.location.hash) return;

    // Si Lenis todavía no arrancó, el scroll nativo del router ya hizo su
    // trabajo y no hay nada que corregir.
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return <>{children}</>;
}
