import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { FEATURED_PROJECT } from "@/lib/site-data";

export function FeaturedProject() {
  const p = FEATURED_PROJECT;
  const meta: { label: string; value: string }[] = [
    { label: "Autoría", value: p.authorship },
    { label: "Cálculo estructural", value: p.structure },
    { label: "Ejecución", value: p.execution },
    { label: "Fotografía", value: p.photography },
    { label: "Terreno", value: p.land },
    { label: "Construido", value: p.built },
    { label: "Año", value: p.year },
  ];

  return (
    <section id="obra" className="relative bg-ink-soft py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="overline mb-6">Obra destacada</p>
            </Reveal>
            <Reveal variant="clip" delay={80}>
              <h2 className="display text-5xl text-paper sm:text-7xl">
                {p.name}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="max-w-xs text-sm leading-relaxed text-stone-400">
              {p.location}
            </p>
          </Reveal>
        </div>

        {/* Hero image */}
        <Reveal delay={80}>
          <div className="img-zoom relative mt-12 aspect-[16/10] w-full overflow-hidden md:aspect-[16/8]">
            <Image
              src={p.hero}
              alt={`${p.name} — vista principal`}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Body + meta */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-serif text-2xl font-light leading-relaxed text-paper sm:text-[1.75rem]">
                {p.body}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <a
                href={p.publicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.16em] text-paper"
              >
                <span className="border-b border-accent pb-1">
                  Ver publicación en Plataforma Arquitectura
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
              {meta.map((item, i) => (
                <Reveal key={item.label} delay={i * 50}>
                  <dt className="text-[0.68rem] uppercase tracking-[0.18em] text-stone-600">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm text-paper-dim/90">
                    {item.value}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        {/* Secondary gallery */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {p.images.map((src, i) => (
            <Reveal key={src} delay={i * 80}>
              <div className="img-zoom relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={src}
                  alt={`${p.name} — detalle ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
