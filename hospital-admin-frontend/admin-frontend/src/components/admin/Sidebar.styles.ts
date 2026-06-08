import { SxProps, Theme } from '@mui/material/styles';

export const sidebarStyles = (theme: Theme): SxProps<Theme> => ({
  width: 280,
  height: '100vh',
  bgcolor: 'background.paper',
  borderRight: 'none',
  background: `linear-gradient(to bottom, ${theme.palette.background.paper}, ${theme.palette.primary.light}08)`,
  boxShadow: '2px 0 15px rgba(0, 0, 0, 0.03)',
  transition: 'all 0.3s ease',
});

export const listStyles: SxProps<Theme> = {
  py: 2,
  px: 1.5,
};

export const listItemStyles = (theme: Theme, isSelected: boolean): SxProps<Theme> => ({
  borderRadius: 12,
  mb: 0.5,
  px: 2,
  py: '8px',
  backgroundColor: isSelected 
    ? `${theme.palette.primary.main}15` 
    : 'inherit',
  borderLeft: isSelected 
    ? `4px solid ${theme.palette.primary.main}`
    : '4px solid transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}10`,
    transform: 'translateX(4px)',
  },
});

export const listItemIconStyles = (theme: Theme, isSelected: boolean): SxProps<Theme> => ({
  minWidth: 40,
  color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
  transition: 'all 0.3s ease',
});

export const listItemTextStyles = (theme: Theme, isSelected: boolean): SxProps<Theme> => ({
  '& .MuiTypography-root': {
    fontWeight: isSelected ? 600 : 500,
    color: isSelected ? theme.palette.text.primary : theme.palette.text.secondary,
    fontSize: '0.875rem',
    transition: 'all 0.3s ease',
  },
});

export const logoutListItemStyles = (theme: Theme): SxProps<Theme> => ({
  borderRadius: 12,
  mt: 1,
  px: 2,
  py: '8px',
  '&:hover': {
    backgroundColor: `${theme.palette.error.light}15`,
    '& .MuiListItemIcon-root': {
      color: theme.palette.error.main,
    },
    '& .MuiTypography-root': {
      color: theme.palette.error.main,
    },
  },
});

export const logoutIconStyles = (theme: Theme): SxProps<Theme> => ({
  color: theme.palette.text.secondary,
  transition: 'all 0.3s ease',
});