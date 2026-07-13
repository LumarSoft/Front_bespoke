"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";
import { ArrowDown, Moon, Sun } from "lucide-react";
import { studio } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const WIPE = [0.76, 0, 0.24, 1] as const; // ease in-out fuerte para el barrido

const HEADLINE = ["Espacios", "hechos", "a", "medida."];

const META = [
  "Estancia Estrella Federal",
  "Ramallo · Buenos Aires",
  "Hormigón visto",
  "90 m² · 2021",
];

// Barrido diagonal: la capa "día" se retira revelando la "noche" debajo.
const DAY_CLIP = "polygon(0% 0%, 140% 0%, 140% 100%, 0% 100%)";
const NIGHT_CLIP = "polygon(0% 0%, -40% 0%, 0% 100%, 0% 100%)";
// Franja de luz que viaja sobre la costura del barrido.
const SEAM_DAY = "polygon(132% 0%, 140% 0%, 140% 100%, 132% 100%)";
const SEAM_NIGHT = "polygon(-48% 0%, -40% 0%, 0% 100%, -8% 100%)";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [night, setNight] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax de scroll.
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.9]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Parallax de puntero.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 22 });
  const sy = useSpring(py, { stiffness: 120, damping: 22 });
  const imgTX = useTransform(sx, [-0.5, 0.5], ["-2.5%", "2.5%"]);
  const imgTY = useTransform(sy, [-0.5, 0.5], ["-2%", "2%"]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const transition = { duration: 0.7, ease: WIPE };

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMove}
      className="relative h-[100svh] w-full overflow-hidden bg-ink"
    >
      {/* Stack de imágenes (parallax scroll + puntero) */}
      <motion.div
        style={{ scale: imgScale, y: imgY }}
        className="absolute inset-0 h-full w-full"
      >
        <motion.div style={{ x: imgTX, y: imgTY }} className="absolute inset-[-3%]">
          {/* Capa NOCHE (debajo) — priority para que el switch sea instantáneo */}
          <div className="absolute inset-0">
            <Image
              src="/hero/night.jpg"
              alt="Estancia Estrella Federal de noche"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Capa DÍA (encima, se retira con el barrido) */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ clipPath: night ? NIGHT_CLIP : DAY_CLIP }}
            transition={transition}
          >
            <Image
              src="/hero/day.jpg"
              alt="Estancia Estrella Federal al atardecer"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Franja de luz del barrido */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            initial={false}
            animate={{ clipPath: night ? SEAM_NIGHT : SEAM_DAY }}
            transition={transition}
            style={{
              background:
                "linear-gradient(100deg, transparent, rgba(255,214,160,0.85), rgba(255,255,255,0.95), rgba(255,214,160,0.85), transparent)",
              filter: "blur(6px)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Grade nocturno: tinte frío del cielo (sin aura cálida) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        initial={false}
        animate={{ opacity: night ? 1 : 0 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(20,40,90,0.4),transparent_55%)]" />
      </motion.div>

      {/* Overlays de legibilidad */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[6] bg-gradient-to-b from-ink/40 via-ink/20 to-ink"
      />
      <div className="absolute inset-0 z-[6] bg-gradient-to-t from-ink via-transparent to-transparent" />

      {/* Contenido */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-24 sm:px-8 sm:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: EASE }}
          className="eyebrow mb-6 text-paper/80"
        >
          Estudio de arquitectura · {studio.location}
        </motion.p>

        <h1 className="font-display text-[15vw] font-light leading-[0.9] tracking-[-0.02em] text-paper sm:text-[12vw] lg:text-[9.5rem]">
          {HEADLINE.map((word, i) => (
            <span key={i} className="mr-[0.2em] inline-block overflow-hidden py-[0.05em]">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.6 + i * 0.11, duration: 1, ease: EASE }}
              >
                {word === "medida." ? (
                  <em className="not-italic text-clay-soft [font-variation-settings:'SOFT'_80,'WONK'_1]">
                    {word}
                  </em>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1, ease: EASE }}
            className="max-w-md text-base leading-relaxed text-paper/70 sm:text-lg"
          >
            La misma obra, a toda hora. Diseño, gestión y dirección donde el
            detalle no decora: proyecta.
          </motion.p>

          {/* Control Día / Noche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 1, ease: EASE }}
            className="flex flex-col items-start gap-3 sm:items-end"
          >
            <DayNightToggle night={night} setNight={setNight} />
            <a
              href="#proyecto"
              className="group inline-flex items-center gap-3 text-sm font-medium text-paper"
            >
              <span className="grid size-11 place-items-center rounded-full border border-paper/30 transition-colors duration-300 group-hover:bg-paper group-hover:text-ink">
                <ArrowDown className="size-5 transition-transform duration-500 group-hover:translate-y-0.5" />
              </span>
              <span className="link-underline">Ver la obra</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Titleblock */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/15 lg:block"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-4 divide-x divide-white/15 px-8">
          {META.map((m, i) => (
            <span
              key={i}
              className="px-5 py-4 text-xs uppercase tracking-[0.18em] text-paper/55"
            >
              {m}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function DayNightToggle({
  night,
  setNight,
}: {
  night: boolean;
  setNight: (v: boolean) => void;
}) {
  const options = [
    { key: false, label: "Día", Icon: Sun },
    { key: true, label: "Noche", Icon: Moon },
  ] as const;

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-[0.62rem] uppercase tracking-[0.22em] text-paper/50 sm:inline">
        Cambiá la hora
      </span>
      <div className="glass-dark relative flex items-center gap-1 rounded-full p-1">
        {options.map(({ key, label, Icon }) => {
          const active = key === night;
          return (
            <button
              key={label}
              onClick={() => setNight(key)}
              className="relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
              aria-pressed={active}
            >
              {active && (
                <motion.span
                  layoutId="daynight-thumb"
                  className="absolute inset-0 -z-10 rounded-full bg-paper"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon
                className={`size-4 transition-colors ${
                  active ? "text-ink" : "text-paper/70"
                }`}
              />
              <span className={active ? "text-ink" : "text-paper/70"}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
