import axios from "axios";
import { EventDTO } from "../types/events";

export const getEvents = async (): Promise<EventDTO[]> => {
  const response = await axios.get<EventDTO[]>("/api/events");
  return response.data;
};

export const registerForEvent = async (eventId: number) => {
  await axios.post(`/api/events/${eventId}/register`);
};