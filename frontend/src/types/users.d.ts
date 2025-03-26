export interface RegisterRequest {
  username: string;
  password: string;
  fullName: string;
  role?: 'USER' | 'ADMIN'; // Опционально, так как по умолчанию 'USER'
}

export interface User {
  id: number;
  username: string;
  fullName: string;
  role: 'USER' | 'ADMIN';
}