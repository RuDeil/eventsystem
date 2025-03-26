import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../api/auth";
import { TextField, Button } from "@mui/material";

const LoginForm = () => {
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
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="username"
        label="Логин"
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      <TextField
        name="password"
        label="Пароль"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <Button type="submit">Войти</Button>
    </form>
  );
};

export default LoginForm;