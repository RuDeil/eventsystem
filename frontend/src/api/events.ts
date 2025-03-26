import { EventDTO } from "../types/events";
import api from "./client";

export const getEvents = async (endpoint?: string): Promise<EventDTO[]> => {
  try {
    const url = endpoint ? `/api/events${endpoint}` : '/api/events';
    const response = await api.get<EventDTO[]>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to load events");
  }
};

export const registerForEvent = async (eventId: number): Promise<void> => {
  try {
    await api.post(`/api/events/${eventId}/register`);
  } catch (error) {
    console.error(`Error registering for event ${eventId}:`, error);
    throw new Error("Registration failed");
  }
};

// Дополнительные методы для работы с событиями
export const createEvent = async (eventData: Omit<EventDTO, 'id'>): Promise<EventDTO> => {
  try {
    const response = await api.post<EventDTO>("/api/events", eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Event creation failed");
  }
};

export const getEventDetails = async (eventId: number): Promise<EventDTO> => {
  try {
    const response = await api.get<EventDTO>(`/api/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event ${eventId} details:`, error);
    throw new Error("Failed to load event details");
  }
};