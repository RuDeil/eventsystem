import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import CreateEventForm from '../components/Events/CreateEventForm';
import { getCurrentRole } from '../api/auth';
import { Navigate } from 'react-router-dom';

const AdminPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

 

  if (getCurrentRole() !== 'ADMIN') {
    return <Navigate to="/events" replace />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Панель администратора
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Создать мероприятие" />
          <Tab label="Управление пользователями" />
        </Tabs>
      </Paper>

      {tabValue === 0 && <CreateEventForm />}
      {tabValue === 1 && (
        <Typography>Здесь будет управление пользователями</Typography>
      )}
    </Box>
  );
};

export default AdminPage;