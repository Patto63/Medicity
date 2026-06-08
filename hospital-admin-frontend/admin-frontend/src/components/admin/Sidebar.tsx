// src/components/admin/Sidebar.tsx
import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  MedicalServices as SpecialtiesIcon,
  LocalHospital as CentersIcon,
  EventNote as AppointmentsIcon,
  Assessment as ReportsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { 
  sidebarStyles,
  listStyles,
  listItemStyles,
  listItemIconStyles,
  listItemTextStyles,
  logoutListItemStyles,
  logoutIconStyles
} from './Sidebar.styles';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';

// Define menu items with role-based visibility
const menuItems = [
  { path: '/admin', icon: <DashboardIcon />, text: 'Dashboard', roles: ['admin'] },
  { path: '/admin/employees', icon: <GroupsIcon />, text: 'Gestión Empleados', roles: ['admin'] },
  { path: '/admin/specialties', icon: <SpecialtiesIcon />, text: 'Ver Especialidades', roles: ['admin', 'doctor'] },
  { path: '/admin/appointments', icon: <AppointmentsIcon />, text: 'Gestionar Consultas', roles: ['admin', 'doctor'] },
  { path: '/admin/medical-centers', icon: <CentersIcon />, text: 'Ver Centros Médicos', roles: ['admin', 'doctor'] },
  { path: '/admin/doctors', icon: <AssignmentIndRoundedIcon />, text: 'Gestión Médicos', roles: ['admin'] },
  { path: '/admin/reports', icon: <ReportsIcon />, text: 'Reportes', roles: ['admin'] },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter((item) =>
    user && item.roles.includes(user.role)
  );

  return (
    <List sx={sidebarStyles}>
      <Box sx={listStyles}>
        {visibleMenuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem
              component={Link}
              to={item.path}
              key={item.path}
              sx={listItemStyles}
            >
              <ListItemIcon sx={listItemIconStyles}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={listItemTextStyles}
              />
            </ListItem>
          );
        })}
        
        <ListItem
          button
          onClick={logout}
          sx={logoutListItemStyles}
        >
          <ListItemIcon sx={logoutIconStyles}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </Box>
    </List>
  );
}
