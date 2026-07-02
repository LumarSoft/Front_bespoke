# Bespoke — sitio institucional

Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind v4 + GSAP
(ScrollTrigger, ScrollSmoother, SplitText, Flip, Observer, CustomEase) +
React Three Fiber. Ver `plan.md` para el brief original.

```bash
npm run dev     # localhost:3000
npm run build
npm run lint
```

No hay test runner configurado.

## Dirección de diseño (v2)

La primera pasada era demasiado literal con "muchas imágenes": varias
secciones repetían el mismo truco (columna sticky, laterales con parallax,
grid...) y Proceso/Stats quedaban como bloques de puro texto sin ancla
visual. El enfoque actual:

- **Logo real en uso** (`/public/logo-2048x870.png`): wordmark en trazo fino
  + "arquitectura" en script. Reemplaza los wordmarks de texto placeholder en
  Header, Preloader, Hero y el marquee del Footer.
- **Lenguaje "dibujo técnico"** en vez de fotos donde no hacen falta: grilla
  tipo papel milimetrado + marcas de registro de esquina
  (`.blueprint-grid`/`--dark`, `<DraftingFrame>` en `components/ui/`). Se usa
  en Hero, Servicios, Proceso y CTA — conecta con el motivo de compás/regla
  que ya tiene la "K" del logo, y no depende de fotografía que todavía no
  existe.
- **Momento firma estilo Apple:** en Proceso, un volumen arquitectónico
  procedural se "construye" con el scroll (ver más abajo). Nada de imagen —
  es geometría de Three.js.
- **Menos secciones, cada una con un motivo propio:** "Bespoke, una palabra
  mágica" se fusionó con Estudio (antes eran 2 bloques con imágenes
  redundantes); Stats se fusionó con Proceso (antes quedaba huérfana). De 9
  secciones pasamos a 7.

## Arquitectura de animación

**Fuente única de scroll:** `components/SmoothScrollProvider.tsx` monta
`#smooth-wrapper > #smooth-content` y crea el `ScrollSmoother`. Con
`prefers-reduced-motion`, no se crea el smoother y esos wrappers quedan en
flujo normal (clase `has-smooth-scroll` en `<html>`, ver `app/globals.css`) —
el scroll nativo sigue funcionando intacto.

**GSAP se registra una sola vez** en `lib/gsap.ts` (incluye el ease
`"buttery"` vía `CustomEase`, usado en casi todos los reveals). Importá
siempre desde ahí (`@/lib/gsap`), nunca `import gsap from "gsap"` directo.

