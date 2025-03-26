// components/Auth/RegisterForm.tsx
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Alert } from '@mui/material';
import { registerUser } from '../../api/users';
import { useNavigate } from 'react-router-dom';

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

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

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
        await registerUser(values);
        navigate('/login');
      } catch (err) {
        setError('Ошибка регистрации. Возможно, пользователь уже существует.');
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 500 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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

      <Button type="submit" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </Box>
  );
};

export default RegisterForm;