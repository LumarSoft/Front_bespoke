import Image from "next/image";
import { HERO_IMAGE } from "@/lib/site-data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Cinematic background */}
      <div className="absolute inset-0 z-0">
        <div className="kenburns h-full w-full">
          <Image
            src={HERO_IMAGE}
            alt="Casa en el Paraíso — obra del estudio Bespoke Arquitectura"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Legibility overlays: darker at bottom-left where the copy sits,
            image stays visible top and right. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-6 pb-14 pt-28 md:px-10 md:pb-16 md:pt-32">
        {/* Top intro — architect gets top billing right under the navbar */}
        <div className="max-w-2xl">
          <p className="overline reveal is-in">
            Estudio de arquitectura y construcción · Desde Rosario
          </p>
          <p className="reveal is-in mt-4 font-serif text-xl font-light text-paper sm:text-2xl">
            Un estudio dirigido por{" "}
            <span className="italic text-accent">Arq. Cintia Colazzo</span>
          </p>
        </div>

        {/* Bottom block — statement + CTAs */}
        <div>
          <h1 className="display max-w-5xl text-[3.4rem] text-paper sm:text-[5rem] lg:text-[7rem]">
            <span className="block overflow-hidden">
              <span className="reveal-clip is-in block">Arquitectura</span>
            </span>
            <span className="block overflow-hidden">
              <span className="reveal-clip is-in block italic text-stone-300">
                hecha a medida.
              </span>
            </span>
          </h1>

          <div className="mt-8 grid max-w-4xl gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
            <p className="max-w-md text-base leading-relaxed text-paper-dim md:text-lg">
              Diseñamos espacios exclusivos, completamente únicos, donde cada
              detalle se estudia para una necesidad específica.
            </p>
            <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-3 rounded-full bg-paper px-7 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Iniciar un proyecto
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#proyectos"
              className="inline-flex items-center gap-3 rounded-full border border-[var(--line-strong)] px-7 py-3.5 text-sm uppercase tracking-[0.14em] text-paper backdrop-blur-sm transition-colors hover:bg-paper/10"
            >
              Ver obra
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* Scroll hint — pinned to the right edge so it never overlaps the CTAs */}
      <div className="pointer-events-none absolute bottom-28 right-8 z-10 hidden flex-col items-center gap-2 lg:flex">
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative block h-12 w-px bg-[var(--line-strong)]">
          <span
            className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-paper"
            style={{ animation: "scrollHint 2s ease-in-out infinite" }}
          />
        </span>
      </div>

      {/* Bottom marquee strip */}
      <div className="relative z-10 border-y border-[var(--line)] bg-ink/40 py-4 backdrop-blur-sm">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <span
              key={group}
              className="flex items-center gap-10 pr-10 text-sm uppercase tracking-[0.28em] text-stone-400"
              aria-hidden={group === 1}
            >
              <span>Diseño</span>
              <span className="text-accent">✦</span>
              <span>Proyecto</span>
              <span className="text-accent">✦</span>
              <span>Dirección de obra</span>
              <span className="text-accent">✦</span>
              <span>Gerenciamiento</span>
              <span className="text-accent">✦</span>
              <span>Sustentabilidad</span>
              <span className="text-accent">✦</span>
              <span>Hecho a medida</span>
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
