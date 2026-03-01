import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Search, Plus, X, Trash2, Check } from 'lucide-react';
import apiInstrutor from '../api';

export const InstructorStudentsManager = ({ onClose }) => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [linkedStudents, setLinkedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [linking, setLinking] = useState({});

  useEffect(() => {
    fetchLinkedStudents();
  }, []);

  const fetchLinkedStudents = async () => {
    try {
      const token = localStorage.getItem('conduzauto_instrutor_token');
      const response = await apiInstrutor.get('/instructor/my-students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLinkedStudents(response.data);
    } catch (error) {
      console.error('❌ [InstructorStudentsManager] Erro ao buscar alunos vinculados:', error);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('conduzauto_instrutor_token');
      const response = await apiInstrutor.get(`/instructor/search-students?search=${term}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('❌ [InstructorStudentsManager] Erro ao pesquisar alunos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkStudent = async (studentId) => {
    try {
      setLinking(prev => ({ ...prev, [studentId]: true }));
      const token = localStorage.getItem('conduzauto_instrutor_token');
      
      await apiInstrutor.post('/instructor/link-student', 
        { studentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('✅ Aluno vinculado com sucesso!');
      fetchLinkedStudents();
      setSearchResults(searchResults.filter(s => s._id !== studentId));
    } catch (error) {
      alert('❌ Erro ao vincular aluno: ' + error.response?.data?.message);
    } finally {
      setLinking(prev => ({ ...prev, [studentId]: false }));
    }
  };

  const handleUnlinkStudent = async (studentId) => {
    if (!window.confirm('Tem certeza que deseja desvincular este aluno?')) return;

    try {
      const token = localStorage.getItem('conduzauto_instrutor_token');
      
      await apiInstrutor.post('/instructor/unlink-student',
        { studentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('✅ Aluno desvinculado com sucesso!');
      fetchLinkedStudents();
    } catch (error) {
      alert('❌ Erro ao desvincular aluno');
    }
  };

  const isLinked = (studentId) => linkedStudents.some(s => s._id === studentId);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className={`rounded-t-lg sm:rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`sticky top-0 p-4 sm:p-6 border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} flex items-center justify-between`}>
          <h2 className={`text-lg sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Gerenciar Alunos
          </h2>
          <button
            onClick={onClose}
            className={`p-2 ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Procurar e Vincular Alunos
            </h3>
            
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 mb-4 ${
              isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
            }`}>
              <Search className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Pesquisar aluno por nome ou email..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className={`flex-1 bg-transparent outline-none ${
                  isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            {loading && (
              <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Procurando...
              </p>
            )}

            {!loading && searchResults.length > 0 && (
              <div className="space-y-2">
                {searchResults.map(student => (
                  <div
                    key={student._id}
                    className={`p-4 rounded-lg flex items-center justify-between ${
                      isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div>
                      <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {student.name}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {student.email}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        Nível {student.level} • {student.coursesCompleted} cursos • {student.hoursLearned}h
                      </p>
                    </div>
                    <button
                      onClick={() => handleLinkStudent(student._id)}
                      disabled={isLinked(student._id) || linking[student._id]}
                      className={`p-2 rounded-lg transition-all ${
                        isLinked(student._id)
                          ? isDark
                            ? 'bg-green-900 text-green-200 cursor-not-allowed'
                            : 'bg-green-100 text-green-800 cursor-not-allowed'
                          : `bg-orange-600 hover:bg-orange-700 text-white ${linking[student._id] ? 'opacity-50' : ''}`
                      }`}
                    >
                      {isLinked(student._id) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!loading && searchTerm && searchResults.length === 0 && (
              <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Nenhum aluno encontrado
              </p>
            )}
          </div>

          <div className={`p-4 rounded-lg border-2 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Alunos Vinculados ({linkedStudents.length})
            </h3>

            {linkedStudents.length === 0 ? (
              <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Nenhum aluno vinculado ainda
              </p>
            ) : (
              <div className="space-y-2">
                {linkedStudents.map(student => (
                  <div
                    key={student._id}
                    className={`p-4 rounded-lg flex items-center justify-between ${
                      isDark ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div>
                      <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {student.name}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {student.email}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        Nível {student.level} • {student.coursesCompleted} cursos • {student.hoursLearned}h
                      </p>
                    </div>
                    <button
                      onClick={() => handleUnlinkStudent(student._id)}
                      className={`p-2 rounded-lg transition-all ${
                        isDark
                          ? 'bg-red-900 text-red-200 hover:bg-red-800'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorStudentsManager;