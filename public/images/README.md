# Imágenes — TODO

El sitio ya no depende de fotos para funcionar: el logo real está en uso, y
Proceso reemplazó su necesidad de imagen por una escena 3D procedural
(`components/webgl/BlueprintScene.tsx`). Los slots de imagen que quedan son
deliberadamente pocos — Estudio (una columna) y Portfolio (donde sí
corresponde, es la sección de proyectos). Cada uno usa `<RevealImage>` sin
`src`, así que renderiza un contenedor **rayado** con el nombre de archivo
esperado — así se ve dónde va cada foto y con qué proporción.

Para reemplazar un placeholder por la foto real:

1. Poné el archivo en la carpeta indicada abajo, con ese nombre exacto (o
   cambiá el nombre en el componente si preferís otro).
2. En el componente, agregá la prop `src="/images/<carpeta>/<archivo>"` al
   `<RevealImage>` correspondiente. El reveal / mask / parallax ya están
   armados, no hay que tocar nada más.
3. Next/Image optimiza automáticamente el peso — subí la imagen a buena
   resolución (2000px+ en el lado mayor) sin preocuparte por el tamaño final.

## Logo

`/public/logo-2048x870.png` **ya es el logo real** (wordmark en trazo +
"arquitectura" en script). Se usa vía `next/image` en `Header.tsx`,
`Preloader.tsx`, `Hero.tsx` y el marquee de `Footer.tsx`. Es blanco, por eso
esas superficies son oscuras (`bg-noir`) — mantené ese contraste si tocás el
layout de esas secciones. Si en algún momento sumás una variante en negro
para usar sobre fondo claro, avisame y ajusto esos cuatro puntos.

## Carpetas y archivos esperados

```
estudio/
  equipo.jpg              — columna sticky, Estudio.tsx
  detalle-rincon.jpg      — columna sticky, Estudio.tsx
  obra-ejecucion.jpg      — columna sticky, Estudio.tsx

servicios/
  diseno.jpg      — preview flotante en hover, Servicios.tsx
  gestion.jpg     — preview flotante en hover, Servicios.tsx
  direccion.jpg   — preview flotante en hover, Servicios.tsx

portfolio/
  casa-lomas.jpg
  edificio-estrella.jpg
  loft-palermo.jpg
  oficinas-puerto.jpg
  casa-rio.jpg
  showroom-norte.jpg
  (cada uno se usa dos veces: grilla + galería horizontal, Portfolio.tsx)
```

Las carpetas `hero/`, `proceso/` y `cta/` se eliminaron: esas secciones ya no
usan fotos (Hero usa el logo real; Proceso usa la escena 3D; CTA es texto +
formulario). Si en el futuro querés meter una foto ahí igual, `<RevealImage>`
funciona en cualquier sección.

## Aspect ratios en uso

`RevealImage` recibe `ratio` (CSS `aspect-ratio`). Valores actuales: `4 / 5`
(columna sticky Estudio, grilla Portfolio), `3 / 4` (galería horizontal
Portfolio). Si tu foto real tiene otra proporción, ajustá el prop `ratio` en
el componente — el `object-cover` recorta automáticamente.
