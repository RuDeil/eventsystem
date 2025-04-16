import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { checkAuth } from './api/auth';

// Проверка аутентификации при загрузке приложения
const token = localStorage.getItem('token');
if (token) {
  checkAuth().catch(() => {
    localStorage.clear();
    window.location.href = '/login';
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);