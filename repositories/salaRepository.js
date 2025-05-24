const pool = require('../config/database');
const schema = require("../models/salaModel");

function validate(data) {
  const { error, value } = schema.validate(data);
  if (error) throw error;
  return value;
}

module.exports = {
  async create(sala) {
    sala = validate(sala);
    const result = await pool.query(
      "INSERT INTO sala (numero, localizacao, capacidade, disponivel) VALUES ($1, $2, $3, $4) RETURNING id_sala, numero, localizacao, capacidade, disponivel",
      [sala.numero, sala.localizacao, sala.capacidade, sala.disponivel]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query("SELECT id_sala, numero, localizacao, capacidade, disponivel FROM sala ORDER BY numero");
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query("SELECT id_sala, numero, localizacao, capacidade, disponivel FROM sala WHERE id_sala = $1", [id]);
    return result.rows[0];
  },

  async findByNumero(numero) {
    const result = await pool.query("SELECT id_sala, numero, localizacao, capacidade, disponivel FROM sala WHERE numero = $1", [numero]);
    return result.rows[0];
  },

  async findAvailable() {
    const result = await pool.query("SELECT id_sala, numero, localizacao, capacidade, disponivel FROM sala WHERE disponivel = true ORDER BY numero");
    return result.rows;
  },

  async update(id, payload) {
    payload = validate(payload);
    await pool.query(
      "UPDATE sala SET numero = $1, localizacao = $2, capacidade = $3, disponivel = $4 WHERE id_sala = $5",
      [payload.numero, payload.localizacao, payload.capacidade, payload.disponivel, id]
    );
    return this.findById(id);
  },

  async updateAvailability(id, disponivel) {
    await pool.query(
      "UPDATE sala SET disponivel = $1 WHERE id_sala = $2",
      [disponivel, id]
    );
    return this.findById(id);
  },

  async remove(id) {
    await pool.query("DELETE FROM sala WHERE id_sala = $1", [id]);
  },

  async withReservationCounts() {
    const result = await pool.query(`
      SELECT s.id_sala, s.numero, s.localizacao, s.capacidade, s.disponivel, COALESCE(COUNT(r.id_reserva), 0) AS total_reservas
      FROM sala s
      LEFT JOIN reserva r ON r.id_sala = s.id_sala
      GROUP BY s.id_sala, s.numero, s.localizacao, s.capacidade, s.disponivel
      ORDER BY s.numero
    `);
    return result.rows;
  }
};