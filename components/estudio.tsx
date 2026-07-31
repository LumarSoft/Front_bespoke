"use client";

import Image from "next/image";
import { estudio, studio } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import MixedHeading from "@/components/ui/mixed-heading";

/**
 * Eje 1 — ESTUDIO. Reúne los tres subtemas definidos con el cliente:
 * Qué es Bespoke · Filosofía y Origen · Equipo interdisciplinario.
 *
 * Es la sección de referencia tipográfica del sitio: la jerarquía mixta de
 * `MixedHeading` (dos familias, pesos e itálicas) nace acá y se replica en Método.
 */
export default function Estudio() {
  return (
    <section
      id="estudio"
      className="relative bg-surface px-5 py-28 text-on-surface sm:px-8 sm:py-40"
    >
      <div className="mx-auto max-w-6xl">
        {/* --- Qué es Bespoke --- */}
        <Reveal>
          <div className="mb-14 flex items-center gap-4">
            <span className="eyebrow text-accent">{estudio.eyebrow}</span>
            <span className="h-px flex-1 bg-hairline" />
            <span className="text-sm text-on-surface-muted">
              {studio.name}™ · desde {studio.since}
            </span>
          </div>
        </Reveal>

        <Reveal>
          <MixedHeading
            lines={estudio.queEs.lines}
            className="max-w-4xl text-4xl sm:text-6xl lg:text-[4.6rem]"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-2xl text-base leading-relaxed text-on-surface-muted sm:text-lg">
            {estudio.queEs.body}
          </p>
        </Reveal>

        {/* --- Filosofía y Origen --- */}
        <div className="mt-24 grid gap-10 border-t border-hairline pt-12 sm:grid-cols-[1fr_1.4fr] sm:gap-16">
          <Reveal>
            <h3 className="font-sans text-xs uppercase tracking-[0.28em] text-on-surface-muted">
              {estudio.filosofia.title}
            </h3>
            <p className="mt-6 font-display text-2xl font-light italic leading-snug text-on-surface sm:text-3xl">
              “{estudio.filosofia.quote}”
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-on-surface-muted sm:text-lg">
              El nombre viene del oficio de la sastrería:{" "}
              <em className="type-emphasis not-italic text-on-surface">bespoke</em> es la
              prenda hecha a medida, cortada para un cuerpo y no para un talle. Esa idea
              ordena todo lo que hacemos — cada rincón, cada material y cada junta
              responden a una necesidad concreta, nunca a un gesto decorativo.
            </p>
          </Reveal>
        </div>

        {/* --- Valores (íconos del manual, pág. 20) --- */}
        <ul className="mt-24 grid gap-12 border-t border-hairline pt-12 sm:grid-cols-3 sm:gap-10">
          {estudio.valores.map((valor, i) => (
            <Reveal key={valor.title} delay={i * 0.08}>
              <li>
                <Image
                  src={valor.icon}
                  alt=""
                  aria-hidden
                  width={4500}
                  height={4500}
                  sizes="72px"
                  className="size-14"
                />
                <h3 className="mt-6 font-display text-xl font-medium tracking-tight">
                  {valor.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-muted">
                  {valor.desc}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* --- Equipo interdisciplinario --- */}
        <div className="mt-24 grid gap-16 border-t border-hairline pt-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <h3 className="max-w-xl font-display text-3xl font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                {estudio.equipo.title}
              </h3>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-on-surface-muted sm:text-lg">
                {estudio.equipo.intro}
              </p>
            </Reveal>

            <ul className="mt-12 border-t border-hairline">
              {estudio.equipo.miembros.map((member, i) => (
                <Reveal key={member.name} delay={i * 0.05}>
                  <li className="flex items-center justify-between gap-6 border-b border-hairline py-5">
                    <span className="font-display text-xl font-light sm:text-2xl">
                      {member.name}
                    </span>
                    <span className="text-right text-xs uppercase tracking-[0.14em] text-on-surface-muted sm:text-sm">
                      {member.role}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <figure className="relative aspect-3/4 overflow-hidden rounded-3xl">
              <Image
                src={estudio.equipo.image.src}
                alt={estudio.equipo.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <figcaption className="glass-dark absolute inset-x-4 bottom-4 rounded-2xl px-5 py-4 text-paper">
                <p className="font-display text-lg">Hecho a medida</p>
                <p className="mt-0.5 text-xs text-paper/70">
                  Cada rincón responde a una necesidad concreta.
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
