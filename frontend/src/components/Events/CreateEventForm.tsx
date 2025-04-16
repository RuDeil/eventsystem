import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { createEvent } from '../../api/events';

const validationSchema = Yup.object({
  title: Yup.string().required('Название обязательно'),
  description: Yup.string().required('Описание обязательно'),
  eventDate: Yup.string().required('Дата обязательна'),
  location: Yup.string().required('Место проведения обязательно'),
  format: Yup.string().required('Формат обязателен'),
  status: Yup.string().required('Статус обязателен'),
});

const CreateEventForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      eventDate: '',
      location: '',
      format: 'ONLINE' as 'ONLINE' | 'OFFLINE' | 'HYBRID',
      status: 'PLANNED',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        await createEvent(values); // Теперь передается правильный тип
        setSuccess(true);
        formik.resetForm();
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError('Ошибка создания мероприятия');
        console.error('Create event error:', err);
      }
    },
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Создать мероприятие
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Мероприятие успешно создано!
        </Alert>
      )}

      <TextField
        fullWidth
        id="title"
        name="title"
        label="Название"
        margin="normal"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

      <TextField
        fullWidth
        id="description"
        name="description"
        label="Описание"
        margin="normal"
        multiline
        rows={4}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />

      <TextField
        fullWidth
        id="eventDate"
        name="eventDate"
        label="Дата и время"
        type="datetime-local"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={formik.values.eventDate}
        onChange={formik.handleChange}
        error={formik.touched.eventDate && Boolean(formik.errors.eventDate)}
        helperText={formik.touched.eventDate && formik.errors.eventDate}
      />

      <TextField
        fullWidth
        id="location"
        name="location"
        label="Место проведения"
        margin="normal"
        value={formik.values.location}
        onChange={formik.handleChange}
        error={formik.touched.location && Boolean(formik.errors.location)}
        helperText={formik.touched.location && formik.errors.location}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="format-label">Формат</InputLabel>
        <Select
          labelId="format-label"
          id="format"
          name="format"
          label="Формат"
          value={formik.values.format}
          onChange={formik.handleChange}
        >
          <MenuItem value="ONLINE">Онлайн</MenuItem>
          <MenuItem value="OFFLINE">Оффлайн</MenuItem>
          <MenuItem value="HYBRID">Гибридный</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="status-label">Статус</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          name="status"
          label="Статус"
          value={formik.values.status}
          onChange={formik.handleChange}
        >
          <MenuItem value="PLANNED">Запланировано</MenuItem>
          <MenuItem value="OPEN">Открыто</MenuItem>
          <MenuItem value="COMPLETED">Завершено</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3 }}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Создание...' : 'Создать мероприятие'}
      </Button>
    </Box>
  );
};

export default CreateEventForm;