// src/contexts/AuthContext.tsx
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'doctor';
  medico_id: string | null;
  empleado_id: string | null;
  ciudad: string; // ✅ Nueva propiedad
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user && location.pathname === '/login') {
      navigate('/admin/appointments', { replace: true });
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Login local para pruebas
    if (email === 'medico@gmail.com') {
      const localUser: User = {
        id: 999,
        name: 'Dr. Simulado',
        email,
        role: 'doctor',
        medico_id: 'MED-LOCAL',
        empleado_id: null,
        ciudad: 'Ambato', // ✅ Ciudad simulada para entorno local
      };

      localStorage.setItem('token', 'fake-token-local');
      localStorage.setItem('user', JSON.stringify(localUser));
      setUser(localUser);
      return true;
    }

    try {
      const response = await fetch('http://20.81.216.9:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, password }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      const token = data.access_token;
      const decoded = JSON.parse(atob(token.split('.')[1]));

      const newUser: User = {
        id: decoded.sub,
        name: decoded.correo,
        email: decoded.correo,
        role: decoded.rol === 'medico' ? 'doctor' : decoded.rol,
        medico_id: decoded.medico_id || null,
        empleado_id: decoded.empleado_id || null,
        ciudad: decoded.ciudad || '', // ✅ Extraer ciudad del token
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
