import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, LogIn, LogOut } from 'lucide-react';

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
 
  return (
    <header className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-orange-100'} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 py-7">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg leading-none">
            <span className="text-white font-bold text-xl">CA</span>
          </div>
          <span className={`font-bold text-base sm:text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>ConduzAuto</span>
        </Link>
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className={`p-3 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/auth" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            Login
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleTheme} className={`p-3 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/auth" className={`p-3 rounded-lg transition-colors ${isDark ? 'text-orange-400 hover:bg-gray-800' : 'text-orange-600 hover:bg-gray-100'}`}>
            <LogIn className="w-8 h-7" />
          </Link>
        </div>
      </div>
    </header>
  );
};