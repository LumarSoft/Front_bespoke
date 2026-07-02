Actuá como un dev senior especializado en sitios web "award-winning" (nivel Awwwards/FWA) con foco en motion design y WebGL. Vas a construir el sitio institucional de BESPOKE, un estudio de arquitectura y construcción. El sitio tiene que sentirse artístico, editorial, premium y estar REPLETO de animaciones de revelado sofisticadas ligadas al scroll, con mucha presencia de imágenes tratadas de forma creativa.

## Proyecto y stack

Ya tengo un proyecto Next.js recién creado (App Router, TypeScript, Tailwind CSS v4, Turbopack). NO regeneres el proyecto. Primero verificá que el stack esté OK (Tailwind v4 con config CSS-first: `@import "tailwindcss"` + `@theme` en globals.css). Después construí.

Dependencias a instalar (verificá versiones estables antes; Next 16 usa React 19, así que R3F v9):
`gsap @gsap/react three @react-three/fiber @react-three/drei @types/three` (opcional `@react-three/postprocessing`).

Motor de animación: GSAP (hoy 100% gratis, TODOS los plugins vienen en el paquete `gsap`). Plugins: ScrollTrigger, ScrollSmoother, SplitText, Flip, Observer, CustomEase.
Smooth scroll: usá ScrollSmoother de GSAP. NADA de Lenis. NADA de Framer Motion.
Tipografías con next/font. Logo e imágenes con next/image.

## Reglas técnicas GSAP + Next App Router (críticas)

- Todo componente que use GSAP lleva "use client".
- Registrá plugins UNA sola vez a nivel módulo: gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText, Flip, Observer, CustomEase).
- Usá el hook useGSAP({ scope: ref }) (cleanup automático). Para animaciones en event handlers (click/hover) usá el contextSafe que devuelve useGSAP.
- SSR-safe: nunca toques window/document en render; solo dentro de useGSAP/useEffect.
- ScrollSmoother exige la estructura DOM #smooth-wrapper > #smooth-content envolviendo el contenido. Montá esto en un provider client en el layout.
- Accesibilidad/responsive: usá gsap.matchMedia() para atenuar/desactivar animaciones pesadas en mobile y respetar prefers-reduced-motion (si está activo, mostrá todo sin animar). En SplitText: aria-label en el contenedor original, aria-hidden en chars/words, split.revert() en cleanup, re-split en resize (observeChanges de SplitText 3.13+).
- Performance: animá SOLO transform/opacity (x/y/scale/autoAlpha), nunca layout. will-change donde corresponda. Blur solo desktop.
- Con preloader, llamá ScrollTrigger.refresh() recién cuando termine.

## three.js / WebGL (capa 3D, sin romper el smooth scroll)

- Un solo <Canvas> para todo el sitio, montado como capa FIJA a pantalla completa por detrás del DOM (fixed; inset:0; z-index bajo; pointer-events:none salvo donde haga falta interacción).
- SSR: el componente del Canvas va con "use client" e importado SIEMPRE con next/dynamic { ssr:false }. Si no, hidratación rota.
- Fuente de scroll ÚNICA = ScrollSmoother. NO uses ScrollControls de drei ni r3f-scroll-rig. Leé el progreso del scroll (ScrollSmoother.scrollTop() o el progress de un ScrollTrigger) y escribilo en un ref compartido que el Canvas consume dentro de useFrame para mover cámara/uniforms. El scroll lo maneja el DOM; el WebGL solo reacciona.
- Config Canvas: dpr={[1,2]}, gl={{ antialias:true, alpha:true }}, camera con fov moderado, <Suspense fallback={null}>.
- Perf/accesibilidad: gsap.matchMedia() para bajar dpr o desactivar el 3D en mobile; con prefers-reduced-motion freezá el frameloop o mostrá fallback estático. frameloop="demand" cuando no anime. gl.dispose() en unmount. Lazy-load con Suspense.

## Logo

