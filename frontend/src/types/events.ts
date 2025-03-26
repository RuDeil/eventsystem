export interface EventDTO {
  id: number;
  eventDate: string; // или Date, если будет преобразование
  location: string;
  format: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  status: string;
  speakers?: string[];
  createdBy?: number;
  createdAt?: string;
  title?: string; // Добавим, если используется в бэкенде
  description?: string; // Добавим, если используется в бэкенде
}
