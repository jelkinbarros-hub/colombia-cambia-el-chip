import React from 'react';
import { Heart, Briefcase, Wifi, Smartphone, Bike, MapPin, Scale, Vote, Landmark } from 'lucide-react';
import { Achievement, QuizCategory } from './types';

export const CANDIDATE_PHOTO = "https://pbs.twimg.com/profile_images/2000680179346046978/_RPAJUA4_400x400.jpg";
export const FALLBACK_PHOTO = "https://pbs.twimg.com/profile_images/1500600588/Alfredo_Deluque_400x400.jpg";

export const DEFAULT_GALLERY_IMAGES = [
  "https://pbs.twimg.com/media/GiP0-uZXQAASx1_.jpg",
  "https://pbs.twimg.com/media/GiFPQ9fWgAAWc_q.jpg",
  "https://pbs.twimg.com/media/Gh2PlaaX0AAQj_h.jpg",
  "https://pbs.twimg.com/media/GhxR5wOXwAAirxP.jpg",
  "https://pbs.twimg.com/media/GhpbQeFWAAA3kY-.jpg"
];

export const ACHIEVEMENTS_LIST: Achievement[] = [
  { 
    id: 1,
    title: "Colombia Sin Hambre", 
    shortDesc: "Derecho fundamental a la alimentación.",
    fullDesc: "Reforma constitucional histórica que modifica el artículo 65 de la Constitución Política. Obliga al Estado a dirigir sus políticas hacia la garantía del derecho a la alimentación, asegurando que nadie en Colombia padezca hambre. Prioriza la producción de alimentos y la protección de la agricultura nacional.",
    radicacion: "Julio 20, 2022",
    aprobacion: "Junio, 2023 (Acto Legislativo)",
    law: "Acto Legislativo 01 de 2023",
    icon: <Heart className="w-8 h-8 text-white" />,
    color: "from-red-500 to-pink-600",
    shadow: "shadow-red-200"
  },
  { 
    id: 2,
    title: "Ley de Distritos", 
    shortDesc: "Riohacha Distrito Turístico: más inversión.",
    fullDesc: "Esta ley elevó al municipio de Riohacha a la categoría de Distrito Turístico y Cultural. Esto le permite tener autonomía administrativa, acceder a recursos directos de la Nación y fomentar el turismo como motor de desarrollo económico y generación de empleo en La Guajira.",
    radicacion: "Julio 20, 2014",
    aprobacion: "Julio, 2015",
    law: "Ley 1766 de 2015",
    icon: <Briefcase className="w-8 h-8 text-white" />,
    color: "from-yellow-400 to-orange-500",
    shadow: "shadow-yellow-200"
  },
  { 
    id: 3,
    title: "Internet Como Servicio Esencial", 
    shortDesc: "Conectividad garantizada para zonas rurales.",
    fullDesc: "Ley que declara el internet como un servicio público esencial y universal. Esto obliga al Estado a garantizar la conectividad especialmente en zonas rurales y apartadas, asegurando que la falta de recursos no sea una barrera para la educación y el trabajo virtual.",
    radicacion: "Agosto, 2020",
    aprobacion: "Julio, 2021",
    law: "Ley 2108 de 2021",
    icon: <Wifi className="w-8 h-8 text-white" />,
    color: "from-blue-400 to-indigo-600",
    shadow: "shadow-blue-200"
  },
  { 
    id: 4,
    title: '"Dejen de Fregar"', 
    shortDesc: "Fin al acoso de cobranzas y publicidad.",
    fullDesc: "Ley que protege el derecho a la intimidad de los consumidores financieros. Prohíbe que bancos y empresas de cobranza contacten a los usuarios en horarios no hábiles (fines de semana, noches) y restringe la cantidad de contactos permitidos por semana.",
    radicacion: "Octubre, 2021",
    aprobacion: "Junio, 2023",
    law: "Ley 2300 de 2023",
    icon: <Smartphone className="w-8 h-8 text-white" />,
    color: "from-purple-500 to-violet-600",
    shadow: "shadow-purple-200"
  }
];

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'guajiro',
    title: 'Alfredo Senador Guajiro',
    description: 'Su gestión por el departamento y el Caribe.',
    icon: <MapPin size={24} />,
    color: 'from-yellow-400 to-orange-500',
    questions: [
      {
        question: "¿De qué departamento es oriundo Alfredo Deluque?",
        options: ["Atlántico", "Magdalena", "La Guajira", "Cesar"],
        answer: 2,
        rationale: "Es un líder orgullosamente guajiro, trabajando por el desarrollo de su región y del Caribe."
      },
      {
        question: "¿Qué grave escándalo de corrupción denunció recientemente relacionado con la UNGRD?",
        options: ["El escándalo de los carrotanques", "El caso de Odebrecht", "El carrusel de la contratación", "Reficar"],
        answer: 0,
        rationale: "Destapó y denunció las irregularidades en la compra de carrotanques destinados al agua en La Guajira."
      },
      {
        question: "¿Qué categoría especial logró para Puerto Colombia?",
        options: ["Distrito Turístico y Cultural", "Zona Franca", "Capital Alterna", "Área Metropolitana"],
        answer: 0,
        rationale: "Impulsó la ley que lo declara Distrito Turístico, Cultural e Histórico."
      }
    ]
  },
  {
    id: 'opositor',
    title: 'Alfredo Senador Opositor Racional',
    description: 'Control político con argumentos y firmeza.',
    icon: <Scale size={24} />,
    color: 'from-red-500 to-red-700',
    questions: [
      {
        question: "¿A quién protege la Ley 'Dejen de Fregar'?",
        options: ["A los bancos", "A los consumidores financieros", "A las empresas de telefonía", "Al gobierno"],
        answer: 1,
        rationale: "Protege a los ciudadanos del acoso telefónico de cobranzas en horarios no hábiles."
      },
      {
        question: "¿Cuál fue su postura frente a la Ley de 'Paz Total'?",
        options: ["Votó en contra", "Se declaró impedido", "Votó positivamente", "Archivó el proyecto"],
        answer: 2,
        rationale: "Participó activamente y apoyó la ley marco para la política de paz."
      },
      {
        question: "¿Qué posición defendió sobre el Cannabis de Uso Adulto?",
        options: ["Opositor radical", "Coautor y defensor de la regulación", "Prohibición total", "Solicitó referendo"],
        answer: 1,
        rationale: "Apoyó la regulación para quitarle el mercado a la ilegalidad y generar recaudo estatal."
      },
      {
        question: "¿Cómo se describe su perfil legislativo?",
        options: ["Técnico y constitucional", "Solo temas religiosos", "Enfocado solo en auxilios", "Perfil bajo"],
        answer: 0,
        rationale: "Se destaca por un perfil técnico y serio, enfocado en reformas de fondo."
      }
    ]
  },
  {
    id: 'tic',
    title: 'Alfredo Senador TIC',
    description: 'Conectividad y modernización tecnológica.',
    icon: <Wifi size={24} />,
    color: 'from-blue-400 to-cyan-500',
    questions: [
      {
        question: "¿Qué estatus le otorgó al Internet mediante una ley de su autoría?",
        options: ["Servicio de lujo", "Servicio complementario", "Servicio Público Esencial", "Servicio opcional"],
        answer: 2,
        rationale: "Logró que el Internet sea declarado Servicio Público Esencial, garantizando su acceso universal, especialmente en zonas rurales."
      }
    ]
  },
  {
    id: 'ciclista',
    title: 'Alfredo ciclista aficionado',
    description: 'El deporte como disciplina de vida.',
    icon: <Bike size={24} />,
    color: 'from-green-400 to-emerald-600',
    questions: [
       // Placeholder question until database is updated
       {
        question: "¿Qué deporte practica Alfredo Deluque en sus ratos libres para mantener la disciplina?",
        options: ["Fútbol", "Ciclismo", "Tenis", "Natación"],
        answer: 1,
        rationale: "El ciclismo es su pasión, un deporte que exige resistencia, estrategia y constancia, igual que la política."
      }
    ]
  },
  {
    id: 'votar',
    title: '¿Cómo votar por Alfredo?',
    description: 'Aprende a marcar correctamente.',
    icon: <Vote size={24} />,
    color: 'from-yellow-400 to-yellow-600',
    questions: [
      {
        question: "¿Cuál es el logo y número de Alfredo Deluque en el tarjetón electoral?",
        options: ["Partido Liberal - L1", "Partido de la U - U3", "Centro Democrático - 10", "Cambio Radical - 5"],
        answer: 1,
        rationale: "Su identificativo en el tarjetón es el logo del Partido de la U y el número 3 (U3)."
      },
      {
        question: "¿Cuál es el lema principal de su campaña?",
        options: ["Hechos para todos", "Cambia el Chip", "Avanzamos juntos", "Firmeza y corazón"],
        answer: 1,
        rationale: "'Cambia el Chip' es su invitación a legislar con evidencias y resultados, dejando atrás la retórica vacía."
      }
    ]
  },
  {
    id: 'congreso',
    title: 'Aprende sobre el Congreso',
    description: 'Pedagogía sobre la labor legislativa.',
    icon: <Landmark size={24} />,
    color: 'from-purple-500 to-indigo-600',
    questions: [
      {
        question: "¿Cuál es el objetivo de su Acto Legislativo sobre alimentación?",
        options: ["Crear impuestos", "Prohibir importaciones", "Derecho fundamental a la alimentación", "Subsidios a restaurantes"],
        answer: 2,
        rationale: "Busca elevar la alimentación adecuada a rango de derecho fundamental en la Constitución."
      },
      {
        question: "¿Cuál es la profesión de Alfredo Deluque?",
        options: ["Ingeniero Civil", "Abogado", "Economista", "Médico"],
        answer: 1,
        rationale: "Es Abogado, especialista en Derecho de las Telecomunicaciones y Magíster en Derecho Económico."
      },
      {
        question: "¿Cuál fue el cargo directivo más destacado que ocupó en la Cámara (2015-2016)?",
        options: ["Presidente de la Cámara", "Presidente Comisión Acusaciones", "Vicepresidente del Senado", "Vocero del Partido"],
        answer: 0,
        rationale: "Fue Presidente de la Cámara, liderando la agenda legislativa en una etapa clave para el país."
      },
      {
        question: "¿A qué comisión constitucional pertenece, encargada de reformas a la Constitución?",
        options: ["Comisión Séptima", "Comisión Primera", "Comisión Tercera", "Comisión Quinta"],
        answer: 1,
        rationale: "Es miembro de la Comisión Primera, donde se tramitan las reformas constitucionales y leyes estatutarias."
      },
      {
        question: "¿Qué nueva entidad propuso crear para vigilar la calidad educativa?",
        options: ["Ministerio de Educación Superior", "Fiscalía Escolar", "Superintendencia de Educación", "Instituto de Becas"],
        answer: 2,
        rationale: "Propuso la Superintendencia de Educación para la inspección y vigilancia independiente del sistema."
      },
      {
        question: "¿Qué sanción propuso para quienes violen la libre competencia?",
        options: ["Cárcel por deudas", "Inhabilidad para contratar con el Estado", "Multas de tránsito", "Prohibición de licitaciones"],
        answer: 1,
        rationale: "Inhabilidad para contratar con el Estado a empresas sancionadas por cartelización."
      },
      {
        question: "¿Cuál es su cargo actual (2022-2026)?",
        options: ["Gobernador", "Senador de la República", "Ministro", "Representante a la Cámara"],
        answer: 1,
        rationale: "Actualmente ejerce como Senador de la República."
      }
    ]
  }
];