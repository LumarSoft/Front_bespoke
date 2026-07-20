import { cn } from "@/lib/utils";

/**
 * Renderiza un ícono PNG (glifo negro sólido, sin fondo) como máscara CSS
 * para poder tintarlo con `currentColor` — así hereda el color del texto
 * (clay, ink, paper, etc.) según la sección donde se use.
 */
export function Icon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block bg-current", className)}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