- Está en /public/logo-2048x870.png (horizontal, ratio ~2.35:1).
- Inspeccioná el archivo para detectar colores dominantes y si es claro u oscuro, y construí TODA la paleta alrededor de eso.
- Usalo con next/image. Animá su revelado en el hero (clip-path/mask reveal + fade) y hacé que se encoja y se fije en el header sticky al scrollear (Flip, o scrub simple si Flip complica).

## Contenido real de marca (USAR TEXTUAL, no inventes reemplazos)

Nombre: Bespoke (estudio de arquitectura).

Sección "Bespoke, una palabra mágica":
"Bespoke significa 'hecho a medida'. Es un concepto de sastrería completamente tradicional, en el que todo el proceso se realiza artesanalmente y de manera exclusiva para un cliente en concreto. Nos apropiamos de este concepto para crear una arquitectura exclusiva y personalizada. En la que sostenemos procesos de diseño donde cada detalle se estudia exclusivamente para lograr un diseño único cumpliendo estándares de calidad internacional."

Sección "Estudio / Nosotros":
"Bespoke arquitectura es un estudio independiente especializado en el diseño, la gestión y la dirección de proyectos residenciales y comerciales de diferentes escalas. Formamos un equipo interdisciplinario, dinámico y eficiente, integrado por profesionales que aportan una visión global a cada proyecto obteniendo resultados de alta calidad. Prestamos especial atención a las pequeñas decisiones, cada rincón, cada elemento, cada uno de los proyectos que diseñamos y concebimos en Bespoke son una solución única a una necesidad específica. Creemos que los detalles no son simples objetos decorativos, son decisiones que forman parte del proyecto, representan todo aquello que uno imagina e incluso siente."

Servicios/enfoque (derivá de los textos, ajustables): Diseño · Gestión · Dirección de proyectos. Escalas: Residencial y Comercial.
El resto del copy (hero, CTA, footer, labels) escribilo vos en el mismo tono: sobrio, artesanal, "hecho a medida", premium, en español.

## Dirección de diseño (artístico / editorial / premium)

- Paleta monocromática/neutra derivada del logo (off-white/hueso, grises cálidos, casi-negro) + como mucho 1 color de acento. Mucho aire y whitespace, grilla marcada, asimetría intencional.
- Tipografía de alto contraste: display grande (grotesque o serif editorial) para titulares + sans limpia para el cuerpo. Titulares ENORMES, tracking cuidado.
- Estética "quiet luxury": elegante y sobria, con momentos puntuales de alto impacto. Que NO parezca plantilla.

## IMÁGENES — protagonista visual (muy importante, quiero MUCHAS imágenes bien tratadas)

El sitio tiene que respirar imágenes, usadas de forma creativa y "flashera" pero con criterio (nada kitsch: la contención monocroma + la escala grande + el whitespace son lo que lo mantienen elegante). Implementá estos tratamientos y repartilos por todo el sitio:

- Texto con imagen ADENTRO de las letras (knockout / clipped text): titulares gigantes donde la imagen (o video) se ve a través de las letras con background-clip:text / mask. Bonus: que la imagen haga parallax dentro de las letras al scrollear.
- Imágenes como FONDO de bloques de texto: secciones con imagen full-bleed detrás y el texto encima (con overlay/gradiente sutil o mix-blend para legibilidad) y parallax por capas.
- Reveal de imágenes por máscara (clip-path inset) al entrar en viewport, con leve scale.
- Columnas de imagen STICKY que se van reemplazando mientras el texto scrollea al lado (scroll-driven image swap).
- Galería masonry/mosaico + un marquee horizontal infinito de imágenes.
- El texto como "ventana": imagen que se revela por detrás del texto al scrollear (el bloque de texto actúa de máscara).
- Tratamiento coherente: base monocroma/duotono en la paleta, con momentos puntuales a todo color para impacto.
- En Portfolio, además, el efecto image-to-WebGL en hover (plano con shader que se distorsiona siguiendo el cursor).
  Implementación de imágenes: creá un componente reutilizable <RevealImage> (next/image + máscara clip-path + parallax opcional) y un <ClipText> para el texto con imagen. Repartí MUCHOS slots de imagen por sección (generoso). Como todavía no tengo las fotos reales, usá placeholders con la proporción correcta (bloques de color o imágenes dummy) y armá una estructura clara en /public/images con TODOs para que yo las reemplace fácil.

