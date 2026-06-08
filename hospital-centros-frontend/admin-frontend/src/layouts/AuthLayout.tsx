// src/layouts/AuthLayout.tsx
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Box } from '@mui/material'

export default function AuthLayout() {
  const { user } = useAuth()
  if (user) {
    return <Navigate to="/admin/appointments" replace />
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <Box sx={{
        width: '100%',
        maxWidth: 450,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white'
      }}>
        <Outlet />
      </Box>
    </Box>
  )
}
