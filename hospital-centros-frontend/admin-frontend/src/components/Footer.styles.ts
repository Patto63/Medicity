// src/components/Footer.styles.ts
import { SxProps, Theme } from '@mui/material/styles';

export const footerStyles: SxProps<Theme> = {
  width: '100%',
  padding: 2,
  backgroundColor: 'background.paper',
  color: 'text.secondary',
  position: 'fixed',
  bottom: 0,
  textAlign: 'center',
  boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
  borderTop: '1px solid #e0e0e0',
};
