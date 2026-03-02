import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Check, AlertCircle, Loader } from 'lucide-react';

export const InvitLandingPage = () => {
  const { isDark } = useTheme();
  const { slug, code } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState(null);
  const [error, setError] = useState(null);

  const validateInvite = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/invites/validate/${slug}/${code}`
      );

      const data = await response.json();

      if (response.ok && data.valid) {
        console.log('✅ Convite válido:', data);
        setInvite(data);
        setError(null);
      } else {
        console.error('❌ Erro ao validar convite:', data.message);
        setError(data.message || 'Convite inválido');
        setInvite(null);
      }
    } catch (err) {
      console.error('❌ Erro ao conectar:', err);
      setError('Erro ao validar convite. Tente novamente mais tarde.');
      setInvite(null);
    } finally {
      setLoading(false);
    }
  }, [slug, code]);

  useEffect(() => {
    validateInvite();
  }, [validateInvite]);

  const handleJoinInstructor = () => {
    sessionStorage.setItem('inviteData', JSON.stringify({
      slug,
      code,
      instructorId: invite.instructorId,
      instructorName: invite.instructorName,
      instructorEmail: invite.instructorEmail
    }));

    navigate('/student/register', { 
      state: { 
        inviteSlug: slug, 
        inviteCode: code,
        instructorName: invite.instructorName
      } 
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-4`}>
      <div className={`rounded-lg shadow-2xl max-w-md w-full p-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        
        {loading && (
          <div className="text-center">
            <Loader className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
            <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Validando convite...
            </p>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Por favor, aguarde
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Convite Inválido
            </h2>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {error}
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              Voltar para Home
            </button>
          </div>
        )}

        {invite && !loading && (
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-300" />
            </div>
            
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Convite Válido! 🎉
            </h2>
            
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Você foi convidado para se juntar ao instrutor
            </p>

            <div className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Instrutor
              </p>
              <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {invite.instructorName}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {invite.instructorEmail}
              </p>
            </div>

            <p className={`text-xs mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              ⏰ Convite válido até: {new Date(invite.expiresAt).toLocaleDateString('pt-BR')}
            </p>

            <button
              onClick={handleJoinInstructor}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all text-lg"
            >
              Prosseguir para Registro
            </button>

            <p className={`text-xs mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Você será redirecionado para criar sua conta como aluno
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitLandingPage;
