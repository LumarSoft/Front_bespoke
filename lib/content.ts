// Contenido central del sitio de Bespoke Arquitectura.
// Fuente: bespokeInfo.md — estudio de la Arq. Cintia Colazzo, Rosario (AR).

export const studio = {
  name: "Bespoke",
  full: "Bespoke Arquitectura",
  tagline: "Arquitectura hecha a medida",
  lead: "Arq. Cintia Colazzo",
  location: "Rosario · Santa Fe · Argentina",
  since: 2016,
};

export const nav = [
  { label: "Estudio", href: "#estudio" },
  { label: "Enfoque", href: "#enfoque" },
  { label: "Proyecto", href: "#proyecto" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
];

export const manifesto = {
  eyebrow: "El detalle es una decisión",
  lines: [
    "No diseñamos objetos.",
    "Diseñamos la manera",
    "de habitar un lugar.",
  ],
  body: "Bespoke nace del oficio de la sastrería: cada obra se corta a la medida exacta de quien la va a vivir. Los detalles no son decoración aislada, son decisiones de proyecto — cada rincón, cada material y cada junta responden a una necesidad concreta.",
};

export const services = [
  {
    id: "01",
    title: "Asesoramiento",
    desc: "Lectura funcional y estética del punto de partida: entender el terreno, el paisaje y a quien lo va a habitar.",
    icon: "/icons/asesoramiento.png",
  },
  {
    id: "02",
    title: "Planificación",
    desc: "Organizamos plazos, recursos y etapas antes de mover una sola piedra, para que la obra avance sin sorpresas.",
    icon: "/icons/planificacion.png",
  },
  {
    id: "03",
    title: "Proyecto",
    desc: "Diseño arquitectónico personalizado que resuelve lo funcional, lo constructivo y lo distributivo sin renunciar a la estética.",
    icon: "/icons/proyecto.png",
  },
  {
    id: "04",
    title: "Dirección de obra",
    desc: "Supervisión técnica in situ que garantiza que lo construido responda fielmente al proyecto.",
    icon: "/icons/direccion-de-obra.png",
  },
  {
    id: "05",
    title: "Gerenciamiento de obra",
    desc: "Coordinamos cada etapa de la obra para reducir tiempos, optimizar recursos y sostener el estándar de calidad.",
    icon: "/icons/gerenciamiento.png",
  },
];

export const values = [
  {
    title: "Amamos lo que hacemos",
    desc: "Cada proyecto se encara con la misma pasión del primer día, sin resignar el detalle.",
    icon: "/icons/amamos-lo-que-hacemos.png",
  },
  {
    title: "Respetamos el medio ambiente",
    desc: "Diseñamos con conciencia del entorno y del impacto de cada decisión constructiva.",
    icon: "/icons/medio-ambiente.png",
  },
  {
    title: "Somos responsables y comprometidos",
    desc: "Sostenemos plazos, presupuestos y la palabra dada en cada etapa de la obra.",
    icon: "/icons/responsables-y-comprometidos.png",
  },
];

export const project = {
  eyebrow: "Obra destacada · 2021",
  name: "Estancia Estrella Federal",
  place: "Ramallo · Buenos Aires",
  intro:
    "Una casa resuelta como un único volumen alargado de hormigón visto, tendido sobre el campo. El área social en un extremo, la íntima en el otro y una galería central que abre directamente al paisaje.",
  facts: [
    { k: "Terreno", v: "1,5 ha" },
    { k: "Construido", v: "90 m²" },
    { k: "Año", v: "2021" },
    { k: "Materia", v: "Hormigón" },
  ],
  // Recorrido con scroll: se "scrubbea" el video real (travelling de cámara)
  // encodeado con keyframes frecuentes para un seek fluido.
  tour: {
    src: "/video/tour.mp4",
    poster: "/video/tour-poster.jpg",
    // Encuadre: bajamos/ampliamos un poco para priorizar la casa sobre los árboles.
    objectPosition: "50% 62%",
    // Beats narrativos anclados al progreso [0,1] del recorrido.
    beats: [
      {
        index: "01",
        title: "El volumen",
        caption:
          "Un prisma de hormigón visto, recostado entre los árboles y el horizonte.",
        range: [0.0, 0.24] as [number, number],
      },
      {
        index: "02",
        title: "El umbral",
        caption:
          "Grandes paños de cristal disuelven el límite entre el adentro y el campo.",
        range: [0.28, 0.5] as [number, number],
      },
      {
        index: "03",
        title: "El corazón",
        caption:
          "Hormigón visto y luz medida: el estar se ordena alrededor del hogar.",
        range: [0.54, 0.76] as [number, number],
      },
      {
        index: "04",
        title: "El horizonte",
        caption:
          "La galería central se abre al paisaje y culmina en la hora dorada.",
        range: [0.8, 1.0] as [number, number],
      },
    ],
  },
};

export const team = [
  { name: "Arq. Cintia Colazzo", role: "Proyecto & Dirección" },
  { name: "Arq. Adolfo Shlieper", role: "Proyecto & Dirección" },
  { name: "Ing. Matías Hagge", role: "Cálculo estructural" },
  { name: "Ing. Marcelo Donatti", role: "Ejecución de obra" },
  { name: "Arq. Walter Salcedo", role: "Fotografía" },
];

export const stats = [
  { value: 90, suffix: " m²", label: "de obra a medida" },
  { value: 1.5, suffix: " ha", label: "de paisaje integrado" },
  { value: 2021, suffix: "", label: "Estrella Federal", plain: true },
  { value: 100, suffix: " %", label: "diseño personalizado" },
];

export const contact = {
  address: "Av. Cándido Carballo 183 · Piso 3 of. 1",
  city: "Rosario · Santa Fe",
  phone: "+54 9 341 3145417",
  phoneHref: "tel:+5493413145417",
  email: "info@arquitecturabespoke.ar",
  emailHref: "mailto:info@arquitecturabespoke.ar",
};
