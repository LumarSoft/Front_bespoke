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
        { text: "No proyectamos", tone: "regular" },
        { text: "espacios.", tone: "italic" },
      ],
      [
        { text: "Diseñamos la", tone: "regular" },
        { text: "experiencia", tone: "black" },
      ],
      [
        { text: "de", tone: "versal" },
        { text: "habitar", tone: "italic" },
        { text: "un lugar.", tone: "regular" },
      ],
    ],
    body: "Bespoke es un estudio de arquitectura enfocado en el diseño verdaderamente a medida. No creemos en fórmulas prefabricadas ni en catálogos estandarizados: Concebimos cada proyecto desde el diálogo profundo con el espacio, la materialidad y la forma de vida de quien lo habitará.",
  },

  // "Filosofía y Origen"
  filosofia: {
    title: "Filosofía y origen",
    quote:
      "La arquitectura de excelencia nace de la precisión en el proceso y el respeto por el lugar.",
    body: "En su origen en la sastrería, Bespoke nace de bespoke: el acto de ‘hablar’, encargar y reservar en exclusiva antes de dar la primera puntada. Llevado a la arquitectura, este principio significa que cada espacio se concibe a través del diálogo directo con quien lo habitará. La iluminación, los materiales y cada rincón no se imponen, sino que responden al proceso realizado de escucha: la estética es la consecuencia natural de resolver con precisión lo que la vida en ese lugar exige.",
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

  /** Los pilares reutilizan el sistema de íconos lineales del manual (pág. 20). */
  valores: [
    {
      icon: icono("Amamos lo que hacemos"),
      title: "Sin Plantillas",
      desc: "Proyectamos a partir de las necesidades de cada cliente. Evitamos lo estandarizado para crear espacios funcionales y con carácter, donde la arquitectura se adapta a tu forma de vivir.",
    },
    {
      icon: icono("Medio Ambiente"),
      title: "Arquitectura Consciente",
      desc: "El entorno, la orientación solar y el uso eficiente de la materia prima no son temas secundarios, sino los ejes fundamentales que determinan cada una de nuestras decisiones.",
    },
    {
      icon: icono("Planificación"),
      title: "Gestión Clara y Asincrónica",
      desc: "Diseñamos con la misma precisión con la que gestionamos. Trabajamos con procesos documentados y comunicación fluida para que el cliente tenga previsibilidad total del proyecto sin fricciones.",
    },
    {
      icon: icono("Proyecto"),
      title: "Ejecución y Detalle",
      desc: "Ningún gesto es puramente decorativo. Cada rincón y cada encuentro de materiales responde a una solución constructiva precisa, cuidando la viabilidad económica y el estándar de calidad.",
    },
    {
      icon: icono("Somos responsables y comprometidos"),
      title: "Responsabilidad Integral",
      desc: "Acompañamos el proceso completo, desde la primera idea tipológica hasta la entrega de la obra, garantizando el cumplimiento de plazos, presupuestos y fidelidad al diseño original.",
    },
  ],
};

/* ============================================================
   2 · MÉTODO — Cómo trabajamos
   Fondo negro pleno. Ítems estáticos: sólo el número cambia de color
   al interactuar (sin animaciones de entrada ni desplazamiento).
   ============================================================ */

export const metodo = {
  eyebrow: "El Método BESPOKE",
  // Titular con el mismo criterio de jerarquía mixta que Estudio.
  title: {
    lines: [
      [
        { text: "Desde nuestro", tone: "regular" },
      ],
      [
        { text: "primer contacto", tone: "black" },
      ],
      [
        { text: "hasta la", tone: "versal" },
        { text: "entrega final", tone: "italic" },
      ],
    ],
  },
  intro:
    "Diseñamos y construimos con una visión 360°: articulamos cada etapa con procesos claros, documentación rigurosa y presencia activa antes, durante y después de la entrega.",

  /**
   * Las cuatro etapas conservan los íconos del manual que mejor representan
   * cada concepto dentro del nuevo Método Bespoke.
   */
  pasos: [
    {
      id: "01",
      icon: icono("Asesoramiento"),
      title: "Arquitectura a Medida",
      desc: "Diseñamos a partir de un proceso de escucha activa. No aplicamos soluciones predeterminadas: creamos respuestas espaciales únicas alineadas a la forma de vida de cada cliente.",
    },
    {
      id: "02",
      icon: icono("Planificación"),
      title: "Soluciones Creativas",
      desc: "Abordamos cada desafío proyectual sin moldes, transformando las condicionantes de sitio, presupuesto o materialidad en oportunidades para generar arquitectura que emocione y trascienda.",
    },
    {
      id: "03",
      icon: icono("Gerenciamiento"),
      title: "Responsabilidad",
      desc: "Acompañamos el proyecto de punta a punta. Asumimos el compromiso riguroso de cumplir con la palabra empeñada, los plazos acordados y los estándares técnicos de calidad.",
    },
    {
      id: "04",
      icon: icono("Dirección de obra"),
      title: "Trabajo Integrado",
      desc: "Las mejores obras nacen del trabajo en equipo. Fomentamos una sinergia fluida y transparente entre el cliente, el equipo de estudio y los contratistas de obra.",
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
    src: "/video/banner-video.mp4",
    poster: "/video/banner-video-poster.jpg",
    objectPosition: "50% 50%",
  },
  // Banda de apertura de la sección Proyectos. (Método NO lleva video:
  // el cliente pidió fondo negro pleno para esa sección.)
  proyectosVideo: {
    src: "/video/proyectos.mp4",
    poster: "/video/proyectos-poster.jpg",
    objectPosition: "50% 50%",
  },
};
