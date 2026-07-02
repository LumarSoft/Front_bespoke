"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import DraftingFrame from "@/components/ui/DraftingFrame";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { MQ_DESKTOP, MQ_REDUCED_MOTION } from "@/lib/motionPrefs";

const BlueprintScene = dynamic(() => import("@/components/webgl/BlueprintScene"), { ssr: false });

const STEPS = [
  {
    title: "Relevamiento",
    description: "Escuchamos al cliente y el sitio: el punto de partida de cada proyecto a medida.",
  },
  {
    title: "Diseño",
    description: "Procesos de diseño donde cada detalle se estudia para lograr un diseño único.",
  },
  {
    title: "Gestión",
    description: "Coordinación de equipos, tiempos y recursos durante todo el desarrollo.",
  },
  {
    title: "Dirección de obra",
    description: "Seguimiento en sitio hasta la entrega, cumpliendo estándares de calidad internacional.",
  },
];

const STATS = [
  { value: 120, suffix: "+", label: "Proyectos realizados" },
  { value: 15, suffix: "", label: "Años de trayectoria" },
  { value: 40, suffix: "+", label: "Profesionales en el equipo" },
  { value: 3, suffix: "", label: "Países con obra construida" },
];

/** Fracción del scroll pinneado en la que el volumen ya está construido y arrancan las stats. */
const STATS_START = 0.82;

function animateCounters(container: HTMLElement) {
  container.querySelectorAll<HTMLSpanElement>("[data-stat-value]").forEach((el) => {
    const target = Number(el.dataset.statValue);
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      duration: 1.4,
      ease: "buttery",
      onUpdate: () => {
        el.textContent = String(Math.round(counter.value));
      },
    });
  });
}

/**
 * "La obra se construye mientras scrolleás": un volumen procedural (Three.js,
 * sin assets) se levanta desde un blueprint a medida que avanzás por los 4
 * pasos del proceso; al terminar, los números aparecen como HUD junto al
 * modelo ya construido. Antes eran 2 secciones separadas (Proceso + Stats) —
 * ahora es una escena continua, así ninguna queda "de solo texto".
 *
 * En mobile / prefers-reduced-motion no se pinnea ni se monta WebGL: los
 * pasos y las stats quedan en flujo normal, con contadores on-enter simples
 * (ver el modificador de clase `is-pinned` en globals.css).
 */
export default function Proceso() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const statsAnimatedRef = useRef(false);

  useGSAP(
    () => {
      const pin = pinRef.current;
      const stepsEl = stepsRef.current;
      const stats = statsRef.current;
      const canvasHost = canvasHostRef.current;
      const stepItems = stepsEl?.children;
      if (!pin || !stepsEl || !stats || !canvasHost || !stepItems) return;

      const mm = gsap.matchMedia();

      mm.add({ isDesktop: MQ_DESKTOP, reduced: MQ_REDUCED_MOTION }, (context) => {
        const { isDesktop, reduced } = context.conditions as { isDesktop: boolean; reduced: boolean };

        if (!isDesktop || reduced) {
          const trigger = ScrollTrigger.create({
            trigger: stats,
            start: "top 85%",
            once: true,
            onEnter: () => animateCounters(stats),
          });
          return () => trigger.kill();
        }

        pin.classList.add("is-pinned");
        stepsEl.classList.add("is-pinned");
        stats.classList.add("is-pinned");
        canvasHost.classList.remove("hidden");

        gsap.set(stepItems, { autoAlpha: 0, y: 16 });
        gsap.set(stepItems[0], { autoAlpha: 1, y: 0 });
        gsap.set(stats, { autoAlpha: 0, y: 16 });

        const stepSpan = STATS_START / STEPS.length;

        const trigger = ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: () => `+=${(STEPS.length + 1) * window.innerHeight}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;

            const activeStep = Math.min(STEPS.length - 1, Math.floor(self.progress / stepSpan));
            const showSteps = self.progress < STATS_START;

            Array.from(stepItems).forEach((el, index) => {
              const visible = showSteps && index === activeStep;
              gsap.to(el, { autoAlpha: visible ? 1 : 0, y: visible ? 0 : 16, duration: 0.3, overwrite: "auto" });
            });

            if (self.progress >= STATS_START) {
              gsap.to(stats, { autoAlpha: 1, y: 0, duration: 0.4, overwrite: "auto" });
              if (!statsAnimatedRef.current) {
                statsAnimatedRef.current = true;
                animateCounters(stats);
              }
            } else {
              gsap.to(stats, { autoAlpha: 0, y: 16, duration: 0.3, overwrite: "auto" });
            }
          },
        });

        return () => {
          trigger.kill();
          pin.classList.remove("is-pinned");
          stepsEl.classList.remove("is-pinned");
          stats.classList.remove("is-pinned");
          canvasHost.classList.add("hidden");
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="proceso" ref={sectionRef} className="relative bg-noir text-hueso">
      <div ref={pinRef} className="proceso-pin relative">
        <div ref={canvasHostRef} className="absolute inset-0 hidden">
          <Suspense fallback={null}>
            <BlueprintScene progressRef={progressRef} />
          </Suspense>
        </div>

        <div className="blueprint-grid--dark pointer-events-none absolute inset-0" aria-hidden="true" />
        <DraftingFrame label="05 / PROCESO" dark />

        <div className="relative mx-auto max-w-6xl px-6 py-32 md:px-10">
          <div ref={stepsRef} className="proceso-steps relative max-w-md md:h-[50vh]">
            {STEPS.map((step, index) => (
              <div key={step.title} data-proceso-step className="py-10 md:py-0">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-hueso/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-3xl md:text-4xl">{step.title}</h3>
                <p className="mt-4 max-w-sm font-sans text-base text-hueso/70">{step.description}</p>
              </div>
            ))}
          </div>

          <div
            ref={statsRef}
            className="proceso-stats mt-24 grid grid-cols-2 gap-8 border-t border-hueso/15 pt-10 text-center md:mt-0 md:grid-cols-4"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl md:text-5xl">
                  <span data-stat-value={stat.value}>0</span>
                  {stat.suffix}
                </p>
                <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-hueso/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
