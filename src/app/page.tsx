'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      router.push('/dashboard');
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-10 rounded-md shadow-md w-80 flex flex-col space-y-6"
      >
        <label
          htmlFor="username"
          className="text-white font-mono lowercase text-lg"
        >
          username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
          autoComplete="username"
        />

        <label
          htmlFor="password"
          className="text-white font-mono lowercase text-lg"
        >
          password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition"
        >
          Login
        </button>
      </form>
    </main>
  );
}
