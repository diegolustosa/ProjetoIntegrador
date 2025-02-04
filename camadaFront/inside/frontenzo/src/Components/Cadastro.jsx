import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensagem, setMensagem] = useState(''); // Para exibir mensagens de erro ou sucesso
  const navigate = useNavigate();

  // URL do backend 
  const API_URL = 'http://localhost:5000'; 

  const handleCadastro = async (e) => {
    e.preventDefault();
    console.log("enviando");
    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    // Cria o objeto de dados a ser enviado ao backend
    const dados = { usuario: username, email, senha: password };
    console.log(dados);
    try {
      // Envia os dados para o backend
      console.log({dados});
      const response = await fetch(`${API_URL}/api/usuarios/cadastrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      const result = await response.json();
      if (response.ok) {
        // Exibe a mensagem de sucesso
        setMensagem(result.msg);
        alert('Cadastro realizado com sucesso!');
        navigate('/');  // Redireciona para a página de login após o cadastro
      } else {
        
        setMensagem(result.msg);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setMensagem('Erro ao tentar se cadastrar.');
    }
  };

  return (
    <div className="auth-container cadastro">
      <h2>Cadastro</h2>
      {mensagem && <div className="alert alert-info">{mensagem}</div>}
      <form onSubmit={handleCadastro}>
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
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p>Já tem uma conta? <a href="/">Faça login</a></p>
    </div>
  );
};

export default Cadastro;
