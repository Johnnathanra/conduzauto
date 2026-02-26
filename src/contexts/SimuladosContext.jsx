import React, { createContext, useContext, useState } from 'react';

const SimuladosContext = createContext();

export const SimuladosProvider = ({ children }) => {
  const [simulados] = useState([
    {
      id: 1,
      name: 'Sinalizações de Trânsito',
      description: 'Teste seus conhecimentos sobre placas e sinais de trânsito',
      icon: '🛑',
      difficulty: 'Fácil',
      questions: 10,
      timeLimit: 15,
      category: 'Código de Trânsito',
      userScore: null,
      completed: false
    },
    {
      id: 2,
      name: 'Situações de Risco',
      description: 'Identifique e reaja corretamente em situações perigosas',
      icon: '⚠️',
      difficulty: 'Médio',
      questions: 8,
      timeLimit: 20,
      category: 'Segurança',
      userScore: 75,
      completed: true
    },
    {
      id: 3,
      name: 'Manobras de Direção',
      description: 'Pratique manobras essenciais: estacionamento, curvas, etc',
      icon: '🔄',
      difficulty: 'Médio',
      questions: 12,
      timeLimit: 25,
      category: 'Prático',
      userScore: null,
      completed: false
    },
    {
      id: 4,
      name: 'Infrações e Multas',
      description: 'Conheça as infrações e seus valores de multas',
      icon: '📋',
      difficulty: 'Fácil',
      questions: 15,
      timeLimit: 20,
      category: 'Código de Trânsito',
      userScore: 88,
      completed: true
    },
    {
      id: 5,
      name: 'Direção Noturna',
      description: 'Desafios específicos de dirigir à noite',
      icon: '🌙',
      difficulty: 'Difícil',
      questions: 10,
      timeLimit: 18,
      category: 'Segurança',
      userScore: null,
      completed: false
    },
    {
      id: 6,
      name: 'Clima Adverso',
      description: 'Como dirigir em chuva, neblina e outras condições',
      icon: '🌧️',
      difficulty: 'Médio',
      questions: 8,
      timeLimit: 15,
      category: 'Segurança',
      userScore: 92,
      completed: true
    },
  ]);

  const [simuladoQuestions] = useState({
    1: [
      {
        id: 1,
        question: 'O que significa uma placa triangular vermelha?',
        image: '🛑',
        options: [
          'Proibido entrar',
          'Aviso de perigo',
          'Indicação de direção',
          'Estacionamento permitido'
        ],
        correct: 1,
        explanation: 'Placas triangulares vermelhas indicam avisos de perigo na via.'
      },
      {
        id: 2,
        question: 'Qual é o significado de uma luz vermelha no semáforo?',
        image: '🚦',
        options: [
          'Prossiga com cuidado',
          'STOP - Não passe',
          'Reduza a velocidade',
          'Estacione o veículo'
        ],
        correct: 1,
        explanation: 'Luz vermelha significa STOP obrigatório.'
      },
      {
        id: 3,
        question: 'O que significa uma linha branca contínua na estrada?',
        image: '─',
        options: [
          'Proibido ultrapassar',
          'Permitido ultrapassar',
          'Apenas indicação',
          'Redução de velocidade'
        ],
        correct: 0,
        explanation: 'Linha branca contínua proíbe ultrapassagens.'
      },
      {
        id: 4,
        question: 'Qual é o significado de uma placa quadrada azul?',
        image: '🔵',
        options: [
          'Obrigação',
          'Aviso',
          'Informação',
          'Proibição'
        ],
        correct: 0,
        explanation: 'Placas azuis indicam obrigações.'
      },
      {
        id: 5,
        question: 'O que significa uma linha amarela descontínua?',
        image: '- - -',
        options: [
          'Proibido ultrapassar',
          'Permitido ultrapassar com cuidado',
          'Estacionamento proibido',
          'Parada proibida'
        ],
        correct: 1,
        explanation: 'Linha amarela descontínua permite ultrapassagem com cuidado.'
      },
      {
        id: 6,
        question: 'Qual símbolo indica via mão dupla?',
        image: '↔️',
        options: [
          'Dois círculos',
          'Duas setas opostas',
          'Um triângulo',
          'Um quadrado'
        ],
        correct: 1,
        explanation: 'Duas setas opostas indicam via de mão dupla.'
      },
      {
        id: 7,
        question: 'O que significa uma placa octogonal vermelha?',
        image: '🛑',
        options: [
          'Aviso de perigo',
          'Parada obrigatória',
          'Velocidade reduzida',
          'Proibido estacionar'
        ],
        correct: 1,
        explanation: 'Placa octogonal vermelha significa STOP - parada obrigatória.'
      },
      {
        id: 8,
        question: 'Qual é a velocidade máxima permitida em zona escolar?',
        image: '🏫',
        options: [
          '80 km/h',
          '60 km/h',
          '40 km/h',
          '20 km/h'
        ],
        correct: 2,
        explanation: 'Em zonas escolares, a velocidade máxima é 40 km/h.'
      },
      {
        id: 9,
        question: 'O que significa uma seta branca curva na via?',
        image: '↗️',
        options: [
          'Curva à esquerda',
          'Indicação de via',
          'Proibido virar',
          'Estacionamento'
        ],
        correct: 1,
        explanation: 'Setas brancas indicam a direção que deve ser seguida.'
      },
      {
        id: 10,
        question: 'Qual é a distância de segurança mínima entre veículos?',
        image: '🚗',
        options: [
          'Um comprimento de carro',
          'Dois comprimentos de carro',
          'Meio comprimento de carro',
          'Sem limite específico'
        ],
        correct: 0,
        explanation: 'A distância deve ser pelo menos um comprimento de carro.'
      }
    ]
  });

  return (
    <SimuladosContext.Provider value={{ simulados, simuladoQuestions }}>
      {children}
    </SimuladosContext.Provider>
  );
};

export const useSimulados = () => {
  const context = useContext(SimuladosContext);
  if (!context) {
    throw new Error('useSimulados deve ser usado dentro de SimuladosProvider');
  }
  return context;
};
