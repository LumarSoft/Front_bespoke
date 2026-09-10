import { cn } from "@/lib/utils";

/**
 * Titular de jerarquía mixta — el tratamiento que el cliente pidió conservar
 * de la sección Estudio y replicar en Método.
 *
 * Todo es Montserrat, la primaria del manual de identidad. El contraste sale
 * de los recursos que el propio manual usa: peso (Light → Black), tamaño,
 * itálica e interletrado. El manual (pág. 16) señala justamente que Montserrat
 * "permite construir una identidad sólida sin necesidad de combinar demasiadas
 * tipografías", así que mezclar familias acá sería ir en contra de la marca.
 *
 *   black    — Montserrat Black, el peso máximo de la frase
 *   regular  — Montserrat Light, el cuerpo del titular
 *   italic   — itálica ligera en terracota: la palabra clave
 *   versal   — versalitas con interletrado abierto, el gesto del logotipo
 *   minuscula — el mismo gesto en caja baja (el «de» de "de habitar")
 */
export type Tone = "black" | "regular" | "italic" | "versal" | "minuscula";
export type Fragment = { text: string; tone: string };

const TONE_CLASS: Record<Tone, string> = {
  black: "font-display font-black tracking-[-0.03em]",
  regular: "font-display font-light",
  italic: "type-emphasis text-accent",
  versal: "versalitas text-[0.42em] align-middle",
  minuscula: "versalitas-min text-[0.42em] align-middle",
};

function toneClass(tone: string) {
  return TONE_CLASS[(tone as Tone) in TONE_CLASS ? (tone as Tone) : "regular"];
}

export default function MixedHeading({
  lines,
  className,
  as: Tag = "h2",
}: {
  lines: readonly (readonly Fragment[])[];
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const label = lines.map((l) => l.map((f) => f.text).join(" ")).join(" ");

  return (
    <Tag
      aria-label={label}
      className={cn("leading-[1.05] tracking-[-0.02em]", className)}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((fragment, fi) => (
            <span
              key={fi}
              aria-hidden
              className={cn("mr-[0.22em] inline-block", toneClass(fragment.tone))}
            >
              {fragment.text}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
