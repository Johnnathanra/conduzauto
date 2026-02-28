import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LogOut, Star, Zap, BookOpen, Clock } from 'lucide-react';

export const Dashboard = () => {
  const { isDark } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Dados zerados para novo aluno
  const userProgress = {
    level: 1,
    totalXP: 0,
    xpForNextLevel: 1000,
    coursesCompleted: 0,
    hoursLearned: 0,
    courses: [
      {
        id: 1,
        name: 'Fundamentos de Direção',
        icon: '🚗',
        progress: 0,
        lessons: 8,
        completed: 0,
      },
      {
        id: 2,
        name: 'Segurança no Trânsito',
        icon: '🛑',
        progress: 0,
        lessons: 10,
        completed: 0,
      },
      {
        id: 3,
        name: 'Código de Trânsito Brasileiro',
        icon: '📋',
        progress: 0,
        lessons: 12,
        completed: 0,
      },
      {
        id: 4,
        name: 'Superando o Medo de Dirigir',
        icon: '💪',
        progress: 0,
        lessons: 6,
        completed: 0,
      },
      {
        id: 5,
        name: 'Manobras Avançadas',
        icon: '🔄',
        progress: 0,
        lessons: 8,
        completed: 0,
      },
    ],
    badges: [
      { id: 1, name: 'Iniciante', icon: '🌱', earned: false },
      { id: 2, name: 'Teorista', icon: '📚', earned: false },
      { id: 3, name: 'Prático', icon: '🎮', earned: false },
      { id: 4, name: 'Dedicado', icon: '⏰', earned: false },
      { id: 5, name: 'Mestrado', icon: '🏆', earned: false },
      { id: 6, name: 'Confiante', icon: '😎', earned: false },
    ],
    recentActivity: [],
  };

  const progressPercentage = (userProgress.totalXP / userProgress.xpForNextLevel) * 100;
  const earnedBadges = userProgress.badges.filter(b => b.earned).length;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Main Content */}
      <div className="md:ml-0 pt-20 md:pt-0">
        
        {/* Header */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-6 sticky top-0 z-10`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Bem-vindo, {user.name}! 👋
              </h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Comece sua jornada de aprendizado
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            {/* Level Card */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Nível Atual</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">{userProgress.level}</p>
                </div>
                <Star className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            {/* XP Card */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Experiência</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">{userProgress.totalXP}</p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>/ {userProgress.xpForNextLevel}</p>
                </div>
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            {/* Courses Card */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Cursos</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">{userProgress.coursesCompleted}</p>
                </div>
                <BookOpen className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            {/* Hours Card */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Horas</p>
                  <p className="text-4xl font-bold text-orange-600 mt-3">{userProgress.hoursLearned}h</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg mb-8`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Progresso para Nível {userProgress.level + 1}
              </h3>
              <span className="text-orange-600 font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <div className={`h-4 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {userProgress.xpForNextLevel - userProgress.totalXP} XP para o próximo nível
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Cursos em Andamento */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Cursos Disponíveis
              </h3>
              <div className="space-y-4">
                {userProgress.courses.map(course => (
                  <div key={course.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{course.icon}</span>
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {course.name}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            {course.completed}/{course.lessons} aulas
                          </p>
                        </div>
                      </div>
                      <span className="text-orange-600 font-bold">{course.progress}%</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges Conquistadas */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Conquistas Desbloqueáveis ({earnedBadges}/{userProgress.badges.length})
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {userProgress.badges.map(badge => (
                  <div
                    key={badge.id}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-transform ${
                      badge.earned
                        ? `${isDark ? 'bg-orange-900/30 border-2 border-orange-600' : 'bg-orange-50 border-2 border-orange-600'}`
                        : `${isDark ? 'bg-gray-700/50 border-2 border-gray-600 opacity-50' : 'bg-gray-100 border-2 border-gray-300 opacity-50'}`
                    }`}
                  >
                    <div className="text-3xl">{badge.icon}</div>
                    <p className={`text-xs text-center font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {badge.name}
                    </p>
                    {badge.earned && (
                      <p className="text-xs text-orange-600 font-bold">✓ Conquistado</p>
                    )}
                    {!badge.earned && (
                      <p className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Bloqueado</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA - Começar Agora */}
          {userProgress.recentActivity.length === 0 && (
            <div className={`rounded-xl p-8 ${isDark ? 'bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-600' : 'bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-600'} shadow-lg mt-8 text-center`}>
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Pronto para começar?
              </h3>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Acesse a primeira aula e dê seus primeiros passos na ConduzAuto!
              </p>
              <Link
                to="/aulas"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all"
              >
                Ir para Aulas
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;