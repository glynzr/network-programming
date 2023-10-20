import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { socket } from '../services/socket';
export default function RoomSelectPage({
  setPage,
  setRoomId: setRoom,
}: {
  setPage: Dispatch<SetStateAction<'LOGIN' | 'ROOM' | 'MESSAGES'>>;
  setRoomId: Dispatch<SetStateAction<string>>;
}) {
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState<string[]>([]);
  const [myUsername, setMyUsername] = useState('');

  useEffect(() => {
    socket.emit('get_active_rooms', '', (data: any) => {
      setRooms(data);
    });
    setMyUsername(
      JSON.parse(atob(localStorage.getItem('token')!.split('.')[1]) as any)
        .username,
    );
  }, []);

  const selectRoom = (x?: string) => {
    socket.emit('join', { roomId });
    setRoom(x ?? roomId);
    setPage('MESSAGES');
  };

  return (
    <>
      <div>
        <p>Hello, {myUsername}</p>
      </div>
      {rooms && rooms.length > 0 && (
        <div
          style={{
            padding: '8px',
            gap: '4px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          Rooms:
          {rooms.map((value, index) => (
            <div
              key={index}
              style={{ border: '1px white solid' }}
              onClick={() => {
                selectRoom(value);
              }}
            >
              {value}
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <input
          type="text"
          name="roomId"
          onChange={({ target: { value } }) => setRoomId(value)}
          style={{ padding: '16px' }}
        />
        <button onClick={() => selectRoom()}>Select Room</button>
        <button
          style={{ width: '100%' }}
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
        >
          Logout
        </button>
      </form>
    </>
  );
}
