// LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'; // Importe o CSS aqui

function LoginPage({ onLogin }) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({ name, cpf });
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleLogin} className="loginForm">
        <h1>Entrar</h1>
        <div>
          <label htmlFor="name">Nome de Usuário</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cpf">CPF</label>
          <input
            type="password" // Usar tipo password para esconder a entrada
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;