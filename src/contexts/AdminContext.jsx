import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [trafficLaws, setTrafficLaws] = useState([
    {
      id: 1,
      title: 'Velocidade em Zona Escolar',
      description: 'Limite máximo de 40 km/h',
      article: 'Artigo 61',
      penalty: 'Multa de R$ 293,47 + 7 pontos',
      severity: 'Grave',
      updatedAt: '2024-02-15',
      active: true
    },
    {
      id: 2,
      title: 'Uso de Celular ao Dirigir',
      description: 'Proibido manusear celular enquanto dirige',
      article: 'Artigo 252',
      penalty: 'Multa de R$ 293,47 + 5 pontos',
      severity: 'Grave',
      updatedAt: '2024-02-10',
      active: true
    },
    {
      id: 3,
      title: 'Falta de Cinto de Segurança',
      description: 'Cinto é obrigatório para todos os ocupantes',
      article: 'Artigo 167',
      penalty: 'Multa de R$ 146,74 + 3 pontos',
      severity: 'Média',
      updatedAt: '2024-02-05',
      active: true
    },
    {
      id: 4,
      title: 'Estacionamento Proibido',
      description: 'Não estacionar em zona de proibição',
      article: 'Artigo 181',
      penalty: 'Multa de R$ 88,04',
      severity: 'Leve',
      updatedAt: '2024-01-28',
      active: true
    },
    {
      id: 5,
      title: 'Direção sob Influência',
      description: 'Proibido dirigir sob efeito de bebida',
      article: 'Artigo 165',
      penalty: 'Multa de R$ 2.934,70 + suspensão',
      severity: 'Muito Grave',
      updatedAt: '2024-02-12',
      active: true
    },
  ]);

  const [adminLessons, setAdminLessons] = useState([
    {
      id: 1,
      courseId: 1,
      title: 'Conhecendo o Veículo',
      duration: 15,
      status: 'publicado',
      views: 1240,
      likes: 198,
      createdAt: '2024-01-10',
      updatedAt: '2024-02-01'
    },
    {
      id: 2,
      courseId: 1,
      title: 'Postura Correta',
      duration: 12,
      status: 'publicado',
      views: 980,
      likes: 156,
      createdAt: '2024-01-12',
      updatedAt: '2024-02-01'
    },
  ]);

  const [adminStats] = useState({
    totalUsers: 1540,
    activeUsers: 892,
    newUsersThisMonth: 234,
    averageSessionTime: 47,
    totalHoursLearned: 12450,
    averageScore: 84.5,
    coursesCreated: 5,
    lessonsCreated: 48,
    simuladosCreated: 6,
  });

  const addTrafficLaw = (law) => {
    setTrafficLaws([...trafficLaws, { ...law, id: Date.now(), createdAt: new Date().toISOString() }]);
  };

  const updateTrafficLaw = (id, updates) => {
    setTrafficLaws(trafficLaws.map(law => law.id === id ? { ...law, ...updates } : law));
  };

  const deleteTrafficLaw = (id) => {
    setTrafficLaws(trafficLaws.filter(law => law.id !== id));
  };

  const addLesson = (lesson) => {
    setAdminLessons([...adminLessons, { ...lesson, id: Date.now(), createdAt: new Date().toISOString() }]);
  };

  const updateLesson = (id, updates) => {
    setAdminLessons(adminLessons.map(lesson => lesson.id === id ? { ...lesson, ...updates } : lesson));
  };

  const deleteLesson = (id) => {
    setAdminLessons(adminLessons.filter(lesson => lesson.id !== id));
  };

  return (
    <AdminContext.Provider value={{
      trafficLaws,
      adminLessons,
      adminStats,
      addTrafficLaw,
      updateTrafficLaw,
      deleteTrafficLaw,
      addLesson,
      updateLesson,
      deleteLesson
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin deve ser usado dentro de AdminProvider');
  }
  return context;
};
