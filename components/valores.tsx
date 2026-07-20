import { values } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

export default function Valores() {
  return (
    <section id="valores" className="relative bg-bone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="eyebrow text-clay">Lo que nos define</span>
        </Reveal>

        <div className="mt-10 grid gap-10 border-t border-ink/10 pt-10 sm:grid-cols-3 sm:gap-12">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={0.05 * i}>
              <Icon src={v.icon} className="size-10 text-clay" />
              <h3 className="mt-5 font-display text-xl font-light tracking-tight text-ink sm:text-2xl">
                {v.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {v.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
