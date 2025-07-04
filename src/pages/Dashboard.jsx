import Notes from '../components/Notes';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Tu espacio privado</h1>
      <button onClick={logout}>Cerrar sesión</button>
      <Notes />
    </div>
  );
}
