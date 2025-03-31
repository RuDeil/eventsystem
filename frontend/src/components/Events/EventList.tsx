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
  onRegistrationToggle?: (eventId: number) => void;
}

const EventList = ({ events, onRegistrationToggle }: Props) => {
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
              <TableCell>{new Date(event.eventDate).toLocaleString()}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.format}</TableCell>
              <TableCell>{event.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color={event.registered ? "secondary" : "primary"}
                  onClick={() => onRegistrationToggle?.(event.id)}
                  disabled={!onRegistrationToggle}
                  sx={{
                    backgroundColor: event.registered ? '#9e9e9e' : undefined,
                    '&:hover': {
                      backgroundColor: event.registered ? '#757575' : undefined
                    },
                    minWidth: '180px'
                  }}
                >
                  {event.registered ? "Отменить заявку" : "Зарегистрироваться"}
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