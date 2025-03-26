import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { checkAuth } from './api/auth';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
const token = localStorage.getItem('token');
if (token) {
  checkAuth().catch(() => {
    localStorage.clear();
    window.location.href = '/login';
  });
}