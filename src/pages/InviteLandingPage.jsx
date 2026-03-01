import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { CheckCircle, Users, BookOpen, Award, ArrowRight } from 'lucide-react';

export default function InviteLandingPage() {
  const { slug, code } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateInvite = async () => {
      try {
        console.log('🔍 [InviteLandingPage] Validando convite:', { slug, code });
        
        if (!slug || !code) {
          throw new Error('Link de convite inválido');
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/invites/validate/${slug}/${code}`
        );

        if (!response.ok) {
          throw new Error('Convite inválido ou expirado');
        }

        const data = await response.json();
        console.log('✅ [InviteLandingPage] Convite válido:', data);
        setInviteData(data);
      } catch (err) {
        console.error('❌ [InviteLandingPage] Erro:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    validateInvite();
  }, [slug, code]);

  const handleBeginNow = () => {
    if (inviteData) {
      console.log('🎯 [InviteLandingPage] Redirecionando para cadastro com convite');
      navigate('/signup', {
        state: {
          inviteCode: code,
          inviteSlug: slug,
          instructorName: inviteData.instructorName || 'Seu Instrutor'
        }
      });
    }
  };

  // Loading
  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Validando seu convite...</p>
        </div>
      </div>
    );
  }

  // Erro
  if (error) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'} flex items-center justify-center p-4`}>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full shadow-2xl text-center`}>
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Convite Inválido
          </h1>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {error}
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Voltar à Página Inicial
          </button>
        </div>
      </div>
    );
  }

  // Sucesso
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'} py-12 px-4`}>
      <div className={`max-w-3xl mx-auto ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8 md:p-12`}>
        
        {/* Header com mensagem de convite */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Bem-vindo à <span className="text-orange-600">ConduzAuto</span>
          </h1>
          <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            A plataforma completa para aprendizado de direção e avaliação de competências. Você foi convidado por{' '}
            <strong className="text-orange-600">{inviteData?.instructorName || 'Seu Instrutor'}</strong> para começar sua jornada de aprendizado!
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Feature 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <BookOpen className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Aulas Interativas
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Aprenda com conteúdo estruturado e interativo adaptado às suas necessidades
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <CheckCircle className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Avaliações Completas
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Receba feedback detalhado e acompanhe seu progresso em tempo real
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Comunidade Ativa
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Conecte-se com outros alunos e instrutores em um ambiente colaborativo
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Certificações
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Obtenha certificados reconhecidos ao completar seus cursos
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className={`${isDark ? 'bg-gray-700' : 'bg-orange-50'} rounded-lg p-4 text-center`}>
            <p className="text-2xl font-bold text-orange-600">+5K</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Alunos</p>
          </div>
          <div className={`${isDark ? 'bg-gray-700' : 'bg-orange-50'} rounded-lg p-4 text-center`}>
            <p className="text-2xl font-bold text-orange-600">+200</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Instrutores</p>
          </div>
          <div className={`${isDark ? 'bg-gray-700' : 'bg-orange-50'} rounded-lg p-4 text-center`}>
            <p className="text-2xl font-bold text-orange-600">95%</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Taxa de Sucesso</p>
          </div>
          <div className={`${isDark ? 'bg-gray-700' : 'bg-orange-50'} rounded-lg p-4 text-center`}>
            <p className="text-2xl font-bold text-orange-600">24/7</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Suporte</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleBeginNow}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
          >
            Começar Agora <ArrowRight className="w-5 h-5" />
          </button>

          <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            ✨ Já tem conta? Faça login durante o cadastro
          </p>
        </div>
      </div>
    </div>
  );
}
