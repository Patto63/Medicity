import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/doctor/Sidebar';
import Navbar from '../components/doctor/Navbar';
import { Box } from '@mui/material';

/**
 * Layout exclusivo para médicos (sin Dashboard).
 */
export default function MedicLayout() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== 'doctor') {
    return <Navigate to="/login" replace />;
  }

  const allowedRoutes = [
    '/admin/appointments',
    '/admin/specialties',
    '/admin/reports',
  ];

  const currentPath = location.pathname;

  if (!allowedRoutes.includes(currentPath)) {
    return <Navigate to="/admin/appointments" replace />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '25px',
          width: 'calc(100% - 280px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
