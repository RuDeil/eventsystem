import axios from "axios";

// Настройка базового URL (замените на ваш бэкенд)
axios.defaults.baseURL = "http://localhost:8080";

interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  role: "USER" | "ADMIN";
}
export const checkAuth = async () => {
    await axios.get('/api/auth/check', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  };
export const login = async (data: AuthRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>("/api/auth/login", data);
  return response.data;
};