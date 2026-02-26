import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Clock, BarChart3, PlayCircle, Lock } from 'lucide-react';

export const SimuladosPage = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSimulado, setSelectedSimulado] = useState(null);

  if (!user) {
    navigate('/auth');
    return null;
  }

  // Dados zerados para novo aluno
  const simulados = [
    {
      id: 1,
      name: 'Simulado: Fundamentos Básicos',
      description: 'Teste seus conhecimentos sobre o básico da direção',
      icon: '🚗',
      difficulty: 'Fácil',
      questions: 10,
      timeLimit: 15,
      category: 'Básico',
      userScore: null,
      completed: false,
    },
    {
      id: 2,
      name: 'Simulado: Segurança no Trânsito',
      description: 'Pratique conceitos de segurança',
      icon: '🛑',
      difficulty: 'Médio',
      questions: 15,
      timeLimit: 20,
      category: 'Intermediário',
      userScore: null,
      completed: false,
    },
    {
      id: 3,
      name: 'Simulado: Código de Trânsito',
      description: 'Teste seus conhecimentos sobre o CTB',
      icon: '📋',
      difficulty: 'Médio',
      questions: 20,
      timeLimit: 25,
      category: 'Intermediário',
      userScore: null,
      completed: false,
    },
    {
      id: 4,
      name: 'Simulado: Direção Defensiva',
      description: 'Aprenda técnicas de direção defensiva',
      icon: '💪',
      difficulty: 'Difícil',
      questions: 25,
      timeLimit: 30,
      category: 'Avançado',
      userScore: null,
      completed: false,
    },
    {
      id: 5,
      name: 'Simulado: Manobras Avançadas',
      description: 'Teste manobras complexas',
      icon: '🔄',
      difficulty: 'Difícil',
      questions: 30,
      timeLimit: 40,
      category: 'Avançado',
      userScore: null,
      completed: false,
    },
    {
      id: 6,
      name: 'Simulado: Prova Completa',
      description: 'Simulado completo com todas as áreas',
      icon: '✅',
      difficulty: 'Muito Difícil',
      questions: 50,
      timeLimit: 60,
      category: 'Especializado',
      userScore: null,
      completed: false,
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-green-100 text-green-700';
      case 'Médio':
        return 'bg-yellow-100 text-yellow-700';
      case 'Difícil':
        return 'bg-orange-100 text-orange-700';
      case 'Muito Difícil':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const completedCount = simulados.filter(s => s.completed).length;
  const averageScore = 0;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />

      <div className="md:ml-0 pt-20 md:pt-0">
        
        {/* Header */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-6`}>
          <div className="max-w-7xl mx-auto">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Simulados 🎮
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Teste seus conhecimentos com simulados práticos
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Completos */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Simulados Completos</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">{completedCount}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            {/* Pontuação Média */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pontuação Média</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">{averageScore}%</p>
                </div>
                <span className="text-3xl">📊</span>
              </div>
            </div>

            {/* Próximos */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Próximos Simulados</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">{simulados.length - completedCount}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Simulados Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulados.map(simulado => (
              <div
                key={simulado.id}
                onClick={() => !simulado.completed && setSelectedSimulado(simulado)}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                  simulado.completed ? '' : 'cursor-pointer hover:scale-105'
                } ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
              >
                {/* Header */}
                <div className={`p-6 ${isDark ? 'bg-gray-700' : 'bg-gradient-to-br from-orange-100 to-amber-100'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-4xl">{simulado.icon}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getDifficultyColor(simulado.difficulty)}`}>
                      {simulado.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {simulado.name}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {simulado.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-300">
                    <div className="text-center">
                      <span className="text-sm text-orange-600 font-bold">{simulado.questions}</span>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Questões
                      </p>
                    </div>
                    <div className="text-center">
                      <Clock className="w-4 h-4 mx-auto mb-1 text-orange-600" />
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {simulado.timeLimit}min
                      </p>
                    </div>
                    <div className="text-center">
                      {simulado.completed ? (
                        <>
                          <span className="text-sm text-orange-600 font-bold">{simulado.userScore}%</span>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pontuação</p>
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-gray-500">-</span>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Não feito</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSimulado(simulado);
                    }}
                    disabled={simulado.completed}
                    className={`w-full font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
                      simulado.completed
                        ? isDark
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                    }`}
                  >
                    {simulado.completed ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Concluído
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4" />
                        Iniciar
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`mt-8 p-6 rounded-lg text-center border-2 border-dashed ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-orange-50 border-orange-300'}`}>
            <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Comece a Treinar!</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Escolha um simulado acima para testar seus conhecimentos
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedSimulado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl max-w-2xl w-full ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`sticky top-0 p-6 border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} flex items-center justify-between`}>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {selectedSimulado.name}
              </h2>
              <button
                onClick={() => setSelectedSimulado(null)}
                className={`text-2xl font-bold ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedSimulado.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Questões</p>
                  <p className="text-2xl font-bold text-orange-600">{selectedSimulado.questions}</p>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Tempo Limite</p>
                  <p className="text-2xl font-bold text-orange-600">{selectedSimulado.timeLimit} min</p>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Dificuldade</p>
                  <p className="text-2xl font-bold text-orange-600">{selectedSimulado.difficulty}</p>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Categoria</p>
                  <p className="text-2xl font-bold text-orange-600">{selectedSimulado.category}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedSimulado(null)}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold transition-colors ${
                    isDark
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  Fechar
                </button>
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all">
                  Iniciar Simulado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};