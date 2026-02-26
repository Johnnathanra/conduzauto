import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Star } from 'lucide-react';

export const TestimonialsSection = () => {
  const { isDark } = useTheme();

  const testimonials = [
    {
      name: 'Maria Silva',
      text: 'Tinha medo de dirigir, mas consegui superar e tirei minha CNH na primeira tentativa!',
      avatar: '👩',
      rating: 5
    },
    {
      name: 'João Santos',
      text: 'Plataforma excelente. As aulas são claras e os simulados muito realistas.',
      avatar: '👨',
      rating: 5
    },
    {
      name: 'Ana Costa',
      text: 'Melhor parte é poder aprender no meu ritmo. Muito recomendado!',
      avatar: '👩‍🦰',
      rating: 5
    },
    {
      name: 'Pedro Oliveira',
      text: 'Os simulados me prepararam perfeitamente para o exame real. Obrigado!',
      avatar: '👨‍💼',
      rating: 5
    }
  ];

  return (
    <section className={`${isDark ? 'bg-gray-900' : 'bg-orange-50'} py-20 px-4`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            O Que Nossos Alunos Dizem
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Histórias de sucesso de pessoas que transformaram suas vidas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 ${
                isDark
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-600 text-orange-600" />
                ))}
              </div>

              <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};