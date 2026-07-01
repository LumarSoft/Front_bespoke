import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ABOUT_IMAGE, STATS } from "@/lib/site-data";

export function About() {
  return (
    <section id="estudio" className="relative bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — concept */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="overline mb-8">El estudio · Una palabra mágica</p>
            </Reveal>
            <Reveal variant="clip" delay={80}>
              <h2 className="display text-4xl text-paper sm:text-6xl">
                Bespoke significa{" "}
                <span className="italic text-stone-400">“hecho a medida”.</span>
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-8 text-base leading-relaxed text-paper-dim/85 md:grid-cols-2 md:text-[1.05rem]">
              <Reveal delay={120}>
                <p>
                  Es un concepto de sastrería tradicional donde todo el proceso
                  se realiza artesanalmente y de manera exclusiva para un
                  cliente en concreto. Nos apropiamos de esa idea para crear una
                  arquitectura exclusiva y personalizada.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  Somos un estudio independiente especializado en el diseño, la
                  gestión y la dirección de proyectos residenciales y
                  comerciales. Un equipo interdisciplinario que aporta una
                  visión global a cada proyecto, con resultados de alta calidad.
                </p>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <blockquote className="mt-12 border-l border-accent pl-6 font-serif text-2xl font-light italic leading-snug text-paper sm:text-[2rem]">
                “Los detalles no son objetos decorativos: son decisiones que
                forman parte del proyecto.”
              </blockquote>
            </Reveal>
          </div>

          {/* Right — portrait */}
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="img-zoom relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={ABOUT_IMAGE}
                  alt="Arq. Cintia Colazzo, directora de Bespoke Arquitectura"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="font-serif text-xl text-paper">
                    Arq. Cintia Colazzo
                  </p>
                  <p className="text-sm uppercase tracking-[0.2em] text-stone-400">
                    Dirección del estudio
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden border-y border-[var(--line)] md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 90}
              className="bg-ink px-4 py-8 text-center md:py-10"
            >
              <p className="display text-4xl text-paper md:text-6xl">
                {stat.value}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-stone-500">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
