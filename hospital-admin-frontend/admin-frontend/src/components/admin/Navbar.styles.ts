import { SxProps, Theme } from '@mui/material/styles';

export const appBarStyles = (theme: Theme): SxProps<Theme> => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  backgroundColor: 'background.paper',
  color: 'text.primary',
  borderBottom: 'none',
  background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.primary.light}20)`,
  backdropFilter: 'blur(8px)',
  transition: 'all 0.3s ease',
});

export const toolbarStyles: SxProps<Theme> = {
  px: { xs: 2, sm: 3 },
  minHeight: 70,
};

export const menuButtonStyles: SxProps<Theme> = {
  mr: 2,
  display: { sm: 'none' },
  color: 'primary.main',
};

export const titleStyles = (theme: Theme): SxProps<Theme> => ({
  flexGrow: 1,
  fontWeight: 700,
  letterSpacing: '0.5px',
  background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  textAlign:'center',
  gap: 1.5,
});

export const userBoxStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  px: 2,
  py: 1,
  borderRadius: 12,
  '&:hover': {
    backgroundColor: 'action.hover',
  },
};

export const avatarStyles = (theme: Theme): SxProps<Theme> => ({
  width: 36,
  height: 36,
  bgcolor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  fontSize: '0.875rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

export const userInfoStyles: SxProps<Theme> = {
  display: { xs: 'none', sm: 'block' },
};

export const userNameStyles = (theme: Theme): SxProps<Theme> => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.2,
});

export const userRoleStyles = (theme: Theme): SxProps<Theme> => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.2,
});

export const logoutButtonStyles = (theme: Theme): SxProps<Theme> => ({
  ml: 1,
  color: theme.palette.text.secondary,
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.error.main,
    transform: 'scale(1.1)',
  },
});