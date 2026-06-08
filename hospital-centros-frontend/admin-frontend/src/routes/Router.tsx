// src/routes/Router.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MedicLayout from '../layouts/MedicLayout';
import AuthLayout from '../layouts/AuthLayout';

// Páginas
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const AppointmentsManagement = lazy(() => import('../pages/doctor/AppointmentsManagement'));
const SpecialtiesManagement = lazy(() => import('../pages/doctor/SpecialtiesManagement'));
const Reports = lazy(() => import('../pages/doctor/Reports'));

export default function Router() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        {/* Ruta base */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas públicas */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Rutas privadas para médicos */}
        <Route element={<MedicLayout />}>
          <Route path="/admin/appointments" element={<AppointmentsManagement />} />
          <Route path="/admin/specialties" element={<SpecialtiesManagement />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}
