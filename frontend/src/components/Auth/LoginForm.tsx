import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../api/auth";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Обязательное поле"),
      password: Yup.string().required("Введите пароль"),
    }),
    onSubmit: async (values) => {
      try {
        const { token } = await login(values);
        localStorage.setItem("token", token);
        alert("Успешный вход!");
      } catch (error) {
        alert("Ошибка входа");
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Вход в систему
      </Typography>
      
      <Box 
        component="form" 
        onSubmit={formik.handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          fullWidth
          name="username"
          label="Логин"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
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
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          sx={{ mt: 2 }}
        >
          Войти
        </Button>
        
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Нет аккаунта?{" "}
          <Link 
            component="button" 
            type="button"
            onClick={() => navigate("/register")}
            sx={{ textDecoration: "none" }}
          >
            Зарегистрироваться
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;