import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Check, ArrowRight } from 'lucide-react';

export const PricingSection = () => {
  const { isDark } = useTheme();

  const plans = [
    {
      name: 'Básico',
      price: 'Grátis',
      description: 'Perfeito para começar',
      features: ['5 aulas de teste', 'Comunidade', 'Chat com instrutor'],
      highlighted: false,
    },
    {
      name: 'Profissional',
      price: 'R$ 99',
      period: '/mês',
      description: 'Mais completo',
      features: ['Todas as aulas', 'Simulados ilimitados', 'Certificado', 'Suporte 24/7'],
      highlighted: true,
    },
    {
      name: 'Premium',
      price: 'R$ 149',
      period: '/mês',
      description: 'Suporte máximo',
      features: ['Tudo do Profissional', 'Aulas 1:1', 'Prioridade no suporte', 'Materiais extras'],
      highlighted: false,
    },
  ];

  return (
    <section className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 sm:py-16 md:py-24 px-3 sm:px-4 lg:px-8 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Planos e Preços
        </h2>
        <p className={`text-center text-xs sm:text-base mb-6 sm:mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Escolha o plano que melhor se adequa às suas necessidades
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-4 sm:p-8 border transition-all text-center ${
                plan.highlighted
                  ? `${isDark ? 'bg-gray-800 border-orange-500 ring-2 ring-orange-500' : 'bg-white border-orange-500 ring-2 ring-orange-500'} sm:scale-110`
                  : `${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`
              }`}
            >
              <h3 className={`text-base sm:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
              <p className={`text-xs sm:text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{plan.description}</p>
              
              <div className="mb-6">
                <span className={`text-xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                {plan.period && <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} block`}>{plan.period}</span>}
              </div>

              <button
                className={`w-full mb-6 py-2 px-3 sm:py-3 sm:px-4 rounded-lg font-bold flex items-center justify-center gap-2 text-xs sm:text-base transition-all ${
                  plan.highlighted
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : `${isDark ? 'border border-orange-600 text-orange-400 hover:bg-gray-700' : 'border border-orange-600 text-orange-600 hover:bg-orange-50'}`
                }`}
              >
                Começar <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4" />
              </button>

              <ul className="space-y-1 sm:space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center justify-center gap-2">
                    <Check className="w-3 sm:w-4 h-3 sm:h-4 text-orange-600 flex-shrink-0" />
                    <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};