export interface EventDTO {
  id: number;
  eventDate: string; // или Date, если будете преобразовывать
  location: string;
  format: string;
  speakers: string[];
  status: string;
  createdBy: number;
  createdAt: string;
}