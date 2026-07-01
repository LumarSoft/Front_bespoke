import { Reveal } from "@/components/ui/reveal";
import { PRINCIPLES } from "@/lib/site-data";

export function Approach() {
  return (
    <section id="metodo" className="relative bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="overline mb-6">Cómo trabajamos</p>
              </Reveal>
              <Reveal variant="clip" delay={80}>
                <h2 className="display text-4xl text-paper sm:text-6xl">
                  Un método que cuida cada&nbsp;
                  <span className="italic text-stone-400">decisión.</span>
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-8 max-w-md text-base leading-relaxed text-paper-dim/80">
                  Prestamos especial atención a las pequeñas decisiones. Cada
                  rincón, cada elemento y cada proyecto son una solución única a
                  una necesidad específica.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden border border-[var(--line)] sm:grid-cols-2">
              {PRINCIPLES.map((principle, i) => (
                <Reveal
                  key={principle.title}
                  delay={i * 90}
                  className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft md:p-10"
                >
                  <span className="font-mono text-xs text-stone-600">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-light text-paper">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-paper-dim/70">
                    {principle.description}
                  </p>
                  <span className="mt-6 block h-px w-8 origin-left bg-accent transition-all duration-500 group-hover:w-16" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
