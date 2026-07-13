export interface DraftingFrameProps {
  /** Etiqueta estilo "cajetín" de plano técnico, ej. "02 / SERVICIOS". */
  label?: string;
  dark?: boolean;
  className?: string;
}

/**
 * Marcas de registro de esquina + cajetín, como una lámina de plano técnico.
 * Reemplaza la necesidad de una foto en secciones de solo texto (Servicios,
 * Proceso, CTA): el padre debe ser `relative`.
 */
export default function DraftingFrame({ label, dark = false, className = "" }: DraftingFrameProps) {
  const color = dark ? "text-hueso" : "text-noir";

  return (
    <div className={`pointer-events-none absolute inset-0 ${color} ${className}`} aria-hidden="true">
      <span className="drafting-corner drafting-corner--tl" />
      <span className="drafting-corner drafting-corner--tr" />
      <span className="drafting-corner drafting-corner--bl" />
      <span className="drafting-corner drafting-corner--br" />
      {label && (
        <span className="absolute bottom-5 right-8 font-sans text-[0.65rem] uppercase tracking-[0.3em] opacity-40">
          {label}
        </span>
      )}
    </div>
  );
}
