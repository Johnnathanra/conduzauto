import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  const { isDark } = useTheme();

  return (
    <section className={`${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'} py-6 sm:py-12 md:py-32 px-3 sm:px-4 lg:px-8 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-3 sm:space-y-6 md:space-y-8 order-2 md:order-1 flex flex-col items-center md:items-start text-right md:text-left">
            {/* Main Heading */}
            <div className="text-center md:text-left">
              <h2 className={`text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Aprenda a
              </h2>
              <h2 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-orange-600">
                Conduzir Bem
              </h2>
            </div>

            {/* Description */}
            <p className={`text-center md:text-left text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                Dirija com segurança desde o início! Aulas de legislação, comando do veículo e técnicas de direção. 
Estruturado para iniciantes e motoristas experientes que querem se aprimorar.
            </p>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4 w-full md:w-auto flex justify-center md:justify-start">
              <Link 
                to="/auth"
                onClick={() => sessionStorage.setItem('authMode', 'signup')}
                className="inline-flex bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 px-20 sm:py-5 sm:px-12 rounded-lg items-center gap-3 transition-all hover:shadow-lg text-base sm:text-xl whitespace-nowrap"
              >
                Começar Agora
                <ArrowRight className="w-3 sm:w-5 h-3 sm:h-5" />
              </Link>
            </div>
          </div>

          {/* Right Visual - Imagem Responsiva e Centralizada */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className={`rounded-xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-2xl border-4 sm:border-8 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-100'} w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl h-auto aspect-video`}>
          <img
               src="BVjwvNJ5.png"
               alt="Aprenda a Conduzir Bem"
               className="w-full h-full object-cover"
          />
          </div>
         </div>
        </div>
      </div>
    </section>
  );
};