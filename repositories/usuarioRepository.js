const pool = require('../config/database');
const schema = require("../models/usuarioModel");

function validate(data) {
  const { error, value } = schema.validate(data);
  if (error) throw error;
  return value;
}

module.exports = {
  async create(usuario) {
    usuario = validate(usuario);
    const result = await pool.query(
      "INSERT INTO usuario (nome, email) VALUES ($1, $2) RETURNING id_usuario, nome, email",
      [usuario.nome, usuario.email]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query("SELECT id_usuario, nome, email FROM usuario ORDER BY id_usuario");
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query("SELECT id_usuario, nome, email FROM usuario WHERE id_usuario = $1", [id]);
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query("SELECT id_usuario, nome, email FROM usuario WHERE email = $1", [email]);
    return result.rows[0];
  },

  async update(id, payload) {
    payload = validate(payload);
    await pool.query(
      "UPDATE usuario SET nome = $1, email = $2 WHERE id_usuario = $3",
      [payload.nome, payload.email, id]
    );
    return this.findById(id);
  },

  async remove(id) {
    await pool.query("DELETE FROM usuario WHERE id_usuario = $1", [id]);
  }
};