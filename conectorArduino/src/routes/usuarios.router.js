const express = require('express');
const router = express.Router();
const usuariosController = require('../controller/usuarios.controller');


router.post('/cadastrar', usuariosController.cadastrar);
router.post('/login', usuariosController.login);
router.post('/esqueci-senha', usuariosController.esqueciSenha);
router.get('/', usuariosController.consultar);
router.put('/:id([0-9]+)', usuariosController.atualizar);
router.delete('/:id([0-9]+)', usuariosController.deletar);

module.exports = router;
