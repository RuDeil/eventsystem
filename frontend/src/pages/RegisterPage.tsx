import { Box } from "@mui/material";
import RegisterForm from "../components/Auth/RegistrationForm";

const RegisterPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFF8F0 0%, #EFEBE9 100%)',
        p: 2
      }}
    >
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;