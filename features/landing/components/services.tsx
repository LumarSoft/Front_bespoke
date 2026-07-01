import { Reveal } from "@/components/ui/reveal";
import { SERVICES } from "@/lib/site-data";

export function Services() {
  return (
    <section id="servicios" className="relative bg-ink-soft py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="overline mb-6">Qué hacemos</p>
            </Reveal>
            <Reveal variant="clip" delay={80}>
              <h2 className="display max-w-3xl text-4xl text-paper sm:text-6xl">
                Del primer diagnóstico a la entrega de obra.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="max-w-xs text-sm leading-relaxed text-stone-400">
              Un acompañamiento integral en cada etapa del proyecto, con foco en
              lo funcional, lo constructivo y lo distributivo.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-[var(--line)]">
          {SERVICES.map((service, i) => (
            <Reveal key={service.index} delay={i * 60}>
              <article className="group grid grid-cols-1 items-baseline gap-4 border-b border-[var(--line)] py-7 transition-colors duration-500 hover:bg-ink md:grid-cols-12 md:gap-8 md:py-8">
                <span className="font-mono text-sm text-accent md:col-span-1">
                  {service.index}
                </span>
                <h3 className="font-serif text-3xl font-light text-paper transition-transform duration-500 group-hover:translate-x-2 md:col-span-4 md:text-4xl">
                  {service.title}
                </h3>
                <p className="text-base leading-relaxed text-paper-dim/75 md:col-span-6 md:col-start-6">
                  {service.description}
                </p>
                <span className="hidden text-right text-stone-600 transition-all duration-500 group-hover:translate-x-1 group-hover:text-paper md:col-span-1 md:block">
                  →
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
