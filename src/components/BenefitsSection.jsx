import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BookOpen, Users, Award, Clock, Shield, BarChart3 } from 'lucide-react';

export const BenefitsSection = () => {
  const { isDark } = useTheme();

  const benefits = [
    { icon: BookOpen, title: 'Aulas Estruturadas', description: 'Conteúdo organizado do básico ao avançado' },
    { icon: Users, title: 'Instrutores Qualificados', description: 'Profissionais experientes e certificados' },
    { icon: Award, title: 'Certificação Reconhecida', description: 'Validada pelos órgãos de trânsito' },
    { icon: Clock, title: 'Flexibilidade de Horários', description: 'Estude no seu próprio ritmo' },
    { icon: Shield, title: 'Segurança em Primeiro Lugar', description: 'Foco em direção defensiva' },
    { icon: BarChart3, title: 'Acompanhamento Completo', description: 'Relatórios detalhados de progresso' },
  ];

  return (
    <section className={`${isDark ? 'bg-gray-800' : 'bg-white'} py-12 sm:py-16 md:py-24 px-3 sm:px-4 lg:px-8 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Por que escolher ConduzAuto?
        </h2>
        <p className={`text-center text-xs sm:text-base mb-6 sm:mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Plataforma completa para você aprender e também à dirigir com segurança e confiança.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 md:gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className={`p-3 sm:p-6 rounded-lg border transition-all ${isDark ? 'bg-gray-900 border-gray-700 hover:border-orange-500' : 'bg-gray-50 border-gray-200 hover:border-orange-500'}`}>
                <Icon className="w-5 sm:w-8 h-5 sm:h-8 text-orange-600 mb-2 sm:mb-3" />
                <h3 className={`font-bold text-xs sm:text-base mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{benefit.title}</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};