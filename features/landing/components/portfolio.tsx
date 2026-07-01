import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { PROJECTS, type Project } from "@/lib/site-data";

function spanClasses(span: Project["span"]): string {
  switch (span) {
    case "tall":
      return "md:row-span-2";
    case "wide":
      return "md:col-span-2";
    default:
      return "";
  }
}

export function Portfolio() {
  return (
    <section id="proyectos" className="relative bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="overline mb-6">Proyectos seleccionados</p>
            </Reveal>
            <Reveal variant="clip" delay={80}>
              <h2 className="display max-w-2xl text-4xl text-paper sm:text-6xl">
                Cada obra, una solución única.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <a
              href="#contacto"
              className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.16em] text-stone-400 transition-colors hover:text-paper"
            >
              Ver más
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(220px,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal
              key={project.src}
              delay={(i % 3) * 80}
              className={`group relative overflow-hidden ${spanClasses(
                project.span,
              )}`}
            >
              <div className="img-zoom relative h-full w-full">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 translate-y-2 p-6 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-serif text-xl text-paper">
                  {project.caption}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                  {project.place}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
