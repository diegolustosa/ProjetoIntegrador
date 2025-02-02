import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Validação simples
    if (username === 'admin' && password === 'admin') {
      navigate('/dashboard');  // Redireciona para o painel (dashboard)
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
      <p><a href="/recuperar-senha">Esqueci minha senha</a></p> {/* Link para recuperação de senha */}
    </div>
  );
};

export default Login;
