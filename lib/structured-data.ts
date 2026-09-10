import { contacto, estudio, metodo, portfolioList, studio } from "@/lib/content";
import { GEO, OG_IMAGE, PERFILES, SITE_URL } from "@/lib/site";

/**
 * Datos estructurados (JSON-LD).
 *
 * Para qué sirve: Google no "lee" el sitio como una persona. El JSON-LD le dice
 * en su propio idioma qué es Bespoke (un negocio local, no un blog), dónde
 * trabaja, quién lo dirige, qué servicios ofrece y qué perfiles son suyos. Es
 * lo que habilita a aparecer como entidad —con panel propio— y no como una
 * página más. De los estudios de Rosario que revisamos, ninguno lo tiene: es
 * una ventaja concreta y barata.
 *
 * Un solo grafo (`@graph`) con nodos enlazados por `@id`, que es lo que Google
 * recomienda cuando hay varias entidades relacionadas.
 */

const ORG_ID = `${SITE_URL}/#estudio`;
const SITE_ID = `${SITE_URL}/#website`;

/** El estudio como negocio local. */
const organizacion = {
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": ORG_ID,
  name: studio.full,
  alternateName: studio.name,
  url: SITE_URL,
  slogan: studio.tagline,
  description:
    "Estudio de arquitectura en Rosario dirigido por la Arq. Cintia Colazzo. " +
    "Diseño, gestión y dirección de obra a medida en proyectos residenciales y comerciales.",
  image: `${SITE_URL}${OG_IMAGE.url}`,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo/BLACKLOGO.png`,
    caption: studio.full,
  },
  email: contacto.email,
  // Mismo número que el botón de WhatsApp, en formato internacional.
  telephone: contacto.whatsappE164,
  foundingDate: String(studio.since),
  founder: {
    "@type": "Person",
    name: studio.lead,
    jobTitle: "Arquitecta",
    sameAs: [PERFILES.instagramLead, PERFILES.archdaily],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: contacto.address,
    addressLocality: GEO.city,
    addressRegion: GEO.region,
    addressCountry: GEO.countryCode,
  },
  areaServed: [
    { "@type": "City", name: GEO.city },
    { "@type": "AdministrativeArea", name: GEO.region },
    { "@type": "Country", name: GEO.country },
  ],
  sameAs: [PERFILES.instagram, PERFILES.instagramLead, PERFILES.archdaily],
  knowsAbout: [
    "Diseño arquitectónico",
    "Arquitectura residencial",
    "Arquitectura comercial",
    "Dirección de obra",
    "Gerenciamiento de obra",
    "Certificación de obra",
    "Arquitectura sustentable",
  ],
  /**
   * Catálogo de servicios, tomado de las cinco etapas de Método. No es
   * decorativo: es lo que permite que Google asocie el estudio a búsquedas por
   * servicio ("dirección de obra Rosario") y no sólo por nombre.
   */
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de arquitectura",
    itemListElement: metodo.pasos.map((paso) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: paso.title,
        description: paso.desc,
        serviceType: paso.title,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "City", name: GEO.city },
      },
    })),
  },
  // Los tres valores del manual, como atributos declarados del servicio.
  additionalProperty: estudio.valores.map((valor) => ({
    "@type": "PropertyValue",
    name: valor.title,
    value: valor.desc,
  })),
};

/** El sitio en sí, para que Google sepa quién lo publica y en qué idioma. */
const sitio = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: studio.full,
  inLanguage: "es-AR",
  publisher: { "@id": ORG_ID },
};

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organizacion, sitio],
};

/**
 * Grafo de una página de portfolio: la colección, su miga de pan y las obras
 * como `CreativeWork`. Le da a Google contenido enumerable —una lista de obras
 * con año, lugar y foto— en lugar de una página con imágenes sueltas.
 */
export function portfolioJsonLd(slug: "residencial" | "comercial") {
  const portfolio = portfolioList.find((p) => p.slug === slug)!;
  const url = `${SITE_URL}/proyectos/${portfolio.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#pagina`,
        url,
        name: `Proyectos ${portfolio.label} · ${studio.full}`,
        description: portfolio.intro,
        inLanguage: "es-AR",
        isPartOf: { "@id": SITE_ID },
        about: { "@id": ORG_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#migas`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Proyectos", item: `${SITE_URL}/#proyectos` },
          { "@type": "ListItem", position: 3, name: portfolio.label, item: url },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${url}#obras`,
        name: `Obras ${portfolio.label}`,
        numberOfItems: portfolio.proyectos.length,
        itemListElement: portfolio.proyectos.map((obra, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            "@id": `${url}#${obra.slug}`,
            name: obra.name,
            description: obra.propuesta || portfolio.intro,
            // El desafío no es la descripción de la obra, es su punto de partida.
            ...(obra.desafio ? { abstract: obra.desafio } : {}),
            locationCreated: { "@type": "Place", name: obra.place },
            creator: { "@id": ORG_ID },
            image: obra.gallery.map((foto) => `${SITE_URL}${foto.src}`),
            // Las fichas de la obra (Alcance/Espacios o Ubicación/Superficie)
            // viajan como propiedades declaradas, no como texto suelto.
            additionalProperty: obra.datos
              .filter((d) => d.value)
              .map((d) => ({
                "@type": "PropertyValue",
                name: d.label,
                value: d.value,
              })),
          },
        })),
      },
    ],
  };
}
