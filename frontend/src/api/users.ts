import { RegisterRequest, User } from "../types/users";
import api from "./client";

export const registerUser = async (data: RegisterRequest): Promise<User> => {
  try {
    const response = await api.post<User>("/api/users/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Registration failed");
  }
};

// Дополнительные методы для работы с пользователями
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get<User>("/api/users/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw new Error("Failed to load user data");
  }
};

export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  try {
    const response = await api.patch<User>("/api/users/me", userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Profile update failed");
  }
};

// Админские методы
export const createAdmin = async (adminData: RegisterRequest): Promise<User> => {
  try {
    const response = await api.post<User>("/api/users/admin/register", adminData);
    return response.data;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw new Error("Admin creation failed");
  }
};