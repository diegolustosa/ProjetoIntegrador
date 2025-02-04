import React from 'react';

const Deletar = ({ id }) => {
  // Função para deletar o usuário
  const deletarUsuario = async () => {
    try {
      const response = await fetch(`api/usuarios/${id}`, {
        method: 'DELETE',  // Usando método DELETE para excluir
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar usuário');
      }

      const data = await response.json();
      console.log(data);  // Exibe a mensagem de sucesso do servidor

      // Aqui você pode fazer algo após a exclusão, como redirecionar ou exibir uma mensagem
      alert('Usuário deletado com sucesso');
      
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar o usuário');
    }
  };

  return (
    <div>
      <h1>Deletar Usuário</h1>
      {/* Botão de exclusão */}
      <button onClick={deletarUsuario}>Deletar Usuário</button>
    </div>
  );
};

export default Deletar;
