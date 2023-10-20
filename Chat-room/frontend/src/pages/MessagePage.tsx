import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { socket } from '../services/socket';

type Message = {
  id: string;
  user: { username: string };
  roomId: string;
  message: string;
  createdAt: Date;
};

export default function MessagesPage({
  roomId,
  setPage,
}: {
  roomId: string;
  setPage: Dispatch<SetStateAction<'LOGIN' | 'ROOM' | 'MESSAGES'>>;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [myUsername, setMyUsername] = useState('');

  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('get_messages', { roomId });
    setMyUsername(
      JSON.parse(atob(localStorage.getItem('token')!.split('.')[1]) as any)
        .username,
    );
  }, []);

  socket.on('message', (data) => {
    const messagesArray: Message[] = [...messages, ...data];
    messagesArray.sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : a.createdAt === b.createdAt ? 0 : -1,
    );
    setMessages(messagesArray);
  });

  const sendMessage = () => {
    const token = localStorage.getItem('token');
    const message = input;
    socket.emit('message', { token, message, roomId }, (response: any) => {
      setMessages([...messages, ...response]);
    });
    setInput('');
  };

  return (
    <div>
      <div>
        <p>Hello, {myUsername}</p>
        <p>You are in room {roomId}</p>
      </div>
      <div style={{ border: '1px white solid' }}>
        {messages.map(({ message, roomId, user: { username } }, index) => (
          <div key={index}>
            <p>
              {roomId}: {username === myUsername ? 'YOU' : username}: {message}
            </p>
            {messages.length - 1 !== index && <hr />}
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginTop: '16px',
        }}
      >
        <input
          type="text"
          style={{ padding: 16 }}
          value={input}
          onChange={({ target: { value } }) => setInput(value)}
        />
        <button onClick={sendMessage}>Send</button>
        <button
          onClick={() => {
            setPage('ROOM');
          }}
        >
          Change Room
        </button>
        <button
          style={{ width: '100%' }}
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
