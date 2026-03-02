import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Check, AlertCircle, Loader, Zap } from 'lucide-react';

const InviteLandingPage = () => {
  const { isDark } = useTheme();
  const { slug, code } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState(null);
  const [error, setError] = useState(null);

  const validateInvite = useCallback(async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      console.log('🔍 [InviteLandingPage] Validando convite:', { slug, code, apiUrl });

      const response = await fetch(`${apiUrl}/invites/validate/${slug}/${code}`);
      const data = await response.json();

      console.log('✅ [InviteLandingPage] Resposta da validação:', data);

      if (response.ok && data.valid) {
        setInvite(data);
        setError(null);
      } else {
        setError(data.message || 'Convite inválido ou expirado');
        setInvite(null);
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (err) {
      console.error('❌ [InviteLandingPage] Erro:', err);
      setError('Erro ao validar convite. Redirecionando...');
      setInvite(null);
      setTimeout(() => navigate('/'), 3000);
    } finally {
      setLoading(false);
    }
  }, [slug, code, navigate]);

  useEffect(() => {
    validateInvite();
  }, [validateInvite]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Validando seu convite...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="text-center max-w-md p-8">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Convite Inválido</h1>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
          >
            ← Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  if (invite) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-white via-orange-50 to-white'}`}>
        {/* Header com Logo */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
          <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>ConduzAuto</h1>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Voltar
            </button>
          </div>
        </div>

        {/* Banner de Convite */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-6">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-xl font-bold mb-2">
              🎉 Parabéns! Você foi convidado!
            </p>
            <p className="text-orange-100">
              <strong>{invite.instructorName}</strong> quer te ajudar a dominar a direção defensiva
            </p>
            <p className="text-sm text-orange-200 mt-2">
              Convite válido até {new Date(invite.expiresAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Título Atrativo */}
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Comece sua jornada agora! 🚗
            </h2>

            {/* Descrição */}
            <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Aprenda as melhores técnicas de direção defensiva, segurança nas ruas e como se tornar um motorista mais confiante e responsável. Seu instrutor <strong>{invite.instructorName}</strong> está esperando por você!
            </p>

            {/* Card do Instrutor */}
            <div className={`mb-12 p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
              <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Seu Instrutor</p>
              <p className={`text-2xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>{invite.instructorName}</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{invite.instructorEmail}</p>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  sessionStorage.setItem('inviteData', JSON.stringify({
                    slug,
                    code,
                    instructorId: invite.instructorId,
                    instructorName: invite.instructorName,
                    instructorEmail: invite.instructorEmail,
                  }));
                  navigate('/signup', { state: { inviteSlug: slug, inviteCode: code, instructorName: invite.instructorName } });
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 text-lg"
              >
                <Check className="w-6 h-6" />
                Começar Agora
              </button>

              <button
                onClick={() => navigate('/')}
                className={`font-bold py-4 px-8 rounded-lg transition-all ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
              >
                Saber Mais
              </button>
            </div>

            {/* Benefícios Rápidos */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <p className="text-2xl mb-2">🎯</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Direção Segura</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Aprenda técnicas comprovadas</p>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <p className="text-2xl mb-2">📚</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Conteúdo Completo</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Tudo que você precisa saber</p>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <p className="text-2xl mb-2">⭐</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Instrutor Expert</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Mentoria personalizada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Simples */}
        <div className={`border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} py-6 text-center`}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2026 ConduzAuto. Todos os direitos reservados.
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default InviteLandingPage;
