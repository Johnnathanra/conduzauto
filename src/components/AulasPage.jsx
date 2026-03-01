import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useCourses } from '../contexts/CoursesContext';
import { useStudent } from '../contexts/StudentContext';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Search, Star, Users, Clock, PlayCircle, CheckCircle, X } from 'lucide-react';

export const AulasPage = () => {
  const { isDark } = useTheme();
  const { courses } = useCourses();
  const { user } = useStudent();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');

  if (!user) {
    navigate('/auth');
    return null;
  }

  const categories = ['Todos', 'Básico', 'Intermediário', 'Avançado', 'Especializado'];
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Todos' || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />

      <div className="md:ml-0 pt-20 md:pt-0">
        
        {/* Header */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-4 sm:p-6`}>
          <div className="max-w-7xl mx-auto">
            <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Aulas 📚
            </h1>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Inicie agora, engate a 1º e comece a aprender!
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          
          {/* Search and Filter */}
          <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
            {/* Search Bar */}
            <div className={`flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 ${
              isDark
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <Search className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Pesquisar aulas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`flex-1 bg-transparent outline-none text-sm sm:text-base ${
                  isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            {/* Category Filters - Desktop lado a lado, Mobile ajustado */}
<div className="flex flex-wrap lg:flex-nowrap gap-2 md:gap-3 justify-center lg:justify-start">
  {categories.map(category => (
    <button
      key={category}
      onClick={() => setFilterCategory(category)}
      className={`px-2 sm:px-3 md:px-4 lg:px-5 py-2 rounded-full whitespace-nowrap font-medium text-xs sm:text-sm md:text-base lg:text-base transition-colors flex-shrink-0 ${
        filterCategory === category
          ? 'bg-orange-600 text-white'
          : isDark
          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {category}
    </button>
  ))}
</div>
          </div>

          {/* Courses Grid - Melhorado para Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                {/* Course Header com Icon */}
                <div className={`p-4 sm:p-6 ${isDark ? 'bg-gray-700' : 'bg-gradient-to-br from-orange-100 to-amber-100'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl sm:text-5xl">{course.icon}</span>
                    <span className={`text-xs font-bold px-2 sm:px-3 py-1 rounded-full ${
                      course.category === 'Básico' ? 'bg-green-100 text-green-700' :
                      course.category === 'Intermediário' ? 'bg-blue-100 text-blue-700' :
                      course.category === 'Avançado' ? 'bg-red-100 text-red-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Course Content - Expandido para mostrar tudo */}
                <div className="p-4 sm:p-6">
                  {/* Título e Descrição */}
                  <h3 className={`text-base sm:text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {course.name}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {course.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Progresso
                      </span>
                      <span className="text-orange-600 font-bold text-sm">{course.progress}%</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats - Em 3 colunas, bem visível */}
                  <div className={`grid grid-cols-3 gap-3 mb-6 pb-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                    <div className={`text-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <Clock className="w-5 h-5 mx-auto mb-2 text-orange-600" />
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {course.lessons.length}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        aulas
                      </p>
                    </div>
                    <div className={`text-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <Users className="w-5 h-5 mx-auto mb-2 text-orange-600" />
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {course.students}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        alunos
                      </p>
                    </div>
                    <div className={`text-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <Star className="w-5 h-5 mx-auto mb-2 text-orange-600 fill-orange-600" />
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {course.rating}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        avaliação
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course);
                    }}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Iniciar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-base sm:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Nenhum curso encontrado
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal do Curso */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className={`rounded-t-xl sm:rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`sticky top-0 p-4 sm:p-6 border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} flex items-center justify-between`}>
              <h2 className={`text-lg sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} flex-1 min-w-0 truncate`}>
                {selectedCourse.name}
              </h2>
              <button
                onClick={() => setSelectedCourse(null)}
                className={`ml-2 flex-shrink-0 p-2 ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedCourse.description}
              </p>

              <h3 className={`text-lg sm:text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Aulas ({selectedCourse.lessons.length})
              </h3>

              <div className="space-y-3">
                {selectedCourse.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`p-4 rounded-lg flex items-start gap-3 ${
                      isDark
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-50 hover:bg-gray-100'
                    } transition-colors cursor-pointer`}
                  >
                    <div className="flex-shrink-0 pt-1">
                      {lesson.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <div className={`w-6 h-6 rounded-full border-2 ${
                          isDark ? 'border-gray-500' : 'border-gray-300'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className={`font-medium text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {index + 1}. {lesson.title}
                        </p>
                        {lesson.type === 'video' && <PlayCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />}
                      </div>
                      <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {lesson.duration} • {lesson.content}
                      </p>
                    </div>
                    <div className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap flex-shrink-0 ${
                      lesson.type === 'video'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {lesson.type === 'video' ? 'Vídeo' : 'Quiz'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-colors ${
                    isDark
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  Fechar
                </button>
                <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all text-sm sm:text-base">
                  Iniciar Aula
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};