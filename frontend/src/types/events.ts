export type EventFormat = 'ONLINE' | 'OFFLINE' | 'HYBRID';
export type EventStatus = 'PLANNED' | 'OPEN' | 'COMPLETED';

// Для создания события
export interface CreateEventDTO {
  title: string;
  description: string;
  category: string;
  format: EventFormat;
  startTime: string;  // Изменено с eventDate на startTime
  endTime: string;    // Добавлено новое поле
  location: string;
  onlineLink: string; // Добавлено новое поле
  maxParticipants?: number; // Добавлено новое поле
  isCancellable: boolean; // Добавлено новое поле
  speakers: string[];
  status: EventStatus;
}

// Для полного представления события (после создания)
export interface EventDTO extends CreateEventDTO {
  id: number;
  createdBy?: number;
  createdAt?: string;
  registered: boolean; // Изменено с registered на isRegistered для консистентности
}

// Функция для отправки события
export const createEvent = async (eventData: CreateEventDTO): Promise<EventDTO> => {
  try {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...eventData,
        // Преобразуем boolean в число если нужно (зависит от бэкенда)
        isCancellable: eventData.isCancellable ? 1 : 0,
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании мероприятия');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};