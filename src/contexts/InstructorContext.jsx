import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiInstrutor } from '../api';

const InstructorContext = createContext();
const TOKEN_KEY = 'conduzauto_instrutor_token';

export const InstructorProvider = ({ children }) => {
  const [instructor, setInstructor] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Carregar token do sessionStorage ao iniciar (isolado por aba)
  useEffect(() => {
    const loadInstructor = async () => {
      console.log('🔍 [InstructorContext] Verificando token do INSTRUTOR...');
      const savedToken = sessionStorage.getItem(TOKEN_KEY);
      console.log('🔓 [InstructorContext] sessionStorage token:', savedToken ? `✅ ${savedToken.substring(0, 20)}...` : '❌ null');
      
      if (savedToken) {
        console.log('📡 [InstructorContext] Token encontrado, carregando perfil...');
        try {
          const response = await apiInstrutor.get('/instructor/profile', {
            headers: { Authorization: `Bearer ${savedToken}` }
          });
          console.log('👤 [InstructorContext] Perfil carregado:', response.data.name);
          setToken(savedToken);
          setInstructor(response.data);
          setError(null);
        } catch (err) {
          console.error('❌ [InstructorContext] Erro ao carregar perfil:', err.message);
          sessionStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setInstructor(null);
          setError('Sessão expirada. Por favor, faça login novamente.');
        }
      } else {
        console.log('🏠 [InstructorContext] Nenhum token, instrutor não-logado');
        setError(null);
      }
      
      setLoading(false);
    };
    
    loadInstructor();
  }, []);

  const registerInstructor = async (data) => {
    try {
      setError(null);
      setLoading(true);
      console.log('📝 [InstructorContext] Registrando instrutor...');
      const res = await apiInstrutor.post('/instructor/register', data);
      const { token: newToken, instructor: instructorData } = res.data;
      console.log('✅ [InstructorContext] Instrutor registrado:', instructorData.name);
      sessionStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
      setInstructor(instructorData);
      setError(null);
      setLoading(false);
      return { success: true, token: newToken, instructor: instructorData };
    } catch (err) {
      console.error('❌ [InstructorContext] Erro no registro');
      console.error('❌ Status:', err.response?.status);
      console.error('❌ Dados da resposta:', JSON.stringify(err.response?.data));
      
      let msg = 'Erro ao registrar instrutor';
      
      // Tratamento específico de erros
      if (err.response?.status === 400) {
        msg = err.response?.data?.message || 'Dados inválidos. Verifique os campos.';
      } else if (err.response?.status === 409) {
        msg = 'Email já cadastrado no sistema';
      } else if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.message === 'Network Error') {
        msg = 'Erro de conexão. Verifique sua internet.';
      }
      
      setError(msg);
      setToken(null);
      setInstructor(null);
      setLoading(false);
      
      return { success: false, error: msg };
    }
  };

  const loginInstructor = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      console.log('🔐 [InstructorContext] Fazendo login do instrutor com email:', email);
      const res = await apiInstrutor.post('/instructor/login', { email, password });
      const { token: newToken, instructor: instructorData } = res.data;
      console.log('✅ [InstructorContext] Login bem-sucedido:', instructorData.name);
      sessionStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
      setInstructor(instructorData);
      setError(null);
      setLoading(false);
      return { success: true, token: newToken, instructor: instructorData };
    } catch (err) {
      console.error('❌ [InstructorContext] Erro no login');
      console.error('❌ Status HTTP:', err.response?.status);
      console.error('❌ Resposta completa:', JSON.stringify(err.response?.data));
      console.error('❌ Mensagem de erro:', err.message);
      
      let msg = 'Erro ao fazer login';
      
      // Tratamento específico de erros
      if (err.response?.data?.message) {
        const apiMessage = err.response.data.message.toLowerCase();
        // Converter "Credenciais inválidas" para "Usuário não encontrado"
        if (apiMessage.includes('credenciais inválidas') || apiMessage.includes('invalid credentials')) {
          msg = 'Usuário não encontrado';
        } else {
          msg = err.response.data.message;
        }
      } else if (err.response?.status === 401) {
        msg = 'Usuário não encontrado';
      } else if (err.response?.status === 404) {
        msg = 'Usuário não encontrado';
      } else if (err.message === 'Network Error') {
        msg = 'Erro de conexão. Verifique sua internet.';
      }
      
      setError(msg);
      setToken(null);
      setInstructor(null);
      setLoading(false);
      
      return { success: false, error: msg };
    }
  };

  // 🔴 CORRIGIDO: Função para limpar erro
  const clearError = () => {
    console.log('🧹 [InstructorContext] Limpando erro');
    setError(null);
  };

  // 🔴 CORRIGIDO: Logout remove APENAS o token, mantém dados de "manter-me logado"
  const logoutInstructor = () => {
    console.log('🚪 [InstructorContext] Logout do instrutor');
    sessionStorage.removeItem(TOKEN_KEY);
    // ✅ NÃO remove os dados de "manter-me logado" aqui!
    // Eles devem persistir em localStorage para a próxima sessão
    setToken(null);
    setInstructor(null);
    setError(null);
  };

  return (
    <InstructorContext.Provider
      value={{
        instructor,
        token,
        loading,
        error,
        registerInstructor,
        loginInstructor,
        logoutInstructor,
        clearError,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};

export const useInstructor = () => {
  const context = useContext(InstructorContext);
  if (!context)
    throw new Error('useInstructor deve ser usado dentro de InstructorProvider');
  return context;
};

export default InstructorContext;
