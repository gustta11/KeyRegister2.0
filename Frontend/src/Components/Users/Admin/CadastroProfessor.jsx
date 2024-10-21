import React, { useState } from 'react';
import axios from 'axios';

const CadastroProfessor = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      alert(response.data.message);
    } catch (error) {
      console.error(error.response.data);
      alert('Erro no cadastro');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastro</h2>
      <input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastroProfessor;
