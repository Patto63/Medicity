// src/components/doctor/Sidebar.tsx
import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/AuthContext';
import { 
  sidebarStyles, 
  listItemStyles, 
  logoutListItemStyles
} from './Sidebar.styles';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      path: '/admin/appointments',
      icon: <CalendarMonthIcon />,
      text: 'Gestionar Consultas'
    },
    {
      path: '/admin/specialties',
      icon: <LocalHospitalIcon />,
      text: 'Especialidades'
    },
    {
      path: '/admin/reports',
      icon: <AssessmentIcon />,
      text: 'Reportes'
    },
    {
      path: '/logout',
      icon: <LogoutIcon />,
      text: 'Cerrar Sesión',
      onClick: logout
    }
  ];

  return (
    <Box sx={sidebarStyles}>
      <Box>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: '0px' }}>MEDICITY</h2>
        <List sx={{ py: 2, px: 2, mt: '20px' }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem
                key={item.path}
                onClick={item.onClick ? item.onClick : () => navigate(item.path)}
                sx={item.text === 'Cerrar Sesión' ? logoutListItemStyles : listItemStyles({ isSelected })}
              >
                <ListItemIcon sx={{ minWidth: 40, color: isSelected ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? 'text.primary' : 'text.secondary',
                    }
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
