const pool = require('../config/database');
const schema = require("../models/reservaModel");

function validate(data) {
  const { error, value } = schema.validate(data);
  if (error) throw error;
  return value;
}

module.exports = {
  async create(reserva) {
    reserva = validate(reserva);
    const result = await pool.query(
      "INSERT INTO reserva (id_usuario, id_sala, reservado_em, data_inicio, data_fim) VALUES ($1, $2, $3, $4, $5) RETURNING id_reserva, id_usuario, id_sala, reservado_em, data_inicio, data_fim",
      [reserva.id_usuario, reserva.id_sala, reserva.reservado_em, reserva.data_inicio, reserva.data_fim]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query(`
      SELECT r.id_reserva, r.id_usuario, r.id_sala, r.reservado_em, r.data_inicio, r.data_fim, 
             u.nome as usuario_nome, u.email as usuario_email,
             s.numero as sala_numero, s.localizacao as sala_localizacao
      FROM reserva r
      JOIN usuario u ON r.id_usuario = u.id_usuario
      JOIN sala s ON r.id_sala = s.id_sala
      ORDER BY r.data_inicio DESC
    `);
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query(`
      SELECT r.id_reserva, r.id_usuario, r.id_sala, r.reservado_em, r.data_inicio, r.data_fim, 
             u.nome as usuario_nome, u.email as usuario_email,
             s.numero as sala_numero, s.localizacao as sala_localizacao
      FROM reserva r
      JOIN usuario u ON r.id_usuario = u.id_usuario
      JOIN sala s ON r.id_sala = s.id_sala
      WHERE r.id_reserva = $1
    `, [id]);
    return result.rows[0];
  },

  async findByUsuario(idUsuario) {
    const result = await pool.query(`
      SELECT r.id_reserva, r.id_usuario, r.id_sala, r.reservado_em, r.data_inicio, r.data_fim, 
             s.numero as sala_numero, s.localizacao as sala_localizacao
      FROM reserva r
      JOIN sala s ON r.id_sala = s.id_sala
      WHERE r.id_usuario = $1
      ORDER BY r.data_inicio DESC
    `, [idUsuario]);
    return result.rows;
  },

  async findBySala(idSala) {
    const result = await pool.query(`
      SELECT r.id_reserva, r.id_usuario, r.id_sala, r.reservado_em, r.data_inicio, r.data_fim, 
             u.nome as usuario_nome, u.email as usuario_email
      FROM reserva r
      JOIN usuario u ON r.id_usuario = u.id_usuario
      WHERE r.id_sala = $1
      ORDER BY r.data_inicio DESC
    `, [idSala]);
    return result.rows;
  },

  async findConflicts(idSala, dataInicio, dataFim, excludeReservaId = null) {
    let query = `
      SELECT id_reserva, id_usuario, id_sala, reservado_em, data_inicio, data_fim FROM reserva
      WHERE id_sala = $1
      AND (
        (data_inicio <= $2 AND data_fim > $2) OR
        (data_inicio < $3 AND data_fim >= $3) OR
        (data_inicio >= $2 AND data_fim <= $3)
      )
    `;
    let params = [idSala, dataInicio, dataFim];

    if (excludeReservaId) {
      query += " AND id_reserva != $4";
      params.push(excludeReservaId);
    }

    const result = await pool.query(query, params);
    return result.rows;
  },

  async update(id, payload) {
    payload = validate(payload);
    await pool.query(
      "UPDATE reserva SET id_usuario = $1, id_sala = $2, data_inicio = $3, data_fim = $4 WHERE id_reserva = $5",
      [payload.id_usuario, payload.id_sala, payload.data_inicio, payload.data_fim, id]
    );
    return this.findById(id);
  },

  async remove(id) {
    await pool.query("DELETE FROM reserva WHERE id_reserva = $1", [id]);
  },

  async withUserAndRoomDetails() {
    const result = await pool.query(`
      SELECT r.id_reserva, r.data_inicio, r.data_fim, r.reservado_em,
             u.id_usuario, u.nome as usuario_nome, u.email as usuario_email,
             s.id_sala, s.numero as sala_numero, s.localizacao as sala_localizacao, s.capacidade
      FROM reserva r
      JOIN usuario u ON r.id_usuario = u.id_usuario
      JOIN sala s ON r.id_sala = s.id_sala
      ORDER BY r.data_inicio DESC
    `);
    return result.rows;
  }
};