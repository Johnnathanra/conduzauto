import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState({
    level: 3,
    totalXP: 2450,
    xpForNextLevel: 5000,
    coursesCompleted: 5,
    simuladosCompleted: 8,
    hoursLearned: 24,
    badges: [
      { id: 1, name: 'Primeiro Passo', icon: '🚗', description: 'Completes sua primeira aula', earned: true, date: '2024-01-15' },
      { id: 2, name: 'Teórico Master', icon: '📚', description: 'Completa 5 aulas de teoria', earned: true, date: '2024-01-20' },
      { id: 3, name: 'Simulador Pro', icon: '🎮', description: 'Completa 5 simulados', earned: true, date: '2024-02-01' },
      { id: 4, name: 'Sem Medo', icon: '💪', description: 'Completa curso para superar medos', earned: false, date: null },
      { id: 5, name: 'Nível 5', icon: '⭐', description: 'Atinge nível 5', earned: false, date: null },
      { id: 6, name: 'Campeão', icon: '🏆', description: 'Completa todos os cursos', earned: false, date: null },
    ],
    courses: [
      { id: 1, name: 'Fundamentos de Direção', progress: 100, lessons: 8, completed: 8, icon: '🚗' },
      { id: 2, name: 'Segurança no Trânsito', progress: 75, lessons: 10, completed: 7, icon: '🛑' },
      { id: 3, name: 'Código de Trânsito', progress: 60, lessons: 12, completed: 7, icon: '📋' },
      { id: 4, name: 'Superando o Medo', progress: 40, lessons: 6, completed: 2, icon: '💪' },
      { id: 5, name: 'Manobras Avançadas', progress: 20, lessons: 8, completed: 1, icon: '🔄' },
    ],
    recentActivity: [
      { id: 1, type: 'lesson', title: 'Completou aula: Tipos de Veículos', date: '2 horas atrás' },
      { id: 2, type: 'simulado', title: 'Completou simulado: Sinalizações', date: '5 horas atrás' },
      { id: 3, type: 'badge', title: 'Conquistou badge: Simulador Pro', date: '1 dia atrás' },
      { id: 4, type: 'level', title: 'Subiu para nível 3', date: '2 dias atrás' },
      { id: 5, type: 'course', title: 'Completou curso: Fundamentos de Direção', date: '3 dias atrás' },
    ]
  });

  return (
    <ProgressContext.Provider value={{ userProgress, setUserProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress deve ser usado dentro de ProgressProvider');
  }
  return context;
};