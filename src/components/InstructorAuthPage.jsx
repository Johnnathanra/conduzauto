import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInstructor } from '../contexts/InstructorContext';
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

export const InstructorAuthPage = () => {
  // 🔴 CARREGAR DADOS SALVOS IMEDIATAMENTE
  const savedEmail = localStorage.getItem('conduzauto_instrutor_remember_email');
  const savedPassword = localStorage.getItem('conduzauto_instrutor_remember_password');
  const wasRemembered = localStorage.getItem('conduzauto_instrutor_remember_me');

  const initialEmail = (savedEmail && wasRemembered === 'true') ? savedEmail : '';
  const initialPassword = (savedPassword && wasRemembered === 'true') ? decryptData(savedPassword) : '';
  const initialRememberMe = (wasRemembered === 'true') ? true : false;

  // ESTADOS - inicializados com os valores carregados
  // 🔴 COMEÇA COM LOGIN (true)
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(initialRememberMe);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginInstructor, registerInstructor, error: contextError, clearError } = useInstructor();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Sincronizar erro do contexto com o estado local
  useEffect(() => {
    if (contextError) {
      console.log('📢 [InstructorAuthPage] Sincronizando erro do contexto:', contextError);
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

    const result = await loginInstructor(email, password);

    if (result.success) {
      console.log('✅ Login bem-sucedido (instrutor). rememberMe:', rememberMe);

      if (rememberMe) {
        try {
          console.log('🔍 Tentando salvar dados...');
          localStorage.setItem('conduzauto_instrutor_remember_email', email);
          console.log('✅ Email salvo');

          localStorage.setItem('conduzauto_instrutor_remember_password', encryptData(password));
          console.log('✅ Password salvo');

          localStorage.setItem('conduzauto_instrutor_remember_me', 'true');
          console.log('✅ RememberMe salvo');

          console.log('💾 [InstructorAuthPage] Todos os dados salvos com sucesso!');
        } catch (err) {
          console.error('❌ [InstructorAuthPage] Erro ao salvar em localStorage:', err);
        }
      } else {
        try {
          localStorage.removeItem('conduzauto_instrutor_remember_email');
          localStorage.removeItem('conduzauto_instrutor_remember_password');
          localStorage.removeItem('conduzauto_instrutor_remember_me');
          console.log('🗑️ [InstructorAuthPage] Dados de "manter-me logado" removidos');
        } catch (err) {
          console.error('❌ [InstructorAuthPage] Erro ao remover de localStorage:', err);
        }
      }

      setSuccess('✅ Login realizado com sucesso!');
      setPassword('');
      setTimeout(() => navigate('/instructor/dashboard'), 100);
    } else {
      console.log('❌ Login falhou');
      setPassword('');
      setConfirmPassword('');
    }

    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validações
    if (!name || !email || !password || !confirmPassword) {
      setError('❌ Por favor, preencha todos os campos!');
      return;
    }

    if (password !== confirmPassword) {
      setError('❌ As senhas não correspondem!');
      return;
    }

    if (password.length < 6) {
      setError('❌ A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    setLoading(true);

    const result = await registerInstructor({
      name,
      email,
      password,
      confirmPassword,
      bio: bio || '',
    });

    if (result.success) {
      setSuccess('✅ Cadastro realizado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setBio('');
      setRememberMe(false);

      // Limpar dados ao registrar
      localStorage.removeItem('conduzauto_instrutor_remember_email');
      localStorage.removeItem('conduzauto_instrutor_remember_password');
      localStorage.removeItem('conduzauto_instrutor_remember_me');
      console.log('🗑️ [InstructorAuthPage] Dados removidos após cadastro');

      setTimeout(() => navigate('/instructor/dashboard'), 100);
    } else {
      setPassword('');
      setConfirmPassword('');
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
    setBio('');
    setRememberMe(false);
    clearError();
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
        <h2 className={`text-2xl font-bold text-center mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {isLogin ? 'Login Instrutor' : 'Cadastro Instrutor'}
        </h2>
        <p className={`text-center text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {isLogin ? 'Entre com suas credenciais' : 'Preencha os dados abaixo'}
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

        <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
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

          {isLogin && (
            <>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className={`ml-2 text-sm cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Manter-me logado
                </label>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => alert('Funcionalidade de recuperação de senha em desenvolvimento!')}
                  className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
                >
                  Esqueci a senha
                </button>
              </div>
            </>
          )}

          {!isLogin && (
            <>
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
                    className={`${inputField} pr-10`}
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

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Biografia (opcional)
                </label>
                <textarea
                  placeholder="Conte um pouco sobre você..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={`${inputField} resize-none`}
                  rows="3"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={primaryButton}
          >
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <p className={`text-center text-sm mt-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <button
            onClick={toggleMode}
            className="text-orange-600 hover:text-orange-700 font-bold"
          >
            {isLogin ? 'Cadastre-se' : 'Faça login'}
          </button>
        </p>

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

export default InstructorAuthPage;
