const express = require('express');
const usuariosRoute = require('./usuarios.router');
const routes = express.Router(); 


routes.use('/usuarios', usuariosRoute);

module.exports = routes;
