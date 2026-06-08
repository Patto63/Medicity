import { AuthProvider } from './contexts/AuthContext';
import Router from './routes/Router';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom'; // Importar useLocation para verificar la ruta

const theme = createTheme({
  palette: {
    primary: {
      main: '#005792',
      light: '#3d7bb3',
      dark: '#003963',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00b4d8',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#2d3748',
      secondary: '#4a5568',
    },
    error: {
      main: '#dc3545',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h4: {
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    h5: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 24px',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: '1.5px',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
        },
      },
    },
  }
});

export default function App() {
  const location = useLocation(); // Obtén la ruta actual

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Box sx={{ paddingBottom: '60px' }}> {/* Agregar padding para no solapar el footer */}
          <Router />
        </Box>
        {/* Condicional para mostrar el Footer solo si no estamos en el login */}
        {location.pathname !== '/login' && <Footer />}
      </AuthProvider>
    </ThemeProvider>
  );
}
