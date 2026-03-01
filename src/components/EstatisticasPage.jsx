import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useStudent } from '../contexts/StudentContext';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TrendingUp, Calendar, Target, Flame } from 'lucide-react';

export const EstatisticasPage = () => {
  const { isDark } = useTheme();
  const { user } = useStudent();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week');

  if (!user) {
    navigate('/auth');
    return null;
  }

  // Dados zerados para novo aluno
  const stats = {
    totalXP: 0,
    totalAulas: 0,
    totalSimulados: 0,
    totalHoras: 0,
    melhorDia: 0,
    sequenciaAtual: 0,
    taxaConclusao: 0,
  };

  const weeklyActivity = [
    { day: 'Seg', xp: 0 },
    { day: 'Ter', xp: 0 },
    { day: 'Qua', xp: 0 },
    { day: 'Qui', xp: 0 },
    { day: 'Sex', xp: 0 },
    { day: 'Sab', xp: 0 },
    { day: 'Dom', xp: 0 },
  ];

  const courseProgress = [
    { name: 'Fundamentos de Direção', progress: 0 },
    { name: 'Segurança no Trânsito', progress: 0 },
    { name: 'Código de Trânsito Brasileiro', progress: 0 },
    { name: 'Superando o Medo de Dirigir', progress: 0 },
    { name: 'Manobras Avançadas', progress: 0 },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />

      <div className="md:ml-0 pt-20 md:pt-0">
        
        {/* Header */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-6`}>
          <div className="max-w-7xl mx-auto">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Estatísticas 📊
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Acompanhe seu progresso e evolução
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* Time Range Selector */}
          <div className="flex gap-2 mb-8">
            {['week', 'month', 'year'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-orange-600 text-white'
                    : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {range === 'week' ? 'Semana' : range === 'month' ? 'Mês' : 'Ano'}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            {/* XP Card */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total XP</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">{stats.totalXP}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            {/* Aulas Card */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Aulas Completas</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">{stats.totalAulas}</p>
                </div>
                <span className="text-3xl">📚</span>
              </div>
            </div>

            {/* Simulados Card */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Simulados</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">{stats.totalSimulados}</p>
                </div>
                <span className="text-3xl">🎮</span>
              </div>
            </div>

            {/* Horas Card */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Horas Estudadas</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">{stats.totalHoras}h</p>
                </div>
                <span className="text-3xl">⏱️</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Atividade Semanal */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Atividade da Semana
              </h3>
              <div className="flex items-end justify-around h-48 gap-2">
                {weeklyActivity.map(activity => (
                  <div key={activity.day} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-orange-500 to-orange-600 rounded-lg transition-all"
                      style={{ height: `${activity.xp === 0 ? 10 : activity.xp}px` }}
                    />
                    <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {activity.day}
                    </p>
                  </div>
                ))}
              </div>
              <p className={`text-sm mt-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Total: {stats.totalXP} XP
              </p>
            </div>

            {/* Metas e Desafios */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Metas e Desafios
              </h3>
              <div className="space-y-4">
                
                {/* Meta 1 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Próximo Nível
                    </p>
                    <span className="text-orange-600 font-bold">0/1000 XP</span>
                  </div>
                  <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600" style={{ width: '0%' }} />
                  </div>
                </div>

                {/* Meta 2 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Cursos Completos
                    </p>
                    <span className="text-orange-600 font-bold">0/5</span>
                  </div>
                  <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600" style={{ width: '0%' }} />
                  </div>
                </div>

                {/* Meta 3 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Badges Conquistadas
                    </p>
                    <span className="text-orange-600 font-bold">0/6</span>
                  </div>
                  <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progresso por Curso */}
          <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg mb-8`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Progresso por Curso
            </h3>
            <div className="space-y-4">
              {courseProgress.map((course, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {course.name}
                    </p>
                    <span className="text-orange-600 font-bold">{course.progress}%</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estatísticas Avançadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Melhor Dia */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg text-center`}>
              <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Melhor Dia</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{stats.melhorDia} XP</p>
            </div>

            {/* Sequência */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg text-center`}>
              <Flame className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Sequência Atual</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{stats.sequenciaAtual} dias</p>
            </div>

            {/* Taxa de Conclusão */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg text-center`}>
              <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Taxa de Conclusão</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{stats.taxaConclusao}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
