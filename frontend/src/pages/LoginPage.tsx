import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Alert 
} from '@mui/material';
import { login } from '../api/auth';

// Схема валидации формы
const validationSchema = Yup.object({
  username: Yup.string()
    .required('Логин обязателен')
    .min(3, 'Логин должен быть не менее 3 символов'),
  password: Yup.string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен быть не менее 6 символов'),
});

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Если уже авторизован - редирект на события
    if (localStorage.getItem('token')) {
      navigate('/events');
    }
  }, [navigate]);

  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        const { token, role } = await login(values);
        
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        
        // Перенаправляем в зависимости от роли
        navigate(role === 'ADMIN' ? '/admin' : '/events');
      } catch (err) {
        setError('Неверный логин или пароль');
        console.error('Ошибка авторизации:', err);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Вход в систему
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Логин"
              margin="normal"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Пароль"
              type="password"
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Вход...' : 'Войти'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;