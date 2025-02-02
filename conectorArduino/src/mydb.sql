CREATE DATABASE gestao_usuarios;
CREATE TABLE usuarios (
  id_usuarios INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  eh_verificado BOOLEAN DEFAULT FALSE
);
CREATE TABLE caixa_cheia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  volume INT NOT NULL,
  id_usuarios INT,
  CONSTRAINT fk_userCaixa FOREIGN KEY (id_usuarios) references usuarios (id_usuarios)
    ON DELETE CASCADE
);