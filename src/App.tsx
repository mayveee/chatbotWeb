import { Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Album from './pages/Album';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/album" element={<Album />} />
    </Routes>
  );
}
