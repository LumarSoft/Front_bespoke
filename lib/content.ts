// Contenido central del sitio de Bespoke Arquitectura.
// Estudio de la Arq. Cintia Colazzo, Rosario (AR).
//
// Estructura alineada a los 4 ejes definidos con el cliente:
//   Estudio · Método · Proyectos (Residencial / Comercial) · Contacto
//
// NOTA: el cliente está produciendo el contenido definitivo de cada sección.
// Todo lo marcado con `TODO(contenido)` es texto puente y debe reemplazarse.

export const studio = {
  name: "Bespoke",
  full: "Bespoke Arquitectura",
  tagline: "Arquitectura hecha a medida",
  lead: "Arq. Cintia Colazzo",
  location: "Rosario · Santa Fe · Argentina",
  since: 2016,
};

/**
 * Logotipo oficial (manual, pág. 13 — «Versiones»).
 *   negativa → logo blanco, va sobre negro o sobre foto oscura
 *   positiva → logo negro, va sobre Blanco Cálido o superficies claras
 * Relación de aspecto original: 6244 × 1748.
 */
export const logo = {
  negativa: { src: "/logo/WHITELOGO.png", width: 6244, height: 1748 },
  positiva: { src: "/logo/BLACKLOGO.png", width: 6244, height: 1748 },
  alt: "Bespoke Arquitectura",
};

/**
 * Íconos de marca (manual, pág. 20 — «Elementos Gráficos»).
 *
 * Los archivos de /public/icons conservan el nombre original del manual, que
 * lleva espacios y acentos: `icono()` los codifica para que sirvan como URL.
 * Son line-art negro sobre transparente; sobre fondo oscuro se aplica la clase
 * `.icon-invert` para obtener la variante en blanco que muestra el manual.
 */
const icono = (nombre: string) => encodeURI(`/icons/${nombre}.png`);

