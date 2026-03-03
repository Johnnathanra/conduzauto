import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiAluno } from '../api';

const StudentContext = createContext();
const TOKEN_KEY = 'conduzauto_aluno_token';

export const StudentProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Carregar token do sessionStorage ao iniciar (isolado por aba)
  useEffect(() => {
    const loadUser = async () => {
      console.log('🔍 [StudentContext] Verificando token do ALUNO...');
      const savedToken = sessionStorage.getItem(TOKEN_KEY);
      console.log('🔓 [StudentContext] sessionStorage token:', savedToken ? `✅ ${savedToken.substring(0, 20)}...` : '❌ null');
      
      if (savedToken) {
        console.log('📡 [StudentContext] Token encontrado, carregando perfil...');
        try {
          const response = await apiAluno.get('/auth/profile', {
            headers: { Authorization: `Bearer ${savedToken}` }
          });
          console.log('👤 [StudentContext] Perfil carregado:', response.data.name);
          console.log('👨‍🏫 [StudentContext] Instrutor:', response.data.instructorName || 'nenhum');
          setToken(savedToken);
          setUser(response.data);
          setError(null);
        } catch (err) {
          console.error('❌ [StudentContext] Erro ao carregar perfil:', err.message);
          sessionStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setUser(null);
          setError('Sessão expirada. Por favor, faça login novamente.');
        }
      } else {
        console.log('🏠 [StudentContext] Nenhum token, aluno não-logado');
        setError(null);
      }
      
      setLoading(false);
    };
    
    loadUser();
  }, []);

  const signup = async (data) => {
    try {
      console.log('📝 [StudentContext] Registrando aluno...');
      console.log('📧 [StudentContext] Dados de registro:', { 
        name: data.name, 
        email: data.email,
        inviteCode: data.inviteCode || 'nenhum',
        inviteSlug: data.inviteSlug || 'nenhum'
      });
      setError(null);
      
      // ✅ Enviar inviteCode e inviteSlug se existirem
      const registrationData = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        ...(data.inviteCode && { inviteCode: data.inviteCode }),
        ...(data.inviteSlug && { inviteSlug: data.inviteSlug })
      };

      const res = await apiAluno.post('/auth/register', registrationData);
      const { token: newToken, user: userData } = res.data;
      
      console.log('✅ [StudentContext] Aluno registrado:', userData.name);
      console.log('👨‍🏫 [StudentContext] Dados do instrutor:', {
        instructorId: userData.instructorId,
        instructorName: userData.instructorName,
        instructorEmail: userData.instructorEmail
      });
      
      // ✅ MAPEAR CORRETAMENTE OS DADOS DO INSTRUTOR
      const userWithInstructor = {
        ...userData,
        instructorId: userData.instructorId || null,
        instructorName: userData.instructorName || null,
        instructorEmail: userData.instructorEmail || null,
      };

      sessionStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
      setUser(userWithInstructor);
      setError(null);
      
      console.log('✅ [StudentContext] User com instrutor:', userWithInstructor);
      return { success: true, token: newToken, user: userWithInstructor };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Erro ao registrar';
      setError(msg);
      console.error('❌ [StudentContext] Erro no registro:', msg);
      console.error('❌ [StudentContext] Status:', err.response?.status);
      console.error('❌ [StudentContext] Dados da resposta:', err.response?.data);
      return { success: false, error: msg };
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔐 [StudentContext] Fazendo login do aluno com email:', email);
      
      const res = await apiAluno.post('/auth/login', { email, password });
      const { token: newToken, user: userData } = res.data;
      
      console.log('✅ [StudentContext] Login bem-sucedido:', userData.name);
      console.log('👨‍🏫 [StudentContext] Dados do instrutor:', {
        instructorId: userData.instructorId,
        instructorName: userData.instructorName,
        instructorEmail: userData.instructorEmail
      });

      // ✅ MAPEAR CORRETAMENTE OS DADOS DO INSTRUTOR
      const userWithInstructor = {
        ...userData,
        instructorId: userData.instructorId || null,
        instructorName: userData.instructorName || null,
        instructorEmail: userData.instructorEmail || null,
      };

      sessionStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
      setUser(userWithInstructor);
      setError(null);
      setLoading(false);
      
      console.log('✅ [StudentContext] User com instrutor:', userWithInstructor);
      return { success: true, token: newToken, user: userWithInstructor };
    } catch (err) {
      console.error('❌ [StudentContext] Erro no login');
      console.error('❌ Status HTTP:', err.response?.status);
      console.error('❌ Resposta da API:', err.response?.data);
      console.error('❌ Mensagem de erro:', err.message);
      
      let msg = 'Erro ao fazer login';
      
      if (err.response?.status === 401) {
        const apiMessage = err.response?.data?.message?.toLowerCase() || '';
        if (apiMessage.includes('credenciais inválidas') || apiMessage.includes('invalid credentials')) {
          msg = 'Usuário não encontrado';
        } else {
          msg = 'Email ou senha incorretos';
        }
      } else if (err.response?.status === 404) {
        msg = 'Usuário não encontrado';
      } else if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.message === 'Network Error') {
        msg = 'Erro de conexão. Verifique sua internet.';
      }
      
      setError(msg);
      setToken(null);
      setUser(null);
      setLoading(false);
      
      return { success: false, error: msg };
    }
  };

  const clearError = () => {
    console.log('🧹 [StudentContext] Limpando erro');
    setError(null);
  };

  const logoutUser = () => {
    console.log('🚪 [StudentContext] Fazendo logout do aluno');
    sessionStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
    setError('');
  };

  return (
    <StudentContext.Provider value={{ 
      user, 
      token, 
      loading, 
      error, 
      signup, 
      login, 
      logoutUser, 
      clearError,
      signupUser: signup,
      loginUser: login
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error('useStudent deve ser usado dentro de StudentProvider');
  return context;
};

export default StudentContext;
