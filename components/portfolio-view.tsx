import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { portfolioList, type Portfolio } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

/**
 * Color de la cortina de transición, uno por portfolio. Son los dos extremos
 * de la paleta a propósito: crema contra negro. Así las dos transiciones no
 * se parecen entre sí y el salto de un portfolio al otro se nota de entrada.
 */
const CURTAIN: Record<Portfolio["theme"], { panel: string; eyebrow: string }> = {
  residencial: { panel: "bg-crema text-negro", eyebrow: "text-terra" },
  comercial: { panel: "bg-negro text-blanco-calido", eyebrow: "text-terra-soft" },
};

/**
 * Vista de un portfolio completo (Residencial o Comercial).
 *
 * La identidad de color no está hardcodeada: se activa con `data-portfolio`
 * en el contenedor, que re-mapea los tokens semánticos (surface / on-surface /
 * accent / hairline) definidos en globals.css. Por eso el mismo markup se ve
 * crema en Residencial y gris-blanco-negro en Comercial.
 */
export default function PortfolioView({ portfolio }: { portfolio: Portfolio }) {
  const otro = portfolioList.find((p) => p.slug !== portfolio.slug);
  const curtain = CURTAIN[portfolio.theme];

  return (
    <div data-portfolio={portfolio.theme} className="bg-surface text-on-surface">
      {/*
        Cortina de transición. El `key` es lo que la hace reiniciar al pasar de
        un portfolio al otro: fuerza a React a recrear el nodo, y con el nodo
        nuevo vuelve a correr la animación CSS. Sin `key` React reusa el mismo
        div y la cortina sólo se vería la primera vez.

        Va por encima del navbar (z-50) y del menú mobile (z-60) para que la
        página se descubra entera de una vez; el grano global (z-100) queda
        arriba de todo.
      */}
      <div
        key={portfolio.slug}
        aria-hidden
        className={`portfolio-curtain pointer-events-none fixed inset-0 z-70 flex flex-col items-center justify-center ${curtain.panel}`}
      >
        <span className={`portfolio-curtain__label eyebrow ${curtain.eyebrow}`}>
          Proyectos
        </span>
        <span className="portfolio-curtain__label portfolio-curtain__label--delayed mt-4 font-display text-5xl font-light tracking-[-0.02em] sm:text-7xl">
          {portfolio.label}
        </span>
      </div>

      {/* Portada */}
      <header
        className="relative flex min-h-[70svh] items-end overflow-hidden bg-ink text-paper"
      >
        <Image
          src={portfolio.cover.src}
          alt={portfolio.cover.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-65"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-40 sm:px-8 sm:pb-24">
          <Link
            href="/#proyectos"
            className="group mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-paper"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Proyectos
          </Link>

          <span className="eyebrow block text-clay-soft">{portfolio.label}</span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-light leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
            {portfolio.title}
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">
            {portfolio.intro}
          </p>
        </div>
      </header>

      {/* Obras */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex items-baseline justify-between border-b border-hairline pb-6">
          <h2 className="font-display text-2xl font-light sm:text-3xl">Obras</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-on-surface-muted">
            {portfolio.proyectos.length}{" "}
            {portfolio.proyectos.length === 1 ? "proyecto" : "proyectos"}
          </span>
        </div>

        <ul className="mt-16 flex flex-col gap-24 sm:gap-32">
          {portfolio.proyectos.map((proyecto, i) => (
            <li key={proyecto.slug}>
              <Reveal>
                <article
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                    i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                  }`}
                >
                  <figure className="relative aspect-4/3 overflow-hidden rounded-2xl bg-surface-alt">
                    <Image
                      src={proyecto.cover.src}
                      alt={proyecto.cover.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </figure>

                  <div>
                    <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-light leading-tight tracking-[-0.01em] sm:text-4xl">
                      {proyecto.name}
                    </h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.14em] text-on-surface-muted">
                      {proyecto.place}
                    </p>
                    <p className="mt-6 max-w-md text-base leading-relaxed text-on-surface-muted">
                      {proyecto.excerpt}
                    </p>

                    <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-hairline pt-6">
                      {[
                        { k: "Año", v: proyecto.year },
                        { k: "Superficie", v: proyecto.surface },
                        { k: "Materia", v: proyecto.material },
                      ]
                        .filter((f) => f.v)
                        .map((f) => (
                          <div key={f.k}>
                            <dt className="text-xs uppercase tracking-[0.16em] text-on-surface-muted">
                              {f.k}
                            </dt>
                            <dd className="mt-1 font-display text-xl font-light">{f.v}</dd>
                          </div>
                        ))}
                    </dl>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Salto al otro portfolio */}
      {otro && (
        <section className="border-t border-hairline">
          <Link
            href={`/proyectos/${otro.slug}`}
            data-portfolio={otro.theme}
            className="group flex items-center justify-between gap-8 bg-surface px-5 py-16 text-on-surface transition-colors sm:px-8 sm:py-24"
          >
            <div>
              <span className="eyebrow text-accent">Ver también</span>
              <p className="mt-4 font-display text-3xl font-light tracking-[-0.01em] sm:text-5xl">
                Proyectos {otro.label}
              </p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-hairline transition-colors duration-300 group-hover:border-transparent group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight className="size-6" />
            </span>
          </Link>
        </section>
      )}
    </div>
  );
}
