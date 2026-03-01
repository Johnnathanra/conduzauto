import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useStudent } from '../contexts/StudentContext';
import { useInstructor } from '../contexts/InstructorContext';
import { Sun, Moon, LogIn, Briefcase } from 'lucide-react';

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { clearError: clearStudentError } = useStudent();
  const { clearError: clearInstructorError } = useInstructor();

  // 🔴 NOVO: Funções para limpar erro ao navegar
  const handleLoginAluno = () => {
    clearStudentError();
    window.location.href = '/auth';
  };

  const handleLoginInstrutor = () => {
    clearInstructorError();
    window.location.href = '/instructor/auth';
  };

  return (
    <header className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-orange-100'} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 py-7">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/ConduzAuto.png" 
            alt="ConduzAuto Logo" 
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl shadow-lg"
          />
          <img 
            src={isDark ? '/ConduzAuto white.svg' : '/ConduzAuto gray.svg'} 
            alt="ConduzAuto Logo" 
            className="h-4 sm:h-5 md:h-5 object-contain"
          />
        </Link>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className={`p-3 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Login Aluno */}
          <button 
            onClick={handleLoginAluno}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Login Aluno
          </button>

          {/* Login Instrutor */}
          <button 
            onClick={handleLoginInstrutor}
            className={`font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2 ${
              isDark 
                ? 'bg-gray-800 text-orange-400 hover:bg-gray-700 border border-orange-400' 
                : 'bg-white text-orange-600 hover:bg-gray-100 border border-orange-600'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Login Instrutor
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={toggleTheme} 
            className={`p-3 rounded-lg transition-colors ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Dropdown Mobile */}
          <div className="relative group">
            <button className={`p-3 rounded-lg transition-colors ${isDark ? 'text-orange-400 hover:bg-gray-800' : 'text-orange-600 hover:bg-gray-100'}`}>
              <LogIn className="w-8 h-7" />
            </button>
            <div className={`absolute right-0 mt-0 w-48 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
              <button 
                onClick={handleLoginAluno}
                className={`block w-full text-left px-4 py-3 rounded-t-lg font-medium transition-colors ${isDark ? 'text-orange-400 hover:bg-gray-700' : 'text-orange-600 hover:bg-gray-100'}`}
              >
                Login Aluno
              </button>
              <button 
                onClick={handleLoginInstrutor}
                className={`block w-full text-left px-4 py-3 rounded-b-lg font-medium transition-colors ${isDark ? 'text-orange-400 hover:bg-gray-700' : 'text-orange-600 hover:bg-gray-100'}`}
              >
                Login Instrutor
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
