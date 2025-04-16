
export interface AuthResponse {
    token: string;
    role: 'USER' | 'ADMIN';
  }
  export interface AuthRequest {
    username: string;
    password: string;
  }
