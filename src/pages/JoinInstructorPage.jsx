import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { CheckCircle, AlertCircle, Loader, LogOut } from 'lucide-react';
import { apiAluno } from '../api';

export default function JoinInstructorPage() {
  const { slug, code } = useParams();
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const { isDark } = useTheme();

  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState(null);
  const [error, setError] = useState('');
  const [accepting, setAccepting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      console.log('❌ [JoinInstructor] Usuário não logado, redirecionando');
      navigate('/login-aluno');
      return;
    }

    console.log('👤 [JoinInstructor] Usuário logado:', user.name);

    const validateInvitation = async () => {
      try {
        console.log('🔍 [JoinInstructor] Validando:', slug, code);
        const response = await apiAluno.get(`/instructor/invitation/${slug}/${code}`);
        console.log('✅ [JoinInstructor] Convite válido:', response.data);
        setInvitation(response.data);
        setError('');
      } catch (err) {
        const errorMsg = err.response?.data?.error || 'Erro ao validar código';
        console.error('❌ [JoinInstructor] Erro:', errorMsg);
        setError(errorMsg);
        setInvitation(null);
      } finally {
        setLoading(false);
      }
    };

    validateInvitation();
  }, [slug, code, user, navigate]);

  const handleAcceptInvitation = async () => {
    setAccepting(true);
    try {
      const token = localStorage.getItem('conduzauto_aluno_token');
      console.log('🎯 [JoinInstructor] Aceitando convite');
      
      const response = await apiAluno.post(
        '/instructor/accept-invitation',
        { slug, code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log('✅ [JoinInstructor] Convite aceito:', response.data);
      setSuccess(true);
      
      setTimeout(() => {
        console.log('🔄 [JoinInstructor] Redirecionando para dashboard');
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erro ao aceitar convite';
      console.error('❌ [JoinInstructor] Erro ao aceitar:', errorMsg);
      setError(errorMsg);
    } finally {
      setAccepting(false);
    }
  };

  const handleLogout = () => {
    console.log('🚪 [JoinInstructor] Fazendo logout');
    logoutUser();
    navigate('/');
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header com logout */}
      <div className={`w-full ${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} p-4`}>
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            ConduzAuto
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-bold py-2 px-3 rounded-lg transition-all"
            title="Fazer logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 w-full flex items-center justify-center p-4">
        <div className={`w-full max-w-md p-8 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Convite do Instrutor
          </h2>

          {loading && (
            <div className="flex justify-center items-center gap-3">
              <Loader className="w-8 h-8 animate-spin text-orange-600" />
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Validando convite...</span>
            </div>
          )}

          {error && !loading && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Erro ao validar convite</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                Voltar para Home
              </button>
            </div>
          )}

          {invitation && !error && !loading && (
            <div className="space-y-6">
              {/* Informações do Instrutor */}
              <div className={`p-4 rounded-lg border-2 border-orange-500 ${isDark ? 'bg-gray-700' : 'bg-orange-50'}`}>
                <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Você foi convidado por:
                </p>
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {invitation.instructorName}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {invitation.instructorEmail}
                </p>
              </div>

              {/* Informações do Aluno */}
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Você está logado como:
                </p>
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user?.name}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user?.email}
                </p>
              </div>

              {/* Sucesso */}
              {success ? (
                <div className="flex flex-col items-center gap-3 p-4 bg-green-100 text-green-700 rounded-lg border border-green-300">
                  <CheckCircle className="w-8 h-8" />
                  <p className="font-bold text-center">Convite aceito com sucesso!</p>
                  <p className="text-sm text-center">Redirecionando para o dashboard...</p>
                </div>
              ) : (
                <button
                  onClick={handleAcceptInvitation}
                  disabled={accepting}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {accepting ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Aceitando...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Aceitar Convite</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={`w-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} p-4 text-center`}>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          © 2026 ConduzAuto - Sistema de Autoescola
        </p>
      </div>
    </div>
  );
}