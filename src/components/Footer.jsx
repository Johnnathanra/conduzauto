import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-900 border-gray-800'} border-t transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo e Nome */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center leading-none">
              <span className="text-white font-bold text-base">CA</span>
            </div>
            <span className="text-white font-bold sm:text-base">ConduzAuto</span>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-right">
            © 2024 ConduzAuto. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};