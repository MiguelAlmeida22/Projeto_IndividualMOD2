const pool = require('../config/database');


exports.criarReserva = async (req, res) => {
  const { id_usuario, id_sala, reservado_em, data_inicio, data_fim } = req.body;

  const query = `
    INSERT INTO reserva (id_usuario, id_sala, reservado_em, data_inicio, data_fim)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [id_usuario, id_sala, reservado_em, data_inicio, data_fim];

  try {
    const result = await pool.query(query, values);
    const reserva = result.rows[0];
    res.status(201).json(reserva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.listarReservas = async (req, res) => {
  const query = 'SELECT * FROM reserva';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.editarReserva = async (req, res) => {
  const { id_reserva } = req.params;
  const { id_usuario, id_sala, reservado_em, data_inicio, data_fim } = req.body;

  const query = `
    UPDATE reserva 
    SET id_usuario = $1, id_sala = $2, reservado_em = $3, data_inicio = $4, data_fim = $5
    WHERE id_reserva = $6 RETURNING *`;
  const values = [id_usuario, id_sala, reservado_em, data_inicio, data_fim, id_reserva];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.excluirReserva = async (req, res) => {
  const { id_reserva } = req.params;

  const query = 'DELETE FROM reserva WHERE id_reserva = $1 RETURNING *';
  const values = [id_reserva];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json({ message: 'Reserva excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
