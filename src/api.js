import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API para ALUNO
export const apiAluno = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API para INSTRUTOR
export const apiInstrutor = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para ALUNO - adicionar token automaticamente
apiAluno.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('conduzauto_aluno_token');
  
  if (token) {
    console.log('📡 [API Aluno] Token encontrado, adicionando ao header');
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('⚠️ [API Aluno] Nenhum token encontrado em sessionStorage');
  }
  return config;
});

// Interceptor para INSTRUTOR - adicionar token automaticamente
apiInstrutor.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('conduzauto_instrutor_token');
  
  if (token) {
    console.log('📡 [API Instrutor] Token encontrado, adicionando ao header');
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('⚠️ [API Instrutor] Nenhum token encontrado em sessionStorage');
  }
  return config;
});

// Exportar como default para compatibilidade
export default apiAluno;
