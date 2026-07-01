import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "./contact-form";
import { CONTACT } from "@/lib/site-data";

export function Contact() {
  return (
    <section id="contacto" className="relative bg-ink-soft py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — invitation + details */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="overline mb-6">Contacto</p>
            </Reveal>
            <Reveal variant="clip" delay={80}>
              <h2 className="display text-4xl text-paper sm:text-6xl">
                Diseñemos algo
                <br />
                <span className="italic text-stone-400">a tu medida.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-paper-dim/80">
                Contanos tu proyecto y coordinemos una primera charla. Cada gran
                obra empieza con una conversación.
              </p>
            </Reveal>

            <div className="mt-12 space-y-8">
              <Reveal delay={80}>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-600">
                    Estudio
                  </p>
                  <p className="mt-2 text-paper-dim">{CONTACT.address}</p>
                  <p className="text-paper-dim">{CONTACT.city}</p>
                </div>
              </Reveal>
              <Reveal delay={140}>
                <div className="flex flex-wrap gap-x-12 gap-y-8">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-600">
                      Teléfono
                    </p>
                    <a
                      href={CONTACT.phoneHref}
                      className="mt-2 block text-paper transition-colors hover:text-accent"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-600">
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="mt-2 block text-paper transition-colors hover:text-accent"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={180}>
                <div className="flex gap-4">
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[var(--line-strong)] px-6 py-2.5 text-sm uppercase tracking-[0.14em] text-paper transition-colors hover:bg-paper hover:text-ink"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[var(--line-strong)] px-6 py-2.5 text-sm uppercase tracking-[0.14em] text-paper transition-colors hover:bg-paper hover:text-ink"
                  >
                    Instagram
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <Reveal delay={100} className="lg:pl-10">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