export const nav = [
  { label: "Estudio", href: "/#estudio" },
  { label: "Método", href: "/#metodo" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Contacto", href: "/#contacto" },
];

/* ============================================================
   1 · ESTUDIO
   Qué es Bespoke · Filosofía y Origen · Equipo interdisciplinario
   ============================================================ */

export const estudio = {
  eyebrow: "El estudio",

  // "Qué es Bespoke" — titular con jerarquía tipográfica mixta.
  // Cada fragmento se renderiza con su propio tratamiento (ver components/estudio.tsx).
  queEs: {
    lines: [
      [
        { text: "No diseñamos", tone: "regular" },
        { text: "objetos.", tone: "italic" },
      ],
      [
        { text: "Diseñamos la", tone: "regular" },
        { text: "manera", tone: "black" },
      ],
      [
        { text: "de", tone: "versal" },
        { text: "habitar", tone: "italic" },
        { text: "un lugar.", tone: "regular" },
      ],
    ],
    // TODO(contenido): reemplazar por el texto definitivo del cliente.
    body: "Bespoke es un estudio de arquitectura que trabaja a medida: cada obra se corta según quien la va a vivir o usar. No partimos de un catálogo de soluciones, partimos del sitio, del programa y de la persona.",
  },

  // "Filosofía y Origen"
  filosofia: {
    title: "Filosofía y origen",
    quote: "Los detalles no son decoración: son decisiones de proyecto.",
    // TODO(contenido): reemplazar por el texto definitivo del cliente.
    body: "El nombre viene del oficio de la sastrería: *bespoke* es la prenda hecha a medida, cortada para un cuerpo y no para un talle. Esa idea ordena todo lo que hacemos — cada rincón, cada material y cada junta responden a una necesidad concreta, nunca a un gesto decorativo.",
  },

  // "Equipo interdisciplinario"
  equipo: {
    title: "Un equipo interdisciplinario",
    // TODO(contenido): confirmar nómina y roles definitivos con el cliente.
    intro:
      "Liderado por la Arq. Cintia Colazzo, Bespoke reúne profesionales de distintas disciplinas para resolver cada obra con precisión técnica y sensibilidad de proyecto.",
    miembros: [
      { name: "Arq. Cintia Colazzo", role: "Proyecto & Dirección" },
      { name: "Arq. Adolfo Shlieper", role: "Proyecto & Dirección" },
      { name: "Ing. Matías Hagge", role: "Cálculo estructural" },
      { name: "Ing. Marcelo Donatti", role: "Ejecución de obra" },
      { name: "Arq. Walter Salcedo", role: "Fotografía" },
    ],
    // Imagen de apoyo de la sección.
    image: {
      src: "/projects/interior-view.jpg",
      alt: "Interior de obra del estudio Bespoke Arquitectura",
    },
  },

  /**
   * Los tres íconos de valores del manual (pág. 20). Van en Estudio porque
   * hablan de quiénes son, no de qué hacen — eso último es Método.
   */
  valores: [
    {
      icon: icono("Amamos lo que hacemos"),
      title: "Amamos lo que hacemos",
      desc: "Cada proyecto se piensa desde cero. No hay soluciones predeterminadas ni encargos de trámite.",
    },
    {
      icon: icono("Medio Ambiente"),
      title: "Medio ambiente",
      desc: "El sitio, la orientación y los materiales son decisiones de proyecto antes que de estilo.",
    },
    {
      icon: icono("Somos responsables y comprometidos"),
      title: "Responsables y comprometidos",
      desc: "Acompañamos la obra de punta a punta, sosteniendo plazos, presupuesto y estándar de calidad.",
    },
  ],
};

/* ============================================================
   2 · MÉTODO — Cómo trabajamos
   Fondo negro pleno. Ítems estáticos: sólo el número cambia de color
   al interactuar (sin animaciones de entrada ni desplazamiento).
   ============================================================ */

export const metodo = {
  eyebrow: "Cómo trabajamos",
  // Titular con el mismo criterio de jerarquía mixta que Estudio.
  title: {
    lines: [
      [
        { text: "Un", tone: "versal" },
        { text: "método", tone: "black" },
      ],
      [
        { text: "de punta", tone: "regular" },
        { text: "a punta.", tone: "italic" },
      ],
    ],
  },
  intro:
    "Del primer asesoramiento a la entrega, acompañamos cada etapa del ciclo de vida de la obra.",

  /**
   * Los cinco servicios salen de los íconos del manual (pág. 20), que nombran
   * la taxonomía real del estudio: Asesoramiento · Planificación · Proyecto ·
   * Gerenciamiento de obra · Dirección de obra.
   * TODO(contenido): el cliente debe validar las descripciones.
   */
  pasos: [
    {
      id: "01",
      icon: icono("Asesoramiento"),
      title: "Asesoramiento",
      desc: "Lectura funcional y estética del punto de partida: entender el terreno, el programa y a quien lo va a habitar.",
    },
    {
      id: "02",
      icon: icono("Planificación"),
      title: "Planificación",
      desc: "Definimos alcance, etapas y presupuesto antes de dibujar, para que el proyecto sea viable desde el primer día.",
    },
    {
      id: "03",
      icon: icono("Proyecto"),
      title: "Proyecto",
      desc: "Diseño arquitectónico a medida que resuelve lo funcional, lo constructivo y lo distributivo sin renunciar a la estética.",
    },
    {
      id: "04",
      icon: icono("Gerenciamiento"),
      title: "Gerenciamiento de obra",
      desc: "Coordinamos equipos, tiempos y recursos durante todo el desarrollo, optimizando cada etapa.",
    },
    {
      id: "05",
      icon: icono("Dirección de obra"),
      title: "Dirección de obra",
      desc: "Seguimiento en sitio hasta la entrega, con control y certificación de lo efectivamente ejecutado.",
    },
  ],
};

/* ============================================================
   3 · PROYECTOS — Residencial / Comercial
   Cada portfolio tiene identidad de color propia (ver `theme`),
   resuelta con `data-portfolio` en globals.css.
   ============================================================ */

export type Proyecto = {
  slug: string;
  name: string;
  place: string;
  year: string;
  surface?: string;
  material?: string;
  excerpt: string;
  cover: { src: string; alt: string };
};

export type Portfolio = {
  slug: "residencial" | "comercial";
  label: string;
  /** Clave de paleta: residencial = crema dominante · comercial = gris/blanco/negro. */
  theme: "residencial" | "comercial";
  title: string;
  intro: string;
  cover: { src: string; alt: string };
  proyectos: Proyecto[];
};

// TODO(contenido): el cliente va a enviar las obras reales de cada portfolio.
// Las de abajo son puente y usan las imágenes ya presentes en /public/projects.
export const portfolios: Record<Portfolio["slug"], Portfolio> = {
  residencial: {
    slug: "residencial",
    label: "Residencial",
    theme: "residencial",
    title: "Casas hechas a la medida de quien las habita",
    intro:
      "Viviendas donde el programa nace de una forma de vivir concreta: la luz, el recorrido y la materia se ajustan a las personas, no al revés.",
    cover: {
      src: "/projects/exterior-trees.jpg",
      alt: "Vivienda unifamiliar entre árboles",
    },
    proyectos: [
      {
        slug: "estancia-estrella-federal",
        name: "Estancia Estrella Federal",
        place: "Ramallo · Buenos Aires",
        year: "2021",
        surface: "90 m²",
        material: "Hormigón visto",
        excerpt:
          "Un único volumen alargado de hormigón visto, tendido sobre el campo. El área social en un extremo, la íntima en el otro y una galería central que abre al paisaje.",
        cover: {
          src: "/projects/facade-glass.jpg",
          alt: "Fachada de cristal de la Estancia Estrella Federal",
        },
      },
      {
        slug: "casa-hogar",
        name: "Casa Hogar",
        place: "Rosario · Santa Fe",
        year: "2022",
        surface: "180 m²",
        material: "Ladrillo & madera",
        excerpt:
          "El estar se ordena alrededor del hogar: un núcleo macizo que organiza la planta y regula la temperatura de toda la casa.",
        cover: {
          src: "/projects/hearth.jpg",
          alt: "Estar con hogar a leña",
        },
      },
      {
        slug: "casa-escalera",
        name: "Casa Escalera",
        place: "Funes · Santa Fe",
        year: "2023",
        surface: "240 m²",
        material: "Hormigón & acero",
        excerpt:
          "Una escalera escultórica como columna vertebral: conecta los tres niveles y lleva luz cenital hasta la planta baja.",
        cover: {
          src: "/projects/stair.jpg",
          alt: "Escalera escultórica con luz cenital",
        },
      },
      {
        slug: "casa-cocina",
        name: "Casa de la Cocina Abierta",
        place: "Roldán · Santa Fe",
        year: "2023",
        surface: "150 m²",
        material: "Madera & piedra",
        excerpt:
          "La cocina deja de ser un cuarto de servicio y pasa a ser el centro social de la casa, abierta al patio y a la galería.",
        cover: {
          src: "/projects/kitchen.jpg",
          alt: "Cocina abierta integrada al patio",
        },
      },
    ],
  },

  comercial: {
    slug: "comercial",
    label: "Comercial",
    theme: "comercial",
    title: "Espacios que trabajan tan bien como se ven",
    intro:
      "Locales, oficinas y espacios de uso público resueltos con criterio de marca, flujo de personas y durabilidad de los materiales.",
    cover: {
      src: "/projects/aerial-field.jpg",
      alt: "Vista aérea de emplazamiento comercial",
    },
    proyectos: [
      {
        slug: "galeria",
        name: "Galería Central",
        place: "Rosario · Santa Fe",
        year: "2022",
        surface: "420 m²",
        material: "Acero & vidrio",
        excerpt:
          "Un vacío central ordena la circulación y reparte luz natural a los locales de ambos niveles sin necesidad de iluminación artificial diurna.",
        cover: {
          src: "/projects/gallery.jpg",
          alt: "Galería comercial con vacío central",
        },
      },
      {
        slug: "oficinas-carballo",
        name: "Oficinas Carballo",
        place: "Rosario · Santa Fe",
        year: "2023",
        surface: "310 m²",
        material: "Hormigón & cristal",
        excerpt:
          "Planta libre con núcleos de servicio en los extremos: máxima flexibilidad para reconfigurar los puestos sin obra.",
        cover: {
          src: "/projects/interior-view.jpg",
          alt: "Interior de oficinas con planta libre",
        },
      },
      {
        slug: "pabellon-dusk",
        name: "Pabellón de Usos Múltiples",
        place: "Ramallo · Buenos Aires",
        year: "2024",
        surface: "600 m²",
        material: "Estructura metálica",
        excerpt:
          "Una gran cubierta liviana sobre un basamento de hormigón: cubre el programa completo y deja los laterales abiertos al parque.",
        cover: {
          src: "/projects/dusk-glow.jpg",
          alt: "Pabellón iluminado al atardecer",
        },
      },
    ],
  },
};

export const portfolioList = Object.values(portfolios);

export const proyectosSection = {
  eyebrow: "Proyectos",
  title: "Dos maneras de trabajar a medida",
  intro:
    "Cada portfolio tiene su propia lógica, sus propios tiempos y su propia identidad. Elegí por dónde entrar.",
};

/* ============================================================
   4 · CONTACTO
   ============================================================ */

const WHATSAPP_LOCAL = "341 250 2267";
const WHATSAPP_E164 = "5493412502267";

export const contacto = {
  email: "info@bespokearquitectura.com.ar",
  emailHref: "mailto:info@bespokearquitectura.com.ar",
  whatsapp: WHATSAPP_LOCAL,
  whatsappHref: `https://wa.me/${WHATSAPP_E164}`,
  // TODO(contenido): confirmar con el cliente si la dirección sigue vigente.
  address: "Av. Cándido Carballo 183 · Piso 3 of. 1",
  city: "Rosario · Santa Fe",
};

/* ============================================================
   Media — videos de fondo (reproducción continua, sin scrub)
   ============================================================ */

export const media = {
  heroVideo: {
    src: "/video/tour.mp4",
    poster: "/video/tour-poster.jpg",
    objectPosition: "50% 62%",
  },
  metodoVideo: {
    src: "/videos/construccion.mp4",
    poster: "",
    objectPosition: "50% 50%",
  },
};
