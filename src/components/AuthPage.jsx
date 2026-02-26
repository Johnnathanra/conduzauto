import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Eye, EyeOff } from 'lucide-react';

export const AuthPage = () => {
  const authMode = sessionStorage.getItem('authMode') || 'login';
  const [isLogin, setIsLogin] = useState(authMode === 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Limpar sessionStorage após usar
   React.useEffect(() => {
  const savedEmail = localStorage.getItem('conduzauto_email');
  const savedPassword = localStorage.getItem('conduzauto_password');
  if (savedEmail && savedPassword) {
    setEmail(savedEmail);
    setPassword(savedPassword);
    setRememberMe(true);
  }
  sessionStorage.removeItem('authMode');
}, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password, rememberMe);
    
    if (result.success) {
      setSuccess('✅ Login realizado com sucesso!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      setError(`❌ ${result.error}`);
    }
    
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signup(name, email, password, confirmPassword, rememberMe);
    
    if (result.success) {
      setSuccess('✅ Cadastro realizado com sucesso!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      setError(`❌ ${result.error}`);
    }
    
    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const inputField = `w-full px-4 py-2 rounded-lg border-2 ${
    isDark
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  const primaryButton = `bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-all w-full disabled:opacity-50`;

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'
      } flex items-start justify-center px-4 py-20`}
    >
      <div
        className={`${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-xl p-8 max-w-md w-full shadow-2xl`}
      >
        {/* Logo */}
        <button
          onClick={() => window.location.href = '/'}
          className="flex items-center justify-center gap-2 w-full mb-8 bg-none border-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">CA</span>
          </div>
          <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
            ConduzAuto
          </span>
        </button>

        {/* Heading */}
        <h2 className={`text-2xl font-bold text-center mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {isLogin ? 'Login' : 'Criar Conta'}
        </h2>
        <p className={`text-center text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {isLogin ? 'Entre com suas credenciais' : 'Preencha os dados abaixo'}
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
          {/* Name (Signup only) */}
          {!isLogin && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Nome Completo
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputField}
                required={!isLogin}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputField}
              required
            />
          </div>

          {/* Password */}
          <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Senha
          </label>
          <div className="relative">
          <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputField} pr-10`}
              required
          />
          <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
               isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
           }`}
          >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
         </div>
        </div>
        {/* Esqueci a Senha (Login only) */}
        {isLogin && (
          <div className="text-right">
          <button
               type="button"
               onClick={() => alert('Funcionalidade de recuperação de senha em desenvolvimento!')}
               className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
          >
              Esqueci a senha
          </button>
        </div>
       )}

          {/* Confirm Password (Signup only) */}
          {!isLogin && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputField}
                  required={!isLogin}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Remember Me (Login only) */}
          {isLogin && (
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-orange-600"
              />
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Manter-me logado
              </span>
            </label>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={primaryButton}
          >
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        {/* Toggle Mode */}
        <p className={`text-center text-sm mt-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <button
            onClick={toggleMode}
            className="text-orange-600 hover:text-orange-700 font-bold"
          >
            {isLogin ? 'Cadastre-se' : 'Faça login'}
          </button>
        </p>

        {/* Back to Home */}
        <button
          onClick={() => window.location.href = '/'}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-3 text-sm rounded-lg transition-all w-25 mx-auto block mt-6"
        >
          ← Voltar à página inicial
       </button>
      </div>
    </div>
  );
};