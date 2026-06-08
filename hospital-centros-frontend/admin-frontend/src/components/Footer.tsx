// src/components/Footer.tsx
import { Box, Typography } from '@mui/material';
import { footerStyles } from './Footer.styles';

export default function Footer() {
  return (
    <Box sx={footerStyles}>
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} MEDICITY | Todos los derechos reservados
      </Typography>
    </Box>
  );
}
