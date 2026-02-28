import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Menu, X, Home, BookOpen, Gamepad2, BarChart3, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Sidebar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const menuItems = [
    { icon: <Home className="w-6 h-6" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <BookOpen className="w-6 h-6" />, label: 'Aulas', path: '/aulas' },
    { icon: <Gamepad2 className="w-6 h-6" />, label: 'Simulados', path: '/simulados' },
    { icon: <BarChart3 className="w-6 h-6" />, label: 'Estatísticas', path: '/estatisticas' },
    { icon: <Settings className="w-6 h-6" />, label: 'Configurações', path: '/configuracoes' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setOpen(false);
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

      {/* Overlay Mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-30"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40 pt-20 md:pt-0 flex flex-col`}>
        
        {/* Logo */}
        <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <img src="/ConduzAuto.png" alt="ConduzAuto Logo" className="w-11 h-11 rounded-lg shadow-lg" />
            <img src={isDark ? '/ConduzAuto white.svg' : '/ConduzAuto gray.svg'} alt="ConduzAuto" className="h-5 object-contain" />
          </div>
        </div>

        {/* Itens do Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
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

        {/* Seção Inferior */}
        <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} space-y-2`}>
          {/* Alternar Tema */}
          <button
            onClick={() => {
              toggleTheme();
              setOpen(false);
            }}
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${
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
            onClick={() => {
              handleLogout();
              setOpen(false);
            }}
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${
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
    </>
  );
};

export default Sidebar;