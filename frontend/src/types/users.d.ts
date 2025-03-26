export interface RegisterRequest {
  fullName: string;
  username: string;
  password: string;
  role?: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
}