const pool = require('../config/database');
const Joi = require("joi");

const usuarioModel = Joi.object({
  id_usuario: Joi.number().integer().positive(),
  nome: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().max(50).required(),
});

module.exports = usuarioModel;