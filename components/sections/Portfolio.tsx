"use client";

import { useRef } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import DraftingFrame from "@/components/ui/DraftingFrame";
import { gsap, useGSAP } from "@/lib/gsap";
import { MQ_DESKTOP, MQ_REDUCED_MOTION } from "@/lib/motionPrefs";

const PROJECTS = [
  { title: "Casa Lomas", category: "Residencial", label: "TODO: /images/portfolio/casa-lomas.jpg" },
  { title: "Edificio Estrella", category: "Comercial", label: "TODO: /images/portfolio/edificio-estrella.jpg" },
  { title: "Loft Palermo", category: "Residencial", label: "TODO: /images/portfolio/loft-palermo.jpg" },
  { title: "Oficinas Puerto", category: "Comercial", label: "TODO: /images/portfolio/oficinas-puerto.jpg" },
  { title: "Casa Río", category: "Residencial", label: "TODO: /images/portfolio/casa-rio.jpg" },
  { title: "Showroom Norte", category: "Comercial", label: "TODO: /images/portfolio/showroom-norte.jpg" },
];

/** Galería horizontal pinneada: el track se desplaza en x según el scroll vertical (desktop only). */
function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const mm = gsap.matchMedia();

      mm.add({ isDesktop: MQ_DESKTOP, reduced: MQ_REDUCED_MOTION }, (context) => {
        const { isDesktop, reduced } = context.conditions as { isDesktop: boolean; reduced: boolean };
        if (!isDesktop || reduced) return;

        container.classList.remove("overflow-x-auto");
        container.classList.add("h-screen", "overflow-hidden");

        const getScrollAmount = () => track.scrollWidth - container.clientWidth;

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.kill();
          container.classList.add("overflow-x-auto");
          container.classList.remove("h-screen", "overflow-hidden");
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative overflow-x-auto">
      <div ref={trackRef} className="flex w-max items-center gap-6 px-6 py-6 md:px-16">
        {PROJECTS.map((project) => (
          <div key={`${project.title}-h`} className="w-[80vw] shrink-0 md:w-[36vw]">
            <ProjectCard
              title={project.title}
              category={project.category}
              alt={`Proyecto ${project.title}, ${project.category}`}
              label={project.label}
              ratio="3 / 4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-hueso px-6 py-32 md:px-10">
      <DraftingFrame label="04 / PROYECTOS" />
      <h2 className="mb-16 font-display text-4xl md:text-5xl">Proyectos</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            category={project.category}
            alt={`Proyecto ${project.title}, ${project.category}`}
            label={project.label}
          />
        ))}
      </div>

      <div className="mt-24 -mx-6 md:-mx-10">
        <HorizontalGallery />
      </div>
    </section>
  );
}
