import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const CTASection = () => {
  const { isDark } = useTheme();

  return (
    <section className={`${isDark ? 'bg-orange-600' : 'bg-orange-600'} py-12 sm:py-16 md:py-24 px-3 sm:px-4 lg:px-8 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
          Pronto para começar sua jornada?
        </h2>
        <p className="text-sm sm:text-base mb-8 text-white opacity-90">
          De novato a motorista confiante! Tudo que você precisa para pegar a estrada seguro. Com ou sem medo, a gente te ajuda.
        </p>

        <Link 
          to="/signup"
          onClick={() => sessionStorage.setItem('authMode', 'signup')}
          className="inline-flex bg-white hover:bg-gray-100 text-orange-600 font-bold py-4 px-9 sm:py-4 sm:px-15 rounded-lg items-center justify-center gap-1 text-sm sm:text-base transition-all mb-7"
        >
          Eu quero!
          <ArrowRight className="w-10 h-4" />
        </Link>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white text-xs sm:text-sm mb-8">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Pagamento facilitado
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Acesso imediato
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Suporte ao aluno
          </div>
        </div>
        </div>
    </section>
  );
};