## Secciones y animaciones firma

1. Preloader / intro (solo primera carga): contador 0→100 o barra, logo con reveal por máscara, y "cortina" que sube revelando el hero.
2. Header sticky que se transforma: logo grande→chico al scrollear. Nav con underline sweep en hover.
3. Custom cursor: círculo con lag, se agranda / mix-blend en links e imágenes, magnético en botones. Desactivado en touch.
4. Hero full-bleed: titular kinético con SplitText (reveal línea por línea + chars con stagger). Fondo WebGL sutil (plano con displacement/ruido por shader o partículas finas) que reacciona al mouse y al scroll. Idealmente el nombre "BESPOKE" en knockout text con imagen adentro. Indicador de scroll animado.
5. "Bespoke, una palabra mágica": el texto real revelado palabra por palabra ligado al scroll (scrub, opacity 0.1→1, ease "none"). Acompañá con imágenes de fondo/laterales con parallax y un momento de clipped-text.
6. Estudio / Nosotros: el texto real, con columna de imágenes sticky que se van reemplazando mientras se lee. Reveals en stagger.
7. Servicios (Diseño / Gestión / Dirección): items con clip-path o line reveal en stagger; en hover, imagen que aparece siguiendo el cursor.
8. Proyectos / Portfolio: grilla con reveals por máscara + hover zoom con overlay + efecto image-to-WebGL. Sumá una galería HORIZONTAL pinneada (ScrollTrigger pin + scrub) que se recorre con scroll vertical. Placeholders + TODOs.
9. Proceso / Timeline: pasos pinneados que avanzan con el scroll; líneas SVG que se "dibujan" con strokeDashoffset.
10. Números / Stats: contadores que animan al entrar en viewport.
11. CTA / Contacto: titular grande con reveal + botón magnético. Formulario simple (handlers, sin <form> real si complica).
12. Footer: marquee infinito (gsap.utils.wrap u Observer) con "BESPOKE" gigante, idealmente en clipped text con imagen.
13. Si hay varias rutas: transición de página con overlay wipe de GSAP.

Opcional (detrás de un flag): visor de modelo GLTF de una obra insignia con useGLTF de drei (Environment preset + luz direccional), .glb en /public con TODO. Postprocessing MUY sobrio (bloom apenas perceptible o grano).

## Reveals transversales (aplicá consistente)

- Texto de sección: SplitText line/word reveal on enter.
- Imágenes: clip-path/scale mask reveal on enter (vía <RevealImage>).
- Parallax por capas con scrub en secciones clave.
- Stagger en grillas y listas.
- Easings propios con CustomEase para sensación "buttery".

## Cómo trabajar y entregables

- Planificá primero la estructura de archivos y la config de GSAP/ScrollSmoother/WebGL/preloader; después construí sección por sección.
- Componentizá bien (Preloader, SmoothScrollProvider, WebGLCanvas [dynamic ssr:false], Header, Cursor, Hero, cada sección, Footer). Hooks reutilizables: useSplitReveal, useImageReveal, useMagnetic, useScrollProgress. Componentes: <RevealImage>, <ClipText>.
- Usá el copy real donde lo di; el resto en el mismo tono, en español.
- Al terminar, dejá el sitio corriendo con `npm run dev` SIN errores de hidratación ni SSR, con smooth scroll + ScrollTrigger + WebGL + preloader conviviendo bien (refrescá ScrollTrigger tras el preloader).
- README corto con la arquitectura de animaciones/imágenes y cómo tunear duraciones, eases y reemplazar las fotos.

Arrancá planificando y después ejecutá.
