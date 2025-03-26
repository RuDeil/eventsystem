import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { registerUser } from "../../api/users";

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Обязательное поле"),
      username: Yup.string().required("Введите логин"),
      password: Yup.string().min(6, "Пароль слишком короткий").required("Введите пароль"),
    }),
    onSubmit: async (values) => {
      try {
        await registerUser(values);
        alert("Регистрация успешна!");
      } catch (error) {
        alert("Ошибка регистрации");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <TextField
        fullWidth
        label="ФИО"
        margin="normal"
        {...formik.getFieldProps("fullName")}
        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
        helperText={formik.touched.fullName && formik.errors.fullName}
      />
      <TextField
        fullWidth
        label="Логин"
        margin="normal"
        {...formik.getFieldProps("username")}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
      <TextField
        fullWidth
        label="Пароль"
        type="password"
        margin="normal"
        {...formik.getFieldProps("password")}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default RegisterForm;