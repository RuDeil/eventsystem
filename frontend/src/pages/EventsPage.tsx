import { useState, useEffect } from "react";
import { getEvents, registerForEvent, unregisterFromEvent } from "../api/events";
import EventList from "../components/Events/EventList";
import { EventDTO } from "../types/events";
import { getCurrentRole } from "../api/auth";
import { Box, Typography, Button, Paper } from "@mui/material";

const EventsPage = () => {
  const [events, setEvents] = useState<EventDTO[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'my'>('all');
  const role = getCurrentRole();

  const loadEvents = async (mode: 'all' | 'my' = 'all') => {
    try {
      let endpoint = '';
      if (role === 'ADMIN') {
        endpoint = '/created';
      } else if (mode === 'my') {
        endpoint = '/my';
      }
      
      const data = await getEvents(endpoint);
      setEvents(data);
    } catch (error) {
      console.error("Ошибка загрузки событий:", error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleRegistrationToggle = async (eventId: number) => {
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) return;

      if (event.registered) {
        await unregisterFromEvent(eventId);
        setEvents(prev => prev.map(e => 
          e.id === eventId ? { ...e, registered: false } : e
        ));
      } else {
        await registerForEvent(eventId);
        setEvents(prev => prev.map(e => 
          e.id === eventId ? { ...e, registered: true } : e
        ));
      }
    } catch (error) {
      console.error("Ошибка изменения статуса регистрации:", error);
    }
  };

  const toggleViewMode = () => {
    const newMode = viewMode === 'all' ? 'my' : 'all';
    setViewMode(newMode);
    loadEvents(newMode);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      p: 3,
      background: 'linear-gradient(135deg, #FFF8F0 0%, #EFEBE9 100%)'
    }}>
      <Paper elevation={3} sx={{ 
        p: 3,
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '16px'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" sx={{ color: '#5D4037' }}>
            {role === 'ADMIN' ? 'Мои созданные мероприятия' : 'Мероприятия'}
          </Typography>
          
          {role === 'USER' && (
            <Button 
              variant="contained"
              onClick={toggleViewMode}
              sx={{
                bgcolor: '#5D4037',
                '&:hover': { bgcolor: '#3E2723' }
              }}
            >
              {viewMode === 'all' ? 'Мои мероприятия' : 'Все мероприятия'}
            </Button>
          )}
        </Box>

        <EventList 
          events={events}
          onRegistrationToggle={role === 'USER' ? handleRegistrationToggle : undefined}
        />
      </Paper>
    </Box>
  );
};

export default EventsPage;