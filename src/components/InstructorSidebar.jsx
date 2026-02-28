import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useInstructor } from '../contexts/InstructorContext';
import { useNavigate } from 'react-router-dom';
import { Menu, X, BarChart3, Users, Settings, LogOut, Moon, Sun } from 'lucide-react';

export const InstructorSidebar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { logoutInstructor } = useInstructor();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: <BarChart3 className="w-6 h-6" />, label: 'Dashboard', path: '/instructor/dashboard' },
    { icon: <Users className="w-6 h-6" />, label: 'Alunos', path: '/instructor/students' },
    { icon: <Settings className="w-6 h-6" />, label: 'Configurações', path: '/instructor/settings' },
  ];

  const handleLogout = () => {
    logoutInstructor();
    navigate('/instructor/auth');
  };

  return (
    <>
      {/* Botão Menu Mobile */}
      <button
        onClick={() => setOpen(!open)}
        className={`md:hidden fixed top-6 left-6 z-50 p-2 rounded-lg ${isDark ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-600'}`}
      >
        {open ? <X className="w-7 h-7" /> : <Menu className="w-8 h-8" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-40 pt-20 md:pt-0 flex flex-col`}
      >
        {/* Logo */}
        <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <img
              src="/ConduzAuto.png"
              alt="Logo"
              className="w-11 h-11 rounded-lg shadow-lg"
            />
            <img
              src={isDark ? '/ConduzAuto white.svg' : '/ConduzAuto gray.svg'}
              alt="ConduzAuto"
              className="h-5 object-contain"
            />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} space-y-2`}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
              isDark
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
            } font-medium`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isDark ? 'Modo Claro' : 'Modo Escuro'}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
              isDark
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
            } font-medium`}
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile overlay - FORA da sidebar */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-30"
        />
      )}
    </>
  );
};

export default InstructorSidebar;
