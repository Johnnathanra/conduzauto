import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://conduzauto-backend-production.up.railway.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  // Procura pelo token do aluno ou do instrutor
  const studentToken = localStorage.getItem('conduzauto_token');
  const instructorToken = localStorage.getItem('instructor_token');
  const token = instructorToken || studentToken;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
