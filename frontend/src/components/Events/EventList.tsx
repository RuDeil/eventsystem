import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button 
} from "@mui/material";
import { EventDTO } from "../../types/events";

interface Props {
  events: EventDTO[];
  onRegistrationToggle: (eventId: number, registered: boolean) => Promise<void>;
}

const EventList = ({ events, onRegistrationToggle }: Props) => {
  const handleRegistration = async (eventId: number, registered: boolean) => {
    try {
      await onRegistrationToggle(eventId, registered);
    } catch (error) {
      console.error('Ошибка при изменении статуса регистрации:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Место</TableCell>
            <TableCell>Формат</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.title || 'Без названия'}</TableCell>
              <TableCell>{new Date(event.startTime).toLocaleString()}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.format}</TableCell>
              <TableCell>{event.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color={event.registered ? "secondary" : "primary"}
                  onClick={() => handleRegistration(event.id, event.registered)}
                  sx={{
                    backgroundColor: event.registered ? '#f44336' : '#4caf50',
                    '&:hover': {
                      backgroundColor: event.registered ? '#d32f2f' : '#388e3c'
                    },
                    minWidth: '180px',
                    color: 'white'
                  }}
                >
                  {event.registered ? "ОТМЕНИТЬ РЕГИСТРАЦИЮ" : "ЗАРЕГИСТРИРОВАТЬСЯ"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventList;