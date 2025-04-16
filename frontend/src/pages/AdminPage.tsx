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
        <Typography variant="h4" sx={{ mb: 3, color: '#5D4037' }}>
          Панель администратора
        </Typography>

        <Paper sx={{ mb: 3, borderRadius: '8px' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Создать мероприятие" />
            <Tab label="Управление пользователями" />
          </Tabs>
        </Paper>

        {tabValue === 0 && <CreateEventForm />}
        {tabValue === 1 && (
          <Typography>Здесь будет управление пользователями</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AdminPage;