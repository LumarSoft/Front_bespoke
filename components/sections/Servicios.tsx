"use client";

import { useRef, useState } from "react";
import DraftingFrame from "@/components/ui/DraftingFrame";
import { gsap, useGSAP } from "@/lib/gsap";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motionPrefs";

const SERVICES = [
  {
    title: "Diseño",
    description: "Procesos de diseño donde cada detalle se estudia para lograr una solución única.",
    imageLabel: "TODO: /images/servicios/diseno.jpg",
  },
  {
    title: "Gestión",
    description: "Coordinación integral del proyecto, de la idea a la obra construida.",
    imageLabel: "TODO: /images/servicios/gestion.jpg",
  },
  {
    title: "Dirección de proyectos",
    description: "Seguimiento y dirección en escalas residenciales y comerciales.",
    imageLabel: "TODO: /images/servicios/direccion.jpg",
  },
];

/** Items con clip-path stagger al entrar; en hover, imagen flotante sigue al cursor. */
export default function Servicios() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useGSAP(
    () => {
      const items = listRef.current?.children;
      if (!items) return;

      if (prefersReducedMotion()) {
        gsap.set(items, { clipPath: "inset(0% 0 0 0)", autoAlpha: 1 });
        return;
      }

      gsap.set(items, { clipPath: "inset(0 0 100% 0)", autoAlpha: 0 });
      const tween = gsap.to(items, {
        clipPath: "inset(0% 0 0 0)",
        autoAlpha: 1,
        duration: 0.9,
        ease: "buttery",
        stagger: 0.12,
        scrollTrigger: { trigger: listRef.current, start: "top 80%", once: true },
      });

      return () => tween.kill();
    },
    { scope: sectionRef }
  );

  useGSAP(
    (_context, contextSafe) => {
      const section = sectionRef.current;
      const preview = previewRef.current;
      if (!section || !preview || isTouchDevice() || prefersReducedMotion() || !contextSafe) return;

      const quickX = gsap.quickTo(preview, "x", { duration: 0.5, ease: "buttery" });
      const quickY = gsap.quickTo(preview, "y", { duration: 0.5, ease: "buttery" });

      const onMove = contextSafe((event: MouseEvent) => {
        const sectionRect = section.getBoundingClientRect();
        const previewRect = preview.getBoundingClientRect();
        quickX(event.clientX - sectionRect.left - previewRect.width / 2);
        quickY(event.clientY - sectionRect.top - previewRect.height / 2);
      });

      section.addEventListener("mousemove", onMove);
      return () => section.removeEventListener("mousemove", onMove);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative overflow-hidden bg-noir px-6 py-32 text-hueso md:px-10"
    >
      <DraftingFrame label="03 / SERVICIOS" dark />
      <h2 className="mb-16 font-display text-4xl md:text-5xl">Servicios</h2>

      <ul ref={listRef} className="divide-y divide-hueso/15 border-y border-hueso/15">
        {SERVICES.map((service, index) => (
          <li
            key={service.title}
            className="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:justify-between"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered((current) => (current === index ? null : current))}
            data-cursor-hover
          >
            <span className="font-display text-3xl md:text-5xl">{service.title}</span>
            <span className="max-w-md font-sans text-sm text-hueso/70 md:text-base">
              {service.description}
            </span>
          </li>
        ))}
      </ul>

      <div
        ref={previewRef}
        className="pointer-events-none absolute left-0 top-0 z-10 h-56 w-40 overflow-hidden rounded-sm transition-opacity duration-300"
        style={{ opacity: hovered !== null ? 1 : 0 }}
      >
        {hovered !== null && (
          <div className="img-placeholder img-placeholder--dark flex h-full w-full items-end p-3">
            <span className="img-placeholder__label text-hueso/70">{SERVICES[hovered].imageLabel}</span>
          </div>
        )}
      </div>
    </section>
  );
}
