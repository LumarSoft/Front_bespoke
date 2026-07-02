"use client";

import { useRef } from "react";
import RevealImage from "@/components/ui/RevealImage";
import DraftingFrame from "@/components/ui/DraftingFrame";
import { useSplitReveal } from "@/hooks/useSplitReveal";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { gsap, useGSAP } from "@/lib/gsap";

const MAGIC_TEXT =
  '“Bespoke” significa “hecho a medida”. Es un concepto de sastrería completamente tradicional, en el que todo el proceso se realiza artesanalmente y de manera exclusiva para un cliente en concreto. Nos apropiamos de este concepto para crear una arquitectura exclusiva y personalizada. En la que sostenemos procesos de diseño donde cada detalle se estudia exclusivamente para lograr un diseño único cumpliendo estándares de calidad internacional.';

const ESTUDIO_TEXT =
  "Bespoke arquitectura es un estudio independiente especializado en el diseño, la gestión y la dirección de proyectos residenciales y comerciales de diferentes escalas. Formamos un equipo interdisciplinario, dinámico y eficiente, integrado por profesionales que aportan una visión global a cada proyecto obteniendo resultados de alta calidad. Prestamos especial atención a las pequeñas decisiones, cada rincón, cada elemento, cada uno de los proyectos que diseñamos y concebimos en Bespoke son una solución única a una necesidad específica. Creemos que los detalles no son simples objetos decorativos, son decisiones que forman parte del proyecto, representan todo aquello que uno imagina e incluso siente.";

const STICKY_IMAGES = [
  { alt: "Equipo de Bespoke trabajando en un proyecto", label: "TODO: /images/estudio/equipo.jpg" },
  { alt: "Detalle de un rincón proyectado por Bespoke", label: "TODO: /images/estudio/detalle-rincon.jpg" },
  { alt: "Obra de Bespoke en ejecución", label: "TODO: /images/estudio/obra-ejecucion.jpg" },
];

/**
 * "Bespoke, una palabra mágica" + "Estudio" fundidos en una sola narrativa:
 * antes eran dos secciones separadas, cada una con su propio bloque de
 * imágenes (2 laterales + columna sticky) — quedaba repetitivo. Ahora el
 * único tratamiento de imagen es la columna sticky que acompaña el texto real
 * del estudio; la palabra mágica se lee arriba, sin imágenes, apoyada en el
 * mismo lenguaje de plano técnico que el resto del sitio (ver DraftingFrame).
 */
export default function Estudio() {
  const magicRef = useSplitReveal<HTMLParagraphElement>({
    type: "words",
    scrub: true,
    ease: "none",
    y: 0,
    fromOpacity: 0.1,
    stagger: 0.02,
    start: "top 75%",
  });

  const textRef = useSplitReveal<HTMLParagraphElement>({ type: "lines", stagger: 0.08, y: "60%" });
  const imagesWrapRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);

  const { ref: progressRef } = useScrollProgress<HTMLDivElement>({
    start: "top center",
    end: "bottom center",
    onUpdate: (progress) => {
      const children = imagesWrapRef.current?.children;
      if (!children || children.length === 0) return;
      const nextIndex = Math.min(children.length - 1, Math.floor(progress * children.length));
      if (nextIndex === activeIndexRef.current) return;
      activeIndexRef.current = nextIndex;
      Array.from(children).forEach((child, index) => {
        gsap.to(child, { autoAlpha: index === nextIndex ? 1 : 0, duration: 0.6, ease: "buttery" });
      });
    },
  });

  useGSAP(
    () => {
      const children = imagesWrapRef.current?.children;
      if (!children) return;
      gsap.set(children, { autoAlpha: 0 });
      if (children[0]) gsap.set(children[0], { autoAlpha: 1 });
    },
    { scope: imagesWrapRef }
  );

  return (
    <section id="estudio" className="relative bg-hueso">
      <div className="relative px-6 py-32 md:px-10">
        <DraftingFrame label="01 / BESPOKE" />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-gris-calido-oscuro">
            Una palabra mágica
          </span>
          <p
            ref={magicRef}
            aria-label={MAGIC_TEXT}
            className="font-display text-2xl leading-snug md:text-4xl md:leading-snug"
          >
            {MAGIC_TEXT}
          </p>
        </div>
      </div>

      <div ref={progressRef} className="relative grid gap-12 px-6 pb-32 md:grid-cols-2 md:px-10">
        <div className="h-[60vh] md:sticky md:top-28 md:order-1 md:self-start">
          <div ref={imagesWrapRef} className="relative h-full w-full">
            {STICKY_IMAGES.map((image) => (
              <div key={image.alt} className="absolute inset-0">
                <RevealImage alt={image.alt} label={image.label} ratio="4 / 5" className="h-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center md:order-2">
          <h2 className="mb-8 font-display text-4xl md:text-5xl">Estudio</h2>
          <p
            ref={textRef}
            aria-label={ESTUDIO_TEXT}
            className="max-w-xl font-sans text-lg leading-relaxed text-noir/80 md:text-xl"
          >
            {ESTUDIO_TEXT}
          </p>
        </div>
      </div>
    </section>
  );
}
