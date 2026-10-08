// Contenido central del sitio de Bespoke Arquitectura.
// Estudio de la Arq. Cintia Colazzo, Rosario (AR).
//
// Estructura alineada a los 4 ejes definidos con el cliente:
//   Estudio · Método · Proyectos (Residencial / Comercial) · Contacto
//
// NOTA: el cliente está produciendo el contenido definitivo de cada sección.
// Todo lo marcado con `TODO(contenido)` es texto puente y debe reemplazarse.

import { MEDIDAS } from "@/lib/proyectos-fotos";

export const studio = {
  name: "Bespoke",
  full: "Bespoke Arquitectura",
  tagline: "Arquitectura hecha a medida",
  lead: "Arq. Cintia Colazzo",
  location: "Rosario · Santa Fe · Argentina",
  /**
   * Variante sin provincia — es la que pidió el cliente para el antetítulo del
   * hero (revisión 2: "reemplazar el texto inferior por el superior SIN la
   * provincia"). El resto del sitio sigue usando `location` completa.
   */
  locationShort: "Rosario · Argentina",
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
        { text: "de", tone: "minuscula" },
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
    // Revisión 3: el cliente pidió sacar la nómina con nombres personales y
    // dejar sólo este texto.
    parrafos: [
      "En Bespoke reunimos profesionales, técnicos y especialistas en áreas como arquitectura, desarrollo de proyecto, marketing y gestión. Esta sinergia nos permite abordar cada obra con precisión técnica, visión integral y sensibilidad de proyecto.",
      "¿Qué significa esto para vos? Que detrás de tu casa hay una estructura organizada para hacerte la vida más fácil: traducimos el estado de la obra a reportes semanales claros y accesibles, gestionamos los números de forma milimétrica para anticiparnos a cualquier cambio y centralizamos todas las decisiones en un solo interlocutor, liberándote de las complicaciones del día a día.",
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
  /** Fragmentos de la intro: los marcados con `strong` van en negrita. */
  intro: [
    { text: "En Bespoke, entendemos que cada proyecto es único y no existen recetas estandarizadas. Por eso, transformamos tus necesidades y visión en una obra arquitectónica a través de un proceso de " },
    { text: "escucha activa y gestión integral 360", strong: true },
    { text: ". Nuestro compromiso es proteger la calidad de diseño y tu inversión mediante un método estructurado y diseñado para que disfrutes cada etapa de creación sin sorpresas ni improvisaciones." },
  ],

  /**
   * Las siete etapas del Método Bespoke (revisión 3), cada una con el ícono
   * del manual que mejor la representa.
   */
  pasos: [
    {
      id: "01",
      icon: icono("Asesoramiento"),
      title: "Reunión Inicial y Diagnóstico",
      desc: "Nos reunimos para escucharte atentamente. Analizamos el sitio, estudiamos tus necesidades y exploramos las primeras materialidades e ideas conceptuales. Aseguramos desde el día uno que el proyecto refleje tu identidad y necesidades reales, traduciéndolas en una propuesta preliminar clara.",
    },
    {
      id: "02",
      icon: icono("Proyecto"),
      title: "Diseño General y Distribución",
      desc: "Pulimos la propuesta elegida integrando el estudio de factibilidad técnico-normativo, la volumetría 3D y la paleta de materiales. Visualizás cómo será tu futuro espacio, con medidas exactas y estimaciones confiables de superficies y una estimación de los costos antes de avanzar a la siguiente etapa.",
    },
    {
      id: "03",
      icon: icono("Planificación"),
      title: "Proyecto Definitivo y Cómputo de Materiales",
      desc: "Transformamos el anteproyecto en un legajo técnico riguroso, completo e inequívoco (planos de arquitectura, estructuras, instalaciones e iluminación) acompañado de un cómputo métrico detallado. Eliminamos la improvisación en la obra. Al tener cada detalle documentado de antemano, reducimos desviaciones económicas y garantizamos que la ejecución sea fiel al diseño original.",
    },
    {
      id: "04",
      icon: icono("Somos responsables y comprometidos"),
      title: "Selección de Contratistas y Presupuestos",
      desc: "Armamos paquetes de cotización claros y realizamos cuadros comparativos para presentarte a los mejores contratistas y proveedores bajo un esquema competitivo. Accedés a un presupuesto refinado y confiable, sabiendo exactamente qué contratamos y con qué nivel de terminación.",
    },
    {
      id: "05",
      icon: icono("Gerenciamiento"),
      title: "Organización Previa y Plan de Obra",
      desc: "Armamos el calendario general de Proyecto, planificamos compras críticas que requieren anticipación y gestionamos permisos y seguros. Arrancamos la obra con orden y previsibilidad, evitando demoras innecesarias, minimizando tiempos muertos y asegurando un flujo de trabajo ordenado desde el primer día.",
    },
    {
      id: "06",
      icon: icono("Dirección de obra"),
      title: "Coordinación y Control de Obra",
      desc: "Supervisamos de cerca el trabajo en la obra para asegurar que todo se construya con el nivel de calidad acordado. Te mantenemos al tanto con reportes periódicos y fotos del avance real. Tenés la tranquilidad de que un equipo experto cuida cada detalle de la obra por vos, manteniendo una comunicación frontal y transparente sobre el estado real del proyecto.",
    },
    {
      id: "07",
      icon: icono("Amamos lo que hacemos"),
      title: "Entrega de Llaves y Postventa",
      desc: "Recorremos juntos toda la propiedad para revisar cada rincón en detalle. Nos aseguramos de que cada terminación quede impecable, te entregamos el manual de uso y mantenimiento de la casa, y firmamos formalmente la entrega final. Recibís tu propiedad lista para disfrutar desde el primer día, con la tranquilidad y la seguridad de que nuestro respaldo y compromiso continúan firme incluso después de terminada la obra.",
    },
  ],
};

/* ============================================================
   3 · PROYECTOS — Residencial / Comercial
   Cada portfolio tiene identidad de color propia (ver `theme`),
   resuelta con `data-portfolio` en globals.css.
   ============================================================ */

/** Una ficha de datos al pie de la obra (etiqueta + valor). */
export type Dato = { label: string; value: string };

export type Foto = {
  src: string;
  alt: string;
  /** Medidas reales del archivo. Las horizontales y verticales conviven. */
  width: number;
  height: number;
};

export type Proyecto = {
  slug: string;
  name: string;
  /** Localidad, bajo el nombre de la obra. */
  place: string;
  /**
   * Fichas de la obra. Cambian según el portfolio, tal como pidió el cliente en
   * la revisión 2: Residencial → Alcance · Espacios; Comercial → Ubicación ·
   * Superficie. Ya no van ni «Año» ni «Materia».
   */
  datos: Dato[];
  /** Los dos bloques de la planilla de obras: el problema y cómo se resolvió. */
  desafio: string;
  propuesta: string;
  /** Foto de portada: la que se ve en el listado y la que morfea al detalle. */
  cover: Foto;
  /** Resto del material de la obra. La portada se filtra al renderizar. */
  gallery: Foto[];
};

export type Portfolio = {
  slug: "residencial" | "comercial";
  label: string;
  /** Clave de paleta: residencial = crema dominante · comercial = gris/blanco/negro. */
  theme: "residencial" | "comercial";
  title: string;
  intro: string;
  cover: Foto;
  proyectos: Proyecto[];
};

/**
 * Las fotos de cada obra viven numeradas 01..N dentro de su carpeta, así que
 * alcanza con decir cuántas hay. El `alt` describe la obra y lleva el número:
 * sin eso, diez fotos de la misma casa se anunciarían todas igual.
 *
 * Las medidas salen de `lib/proyectos-fotos.ts`, que se genera leyendo los
 * archivos. Es lo que permite que la galería respete la proporción real de
 * cada toma en lugar de recortarlas todas al mismo cuadro.
 */
const galeria = (
  portfolio: Portfolio["slug"],
  obra: string,
  total: number,
  alt: string,
): Foto[] =>
  Array.from({ length: total }, (_, i) => {
    const src = `/proyectos/${portfolio}/${obra}/${String(i + 1).padStart(2, "0")}.jpg`;
    return foto(src, `${alt} — foto ${i + 1} de ${total}`);
  });

/**
 * Arma una foto con sus medidas reales.
 *
 * Si el archivo no está en el mapa, corta el build en lugar de seguir con una
 * imagen sin dimensiones: significa que se agregó una ruta a mano sin volver a
 * generar `proyectos-fotos.ts`, y es mucho más barato enterarse acá que ver la
 * galería desarmada en producción.
 */
const foto = (src: string, alt: string): Foto => {
  const medidas = MEDIDAS[src];
  if (!medidas) {
    throw new Error(
      `Falta la medida de ${src}. Regenerá lib/proyectos-fotos.ts a partir de /public/proyectos.`,
    );
  }
  return { src, alt, width: medidas[0], height: medidas[1] };
};

/**
 * Obras reales del estudio. Los textos salen de la planilla que compartió el
 * cliente y las fotos del drive, normalizadas a JPG web en
 * `/public/proyectos/<portfolio>/<obra>/` — los originales, con HEIC y nombres
 * con espacios, quedaron fuera del deploy.
 */
export const portfolios: Record<Portfolio["slug"], Portfolio> = {
  residencial: {
    slug: "residencial",
    label: "Residencial",
    theme: "residencial",
    title: "Tu forma de habitar el espacio como eje del diseño",
    intro:
      "Viviendas que nacen de la forma de habitar de cada cliente, utilizando nuestra libertad creativa para diseñar hogares.",
    cover: foto("/proyectos/portada-residencial.jpg", "Estar de una vivienda proyectada por Bespoke Arquitectura"),
    proyectos: [
      {
        slug: "barcala",
        name: "Barcala",
        place: "Rosario · Santa Fe",
        datos: [
          { label: "Alcance", value: "Reciclado" },
          { label: "Espacios", value: "2 dormitorios · 2 baños" },
        ],
        desafio:
          "La vivienda original presentaba una distribución fragmentada y desconectada de sus áreas exteriores. El comedor sufría de poca iluminación natural y una relación incómoda con el garaje, mientras que el patio posterior permanecía aislado de la vida social de la casa. El reto consistía en reorganizar la estructura existente para responder a la dinámica de una familia.",
        propuesta:
          "Ubicamos la cochera en el frente del terreno para despejar el espacio del fondo. Esto nos permitió crear un área social amplia, continua y llena de luz natural, conectada directamente con la galería y el patio. Los dormitorios se reubicaron hacia el frente para ganar mayor intimidad, logrando una casa práctica, luminosa y capaz de adaptarse a los cambios de la vida familiar con el paso del tiempo.",
        cover: foto(
          "/proyectos/residencial/barcala/02.jpg",
          "Cocina con isla y piso damero de la vivienda en Barcala",
        ),
        gallery: galeria("residencial", "barcala", 3, "Vivienda en Barcala"),
      },
      {
        slug: "pasco",
        name: "Pasco",
        place: "Rosario · Santa Fe",
        datos: [
          { label: "Alcance", value: "Reforma" },
          { label: "Espacios", value: "3 dormitorios · 2 baños" },
        ],
        desafio:
          "Adaptar un departamento de tres dormitorios a la vida cotidiana de una pareja, logrando un cambio profundo a partir de la puesta en valor de los materiales originales. La cocina resultaba incómoda, con poco espacio y un diseño que dificultaba la distribución de los electrodomésticos. Además, los baños necesitaban una actualización completa y la vivienda en general pedía renovar sus ambientes respetando la estructura del departamento.",
        propuesta:
          "Rediseñamos la cocina para hacerla más cómoda y funcional, renovando la abertura hacia el balcón para sumar la iluminación natural, mejorar la ventilación y conectar el espacio con el exterior. En lugar de demoler o reemplazar todo, elegimos restaurar pisos, paredes y puertas originales. Concentramos la inversión en los espacios de mayor uso, cocina y baños, y recuperamos lo que ya tenía valor, logrando una transformación equilibrada que potencia el espacio y responde al estilo de vida de sus dueños.",
        // Revisión 3: la portada pasa a la cocina (foto 06), que muestra mejor el cambio.
        cover: foto(
          "/proyectos/residencial/pasco/06.jpg",
          "Cocina renovada con mesada de granito y abertura al balcón en el departamento de Pasco",
        ),
        gallery: galeria("residencial", "pasco", 11, "Departamento en Pasco"),
      },
      {
        slug: "kentucky",
        name: "Kentucky",
        place: "Rosario · Santa Fe",
        datos: [
          { label: "Alcance", value: "Reforma" },
          { label: "Espacios", value: "4 dormitorios · 4 baños" },
        ],
        desafio:
          "La vivienda contaba con una escalera de presencia imponente, pero la falta de una baranda adecuada dejaba el ambiente incompleto y no le permitía lucirse. El reto consistió en resolver esta necesidad funcional mediante un diseño a medida que dialogara con la arquitectura existente, respetando sus proporciones sin restarle protagonismo al espacio.",
        propuesta:
          "Diseñamos una baranda integral trabajando cuidadosamente su forma, escala y materiales para acompañar las líneas de la estructura. Esta nueva pieza completa la composición del ambiente y transforma un detalle de seguridad en el elemento central de la vivienda, demostrando cómo una intervención puntual y bien pensada puede renovar por completo el carácter de una casa.",
        cover: foto(
          "/proyectos/residencial/kentucky/02.jpg",
          "Escalera caracol con baranda de herrería a medida bajo un lucernario circular",
        ),
        gallery: galeria("residencial", "kentucky", 3, "Vivienda en Kentucky"),
      },
      {
        slug: "colon",
        name: "Colón",
        place: "Rosario · Santa Fe",
        datos: [
          { label: "Alcance", value: "Reforma" },
          { label: "Espacios", value: "Loft · 1 baño" },
        ],
        desafio:
          "Aprovechar al máximo los metros cuadrados de un loft de planta abierta, donde la falta de paredes genera dos problemas comunes: la pérdida de privacidad y la falta de lugares de guardado. El reto consistió en delimitar los diferentes sectores de la vivienda y sumar almacenamiento sin recargar el ambiente ni perder la amplitud y luz características de este tipo de espacios.",
        propuesta:
          "Diseñamos el mobiliario a medida como el gran articulador del proyecto. Creamos un mueble multifunción, con cava, estación de café y guardado, que conecta la cocina con el dormitorio, e incorporamos un cerramiento liviano que aporta privacidad sin aislar la luz. Además, sumamos espacio bajo la cama y un espejo corredizo para ganar practicidad y profundidad. Combinando materiales cálidos, texturas e iluminación bien pensada, logramos un hogar funcional, donde cada centímetro está optimizado sin perder la fluidez espacial.",
        cover: foto(
          "/proyectos/residencial/colon/01.jpg",
          "Mueble multifunción de madera que articula cocina y dormitorio en el loft de Colón",
        ),
        gallery: galeria("residencial", "colon", 4, "Loft en Colón"),
      },
    ],
  },

  comercial: {
    slug: "comercial",
    label: "Comercial",
    theme: "comercial",
    title: "El espacio comercial como escenario de una marca",
    intro:
      "Locales comerciales y oficinas diseñados con identidad de marca, funcionalidad y excelencia técnica.",
    cover: foto("/proyectos/portada-comercial.jpg", "Frente de tienda Zara ejecutada por Bespoke Arquitectura"),
    proyectos: [
      {
        slug: "i-am",
        name: "I AM",
        place: "Rosario · Santa Fe",
        datos: [
          { label: "Ubicación", value: "Shopping Portal Rosario" },
          { label: "Superficie", value: "90 m²" },
        ],
        desafio:
          "Desarrollar un local de 90 m² en Portal Rosario partiendo desde cero, con la necesidad de crear una identidad visual atractiva que respetara la normativa del shopping. El reto principal fue coordinar integralmente el proyecto, desde la distribución espacial y el diseño de mobiliario a medida hasta los trámites técnicos exigidos por el centro comercial, asegurando una ejecución impecable dentro de un plazo y un presupuesto estrictos.",
        propuesta:
          "Proyectamos un espacio funcional y coherente con la marca, gestionando el proceso de punta a punta: armamos la documentación técnica para la aprobación del shopping y dirigimos la obra con foco en los detalles de terminación. Gracias a una planificación rigurosa que integró diseño, gestión y control en obra, logramos plasmar la idea en un local listo para funcionar, cumpliendo en tiempo y forma con los recursos previstos.",
        cover: foto(
          "/proyectos/comercial/i-am/05.jpg",
          "Frente iluminado del local I AM en el Shopping Portal Rosario",
        ),
        gallery: galeria("comercial", "i-am", 6, "Local I AM en Portal Rosario"),
      },
      {
        slug: "zara-concepcion",
        name: "Zara",
        place: "Concepción · Chile",
        datos: [
          { label: "Ubicación", value: "Concepción, Chile" },
          { label: "Superficie", value: "3.500 m²" },
        ],
        desafio:
          "Coordinar la ejecución de una obra a gran escala de 3.500 m² distribuida en dos plantas, con la exigencia de estándares internacionales de calidad. El reto principal radicó en organizar a múltiples equipos de trabajo en simultáneo, garantizar terminaciones impecables en cada rincón y resolver los imprevistos diarios sin desviarse de la fecha límite de apertura.",
        propuesta:
          "Implementamos una metodología de trabajo basada en el seguimiento diario y una planificación rigurosa por etapas. Asumimos el control total de los rubros, supervisando minuciosamente la precisión de los detalles constructivos y la calidad de los materiales. Esto nos permitió coordinar el avance de ambas plantas a paso firme y lograr que la tienda abriera sus puertas dentro del plazo previsto y con la máxima exigencia comercial.",
        cover: foto(
          "/proyectos/comercial/zara-concepcion/04.jpg",
          "Salón de venta de la tienda Zara en Concepción, Chile",
        ),
        gallery: galeria("comercial", "zara-concepcion", 4, "Tienda Zara en Concepción"),
      },
      {
        slug: "zara-alto-rosario",
        name: "Zara",
        place: "Rosario · Santa Fe",
        datos: [
          { label: "Ubicación", value: "Shopping Alto Rosario" },
          { label: "Superficie", value: "4.000 m²" },
        ],
        desafio:
          "Transformar y unificar siete locales comerciales independientes dentro de Alto Rosario para consolidar una única tienda de 4.000 m². Una obra de esta magnitud exigió coordinar múltiples gremios en simultáneo, resolver la complejidad técnica de integrar estructuras previas y mantener un control riguroso de calidad en cada superficie, todo bajo la presión de un cronograma estricto para no demorar la fecha de apertura.",
        propuesta:
          "Llevamos adelante una dirección de obra con seguimiento continuo en el terreno, organizando las etapas de trabajo de forma estratégica para sostener un ritmo constante. Nos enfocamos en la precisión de los detalles constructivos, el control de las terminaciones y la gestión eficiente de los tiempos. Gracias a esta metodología, logramos integrar con éxito los espacios y entregar la tienda terminada bajo los estándares más exigentes del shopping, cumpliendo en tiempo y forma con el plazo de apertura.",
        cover: foto(
          "/proyectos/comercial/zara-alto-rosario/03.jpg",
          "Salón unificado de la tienda Zara en el Shopping Alto Rosario",
        ),
        gallery: galeria("comercial", "zara-alto-rosario", 10, "Tienda Zara en Alto Rosario"),
      },
    ],
  },
};

/** Busca una obra por su portfolio y su slug. Devuelve también el portfolio. */
export function buscarProyecto(categoria: string, obra: string) {
  const portfolio = portfolios[categoria as Portfolio["slug"]];
  const proyecto = portfolio?.proyectos.find((p) => p.slug === obra);
  return proyecto ? { portfolio, proyecto } : null;
}

export const portfolioList = Object.values(portfolios);

export const proyectosSection = {
  eyebrow: "Proyectos",
  title: "Dos maneras de trabajar a medida",
  intro: "Creamos soluciones únicas mediante la gestión integral 360.",
};

/* ============================================================
   4 · CONTACTO
   ============================================================ */

const WHATSAPP_LOCAL = "+54 9 341 349 7270";
const WHATSAPP_E164 = "5493413497270";

export const contacto = {
  email: "info@bespokearquitectura.com.ar",
  emailHref: "mailto:info@bespokearquitectura.com.ar",
  whatsapp: WHATSAPP_LOCAL,
  whatsappE164: `+${WHATSAPP_E164}`,
  whatsappHref: `https://wa.me/${WHATSAPP_E164}`,
  address: "San Lorenzo 933 · Piso 7 of. 2",
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
