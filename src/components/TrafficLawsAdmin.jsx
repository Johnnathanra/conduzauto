import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAdmin } from '../contexts/AdminContext';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export const TrafficLawsAdmin = () => {
  const { isDark } = useTheme();
  const { trafficLaws, addTrafficLaw, updateTrafficLaw, deleteTrafficLaw } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    article: '',
    penalty: '',
    severity: 'Média',
    active: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateTrafficLaw(editingId, formData);
      setEditingId(null);
    } else {
      addTrafficLaw(formData);
    }
    setFormData({
      title: '',
      description: '',
      article: '',
      penalty: '',
      severity: 'Média',
      active: true
    });
    setShowForm(false);
  };

  const handleEdit = (law) => {
    setFormData({
      title: law.title,
      description: law.description,
      article: law.article,
      penalty: law.penalty,
      severity: law.severity,
      active: law.active
    });
    setEditingId(law.id);
    setShowForm(true);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Leve':
        return 'bg-green-100 text-green-700';
      case 'Média':
        return 'bg-yellow-100 text-yellow-700';
      case 'Grave':
        return 'bg-orange-100 text-orange-700';
      case 'Muito Grave':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Código de Trânsito Brasileiro
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Adicionar Lei
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className={`rounded-xl p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {editingId ? 'Editar Lei' : 'Nova Lei de Trânsito'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Título
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Velocidade em Zona Escolar"
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
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descreva a infração..."
                rows="3"
                required
                className={`w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Artigo
                </label>
                <input
                  type="text"
                  name="article"
                  value={formData.article}
                  onChange={handleInputChange}
                  placeholder="Ex: Artigo 61"
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
                  Severidade
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500'
                  }`}
                >
                  <option>Leve</option>
                  <option>Média</option>
                  <option>Grave</option>
                  <option>Muito Grave</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Penalidade
              </label>
              <input
                type="text"
                name="penalty"
                value={formData.penalty}
                onChange={handleInputChange}
                placeholder="Ex: Multa de R$ 293,47 + 7 pontos"
                required
                className={`w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500'
                }`}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
                className="w-4 h-4 rounded"
              />
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Lei ativa
              </label>
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
                    title: '',
                    description: '',
                    article: '',
                    penalty: '',
                    severity: 'Média',
                    active: true
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

      {/* Laws List */}
      <div className="space-y-4">
        {trafficLaws.map(law => (
          <div
            key={law.id}
            className={`rounded-xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {law.title}
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getSeverityColor(law.severity)}`}>
                    {law.severity}
                  </span>
                  {law.active && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">
                      Ativa
                    </span>
                  )}
                </div>
                <p className={`mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {law.description}
                </p>
                <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  <p><strong>Artigo:</strong> {law.article}</p>
                  <p><strong>Penalidade:</strong> {law.penalty}</p>
                  <p><strong>Atualizado:</strong> {new Date(law.updatedAt).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(law)}
                  className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteTrafficLaw(law.id)}
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
