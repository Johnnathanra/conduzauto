import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAdmin } from '../contexts/AdminContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Users, TrendingUp, BookOpen, Gamepad2, BarChart3, Plus, LogOut } from 'lucide-react';
import { TrafficLawsAdmin } from './admin/TrafficLawsAdmin';
import { LessonsAdmin } from './admin/LessonsAdmin';

export const AdminDashboard = () => {
  const { isDark } = useTheme();
  const { adminStats } = useAdmin();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />

      <div className="md:ml-64 pt-20 md:pt-0">
        
        {/* Header */}
        <div className={`${isDark ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700' : 'bg-gradient-to-r from-orange-500 to-orange-600 border-gray-200'} border-b p-6`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Painel Administrativo 🔧
              </h1>
              <p className="text-orange-100">
                Gerencie aulas, simulados e código de trânsito
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                  : isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('traffic-laws')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
                activeTab === 'traffic-laws'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                  : isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Código de Trânsito
            </button>
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
                activeTab === 'lessons'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                  : isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Aulas
            </button>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Visão Geral
              </h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                
                {/* Total Users */}
                <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total de Usuários</p>
                      <p className="text-4xl font-bold text-orange-600 mt-2">{adminStats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                </div>

                {/* Active Users */}
                <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Usuários Ativos</p>
                      <p className="text-4xl font-bold text-green-600 mt-2">{adminStats.activeUsers}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                {/* New Users */}
                <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Novos Usuários</p>
                      <p className="text-4xl font-bold text-blue-600 mt-2">{adminStats.newUsersThisMonth}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                {/* Average Score */}
                <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pontuação Média</p>
                      <p className="text-4xl font-bold text-purple-600 mt-2">{adminStats.averageScore}%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                {/* Total Hours */}
                <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Horas de Estudo</p>
                      <p className="text-4xl font-bold text-indigo-600 mt-2">{adminStats.totalHoursLearned}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>

                {/* Content Stats */}
                <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Conteúdo Criado</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Cursos</span>
                        <span className="font-bold text-orange-600">{adminStats.coursesCreated}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Aulas</span>
                        <span className="font-bold text-blue-600">{adminStats.lessonsCreated}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Simulados</span>
                        <span className="font-bold text-green-600">{adminStats.simuladosCreated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Atividades Recentes
                </h3>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Novo usuário registrado
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Há 2 horas</p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Aula publicada: Conhecendo o Veículo
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Há 5 horas</p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Código de trânsito atualizado
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Há 1 dia</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Traffic Laws Tab */}
          {activeTab === 'traffic-laws' && <TrafficLawsAdmin />}

          {/* Lessons Tab */}
          {activeTab === 'lessons' && <LessonsAdmin />}
        </div>
      </div>
    </div>
  );
};
