import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { EventDTO } from "../../types/events";

interface Props {
  events: EventDTO[];
}

const EventList = ({ events }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Дата</TableCell>
            <TableCell>Место</TableCell>
            <TableCell>Формат</TableCell>
            <TableCell>Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{new Date(event.eventDate).toLocaleString()}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.format}</TableCell>
              <TableCell>{event.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventList;