import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAdmin } from '../../contexts/AdminContext';
import { Plus, Edit2, Trash2, X, Check, Eye } from 'lucide-react';

export const LessonsAdmin = () => {
  const { isDark } = useTheme();
  const { adminLessons, addLesson, updateLesson, deleteLesson } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    courseId: 1,
    title: '',
    duration: 15,
    status: 'rascunho'
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateLesson(editingId, formData);
      setEditingId(null);
    } else {
      addLesson(formData);
    }
    setFormData({
      courseId: 1,
      title: '',
      duration: 15,
      status: 'rascunho'
    });
    setShowForm(false);
  };

  const handleEdit = (lesson) => {
    setFormData({
      courseId: lesson.courseId,
      title: lesson.title,
      duration: lesson.duration,
      status: lesson.status
    });
    setEditingId(lesson.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Gerenciar Aulas
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Adicionar Aula
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className={`rounded-xl p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {editingId ? 'Editar Aula' : 'Nova Aula'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Curso
                </label>
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500'
                  }`}
                >
                  <option value={1}>Fundamentos de Direção</option>
                  <option value={2}>Segurança no Trânsito</option>
                  <option value={3}>Código de Trânsito</option>
                  <option value={4}>Superando o Medo</option>
                  <option value={5}>Manobras Avançadas</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Duração (minutos)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="5"
                  max="120"
                  required
                  className={`w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Título
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Conhecendo o Veículo"
                required
                className={`w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500'
                }`}
              >
                <option value="rascunho">Rascunho</option>
                <option value="publicado">Publicado</option>
                <option value="revisao">Revisão</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                {editingId ? 'Atualizar' : 'Criar'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    courseId: 1,
                    title: '',
                    duration: 15,
                    status: 'rascunho'
                  });
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                <X className="w-5 h-5" />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lessons List */}
      <div className="space-y-4">
        {adminLessons.map(lesson => (
          <div
            key={lesson.id}
            className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {lesson.title}
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    lesson.status === 'publicado'
                      ? 'bg-green-100 text-green-700'
                      : lesson.status === 'revisao'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {lesson.status === 'publicado' ? 'Publicado' : lesson.status === 'revisao' ? 'Revisão' : 'Rascunho'}
                  </span>
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p><strong>Duração:</strong> {lesson.duration} minutos</p>
                  <p><strong>Visualizações:</strong> {lesson.views} • <strong>Likes:</strong> {lesson.likes}</p>
                  <p><strong>Criado:</strong> {new Date(lesson.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
                  title="Visualizar"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleEdit(lesson)}
                  className="p-2 bg-orange-100 text-orange-600 hover:bg-orange-200 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteLesson(lesson.id)}
                  className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
                  title="Deletar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};