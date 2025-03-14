'use client';
import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.error) {
      setMessage(data.error);
    } else {
      setMessage('✅ Login Successful!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Admin Login</h1>
      <form onSubmit={handleLogin} className="mt-6 flex flex-col items-center gap-4">
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 border border-gray-700 rounded-md text-lg w-80"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 border border-gray-700 rounded-md text-lg w-80"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded shadow"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-green-400">{message}</p>}
    </div>
  );
}
