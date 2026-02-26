import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDown } from 'lucide-react';

export const FAQSection = () => {
  const { isDark } = useTheme();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Como funciona a plataforma?',
      answer: 'ConduzAuto oferece aulas teóricas, simulados práticos e acompanhamento personalizado. Você estuda no seu ritmo e progride através de níveis.',
    },
    {
      question: 'Posso usar em dispositivos móveis?',
      answer: 'Sim! Nossa plataforma é responsiva e funciona perfeitamente em smartphones, tablets e computadores.',
    },
    {
      question: 'Quanto tempo leva para aprender?',
      answer: 'Depende do seu ritmo. Muitos alunos completam o curso em 4-8 semanas estudando regularmente.',
    },
    {
      question: 'O certificado é válido?',
      answer: 'Sim, nossos certificados são reconhecidos pelos órgãos de trânsito brasileiros.',
    },
    {
      question: 'Há suporte disponível?',
      answer: 'Claro! Oferecemos suporte via chat, email e aulas 1:1 conforme o plano escolhido.',
    },
  ];

  return (
    <section className={`${isDark ? 'bg-gray-800' : 'bg-white'} py-12 sm:py-16 md:py-24 px-3 sm:px-4 lg:px-8 transition-colors duration-300`}>
      <div className="max-w-3xl mx-auto">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Perguntas Frequentes
        </h2>
        <p className={`text-center text-sm sm:text-base mb-8 sm:mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Tire suas dúvidas sobre a plataforma
        </p>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-lg border transition-all ${
                openIndex === idx
                  ? `${isDark ? 'bg-gray-900 border-orange-500' : 'bg-gray-50 border-orange-500'}`
                  : `${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className={`w-full p-4 sm:p-6 flex items-center justify-between text-left transition-all ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <h3 className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-orange-600 transition-transform flex-shrink-0 ml-2 ${openIndex === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === idx && (
                <div className={`px-4 sm:px-6 pb-4 sm:pb-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center text-base mt-12 mb-1">
  <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-xl transition-all inline-flex items-center gap-3 mt-3">
    Saiba Mais
    <span>→</span>
  </button>
</div>
    </section>
  );
};
