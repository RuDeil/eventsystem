import { useEffect, useState } from "react";
import { getEvents } from "../api/events";
import EventList from "../components/Events/EventList";
import { EventDTO } from "../types/events";

const EventsPage = () => {
  const [events, setEvents] = useState<EventDTO[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Ошибка загрузки событий:", error);
      }
    };
    loadEvents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Мероприятия</h1>
      <EventList events={events} />
    </div>
  );
};

export default EventsPage;