**Hooks reutilizables** (`hooks/`):
- `useSplitReveal` — split + reveal accesible (SplitText, aria-label en el
  original, aria-hidden en las unidades generadas). Soporta `scrub`,
  `fromOpacity` (para el reveal palabra-por-palabra de "Bespoke, una palabra
  mágica"), y gating por `matchMedia` (mobile/reduced-motion).
- `useImageReveal` — clip-path mask reveal + scale + parallax opcional, usado
  por `<RevealImage>`.
- `useMagnetic` — botón que sigue el cursor con lag (usa `contextSafe`).
- `useScrollProgress` — progreso 0→1 de un elemento vía `ScrollTrigger`, para
  pines y crossfades (columna sticky de Estudio).

**Capa WebGL global:** un solo `<Canvas>` (`components/WebGLCanvas.tsx`),
fixed fullscreen, `z-index` negativo, `pointer-events: none`, importado con
`next/dynamic({ ssr: false })`, con fondo `bg-noir` propio (no depende del
`<body>`). Lee `lib/scrollState.ts` (progreso/velocidad escritos por
`SmoothScrollProvider`) dentro de `useFrame`. En mobile o
`prefers-reduced-motion` se reemplaza por un degradé estático. Solo se ve
donde el DOM es transparente — hoy, únicamente el Hero (por eso el Hero es la
única sección oscura fuera de Servicios/Proceso/CTA, que son oscuras por
diseño propio, con fondo opaco).

**Escena local de Proceso** (`components/webgl/BlueprintScene.tsx`, *no* es
la capa global): un `<Canvas>` propio, montado solo dentro de la sección
Proceso. Un `gridHelper` (blueprint/plano) y 3 volúmenes procedurales
(`BoxGeometry` + `EdgesGeometry`, sin assets externos) se extruden desde 0 a
su altura final según un `progressRef` — el mismo `ScrollTrigger` pinneado
que mueve los pasos del proceso escribe ahí su progreso 0→1 en cada
`onUpdate`. La cámara también interpola posición/ángulo con ese progreso
(`CameraRig`), de una vista de plano cenital a una vista 3/4 más cinemática.
Al llegar a `STATS_START` (82% del scroll pinneado), los pasos se ocultan y
las stats (contadores) aparecen como HUD superpuesto — así el modelo
"terminado" y las métricas del estudio se leen juntos. En mobile/
`prefers-reduced-motion` no se monta el Canvas ni se pinnea nada: los 4 pasos
y las stats quedan en flujo normal, con contadores on-enter simples (mismo
patrón que usaba la vieja sección Stats). El toggle entre ambos modos es
puramente CSS (`.is-pinned`, ver `app/globals.css`), para no arriesgar
mismatches de hidratación.

**Portfolio** además monta un `<Canvas>` chico por card
(`components/webgl/DistortCard.tsx`) *solo mientras dura el hover* — shader
de distorsión (ripple + chromatic shift) que sigue al cursor. Sin `src` dibuja
un patrón procedural (mismo lenguaje visual del placeholder rayado de
`<RevealImage>`); con `src`, distorsiona la textura real vía
`useLoader(THREE.TextureLoader, ...)`.

**Preloader** (`components/Preloader.tsx`): corre una sola vez por sesión
(`sessionStorage`), cuenta 0→100, revela el logo real por máscara, y desliza
el curtain hacia arriba. Llama `ScrollTrigger.refresh()` recién en
`onComplete`, para que los triggers midan el layout ya final.

## Componentes de imagen

- **`<RevealImage>`** (`components/ui/RevealImage.tsx`): `next/image` +
  reveal por máscara + parallax opcional. **Sin `src`, dibuja el contenedor
  rayado** con el nombre de archivo esperado — así se ve dónde va cada foto
  real. Quedan pocos slots a propósito (columna sticky de Estudio, grilla y
  galería de Portfolio, preview en hover de Servicios) — ver
  `public/images/README.md`.
- **`<ClipText>`** (`components/ui/ClipText.tsx`): texto knockout
  (`background-clip: text`). Ya no se usa para el wordmark "BESPOKE" (ahora
  es el logo real), pero queda disponible para títulos grandes con foto real
  más adelante (ej. un case-study de portfolio).
- **`<DraftingFrame>`** (`components/ui/DraftingFrame.tsx`): marcas de
  registro de esquina + cajetín, estilo lámina de plano técnico. Reemplaza la
  necesidad de una foto en Servicios/Proceso/CTA.

## Logo

`/public/logo-2048x870.png` es el logo real (blanco, trazo fino). Se usa en
Header, Preloader, Hero y el marquee del Footer. Por ser blanco, esas
secciones tienen fondo oscuro constante para que siempre tenga contraste —
ver `public/images/README.md` si en algún momento sumás una variante oscura.

## Tunear duraciones / eases / mobile

- Ease global: `CustomEase` `"buttery"` en `lib/gsap.ts`
  (`cubic-bezier(0.16, 1, 0.3, 1)`). Cambiarlo ahí lo actualiza en todo el
  sitio.
- Cada hook expone `duration`, `stagger`, `ease`, `start` como props — no hay
  valores mágicos hardcodeados en los componentes de sección.
- Los breakpoints de `matchMedia` están centralizados en
  `lib/motionPrefs.ts` (`MQ_DESKTOP`, `MQ_MOBILE`, `MQ_REDUCED_MOTION`).
  Todos los hooks y secciones con lógica responsive los importan de ahí.
- El volumen/velocidad de construcción en Proceso se ajusta en
  `components/webgl/BlueprintScene.tsx` (`VOLUMES`: `startAt`/`endAt` por
  volumen) y en `components/sections/Proceso.tsx` (`STATS_START`).
- Regla de performance: solo se anima `transform`/`opacity` (nunca layout).
  Si agregás una animación nueva, seguí el mismo criterio.

## Notas

- `THREE.Clock: This module has been deprecated` en consola es un warning
  interno de `@react-three/fiber` (usa `state.clock` interno), no afecta
  nada — se resolverá solo cuando R3F actualice su Clock a `THREE.Timer`.
- El aviso de Next `Image ... detected as the LCP` apunta a una de las 8
  copias del logo en el marquee del Footer (heurística de Next confundida por
  el ancho total del marquee, no por visibilidad real). Están `loading="lazy"`
  a propósito por estar fuera del viewport inicial — no le agregues
  `priority`, sería peor para performance real.
- Verificado: `tsc --noEmit`, `npm run lint` y `npm run build` (prerenderiza
  como página estática) sin errores. No pude verificar visualmente en
  navegador en esta sesión (extensión de Chrome no conectada) — vale la pena
  abrir `npm run dev` y mirar en vivo, sobre todo la escena de Proceso.
