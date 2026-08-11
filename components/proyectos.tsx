"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { media, portfolioList, proyectosSection } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import BackgroundVideo from "@/components/ui/background-video";

/**
 * Eje 3 — PROYECTOS (portada). Dos accesos, uno por portfolio.
 *
 * Cada tarjeta ya lleva su identidad de color puesta vía `data-portfolio`, así
 * la diferencia entre Residencial (crema) y Comercial (gris/blanco/negro) se
 * lee desde la home y no recién al entrar. Ver globals.css.
 */
export default function Proyectos() {
  return (
    <section id="proyectos" className="relative bg-ink text-paper">
      {/* Banda de video continuo: reemplaza la secuencia de imágenes estáticas. */}
      <div className="relative h-[60svh] w-full overflow-hidden">
        <BackgroundVideo
          src={media.proyectosVideo.src}
          poster={media.proyectosVideo.poster}
          objectPosition={media.proyectosVideo.objectPosition}
          className="opacity-70"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60"
        />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 sm:px-8">
          <Reveal>
            <span className="eyebrow text-clay-soft">{proyectosSection.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-light leading-[1.02] tracking-[-0.02em] sm:text-6xl">
              {proyectosSection.title}
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="max-w-xl text-base leading-relaxed text-paper/65 sm:text-lg">
            {proyectosSection.intro}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {portfolioList.map((portfolio, i) => (
            <Reveal key={portfolio.slug} delay={i * 0.08}>
              <Link
                href={`/proyectos/${portfolio.slug}`}
                data-portfolio={portfolio.theme}
                className="group block h-full overflow-hidden rounded-3xl bg-surface text-on-surface transition-transform duration-500 ease-out hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={portfolio.cover.src}
                    alt={portfolio.cover.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col gap-5 p-8 sm:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <span className="eyebrow text-accent">{portfolio.label}</span>
                      <h3 className="mt-4 max-w-sm font-display text-2xl font-light leading-tight tracking-[-0.01em] sm:text-3xl">
                        {portfolio.title}
                      </h3>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-hairline transition-colors duration-300 group-hover:border-transparent group-hover:bg-accent group-hover:text-white">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>

                  <p className="max-w-md text-sm leading-relaxed text-on-surface-muted">
                    {portfolio.intro}
                  </p>

                  <span className="mt-2 border-t border-hairline pt-5 text-xs uppercase tracking-[0.2em] text-on-surface-muted">
                    {portfolio.proyectos.length}{" "}
                    {portfolio.proyectos.length === 1 ? "obra" : "obras"}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
