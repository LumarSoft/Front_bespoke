"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { Proyecto } from "@/lib/content";

/**
 * Una obra del portfolio: la tarjeta rectangular que se ve en la página y el
 * visor de su galería.
 *
 * Van juntos en el mismo componente porque hay dos disparadores para lo mismo
 * —la foto y el botón "Ver las N fotos"— y viven en columnas distintas de la
 * tarjeta. Separarlos obligaría a subir el estado a la página entera.
 *
 * El visor es un `<dialog>` abierto con `showModal()`, no un div con z-index
 * alto. La diferencia importa acá: el elemento va a la *top layer* del
 * navegador, así que queda por encima del navbar (z-50) y del grano global
 * (z-100) sin pelear ninguna capa; además trae gratis el cierre con Escape, el
 * atrapado del foco y el `::backdrop`.
 *
 * Peso: en la página sólo carga la portada. El resto de las fotos vive dentro
 * del diálogo cerrado, que es `display: none`, así que el navegador no las
 * descarga hasta que alguien lo abre. Una obra de once fotos no cuesta nada
 * hasta que se mira.
 */
export default function ObraCard({
  proyecto,
  indice,
}: {
  proyecto: Proyecto;
  /** Posición dentro del portfolio: numera la obra y decide de qué lado va la foto. */
  indice: number;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [abierta, setAbierta] = useState<number | null>(null);

  // La portada encabeza la galería y el resto va detrás, sin repetirla.
  const fotos = [
    proyecto.cover,
    ...proyecto.gallery.filter((f) => f.src !== proyecto.cover.src),
  ];
  const foto = abierta === null ? null : fotos[abierta];

  /**
   * Abre siempre en la portada: es la foto que la persona acaba de mirar en la
   * tarjeta, así que el visor arranca donde estaba su atención.
   */
  const abrir = useCallback(() => setAbierta(0), []);
  const cerrar = useCallback(() => setAbierta(null), []);

  const mover = useCallback(
    (paso: number) =>
      setAbierta((i) =>
        i === null ? i : (i + paso + fotos.length) % fotos.length,
      ),
    [fotos.length],
  );

  // Abrir y cerrar el diálogo de verdad, no sólo pintar el estado: es lo que
  // activa la top layer y el atrapado del foco.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (abierta !== null && !dialog.open) dialog.showModal();
    if (abierta === null && dialog.open) dialog.close();
  }, [abierta]);

  // El fondo no debe scrollear detrás del visor. Mismo criterio que el menú
  // mobile del navbar; `showModal()` bloquea la interacción pero no el scroll.
  useEffect(() => {
    if (abierta === null) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previo;
    };
  }, [abierta]);

  // Flechas para recorrer la obra sin volver a la página.
  useEffect(() => {
    if (abierta === null) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  }, [abierta, mover]);

  /**
   * Deslizar en touch. Se registra el punto de contacto y, si el gesto es
   * claramente horizontal y supera los 50px, se pasa de foto. El umbral evita
   * que un movimiento vertical algo torcido cambie la imagen sin querer.
   */
  const inicioTouch = useRef<{ x: number; y: number } | null>(null);

  /**
   * Cerrar al tocar fuera de la foto.
   *
   * No alcanza con escuchar el click sobre el `<dialog>`: su contenido ocupa
   * todo el alto, así que el vacío que rodea a la imagen pertenece a un div
   * hijo y el evento nunca llega al diálogo. Por eso se cierra ante cualquier
   * click que no haya caído sobre la foto ni sobre un control.
   */
  const cerrarSiEsFuera = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest("button, img")) cerrar();
  };

  const alternada = indice % 2 === 1;

  return (
    <>
      {/*
        Tarjeta rectangular. La foto va embutida dentro del panel, con aire
        alrededor, y no estirada a todo el alto de la tarjeta: al forzarla a
        acompañar el largo del texto quedaba un recorte altísimo y angosto que
        se comía la composición de la toma. Conserva su 4:3 y el fondo de la
        tarjeta hace de margen.

        Las dos columnas miden lo mismo a propósito: como la foto alterna de
        lado con `order`, columnas de anchos distintos harían que la imagen
        cambiara de tamaño de una obra a la siguiente.
      */}
      <article className="grid gap-8 rounded-3xl bg-surface-alt p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
        <div className={alternada ? "lg:order-2" : ""}>
          <button
            type="button"
            onClick={abrir}
            aria-label={`Ver las ${fotos.length} fotos de ${proyecto.name}`}
            className="group relative block aspect-4/3 w-full cursor-zoom-in overflow-hidden rounded-2xl"
          >
            <Image
              src={proyecto.cover.src}
              alt={proyecto.cover.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            {/* Que se note que la foto se puede abrir, sin taparla. */}
            <span className="pointer-events-none absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="m-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.16em] text-negro">
                <Expand className="size-4" />
                Ver las {fotos.length} fotos
              </span>
            </span>
          </button>

          {/*
            Las fichas van bajo la foto y no al pie del texto. Son dato duro
            —dónde y cuánto—, así que acompañan a la imagen; del otro lado
            queda el relato corrido, sin nada que lo interrumpa. De paso las
            dos columnas terminan con alturas parecidas.

            Las etiquetas no son fijas: cada portfolio trae las suyas
            (Alcance/Espacios en Residencial, Ubicación/Superficie en
            Comercial).
          */}
          {proyecto.datos.some((d) => d.value) && (
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-hairline pt-6">
              {proyecto.datos
                .filter((d) => d.value)
                .map((d) => (
                  <div key={d.label}>
                    <dt className="text-xs uppercase tracking-[0.16em] text-on-surface-muted">
                      {d.label}
                    </dt>
                    <dd className="mt-1 font-display text-xl font-light">
                      {d.value}
                    </dd>
                  </div>
                ))}
            </dl>
          )}
        </div>

        <div className="flex flex-col">
          <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-accent">
            {String(indice + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 font-display text-3xl font-light leading-tight tracking-[-0.01em] sm:text-4xl">
            {proyecto.name}
          </h3>
          <p className="mt-3 text-sm uppercase tracking-[0.14em] text-on-surface-muted">
            {proyecto.place}
          </p>

          {/*
            El texto de cada obra llega de la planilla del cliente en dos
            bloques —el problema y cómo se resolvió—, así que se muestran como
            tales y no fundidos en un párrafo suelto.
          */}
          <div className="mt-7 mb-10 flex flex-col gap-5">
            {[
              { k: "El desafío", v: proyecto.desafio },
              { k: "La propuesta", v: proyecto.propuesta },
            ]
              .filter((b) => b.v)
              .map((b) => (
                <div key={b.k}>
                  <h4 className="text-xs uppercase tracking-[0.16em] text-accent">
                    {b.k}
                  </h4>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-on-surface-muted">
                    {b.v}
                  </p>
                </div>
              ))}
          </div>

          {/*
            El mismo destino que la foto, pero explícito. La foto sola sostiene
            el efecto sobre el mouse y no dice nada en touch, donde no hay
            hover: este botón es la única invitación que ve alguien en celular.
            El `mt-auto` lo ancla al pie de la columna.
          */}
          <button
            type="button"
            onClick={abrir}
            className="group mt-auto inline-flex w-fit items-center gap-3 self-start rounded-full border border-hairline py-2 pl-5 pr-2 text-xs uppercase tracking-[0.16em] transition-colors duration-300 hover:border-transparent hover:bg-accent hover:text-white"
          >
            <span className="py-1">Ver las {fotos.length} fotos</span>
            <span className="grid size-8 place-items-center rounded-full bg-accent text-white transition-colors duration-300 group-hover:bg-white/20">
              <Expand className="size-4" />
            </span>
          </button>
        </div>
      </article>

      <dialog
        ref={dialogRef}
        // `cancel` es Escape; `close` cubre cualquier otro cierre nativo. Sin
        // esto el diálogo se cerraría en el DOM pero el estado seguiría abierto
        // y no se podría volver a abrir.
        onCancel={cerrar}
        onClose={cerrar}
        onClick={cerrarSiEsFuera}
        onTouchStart={(e) => {
          const t = e.touches[0];
          inicioTouch.current = { x: t.clientX, y: t.clientY };
        }}
        onTouchEnd={(e) => {
          const inicio = inicioTouch.current;
          if (!inicio) return;
          inicioTouch.current = null;
          const t = e.changedTouches[0];
          const dx = t.clientX - inicio.x;
          const dy = t.clientY - inicio.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            mover(dx < 0 ? 1 : -1);
          }
        }}
        aria-label={`Fotos de ${proyecto.name}${foto ? `: ${foto.alt}` : ""}`}
        className="visor"
      >
        {foto && (
          <div className="flex h-full w-full flex-col">
            <div className="flex shrink-0 items-center justify-between gap-6 px-4 py-4 text-paper sm:px-8">
              <span className="text-xs uppercase tabular-nums tracking-[0.2em] text-paper/60">
                {(abierta ?? 0) + 1} / {fotos.length}
              </span>
              <button
                type="button"
                onClick={cerrar}
                aria-label="Cerrar"
                className="grid size-11 place-items-center rounded-full border border-white/20 text-paper transition-colors hover:border-transparent hover:bg-white/15"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
              <Image
                // `key` fuerza a React a montar una imagen nueva en cada
                // cambio, y con el nodo nuevo vuelve a correr el fundido de
                // entrada. Sin esto React reusa el mismo <img> y el cambio es
                // un corte seco.
                key={foto.src}
                src={foto.src}
                alt={foto.alt}
                width={foto.width}
                height={foto.height}
                quality={90}
                sizes="100vw"
                className="visor__foto max-h-full w-auto max-w-full object-contain"
              />

              {fotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => mover(-1)}
                    aria-label="Foto anterior"
                    className="absolute left-1 grid size-11 place-items-center rounded-full border border-white/20 text-paper transition-colors hover:border-transparent hover:bg-white/15 sm:left-5 sm:size-14"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => mover(1)}
                    aria-label="Foto siguiente"
                    className="absolute right-1 grid size-11 place-items-center rounded-full border border-white/20 text-paper transition-colors hover:border-transparent hover:bg-white/15 sm:right-5 sm:size-14"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}
            </div>

            <p className="shrink-0 px-4 pt-4 text-center text-sm text-paper/60 sm:px-8">
              {foto.alt}
            </p>

            {/*
              Tira de miniaturas: con once fotos, ir de a una con las flechas es
              tedioso. Van a 160px de ancho —unos pocos KB cada una— y sólo se
              descargan cuando el visor ya está abierto.
            */}
            {fotos.length > 1 && (
              <ul className="flex shrink-0 gap-2 overflow-x-auto px-4 py-5 sm:justify-center sm:px-8">
                {fotos.map((f, i) => (
                  <li key={f.src}>
                    <button
                      type="button"
                      onClick={() => setAbierta(i)}
                      aria-label={`Ir a la foto ${i + 1}`}
                      aria-current={i === abierta}
                      className={`block h-14 w-20 shrink-0 overflow-hidden rounded-md transition-opacity duration-300 ${
                        i === abierta
                          ? "opacity-100 ring-2 ring-paper"
                          : "opacity-45 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={f.src}
                        alt=""
                        width={160}
                        height={112}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
