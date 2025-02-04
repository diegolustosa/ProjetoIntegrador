const db = require('../dbconector');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendConfirmationEmail(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const linkDeConfirmacao = ` https://4b6c-177-155-118-73.ngrok-free.app${email}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmação de Cadastro',
    text: `Por favor, clique no link para confirmar seu cadastro: ${linkDeConfirmacao}`,
  };

  try {
    console.log(process.env.EMAIL_USER);
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail de confirmação enviado: ' + info.response);
  } catch (error) {
    console.error("Erro ao enviar e-mail de confirmação:", error);
  }
}


module.exports = {
  // Cadastro de usuário
  cadastrar: async (req, res) => {
    const { usuario, email, senha } = req.body;

    if (!usuario || !email || !senha) {
      return res.status(400).send("Usuário, e-mail e senha são obrigatórios");
    }

    try {
      // Verificar se o e-mail já está cadastrado
      const userExists = await db('usuarios').where({ email }).first();
      if (userExists) {
        return res.status(400).send({ msg: "Este e-mail já está cadastrado" });
      }

      // Criptografar a senha
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(senha, salt);

      // Inserir o usuário no banco
      await db('usuarios').insert({ usuario, email, senha: hashedPassword, eh_verificado: false });

       // Enviar e-mail de confirmação
       sendConfirmationEmail(email);

      res.status(201).send({ msg: "Usuário cadastrado com sucesso. Verifique seu e-mail para ativação." });
    } catch (err) {
      res.status(500).send({ msg: `Erro ao cadastrar usuário: ${err.message}` });
    }
  },
  

  // Login de usuário
  login: async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).send("Usuário e senha são obrigatórios");
    }

    try {
      const user = await db('usuarios').where({ email: usuario }).first();
      if (!user) {
        return res.status(400).send({ msg: "Usuário não encontrado" });
      }

      // Verificar se a senha está correta
      const isMatch = await bcrypt.compare(senha, user.senha);
      if (!isMatch) {
        return res.status(400).send({ msg: "Senha incorreta" });
      }

      // Gerar um token JWT
      const token = jwt.sign({ id: user.id_usuarios }, "segredo", { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).send({ msg: `Erro no login: ${err.message}` });
    }
  },

  // Recuperação de senha (Enviar e-mail de recuperação)
  esqueciSenha: async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send("E-mail é obrigatório");
    }

    try {
      const user = await db('usuarios').where({ email }).first();
      if (!user) {
        return res.status(400).send({ msg: "Usuário não encontrado" });
      }

      // Enviar e-mail de recuperação de senha
      sendPasswordResetEmail(email);

      // Função para enviar e-mail de recuperação de senha
      function sendPasswordResetEmail(email) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Gerar token de recuperação com expiração de 1 hora
        const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const resetLink = ` https://4b6c-177-155-118-73.ngrok-free.app${resetToken}`;

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('E-mail de recuperação enviado: ' + info.response);
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Recuperação de Senha',
          text: `Clique no link para redefinir sua senha: ${resetLink}`,
        };
      }

      res.json({ msg: "Instruções para recuperação de senha enviadas ao seu e-mail." });
    } catch (err) {
      res.status(500).send({ msg: `Erro ao enviar e-mail de recuperação: ${err.message}` });
    }
  },


  consultar: async (req, res) => {
    try {
      const data = await db('usuarios').select('*');
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({ msg: "Erro ao carregar lista de usuários" });
    }
  },


  atualizar: async (req, res) => {
    const { id } = req.params;
    const { usuario, email } = req.body;

    try {
      await db('usuarios').where({ id }).update({ usuario, email });
      res.status(200).send({ msg: "Usuário atualizado com sucesso" });
    } catch (err) {
      res.status(500).send({ msg: "Erro ao atualizar usuário" });
    }
  },


  deletar: async (req, res) => {
    const { id } = req.params;
    console.log(`O id Recebido eh: ${id}`);
    try {
      console.log(`O id Recebido eh: ${id}`);
      await db('usuarios').where('id_usuarios', id).del();
      res.status(200).send({ msg: `Usuário ${id} deletado com sucesso` });
    } catch (err) {
      res.status(500).send({ msg: "Erro ao deletar usuário" });
    }
  }
};




