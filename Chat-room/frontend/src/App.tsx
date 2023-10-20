import { useEffect, useState } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import RoomSelectPage from './pages/RoomSelectPage';
import MessagesPage from './pages/MessagePage';

function App() {
  const [page, setPage] = useState<'LOGIN' | 'ROOM' | 'MESSAGES'>('LOGIN');

  const [roomId, setRoomId] = useState('');
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setPage('ROOM');
    }
  }, []);

  if (page === 'LOGIN') {
    return <LoginPage setPage={setPage} />;
  }

  if (page === 'ROOM') {
    return <RoomSelectPage setPage={setPage} setRoomId={setRoomId} />;
  }

  return <MessagesPage roomId={roomId} setPage={setPage} />;
}

export default App;
