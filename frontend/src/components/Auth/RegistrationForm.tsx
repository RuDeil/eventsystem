import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Box, 
  Typography,
  Alert 
} from '@mui/material';
import { register } from '../../api/auth';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Логин обязателен')
    .min(3, 'Логин должен быть не менее 3 символов'),
  password: Yup.string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен быть не менее 6 символов'),
  fullName: Yup.string()
    .required('ФИО обязательно'),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      fullName: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        const response = await register(values);
        
        // Проверяем статус ответа
        if (response.status === 200 || response.status === 201) {
          setSuccess(true);
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError('Ошибка регистрации');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Ошибка регистрации. Попробуйте ещё раз.');
      }
    },
  });
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Регистрация
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Регистрация прошла успешно! Перенаправляем на страницу входа...
        </Alert>
      )}

      {error && !success && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        name="fullName"
        label="ФИО"
        value={formik.values.fullName}
        onChange={formik.handleChange}
        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
        helperText={formik.touched.fullName && formik.errors.fullName}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        name="username"
        label="Логин"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        name="password"
        label="Пароль"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{ mb: 2 }}
      />

      <Button 
        type="submit" 
        variant="contained" 
        fullWidth
        disabled={formik.isSubmitting}
        sx={{ mb: 2 }}
      >
        {formik.isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>

      <Button 
        variant="outlined" 
        fullWidth
        component={Link}
        to="/login"
      >
        Назад к входу
      </Button>
    </Box>
  );
};

export default RegistrationForm;