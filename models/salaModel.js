const pool = require('../config/database');
const Joi = require("joi");

const salaModel = Joi.object({
  id_sala: Joi.number().integer().positive(),
  numero: Joi.number().integer().positive().required(),
  localizacao: Joi.string().max(100).allow(null, ""),
  capacidade: Joi.number().integer().positive().allow(null),
  disponivel: Joi.boolean().allow(null),
});

module.exports = salaModel;