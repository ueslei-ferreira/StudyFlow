import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register/', { username, email, password });
      alert('Registro realizado com sucesso! Por favor, faça login.');
      navigate('/login');
    } catch (error) {
      alert('Falha no registro');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Criar Conta</h2>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Nome de usuário</label>
          <input
            type="text"
            className="w-full bg-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Email</label>
          <input
            type="email"
            className="w-full bg-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Senha</label>
          <input
            type="password"
            className="w-full bg-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold transition">
          Registrar
        </button>
        <p className="mt-4 text-center text-gray-400">
          Já tem uma conta? <Link to="/login" className="text-blue-500">Entrar</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
