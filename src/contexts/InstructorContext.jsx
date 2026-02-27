import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const InstructorContext = createContext();

export const InstructorProvider = ({ children }) => {
  const [instructor, setInstructor] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar token do localStorage ao iniciar
  useEffect(() => {
    const loadInstructor = async () => {
      console.log('🔍 [InstructorContext] Iniciando carregamento...');
      const savedToken = localStorage.getItem('instructor_token');
      console.log('🔓 [InstructorContext] Token salvo:', savedToken ? 'Sim' : 'Não');
      
      if (savedToken) {
        setToken(savedToken);
        console.log('📡 [InstructorContext] Buscando perfil do instrutor...');
        await carregarPerfilInstrutor(savedToken);
      }
      setLoading(false);
      console.log('✅ [InstructorContext] Carregamento concluído');
    };
    loadInstructor();
  }, []);

  const carregarPerfilInstrutor = async (authToken) => {
    try {
      console.log('🌐 [InstructorContext] Chamando /instructor/profile...');
      const response = await api.get('/instructor/profile', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log('👤 [InstructorContext] Perfil carregado:', response.data);
      setInstructor(response.data);
    } catch (err) {
      console.error('❌ [InstructorContext] Erro ao carregar perfil:', err);
      localStorage.removeItem('instructor_token');
      setToken(null);
      setInstructor(null);
    }
  };

  const registerInstructor = async (data) => {
    try {
      setError(null);
      console.log('📝 [InstructorContext] Registrando instrutor...');
      const res = await api.post('/instructor/register', data);
      const { token, instructor } = res.data;

      localStorage.setItem('instructor_token', token);
      setToken(token);
      setInstructor(instructor);
      console.log('✅ [InstructorContext] Instrutor registrado:', instructor);

      return { success: true, token, instructor };
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao registrar instrutor';
      setError(msg);
      console.error('❌ [InstructorContext] Erro no registro:', msg);
      return { success: false, error: msg };
    }
  };

  const loginInstructor = async (email, password) => {
    try {
      setError(null);
      console.log('🔐 [InstructorContext] Fazendo login...');
      const res = await api.post('/instructor/login', { email, password });
      const { token, instructor } = res.data;

      console.log('🎉 [InstructorContext] Login bem-sucedido, token:', token.substring(0, 20) + '...');
      console.log('👤 [InstructorContext] Dados do instrutor:', instructor);

      localStorage.setItem('instructor_token', token);
      setToken(token);
      setInstructor(instructor);

      return { success: true, token, instructor };
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao fazer login';
      setError(msg);
      console.error('❌ [InstructorContext] Erro no login:', msg);
      return { success: false, error: msg };
    }
  };

  const logoutInstructor = () => {
    console.log('🚪 [InstructorContext] Fazendo logout...');
    localStorage.removeItem('instructor_token');
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
