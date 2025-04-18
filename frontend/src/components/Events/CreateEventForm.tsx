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

type EventFormat = 'ONLINE' | 'OFFLINE' | 'HYBRID';
type EventStatus = 'PLANNED' | 'OPEN' | 'COMPLETED';

interface EventFormValues {
  title: string;
  description: string;
  category: string;
  format: EventFormat;
  startTime: string;
  endTime: string;
  location: string;
  onlineLink: string;
  maxParticipants?: number;
  isCancellable: boolean;
  speakers: string[];
}

const validationSchema = Yup.object({
  title: Yup.string().required('Название обязательно'),
  description: Yup.string().required('Описание обязательно'),
  category: Yup.string().required('Категория обязательна'),
  format: Yup.string()
    .oneOf(['ONLINE', 'OFFLINE', 'HYBRID'], 'Неверный формат мероприятия')
    .required('Формат обязателен'),
  startTime: Yup.string().required('Время начала обязательно'),
  endTime: Yup.string()
    .required('Время окончания обязательно')
    .test(
      'is-after-start',
      'Время окончания должно быть после времени начала',
      function (value) {
        return new Date(value) > new Date(this.parent.startTime);
      }
    ),
  location: Yup.string(),
  onlineLink: Yup.string().when('format', {
    is: (format: EventFormat) => format === 'ONLINE' || format === 'HYBRID',
    then: (schema) => schema.required('Ссылка обязательна для онлайн/гибридного формата'),
  }),
  maxParticipants: Yup.number()
    .positive('Должно быть положительным числом')
    .integer('Должно быть целым числом')
    .nullable(),
  isCancellable: Yup.boolean(),
  speakers: Yup.array().of(Yup.string()),
});

const CreateEventForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik<EventFormValues>({
    initialValues: {
      title: '',
      description: '',
      category: 'CONFERENCE', // Значение по умолчанию
      format: 'ONLINE',
      startTime: '',
      endTime: '',
      location: '',
      onlineLink: '',
      maxParticipants: undefined,
      isCancellable: true,
      speakers: [],
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setError(null);
        setSuccess(false);
        
        const eventData = {
          title: values.title,
          description: values.description,
          category: values.category,
          format: values.format,
          startTime: values.startTime,
          endTime: values.endTime,
          location: values.location,
          onlineLink: values.onlineLink,
          maxParticipants: values.maxParticipants,
          isCancellable: values.isCancellable,
          speakers: values.speakers,
          status: 'PLANNED' as EventStatus,
        };

        await createEvent(eventData);
        setSuccess(true);
        resetForm();
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка создания мероприятия');
        console.error('Create event error:', err);
      }
    },
  });

  const handleAddSpeaker = () => {
    formik.setFieldValue('speakers', [...formik.values.speakers, '']);
  };

  const handleSpeakerChange = (index: number, value: string) => {
    const newSpeakers = [...formik.values.speakers];
    newSpeakers[index] = value;
    formik.setFieldValue('speakers', newSpeakers);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Создать мероприятие
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(false)}>
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

<FormControl fullWidth margin="normal">
  <InputLabel id="category-label">Категория</InputLabel>
  <Select
    labelId="category-label"
    id="category"
    name="category"
    label="Категория"
    value={formik.values.category}
    onChange={formik.handleChange}
    error={formik.touched.category && Boolean(formik.errors.category)}
  >
    <MenuItem value="CONFERENCE">Конференция</MenuItem>
    <MenuItem value="WORKSHOP">Воркшоп</MenuItem>
    <MenuItem value="MEETUP">Митап</MenuItem>
    <MenuItem value="OTHER">Другое</MenuItem>
  </Select>
</FormControl>

      <TextField
        fullWidth
        id="startTime"
        name="startTime"
        label="Время начала"
        type="datetime-local"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={formik.values.startTime}
        onChange={formik.handleChange}
        error={formik.touched.startTime && Boolean(formik.errors.startTime)}
        helperText={formik.touched.startTime && formik.errors.startTime}
      />

      <TextField
        fullWidth
        id="endTime"
        name="endTime"
        label="Время окончания"
        type="datetime-local"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={formik.values.endTime}
        onChange={formik.handleChange}
        error={formik.touched.endTime && Boolean(formik.errors.endTime)}
        helperText={formik.touched.endTime && formik.errors.endTime}
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
          error={formik.touched.format && Boolean(formik.errors.format)}
        >
          <MenuItem value="ONLINE">Онлайн</MenuItem>
          <MenuItem value="OFFLINE">Оффлайн</MenuItem>
          <MenuItem value="HYBRID">Гибридный</MenuItem>
        </Select>
      </FormControl>

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

      {formik.values.format !== 'OFFLINE' && (
        <TextField
          fullWidth
          id="onlineLink"
          name="onlineLink"
          label="Ссылка для подключения"
          margin="normal"
          value={formik.values.onlineLink}
          onChange={formik.handleChange}
          error={formik.touched.onlineLink && Boolean(formik.errors.onlineLink)}
          helperText={formik.touched.onlineLink && formik.errors.onlineLink}
        />
      )}

      <TextField
        fullWidth
        id="maxParticipants"
        name="maxParticipants"
        label="Максимальное количество участников"
        type="number"
        margin="normal"
        value={formik.values.maxParticipants || ''}
        onChange={formik.handleChange}
        error={formik.touched.maxParticipants && Boolean(formik.errors.maxParticipants)}
        helperText={formik.touched.maxParticipants && formik.errors.maxParticipants}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Typography>Можно отменить:</Typography>
        <Select
          id="isCancellable"
          name="isCancellable"
          value={formik.values.isCancellable ? 1 : 0}
          onChange={(e) => formik.setFieldValue('isCancellable', Boolean(e.target.value))}
          sx={{ ml: 2, minWidth: 120 }}
        >
          <MenuItem value={1}>Да</MenuItem>
          <MenuItem value={0}>Нет</MenuItem>
        </Select>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Спикеры</Typography>
        {formik.values.speakers.map((speaker, index) => (
          <TextField
            key={index}
            fullWidth
            margin="normal"
            label={`Спикер ${index + 1}`}
            value={speaker}
            onChange={(e) => handleSpeakerChange(index, e.target.value)}
          />
        ))}
        <Button
          type="button"
          variant="outlined"
          onClick={handleAddSpeaker}
          sx={{ mt: 1 }}
        >
          Добавить спикера
        </Button>
      </Box>

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