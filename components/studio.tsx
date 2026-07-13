"use client";

import Image from "next/image";
import { team, studio } from "@/lib/content";
import { Reveal, RevealText } from "@/components/ui/reveal";

export default function Studio() {
  return (
    <section id="equipo" className="relative overflow-hidden bg-paper px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* Texto */}
        <div>
          <Reveal>
            <span className="eyebrow text-clay">El estudio</span>
          </Reveal>
          <RevealText
            as="h2"
            text="Un equipo interdisciplinario."
            className="mt-5 max-w-xl font-display text-4xl font-light leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl"
            delay={0.05}
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              Liderado por la {studio.lead}, {studio.full} reúne a profesionales
              de distintas disciplinas para resolver cada obra con precisión
              técnica y sensibilidad de proyecto.
            </p>
          </Reveal>

          <ul className="mt-12 border-t border-ink/10">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.05}>
                <li className="group flex items-center justify-between border-b border-ink/10 py-5">
                  <span className="font-display text-xl font-light text-ink sm:text-2xl">
                    {member.name}
                  </span>
                  <span className="text-right text-xs uppercase tracking-[0.14em] text-ink-soft sm:text-sm">
                    {member.role}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Imagen */}
        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
          <figure className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <Image
              src="/projects/interior-view.jpg"
              alt="Interior de la obra Estancia Estrella Federal"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <figcaption className="glass-dark absolute bottom-4 left-4 right-4 rounded-2xl px-5 py-4 text-paper">
              <p className="font-display text-lg">Hecho a medida</p>
              <p className="mt-0.5 text-xs text-paper/70">
                Cada rincón responde a una necesidad concreta.
              </p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
