// Для создания события (не требует id и isRegistered)
export interface CreateEventDTO {
  title: string;
  description: string;
  eventDate: string;
  location: string;
  format: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  status: string;
  speakers?: string[];
}

// Для полного представления события (после создания)
export interface EventDTO extends CreateEventDTO {
  id: number;
  createdBy?: number;
  createdAt?: string;
  registered: boolean; // Добавляется сервером
}