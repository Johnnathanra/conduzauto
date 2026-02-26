import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Moon, LogOut, Menu, X } from 'lucide-react';

export const DashboardHeader = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`${isDark ? 'bg-black border-gray-900' : 'bg-white border-orange-100'} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="w-full flex items-center justify-between px-4 md:px-8 py-4 md:py-5">
        
        {/* Logo - Esquerda */}
        <Link to="/dashboard" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-base md:text-lg">CA</span>
          </div>
          <span className={`font-bold text-sm md:text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>ConduzAuto</span>
        </Link>

        {/* Desktop Actions - Direita */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-900 text-yellow-400 hover:bg-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {user?.name}
          </span>

          <button 
            onClick={logout}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-900 text-yellow-400 hover:bg-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-orange-100'} border-t`}>
          <div className="px-4 py-4 space-y-3">
            <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user?.name}
            </p>
            <button 
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;