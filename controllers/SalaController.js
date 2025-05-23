const pool = require('../config/database');


exports.criarSala = async (req, res) => {
  const { numero, localizacao, capacidade, disponivel } = req.body;

  const query = `
    INSERT INTO sala (numero, localizacao, capacidade, disponivel)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [numero, localizacao, capacidade, disponivel];

  try {
    const result = await pool.query(query, values);
    const sala = result.rows[0];
    res.status(201).json(sala);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.listarSalas = async (req, res) => {
  const query = 'SELECT * FROM sala';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.editarSala = async (req, res) => {
  const { id_sala } = req.params;
  const { numero, localizacao, capacidade, disponivel } = req.body;

  const query = `
    UPDATE sala 
    SET numero = $1, localizacao = $2, capacidade = $3, disponivel = $4
    WHERE id_sala = $5 RETURNING *`;
  const values = [numero, localizacao, capacidade, disponivel, id_sala];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.excluirSala = async (req, res) => {
  const { id_sala } = req.params;

  const query = 'DELETE FROM sala WHERE id_sala = $1 RETURNING *';
  const values = [id_sala];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json({ message: 'Sala excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
