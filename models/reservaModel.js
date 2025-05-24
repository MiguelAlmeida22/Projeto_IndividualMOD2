const pool = require('../config/database');
const Joi = require("joi");

const reservaModel = Joi.object({
  id_reserva: Joi.number().integer().positive(),
  id_usuario: Joi.number().integer().positive().required(),
  id_sala: Joi.number().integer().positive().required(),
  reservado_em: Joi.date().iso().required(),
  data_inicio: Joi.date().iso().required(),
  data_fim: Joi.date().iso().min(Joi.ref('data_inicio')).required(),
});

module.exports = reservaModel;