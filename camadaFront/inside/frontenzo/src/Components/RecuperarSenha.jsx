import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleRecuperarSenha = async (e) => {
    e.preventDefault();

    const dados = { email };

    try {
      const response = await fetch('http://localhost:5000/usuarios/esqueci-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      const result = await response.json();
      if (response.ok) {
        setMensagem(result.msg);  // Exibe a mensagem de sucesso
        navigate('/');  // Redireciona para o login após enviar o link de recuperação
      } else {
        setMensagem(result.msg);  // Exibe a mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao recuperar a senha:', error);
      setMensagem('Erro ao tentar recuperar a senha.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Recuperação de Senha</h2>
      {mensagem && <div className="alert alert-info">{mensagem}</div>}
      <form onSubmit={handleRecuperarSenha}>
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
        <button type="submit">Enviar instruções</button>
      </form>
      <p><a href="/">Voltar para Login</a></p>
    </div>
  );
};

export default RecuperarSenha;
