import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

export default function LoginPage({
  setPage,
}: {
  setPage: Dispatch<SetStateAction<'LOGIN' | 'ROOM' | 'MESSAGES'>>;
}) {
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  }>({ password: '', username: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const login = () =>
    axios
      .post(import.meta.env.VITE_API_URL + '/auth/login', credentials)
      .then((data) => {
        localStorage.setItem('token', data.data);
        setPage('ROOM');
      })
      .catch((error) => {
        const status = error.response.status;
        alert(
          status === 404
            ? 'Register first'
            : status === 401
            ? 'Wrong credentials'
            : 'Auth Process Failed',
        );
      });
  const register = () =>
    axios
      .post(import.meta.env.VITE_API_URL + '/auth/register', credentials)
      .then(() => alert('Registered!'))
      .catch((error) => {
        const status = (error as AxiosError).response?.status;
        console.log(status);
        alert(
          status === 409
            ? 'This username has been used already'
            : 'Auth Process Failed',
        );
      });

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <input
        type="text"
        name="username"
        onChange={handleChange}
        style={{ padding: '16px' }}
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        style={{ padding: '16px' }}
      />
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
    </form>
  );
}
