import React from 'react';
import { Heart, Briefcase, Wifi, Smartphone, Bike, MapPin, Scale, Vote, Landmark } from 'lucide-react';
import { Achievement, QuizCategory, QuizQuestion } from './types';
import QUESTIONS_DATA from './data/questions.json';

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

export const INFLUENCER_CONTENT = [
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder, user can change
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
    title: 'Entrevista Exclusiva',
    platform: 'YouTube'
  },
  {
    type: 'image',
    url: 'https://pbs.twimg.com/media/GiP0-uZXQAASx1_.jpg',
    title: 'Recorriendo La Guajira',
    platform: 'Instagram'
  },
  {
    type: 'image',
    url: 'https://pbs.twimg.com/media/GiFPQ9fWgAAWc_q.jpg',
    title: 'En el Congreso',
    platform: 'X (Twitter)'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/M7lc1UVf-VE', // Placeholder
    thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/0.jpg',
    title: 'Debate de Control Político',
    platform: 'YouTube'
  }
];

// Helper to safely get questions with type checking
const getQuestions = (key: keyof typeof QUESTIONS_DATA): QuizQuestion[] => {
  return QUESTIONS_DATA[key] as QuizQuestion[];
};

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'guajiro',
    title: 'Alfredo Senador Guajiro',
    description: 'Su gestión por el departamento y el Caribe.',
    icon: <MapPin size={24} />,
    color: 'from-yellow-400 to-orange-500',
    questions: getQuestions('guajiro')
  },
  {
    id: 'opositor',
    title: 'Alfredo Senador Opositor Racional',
    description: 'Control político con argumentos y firmeza.',
    icon: <Scale size={24} />,
    color: 'from-red-500 to-red-700',
    questions: getQuestions('opositor')
  },
  {
    id: 'tic',
    title: 'Alfredo Senador TIC',
    description: 'Conectividad y modernización tecnológica.',
    icon: <Wifi size={24} />,
    color: 'from-blue-400 to-cyan-500',
    questions: getQuestions('tic')
  },
  {
    id: 'ciclista',
    title: 'Alfredo ciclista aficionado',
    description: 'El deporte como disciplina de vida.',
    icon: <Bike size={24} />,
    color: 'from-green-400 to-emerald-600',
    questions: getQuestions('ciclista')
  },
  {
    id: 'votar',
    title: '¿Cómo votar por Alfredo?',
    description: 'Aprende a marcar correctamente.',
    icon: <Vote size={24} />,
    color: 'from-yellow-400 to-yellow-600',
    questions: getQuestions('votar')
  },
  {
    id: 'congreso',
    title: 'Aprende sobre el Congreso',
    description: 'Pedagogía sobre la labor legislativa.',
    icon: <Landmark size={24} />,
    color: 'from-purple-500 to-indigo-600',
    questions: getQuestions('congreso')
  },
  {
    id: 'relax',
    title: 'Zona Relax & Influencer',
    description: '¡Desbloqueado! Datos curiosos y faceta personal.',
    icon: <Smartphone size={24} />,
    color: 'from-pink-500 to-rose-500',
    questions: getQuestions('relax')
  }
];
