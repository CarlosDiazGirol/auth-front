import { useEffect, useState, useContext } from 'react';
import API from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const { logout } = useContext(AuthContext);

  const loadNotes = async () => {
    const res = await API.get('/notes');
    setNotes(res.data);
  };

  const createNote = async () => {
    await API.post('/notes', form);
    setForm({ title: '', content: '' });
    loadNotes();
  };

  const updateNote = async (id) => {
    const updatedContent = prompt("Nuevo contenido:");
    if (updatedContent) {
      await API.put(`/notes/${id}`, { content: updatedContent });
      loadNotes();
    }
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    loadNotes();
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div>
      <h2>Mis Notas</h2>
      <button onClick={logout}>Cerrar sesión</button>
      <div>
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Título" />
        <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Contenido" />
        <button onClick={createNote}>Crear Nota</button>
      </div>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <strong>{note.title}</strong><br />
            {note.content}
            <div>
              <button onClick={() => updateNote(note._id)}>Editar</button>
              <button onClick={() => deleteNote(note._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
