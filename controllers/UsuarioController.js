const pool = require('../config/database');


exports.criarUsuario = async (req, res) => {
  const { nome, email } = req.body;

  const query = 'INSERT INTO usuario (nome, email) VALUES ($1, $2) RETURNING *';
  const values = [nome, email];

  try {
    const result = await pool.query(query, values);
    const usuario = result.rows[0];
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.listarUsuarios = async (req, res) => {
  const query = 'SELECT * FROM usuario';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.editarUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  const { nome, email } = req.body;

  const query = `
    UPDATE usuario SET nome = $1, email = $2
    WHERE id_usuario = $3 RETURNING *`;
  const values = [nome, email, id_usuario];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.excluirUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  const query = 'DELETE FROM usuario WHERE id_usuario = $1 RETURNING *';
  const values = [id_usuario];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
