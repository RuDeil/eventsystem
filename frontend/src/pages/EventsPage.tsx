// pages/EventsPage.tsx
import { useEffect, useState } from "react";
import { getEvents, registerForEvent } from "../api/events";
import EventList from "../components/Events/EventList";
import { EventDTO } from "../types/events";
import { getCurrentRole } from "../api/auth";

const EventsPage = () => {
  const [events, setEvents] = useState<EventDTO[]>([]);
  const role = getCurrentRole();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const endpoint = role === 'ADMIN' ? '/created' : '/my';
        const data = await getEvents(endpoint);
        setEvents(data);
      } catch (error) {
        console.error("Ошибка загрузки событий:", error);
      }
    };
    loadEvents();
  }, [role]);

  const handleRegister = async (eventId: number) => {
    try {
      await registerForEvent(eventId);
      alert('Регистрация прошла успешно!');
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      alert('Ошибка регистрации');
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Мероприятия</h1>
      <EventList 
        events={events} 
        onRegister={role === 'USER' ? handleRegister : undefined} 
      />
    </div>
  );
};

export default EventsPage;