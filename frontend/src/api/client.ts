import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Список URL, для которых НЕ нужно добавлять токен
const NO_AUTH_URLS = ['/auth/login', '/users/register'];

api.interceptors.request.use(config => {
  // Пропускаем добавление токена для определенных эндпоинтов
  if (NO_AUTH_URLS.some(url => config.url?.includes(url))) {
    return config;
  }

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;