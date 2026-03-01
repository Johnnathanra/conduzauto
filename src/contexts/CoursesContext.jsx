import React, { createContext, useContext } from 'react';

const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
  const courses = [
    {
      id: 1,
      name: 'Fundamentos de Direção',
      description: 'Aprenda o básico sobre como dirigir com segurança',
      icon: '🚗',
      category: 'Básico',
      progress: 0,
      rating: 4.5,
      students: 1250,
      lessons: [
        { id: 1, title: 'Introdução à Direção', duration: '10 min', type: 'video', content: 'Conteúdo da aula', completed: false },
        { id: 2, title: 'Posição Correta no Volante', duration: '8 min', type: 'video', content: 'Conteúdo da aula', completed: false },
        { id: 3, title: 'Quiz - Fundamentos', duration: '5 min', type: 'quiz', content: 'Teste seu conhecimento', completed: false },
      ],
    },
    {
      id: 2,
      name: 'Segurança no Trânsito',
      description: 'Principais regras de segurança no trânsito',
      icon: '🛑',
      category: 'Básico',
      progress: 0,
      rating: 4.8,
      students: 2100,
      lessons: [
        { id: 1, title: 'Sinais de Trânsito', duration: '12 min', type: 'video', content: 'Conteúdo da aula', completed: false },
        { id: 2, title: 'Prioridades nas Vias', duration: '10 min', type: 'video', content: 'Conteúdo da aula', completed: false },
      ],
    },
    {
      id: 3,
      name: 'Código de Trânsito Brasileiro',
      description: 'Conheça as leis de trânsito do Brasil',
      icon: '📋',
      category: 'Intermediário',
      progress: 0,
      rating: 4.3,
      students: 890,
      lessons: [
        { id: 1, title: 'Lei Seca e Penalidades', duration: '15 min', type: 'video', content: 'Conteúdo da aula', completed: false },
        { id: 2, title: 'Direitos e Deveres do Motorista', duration: '12 min', type: 'video', content: 'Conteúdo da aula', completed: false },
      ],
    },
    {
      id: 4,
      name: 'Superando o Medo de Dirigir',
      description: 'Técnicas para controlar a ansiedade ao dirigir',
      icon: '💪',
      category: 'Intermediário',
      progress: 0,
      rating: 4.9,
      students: 1650,
      lessons: [
        { id: 1, title: 'Respiração e Relaxamento', duration: '10 min', type: 'video', content: 'Conteúdo da aula', completed: false },
        { id: 2, title: 'Mindfulness para Motoristas', duration: '12 min', type: 'video', content: 'Conteúdo da aula', completed: false },
      ],
    },
    {
      id: 5,
      name: 'Manobras Avançadas',
      description: 'Domine as manobras mais complexas',
      icon: '🔄',
      category: 'Avançado',
      progress: 0,
      rating: 4.6,
      students: 450,
      lessons: [
        { id: 1, title: 'Estacionamento em Garagem', duration: '15 min', type: 'video', content: 'Conteúdo da aula', completed: false },
        { id: 2, title: 'Inversão de Marcha', duration: '12 min', type: 'video', content: 'Conteúdo da aula', completed: false },
      ],
    },
  ];

  return (
    <CoursesContext.Provider value={{ courses }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (!context) throw new Error('useCourses deve ser usado dentro de CoursesProvider');
  return context;
};
