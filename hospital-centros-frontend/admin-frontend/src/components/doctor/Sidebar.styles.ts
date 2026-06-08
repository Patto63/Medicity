// src/components/doctor/Sidebar.styles.ts
import { SxProps, Theme } from '@mui/material/styles';

export const sidebarStyles: SxProps<Theme> = (theme) => ({
  width: 280,
  height: '100vh',
  bgcolor: 'background.paper',
  borderRight: 'none',
  background: `linear-gradient(to bottom, ${theme.palette.background.paper}, ${theme.palette.primary.light}08)`,
  boxShadow: '4px 0 20px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.25s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const listItemStyles = ({ isSelected }: { isSelected: boolean }): SxProps<Theme> => (theme) => ({
  borderRadius: 16,
  mb: 1.2,
  px: 2,
  py: 1.5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: isSelected ? `${theme.palette.primary.main}15` : 'transparent',
  border: isSelected ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
  transition: 'all 0.25s ease-in-out',
  cursor: 'pointer',
  textDecoration: 'none',
  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}08`,
    border: `2px solid ${theme.palette.primary.main}`,
    transform: 'translateX(4px) scale(1.02)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
});

export const logoutListItemStyles: SxProps<Theme> = (theme) => ({
  borderRadius: 16,
  mb: 1.5,
  px: 2,
  py: 1.5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  border: '2px solid transparent',
  transition: 'all 0.25s ease-in-out',
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: `${theme.palette.error.main}15`, // Aseguramos que el hover se haga rojo
    border: `2px solid ${theme.palette.error.main}`, // Color de borde en hover
    transform: 'translateX(4px) scale(1.02)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    '& .MuiListItemIcon-root': {
      color: theme.palette.error.main, // Cambiar el color del ícono en hover
    },
    '& .MuiTypography-root': {
      color: theme.palette.error.main, // Cambiar color del texto
    },
  },
});

export const logoutIconStyles: SxProps<Theme> = (theme) => ({
  color: theme.palette.text.secondary,
  transition: 'all 0.25s ease-in-out',
});
