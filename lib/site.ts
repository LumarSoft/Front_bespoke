/**
 * Datos canónicos del sitio y del negocio, en un solo lugar.
 *
 * Dominio definitivo confirmado por Bespoke para el relanzamiento de marca.
 * De esta constante dependen las URLs canónicas, el sitemap, los datos
 * estructurados y las tarjetas de Open Graph.
 */
export const SITE_URL = "https://bespokearquitectura.com.ar";

/**
 * Ciudad y provincia. Aparecen en los títulos, en las descripciones y en los
 * datos estructurados: en un rubro que se busca por zona ("estudio de
 * arquitectura en Rosario"), la localidad es parte de la palabra clave, no un
 * dato de contacto.
 */
export const GEO = {
  city: "Rosario",
  region: "Santa Fe",
  regionCode: "AR-S",
  country: "Argentina",
  countryCode: "AR",
};

/**
 * Perfiles verificados del estudio. Van al `sameAs` de los datos estructurados:
 * es lo que le permite a Google unificar sitio, Instagram y ArchDaily como una
 * sola entidad en lugar de tres cosas sueltas con el mismo nombre.
 *
 * TODO(cliente): confirmar si hay Facebook, LinkedIn o Pinterest para sumar, y
 * si el perfil de ArchDaily de la Arq. Colazzo se mantiene activo.
 */
export const PERFILES = {
  instagram: "https://www.instagram.com/bespokearquitectura/",
  instagramLead: "https://www.instagram.com/cintiacolazzo/",
  archdaily: "https://www.archdaily.com/office/cintia-colazzo",
};

/**
 * Imagen de las tarjetas al compartir (WhatsApp, LinkedIn, X).
 * Es una pieza hecha para eso: foto de obra oscurecida + logo en negativo,
 * 1200×630, el tamaño que piden Open Graph y Twitter.
 */
export const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Bespoke Arquitectura — arquitectura hecha a medida en Rosario",
};
