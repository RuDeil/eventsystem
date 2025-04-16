import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D4037', // Тёплый коричневый
    },
    secondary: {
      main: '#8D6E63', // Светло-коричневый
    },
    background: {
      default: '#FFF8F0', // Тёплый бежевый (основной фон)
      paper: '#FFFFFF',   // Белый для карточек
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFF8F0',
          color: '#3E2723',
        },
      },
    },
  },
});

export default theme;