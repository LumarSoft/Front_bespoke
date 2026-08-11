"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Aparición suave (fundido + desplazamiento) al entrar en viewport.
 *
 * Implementado con IntersectionObserver y una transición CSS, no con una
 * librería de animación. El motivo es medible: `motion` era la dependencia más
 * pesada del sitio y su ejecución en el hilo principal era lo que empujaba el
 * LCP en mobile. La transición es idéntica en pantalla —misma curva, misma
 * duración, mismo escalonado— y no cuesta JavaScript de animación.
 *
 * `as` existe porque dentro de una lista el wrapper no puede ser un `div`: un
 * `<ul>` sólo admite `<li>` como hijo directo. Envolver cada `<li>` en un div
 * rompía la lista para los lectores de pantalla (axe: `list` / `listitem`), así
 * que en esos casos se usa `<Reveal as="li">` y el propio Reveal es el ítem.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sin IntersectionObserver no hay revelado posible: se muestra y listo.
    // Nunca dejar contenido escondido esperando una API que no existe.
    // (Se difiere un frame para no llamar a setState en el cuerpo del efecto.)
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { rootMargin: "-12% 0px -12% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-revealed", className)}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-delay": `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
