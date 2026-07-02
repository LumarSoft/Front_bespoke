"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";
import { project } from "@/lib/content";
import { Reveal, RevealText } from "@/components/ui/reveal";

const { tour } = project;
const { beats } = tour;
const SCROLL_VH = 420; // alto total del recorrido (vh)

export default function ProjectShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Scrub del video con el scroll (seek de currentTime, throttled por rAF).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let duration = 0;
    let raf: number | null = null;

    const onMeta = () => {
      duration = video.duration || 0;
      schedule();
    };

    const render = () => {
      raf = null;
      if (!duration) return;
      const p = Math.min(1, Math.max(0, scrollYProgress.get()));
      const target = p * duration;
      // pequeño margen para no re-seekear en exceso
      if (Math.abs((video.currentTime || 0) - target) > 1 / 60) {
        video.currentTime = target;
      }
    };
    const schedule = () => {
      if (raf == null) raf = requestAnimationFrame(render);
    };

    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();
    const unsub = scrollYProgress.on("change", schedule);

    // Precarga diferida: recién cuando la sección se acerca (protege el LCP del hero).
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!started && entries.some((e) => e.isIntersecting)) {
          started = true;
          video.preload = "auto";
          video.load();
        }
      },
      { rootMargin: "1400px 0px 1400px 0px" },
    );
    if (stageRef.current) io.observe(stageRef.current);

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      io.disconnect();
      unsub();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollYProgress]);

  return (
    <section id="proyecto" className="relative bg-ink text-paper">
      {/* Intro editorial */}
      <div className="mx-auto max-w-6xl px-5 pt-28 sm:px-8 sm:pt-40">
        <Reveal>
          <span className="eyebrow text-clay-soft">{project.eyebrow}</span>
        </Reveal>
        <RevealText
          as="h2"
          text={project.name}
          className="mt-5 max-w-4xl font-display text-5xl font-light leading-[0.98] tracking-[-0.02em] text-paper sm:text-7xl lg:text-8xl"
          delay={0.05}
        />
        <div className="mt-8 flex flex-col gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-start sm:justify-between">
          <Reveal>
            <p className="max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">
              <span className="text-paper">{project.place}.</span> {project.intro}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="grid grid-cols-2 gap-x-10 gap-y-5">
              {project.facts.map((f) => (
                <div key={f.k}>
                  <dt className="text-xs uppercase tracking-[0.18em] text-paper/45">
                    {f.k}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-light">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <p className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-paper/40">
            <span className="h-px w-8 bg-clay" />
            Desplazá para recorrer la obra
          </p>
        </Reveal>
      </div>

      {/* Recorrido con scroll (video scrub, pinned) */}
      <div
        ref={stageRef}
        className="relative mt-16"
        style={{ height: `${SCROLL_VH}vh` }}
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ink">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: tour.objectPosition }}
            src={tour.src}
            poster={tour.poster}
            muted
            playsInline
            preload="metadata"
          />
          {/* velo para legibilidad del texto */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-ink/40" />

          {/* Beats narrativos */}
          {beats.map((b) => (
            <Beat key={b.index} beat={b} progress={scrollYProgress} />
          ))}

          {/* Barra de progreso del recorrido */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[3px] bg-white/15">
            <motion.div
              style={{ scaleX: barScale }}
              className="h-full origin-left bg-clay"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Beat({
  beat,
  progress,
}: {
  beat: (typeof beats)[number];
  progress: MotionValue<number>;
}) {
  const [s, e] = beat.range;
  const mid = (s + e) / 2;
  const inA = Math.min(s + 0.05, mid);
  const outA = Math.max(e - 0.05, mid);

  const opacity = useTransform(progress, [s, inA, outA, e], [0, 1, 1, 0]);
  const y = useTransform(progress, [s, inA], [40, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24"
    >
      <div className="flex items-end gap-4">
        <span className="font-mono text-sm text-clay-soft">{beat.index}</span>
        <div className="max-w-xl">
          <h3 className="font-display text-4xl font-light leading-[1.02] tracking-tight sm:text-6xl">
            {beat.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-paper/75 sm:text-base">
            {beat.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
