// components/Events/EventList.tsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { EventDTO } from "../../types/events";

interface Props {
  events: EventDTO[];
  onRegister?: (eventId: number) => void;
}

const EventList = ({ events, onRegister }: Props) => {
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
                {onRegister && (
                  <Button 
                    variant="contained" 
                    onClick={() => onRegister(event.id)}
                  >
                    Зарегистрироваться
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventList;