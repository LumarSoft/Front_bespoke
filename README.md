# Bespoke Arquitectura — sitio institucional

Sitio nuevo del estudio **Bespoke Arquitectura** (Arq. Cintia Colazzo, Rosario).
Reemplaza al sitio anterior: se descartó el código viejo y se reconstruyó desde
cero. Desarrollo: **Lumarsoft**.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 ·
Lenis (smooth scroll) · Motion.

```bash
npm run dev     # desarrollo en localhost:3000
npm run build   # build de producción
npm run start   # sirve el build
npm run lint    # eslint (NO `next lint`, que ya no existe)
```

No hay test runner configurado.

## Estructura

Las cuatro secciones son las que se acordaron con el cliente por mail
(28/07/2026): **Estudio · Método · Proyectos · Contacto**.

```
app/
  layout.tsx                    fuentes, metadata, JSON-LD, smooth scroll
  page.tsx                      home: los 4 ejes en orden
  proyectos/[categoria]/        /proyectos/residencial · /proyectos/comercial
  sitemap.ts · robots.ts        SEO técnico
  globals.css                   sistema de diseño (ver más abajo)
components/
  hero · estudio · metodo · proyectos · contacto · footer · navbar
  portfolio-view.tsx            vista de portfolio, compartida por ambas categorías
  ui/                           background-video · mixed-heading · reveal
lib/
  content.ts                    TODO el contenido y la data del sitio
  site.ts                       dominio e imagen de Open Graph
  structured-data.ts            JSON-LD del estudio
docs/rules/                     convenciones del proyecto
```

## Dos reglas del proyecto

**1. El contenido no se escribe en los componentes.** Todo vive en
`lib/content.ts`. Lo marcado con `TODO(contenido)` es texto puente y lo
reemplaza el cliente.

**2. Los colores no se hardcodean por sección.** `globals.css` tiene dos capas:
la paleta de marca (del manual de identidad) y una capa semántica
(`--surface`, `--on-surface`, `--accent`, `--hairline`). El atributo
`data-portfolio` re-mapea esa capa, y de ahí sale la diferencia que pidió el
cliente: **Residencial** predomina crema, **Comercial** gris/blanco/negro. El
markup de los dos portfolios es el mismo.

## Decisiones que conviene conocer antes de tocar

- **El navbar y la cortina de portfolio no dependen de JS para ser visibles.**
  Sus animaciones son CSS con `forwards`. Un elemento fijo que arranca en
  `opacity: 0` y espera a que corra una animación desaparece para siempre si esa
  animación no llega a correr.
- **El scroll es libre, sin scrub.** El cliente pidió explícitamente scroll
  fluido: no hay secuencias de imágenes atadas al scroll ni secciones pinneadas.
  Los fondos en movimiento son video en loop (`ui/background-video.tsx`).
- **Método no lleva video ni animaciones en los ítems.** Fondo negro pleno y lo
  único que reacciona es el color del número. Es un pedido explícito del cliente.
- **Tipografía: sólo Montserrat.** Es la primaria del manual. La secundaria
  (Aptos) no se distribuye como webfont; para usarla hay que licenciarla y
  auto-hostearla.
- **Los videos de `public/video/` están re-encodeados** (H.264, CRF 30,
  faststart, sin audio). Si se reemplazan por material nuevo, mantener el
  mismo criterio: un fondo al 60% de opacidad no necesita 3 Mbps.

## Pendientes

Ver `docs/` y los `TODO(contenido)` / `TODO(cliente)` en el código. Los dos
grandes: el contenido definitivo del estudio y confirmar el dominio final
(`arquitecturabespoke.ar` vs `bespokearquitectura.com.ar`).
