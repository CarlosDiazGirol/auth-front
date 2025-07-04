import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const [view, setView] = useState('login');
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div>
      <h1>Bienvenido a la App de Notas</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => setView('login')}>Iniciar Sesión</button>
        <button onClick={() => setView('register')}>Registrarse</button>
      </div>
      {view === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
