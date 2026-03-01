import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../contexts/StudentContext';
import { useTheme } from '../contexts/ThemeContext';
import { Eye, EyeOff } from 'lucide-react';

// Funções de encriptação/desencriptação com Base64
const encryptData = (data) => {
  return btoa(data);
};

const decryptData = (encryptedData) => {
  try {
    return atob(encryptedData);
  } catch (e) {
    return '';
  }
};

export default function StudentLoginPage() {
  // 🔴 CARREGAR DADOS SALVOS IMEDIATAMENTE
  const savedEmail = localStorage.getItem('conduzauto_aluno_remember_email');
  const savedPassword = localStorage.getItem('conduzauto_aluno_remember_password');
  const wasRemembered = localStorage.getItem('conduzauto_aluno_remember_me');

  const initialEmail = (savedEmail && wasRemembered === 'true') ? savedEmail : '';
  const initialPassword = (savedPassword && wasRemembered === 'true') ? decryptData(savedPassword) : '';
  const initialRememberMe = (wasRemembered === 'true') ? true : false;

  // ESTADOS - inicializados com os valores carregados
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(initialRememberMe);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser, error: contextError } = useStudent();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Sincronizar erro do contexto com o estado local
  useEffect(() => {
    if (contextError) {
      console.log('📢 [StudentLoginPage] Sincronizando erro do contexto:', contextError);
      const errorMessage = `❌ ${contextError}`;
      setError(prevError => {
        if (prevError !== errorMessage) {
          console.log('🔄 Atualizando erro na página');
          return errorMessage;
        }
        return prevError;
      });
    }
  }, [contextError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const result = await loginUser(email, password);

    if (result?.success) {
      console.log('✅ Login bem-sucedido (aluno). rememberMe:', rememberMe);

      if (rememberMe) {
        try {
          console.log('🔍 Tentando salvar dados...');
          localStorage.setItem('conduzauto_aluno_remember_email', email);
          console.log('✅ Email salvo');

          localStorage.setItem('conduzauto_aluno_remember_password', encryptData(password));
          console.log('✅ Password salvo');

          localStorage.setItem('conduzauto_aluno_remember_me', 'true');
          console.log('✅ RememberMe salvo');

          console.log('💾 [StudentLoginPage] Todos os dados salvos com sucesso!');
        } catch (err) {
          console.error('❌ [StudentLoginPage] Erro ao salvar em localStorage:', err);
        }
      } else {
        try {
          localStorage.removeItem('conduzauto_aluno_remember_email');
          localStorage.removeItem('conduzauto_aluno_remember_password');
          localStorage.removeItem('conduzauto_aluno_remember_me');
          console.log('🗑️ [StudentLoginPage] Dados de "manter-me logado" removidos');
        } catch (err) {
          console.error('❌ [StudentLoginPage] Erro ao remover de localStorage:', err);
        }
      }

      setSuccess('✅ Login realizado com sucesso!');
      setPassword('');
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      console.log('❌ Login falhou');
      setPassword('');
    }

    setLoading(false);
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
          isDark
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        } border rounded-xl p-8 max-w-md w-full shadow-2xl`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          Login Aluno
        </h2>
        <p
          className={`text-center text-sm mb-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Entre com suas credenciais
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
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

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
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
                  isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => {
                console.log('✅ [StudentLoginPage] rememberMe mudou para:', e.target.checked);
                setRememberMe(e.target.checked);
              }}
              className="w-4 h-4 text-orange-600 rounded cursor-pointer"
            />
            <label
              htmlFor="rememberMe"
              className={`ml-2 text-sm cursor-pointer ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Manter-me logado
            </label>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() =>
                alert('Funcionalidade de recuperação de senha em desenvolvimento!')
              }
              className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
            >
              Esqueci a senha
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={primaryButton}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>

        <p
          className={`text-center text-sm mt-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Não tem conta?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-orange-600 hover:text-orange-700 font-bold"
          >
            Cadastre-se
          </button>
        </p>

        <button
          onClick={() => (window.location.href = '/')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-3 text-sm rounded-lg transition-all w-25 mx-auto block mt-6"
        >
          ← Voltar à página inicial
        </button>
      </div>
    </div>
  );
}
