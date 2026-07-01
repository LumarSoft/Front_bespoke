/**
 * Central content source for the Bespoke Arquitectura landing.
 * Keeping copy and asset references here keeps section components render-only.
 */

const UPLOADS = "https://arquitecturabespoke.ar/wp-content/uploads";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Estudio", href: "#estudio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Método", href: "#metodo" },
  { label: "Obra", href: "#obra" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export interface Service {
  index: string;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Asesoramiento",
    description:
      "Diagnóstico funcional y estético referido a la problemática concreta que plantea cada cliente.",
  },
  {
    index: "02",
    title: "Proyecto",
    description:
      "Trabajamos junto al cliente para llegar a las mejores soluciones arquitectónicas, resolviendo lo funcional, lo constructivo y lo distributivo según cada necesidad.",
  },
  {
    index: "03",
    title: "Gerenciamiento de obra",
    description:
      "Coordinamos cada acción del ciclo de vida del proyecto para lograr eficiencia operativa y ahorros reales en recursos, dinero y plazos.",
  },
  {
    index: "04",
    title: "Dirección de obra",
    description:
      "Un equipo de profesionales dinámicos y especializados realiza el seguimiento riguroso de la obra en cada etapa.",
  },
];

export interface Principle {
  title: string;
  description: string;
}

export const PRINCIPLES: Principle[] = [
  {
    title: "Planificamos",
    description:
      "Cumplir plazos y políticas de calidad en cada etapa es vital. La certificación del proceso da garantía de lo ejecutado y optimiza los recursos al máximo.",
  },
  {
    title: "Respetamos el medio ambiente",
    description:
      "Incorporamos con convicción criterios de sustentabilidad en todos nuestros diseños.",
  },
  {
    title: "Somos responsables",
    description:
      "Atendemos las necesidades presentes y futuras de cada cliente con rigurosidad en tiempos y presupuestos preestablecidos.",
  },
  {
    title: "Amamos lo que hacemos",
    description:
      "Nuestra creatividad está al servicio de nuestros clientes, en cada rincón y cada detalle.",
  },
];

export interface Stat {
  value: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: "+15", label: "Años de trayectoria" },
  { value: "90m²", label: "Casa en el Paraíso" },
  { value: "2", label: "Países con obra Zara" },
  { value: "100%", label: "Proyectos a medida" },
];

export interface Project {
  src: string;
  alt: string;
  caption: string;
  place: string;
  span?: "wide" | "tall" | "normal";
}

/** Curated portfolio — real imagery from the studio's current site. */
export const PROJECTS: Project[] = [
  {
    src: `${UPLOADS}/2022/09/CEF-015-INST_11zon.jpg`,
    alt: "Exterior de casa de campo con cubiertas inclinadas",
    caption: "Casa en el Paraíso",
    place: "Ramallo, Buenos Aires",
    span: "tall",
  },
  {
    src: `${UPLOADS}/2022/09/CEF-053-INST_11zon.jpg`,
    alt: "Interior con vista al paisaje",
    caption: "Interior integrado",
    place: "Residencial",
    span: "normal",
  },
  {
    src: `${UPLOADS}/2022/09/CEF-067-INST_11zon.jpg`,
    alt: "Cocina de líneas puras",
    caption: "Cocina a medida",
    place: "Residencial",
    span: "normal",
  },
  {
    src: `${UPLOADS}/2022/09/CEF-109-INST_11zon.jpg`,
    alt: "Exterior al atardecer",
    caption: "El paisaje como fachada",
    place: "Estancia Estrella Federal",
    span: "wide",
  },
  {
    src: `${UPLOADS}/2022/09/CEF-009-INST_11zon.jpg`,
    alt: "Volumen alargado de la vivienda",
    caption: "Volumen único",
    place: "Ramallo, Buenos Aires",
    span: "normal",
  },
  {
    src: `${UPLOADS}/2022/09/CEF-023-INST_11zon.jpg`,
    alt: "Contrafrente de la vivienda",
    caption: "Contrafrente",
    place: "Ramallo, Buenos Aires",
    span: "normal",
  },
];

export interface FeaturedProject {
  name: string;
  location: string;
  authorship: string;
  structure: string;
  execution: string;
  photography: string;
  land: string;
  built: string;
  year: string;
  body: string;
  publicationUrl: string;
  hero: string;
  images: string[];
}

export const FEATURED_PROJECT: FeaturedProject = {
  name: "Casa en el Paraíso",
  location: "Estancia Estrella Federal, Ramallo — Buenos Aires, Argentina",
  authorship: "Arq. Cintia Colazzo · Arq. Adolfo Schlieper",
  structure: "Ing. Matías Hagge",
  execution: "Ing. Marcelo Donatti",
  photography: "Arq. Walter Salcedo",
  land: "1,5 ha",
  built: "90 m²",
  year: "2021",
  body:
    "Resuelta como un único volumen de proporción fuertemente alargada: el área social en un extremo, la íntima en el opuesto y, en el centro, la galería en relación directa con el exterior. Las cubiertas se inclinan para abrir la mirada hacia el paisaje y, a la vez, recogen el agua de lluvia que culmina en una terraza verde sobre la losa plana de la galería.",
  publicationUrl:
    "https://www.plataformaarquitectura.cl/cl/984400/casa-en-el-paraiso-cintia-colazzo-plus-adolfo-schlieper-arquitectos",
  hero: `${UPLOADS}/2022/09/CEF-001-INST_11zon.jpg`,
  images: [
    `${UPLOADS}/2022/09/CEF-002-INST_11zon.jpg`,
    `${UPLOADS}/2022/09/CEF-040-INST_11zon.jpg`,
    `${UPLOADS}/2022/09/CEF-088-INST_11zon.jpg`,
  ],
};

export const CONTACT = {
  address: "Av. Cándido Carballo 183 — Piso 3, of. 1",
  city: "Rosario, Santa Fe, Argentina",
  phone: "+54 9 341 314 5417",
  phoneHref: "tel:+5493413145417",
  email: "info@arquitecturabespoke.ar",
  whatsapp: "https://wa.me/5493413497270",
  instagram: "https://instagram.com/bespokearquitectura",
};

export const HERO_IMAGE = `${UPLOADS}/2022/09/CEF-001-INST_11zon.jpg`;
export const ABOUT_IMAGE = `${UPLOADS}/2022/09/Cintia_11zon-1024x681.jpg`;
