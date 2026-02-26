import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BookOpen, Zap, BarChart3, Lock, Users, Lightbulb } from 'lucide-react';

export const FeaturesSection = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Aulas Estruturadas',
      description: 'Teoria organizada com tempo estimado e dicas práticas para cada módulo'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Simulados Interativos',
      description: 'Pratique cenários reais de direção com feedback detalhado em tempo real'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Progresso Gamificado',
      description: 'Sistema de níveis, badges e pontuação para manter você motivado'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Código Atualizado',
      description: 'Informações do código de trânsito atualizadas diariamente'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Para Todas as Idades',
      description: 'Interface intuitiva e acessível para adolescentes, adultos e idosos'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Supere o Medo',
      description: 'Conteúdo especializado para quem tem receio de dirigir'
    }
  ];

  return (
    <section id="recursos" className={`${isDark ? 'bg-gray-800' : 'bg-white'} py-20 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recursos Principais
          </h3>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Tudo que você precisa para aprender a dirigir com segurança e confiança
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg hover:scale-105 ${
                isDark
                  ? 'bg-gray-700 border-gray-600 hover:border-orange-500'
                  : 'bg-gray-50 border-orange-200 hover:border-orange-500'
              }`}
            >
              <div className="text-orange-600 mb-4">
                {feature.icon}
              </div>
              <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h4>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};