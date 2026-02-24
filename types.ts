import { ReactNode } from 'react';

export interface Achievement {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  radicacion: string;
  aprobacion: string;
  law: string;
  icon: ReactNode;
  color: string;
  shadow: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number; // Index of the correct option
  rationale: string;
}

export interface QuizCategory {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  color: string;
  questions: QuizQuestion[];
}

export type FormStatus = 'idle' | 'submitting' | 'success';