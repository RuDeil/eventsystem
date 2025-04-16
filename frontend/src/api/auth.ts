import { AxiosResponse } from "axios";
import api from "./client";

interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  role: 'USER' | 'ADMIN';
}

export const login = async (data: AuthRequest): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/api/auth/login", data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.data.token) {
      throw new Error('No token received');
    }

    // Безопасное сохранение данных
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    
    return response.data;
  } catch (error) {
    // Очистка хранилища при ошибке
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    console.error('Login failed:', error);
    throw new Error('Authentication failed. Please check your credentials');
  }
};

export const checkAuth = async (): Promise<boolean> => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await api.get('/api/auth/check', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.status === 200;
  } catch (error) {
    console.error('Auth check failed:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return false;
  }
};

// Дополнительные методы для работы с аутентификацией
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = '/login';
};

export const getCurrentRole = (): 'USER' | 'ADMIN' | null => {
  const role = localStorage.getItem('role');
  return role === 'USER' || role === 'ADMIN' ? role : null;
};

interface RegisterRequest {
  username: string;
  password: string;
  fullName: string;
}

export const register = async (data: RegisterRequest): Promise<AxiosResponse> => {
  return api.post("/api/users/register", data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
};